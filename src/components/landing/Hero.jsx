import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">

      <Badge className="mb-6 bg-purple-500/10 text-purple-300 border border-purple-500/20 backdrop-blur-md">
        🎧 AI Music Experience
      </Badge>

      <h1 className="max-w-4xl text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]">
        Feel the{" "}
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          emotion
        </span>
        <br />
        Hear the{" "}
        <span className="bg-gradient-to-r from-pink-400 to-fuchsia-500 bg-clip-text text-transparent">
          music
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg text-zinc-300 backdrop-blur-sm bg-black/20 rounded-xl px-4 py-2">
        Describe your mood and let AI transform it into the perfect music experience.
      </p>

      <div className="mt-10 flex gap-4">
        <Button
          size="lg"
          className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 shadow-xl shadow-purple-600/40"
          asChild
        >
          <a href="/mood">Start Listening 🎶</a>
        </Button>

      </div>
    </section>
  );
}
