import { NextResponse } from "next/server";
import { Buffer } from "buffer";

/* ========= UTILS ========= */
const randomLetter = () =>
  "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];

const randomOffset = (max = 500) => Math.floor(Math.random() * max);

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

/* ========= SPOTIFY TOKEN ========= */
async function getSpotifyAccessToken() {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error("Spotify env variables missing");
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    console.error("TOKEN ERROR:", data);
    throw new Error("Spotify token error");
  }

  return data.access_token;
}

/* ========= API ROUTE ========= */
export async function GET() {
  try {
    const token = await getSpotifyAccessToken();

    /* ---------- RANDOM SEARCH ---------- */
    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${randomLetter()}&type=track&limit=25&offset=${randomOffset()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!searchRes.ok) {
      const err = await searchRes.text();
      console.error("SEARCH ERROR:", err);
      throw new Error("Spotify search failed");
    }

    const searchData = await searchRes.json();
    const searchTracks = searchData.tracks?.items || [];

    /* ---------- RECOMMENDATIONS ---------- */
    const genres = [
      "pop",
      "rock",
      "hip-hop",
      "dance",
      "electronic",
      "indie",
      "latin",
    ];

    const seedGenres = shuffle(genres).slice(0, 2).join(",");

    let recoTracks = [];

    try {
      const recoRes = await fetch(
        `https://api.spotify.com/v1/recommendations?limit=25&seed_genres=${seedGenres}&market=US`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (recoRes.ok) {
        const recoData = await recoRes.json();
        recoTracks = recoData.tracks || [];
      }
    } catch (e) {
      console.warn("Recommendations skipped");
    }

    /* ---------- MERGE + SHUFFLE ---------- */
    const tracks = shuffle([...searchTracks, ...recoTracks]).slice(0, 20);

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("API ERROR:", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
