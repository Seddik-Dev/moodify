"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const moods = [
    {
        time: "Morning",
        emoji: "🌅",
        mood: "Calm & Focused",
        genre: "Lofi / Ambient",
        color: "from-cyan-400 to-blue-500",
    },
    {
        time: "Afternoon",
        emoji: "🔥",
        mood: "Energetic",
        genre: "Hip-Hop / EDM",
        color: "from-orange-400 to-red-500",
    },
    {
        time: "Evening",
        emoji: "🌆",
        mood: "Chill",
        genre: "Indie / Jazz",
        color: "from-purple-400 to-pink-500",
    },
    {
        time: "Night",
        emoji: "🌙",
        mood: "Emotional",
        genre: "Piano / Ambient",
        color: "from-indigo-400 to-fuchsia-500",
    },
];

export default function MoodTimeline() {
    return (
        <section className="relative z-10 py-24 px-6">
            <div className="mx-auto max-w-6xl">

                {/* TITLE */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center text-3xl md:text-4xl font-bold mb-14"
                >
                    Your Mood,{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        All Day Long
                    </span>
                </motion.h2>

                {/* TIMELINE */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {moods.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card className="relative h-full border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">

                                {/* GLOW */}
                                <div
                                    className={`absolute inset-0 opacity-20 bg-gradient-to-br ${item.color}`}
                                />

                                <CardContent className="relative z-10 p-6 text-center">
                                    <div className="text-4xl mb-4">{item.emoji}</div>

                                    <h3 className="text-lg font-semibold mb-1">
                                        {item.time}
                                    </h3>

                                    <p className="text-sm text-zinc-300 mb-2">
                                        {item.mood}
                                    </p>

                                    <span
                                        className={`inline-block mt-2 px-3 py-1 text-xs rounded-full bg-gradient-to-r ${item.color}`}
                                    >
                                        {item.genre}
                                    </span>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
