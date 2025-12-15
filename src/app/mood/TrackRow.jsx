export default function TrackRow({ title, tracks }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex flex-wrap gap-6 overflow-x-auto pb-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="min-w-[50px] bg-white/5 hover:bg-white/10 p-4 rounded-xl transition group w-50"
          >
            <div className="relative">
              <img
                src={track.album.images[0]?.url} // <-- ici
                alt={track.name}
                className="rounded-lg mb-3"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                ▶
              </div>
            </div>

            <div className="font-semibold truncate">{track.name}</div>

            <div className="text-sm text-zinc-400 truncate">
              {track.artists.map((a) => a.name).join(", ")} {/* <-- ici */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
