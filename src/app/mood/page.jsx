"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MoodHeader from "./MoodHeader";
import TrackRow from "./TrackRow";
import TrackCard from "./TrackCard";

export default function MoodPage() {
  const [mood, setMood] = useState("");
  const [featured, setFeatured] = useState([]);
  const [aiTracks, setAiTracks] = useState([]);

  useEffect(() => {
    fetch("/api/featured")
      .then((res) => res.json())
      .then((data) => setFeatured(data.tracks || []));
  }, []);

  async function generate() {
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API error:", data);
        setAiTracks([]);
        return;
      }

      console.log("Tracks from API:", data.tracks); // <- ici
      setAiTracks(data.tracks || []);
    } catch (err) {
      console.error("Network error:", err);
    }
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8 space-y-10">
        <MoodHeader mood={mood} setMood={setMood} onGenerate={generate} />

        {/* FEATURED */}
        <TrackRow title="🎧 Trending Now" tracks={featured} />

        {/* AI GENERATED TRACKS */}
        {aiTracks.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">
              ✨ AI Picks for your mood
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-7 gap-6">
              {aiTracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
