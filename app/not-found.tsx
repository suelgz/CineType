import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--bg)" }}
    >
      <p
        className="font-display italic text-2xl mb-6"
        style={{ color: "var(--coral)" }}
      >
        Scene missing.
      </p>
      <h1
        className="font-display text-6xl md:text-7xl mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        404
      </h1>
      <p className="text-base mb-2 max-w-sm" style={{ color: "var(--text-muted)" }}>
        This page doesn't exist.
      </p>
      <p className="text-sm mb-10 max-w-sm" style={{ color: "var(--text-dim)" }}>
        Unlike your next favorite show, which very much exists and is waiting for you.
      </p>
      <Link
        href="/"
        className="press inline-flex items-center gap-2 px-6 py-3 rounded-full font-ui font-medium text-sm"
        style={{ background: "var(--coral)", color: "var(--ink)" }}
      >
        Back to CineType
      </Link>
    </div>
  );
}
