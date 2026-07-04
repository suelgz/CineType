"use client";

import { useReveal } from "@/lib/hooks/useReveal";
import { ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps a section and gently reveals any descendant `.reveal` elements
 * as they scroll into view, instead of everything animating on page load.
 */
export default function RevealSection({ children, className, style }: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className={className} style={style}>
      {children}
    </section>
  );
}
