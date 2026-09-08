import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { projects } from "@/data/projects";

export function Works() {
  return (
    <section className="works-section" id="works">
      <div className="section-shell works-heading">
        <ScrollReveal className="section-kicker-row">
          <p className="section-kicker">02 / SELECTED WORKS</p>
          <p className="section-note">A selection of digital products and visual systems</p>
        </ScrollReveal>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard project={project} reverse={index % 2 === 1} priority={index === 0} key={project.number} />
        ))}
      </div>
    </section>
  );
}
