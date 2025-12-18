"use client";

import { motion } from "framer-motion";

export default function TrackCard({ track, onPlay }) {
  if (!track) return null;

  const image =
    track.album?.images?.[0]?.url ||
    track.album?.images?.[1]?.url ||
    track.album?.images?.[2]?.url ||
    "/placeholder.png";

  const artists = track.artists?.map((a) => a.name).join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      onClick={() => onPlay(track)}
      className="cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-xl transition group"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={image}
          alt={track.name}
          className="rounded-lg mb-3 aspect-square object-cover"
          loading="lazy"
        />

        {/* PLAY OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
            <span className="text-black text-lg ml-1">▶</span>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <div className="font-semibold text-sm text-white truncate">
        {track.name}
      </div>

      {/* ARTISTS */}
      <div className="text-xs text-zinc-400 truncate">{artists}</div>
    </motion.div>
  );
}
