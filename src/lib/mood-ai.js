import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeMood(mood) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      You are an expert music curator, emotional listener, and DJ.

      Your role is to deeply understand the user's emotional state and intent,
      then recommend music that precisely matches their mood, energy level,
      and listening context.

      You must respond like ChatGPT having a natural conversation with a human.

      User message:
      "${mood}"

      Before answering, internally extract and interpret:

      - Primary emotional state (e.g. sad, calm, angry, happy, nostalgic, lonely, motivated)
      - Emotional intensity (soft / moderate / intense)
      - Energy level (low / medium / high)
      - Desired vibe (dark, uplifting, chill, dreamy, aggressive, romantic, melancholic, hopeful, etc.)
      - Cultural, language, or regional hints (if any)
      - Time, era, or memory references (if any)
      - Explicit artist, genre, or style references (if mentioned)

      Artist handling rules (VERY IMPORTANT):
      - If the user explicitly mentions an artist name, you MAY include that artist in the queries.
      - Using an artist is OPTIONAL and ONLY allowed when clearly mentioned by the user.
      - If no artist is mentioned, DO NOT invent or assume any artist.
      - If an artist is mentioned, you may combine the artist with mood, energy, or style keywords.

      Then produce EXACTLY two outputs:

      1) A short, empathetic explanation (1–2 sentences max) explaining
        why this musical direction fits the user's emotional state.
        This should sound human, warm, and emotionally aware.

      2) A JSON array of Spotify-friendly search queries that would return
        highly relevant tracks or playlists matching the analyzed mood.

      Query rules:
      - Queries must be concise, specific, and emotionally descriptive
      - Use English ONLY for queries
      - Avoid vague or generic phrases (e.g. "good music", "nice songs")
      - Prefer combinations like: mood + genre, vibe + energy, artist + emotion
      - Each query should represent a slightly different angle of the same mood

      Response format MUST be EXACTLY:

      {
        "explanation": "string",
        "queries": ["query 1", "query 2", "query 3"]
      }

      Do NOT output anything outside this JSON.
      `,
  });

  const text = response.text.trim();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Gemini JSON parse error:", text);
    return ["chill"];
  }
}
