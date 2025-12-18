const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API = "https://api.spotify.com/v1";

let cachedToken = null;
let tokenExpiresAt = 0;

async function getSpotifyAccessToken() {
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

export async function searchTracks(query, { limit = 50 , offset = 0 } = {}) {
  const accessToken = await getSpotifyAccessToken();

  const res = await fetch(
    `${SPOTIFY_API}/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=${limit}&offset=${offset}`,
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

  return {
    tracks: data.tracks.items.map((track) => ({
      // 🎵 Track
      id: track.id,
      name: track.name,
      uri: track.uri,
      duration_ms: track.duration_ms,
      popularity: track.popularity,
      explicit: track.explicit,
      preview_url: track.preview_url,
      is_playable: track.is_playable,

      // 🔗 URLs
      external_urls: {
        spotify: track.external_urls.spotify,
      },

      // 👨‍🎤 Artists
      artists: track.artists.map((a) => ({
        id: a.id,
        name: a.name,
        url: a.external_urls.spotify,
      })),

      // 💿 Album
      album: {
        id: track.album.id,
        name: track.album.name,
        release_date: track.album.release_date,
        total_tracks: track.album.total_tracks,
        images: track.album.images,
        url: track.album.external_urls.spotify,
      },

      // 🌍 Availability
      available_markets: track.available_markets,
    })),

    // 📄 Pagination info
    pagination: {
      limit: data.tracks.limit,
      offset: data.tracks.offset,
      total: data.tracks.total,
      hasNext: data.tracks.offset + data.tracks.limit < data.tracks.total,
      nextOffset: data.tracks.offset + data.tracks.limit,
    },
  };
}
