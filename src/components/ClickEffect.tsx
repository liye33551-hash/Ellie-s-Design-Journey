"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type EmojiBurst = {
  id: number;
  emoji: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
  size: number;
};

type BlessingBurst = {
  id: number;
  text: string;
  emoji: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
};

type EffectStyle = CSSProperties & Record<`--${string}`, string>;

const EMOJIS = ["✨", "💫", "🌟", "🎨", "🫧", "💥", "🌈", "🍀", "💖", "🎵"];
const BLESSINGS = ["欢迎光临", "天天开心", "发现了一个小幸运", "美好正在发生", "创意被看见了"];
const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, label, summary, video, img, [role='button']";

function randomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function ClickEffect() {
  const [emojiBursts, setEmojiBursts] = useState<EmojiBurst[]>([]);
  const [blessingBursts, setBlessingBursts] = useState<BlessingBurst[]>([]);
  const nextIdRef = useRef(0);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    const schedule = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
        timersRef.current.delete(timer);
        callback();
      }, delay);
      timersRef.current.add(timer);
    };

    const handleClick = (event: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(INTERACTIVE_SELECTOR)) return;

      const heroCanvas = target.closest<HTMLElement>(".figma-hero-canvas");
      if (heroCanvas) {
        const heroRect = heroCanvas.getBoundingClientRect();
        const pointerY = event.clientY - heroRect.top;
        if (pointerY >= 0 && pointerY < heroRect.height * 0.24) return;
      }

      const emojiIds: number[] = [];
      const emojis = Array.from({ length: 4 }, () => {
        const id = nextIdRef.current++;
        emojiIds.push(id);
        return {
          id,
          emoji: randomItem(EMOJIS),
          x: event.clientX,
          y: event.clientY,
          dx: (Math.random() - 0.5) * 140,
          dy: -40 - Math.random() * 110,
          rotate: (Math.random() - 0.5) * 90,
          size: 18 + Math.random() * 14,
        };
      });

      const blessingId = nextIdRef.current++;
      const blessing: BlessingBurst = {
        id: blessingId,
        text: randomItem(BLESSINGS),
        emoji: randomItem(EMOJIS),
        x: event.clientX,
        y: event.clientY,
        dx: (Math.random() - 0.5) * 28,
        dy: -78 - Math.random() * 44,
        rotate: (Math.random() - 0.5) * 10,
      };

      setEmojiBursts((current) => [...current, ...emojis]);
      setBlessingBursts((current) => [...current, blessing]);

      schedule(() => {
        const expired = new Set(emojiIds);
        setEmojiBursts((current) => current.filter(({ id }) => !expired.has(id)));
      }, 950);
      schedule(() => {
        setBlessingBursts((current) => current.filter(({ id }) => id !== blessingId));
      }, 1550);
    };

    document.addEventListener("click", handleClick);
    const timers = timersRef.current;
    return () => {
      document.removeEventListener("click", handleClick);
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  return (
    <div className="click-effect-container" aria-hidden="true">
      {blessingBursts.map((burst) => {
        const style: EffectStyle = {
          left: burst.x,
          top: burst.y,
          "--blessing-dx": `${burst.dx}px`,
          "--blessing-dy": `${burst.dy}px`,
          "--blessing-rotate": `${burst.rotate}deg`,
        };
        return (
          <span className="click-blessing" key={burst.id} style={style}>
            <span>{burst.emoji}</span>{burst.text}
          </span>
        );
      })}

      {emojiBursts.map((burst) => {
        const style: EffectStyle = {
          left: burst.x,
          top: burst.y,
          fontSize: burst.size,
          "--emoji-dx": `${burst.dx}px`,
          "--emoji-dy": `${burst.dy}px`,
          "--emoji-rotate": `${burst.rotate}deg`,
        };
        return <span className="click-emoji" key={burst.id} style={style}>{burst.emoji}</span>;
      })}
    </div>
  );
}
