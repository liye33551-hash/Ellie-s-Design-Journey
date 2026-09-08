import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    number: "01",
    title: "Lumen Finance",
    year: "2026",
    category: "UI/UX Design",
    description:
      "A calm, transparent wealth platform designed to help first-time investors understand their portfolio and make confident decisions.",
    tags: ["Product Strategy", "Design System", "Prototype"],
    image: "/images/projects/lumen-finance.svg",
    accent: "#d7ff55",
  },
  {
    number: "02",
    title: "Orbit Workspace",
    year: "2025",
    category: "Product Design",
    description:
      "An AI-assisted workspace that unifies research, project context and team decisions in one focused environment.",
    tags: ["UX Research", "Interaction", "AI Product"],
    image: "/images/projects/orbit-workspace.svg",
    accent: "#a8c7ff",
  },
  {
    number: "03",
    title: "Serein Identity",
    year: "2025",
    category: "Visual Design",
    description:
      "A flexible digital identity for a contemporary wellbeing studio, spanning art direction, motion principles and product touchpoints.",
    tags: ["Art Direction", "Brand System", "Motion"],
    image: "/images/projects/serein-identity.svg",
    accent: "#ff8b68",
  },
];

export const archiveItems = [
  { number: "01", label: "UI Design", count: "08 projects" },
  { number: "02", label: "Product Design", count: "06 projects" },
  { number: "03", label: "Visual Design", count: "11 projects" },
  { number: "04", label: "Branding", count: "05 projects" },
] as const;
