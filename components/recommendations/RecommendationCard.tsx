"use client";

import { useState } from "react";
import Image from "next/image";
import { RecommendationCard } from "@/lib/types";
import { Bookmark, BookmarkCheck, Eye, ThumbsDown, ChevronDown, ChevronUp, Tv, Film } from "lucide-react";
import { saveToWatchlist, removeFromWatchlist, isInWatchlist, markSeen, markDisliked } from "@/lib/storage";

interface Props {
  card: RecommendationCard;
  personalityColor: string;
  personalityAccent: string;
  onHide: (tmdbId: number) => void;
}

const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

/** Turns a numeric match score into an honest, human phrase instead of a percentage badge. */
function feelsLikeLabel(score: number): string {
  if (score >= 90) return "this is basically you";
  if (score >= 78) return "feels right for tonight";
  if (score >= 65) return "worth the risk";
  return "a bit of a stretch, but hear it out";
}

export default function RecommendationCardComponent({ card, personalityColor, personalityAccent, onHide }: Props) {
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
    setTimeout(() => onHide(card.tmdbId), 500);
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    markDisliked(card.tmdbId);
    setDismissed(true);
    setTimeout(() => onHide(card.tmdbId), 500);
  };

  return (
    <article
      className={`rounded-2xl overflow-hidden card-hover flex flex-col transition-opacity duration-500 ${
        seen || dismissed ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}
    >
      {/* Poster — cinematic emphasis, slow drift on hover, no rating overlay clutter */}
      <div className="relative aspect-[2/3] overflow-hidden" style={{ background: "var(--elevated)" }}>
        {card.posterPath ? (
          <div className="poster-drift w-full h-full relative">
            <Image
              src={`${TMDB_IMG}${card.posterPath}`}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Film size={40} style={{ color: "var(--text-dim)" }} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

        {/* Media type — quiet, corner label, not a badge row */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-ui"
          style={{ background: "rgba(21,19,15,0.75)", color: "rgba(237,230,217,0.85)", backdropFilter: "blur(6px)" }}
        >
          {card.mediaType === "tv" ? <Tv size={11} /> : <Film size={11} />}
          {card.mediaType === "tv" ? "Series" : "Film"}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p
            className="font-display italic text-xs mb-1.5"
            style={{ color: personalityAccent }}
          >
            {feelsLikeLabel(card.matchScore)}
          </p>
          <h3 className="font-display text-lg leading-tight text-white">{card.title}</h3>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
            {card.year}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col p-5">
        {/* Mood tags — the primary label system, felt not technical */}
        {card.moodTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {card.moodTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs font-ui border"
                style={{
                  background: `${personalityColor}14`,
                  borderColor: `${personalityColor}35`,
                  color: personalityColor,
                }}
              >
                {tag.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        )}

        <div className="mb-3">
          <p className="text-xs font-ui uppercase tracking-wide mb-1.5" style={{ color: "var(--text-dim)" }}>
            Why it fits
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {card.whyItFits}
          </p>
        </div>

        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-1 text-xs font-ui mb-3 transition-opacity hover:opacity-70 self-start"
          style={{ color: "var(--text-dim)" }}
        >
          {expanded ? (
            <>
              <ChevronUp size={13} /> Hide details
            </>
          ) : (
            <>
              <ChevronDown size={13} /> Skip note &amp; overview
            </>
          )}
        </button>

        {expanded && (
          <div className="space-y-3 mb-3">
            <div className="rounded-xl p-3" style={{ background: "var(--elevated)" }}>
              <p className="text-xs font-ui uppercase tracking-wide mb-1" style={{ color: "var(--gold)" }}>
                Might not be for you if
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {card.skipIf}
              </p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {card.overview.length > 160 ? card.overview.substring(0, 157) + "…" : card.overview}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto pt-3 border-t flex items-center gap-2" style={{ borderColor: "var(--border-soft)" }}>
          <button
            onClick={handleSave}
            title={saved ? "Remove from watchlist" : "Save to watchlist"}
            className="press flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-ui border flex-1 justify-center"
            style={{
              background: saved ? `${personalityColor}20` : "var(--elevated)",
              borderColor: saved ? `${personalityColor}55` : "var(--border-soft)",
              color: saved ? personalityColor : "var(--text-muted)",
            }}
          >
            {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
            {saved ? "Saved" : "Save"}
          </button>

          <button
            onClick={handleSeen}
            title="Mark as seen"
            className="press flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-ui border flex-1 justify-center"
            style={{ background: "var(--elevated)", borderColor: "var(--border-soft)", color: "var(--text-muted)" }}
          >
            <Eye size={13} />
            Seen it
          </button>

          <button
            onClick={handleDislike}
            title="Not interested"
            className="press flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-ui border"
            style={{ background: "var(--elevated)", borderColor: "var(--border-soft)", color: "var(--text-dim)" }}
          >
            <ThumbsDown size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
