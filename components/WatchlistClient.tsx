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
      <nav className="sticky top-0 z-10 border-b" style={{
        background: "rgba(13,15,26,0.92)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--border)",
      }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl" style={{ color: "var(--text-primary)" }}>
            Cine<span style={{ color: "var(--violet)" }}>Type</span>
          </Link>
          <Link
            href="/recommendations"
            className="flex items-center gap-1.5 text-sm font-ui"
            style={{ color: "var(--text-muted)" }}
          >
            <ArrowLeft size={14} /> Back to picks
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs font-ui uppercase tracking-widest mb-3" style={{ color: "var(--text-dim)" }}>
            Your list
          </p>
          <h1 className="font-display text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            Watchlist
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {loaded && items.length > 0
              ? `${items.length} title${items.length !== 1 ? "s" : ""} saved`
              : "Titles you save will appear here."}
          </p>
        </div>

        {loaded && items.length === 0 && (
          <div
            className="rounded-2xl p-16 border text-center"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="text-5xl mb-5">📋</div>
            <h2 className="font-display text-2xl mb-3" style={{ color: "var(--text-primary)" }}>
              Nothing saved yet
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Hit the bookmark icon on any recommendation card to save it here.
            </p>
            <Link
              href="/recommendations"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-ui text-sm"
              style={{ background: "var(--violet)", color: "#0D0F1A" }}
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
                className="group relative rounded-2xl overflow-hidden border card-hover"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] bg-[var(--elevated)]">
                  {item.posterPath ? (
                    <Image
                      src={`${TMDB_IMG}${item.posterPath}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film size={28} style={{ color: "var(--text-dim)" }} />
                    </div>
                  )}

                  {/* Remove button — shows on hover */}
                  <button
                    onClick={() => handleRemove(item.tmdbId)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(0,0,0,0.7)", color: "white" }}
                    title="Remove from watchlist"
                  >
                    <X size={13} />
                  </button>

                  {/* Type badge */}
                  <div
                    className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-ui"
                    style={{
                      background: "rgba(13,15,26,0.85)",
                      color: "var(--text-muted)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {item.mediaType === "tv" ? <Tv size={10} /> : <Film size={10} />}
                    {item.mediaType === "tv" ? "Series" : "Film"}
                  </div>
                </div>

                {/* Title */}
                <div className="p-3">
                  <p
                    className="text-sm font-ui leading-snug line-clamp-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer actions */}
        {loaded && items.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/recommendations"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-ui text-sm border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
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
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-ui text-sm border"
              style={{
                borderColor: "rgba(239,68,68,0.3)",
                color: "rgba(239,68,68,0.7)",
              }}
            >
              Clear watchlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
