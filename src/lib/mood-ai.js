import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeMood(mood) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
    You are an expert music curator, emotional listener, and DJ.
    
    Your job is to understand how the user feels and recommend music
    that matches their emotional state, energy level, and cultural taste.
    
    You must behave like ChatGPT talking to a user.
    
    User message:
    "${mood}"
    
    First, internally analyze:
    - emotional state (sad, calm, angry, happy, nostalgic, empty, motivated, etc.)
    - energy level (low / medium / high)
    - preferred vibe (dark, uplifting, chill, aggressive, romantic, etc.)
    - cultural or language hints
    - time references or era
    - artist or style references (if any)
    
    Then produce TWO things:
    
    1️⃣ A short human explanation (1–2 sentences) describing the vibe you chose.
    2️⃣ A JSON array of Spotify-friendly search queries.
    
    Rules:
    - The explanation must sound natural and empathetic
    - Spotify queries must be short and effective
    - Use English for queries
    - Do NOT invent artists
    - If an artist is mentioned, extract their style instead
    - Avoid generic results like "good music"
    - No markdown, no emojis
    
    Response format MUST be exactly:
    
    {
      "explanation": "string",
      "queries": ["query 1", "query 2", "query 3"]
    }
    
    Nothing outside this JSON.
    `

  });

  const text = response.text.trim();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Gemini JSON parse error:", text);
    return ["chill"];
  }
}
