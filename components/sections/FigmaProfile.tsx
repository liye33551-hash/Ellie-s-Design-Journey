"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const asset = (name: string) => `/images/figma-home/${name}`;

export function FigmaProfile() {
  const reduceMotion = useReducedMotion();
  const [titleClickVersion, setTitleClickVersion] = useState(0);

  const replayTitleClick = () => setTitleClickVersion((version) => version + 1);

  return (
    <section className="figma-profile" aria-label="About Ellie" data-figma-node="32:4439">
      <Image id="profile" className="figma-object figma-profile-card" src={asset("profile-card.png")} alt="Ellie in Shen Zhen" width={409} height={438} />

      <motion.h1
        className="figma-profile-name"
        data-figma-node="32:4424"
        initial={reduceMotion ? false : { opacity: 0, y: 54, rotateX: 16, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        role="button"
        tabIndex={0}
        aria-label="Animate the Ellie title"
        onClick={replayTitleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            replayTitleClick();
          }
        }}
      >
        <motion.span
          key={titleClickVersion}
          className="figma-profile-name-click"
          initial={reduceMotion || titleClickVersion === 0 ? false : {
            scale: 1,
            y: 0,
            rotateZ: 0,
            filter: "brightness(1)",
          }}
          animate={reduceMotion || titleClickVersion === 0 ? undefined : {
            scale: [1, 0.955, 1.035, 1],
            y: [0, 5, -4, 0],
            rotateZ: [0, -1.1, 0.75, 0],
            filter: ["brightness(1)", "brightness(1.2)", "brightness(1.08)", "brightness(1)"],
          }}
          transition={{ duration: 0.72, times: [0, 0.24, 0.62, 1], ease: [0.22, 1, 0.36, 1] }}
        >
          HI,I&apos;mEllie
        </motion.span>
      </motion.h1>

      <div className="figma-profile-details" data-figma-node="32:4436">
        <p className="figma-profile-role">UI/UX Designer</p>
        <div className="figma-profile-contact-row">
          <a className="figma-profile-contact figma-profile-email" href="mailto:Ellie33551@outlook.com">
            <Image src={asset("email.svg")} alt="" width={46} height={46} unoptimized />
            <span>Ellie33551outlook.com</span>
          </a>
          <a className="figma-profile-contact figma-profile-phone" href="tel:13198686695">
            <Image src={asset("phone.svg")} alt="" width={46} height={46} unoptimized />
            <span>13198686695</span>
          </a>
        </div>
      </div>
    </section>
  );
}
