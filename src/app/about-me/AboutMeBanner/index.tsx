"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { usePageConcept } from "@/hooks/usePageConcept";
import { useLenisStore } from "@/store/Lenis";

gsap.registerPlugin(ScrollTrigger);

const AboutMeBanner = () => {
    const { color } = usePageConcept();
    const containerRef = useRef<HTMLDivElement>(null);
    const lenis = useLenisStore((state) => state.lenis);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !lenis) return;

        const scroller = lenis.options.wrapper as HTMLElement;
        const charEls = container.querySelectorAll<HTMLSpanElement>(".anim-char");
        const paraEls = container.querySelectorAll<HTMLSpanElement>(".anim-para-char");
        const allChars = [...charEls, ...paraEls];

        const ctx = gsap.context(() => {
            const disappearTl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    scroller: scroller,
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
        }, container);

        return () => ctx.revert();
    }, [lenis]);

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

    return (
        <div
            ref={containerRef}
            className="container flex relative items-center flex-col justify-center min-h-[calc(100vh-80px)] w-full gap-5 overflow-hidden"
        >
            <div className="text-center lg:w-10/12 xl:w-8/12">
                <h1 className="anim-title mb-2 lg:mb-5">
                    {renderChars("Let's get to know ", "anim-char")}
                    <span className="inline-block whitespace-nowrap">
                        {renderChars("each other", "anim-char", { color })}
                    </span>
                </h1>

                <p className="text-primary">
                    {renderChars(
                        "Let me introduce myself, my workflows, and the technologies I like to use to bring my projects to life.",
                        "anim-para-char"
                    )}
                </p>
            </div>
        </div>
    );
};

export default AboutMeBanner;
