import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Background from "@/components/landing/Background";
import MoodTimeline from "@/components/landing/MoodTimeline";
import MoodDemo from "@/components/landing/MoodDemo";
import FooterGlow from "@/components/mvpblocks/footer-glow";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <Background />
      </div>

      {/* FOREGROUND */}
      <Hero />
      <Features />
      <MoodTimeline />
      <MoodDemo/>
      <FooterGlow/>

    </main>
  );
}
