"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

type MousePositionOptions = {
  strength?: number;
  maxOffset?: number;
};

export function useMousePosition<T extends HTMLElement>({
  strength = 0.14,
  maxOffset = 14,
}: MousePositionOptions = {}) {
  const frameRef = useRef<number | null>(null);

  const schedulePosition = (element: T, x: number, y: number) => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      element.style.setProperty("--magnetic-x", `${x}px`);
      element.style.setProperty("--magnetic-y", `${y}px`);
      frameRef.current = null;
    });
  };

  const handlePointerMove = (event: ReactPointerEvent<T>) => {
    if (event.pointerType !== "mouse") return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);
    const x = Math.max(-maxOffset, Math.min(maxOffset, distanceX * strength));
    const y = Math.max(-maxOffset, Math.min(maxOffset, distanceY * strength));
    schedulePosition(element, x, y);
  };

  const handlePointerLeave = (event: ReactPointerEvent<T>) => {
    schedulePosition(event.currentTarget, 0, 0);
  };

  useEffect(() => () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
  }, []);

  return { handlePointerMove, handlePointerLeave };
}
