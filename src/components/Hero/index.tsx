"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";

import StarsCanvas from "../BackgroundStar";
import Bounded from "../Bounded";
import Footer from "../Footer";
import Section from "../Section";
import AvatarHero from "./Avatar";

const Hero = () => {
  const component = useRef(null);

  const renderLetters = (name: string, key: string) => {
    if (!name) return;

    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key}-index inline-block opacity-0 hovered`}
      >
        {letter}
      </span>
    ));
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          ".name-animation",
          { x: -100, opacity: 0, rotate: -10 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,

            ease: "elastic.out(1,0.3)",
            duration: 1,
            transformOrigin: "left top",
            stagger: { each: 0.1, from: "random" },
          },
        )
        .fromTo(
          ".job-title",
          {
            y: 20,
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          },
        );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <>
      <StarsCanvas />

      <Bounded ref={component}>
        <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-3 max-sm:gap-5 overflow-hidden">
          <Section delay={0.2}>
            <AvatarHero />
          </Section>
          <div
            className="col-start-1 md:row-start-1 md:col-end-3 "
            data-speed=".2"
          >
            <h1 className="mb-8 text-[clamp(5rem,14vmin,18rem)] font-extrabold leading-none tracking-tighter overflow-hidden">
              <span className="block text-slate-300 max-sm:flex max-sm:items-center max-sm:justify-center">
                {renderLetters("Lu Trung", "first")}
              </span>
              <span className="-mt-[.2em] block text-slate-500 hovered max-sm:flex max-sm:items-center max-sm:justify-center max-sm:mt-2">
                {renderLetters("Kien", "last")}
              </span>
            </h1>
            <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl max-sm:text-center">
              Frontend Developer
            </span>
          </div>
        </div>
      </Bounded>

      <Footer />
    </>
  );
};

export default Hero;
