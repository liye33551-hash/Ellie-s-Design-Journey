"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { editorialEase, revealViewport } from "@/lib/motion";

type ImageRevealProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function ImageReveal({ src, alt, priority = false }: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="project-image-mask"
      initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={revealViewport}
      transition={{ duration: reduceMotion ? 0 : 1.15, ease: editorialEase }}
    >
      <motion.div
        className="project-image-inner"
        initial={reduceMotion ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={revealViewport}
        transition={{ duration: reduceMotion ? 0 : 1.35, ease: editorialEase }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 900px) 100vw, 65vw" />
      </motion.div>
    </motion.div>
  );
}
