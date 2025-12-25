import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const moodSuggestions = [
  "Chill & relaxed",
  "Focused & productive",
  "Late night vibes",
  "Happy & upbeat",
  "Sad but calm",
  "Motivated & energetic",
];

export default function MoodHeader({ mood, setMood, onGenerate }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && mood.trim()) {
      onGenerate();
    }
  };

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-purple-600/20 via-black to-black p-10 mb-10 overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 blur-3xl pointer-events-none" />

      <h1 className="text-4xl font-bold mb-3">How are you feeling today?</h1>

      <p className="text-zinc-400 mb-6 max-w-xl">
        Let AI analyze your mood and build a soundtrack for it.
      </p>

      {/* Input + Button */}
      <div className="flex gap-3 max-w-xl mb-4">
        <Input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. calm but focused, late night vibes..."
          className="bg-black/60 border-white/10"
        />
        <Button
          onClick={onGenerate}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold"
        >
          Generate
        </Button>
      </div>

      {/* Mood Suggestions */}
      <div className="flex flex-wrap gap-2 max-w-xl">
        {moodSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setMood(suggestion)}
            className="px-3 py-1.5 rounded-full text-sm
                       bg-white/5 border border-white/10
                       text-zinc-300 hover:bg-white/10
                       transition"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
