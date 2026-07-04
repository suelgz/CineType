"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { UserProfile, RecommendationCard as CardType, TMDbMovie } from "@/lib/types";
import { loadProfile } from "@/lib/storage";
import { buildRecommendationCard } from "@/lib/recommendations";
import RecommendationCardComponent from "./RecommendationCard";
import { ArrowLeft, RefreshCw, Loader2 } from "lucide-react";
import { loadDisliked, loadSeen } from "@/lib/storage";

export default function RecommendationsClient() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"tmdb" | "mock">("mock");
  const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());

  const fetchRecommendations = useCallback(async (userProfile: UserProfile) => {
    setLoading(true);
    setError(null);
    try {
      const tags = Object.keys(userProfile.tagWeights).filter(
        (t) => userProfile.tagWeights[t] > 0
      );

      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tags,
          personalityId: userProfile.personality.id,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setDataSource(data.source);

      const seen = new Set(loadSeen());
      const disliked = new Set(loadDisliked());

      const results: CardType[] = (data.results as TMDbMovie[])
        .filter((item) => !seen.has(item.id) && !disliked.has(item.id))
        .map((item) =>
          buildRecommendationCard(item, userProfile.personality, userProfile.tagWeights)
        )
        .sort((a, b) => b.matchScore - a.matchScore);

      setCards(results);
    } catch (e) {
      setError("Couldn't load recommendations. Try refreshing.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const p = loadProfile();
    if (p) {
      setProfile(p);
      fetchRecommendations(p);
    } else {
      setLoading(false);
    }
  }, [fetchRecommendations]);

  const handleHide = useCallback((tmdbId: number) => {
    setHiddenIds((prev) => new Set([...prev, tmdbId]));
  }, []);

  const visibleCards = cards.filter((c) => !hiddenIds.has(c.tmdbId));

  if (!profile && !loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "var(--bg)" }}
      >
        <div className="text-5xl mb-6">🎬</div>
        <h1
          className="font-display text-3xl mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          No profile found
        </h1>
        <p className="text-base mb-8 max-w-md" style={{ color: "var(--text-muted)" }}>
          Take the Watch Personality test first to get personalized recommendations.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-ui font-medium text-sm"
          style={{ background: "var(--violet)", color: "#0D0F1A" }}
        >
          Take the Test
        </Link>
      </div>
    );
  }

  const p = profile?.personality;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Background glow */}
      {p && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-0 right-0 w-[600px] h-[400px] opacity-10 blur-3xl"
            style={{
              background: `radial-gradient(ellipse, ${p.color}, transparent)`,
            }}
          />
        </div>
      )}

      {/* Nav */}
      <nav className="relative z-10 sticky top-0 border-b" style={{
        background: "rgba(13,15,26,0.9)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--border)"
      }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Cine<span style={{ color: "var(--violet)" }}>Type</span>
          </Link>

          {p && (
            <Link
              href={`/result/${p.id}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-ui border"
              style={{
                background: `${p.color}18`,
                borderColor: `${p.color}44`,
                color: p.color,
              }}
            >
              <span>{p.emoji}</span>
              <span className="hidden sm:inline">{p.name}</span>
            </Link>
          )}

          <div className="flex items-center gap-2">
            <Link
              href="/watchlist"
              className="flex items-center gap-1.5 text-sm font-ui px-4 py-2 rounded-xl border transition-opacity hover:opacity-70"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              <span className="hidden sm:inline">Watchlist</span>
              <span className="sm:hidden">📋</span>
            </Link>
            <button
              onClick={() => profile && fetchRecommendations(profile)}
              disabled={loading}
              className="flex items-center gap-1.5 text-sm font-ui px-4 py-2 rounded-xl border transition-opacity hover:opacity-70 disabled:opacity-40"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          {p ? (
            <>
              <p
                className="text-xs font-ui uppercase tracking-widest mb-3"
                style={{ color: "var(--text-dim)" }}
              >
                Picked for {p.name}
              </p>
              <h1
                className="font-display text-4xl md:text-5xl mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Your picks
              </h1>
              <p className="text-base max-w-xl" style={{ color: "var(--text-muted)" }}>
                Every card below explains why it fits you — and who should skip it.
                Hit "Not interested" to never see it again.
              </p>
            </>
          ) : (
            <div className="animate-pulse">
              <div className="h-4 w-32 rounded mb-4" style={{ background: "var(--border)" }} />
              <div className="h-10 w-64 rounded" style={{ background: "var(--border)" }} />
            </div>
          )}
        </div>

        {/* Data source notice */}
        {!loading && dataSource === "mock" && (
          <div
            className="mb-8 rounded-2xl px-5 py-4 border text-sm flex items-start gap-3"
            style={{
              background: "rgba(251,191,36,0.08)",
              borderColor: "rgba(251,191,36,0.25)",
              color: "var(--text-muted)",
            }}
          >
            <span className="text-base">💡</span>
            <span>
              Showing curated picks. Add a{" "}
              <code className="px-1 py-0.5 rounded text-xs" style={{ background: "var(--elevated)", color: "var(--amber)" }}>
                TMDB_API_KEY
              </code>{" "}
              environment variable to unlock live TMDb recommendations.
            </span>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="aspect-[2/3] poster-skeleton" />
                <div className="p-5 space-y-3">
                  <div className="h-4 rounded w-3/4 poster-skeleton" />
                  <div className="h-3 rounded w-1/2 poster-skeleton" />
                  <div className="h-3 rounded poster-skeleton" />
                  <div className="h-3 rounded w-5/6 poster-skeleton" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div
            className="rounded-2xl p-8 border text-center"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <p className="text-base mb-4" style={{ color: "var(--text-muted)" }}>
              {error}
            </p>
            <button
              onClick={() => profile && fetchRecommendations(profile)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-ui text-sm"
              style={{ background: "var(--elevated)", color: "var(--text-primary)" }}
            >
              <RefreshCw size={14} /> Try again
            </button>
          </div>
        )}

        {/* Cards grid */}
        {!loading && !error && visibleCards.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCards.map((card, i) => (
              <div
                key={card.tmdbId}
                className="fade-up"
                style={{ animationDelay: `${Math.min(i * 0.08, 0.5)}s`, opacity: 0 }}
              >
                <RecommendationCardComponent
                  card={card}
                  personalityColor={p?.color ?? "#A78BFA"}
                  personalityAccent={p?.accentColor ?? "#F472B6"}
                  onHide={handleHide}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && visibleCards.length === 0 && cards.length > 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🎬</div>
            <h2 className="font-display text-2xl mb-3" style={{ color: "var(--text-primary)" }}>
              You've gone through everything
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Refresh to see a new set of picks.
            </p>
            <button
              onClick={() => {
                setHiddenIds(new Set());
                profile && fetchRecommendations(profile);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-ui font-medium text-sm"
              style={{ background: "var(--violet)", color: "#0D0F1A" }}
            >
              <RefreshCw size={14} /> Load more picks
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && visibleCards.length > 0 && (
          <div
            className="mt-16 rounded-2xl p-8 border text-center"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <p className="font-display text-xl mb-2" style={{ color: "var(--text-primary)" }}>
              Not what you expected?
            </p>
            <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
              Retake the test or see all personality types.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-ui text-sm border"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                Retake the test
              </Link>
              {p && (
                <Link
                  href={`/result/${p.id}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-ui text-sm"
                  style={{ background: "var(--elevated)", color: "var(--text-primary)" }}
                >
                  Back to my result
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
