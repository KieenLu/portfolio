"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { usePageConcept } from "@/hooks/usePageConcept";

gsap.registerPlugin(ScrollTrigger);

const AboutMeBanner = () => {
    const { color } = usePageConcept();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const mainElement = container.closest("main");
        if (!mainElement) return;

        const charEls = container.querySelectorAll<HTMLSpanElement>(".anim-char");
        const paraEls = container.querySelectorAll<HTMLSpanElement>(".anim-para-char");
        const allChars = [...charEls, ...paraEls];

        let disappearTl: gsap.core.Timeline | null = null;

        disappearTl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                scroller: mainElement,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
        });

        disappearTl.fromTo(
            allChars,
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: -20,
                ease: "power2.in",
                stagger: { each: 0.03, from: "start" },
            }
        );

        ScrollTrigger.refresh();

        return () => {
            disappearTl?.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const renderChars = (text: string, className: string, style?: React.CSSProperties) => {
        const words = text.split(" ");
        return words.map((word, wi) => (
            <span key={wi} style={{ display: "inline-block" }}>
                {word.split("").map((char, ci) => (
                    <span
                        key={ci}
                        className={className}
                        style={{ display: "inline-block", ...style }}
                    >
                        {char}
                    </span>
                ))}
                {wi < words.length - 1 && <span style={{ display: "inline-block" }}>&nbsp;</span>}
            </span>
        ));
    };

    const paraText =
        "Let me introduce myself, my workflows, and the technologies I like to use to bring my projects to life.";

    return (
        <div
            ref={containerRef}
            className="container flex relative items-center flex-col justify-center min-h-[calc(100vh-80px)] gap-5 overflow-hidden"
        >
            <div
                className="text-8xl text-center text-white lg:w-8/12 xl:w-7/12"
                style={{ willChange: "transform" }}
            >
                {renderChars("Let's get to know ", "anim-char")}
                {renderChars("each other", "anim-char", { color })}
            </div>

            <p className="text-primary lg:w-6/12 text-center" style={{ willChange: "transform" }}>
                {renderChars(paraText, "anim-para-char")}
            </p>
        </div>
    );
};

export default AboutMeBanner;
