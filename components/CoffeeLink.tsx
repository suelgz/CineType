import { Coffee } from "lucide-react";

interface Props {
  variant?: "nav" | "full";
}

const COFFEE_URL = "https://buymeacoffee.com/suthedeveloper";

/**
 * Buy Me a Coffee link. "nav" is a compact icon pill for headers.
 * "full" is a warmer, joke-y version for footers.
 */
export default function CoffeeLink({ variant = "nav" }: Props) {
  if (variant === "full") {
    return (
      <a
        href={COFFEE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="press inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-ui border transition-opacity hover:opacity-80"
        style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
      >
        <Coffee size={14} />
        Buy the dev a coffee, they clearly need it
      </a>
    );
  }

  return (
    <a
      href={COFFEE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Buy me a coffee"
      className="press flex items-center gap-1.5 text-sm font-ui px-3 py-2 rounded-full border transition-opacity hover:opacity-80"
      style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
    >
      <Coffee size={14} />
      <span className="hidden sm:inline">Coffee</span>
    </a>
  );
}
