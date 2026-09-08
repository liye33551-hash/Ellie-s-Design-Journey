"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type HeroObjectFocusGroupProps = {
  children: ReactNode;
};

export default function HeroObjectFocusGroup({ children }: HeroObjectFocusGroupProps) {
  const [focusedObject, setFocusedObject] = useState<string | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const layer = target.closest<HTMLElement>("[data-focus-id]");
      const spotlight = spotlightRef.current;

      if (!layer || !spotlight) {
        spotlight?.classList.remove("is-visible");
        setFocusedObject(null);
        return;
      }

      const canvas = layer.closest<HTMLElement>(".figma-hero-canvas");
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        spotlight.style.setProperty("--spotlight-x", `${x}px`);
        spotlight.style.setProperty("--spotlight-y", `${y}px`);
        spotlight.classList.add("is-visible");
        setFocusedObject(layer.dataset.focusId ?? null);
        frameRef.current = null;
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const layer = target.closest<HTMLElement>("[data-focus-id]");

      if (layer) {
        setFocusedObject(layer.dataset.focusId ?? null);
      } else if (target.closest(".figma-hero")) {
        setFocusedObject(null);
      }
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("click", handleClick);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      className="hero-object-focus-group"
      data-has-focus={focusedObject ? "true" : "false"}
      data-focused-object={focusedObject ?? "none"}
    >
      <div ref={spotlightRef} className="hero-object-spotlight" aria-hidden="true" />
      {children}
    </div>
  );
}
