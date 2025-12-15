const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API = "https://api.spotify.com/v1";

let cachedToken = null;
let tokenExpiresAt = 0;

async function getSpotifyAccessToken() {
  // reuse token if still valid
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error("Failed to get Spotify access token");
  }

  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;

  return cachedToken;
}

export async function searchTracks(query) {
  const accessToken = await getSpotifyAccessToken();

  const res = await fetch(
    `${SPOTIFY_API}/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.text();
    console.error("Spotify search error:", error);
    throw new Error("Spotify search failed");
  }

  const data = await res.json();

  return data.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists.map(a => a.name).join(", "),
    image: track.album.images?.[0]?.url ?? null,
    preview: track.preview_url,
  }));
}
