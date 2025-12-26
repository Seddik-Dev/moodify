import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_KEY);

export async function analyzeMood(mood) {
  try {
    // Validate input
    if (!mood || typeof mood !== "string" || mood.trim().length === 0) {
      return { explanation: "", player_mode: "", queries: ["chill"] };
    }

    const chatCompletion = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3.2:novita",
      messages: [
        {
          role: "user",
          content: `
            You are an expert music curator, emotional listener, and DJ.

            Your role is to deeply understand the user's emotional state and intent,
            then recommend music that precisely matches their mood, energy level,
            and ideal listening context.

            User message:
            "${mood}"

            Output EXACTLY three fields in JSON:
            {
              "explanation": "why this mood fits the music",
              "player_mode": "how it should be played",
              "queries": ["query 1", "query 2", "query 3"]
            }

            DO NOT output anything outside this JSON.
          `,
        },
      ],
    });

    // Hugging Face returns generated text in chatCompletion.choices[0].message.content
    const text = chatCompletion.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return { explanation: "", player_mode: "", queries: ["chill"] };
    }

    // Try to parse JSON, fallback if invalid
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse API response:", parseError);
      return { explanation: "", player_mode: "", queries: ["chill"] };
    }
  } catch (err) {
    console.error("Network/API error:", err);
    return { explanation: "", player_mode: "", queries: ["chill"] };
  }
}

// Example usage (only for testing/development, not in production)
// Should be moved to a separate test file
if (process.env.NODE_ENV === "development") {
  try {
    const mood = "I feel nostalgic and calm, want relaxing evening music";
    const result = await analyzeMood(mood);
    console.log("🎵 Explanation:", result.explanation);
    console.log("🎧 Player mode:", result.player_mode);
    console.log("🔍 Queries:", result.queries);
  } catch (error) {
    console.error("Example usage error:", error);
  }
}
