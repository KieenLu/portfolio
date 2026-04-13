"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { ScrollLineIndicator } from "../ScrollLineIndicator";

gsap.registerPlugin(ScrollTrigger);

const HomeBanner = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollLineRef = useRef(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const mainElement = container.closest("main") || window;

        const charEls = container.querySelectorAll(".anim-char");
        const paraEls = container.querySelectorAll(".anim-para-char");
        const allChars = [...charEls, ...paraEls];

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    scroller: mainElement,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            tl.fromTo(
                allChars,
                { opacity: 1, y: 0 },
                {
                    opacity: 0,
                    y: -20,
                    ease: "power2.in",
                    stagger: { each: 0.03, from: "start" },
                }
            );

            tl.to(
                container.querySelector(".scroll-wrapper"),
                {
                    opacity: 0,
                    duration: 0.5,
                },
                0
            );
        }, container);

        return () => ctx.revert();
    }, []);

    const renderChars = (text: string, className: string, style?: React.CSSProperties) => {
        const words = text.split(" ");
        return words.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((char, ci) => (
                    <span
                        key={ci}
                        className={className}
                        style={{
                            display: "inline-block",
                            willChange: "transform, opacity",
                            ...style,
                        }}
                    >
                        {char}
                    </span>
                ))}
                {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
        ));
    };

    return (
        <div
            ref={containerRef}
            className="container flex relative items-center flex-col justify-center min-h-[calc(100vh-80px)] w-full gap-5 overflow-hidden"
        >
            <div className="text-center lg:w-10/12 xl:w-8/12">
                <h1 className="text-8xl text-white leading-tight">
                    {renderChars("Hi, I'm Killian, a ", "anim-char")}
                    <span className="inline-block whitespace-nowrap">
                        {renderChars("frontend", "anim-char color-main")}
                        {renderChars(" developer", "anim-char")}
                    </span>
                </h1>
            </div>

            <p
                className="text-primary lg:w-6/12 text-center text-xl"
                style={{ willChange: "transform" }}
            >
                {renderChars(
                    "I bring value to web development projects by merging technical expertise with meticulous attention to every detail.",
                    "anim-para-char"
                )}
            </p>

            <div className="scroll-wrapper absolute bottom-10">
                <ScrollLineIndicator innerRef={scrollLineRef} />
            </div>
        </div>
    );
};

export default HomeBanner;
