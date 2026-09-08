"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const asset = (name: string) => `/images/figma-home/${name}`;
const ease = [0.22, 1, 0.36, 1] as const;
const musicSrc = "/audio/ellie-background-music.mp3";

type SideLayerProps = {
  className: string;
  src: string;
  width: number;
  height: number;
  finalLeft: string;
  collapsedLeft: string;
  delay: number;
  visible: boolean;
  reduceMotion: boolean;
};

function SideLayer({ className, src, width, height, finalLeft, collapsedLeft, delay, visible, reduceMotion }: SideLayerProps) {
  return (
    <motion.div
      className={`figma-object figma-music-layer ${className}`}
      initial={reduceMotion ? false : { left: collapsedLeft, opacity: 0 }}
      animate={visible || reduceMotion ? { left: finalLeft, opacity: 1 } : { left: collapsedLeft, opacity: 0 }}
      transition={{ duration: 1.05, delay, ease }}
    >
      <Image src={src} alt="" width={width} height={height} unoptimized />
    </motion.div>
  );
}

export function FigmaMusicDeck() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isInView = useInView(triggerRef, { once: true, margin: "0px 0px -14% 0px" });
  const reduceMotion = Boolean(useReducedMotion());
  const visible = isInView || reduceMotion;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    void audio.play().catch(() => setIsPlaying(false));

    return () => audio.pause();
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div className="figma-music-deck" data-figma-node="36:104">
      <div ref={triggerRef} className="figma-music-trigger" />

      <SideLayer className="figma-music-left-dark" src={asset("music-left-dark.svg")} width={189} height={380} finalLeft="9.479167%" collapsedLeft="45.078125%" delay={0.46} visible={visible} reduceMotion={reduceMotion} />
      <SideLayer className="figma-music-left-outline" src={asset("music-left-outline.svg")} width={189} height={380} finalLeft="10.46875%" collapsedLeft="45.078125%" delay={0.58} visible={visible} reduceMotion={reduceMotion} />
      <SideLayer className="figma-music-left-blue" src={asset("music-left-blue.svg")} width={190} height={380} finalLeft="25.520833%" collapsedLeft="45.052083%" delay={0.22} visible={visible} reduceMotion={reduceMotion} />

      <motion.div
        className="figma-object figma-music-layer figma-music-center"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.76, rotate: -18 }}
        animate={visible ? { opacity: 1, scale: 1, rotate: 342 } : { opacity: 0, scale: 0.76, rotate: -18 }}
        transition={{
          opacity: { duration: 0.45, ease },
          scale: { duration: 0.9, ease },
          rotate: reduceMotion ? { duration: 0 } : { duration: 10, delay: 0.12, ease: "linear", repeat: Infinity },
        }}
      >
        <Image src={asset("music-center.png")} alt="" width={380} height={380} />
      </motion.div>

      <motion.div
        className="figma-object figma-music-layer figma-music-ring"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
        transition={{ duration: 0.85, delay: 0.08, ease }}
      >
        <Image src={asset("music-ring.svg")} alt="" width={380} height={380} unoptimized />
      </motion.div>

      <motion.div
        className="figma-object figma-music-layer figma-music-center-ring"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.45 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.45 }}
        transition={{ duration: 0.72, delay: 0.16, ease }}
      >
        <Image src={asset("music-center-ring.svg")} alt="" width={92} height={92} unoptimized />
        {isPlaying ? (
          <svg className="figma-music-center-play" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="3" width="8" height="28" rx="2" fill="#EEEEEE" />
            <rect x="22" y="3" width="8" height="28" rx="2" fill="#EEEEEE" />
          </svg>
        ) : (
          <svg className="figma-music-center-play" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.70999 6.72747C5.70815 6.11919 5.86823 5.52138 6.17377 4.99541C6.47932 4.46944 6.91934 4.03425 7.44865 3.73453C7.97797 3.4348 8.57751 3.28134 9.18573 3.28989C9.79395 3.29844 10.3889 3.4687 10.9096 3.78318L28.0372 14.0556C28.5471 14.3595 28.9694 14.7907 29.2626 15.3068C29.5558 15.8229 29.71 16.4063 29.71 16.9999C29.71 17.5935 29.5558 18.1769 29.2626 18.6931C28.9694 19.2092 28.5471 19.6403 28.0372 19.9442L10.9096 30.2167C10.3887 30.5313 9.79339 30.7016 9.18487 30.71C8.57635 30.7184 7.97657 30.5646 7.44715 30.2645C6.91773 29.9643 6.47777 29.5287 6.17247 29.0022C5.86717 28.4758 5.70754 27.8775 5.70999 27.2689V6.72747Z" fill="#EEEEEE" fillOpacity="0.6" />
          </svg>
        )}
      </motion.div>

      <button type="button" className="figma-music-control" aria-label={isPlaying ? "暂停音乐" : "播放音乐"} aria-pressed={isPlaying} onClick={toggleMusic} />
      <audio
        ref={audioRef}
        src={musicSrc}
        preload="auto"
        autoPlay
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <SideLayer className="figma-music-right-blue" src={asset("music-right-blue.svg")} width={190} height={380} finalLeft="64.583333%" collapsedLeft="45.052083%" delay={0.22} visible={visible} reduceMotion={reduceMotion} />
      <SideLayer className="figma-music-right-dark" src={asset("music-right-dark.svg")} width={189} height={380} finalLeft="79.114583%" collapsedLeft="45.078125%" delay={0.46} visible={visible} reduceMotion={reduceMotion} />
      <SideLayer className="figma-music-right-outline" src={asset("music-right-outline.svg")} width={189} height={380} finalLeft="80.416667%" collapsedLeft="45.078125%" delay={0.58} visible={visible} reduceMotion={reduceMotion} />
    </div>
  );
}
