'use client'
export default function MoodInput() {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 text-lg font-semibold">
                How are you feeling?
            </h3>
            <textarea
                placeholder="I feel calm but nostalgic..."
                className="w-full resize-none rounded-lg bg-black/40 p-3 text-white outline-none border border-white/10"
            />
            <button className="mt-4 rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium hover:bg-purple-700 transition">
                Generate my vibe 🎶
            </button>
        </div>
    );
}
