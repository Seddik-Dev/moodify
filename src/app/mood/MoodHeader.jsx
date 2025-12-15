import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MoodHeader({ mood, setMood, onGenerate }) {
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-purple-600/20 via-black to-black p-10 mb-10 overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 blur-3xl" />

      <h1 className="text-4xl font-bold mb-3">
        How are you feeling today?
      </h1>

      <p className="text-zinc-400 mb-6 max-w-xl">
        Let AI analyze your mood and build a soundtrack for it.
      </p>

      <div className="flex gap-3 max-w-xl">
        <Input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
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
    </div>
  );
}
