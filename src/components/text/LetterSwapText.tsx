"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type LetterStyle = CSSProperties & {
  "--word-index": number;
  "--word-base-delay": string;
  "--scatter-x": string;
  "--scatter-y": string;
  "--scatter-rotate": string;
  "--scatter-depth": string;
};

type LetterSwapTextProps = {
  text: string;
  delay?: number;
  className?: string;
};

export default function LetterSwapText({ text, delay = 0, className = "" }: LetterSwapTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsVisible(true);
      observer.disconnect();
    }, { threshold: 0.18 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  let wordIndex = 0;

  return (
    <span
      ref={ref}
      className={`letter-swap-text ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      {text.split(/(\s+)/).filter(Boolean).map((word, tokenIndex) => {
        if (/^\s+$/.test(word)) {
          return <span className="letter-swap-space" aria-hidden="true" key={`space-${tokenIndex}`} />;
        }

        const index = wordIndex++;
        const xSeed = Math.sin((index + 1) * 12.9898 + text.length * 0.73);
        const ySeed = Math.cos((index + 1) * 8.233 + text.length * 0.41);
        const rotateSeed = Math.sin((index + 1) * 4.731);
        const style: LetterStyle = {
          "--word-index": index,
          "--word-base-delay": `${delay}ms`,
          "--scatter-x": `${(xSeed * 0.62).toFixed(3)}em`,
          "--scatter-y": `${(ySeed * 0.38).toFixed(3)}em`,
          "--scatter-rotate": `${(rotateSeed * 7).toFixed(2)}deg`,
          "--scatter-depth": `${12 + (index % 4) * 6}px`,
        };

        return (
          <span className="letter-swap-stage" style={style} key={`${word}-${tokenIndex}`}>
            <span className="letter-swap-measure">{word}</span>
            <span className="letter-swap-cube">
              <span className="letter-swap-face letter-swap-front">{word}</span>
              <span className="letter-swap-face letter-swap-back">{word}</span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
