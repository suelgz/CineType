"use client";

import { useState } from "react";
import Image from "next/image";
import { RecommendationCard } from "@/lib/types";
import {
  Bookmark,
  BookmarkCheck,
  Eye,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Star,
  Tv,
  Film,
} from "lucide-react";
import {
  saveToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  markSeen,
  markDisliked,
} from "@/lib/storage";

interface Props {
  card: RecommendationCard;
  personalityColor: string;
  personalityAccent: string;
  onHide: (tmdbId: number) => void;
}

const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

export default function RecommendationCardComponent({
  card,
  personalityColor,
  personalityAccent,
  onHide,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(() => isInWatchlist(card.tmdbId));
  const [seen, setSeen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeFromWatchlist(card.tmdbId);
      setSaved(false);
    } else {
      saveToWatchlist({
        tmdbId: card.tmdbId,
        title: card.title,
        posterPath: card.posterPath,
        mediaType: card.mediaType,
        savedAt: new Date().toISOString(),
      });
      setSaved(true);
    }
  };

  const handleSeen = (e: React.MouseEvent) => {
    e.stopPropagation();
    markSeen(card.tmdbId);
    setSeen(true);
    setTimeout(() => onHide(card.tmdbId), 300);
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    markDisliked(card.tmdbId);
    setDismissed(true);
    setTimeout(() => onHide(card.tmdbId), 300);
  };

  const matchColor =
    card.matchScore >= 90
      ? personalityColor
      : card.matchScore >= 75
      ? personalityAccent
      : "var(--text-muted)";

  return (
    <article
      className={`rounded-2xl overflow-hidden border card-hover flex flex-col transition-all duration-300 ${
        seen || dismissed ? "opacity-0 scale-95" : "opacity-100"
      }`}
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-[var(--elevated)] overflow-hidden">
        {card.posterPath ? (
          <Image
            src={`${TMDB_IMG}${card.posterPath}`}
            alt={card.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Film size={40} style={{ color: "var(--text-dim)" }} />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Match badge */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-ui font-semibold match-badge-glow"
          style={{
            background: "rgba(13,15,26,0.85)",
            color: matchColor,
            backdropFilter: "blur(8px)",
            border: `1px solid ${matchColor}55`,
          }}
        >
          {card.matchScore}% match
        </div>

        {/* Media type badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-ui"
          style={{
            background: "rgba(13,15,26,0.85)",
            color: "var(--text-muted)",
            backdropFilter: "blur(8px)",
          }}
        >
          {card.mediaType === "tv" ? <Tv size={11} /> : <Film size={11} />}
          {card.mediaType === "tv" ? "Series" : "Film"}
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <Star size={11} fill="#FBBF24" color="#FBBF24" />
            <span className="text-xs font-ui" style={{ color: "#FBBF24" }}>
              {card.rating}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              {card.year}
            </span>
          </div>
          <h3 className="font-display text-lg leading-tight text-white">
            {card.title}
          </h3>
        </div>
      </div>

      {/* Card body */}
      <div className="flex-1 flex flex-col p-5">
        {/* Genres */}
        {card.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {card.genres.map((g) => (
              <span
                key={g}
                className="px-2 py-0.5 rounded-md text-xs font-ui"
                style={{
                  background: "var(--elevated)",
                  color: "var(--text-dim)",
                }}
              >
                {g}
              </span>
            ))}
          </div>
        )}

        {/* Why it fits */}
        <div className="mb-3">
          <p
            className="text-xs font-ui uppercase tracking-wide mb-1.5"
            style={{ color: personalityColor }}
          >
            Why it fits you
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {card.whyItFits}
          </p>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-1 text-xs font-ui mb-3 transition-opacity hover:opacity-70"
          style={{ color: "var(--text-dim)" }}
        >
          {expanded ? (
            <>
              <ChevronUp size={13} /> Hide details
            </>
          ) : (
            <>
              <ChevronDown size={13} /> Show skip note & overview
            </>
          )}
        </button>

        {expanded && (
          <div className="space-y-3 mb-3">
            {/* Skip if */}
            <div
              className="rounded-xl p-3 border"
              style={{
                background: "rgba(251,191,36,0.05)",
                borderColor: "rgba(251,191,36,0.2)",
              }}
            >
              <p
                className="text-xs font-ui uppercase tracking-wide mb-1"
                style={{ color: "var(--amber)" }}
              >
                Skip if…
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {card.skipIf}
              </p>
            </div>

            {/* Overview */}
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-dim)" }}
            >
              {card.overview.length > 160
                ? card.overview.substring(0, 157) + "…"
                : card.overview}
            </p>
          </div>
        )}

        {/* Mood tags */}
        {card.moodTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {card.moodTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-ui border"
                style={{
                  background: `${personalityColor}12`,
                  borderColor: `${personalityColor}30`,
                  color: personalityColor,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-auto pt-3 border-t flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={handleSave}
            title={saved ? "Remove from watchlist" : "Save to watchlist"}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-ui border flex-1 justify-center transition-all"
            style={{
              background: saved ? `${personalityColor}20` : "var(--elevated)",
              borderColor: saved ? `${personalityColor}50` : "var(--border)",
              color: saved ? personalityColor : "var(--text-muted)",
            }}
          >
            {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
            {saved ? "Saved" : "Save"}
          </button>

          <button
            onClick={handleSeen}
            title="Mark as seen"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-ui border flex-1 justify-center transition-all hover:opacity-80"
            style={{
              background: "var(--elevated)",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <Eye size={13} />
            Seen it
          </button>

          <button
            onClick={handleDislike}
            title="Not interested"
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-ui border transition-all hover:border-red-500/30 hover:text-red-400"
            style={{
              background: "var(--elevated)",
              borderColor: "var(--border)",
              color: "var(--text-dim)",
            }}
          >
            <ThumbsDown size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
