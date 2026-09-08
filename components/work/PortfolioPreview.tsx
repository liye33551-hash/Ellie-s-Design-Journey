"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { Showcase } from "@/content/showcases";

type PortfolioPreviewProps = {
  showcase: Showcase | null;
  onClose: () => void;
};

export function PortfolioPreview({ showcase, onClose }: PortfolioPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!showcase) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setProgress(0);

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [showcase, onClose]);

  if (!mounted) return null;

  const images = showcase?.detailImages?.length
    ? showcase.detailImages
    : showcase
      ? [showcase.coverSrc]
      : [];
  const currentPage = images.length
    ? Math.min(images.length, Math.floor(progress * images.length) + 1)
    : 0;

  return createPortal(
    <AnimatePresence>
      {showcase ? (
        <motion.div
          className="portfolio-preview"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-preview-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="portfolio-preview-progress" aria-hidden="true">
            <motion.span animate={{ scaleX: progress }} transition={{ duration: 0.12, ease: "linear" }} />
          </div>

          <motion.header
            className="portfolio-preview-toolbar"
            style={{ x: "-50%" }}
            initial={{ opacity: 0, y: -22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="portfolio-preview-project">
              <span>{showcase.tag}</span>
              <strong id="portfolio-preview-title">{showcase.title}</strong>
            </div>
            <div className="portfolio-preview-count" aria-live="polite">
              {String(currentPage).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
            <button ref={closeButtonRef} type="button" className="portfolio-preview-close" onClick={onClose} aria-label="关闭作品详情">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </motion.header>

          <div
            className="portfolio-preview-scroll"
            onScroll={(event) => {
              const element = event.currentTarget;
              const maximum = element.scrollHeight - element.clientHeight;
              setProgress(maximum > 0 ? element.scrollTop / maximum : 0);
            }}
          >
            <motion.div
              className="portfolio-preview-canvas"
              initial={{ y: 54, scale: 0.985 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 28, scale: 0.99 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              {images.map((src, index) => (
                <figure className="portfolio-preview-frame" key={`${showcase.slug}-${src}`}>
                  <img
                    src={src}
                    alt={`${showcase.title} 作品详情 ${index + 1}`}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                </figure>
              ))}
            </motion.div>

            <div className="portfolio-preview-end">
              <span>END OF PROJECT</span>
              <strong>{showcase.title}</strong>
              <button type="button" onClick={onClose}>返回作品列表</button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
