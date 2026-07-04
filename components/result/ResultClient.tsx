"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WatchPersonality } from "@/lib/types";
import { loadProfile } from "@/lib/storage";
import { ArrowRight, Share2, RefreshCw } from "lucide-react";

interface Props {
  personality: WatchPersonality;
}

export default function ResultClient({ personality }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [profileMatch, setProfileMatch] = useState(false);

  useEffect(() => {
    const profile = loadProfile();
    if (profile && profile.personality.id === personality.id) {
      setProfileMatch(true);
    }
  }, [personality.id]);

  const handleShare = async () => {
    const text = `I'm ${personality.name} on CineType 🎬\n"${personality.tagline}"\n\nFind your Watch Personality →`;
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Watch Personality", text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)" }}
    >
      {/* Background accent */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-15 blur-3xl"
          style={{
            background: `radial-gradient(ellipse, ${personality.color}, transparent)`,
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <Link
          href="/"
          className="font-display text-xl tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Cine<span style={{ color: "var(--violet)" }}>Type</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/quiz"
            className="flex items-center gap-1.5 text-sm font-ui px-4 py-2 rounded-xl border transition-opacity hover:opacity-70"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <RefreshCw size={13} />
            Retake
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        {/* Main personality card */}
        <div
          className="rounded-3xl overflow-hidden border mb-8 grain-overlay fade-up fade-up-1"
          style={{
            background: `linear-gradient(135deg, ${personality.color}22, ${personality.accentColor}11, var(--surface))`,
            borderColor: `${personality.color}44`,
          }}
        >
          <div className="p-8 md:p-12">
            {/* Label */}
            <p
              className="text-xs font-ui uppercase tracking-widest mb-4"
              style={{ color: personality.accentColor }}
            >
              Your Watch Personality
            </p>

            {/* Emoji + Name */}
            <div className="flex items-start gap-4 mb-6">
              <span className="text-5xl md:text-6xl">{personality.emoji}</span>
              <div>
                <h1
                  className="font-display text-3xl md:text-5xl leading-tight mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {personality.name}
                </h1>
                <p
                  className="text-base md:text-lg italic font-display"
                  style={{ color: personality.accentColor }}
                >
                  "{personality.tagline}"
                </p>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ color: "var(--text-muted)" }}
            >
              {personality.description}
            </p>

            {/* Long description */}
            <p
              className="text-sm leading-relaxed max-w-2xl"
              style={{ color: "var(--text-dim)" }}
            >
              {personality.longDescription}
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* What you love */}
          <div
            className="rounded-2xl p-6 border fade-up fade-up-2"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <h3
              className="font-display text-lg mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              What you love in stories
            </h3>
            <ul className="space-y-3">
              {personality.loves.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: personality.color }}>✦</span>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* What bores you */}
          <div
            className="rounded-2xl p-6 border fade-up fade-up-3"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <h3
              className="font-display text-lg mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              What usually bores you
            </h3>
            <ul className="space-y-3">
              {personality.bores.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: "var(--text-dim)" }}>✕</span>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Character type + Tags */}
        <div
          className="rounded-2xl p-6 border mb-8 fade-up fade-up-3"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h3
            className="font-display text-lg mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            The character you always fall for
          </h3>
          <p className="text-base italic" style={{ color: personality.accentColor }}>
            "{personality.characterType}"
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {personality.primaryTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-ui border"
                style={{
                  background: `${personality.color}18`,
                  borderColor: `${personality.color}44`,
                  color: personality.color,
                }}
              >
                #{tag.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>

        {/* Share + CTA */}
        <div className="flex flex-col sm:flex-row gap-4 fade-up fade-up-4">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-ui font-medium text-sm border transition-all duration-200 flex-1"
            style={{
              background: "var(--surface)",
              borderColor: personality.color,
              color: personality.color,
            }}
          >
            <Share2 size={16} />
            {copied ? "Link copied!" : "Share your result"}
          </button>

          <Link
            href={`/recommendations`}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-ui font-medium text-sm transition-all duration-200 flex-1 group"
            style={{
              background: personality.color,
              color: "#0D0F1A",
            }}
          >
            See my recommendations
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Retake prompt if viewing someone else's result */}
        {!profileMatch && (
          <div
            className="mt-8 rounded-2xl p-5 border text-center fade-up fade-up-5"
            style={{
              background: "rgba(167,139,250,0.05)",
              borderColor: "rgba(167,139,250,0.2)",
            }}
          >
            <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
              Is this actually you? Take the quiz to find your real type.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 text-sm font-ui font-medium"
              style={{ color: "var(--violet)" }}
            >
              Take the 10-question test →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
