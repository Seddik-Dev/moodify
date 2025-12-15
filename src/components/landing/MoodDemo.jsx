"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const moods = [
    { keywords: ["sad", "down", "tired"], mood: "Melancholic", emoji: "😔", music: "Soft Piano, Lofi" },
    { keywords: ["happy", "good", "great"], mood: "Happy", emoji: "😊", music: "Pop, Feel Good" },
    { keywords: ["angry", "mad"], mood: "Intense", emoji: "😤", music: "Rock, Metal" },
    { keywords: ["calm", "relaxed"], mood: "Calm", emoji: "😌", music: "Ambient, Chill" },
];

export default function MoodDemo() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);

    const analyzeMood = () => {
        const lower = text.toLowerCase();
        const found = moods.find(m =>
            m.keywords.some(k => lower.includes(k))
        );

        setResult(
            found || { mood: "Neutral", emoji: "🙂", music: "Mixed Vibes" }
        );
    };

    return (
        <section className="relative z-10 py-24 flex justify-center">
            <Card className="w-full max-w-xl bg-black/60 backdrop-blur-xl border-white/10">
                <CardContent className="p-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-center">
                        🎧 Try the Mood Analyzer
                    </h2>

                    <Input
                        placeholder="How are you feeling today?"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className="bg-black/40"
                    />

                    <Button
                        onClick={analyzeMood}
                        className="w-full"
                    >
                        Analyze Mood
                    </Button>

                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-6 p-4 rounded-lg bg-white/5 text-center"
                            >
                                <div className="text-4xl">{result.emoji}</div>
                                <p className="mt-2 font-medium">{result.mood}</p>
                                <p className="text-sm text-white/60">
                                    Recommended: {result.music}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </section>
    );
}
