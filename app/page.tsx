import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CardWallSection } from "@/components/sections/CardWallSection";
import { FigmaHero } from "@/components/sections/FigmaHero";
import { ShowcaseGrid } from "@/components/sections/ShowcaseGrid";
import { ParallaxFooter } from "@/components/layout/ParallaxFooter";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <FigmaHero />
        <CardWallSection />
        <ShowcaseGrid />
        <ParallaxFooter />
      </main>
    </SmoothScroll>
  );
}
