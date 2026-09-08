"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  reverse?: boolean;
  priority?: boolean;
};

export function ProjectCard({ project, reverse = false, priority = false }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`project-card ${reverse ? "project-card--reverse" : ""}`}
      whileHover={reduceMotion ? undefined : "hover"}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <div className="project-layout section-shell">
        <ScrollReveal className="project-info">
          <div className="project-number">PROJECT {project.number}</div>
          <motion.h3 variants={{ hover: { x: reverse ? -10 : 10 } }} transition={{ duration: 0.45 }}>
            {project.title}
          </motion.h3>
          <div className="project-meta">
            <div><span>YEAR</span><strong>{project.year}</strong></div>
            <div><span>CATEGORY</span><strong>{project.category}</strong></div>
          </div>
          <p className="project-description">{project.description}</p>
          <ul className="project-tags">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <motion.a className="project-link" href="#contact" variants={{ hover: { x: reverse ? -8 : 8 } }}>
            VIEW PROJECT <span>↗</span>
          </motion.a>
        </ScrollReveal>

        <motion.div className="project-visual" variants={{ hover: { scale: 1.028 } }} transition={{ duration: 0.7 }}>
          <ImageReveal src={project.image} alt={`${project.title} project preview`} priority={priority} />
        </motion.div>
      </div>
    </motion.article>
  );
}
