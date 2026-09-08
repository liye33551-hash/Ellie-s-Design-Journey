"use client";

import type { ReactNode } from "react";
import { useMousePosition } from "@/src/hooks/useMousePosition";

type MagneticElementProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  maxOffset?: number;
};

export default function MagneticElement({
  children,
  className = "",
  strength = 0.14,
  maxOffset = 14,
}: MagneticElementProps) {
  const { handlePointerMove, handlePointerLeave } = useMousePosition<HTMLDivElement>({ strength, maxOffset });

  return (
    <div
      className={`magnetic-element ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}
