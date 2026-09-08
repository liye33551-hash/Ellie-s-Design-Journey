"use client";

import { useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

type MagneticOptions = {
  strength: number;
  stiffness: number;
  damping: number;
};

export function useMagneticMotion({ strength, stiffness, damping }: MagneticOptions) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relativeY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    rawX.set(Math.max(-strength, Math.min(strength, relativeX * strength)));
    rawY.set(Math.max(-strength, Math.min(strength, relativeY * strength)));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { x, y, handleMouseMove, handleMouseLeave };
}
