'use client'
export default function TrackGrid() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-lg bg-white/5 border border-white/10"
          />
        ))}
      </div>
    );
  }
  