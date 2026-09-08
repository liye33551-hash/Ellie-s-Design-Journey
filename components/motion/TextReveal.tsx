"use client";

import { motion, useReducedMotion } from "framer-motion";
import { editorialEase, revealViewport } from "@/lib/motion";

export function TextReveal({ text, className }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span className="word-clip" aria-hidden="true" key={`${word}-${index}`}>
          <motion.span
            className="word-reveal"
            variants={{
              hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: "105%" },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.72,
              delay: reduceMotion ? 0 : index * 0.035,
              ease: editorialEase,
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </motion.span>
  );
}
