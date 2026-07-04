"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WatchlistItem } from "@/lib/types";
import { loadWatchlist, removeFromWatchlist } from "@/lib/storage";
import { ArrowLeft, Film, Tv, X } from "lucide-react";

const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

export default function WatchlistClient() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadWatchlist());
    setLoaded(true);
  }, []);

  const handleRemove = (tmdbId: number) => {
    removeFromWatchlist(tmdbId);
    setItems((prev) => prev.filter((i) => i.tmdbId !== tmdbId));
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <nav
        className="sticky top-0 z-10 border-b"
        style={{ background: "rgba(21,19,15,0.92)", backdropFilter: "blur(12px)", borderColor: "var(--border-soft)" }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl" style={{ color: "var(--text-primary)" }}>
            Cine<span style={{ color: "var(--coral)" }}>Type</span>
          </Link>
          <Link href="/recommendations" className="flex items-center gap-1.5 text-sm font-ui" style={{ color: "var(--text-muted)" }}>
            <ArrowLeft size={14} /> Back to picks
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="mb-12">
          <p className="text-xs font-ui uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-dim)" }}>
            Your list
          </p>
          <h1 className="font-display text-4xl md:text-5xl mb-3" style={{ color: "var(--text-primary)" }}>
            Watchlist
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {loaded && items.length > 0
              ? `${items.length} title${items.length !== 1 ? "s" : ""} saved`
              : "Titles you save will appear here."}
          </p>
        </div>

        {loaded && items.length === 0 && (
          <div className="rounded-2xl p-16 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}>
            <p className="font-display italic text-xl mb-4" style={{ color: "var(--coral)" }}>
              Nothing saved yet.
            </p>
            <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
              Hit the bookmark icon on any recommendation to keep it here for later.
            </p>
            <Link
              href="/recommendations"
              className="press inline-flex items-center gap-2 px-5 py-3 rounded-full font-ui text-sm"
              style={{ background: "var(--coral)", color: "var(--ink)" }}
            >
              Browse recommendations
            </Link>
          </div>
        )}

        {loaded && items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item) => (
              <div
                key={item.tmdbId}
                className="group relative rounded-2xl overflow-hidden card-hover"
                style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}
              >
                <div className="relative aspect-[2/3] overflow-hidden" style={{ background: "var(--elevated)" }}>
                  {item.posterPath ? (
                    <div className="poster-drift w-full h-full relative">
                      <Image
                        src={`${TMDB_IMG}${item.posterPath}`}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film size={28} style={{ color: "var(--text-dim)" }} />
                    </div>
                  )}

                  <button
                    onClick={() => handleRemove(item.tmdbId)}
                    className="press absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(21,19,15,0.8)", color: "var(--text-primary)" }}
                    title="Remove from watchlist"
                  >
                    <X size={13} />
                  </button>

                  <div
                    className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-ui"
                    style={{ background: "rgba(21,19,15,0.8)", color: "var(--text-muted)", backdropFilter: "blur(4px)" }}
                  >
                    {item.mediaType === "tv" ? <Tv size={10} /> : <Film size={10} />}
                    {item.mediaType === "tv" ? "Series" : "Film"}
                  </div>
                </div>

                <div className="p-3">
                  <p className="text-sm font-ui leading-snug line-clamp-2" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {loaded && items.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link
              href="/recommendations"
              className="press inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-ui text-sm border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              Back to recommendations
            </Link>
            <button
              onClick={() => {
                if (confirm("Clear your entire watchlist?")) {
                  items.forEach((i) => removeFromWatchlist(i.tmdbId));
                  setItems([]);
                }
              }}
              className="press inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-ui text-sm border"
              style={{ borderColor: "rgba(193,90,90,0.3)", color: "rgba(214,140,140,0.8)" }}
            >
              Clear watchlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
