"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

function canTilt(event: ReactPointerEvent<HTMLElement>) {
  return event.pointerType === "mouse";
}

export default function TiltCard({ children, className = "", maxTilt = 5.5 }: TiltCardProps) {
  const frameRef = useRef<number | null>(null);

  const updateTilt = (element: HTMLElement, rotateX: number, rotateY: number) => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      element.style.setProperty("--tilt-x", `${rotateX}deg`);
      element.style.setProperty("--tilt-y", `${rotateY}deg`);
      frameRef.current = null;
    });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canTilt(event)) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - (rect.left + rect.width / 2)) / 20;
    const relativeY = (event.clientY - (rect.top + rect.height / 2)) / 20;
    updateTilt(
      event.currentTarget,
      Math.max(-maxTilt, Math.min(maxTilt, -relativeY)),
      Math.max(-maxTilt, Math.min(maxTilt, relativeX)),
    );
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    updateTilt(event.currentTarget, 0, 0);
  };

  useEffect(() => () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      className={`tilt-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}
