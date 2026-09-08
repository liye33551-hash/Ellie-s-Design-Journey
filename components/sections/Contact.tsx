import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-shell">
        <ScrollReveal className="section-kicker-row contact-kicker">
          <p className="section-kicker">04 / CONTACT</p>
          <p className="section-note">Have a project in mind?</p>
        </ScrollReveal>

        <h2 className="contact-title"><TextReveal text="LET'S MAKE SOMETHING CLEAR, USEFUL AND BEAUTIFUL." /></h2>

        <div className="contact-links">
          {profile.links.map((link, index) => (
            <ScrollReveal delay={index * 0.05} key={link.label}>
              <a className="contact-link" href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <span>{link.label}</span>
                <span className="contact-detail">{link.detail}</span>
                <span>↗</span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
