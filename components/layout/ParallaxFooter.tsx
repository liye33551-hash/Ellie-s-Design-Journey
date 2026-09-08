"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { footerConfig } from "@/content/footer";

export function ParallaxFooter() {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start 98%", "end 18%"],
  });
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.03, 1.14]);
  const parallaxObjectY = useTransform(scrollYProgress, [0, 1], ["45%", "-17%"]);
  const parallaxObjectPosition = useMotionTemplate`50% ${parallaxObjectY}`;

  return (
    <footer className="parallax-footer">
      <div id="contact" ref={parallaxRef} className="parallax-footer-card">
        <motion.img
          src={footerConfig.backgroundSrc}
          alt=""
          className="parallax-footer-background"
          style={{
            scale: reduceMotion ? 1.08 : parallaxScale,
            objectPosition: reduceMotion ? "50% 50%" : parallaxObjectPosition,
          }}
        />
        <div className="parallax-footer-overlay" />

        <div className="parallax-footer-content">
          <div className="parallax-footer-grid">
            <div className="parallax-footer-brand">
              <strong>{footerConfig.brand}</strong>
              <div>
                {footerConfig.tagline.map((line) => <p key={line}>{line}</p>)}
              </div>
            </div>

            {footerConfig.sections.map((section) => (
              <div key={section.title} className="parallax-footer-column">
                <h4>{section.title}</h4>
                <ul>
                  {section.items.map((item) => (
                    <li key={`${section.title}-${item.label}`}>
                      <span>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>{item.value}</a>
                      ) : (
                        <em>{item.value}</em>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="parallax-footer-bottom">
        <p>© 2026 Ellie. All rights reserved.</p>
      </div>
    </footer>
  );
}
