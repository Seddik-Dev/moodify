"use client";

import { motion } from "framer-motion";

export default function NowPlayingSidebar({ track }) {
  if (!track) return null;

  const image =
    track.album?.images?.[0]?.url ||
    track.album?.images?.[1]?.url ||
    track.album?.images?.[2]?.url;

  const duration = `${Math.floor(track.duration_ms / 60000)}:${String(
    Math.floor((track.duration_ms % 60000) / 1000)
  ).padStart(2, "0")}`;

  return (
    <aside
      className="
        hidden lg:block
        fixed left-0 top-0
        w-80 h-screen
        bg-black
        border-r border-white/10
        z-40
      "
    >
      <div className="h-full overflow-y-auto p-4 pt-6 pb-28">
        <motion.div
          key={track.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="
            relative rounded-2xl p-[1px]
            bg-gradient-to-b from-white/20 to-white/5
          "
        >
          <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-5 border border-white/10">
            {/* IMAGE */}
            <div className="relative group">
              <img
                src={image}
                alt={track.name}
                className="
                  rounded-xl shadow-xl
                  transition-transform duration-300
                  group-hover:scale-[1.02]
                "
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-green-500/40 transition" />
            </div>

            {/* INFOS */}
            <div className="mt-5 space-y-1">
              <h3 className="text-lg font-semibold text-white truncate">
                {track.name}
              </h3>
              <p className="text-sm text-zinc-400 truncate">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
              <p className="text-xs text-zinc-500 truncate">
                {track.album.name}
              </p>
            </div>

            {/* META */}
            <div className="mt-4 flex justify-between text-xs text-zinc-400">
              <span>⏱ {duration}</span>
              <span>🔥 {track.popularity}%</span>
            </div>

            {/* CTA */}
            <a
              href={track.external_urls.spotify}
              target="_blank"
              className="
                mt-5 block text-center text-sm font-medium
                text-black bg-green-500 rounded-lg py-2
                hover:bg-green-400 transition
              "
            >
              Ouvrir sur Spotify
            </a>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
