import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PERSONALITIES } from "@/lib/personalities";
import RevealSection from "@/components/RevealSection";
import CoffeeLink from "@/components/CoffeeLink";

export default function LandingPage() {
  const featured = PERSONALITIES.slice(0, 5);
  const rest = PERSONALITIES.slice(5);

  return (
    <main style={{ background: "var(--bg)" }} className="min-h-screen">
      {/* Masthead */}
      <header
        className="border-b"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <span
            className="font-display text-xl tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Cine<span style={{ color: "var(--coral)" }}>Type</span>
          </span>
          <nav className="flex items-center gap-6">
            <Link
              href="/watchlist"
              className="text-sm font-ui hidden sm:inline"
              style={{ color: "var(--text-muted)" }}
            >
              Watchlist
            </Link>
            <Link
              href="/credits"
              className="text-sm font-ui hidden sm:inline"
              style={{ color: "var(--text-muted)" }}
            >
              Credits
            </Link>
            <CoffeeLink variant="nav" />
            <Link
              href="/quiz"
              className="press text-sm font-ui px-4 py-2 rounded-full"
              style={{ background: "var(--coral)", color: "var(--ink)" }}
            >
              Take the test
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero — asymmetric editorial split, not a centered gradient hero */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-16 md:pb-24">
        <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-end">
          <div className="md:col-span-8">
            <p
              className="text-xs font-ui uppercase tracking-[0.2em] mb-6"
              style={{ color: "var(--text-dim)" }}
            >
              A watch-personality diagnosis, delivered kindly
            </p>
            <h1
              className="font-display text-[2.75rem] leading-[1.05] sm:text-6xl md:text-[5.2rem] md:leading-[0.98] mb-2"
              style={{ color: "var(--text-primary)", fontWeight: 500 }}
            >
              Find what your
              <br />
              brain{" "}
              <span
                className="italic"
                style={{ color: "var(--coral)", fontWeight: 400 }}
              >
                actually
              </span>
              <br />
              wants to watch.
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-3">
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              Ten slightly nosy questions about how you watch things — not
              what genres you'd claim at a dinner party. On the other side:
              one of twelve Watch Personalities, and a shelf of picks that
              actually fit, no percentages pretending to be science.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/quiz"
                className="press group flex items-center justify-between gap-3 px-6 py-4 rounded-2xl text-base font-ui font-medium"
                style={{ background: "var(--coral)", color: "var(--ink)" }}
              >
                Take the Watch Test
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <Link
                href="/result/chaos_romantic"
                className="press flex items-center justify-between gap-3 px-6 py-4 rounded-2xl text-sm font-ui border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                I already know my type
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial rule with small stat marginalia, not a stat-card row */}
      <section
        className="border-t border-b"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex flex-wrap items-center gap-x-10 gap-y-2">
          <span className="text-sm font-ui" style={{ color: "var(--text-dim)" }}>
            12 Watch Personalities
          </span>
          <span className="text-sm font-ui" style={{ color: "var(--text-dim)" }}>
            10 questions, about three minutes
          </span>
          <span className="text-sm font-ui" style={{ color: "var(--text-dim)" }}>
            No account, no email, no catch
          </span>
        </div>
      </section>

      {/* How it works — margin-note numbering, left rail style */}
      <RevealSection className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-4">
            <p
              className="font-display text-2xl md:text-3xl italic reveal"
              style={{ color: "var(--text-primary)" }}
            >
              Three steps. Minimal shame.
            </p>
          </div>
          <div className="md:col-span-8 md:pl-10 md:border-l" style={{ borderColor: "var(--border-soft)" }}>
            <div className="space-y-10">
              {[
                {
                  mark: "One",
                  title: "Pick your battlefield",
                  desc: "Movies, series, or both — tell us where you actually live, not where you pretend you live for your Letterboxd bio.",
                },
                {
                  mark: "Two",
                  title: "Answer honestly, not aspirationally",
                  desc: "Ten questions about how you really watch things — the villains you defend, the finale you're still mad about. Not what a well-read person would pick.",
                },
                {
                  mark: "Three",
                  title: "Meet your Watch Personality",
                  desc: "One of twelve archetypes, written with enough accuracy that you'll screenshot it before you've finished reading it.",
                },
              ].map((item) => (
                <div key={item.mark} className="reveal flex gap-6">
                  <span
                    className="font-display italic text-lg pt-0.5 w-14 shrink-0"
                    style={{ color: "var(--coral)" }}
                  >
                    {item.mark}
                  </span>
                  <div>
                    <h3
                      className="font-display text-xl md:text-2xl mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm md:text-base leading-relaxed max-w-lg"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Personality showcase — asymmetric, unrepeated card shapes, not a uniform grid */}
      <RevealSection
        className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 border-t"
        style={{ borderColor: "var(--border-soft)" } as React.CSSProperties}
      >
        <div className="flex items-end justify-between mb-12 md:mb-16 gap-6 reveal">
          <h2
            className="font-display text-3xl md:text-5xl leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Which one
            <br />
            are you?
          </h2>
          <p
            className="text-sm md:text-base max-w-xs text-right hidden sm:block"
            style={{ color: "var(--text-muted)" }}
          >
            Recognize yourself already? Take the test anyway — it's better with proof.
          </p>
        </div>

        {/* Featured five: uneven column spans, one deliberately larger */}
        <div className="grid md:grid-cols-12 gap-4 mb-4">
          {featured.map((p, i) => {
            const span =
              i === 0 ? "md:col-span-5" : i === 1 ? "md:col-span-3" : i === 2 ? "md:col-span-4" : i === 3 ? "md:col-span-4" : "md:col-span-8";
            const tall = i === 0;
            return (
              <div
                key={p.id}
                className={`reveal ${span} rounded-2xl p-6 md:p-7 card-hover ${tall ? "md:row-span-2" : ""}`}
                style={{
                  background: `linear-gradient(155deg, ${p.color}26, var(--surface) 60%)`,
                  border: `1px solid ${p.color}3a`,
                }}
              >
                <span className="text-3xl block mb-6">{p.emoji}</span>
                <h3
                  className="font-display text-xl md:text-2xl mb-3 leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-sm leading-relaxed italic"
                  style={{ color: p.accentColor }}
                >
                  &ldquo;{p.tagline}&rdquo;
                </p>
              </div>
            );
          })}
        </div>

        {/* Remaining as a quieter inline list, not another card grid */}
        <div
          className="reveal flex flex-wrap gap-x-8 gap-y-4 pt-8 mt-4 border-t"
          style={{ borderColor: "var(--border-soft)" }}
        >
          {rest.map((p) => (
            <span
              key={p.id}
              className="text-sm font-ui flex items-center gap-2"
              style={{ color: "var(--text-muted)" }}
            >
              <span>{p.emoji}</span>
              {p.name}
            </span>
          ))}
        </div>

        <div className="mt-12 reveal">
          <Link
            href="/quiz"
            className="press inline-flex items-center gap-2 px-6 py-3 rounded-full font-ui text-sm border"
            style={{ borderColor: "var(--coral)", color: "var(--coral)" }}
          >
            Find your type
            <ArrowRight size={15} />
          </Link>
        </div>
      </RevealSection>

      {/* Final CTA — quiet, no gradient wash */}
      <section
        className="border-t"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="md:max-w-2xl">
            <h2
              className="font-display text-3xl md:text-5xl leading-tight mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Your next favorite thing is waiting for you to{" "}
              <span className="italic" style={{ color: "var(--coral)" }}>
                stop scrolling.
              </span>
            </h2>
            <p
              className="text-base md:text-lg mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Takes about three minutes. No account, no email, no fine print.
              We just want to know what's wrong with you, watch-wise.
            </p>
            <Link
              href="/quiz"
              className="press group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-ui font-medium"
              style={{ background: "var(--coral)", color: "var(--ink)" }}
            >
              Take the Watch Test
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t px-6 md:px-10 py-8"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <span
            className="font-display text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Cine<span style={{ color: "var(--coral)" }}>Type</span>
          </span>
          <div className="flex items-center gap-6" style={{ color: "var(--text-dim)" }}>
            <Link href="/credits" className="hover:opacity-80 transition-opacity">
              TMDb credits
            </Link>
            <Link href="/quiz" className="hover:opacity-80 transition-opacity">
              Take the test
            </Link>
          </div>
          <CoffeeLink variant="full" />
        </div>
      </footer>
    </main>
  );
}
