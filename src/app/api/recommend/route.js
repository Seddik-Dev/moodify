import { NextResponse } from "next/server";
import { analyzeMood } from "@/lib/mood-ai";
import { searchTracks } from "@/lib/spotify";

export async function POST(req) {
  try {
    const { mood, offset = 0, limit = 50 } = await req.json();

    if (!mood) {
      return NextResponse.json({ error: "Mood is required" }, { status: 400 });
    }

    // AI analysis
    const aiResult = await analyzeMood(mood);

    if (!aiResult || !Array.isArray(aiResult.queries) || aiResult.queries.length === 0) {
      throw new Error("AI failed to generate search queries");
    }

    const query = aiResult.queries.join(" ");

    // Spotify search avec pagination
    const { tracks, pagination } = await searchTracks(query, { limit, offset });

    return NextResponse.json({
      explanation: aiResult.explanation,
      tracks,
      pagination,
    });

  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
