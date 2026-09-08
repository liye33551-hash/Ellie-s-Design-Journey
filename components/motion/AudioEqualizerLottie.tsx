"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const EqualizerAnimation = dynamic(
  () => import("lottie-react").then(({ LottieSvg }) => LottieSvg),
  { ssr: false, loading: () => null },
);

export function AudioEqualizerLottie() {
  const reduceMotion = useReducedMotion();

  return (
    <EqualizerAnimation
      className="figma-audio-equalizer"
      src="/lottie/audio-equalizer.json"
      autoplay={!reduceMotion}
      loop={!reduceMotion}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid meet",
        progressiveLoad: true,
      }}
      aria-hidden="true"
    />
  );
}
