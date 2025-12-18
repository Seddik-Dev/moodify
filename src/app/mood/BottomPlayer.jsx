export default function BottomSpotifyPlayer({ track }) {
  if (!track || !track.external_urls?.spotify) return null;

  const embedUrl =
    track.external_urls.spotify
      .replace("open.spotify.com/", "open.spotify.com/embed/")
      + "?autoplay=1"; // autoplay automatique

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10">
      <div className="max-w-screen-xl mx-auto flex items-center gap-4 p-3">
        {/* PLAYER */}
        <div className="flex-1">
          <iframe
            key={track.id} // 🔹 permet de forcer le reload pour autoplay
            src={embedUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      </div>

      {/* INFOS OPTIONNELLES POUR DEBUG */}
      <div className="hidden">
        <p>Preview: {track.preview}</p>
        <p>URI: {track.uri}</p>
        <p>Spotify URL: {track.external_urls.spotify}</p>
      </div>
    </div>
  );
}
