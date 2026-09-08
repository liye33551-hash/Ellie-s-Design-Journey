"use client";

import type { AriaAttributes, CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "@/src/hooks/useScrollReveal";

type RevealStyle = CSSProperties & { "--reveal-delay": string; "--reveal-distance": string };

type ScrollRevealProps = AriaAttributes & {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  distance = 40,
  ...ariaProps
}: ScrollRevealProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>();
  const style: RevealStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-distance": `${distance}px`,
  };

  return (
    <div
      ref={ref}
      className={`interaction-scroll-reveal ${isRevealed ? "is-revealed" : ""} ${className}`.trim()}
      style={style}
      {...ariaProps}
    >
      {children}
    </div>
  );
}
