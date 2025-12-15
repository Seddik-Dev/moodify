'use client'
export default function AudioPlayer() {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-20 border-t border-white/10 bg-black/80 backdrop-blur flex items-center px-6">
            <span className="text-sm text-white/60">
                No track playing
            </span>
        </div>
    );
}
