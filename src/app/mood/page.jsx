"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MoodHeader from "./MoodHeader";
import TrackRow from "./TrackRow";

export default function MoodPage() {
  const searchParams = useSearchParams();
  const spotifyAccessToken = searchParams.get("token");
  const [mood, setMood] = useState("");
  const [featured, setFeatured] = useState([]);
  const [aiTracks, setAiTracks] = useState([]);

  useEffect(() => {
    fetch("/api/spotify/featured")
      .then(res => res.json())
      .then(data => setFeatured(data.tracks));
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

      setAiTracks(data.tracks || []);
    } catch (err) {
      console.error("Network error:", err);
    }
  }



  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <MoodHeader mood={mood} setMood={setMood} onGenerate={generate} />

        <TrackRow title="🎧 Trending Now" tracks={featured} />

        {Array.isArray(aiTracks) && aiTracks.length > 0 && (
          <TrackRow title="✨ Made for your mood" tracks={aiTracks} />
        )}
      </main>
    </div>
  );
}
