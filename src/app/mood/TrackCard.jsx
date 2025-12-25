"use client";

import { motion } from "framer-motion";

export default function TrackCard({ track, onPlay, isPlaying }) {
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
      animate={{
        opacity: 1,
        y: 0,
        scale: isPlaying ? 1.05 : 1,
      }}
      transition={{ duration: 0.25 }}
      onClick={() => onPlay(track)}
      className={`cursor-pointer p-4 mt-3 rounded-xl transition group
        ${
          isPlaying
            ? "bg-green-500/20 ring-2 ring-green-500 shadow-lg"
            : "bg-white/5 hover:bg-white/10"
        }
      `}
    >
      <div className="relative ">
        <img
          src={image}
          alt={track.name}
          className="rounded-lg mb-3 aspect-square object-cover"
          loading="lazy"
        />

        {/* PLAYING WAVES */}
        {isPlaying && (
          <div className="absolute bottom-2 right-2 flex gap-[2px]">
            {[1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="w-1 bg-green-400 rounded-full"
                animate={{
                  height: ["6px", "16px", "6px"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
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
