import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    title: "Mood Detection",
    desc: "AI understands your emotions from text or emojis.",
    icon: "🧠",
  },
  {
    title: "Music Matching",
    desc: "Get playlists that fit your energy and vibe.",
    icon: "🎼",
  },
  {
    title: "Instant Experience",
    desc: "Fast, serverless and optimized with Next.js.",
    icon: "⚡",
  },
];

export default function Features() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        How Mood → Music Works
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((item) => (
          <Card
            key={item.title}
            className="bg-zinc-900/70 border-zinc-800 backdrop-blur transition hover:scale-105"
          >
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-4xl">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-zinc-400">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
