import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section className="about-section section-shell" id="home">
      <div id="about" className="section-anchor" />
      <ScrollReveal className="section-kicker-row">
        <p className="section-kicker">01 / ABOUT</p>
        <p className="section-status"><span /> AVAILABLE FOR SELECT PROJECTS</p>
      </ScrollReveal>

      <h1 className="about-title">
        <TextReveal text="ABOUT" />
      </h1>

      <div className="about-grid">
        <ScrollReveal className="about-intro" delay={0.08}>
          <p className="eyebrow">HI, I&apos;M {profile.name.toUpperCase()}</p>
          <h2>{profile.intro}</h2>
        </ScrollReveal>

        <ScrollReveal className="about-copy" delay={0.18}>
          <p>{profile.philosophy}</p>
          <dl className="about-facts">
            <div><dt>CURRENTLY IN</dt><dd>{profile.location}</dd></div>
            <div><dt>EXPERIENCE</dt><dd>{profile.experience}</dd></div>
            <div><dt>FOCUS</dt><dd>Digital products &amp; systems</dd></div>
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
