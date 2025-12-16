"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackCard({ track }) {
  if (!track) return null;
  const artists = track.artists?.map((a) => a.name).join(", ");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="min-w-[50px] bg-white/5 hover:bg-white/10 p-4 rounded-xl transition group w-50 border-0">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={track.image}
              alt={track.name}
              className="rounded-lg mb-3"
            />

            {/* PLAY OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-xl">▶</span>
            </div>
          </div>

          <div className="font-semibold truncate text-white">{track.name}</div>

          <div className="text-sm text-zinc-400 truncate">{artists}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
