import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-6xl mb-6">🎬</div>
      <h1
        className="font-display text-5xl mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        404
      </h1>
      <p className="text-lg mb-3" style={{ color: "var(--text-muted)" }}>
        This page doesn't exist.
      </p>
      <p className="text-sm mb-10 max-w-sm" style={{ color: "var(--text-dim)" }}>
        Unlike your next favorite show, which very much exists and is waiting for you.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-ui font-medium text-sm"
        style={{ background: "var(--violet)", color: "#0D0F1A" }}
      >
        Back to CineType
      </Link>
    </div>
  );
}
