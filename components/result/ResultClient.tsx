"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WatchPersonality } from "@/lib/types";
import { loadProfile } from "@/lib/storage";
import { ArrowRight, Share2, RefreshCw } from "lucide-react";
import CoffeeLink from "@/components/CoffeeLink";

interface Props {
  personality: WatchPersonality;
}

export default function ResultClient({ personality }: Props) {
  const [copied, setCopied] = useState(false);
  const [profileMatch, setProfileMatch] = useState(false);

  useEffect(() => {
    const profile = loadProfile();
    if (profile && profile.personality.id === personality.id) {
      setProfileMatch(true);
    }
  }, [personality.id]);

  const handleShare = async () => {
    const text = `I'm ${personality.name} on CineType\n"${personality.tagline}"\n\nFind your Watch Personality →`;
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Watch Personality", text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <nav
        className="flex items-center justify-between px-6 md:px-10 py-6 max-w-5xl mx-auto border-b"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <Link href="/" className="font-display text-xl tracking-tight" style={{ color: "var(--text-primary)" }}>
          Cine<span style={{ color: "var(--coral)" }}>Type</span>
        </Link>
        <div className="flex items-center gap-2">
          <CoffeeLink variant="nav" />
          <Link
            href="/quiz"
            className="flex items-center gap-1.5 text-sm font-ui px-4 py-2 rounded-full border transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <RefreshCw size={13} />
            Retake
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-14 md:py-20 pb-24">
        {/* Feature spread masthead */}
        <div className="fade-up fade-up-1 mb-12 md:mb-16">
          <p
            className="text-xs font-ui uppercase tracking-[0.2em] mb-6"
            style={{ color: personality.accentColor }}
          >
            Your watch personality
          </p>
          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-9">
              <h1
                className="font-display text-4xl md:text-6xl leading-[1.03] mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                {personality.name}
              </h1>
              <p
                className="font-display italic text-lg md:text-2xl leading-snug max-w-2xl"
                style={{ color: personality.accentColor }}
              >
                &ldquo;{personality.tagline}&rdquo;
              </p>
            </div>
            <div className="md:col-span-3 flex md:justify-end">
              <span className="text-6xl md:text-7xl leading-none">{personality.emoji}</span>
            </div>
          </div>
        </div>

        {/* Body copy — editorial two-column, not a boxed card */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-6 mb-16 fade-up fade-up-2">
          <div className="md:col-span-1 hidden md:block">
            <div className="w-px h-full mx-auto" style={{ background: personality.color }} />
          </div>
          <div className="md:col-span-11 md:pl-4 space-y-6">
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              {personality.description}
            </p>
            <p
              className="text-base leading-relaxed max-w-2xl"
              style={{ color: "var(--text-muted)" }}
            >
              {personality.longDescription}
            </p>
          </div>
        </div>

        {/* What you love / what bores you — asymmetric, not matching cards */}
        <div className="grid md:grid-cols-12 gap-4 mb-6">
          <div
            className="md:col-span-7 rounded-2xl p-7 md:p-9 fade-up fade-up-3"
            style={{
              background: `linear-gradient(155deg, ${personality.color}22, var(--surface) 65%)`,
              border: `1px solid ${personality.color}3a`,
            }}
          >
            <h3 className="font-display text-xl md:text-2xl mb-5" style={{ color: "var(--text-primary)" }}>
              What you love in stories
            </h3>
            <ul className="space-y-3.5">
              {personality.loves.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-display italic mt-0.5" style={{ color: personality.color }}>
                    &amp;
                  </span>
                  <span className="text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="md:col-span-5 rounded-2xl p-7 md:p-9 fade-up fade-up-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}
          >
            <h3 className="font-display text-xl mb-5" style={{ color: "var(--text-primary)" }}>
              What usually bores you
            </h3>
            <ul className="space-y-3.5">
              {personality.bores.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1" style={{ color: "var(--text-dim)" }}>
                    &mdash;
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Character type + tags */}
        <div
          className="rounded-2xl p-7 md:p-9 mb-16 fade-up fade-up-4"
          style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}
        >
          <p className="text-xs font-ui uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-dim)" }}>
            The character you always fall for
          </p>
          <p
            className="font-display italic text-lg md:text-xl mb-6"
            style={{ color: personality.accentColor }}
          >
            &ldquo;{personality.characterType}&rdquo;
          </p>
          <div className="flex flex-wrap gap-2">
            {personality.primaryTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-ui border"
                style={{
                  background: `${personality.color}18`,
                  borderColor: `${personality.color}40`,
                  color: personality.color,
                }}
              >
                {tag.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 fade-up fade-up-5">
          <button
            onClick={handleShare}
            className="press flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-ui font-medium text-sm border flex-1"
            style={{ background: "transparent", borderColor: personality.color, color: personality.color }}
          >
            <Share2 size={16} />
            {copied ? "Link copied" : "Share your result"}
          </button>

          <Link
            href="/recommendations"
            className="press group flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-ui font-medium text-sm flex-1"
            style={{ background: personality.color, color: "var(--ink)" }}
          >
            See what fits me
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {!profileMatch && (
          <div
            className="mt-10 rounded-2xl p-6 text-center fade-up"
            style={{ background: "var(--surface)", border: "1px solid var(--border-soft)" }}
          >
            <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
              Is this actually you, or did you just click a link your friend sent? Take the real quiz.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 text-sm font-ui font-medium"
              style={{ color: "var(--coral)" }}
            >
              Take the ten-question test →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
