"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { editorialEase, revealViewport } from "@/lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 50,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: reduceMotion ? 0 : 0.9, delay, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}
