"use client";

import Image from "next/image";
import MagneticElement from "@/src/components/interactions/MagneticElement";
import ScrollReveal from "@/src/components/interactions/ScrollReveal";
import TiltCard from "@/src/components/interactions/TiltCard";

type InteractiveHeroObjectProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  focusId: string;
  delay?: number;
  priority?: boolean;
};

export default function InteractiveHeroObject({
  src,
  alt,
  width,
  height,
  className,
  focusId,
  delay = 0,
  priority = false,
}: InteractiveHeroObjectProps) {
  return (
    <div className={`figma-object hero-focus-layer interactive-hero-object ${className}`} data-focus-id={focusId}>
      <ScrollReveal className="interactive-hero-reveal" delay={delay} distance={24}>
        <MagneticElement className="interactive-hero-magnetic" strength={0.12} maxOffset={12}>
          <TiltCard className="interactive-hero-tilt" maxTilt={4.5}>
            <Image className="interactive-hero-image" src={src} alt={alt} width={width} height={height} priority={priority} draggable={false} />
          </TiltCard>
        </MagneticElement>
      </ScrollReveal>
    </div>
  );
}
