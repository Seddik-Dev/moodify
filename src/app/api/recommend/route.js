import { NextResponse } from "next/server";
import { analyzeMood } from "@/lib/mood-ai";
import { searchTracks } from "@/lib/spotify";

export async function POST(req) {
  try {
    const { mood } = await req.json();

    if (!mood) {
      return NextResponse.json(
        { error: "Mood is required" },
        { status: 400 }
      );
    }

    // AI analysis
    const aiResult = await analyzeMood(mood);

    // ✅ Validate AI response
    if (
      !aiResult ||
      !Array.isArray(aiResult.queries) ||
      aiResult.queries.length === 0
    ) {
      throw new Error("AI failed to generate search queries");
    }

    // Turn queries into one Spotify search string
    const query = aiResult.queries.join(" ");

    // Spotify search
    const tracks = await searchTracks(query);

    return NextResponse.json({
      explanation: aiResult.explanation, // optional, for UI
      tracks,
    });

  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
