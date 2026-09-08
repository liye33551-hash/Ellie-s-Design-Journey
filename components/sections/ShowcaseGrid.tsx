"use client";

import { motion, useTransform } from "framer-motion";
import { useState } from "react";
import { showcases, type Showcase } from "@/content/showcases";
import { useMagneticMotion } from "@/hooks/useMagneticMotion";
import { PortfolioPreview } from "@/components/work/PortfolioPreview";

function FeatureCard({ feature, activeSlug, onHoverStart, onHoverEnd, onOpen }: {
  feature: Showcase;
  activeSlug: string | null;
  onHoverStart: (slug: string) => void;
  onHoverEnd: () => void;
  onOpen: (showcase: Showcase) => void;
}) {
  const isActive = activeSlug === feature.slug;
  const isDimmed = Boolean(activeSlug) && !isActive;
  const cardScale = isActive ? 1.1 : isDimmed ? 0.93 : 1;
  const { x, y, handleMouseMove, handleMouseLeave } = useMagneticMotion({
    strength: isActive ? 14 : 10,
    stiffness: 170,
    damping: 20,
  });
  const rotateY = useTransform(x, [-14, 14], [-3.2, 3.2]);
  const rotateX = useTransform(y, [-14, 14], [3.2, -3.2]);

  return (
    <motion.button
      type="button"
      className={`showcase-card group ${isActive ? "is-active" : ""}`}
      aria-haspopup="dialog"
      aria-label={`打开${feature.title}作品详情`}
      style={{ x, y, rotateX, rotateY, transformPerspective: 1400, transformStyle: "preserve-3d" }}
      animate={{
        scale: cardScale,
        filter: isDimmed ? "saturate(0.88) brightness(0.9)" : "saturate(1) brightness(1)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 22, mass: 0.95 }}
      onMouseEnter={() => onHoverStart(feature.slug)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { handleMouseLeave(); onHoverEnd(); }}
      onClick={() => onOpen(feature)}
    >
      <div className="showcase-card-inner">
        <span className="showcase-tag">
          <i aria-hidden="true" />
          {feature.tag}
        </span>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        <div className="showcase-cover" style={{ backgroundColor: `${feature.accent}12`, boxShadow: `inset 0 0 80px ${feature.accent}12` }}>
          <img src={feature.coverSrc} alt={`${feature.title} 封面`} draggable={false} />
        </div>
        <span className="showcase-cta">
          {feature.cta}<i aria-hidden="true">→</i>
        </span>
      </div>
    </motion.button>
  );
}

export function ShowcaseGrid() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [selectedShowcase, setSelectedShowcase] = useState<Showcase | null>(null);

  return (
    <>
      <section className="showcase-section" aria-label="作品分类">
        <div id="works" className="showcase-grid" onMouseLeave={() => setActiveSlug(null)}>
          {showcases.map((feature) => (
            <FeatureCard key={feature.slug} feature={feature} activeSlug={activeSlug} onHoverStart={setActiveSlug} onHoverEnd={() => setActiveSlug(null)} onOpen={setSelectedShowcase} />
          ))}
        </div>
      </section>
      <PortfolioPreview showcase={selectedShowcase} onClose={() => setSelectedShowcase(null)} />
    </>
  );
}
