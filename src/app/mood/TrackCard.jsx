"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackCard({ track }) {
  if (!track) return null;

  const image = track.album?.images?.[0]?.url || track.album?.images?.[1]?.url;

  const artists = track.artists?.map((a) => a.name).join(", ");

  console.log("Rendering TrackCard for:", track);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-zinc-900 border-zinc-800 rounded-xl overflow-hidden">
        <CardContent className="p-0">
          {/* IMAGE */}
          <img
            src={image}
            alt={track.name}
            className="w-full h-48 object-cover"
          />

          {/* INFO */}
          <div className="p-3">
            <h3 className="text-sm font-semibold text-white truncate">
              {track.name}
            </h3>

            <p className="text-xs text-zinc-400 truncate">{artists}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
