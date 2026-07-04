"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { UserProfile, RecommendationCard as CardType, TMDbMovie } from "@/lib/types";
import { loadProfile, loadDisliked, loadSeen } from "@/lib/storage";
import { buildRecommendationCard } from "@/lib/recommendations";
import RecommendationCardComponent from "./RecommendationCard";
import { RefreshCw, Loader2 } from "lucide-react";

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
      const tags = Object.keys(userProfile.tagWeights).filter((t) => userProfile.tagWeights[t] > 0);

      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags, personalityId: userProfile.personality.id }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setDataSource(data.source);

      const seen = new Set(loadSeen());
      const disliked = new Set(loadDisliked());

      const results: CardType[] = (data.results as TMDbMovie[])
        .filter((item) => !seen.has(item.id) && !disliked.has(item.id))
        .map((item) => buildRecommendationCard(item, userProfile.personality, userProfile.tagWeights))
        .sort((a, b) => b.matchScore - a.matchScore);

      setCards(results);
    } catch {
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

  // Organize into curated bands instead of one uniform grid.
  const { tonight, slow, mixed } = useMemo(() => {
    const tonightPicks = visibleCards.filter((c) => c.matchScore >= 85).slice(0, 3);
    const usedIds = new Set(tonightPicks.map((c) => c.tmdbId));
    const remaining = visibleCards.filter((c) => !usedIds.has(c.tmdbId));

    const slowOnes = remaining.filter((c) =>
      c.moodTags.some((t) => ["drama", "prestige", "mystery"].includes(t))
    );
    const slowIds = new Set(slowOnes.map((c) => c.tmdbId));
    const rest = remaining.filter((c) => !slowIds.has(c.tmdbId));

    return { tonight: tonightPicks, slow: slowOnes, mixed: rest };
  }, [visibleCards]);

  if (!profile && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "var(--bg)" }}>
        <p className="font-display italic text-2xl mb-4" style={{ color: "var(--coral)" }}>
          No profile found
        </p>
        <h1 className="font-display text-3xl mb-4" style={{ color: "var(--text-primary)" }}>
          We don't know your type yet
        </h1>
        <p className="text-base mb-8 max-w-md" style={{ color: "var(--text-muted)" }}>
          Take the Watch Personality test first, and picks that actually fit will show up here.
        </p>
        <Link
          href="/quiz"
          className="press inline-flex items-center gap-2 px-6 py-3 rounded-full font-ui font-medium text-sm"
          style={{ background: "var(--coral)", color: "var(--ink)" }}
        >
          Take the test
        </Link>
      </div>
    );
  }

  const p = profile?.personality;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <nav
        className="sticky top-0 z-10 border-b"
        style={{ background: "rgba(21,19,15,0.92)", backdropFilter: "blur(12px)", borderColor: "var(--border-soft)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl tracking-tight" style={{ color: "var(--text-primary)" }}>
            Cine<span style={{ color: "var(--coral)" }}>Type</span>
          </Link>

          {p && (
            <Link
              href={`/result/${p.id}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-ui border"
              style={{ background: `${p.color}18`, borderColor: `${p.color}44`, color: p.color }}
            >
              <span>{p.emoji}</span>
              <span className="hidden sm:inline">{p.name}</span>
            </Link>
          )}

          <div className="flex items-center gap-2">
            <Link
              href="/watchlist"
              className="press flex items-center gap-1.5 text-sm font-ui px-4 py-2 rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              <span className="hidden sm:inline">Watchlist</span>
            </Link>
            <button
              onClick={() => profile && fetchRecommendations(profile)}
              disabled={loading}
              className="press flex items-center gap-1.5 text-sm font-ui px-4 py-2 rounded-full border disabled:opacity-40"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="mb-14 md:mb-20">
          {p ? (
            <>
              <p className="text-xs font-ui uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-dim)" }}>
                Curated for {p.name}
              </p>
              <h1 className="font-display text-4xl md:text-6xl mb-5 leading-tight" style={{ color: "var(--text-primary)" }}>
                Something you might
                <br />
                enjoy today.
              </h1>
              <p className="text-base max-w-xl" style={{ color: "var(--text-muted)" }}>
                Each pick comes with an honest reason it's here — and a note on who
                should skip it. Not sure why some of these fit. They just do.
              </p>
            </>
          ) : (
            <div className="animate-pulse">
              <div className="h-4 w-32 rounded mb-4" style={{ background: "var(--border)" }} />
              <div className="h-10 w-64 rounded" style={{ background: "var(--border)" }} />
            </div>
          )}
        </div>

        {!loading && dataSource === "mock" && (
          <div
            className="mb-10 rounded-2xl px-5 py-4 border text-sm"
            style={{ background: "var(--surface)", borderColor: "var(--border-soft)", color: "var(--text-muted)" }}
          >
            Showing curated picks. Add a{" "}
            <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: "var(--elevated)", color: "var(--gold)" }}>
              TMDB_API_KEY
            </code>{" "}
            environment variable to unlock live TMDb recommendations.
          </div>
        )}

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}>
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

        {error && !loading && (
          <div className="rounded-2xl p-8 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}>
            <p className="text-base mb-4" style={{ color: "var(--text-muted)" }}>
              {error}
            </p>
            <button
              onClick={() => profile && fetchRecommendations(profile)}
              className="press inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-ui text-sm"
              style={{ background: "var(--elevated)", color: "var(--text-primary)" }}
            >
              <RefreshCw size={14} /> Try again
            </button>
          </div>
        )}

        {!loading && !error && visibleCards.length > 0 && (
          <div className="space-y-16 md:space-y-20">
            {tonight.length > 0 && (
              <Band title="Tonight's picks" subtitle="The ones that feel right for right now.">
                {tonight.map((card) => (
                  <RecommendationCardComponent
                    key={card.tmdbId}
                    card={card}
                    personalityColor={p?.color ?? "#C1755A"}
                    personalityAccent={p?.accentColor ?? "#B99B5B"}
                    onHide={handleHide}
                  />
                ))}
              </Band>
            )}

            {slow.length > 0 && (
              <Band title="If you want something slower" subtitle="Patient stories, for when you're not in a rush.">
                {slow.map((card) => (
                  <RecommendationCardComponent
                    key={card.tmdbId}
                    card={card}
                    personalityColor={p?.color ?? "#C1755A"}
                    personalityAccent={p?.accentColor ?? "#B99B5B"}
                    onHide={handleHide}
                  />
                ))}
              </Band>
            )}

            {mixed.length > 0 && (
              <Band title="Everything else that fits" subtitle="Not sure why, but these felt right too.">
                {mixed.map((card) => (
                  <RecommendationCardComponent
                    key={card.tmdbId}
                    card={card}
                    personalityColor={p?.color ?? "#C1755A"}
                    personalityAccent={p?.accentColor ?? "#B99B5B"}
                    onHide={handleHide}
                  />
                ))}
              </Band>
            )}
          </div>
        )}

        {!loading && !error && visibleCards.length === 0 && cards.length > 0 && (
          <div className="text-center py-20">
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
              className="press inline-flex items-center gap-2 px-5 py-3 rounded-full font-ui font-medium text-sm"
              style={{ background: "var(--coral)", color: "var(--ink)" }}
            >
              <RefreshCw size={14} /> Load more picks
            </button>
          </div>
        )}

        {!loading && visibleCards.length > 0 && (
          <div className="mt-20 rounded-2xl p-8 md:p-10 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}>
            <p className="font-display text-xl mb-2" style={{ color: "var(--text-primary)" }}>
              Not what you expected?
            </p>
            <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
              Retake the test, or see all the personality types.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/quiz"
                className="press inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-ui text-sm border"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                Retake the test
              </Link>
              {p && (
                <Link
                  href={`/result/${p.id}`}
                  className="press inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-ui text-sm"
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

function Band({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl mb-1.5" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            {subtitle}
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
    </section>
  );
}
