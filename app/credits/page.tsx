import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreditsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <nav className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Cine<span style={{ color: "var(--coral)" }}>Type</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-ui"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={14} /> Back
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pb-24 pt-8">
        <h1
          className="font-display text-4xl mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Credits & Attribution
        </h1>
        <p className="text-base mb-12" style={{ color: "var(--text-muted)" }}>
          CineType is built on the shoulders of some excellent data sources.
        </p>

        {/* TMDb attribution - required */}
        <div
          className="rounded-2xl p-8 border mb-8"
          style={{ background: "var(--surface)", borderColor: "var(--border-soft)" }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "var(--elevated)" }}
            >
              🎬
            </div>
            <div>
              <h2
                className="font-display text-xl mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                TMDb — The Movie Database
              </h2>
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-ui hover:opacity-80 transition-opacity"
                style={{ color: "var(--coral)" }}
              >
                themoviedb.org ↗
              </a>
            </div>
          </div>

          <div
            className="rounded-xl p-4 mb-5 border"
            style={{
              background: "rgba(193,117,90,0.07)",
              borderColor: "rgba(193,117,90,0.22)",
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              This product uses the TMDb API but is not endorsed or certified by TMDb.
            </p>
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Movie and TV show data, posters, metadata, and ratings on CineType are
            sourced from The Movie Database (TMDb). TMDb is a community-built movie
            and TV database maintained by volunteers around the world.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Poster images are served directly from TMDb's content delivery network.
            We do not store or redistribute TMDb images.
          </p>
        </div>

        {/* About the product */}
        <div
          className="rounded-2xl p-8 border mb-8"
          style={{ background: "var(--surface)", borderColor: "var(--border-soft)" }}
        >
          <h2
            className="font-display text-xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            About CineType
          </h2>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <p>
              CineType is a personality-driven movie and TV recommendation platform.
              It is not affiliated with, endorsed by, or connected to Netflix, IMDb,
              or any streaming service.
            </p>
            <p>
              The Watch Personality archetypes, quiz questions, recommendation
              explanations, and "why it fits you" copy are original creative works
              produced by CineType.
            </p>
            <p>
              The personality quiz uses a 16-type inspired framework for
              entertainment and self-discovery purposes only. It is not a clinical
              assessment, psychological test, or affiliated with the Myers-Briggs
              Type Indicator or The Myers-Briggs Company.
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div
          className="rounded-2xl p-8 border"
          style={{ background: "var(--surface)", borderColor: "var(--border-soft)" }}
        >
          <h2
            className="font-display text-xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Built with
          </h2>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
            {[
              ["Next.js", "React framework with App Router"],
              ["TypeScript", "Type-safe JavaScript"],
              ["Tailwind CSS", "Utility-first CSS framework"],
              ["TMDb API", "Movie and TV data"],
              ["Vercel", "Hosting and edge deployment"],
              ["Lucide React", "Icon library"],
            ].map(([name, desc]) => (
              <li key={name} className="flex gap-3">
                <span
                  className="font-ui font-medium w-28 flex-shrink-0"
                  style={{ color: "var(--text-primary)" }}
                >
                  {name}
                </span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-ui"
            style={{ color: "var(--text-dim)" }}
          >
            <ArrowLeft size={13} /> Back to CineType
          </Link>
        </div>
      </div>
    </div>
  );
}
