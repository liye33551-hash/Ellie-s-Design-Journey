"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";

export type CardItem = { id: string; title: string; src: string; colorGroup?: string };
type InfiniteCardRailProps = { items: CardItem[] };

const GOLDEN_RATIO = 1.61803398875;
const RHYTHM_EXPONENTS = [-0.82, -0.46, -0.14, 0, -0.28, -0.64, -0.08, -0.52];

function getRhythmScale(index: number) {
  return Math.pow(GOLDEN_RATIO, RHYTHM_EXPONENTS[index % RHYTHM_EXPONENTS.length] ?? 0);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function wrapLoop(value: number, width: number) {
  if (width <= 0) return 0;
  let next = value % width;
  if (next > 0) next -= width;
  return next;
}

export function InfiniteCardRail({ items }: InfiniteCardRailProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number | null>(null);
  const hoveredCardKeyRef = useRef<string | null>(null);
  const clickedCardKeyRef = useRef<string | null>(null);
  const clickStartedAtRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const dragRef = useRef({ active: false, pointerId: null as number | null, lastX: 0, lastTime: 0, distance: 0 });
  const motionRef = useRef({ currentX: 0, targetX: 0, velocity: -1.35 });
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [isDragging, setIsDragging] = useState(false);
  const [imageDimensions, setImageDimensions] = useState(() => items.map(() => ({ width: 1, height: 1 })));

  const orderedItems = useMemo(() => {
    const pool = items.map((item, index) => ({ ...item, originalIndex: index, width: imageDimensions[index]?.width ?? 1, height: imageDimensions[index]?.height ?? 1 }));
    const sorted = [...pool].sort((a, b) => b.width - a.width);
    const ordered: typeof sorted = [];
    while (sorted.length) {
      const previous = ordered[ordered.length - 1];
      const candidate = sorted.findIndex((item) => !previous || (item.colorGroup !== previous.colorGroup && Math.abs(item.width - previous.width) > previous.width * 0.12));
      const fallback = sorted.findIndex((item) => item.colorGroup !== previous?.colorGroup);
      ordered.push(sorted.splice(candidate >= 0 ? candidate : fallback >= 0 ? fallback : 0, 1)[0]!);
    }
    return ordered;
  }, [imageDimensions, items]);

  const gap = viewportWidth < 768 ? -8 : -10;
  const topPadding = viewportWidth < 768 ? 18 : 24;
  const bottomPadding = viewportWidth < 768 ? 6 : 8;
  const peakHeight = viewportWidth < 768 ? 255 : viewportWidth < 1180 ? 342 : 405;
  const maxCardWidth = viewportWidth < 768 ? 285 : viewportWidth < 1180 ? 429 : 525;
  const geometry = orderedItems.map((item, index) => {
    let height = Math.max(96, Math.round(peakHeight * getRhythmScale(index)));
    let width = Math.max(72, Math.round(item.width / Math.max(item.height, 1) * height));
    if (width > maxCardWidth) {
      const ratio = maxCardWidth / width;
      width = maxCardWidth;
      height = Math.max(96, Math.round(height * ratio));
    }
    return { width, height };
  });
  const widths = geometry.map((item) => item.width);
  const heights = geometry.map((item) => item.height);
  const tallestHeight = heights.length ? Math.max(...heights) : peakHeight;
  const positions = widths.reduce<number[]>((result, _, index) => {
    result.push(index ? result[index - 1]! + widths[index - 1]! + gap : 0);
    return result;
  }, []);
  const stripWidth = widths.reduce((sum, width) => sum + width, 0) + gap * Math.max(0, orderedItems.length - 1);
  const cloneRadius = Math.max(2, Math.ceil(viewportWidth / Math.max(stripWidth, 1)) + 1);
  const cloneOffsets = Array.from({ length: cloneRadius * 2 + 1 }, (_, index) => index - cloneRadius);

  useEffect(() => {
    const resize = () => setViewportWidth(window.innerWidth);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { reducedMotionRef.current = media.matches; };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let disposed = false;
    items.forEach((item, index) => {
      const image = new Image();
      image.src = item.src;
      image.onload = () => {
        if (disposed || !image.naturalWidth || !image.naturalHeight) return;
        setImageDimensions((current) => {
          const next = [...current];
          next[index] = { width: image.naturalWidth, height: image.naturalHeight };
          return next;
        });
      };
    });
    return () => { disposed = true; };
  }, [items]);

  useEffect(() => {
    const animate = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track || stripWidth <= 0) { frameRef.current = requestAnimationFrame(animate); return; }
      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.width / 2;
      const edgeThreshold = viewportRect.width * 0.24;
      const motion = motionRef.current;
      if (!dragRef.current.active) {
        motion.targetX += motion.velocity + (reducedMotionRef.current ? 0 : -0.38);
        motion.velocity *= 0.93;
        if (Math.abs(motion.velocity) < 0.02) motion.velocity = 0;
      }
      motion.targetX = wrapLoop(motion.targetX, stripWidth);
      motion.currentX += (motion.targetX - motion.currentX) * (dragRef.current.active ? 0.22 : 0.085);
      motion.currentX = wrapLoop(motion.currentX, stripWidth);
      const renderedX = Math.round(motion.currentX);
      track.style.transform = `translate3d(${renderedX}px,0,0)`;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const itemIndex = Number(card.dataset.itemIndex ?? 0);
        const cloneIndex = Number(card.dataset.cloneIndex ?? 0);
        const cardKey = card.dataset.cardKey ?? "";
        const width = widths[itemIndex] ?? 1;
        const cardCenter = cloneIndex * stripWidth + (positions[itemIndex] ?? 0) + renderedX + width / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        const edgeProgress = clamp((distance - edgeThreshold) / (viewportRect.width / 2 + width - edgeThreshold), 0, 1);
        const side = cardCenter < viewportCenter ? -1 : 1;
        const hovered = hoveredCardKeyRef.current === cardKey && !dragRef.current.active;
        const strongMotion = hovered && !reducedMotionRef.current;
        const elapsed = clickedCardKeyRef.current === cardKey ? performance.now() - clickStartedAtRef.current : Number.POSITIVE_INFINITY;
        const clickProgress = clamp(elapsed / 620, 0, 1);
        const clicking = clickProgress < 1 && !reducedMotionRef.current;
        const clickScale = !clicking ? 1 : clickProgress < 0.16 ? 1 - 0.05 * clickProgress / 0.16 : clickProgress < 0.48 ? 0.95 + 0.17 * (clickProgress - 0.16) / 0.32 : 1.12 - 0.12 * (clickProgress - 0.48) / 0.52;
        const clickLift = clicking ? -18 * Math.sin(Math.PI * clickProgress) : 0;
        const clickTilt = clicking ? side * 2.5 * Math.sin(Math.PI * 2 * clickProgress) : 0;
        card.style.transformOrigin = side < 0 ? "right center" : "left center";
        card.style.transform = `perspective(1200px) translate3d(0,${(strongMotion ? -10 : 0) + clickLift}px,0) scale(${(strongMotion ? 1.075 : 1) * clickScale}) rotateX(${strongMotion ? 4.5 : 0}deg) rotateY(${strongMotion ? side * 8 : 0}deg) rotateZ(${clickTilt}deg)`;
        card.style.opacity = String(hovered || clicking ? 1 : 1 - edgeProgress * 0.14);
        card.style.filter = `brightness(${hovered || clicking ? 1.04 : 1 - edgeProgress * 0.16}) saturate(${hovered || clicking ? 1.04 : 1 - edgeProgress * 0.12})`;
        card.style.boxShadow = clicking ? `0 ${18 + 18 * Math.sin(Math.PI * clickProgress)}px ${42 + 26 * Math.sin(Math.PI * clickProgress)}px rgb(156 255 63 / ${0.12 + 0.22 * Math.sin(Math.PI * clickProgress)})` : "none";
        card.style.zIndex = String(hovered || clicking ? 220 : Math.max(1, 100 - Math.round(distance / 8)));
        if (clickedCardKeyRef.current === cardKey && clickProgress >= 1) clickedCardKeyRef.current = null;
      });
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  }, [positions, stripWidth, widths]);

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const delta = (event.deltaY + event.deltaX) * 0.82;
    motionRef.current.targetX -= delta;
    motionRef.current.velocity -= delta * 0.035;
  };
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, pointerId: event.pointerId, lastX: event.clientX, lastTime: performance.now(), distance: 0 };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const now = performance.now();
    const dx = event.clientX - dragRef.current.lastX;
    const deltaTime = Math.max(16, now - dragRef.current.lastTime);
    dragRef.current.lastX = event.clientX;
    dragRef.current.lastTime = now;
    dragRef.current.distance += Math.abs(dx);
    motionRef.current.targetX += dx * 1.15;
    motionRef.current.velocity = dx / deltaTime * 16;
  };
  const finishDrag = (event?: ReactPointerEvent<HTMLDivElement>) => {
    if (event && dragRef.current.pointerId === event.pointerId && event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current.active = false;
    dragRef.current.pointerId = null;
    setIsDragging(false);
  };
  const triggerClick = (key: string) => {
    if (dragRef.current.distance > 8) return;
    clickedCardKeyRef.current = key;
    clickStartedAtRef.current = performance.now();
  };

  return (
    <div ref={viewportRef} className={`infinite-card-rail${isDragging ? " is-dragging" : ""}`} style={{ height: topPadding + tallestHeight + bottomPadding }} onWheel={handleWheel} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={finishDrag} onPointerCancel={finishDrag}>
      <div ref={trackRef} className="infinite-card-track">
        {cloneOffsets.map((cloneIndex, cloneOrder) => (
          <div key={cloneIndex} className="infinite-card-strip" style={{ left: cloneIndex * stripWidth, width: stripWidth }} aria-hidden={cloneIndex !== 0}>
            {orderedItems.map((item, itemIndex) => {
              const key = `${cloneIndex}-${item.id}`;
              return (
                <div key={key} ref={(node) => { cardRefs.current[cloneOrder * orderedItems.length + itemIndex] = node; }} data-item-index={itemIndex} data-clone-index={cloneIndex} data-card-key={key} className="infinite-card" role="button" tabIndex={0} aria-label={`${item.title} 点击动画`} onClick={() => triggerClick(key)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); triggerClick(key); } }} onPointerEnter={() => { hoveredCardKeyRef.current = key; }} onPointerLeave={() => { if (hoveredCardKeyRef.current === key) hoveredCardKeyRef.current = null; }} style={{ left: positions[itemIndex], top: topPadding + tallestHeight - heights[itemIndex]!, width: widths[itemIndex], height: heights[itemIndex] }}>
                  <div><img src={item.src} alt={item.title} draggable={false} loading="lazy" /></div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
