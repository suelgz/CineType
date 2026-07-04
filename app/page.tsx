import Link from "next/link";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";

export default function LandingPage() {
  const personalities = [
    { name: "The Chaos Romantic", emoji: "🌹", color: "#A78BFA" },
    { name: "The Villain Apologist", emoji: "🎭", color: "#818CF8" },
    { name: "The Prestige Snob", emoji: "🎬", color: "#D4A853" },
    { name: "The Dark Comfort Watcher", emoji: "🕯️", color: "#6EE7B7" },
    { name: "The Brainrot Binger", emoji: "📱", color: "#FB7185" },
    { name: "The Mind Game Addict", emoji: "🔍", color: "#818CF8" },
    { name: "The Soft Escapist", emoji: "☕", color: "#FCD34D" },
    { name: "The Rich Drama Gremlin", emoji: "💸", color: "#F59E0B" },
    { name: "The Cozy Mystery Soul", emoji: "🔎", color: "#7DD3FC" },
    { name: "The Slow-Burn Devotee", emoji: "🕰️", color: "#93C5FD" },
    { name: "The Female Rage Enjoyer", emoji: "🔥", color: "#FCA5A5" },
    { name: "The Supernatural Comfort Seeker", emoji: "✨", color: "#C084FC" },
  ];

  return (
    <main
      style={{ background: "var(--bg)" }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Background glow orbs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
        />
        <div
          className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #F472B6, transparent)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #A78BFA, transparent)" }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <span
          className="font-display text-xl tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Cine<span style={{ color: "var(--violet)" }}>Type</span>
        </span>
        <div className="flex items-center gap-5">
          <Link
            href="/watchlist"
            className="text-sm font-ui"
            style={{ color: "var(--text-muted)" }}
          >
            Watchlist
          </Link>
          <Link
            href="/credits"
            className="text-sm font-ui"
            style={{ color: "var(--text-muted)" }}
          >
            Credits
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-ui mb-8 border"
          style={{
            background: "rgba(167, 139, 250, 0.1)",
            borderColor: "rgba(167, 139, 250, 0.3)",
            color: "var(--violet)",
          }}
        >
          <Sparkles size={12} />
          <span>12 Watch Personalities. Infinite bad decisions about sleep.</span>
        </div>

        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Find what your brain
          <br />
          <em className="not-italic" style={{ color: "var(--violet)" }}>
            actually
          </em>{" "}
          wants to watch.
        </h1>

        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Stop scrolling. Take a 10-question personality test and discover
          movies and shows that match how you{" "}
          <em>actually</em> experience stories — not just what you clicked once.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/quiz"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-ui font-medium transition-all duration-200 w-full sm:w-auto justify-center"
            style={{
              background: "var(--violet)",
              color: "#0D0F1A",
            }}
          >
            Take the Watch Test
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            href="/result/chaos_romantic"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-ui font-medium transition-all duration-200 w-full sm:w-auto justify-center border"
            style={{
              background: "transparent",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          >
            <Zap size={16} style={{ color: "var(--amber)" }} />
            I Know My Type
          </Link>
        </div>

        {/* Personality pill carousel */}
        <div className="relative overflow-hidden">
          <div className="flex gap-3 flex-wrap justify-center max-w-4xl mx-auto">
            {personalities.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-ui border whitespace-nowrap"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                <span>{p.emoji}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-center mb-14">
          <p
            className="font-ui text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--text-dim)" }}
          >
            How it works
          </p>
          <h2
            className="font-display text-3xl md:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Three steps to your next obsession
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Take the test",
              desc: "10 questions about how you actually watch stories — not what genres you like. Brutally honest. Surprisingly accurate.",
              icon: "🧠",
            },
            {
              step: "02",
              title: "Get your archetype",
              desc: "You'll get one of 12 Watch Personalities, explained in a way that makes you want to text someone 'this is literally me.'",
              icon: "🎭",
            },
            {
              step: "03",
              title: "Discover your picks",
              desc: "Every recommendation comes with a reason why it fits you — and an honest note on who should skip it.",
              icon: "🎬",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl p-6 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <div
                className="text-xs font-ui font-medium mb-2"
                style={{ color: "var(--violet)" }}
              >
                {item.step}
              </div>
              <h3
                className="font-display text-xl mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Personality showcase */}
      <section
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-center mb-14">
          <h2
            className="font-display text-3xl md:text-4xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Which one are you?
          </h2>
          <p className="text-base" style={{ color: "var(--text-muted)" }}>
            Take the test to find out — or recognize yourself immediately.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalities.slice(0, 6).map((p) => (
            <div
              key={p.name}
              className="rounded-2xl p-5 border card-hover cursor-pointer"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <span className="text-2xl block mb-3">{p.emoji}</span>
              <h3
                className="font-display text-lg"
                style={{ color: p.color }}
              >
                {p.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-ui font-medium text-sm transition-all duration-200 border"
            style={{
              background: "transparent",
              borderColor: "var(--violet)",
              color: "var(--violet)",
            }}
          >
            Find your type
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Social proof band */}
      <section
        className="relative z-10 border-t border-b"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {[
            { stat: "12", label: "Watch Personalities" },
            { stat: "10", label: "Questions to your type" },
            { stat: "∞", label: "Possible obsessions" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div
                className="font-display text-3xl mb-1"
                style={{ color: "var(--violet)" }}
              >
                {item.stat}
              </div>
              <div className="text-sm font-ui" style={{ color: "var(--text-muted)" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        <h2
          className="font-display text-4xl md:text-6xl mb-6 leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Your next favorite show
          <br />
          is waiting for you to
          <br />
          <em
            className="not-italic"
            style={{ color: "var(--violet)" }}
          >
            stop scrolling.
          </em>
        </h2>
        <p
          className="text-lg mb-10 max-w-xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Takes 3 minutes. No account required. Results are shareable.
        </p>
        <Link
          href="/quiz"
          className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-lg font-ui font-medium transition-all duration-200"
          style={{ background: "var(--violet)", color: "#0D0F1A" }}
        >
          Take the Watch Test
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 border-t px-6 py-8"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: "var(--text-dim)" }}
        >
          <span className="font-display text-base" style={{ color: "var(--text-muted)" }}>
            Cine<span style={{ color: "var(--violet)" }}>Type</span>
          </span>
          <div className="flex items-center gap-6">
            <Link href="/credits" className="hover:opacity-80 transition-opacity">
              TMDb Credits
            </Link>
            <Link href="/quiz" className="hover:opacity-80 transition-opacity">
              Take the Test
            </Link>
          </div>
          <span>Built for people who watch too much.</span>
        </div>
      </footer>
    </main>
  );
}
