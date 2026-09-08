"use client";

import { motion, useTransform } from "framer-motion";
import { useState, type CSSProperties } from "react";
import { useMagneticMotion } from "@/hooks/useMagneticMotion";

const skills = [
  { number: "01", name: <>PRODUCT<br />DESIGN</> },
  { number: "02", name: <>USER<br />RESEARCH</> },
  { number: "03", name: <>UI<br />DESIGN</> },
  { number: "04", name: <>UX<br />DESIGN</> },
  { number: "05", name: <>DESIGN<br />SYSTEMS</> },
  { number: "06", name: <>INFORMATION<br />ARCHITECTURE</> },
  { number: "07", name: <>AI<br />DRIVEN EFFICIENCY</> },
  { number: "08", name: <>IP<br />DESIGN</> },
  { number: "09", name: <>FIGMA</> },
  { number: "10", name: <>MOTION DESIGN</> },
];

const showcaseCardAccents = [
  "#AEFF62",
  "#FFB8DF",
  "#66DDFF",
  "#6EFF9C",
  "#FFE878",
  "#B98EFF",
];

type OrbitCardStyle = CSSProperties & {
  "--angle": string;
  "--accent": string;
};

function SkillCard({ skill, index, activeNumber, onHoverStart, onHoverEnd }: {
  skill: (typeof skills)[number];
  index: number;
  activeNumber: string | null;
  onHoverStart: (number: string) => void;
  onHoverEnd: () => void;
}) {
  const isActive = activeNumber === skill.number;
  const isDimmed = Boolean(activeNumber) && !isActive;
  const { x, y, handleMouseMove, handleMouseLeave } = useMagneticMotion({
    strength: isActive ? 14 : 10,
    stiffness: 170,
    damping: 20,
  });
  const rotateY = useTransform(x, [-14, 14], [-3.2, 3.2]);
  const rotateX = useTransform(y, [-14, 14], [3.2, -3.2]);
  const style: OrbitCardStyle = {
    "--angle": `${(index - 8) * 36}deg`,
    "--accent": showcaseCardAccents[index % showcaseCardAccents.length],
  };

  return (
    <article className="skillOrbit__card" style={style}>
      <motion.button
        type="button"
        className="skillOrbit__surface"
        aria-label={`${skill.number} skill`}
        style={{ x, y, rotateX, rotateY, transformPerspective: 1400, transformStyle: "preserve-3d" }}
        animate={{
          scale: isActive ? 1.1 : isDimmed ? 0.93 : 1,
          filter: isDimmed ? "saturate(0.88) brightness(0.9)" : "saturate(1) brightness(1)",
        }}
        whileTap={{ scale: 0.96, backgroundColor: "#272727" }}
        transition={{ type: "spring", stiffness: 150, damping: 22, mass: 0.95 }}
        onMouseEnter={() => onHoverStart(skill.number)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          handleMouseLeave();
          onHoverEnd();
        }}
        onFocus={() => onHoverStart(skill.number)}
        onBlur={onHoverEnd}
      >
        <span className="skillOrbit__number">{skill.number}</span>
        <span className="skillOrbit__copy">
          <span className="skillOrbit__dot" />
          <span className="skillOrbit__name">{skill.name}</span>
        </span>
      </motion.button>
    </article>
  );
}

export default function SkillOrbit() {
  const [activeNumber, setActiveNumber] = useState<string | null>(null);

  return (
    <section className="skillOrbit" aria-label="My skill set">
      <div className="skillOrbit__ring" onMouseLeave={() => setActiveNumber(null)}>
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.number}
            skill={skill}
            index={index}
            activeNumber={activeNumber}
            onHoverStart={setActiveNumber}
            onHoverEnd={() => setActiveNumber(null)}
          />
        ))}
      </div>

      <div className="skillOrbit__center">
        <h2 className="skillOrbit__title">MY SKILL SET</h2>

        <svg
          className="skillOrbit__folder"
          width="229"
          height="229"
          viewBox="0 0 229 229"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M14.6538 41.5117C14.6538 31.5706 22.7127 23.5117 32.6538 23.5117H79.8946C83.97 23.5117 87.948 24.7567 91.2963 27.08L105.511 36.9435C108.86 39.2668 112.838 40.5117 116.913 40.5117H189.654C198.49 40.5117 205.654 47.6752 205.654 56.5117V189.512H14.6538V41.5117Z"
            fill="url(#skill-folder-gradient-0)"
          />
          <path
            d="M14.6538 41.5117C14.6538 31.5706 22.7127 23.5117 32.6538 23.5117H79.8946C83.97 23.5117 87.948 24.7567 91.2963 27.08L105.511 36.9435C108.86 39.2668 112.838 40.5117 116.913 40.5117H189.654C198.49 40.5117 205.654 47.6752 205.654 56.5117V189.512H14.6538V41.5117Z"
            fill="black"
            fillOpacity="0.2"
          />
          <path
            d="M21.6538 44.5117C21.6538 42.3026 23.4447 40.5117 25.6538 40.5117H195.654C197.863 40.5117 199.654 42.3026 199.654 44.5117V153.512H21.6538V44.5117Z"
            fill="url(#skill-folder-gradient-1)"
          />
          <path
            d="M21.6538 44.5117C21.6538 42.3026 23.4447 40.5117 25.6538 40.5117H195.654C197.863 40.5117 199.654 42.3026 199.654 44.5117V153.512H21.6538V44.5117Z"
            fill="black"
            fillOpacity="0.1"
          />
          <path
            d="M203.654 136.012C183.487 118.512 132.154 76.2117 94.1538 55.0117L133.154 159.512L203.654 136.012Z"
            fill="url(#skill-folder-gradient-2)"
          />
          <path
            d="M203.654 136.012C183.487 118.512 132.154 76.2117 94.1538 55.0117L133.154 159.512L203.654 136.012Z"
            fill="black"
            fillOpacity="0.1"
          />
          <path
            d="M14.6538 54.2421C14.6538 49.9305 18.0706 46.3946 22.3797 46.2468L61.2289 44.9149C85.4269 44.0852 107.219 59.4636 114.547 82.5404L133.863 143.373C134.856 146.5 138.176 148.25 141.317 147.301L183.654 134.512L191.908 132.861C200.571 131.128 208.654 137.754 208.654 146.589V193.512C208.654 196.273 206.415 198.512 203.654 198.512H19.6538C16.8924 198.512 14.6538 196.273 14.6538 193.512V54.2421Z"
            fill="url(#skill-folder-gradient-3)"
          />
          <path
            d="M14.6538 54.2421C14.6538 49.9305 18.0706 46.3946 22.3797 46.2468L61.2289 44.9149C85.4269 44.0852 107.219 59.4636 114.547 82.5404L133.863 143.373C134.856 146.5 138.176 148.25 141.317 147.301L183.654 134.512L191.908 132.861C200.571 131.128 208.654 137.754 208.654 146.589V193.512C208.654 196.273 206.415 198.512 203.654 198.512H19.6538C16.8924 198.512 14.6538 196.273 14.6538 193.512V54.2421Z"
            fill="black"
            fillOpacity="0.1"
          />
          <defs>
            <linearGradient id="skill-folder-gradient-0" x1="89.1538" y1="32.0117" x2="57.6538" y2="100.012" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0C48AF" />
              <stop offset="1" stopColor="#5291E6" />
            </linearGradient>
            <linearGradient id="skill-folder-gradient-1" x1="183.154" y1="40.5117" x2="110.654" y2="153.512" gradientUnits="userSpaceOnUse">
              <stop offset="0.0265537" stopColor="#8B8F92" />
              <stop offset="0.178316" stopColor="#DADFE5" />
              <stop offset="1" stopColor="#E6E8E7" />
            </linearGradient>
            <linearGradient id="skill-folder-gradient-2" x1="157.654" y1="87.0117" x2="118.154" y2="136.512" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1B7DDE" />
              <stop offset="1" stopColor="#88BAEB" />
            </linearGradient>
            <linearGradient id="skill-folder-gradient-3" x1="157.934" y1="43.5117" x2="118" y2="221" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BEDBED" />
              <stop offset="0.730605" stopColor="#57A8FB" />
              <stop offset="1" stopColor="#06215D" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        .skillOrbit {
          --u: calc(100vw / 1920);
          --card-width: calc(442.4 * var(--u));
          --card-height: calc(504 * var(--u));
          --orbit-radius: calc(1080 * var(--u));

          position: relative;
          width: 100%;
          height: calc(1080 * var(--u));
          min-height: calc(1080 * var(--u));
          overflow: hidden;
          background: transparent;
          font-family: var(--font-ali-medium), Arial, sans-serif;
          isolation: isolate;
        }

        .skillOrbit__ring {
          position: absolute;
          z-index: 2;
          left: 50%;
          top: calc(1408 * var(--u));
          width: 0;
          height: 0;
          animation: skillOrbitSpin 56s linear infinite;
          will-change: transform;
        }

        .skillOrbit__card {
          position: absolute;
          left: calc(var(--card-width) / -2);
          top: calc(var(--card-height) / -2);
          width: var(--card-width);
          height: var(--card-height);
          transform: rotate(var(--angle)) translateY(calc(var(--orbit-radius) * -1));
          transform-origin: 50% 50%;
          backface-visibility: hidden;
          will-change: transform;
        }

        .skillOrbit__surface {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          padding: calc(49 * var(--u)) calc(47.6 * var(--u));
          overflow: hidden;
          color: #f2f0e8;
          text-align: left;
          border: 1px solid rgb(255 255 255 / 6%);
          border-radius: calc(30 * var(--u));
          background: rgb(28 28 28 / 72%);
          box-shadow: none;
          backdrop-filter: blur(8px);
          cursor: pointer;
          transform-origin: center;
          will-change: transform, filter;
        }

        .skillOrbit__surface:focus-visible {
          outline: 2px solid #e0e0e0;
          outline-offset: 4px;
        }

        .skillOrbit__number {
          display: block;
          position: absolute;
          top: calc(35 * var(--u));
          left: calc(34 * var(--u));
          color: #3f3f3f;
          opacity: 1;
          font-family: var(--font-ali-semibold), Arial, sans-serif;
          font-size: calc(114.8 * var(--u));
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: calc(-7 * var(--u));
        }

        .skillOrbit__copy {
          position: absolute;
          left: calc(53.2 * var(--u));
          bottom: calc(64.4 * var(--u));
          max-width: calc(329 * var(--u));
        }

        .skillOrbit__dot {
          display: block;
          width: calc(14 * var(--u));
          height: calc(14 * var(--u));
          margin-bottom: calc(28 * var(--u));
          background: #004ed7;
        }

        .skillOrbit__name,
        .skillOrbit__title {
          font-family: var(--font-ali-semibold), Arial, sans-serif;
          font-weight: 600;
          text-transform: uppercase;
        }

        .skillOrbit__name {
          display: block;
          margin: 0;
          font-size: calc(54.6 * var(--u));
          line-height: 0.93;
          letter-spacing: calc(-0.7 * var(--u));
          transform: scaleX(0.78);
          transform-origin: left center;
        }

        .skillOrbit__center {
          position: absolute;
          z-index: 4;
          left: 50%;
          top: calc(674 * var(--u));
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .skillOrbit__title {
          margin: 0;
          color: #e0e0e0;
          font-size: calc(70 * var(--u));
          line-height: 0.95;
          letter-spacing: calc(1.5 * var(--u));
          white-space: nowrap;
          transform: scaleX(0.84);
          transform-origin: center;
        }

        .skillOrbit__folder {
          display: block;
          width: calc(229 * var(--u));
          height: calc(229 * var(--u));
          margin-top: calc(32 * var(--u));
        }

        @keyframes skillOrbitSpin {
          from { transform: rotate(2deg); }
          to { transform: rotate(362deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .skillOrbit__ring {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}
