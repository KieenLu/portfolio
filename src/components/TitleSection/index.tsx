"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { usePageConcept } from "@/hooks/usePageConcept";

gsap.registerPlugin(ScrollTrigger);

const TitleSection = ({ title, classname }: { title: string; classname?: string }) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const { color } = usePageConcept();

    const words = title.split(" ").map((word) => {
        const isAccent = word.startsWith("**") && word.endsWith("**");
        return {
            text: isAccent ? word.slice(2, -2) : word,
            isAccent,
        };
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            const container = containerRef.current;
            if (!container) return;

            const mainElement = container.closest("main");
            if (!mainElement) return;

            const charEls = container.querySelectorAll<HTMLSpanElement>(".domino-char");
            if (charEls.length === 0) return;

            gsap.set(charEls, {
                opacity: 0,
                y: 20,
            });

            gsap.to(charEls, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                stagger: {
                    each: 0.06,
                    from: "start",
                },
                scrollTrigger: {
                    trigger: container,
                    scroller: mainElement,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                },
            });

            ScrollTrigger.refresh();
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <h2
            ref={containerRef}
            className={`text-center text-5xl text-white mb-12 ${classname || ""}`}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: "inline-block" }}>
                    {word.text.split("").map((char, charIndex) => (
                        <span
                            key={charIndex}
                            className="domino-char"
                            style={{
                                display: "inline-block",
                                color: word.isAccent ? color : undefined,
                                fontWeight: word.isAccent ? undefined : 500,
                            }}
                        >
                            {char}
                        </span>
                    ))}
                    {wordIndex < words.length - 1 && (
                        <span style={{ display: "inline-block" }}>&nbsp;</span>
                    )}
                </span>
            ))}
        </h2>
    );
};

export default TitleSection;
