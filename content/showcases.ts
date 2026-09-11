export type Showcase = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  cta: string;
  accent: string;
  coverSrc: string;
  detailImages?: string[];
};

const creativeVisualDetailVersion = "20260911-figma-3";
const creativeVisualDetailImages = Array.from(
  { length: 20 },
  (_, index) => `/images/portfolio/creative-visuals/${String(index + 1).padStart(2, "0")}.webp?v=${creativeVisualDetailVersion}`,
);
const formDesignDetailVersion = "20260908-hires";
const formDesignDetailImages = Array.from(
  { length: 12 },
  (_, index) => `/images/portfolio/form-design/${String(index + 1).padStart(2, "0")}.webp?v=${formDesignDetailVersion}`,
);
const ipScenarioDetailVersion = "20260908-hires";
const ipScenarioDetailImages = Array.from(
  { length: 10 },
  (_, index) => `/images/portfolio/ip-scenario/${String(index + 1).padStart(2, "0")}.webp?v=${ipScenarioDetailVersion}`,
);

export const showcases: Showcase[] = [
  { slug: "creative-visuals", tag: "IOS APP", title: "Meelo Chat", description: "UI & Visual Design, AI‑Powered Workflow", cta: "View Works", accent: "#AEFF62", coverSrc: "/images/projects/showcase-01.png", detailImages: creativeVisualDetailImages },
  { slug: "form-design", tag: "Mini Program", title: "Smart Park", description: "One‑Stop Full‑Scenario Smart Campus Mini‑Program", cta: "View Works", accent: "#FFB8DF", coverSrc: "/images/projects/showcase-02.png", detailImages: formDesignDetailImages },
  { slug: "ip-scenario", tag: "IP scenario", title: "Sinozo IP", description: "IP Design & Scenario Application", cta: "View Works", accent: "#66DDFF", coverSrc: "/images/projects/showcase-03.png", detailImages: ipScenarioDetailImages },
  { slug: "waterfall-collection", tag: "music APP", title: "MELODY Play", description: "Constant style exploration and persistent creative passion", cta: "View Works", accent: "#6EFF9C", coverSrc: "/images/projects/showcase-04.png" },
  { slug: "dynamic-vision", tag: "Design Practice", title: "AI Tool Exploration", description: "Visual Exploration of Tools in the AI Era", cta: "View Works", accent: "#FFE878", coverSrc: "/images/projects/showcase-05.png" },
  { slug: "beyond-design", tag: "Beyond Design", title: "Operation Exploration", description: "Documenting observations beyond design", cta: "View Works", accent: "#B98EFF", coverSrc: "/images/projects/operation-exploration.jpg" },
];
