"use client";

import { useEffect, useState } from "react";
import MoodHeader from "./MoodHeader";
import TrackRow from "./TrackRow";
import TrackCard from "./TrackCard";
import BottomSpotifyPlayer from "./BottomPlayer";
import NowPlayingSidebar from "./NowPlayingSidebar";
import { AnimatePresence, motion } from "framer-motion";

export default function MoodPage() {
  const [mood, setMood] = useState("");
  const [featured, setFeatured] = useState([]);
  const [aiTracks, setAiTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [aiPagination, setAiPagination] = useState({
    offset: 0,
    limit: 50,
    hasNext: false,
  });
  const uniqueAiTracks = aiTracks.filter(
    (track, index, self) => index === self.findIndex((t) => t.id === track.id)
  );

  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);

  const hasAITracks = aiTracks.length > 0;

  // Load featured tracks
  useEffect(() => {
    fetch("/api/featured")
      .then((res) => res.json())
      .then((data) => setFeatured(data.tracks || []))
      .finally(() => setLoadingFeatured(false));
  }, []);

  async function generate(loadMore = false) {
    setLoadingAI(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood,
          offset: loadMore ? aiPagination.offset : 0,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API error:", data);
        if (!loadMore) setAiTracks([]);
        return;
      }

      if (loadMore) {
        setAiTracks((prev) => [...prev, ...data.tracks]);
      } else {
        setAiTracks(data.tracks);
      }

      setAiPagination(data.pagination);
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setLoadingAI(false);
    }
  }

  return (
    <div
      className={`flex min-h-screen bg-black text-white ${
        currentTrack ? "lg:pl-80" : ""
      }`}
    >
      {/* SIDEBAR – Desktop only */}
      <AnimatePresence>
        {currentTrack && (
          <div className="hidden lg:block">
            <NowPlayingSidebar track={currentTrack} />
          </div>
        )}
      </AnimatePresence>

      <main className="flex-1 p-8 space-y-10 pb-32">
        {/* HEADER */}
        <MoodHeader mood={mood} setMood={setMood} onGenerate={generate} />

        {/* 🔁 AI GENERATED */}
        {loadingAI ? (
          <div className="space-y-4">
            <p className="text-zinc-400">Chargement des pistes AI...</p>
            <div className="grid grid-cols-2 lg:grid-cols-7 md:grid-cols-3 sm:grid-cols-1 gap-x-8 gap-y-4 pb-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 animate-pulse aspect-square rounded-xl"
                />
              ))}
            </div>
          </div>
        ) : (
          hasAITracks && (
            <section>
              <h2 className="text-xl font-semibold mb-4">
                ✨ AI Picks for your mood
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-7 md:grid-cols-3 sm:grid-cols-1 gap-x-8 gap-y-4 overflow-x-auto pb-2">
                {aiTracks.map((track, idx) => (
                  <TrackCard
                    key={track.id + "_" + idx}
                    track={track}
                    onPlay={setCurrentTrack}
                  />
                ))}
              </div>

              {/* BOUTON CHARGER PLUS */}
              {aiPagination.hasNext && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => generate(true)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-black font-semibold"
                  >
                    Charger plus
                  </button>
                </div>
              )}
            </section>
          )
        )}

        {/* FEATURED */}
        {loadingFeatured ? (
          <div className="space-y-4">
            <p className="text-zinc-400">Chargement des pistes Trending...</p>
            <div className="grid grid-cols-2 lg:grid-cols-7 md:grid-cols-3 sm:grid-cols-1 gap-x-8 gap-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 animate-pulse aspect-square rounded-xl"
                />
              ))}
            </div>
          </div>
        ) : (
          <TrackRow
            title="🎧 Trending Now"
            tracks={featured}
            onPlay={setCurrentTrack}
          />
        )}
      </main>

      {/* PLAYER */}
      <BottomSpotifyPlayer track={currentTrack} />
    </div>
  );
}
