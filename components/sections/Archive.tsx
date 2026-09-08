"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { archiveItems } from "@/data/projects";

export function Archive() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="archive-section section-shell" id="archive">
      <ScrollReveal className="section-kicker-row archive-heading">
        <p className="section-kicker">03 / CREATIVE ARCHIVE</p>
        <p className="section-note">Browse by discipline</p>
      </ScrollReveal>

      <div className="archive-list">
        {archiveItems.map((item) => (
          <motion.a
            className="archive-row"
            href="#works"
            key={item.number}
            whileHover={reduceMotion ? undefined : "hover"}
          >
            <span className="archive-number">{item.number}</span>
            <motion.span className="archive-label" variants={{ hover: { x: 16 } }}>
              {item.label}
            </motion.span>
            <motion.span
              className="archive-count"
              variants={{ hover: { opacity: 1, x: 0 } }}
              initial={{ opacity: 0.38, x: -12 }}
            >
              {item.count}
            </motion.span>
            <span className="archive-arrow">↗</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
