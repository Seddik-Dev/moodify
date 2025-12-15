"use client";

export default function FooterGlow() {
  return (
    <footer className="relative z-10 mt-24 w-full overflow-hidden pt-20 pb-8">
      {/* Glass style */}
      <style jsx global>{`
        .glass {
          backdrop-filter: blur(8px) saturate(160%);
          background: radial-gradient(
            circle at top,
            rgba(168, 85, 247, 0.15),
            rgba(0, 0, 0, 0.85) 70%
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>

      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
      </div>

      {/* Main glass container */}
      <div className="glass relative mx-auto max-w-6xl rounded-2xl px-8 py-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                🎧
              </div>
              <span className="text-xl font-semibold tracking-tight bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
                Moodify
              </span>
            </div>

            <p className="max-w-xs text-center text-sm text-white/60 md:text-left">
              Turn emotions into music.  
              Describe your mood and let AI create the perfect sound.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-4 text-white/60">
              <a href="#" className="hover:text-purple-400 transition">GitHub</a>
              <a href="#" className="hover:text-pink-400 transition">Twitter</a>
              <a href="#" className="hover:text-cyan-400 transition">LinkedIn</a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="grid grid-cols-2 gap-10 text-sm md:grid-cols-3">
            <div>
              <div className="mb-3 text-xs uppercase tracking-widest text-purple-400">
                Product
              </div>
              <ul className="space-y-2 text-white/60">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="/mood" className="hover:text-white">Mood Analyzer</a></li>
                <li><a href="#demo" className="hover:text-white">Live Demo</a></li>
              </ul>
            </div>

            <div>
              <div className="mb-3 text-xs uppercase tracking-widest text-pink-400">
                Technology
              </div>
              <ul className="space-y-2 text-white/60">
                <li>AI Mood Detection</li>
                <li>React + Tailwind</li>
                <li>Animated UI</li>
              </ul>
            </div>

            <div>
              <div className="mb-3 text-xs uppercase tracking-widest text-cyan-400">
                Project
              </div>
              <ul className="space-y-2 text-white/60">
                <li>Portfolio Project</li>
                <li>Open Source</li>
                <li>2025</li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 mt-10 text-center text-xs text-white/40">
        © 2025 Moodify — Built with ❤️ & music
      </div>
    </footer>
  );
}
