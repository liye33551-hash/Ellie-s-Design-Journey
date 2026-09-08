import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { AudioEqualizerLottie } from "@/components/motion/AudioEqualizerLottie";
import { AnimatedScribble } from "@/components/motion/AnimatedScribble";
import { FigmaMusicDeck } from "@/components/sections/FigmaMusicDeck";
import { FigmaProfile } from "@/components/sections/FigmaProfile";
import InteractiveHeroObject from "@/src/components/interactions/InteractiveHeroObject";
import HeroObjectFocusGroup from "@/src/components/interactions/HeroObjectFocusGroup";
import LetterSwapText from "@/src/components/text/LetterSwapText";

const asset = (name: string) => `/images/figma-hero/${name}`;

export function FigmaHero() {
  return (
    <section className="figma-hero" id="home" data-figma-node="1:5">
      <div className="figma-hero-canvas">
        <Image className="figma-object figma-desk" src={asset("desk-figma.svg")} alt="" width={1816} height={986} priority unoptimized />
        <Image className="figma-object figma-desk-surface" src={asset("desk-surface-figma.svg")} alt="" width={1336} height={585} priority unoptimized />

        <HeroObjectFocusGroup>
          <InteractiveHeroObject focusId="cactus" className="figma-cactus" src={asset("cactus-figma-frame84.png")} alt="Small cactus" width={130} height={130} priority delay={0} />
          <InteractiveHeroObject focusId="notebook" className="figma-sketchbook" src={asset("sketchbook-figma-transparent.png")} alt="Open UI portfolio sketchbook" width={491} height={491} priority delay={70} />
          <InteractiveHeroObject focusId="laptop" className="figma-macbook" src={asset("macbook-transparent.png")} alt="MacBook displaying a blue abstract wallpaper" width={1346} height={1168} priority delay={140} />
          <InteractiveHeroObject focusId="headphones" className="figma-headphones" src={asset("headphones-transparent.png")} alt="AirPods Max" width={1234} height={1275} priority delay={210} />
          <InteractiveHeroObject focusId="mouse" className="figma-mouse" src={asset("mouse-transparent.png")} alt="Magic Mouse" width={1206} height={1304} priority delay={280} />

          <div className="figma-icon-cluster hero-focus-layer" data-focus-id="tools" aria-label="Design tools">
            <Image className="figma-object figma-cutout figma-icon figma-icon--figma" src={asset("figma.png")} alt="Figma" width={50} height={50} />
            <Image className="figma-object figma-cutout figma-icon figma-icon--codex" src={asset("codex.png")} alt="Codex" width={50} height={50} />
            <Image className="figma-object figma-cutout figma-icon figma-icon--stitch" src={asset("stitch.png")} alt="Stitch" width={62} height={62} />
            <Image className="figma-object figma-cutout figma-icon figma-icon--ae" src={asset("after-effects.png")} alt="After Effects" width={62} height={62} />
            <Image className="figma-object figma-cutout figma-icon figma-icon--ai" src={asset("illustrator.png")} alt="Illustrator" width={50} height={50} />
          </div>
        </HeroObjectFocusGroup>

        <Header />

        <div className="figma-about-label" id="about">(About)</div>
        <div className="figma-about-copy" aria-label="Presenting my designs, practicing interface solutions, and recording my journey of UI creation as my 2026 UI portfolio">
          <p><LetterSwapText text="Presenting my designs," delay={0} /></p>
          <p className="figma-about-audio-line">
            <LetterSwapText text="practicing interface" delay={80} />
            <span className="figma-audio-pill" aria-hidden="true">
              <Image className="figma-audio-pill-art" src="/images/figma-home/audio-pill.png" alt="" fill sizes="189px" />
              <span className="figma-audio-pill-mask" />
              <AudioEqualizerLottie />
            </span>
            <LetterSwapText text="solutions, and" delay={80} />
          </p>
          <p><LetterSwapText text="recording my journey of ui‑creation" delay={160} /></p>
          <p><LetterSwapText text="as my 2026 UI portfolio" delay={240} /></p>
        </div>

        <AnimatedScribble />
        <p className="figma-music-note">I’ll play some relaxing music for you.</p>
        <FigmaMusicDeck />
        <FigmaProfile />
      </div>
    </section>
  );
}
