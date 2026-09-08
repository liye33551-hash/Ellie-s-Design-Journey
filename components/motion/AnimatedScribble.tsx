"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const scribblePath =
  "M0.0738378 21.4801C48.646 19.7857 161.04 17.0088 211.165 15.8322C214.224 15.3615 220.06 13.4318 218.931 9.47826C217.519 4.53633 211.165 2.41836 197.045 2.41836C187.161 2.41836 158.897 1.74034 149.744 2.41836C130.682 3.83043 65.7309 26.422 64.3189 41.2478C62.907 56.0736 101.03 70.1934 104.56 69.4874C108.09 68.7814 91.8525 58.8976 75.6148 60.3095C59.377 61.7215 64.3189 71.6054 68.5549 74.4293C72.7908 77.2533 144.802 144.322 149.038 190.918C149.92 196.062 150.747 205.136 149.729 213.013C148.65 221.368 142.017 227.21 135.343 232.351C90.4928 266.898 26.3635 332.88 37.4913 405.539C37.0207 417.305 41.1625 448.18 61.495 477.55C69.4021 488.281 80.3214 506.495 84.7926 514.261";

export function AnimatedScribble() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  return (
    <div ref={ref} id="scroll-line" className="figma-object figma-scribble" aria-hidden="true" data-figma-node="25:8614">
      <svg viewBox="0 0 221.192 515.318" preserveAspectRatio="none">
        <motion.path
          d={scribblePath}
          fill="none"
          stroke="white"
          strokeWidth="4.23594"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: isInView || reduceMotion ? 1 : 0, opacity: isInView || reduceMotion ? 1 : 0 }}
          transition={{ pathLength: { duration: 1.8, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}
        />
      </svg>
    </div>
  );
}
