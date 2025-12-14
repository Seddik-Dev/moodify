"use client";

import FloatingLines from "@/components/react-bits/FloatingLines";

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* DARK BASE GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-0" />

      {/* FLOATING LINES */}
      <div className="absolute inset-0 z-10 opacity-80">
        <FloatingLines
          linesGradient={["#7c3aed", "#ec4899", "#22d3ee"]}
          animationSpeed={0.8}
          parallax
          interactive
          mixBlendMode="screen"
        />
      </div>

    </div>
  );
}
