"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { usePageConcept } from "@/hooks/usePageConcept";
import { useLenisStore } from "@/store/Lenis";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TitleSection = ({ title, classname }: { title: string; classname?: string }) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const { color } = usePageConcept();
    const lenis = useLenisStore((s) => s.lenis);

    const words = title.split(" ").map((word) => {
        const isAccent = word.startsWith("**") && word.endsWith("**");
        return {
            text: isAccent ? word.slice(2, -2) : word,
            isAccent,
        };
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !lenis) return;

        const scrollerEl = lenis.options.wrapper as HTMLElement;

        const onScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onScroll);

        let ctx = gsap.context(() => {
            const charEls = container.querySelectorAll(".domino-char");

            gsap.set(charEls, { opacity: 0, y: 20 });

            gsap.to(charEls, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                stagger: 0.06,
                scrollTrigger: {
                    trigger: container,
                    scroller: scrollerEl,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                },
            });
        }, containerRef);

        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => {
            lenis.off("scroll", onScroll);
            ctx.revert();
            clearTimeout(refreshTimer);
        };
    }, [title, lenis]);

    return (
        <h2
            ref={containerRef}
            className={`text-center text-title-section text-white mb-12 mx-auto ${classname || ""}`}
            style={{ wordBreak: "break-word" }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.text.split("").map((char, charIndex) => (
                        <span
                            key={charIndex}
                            className="domino-char inline-block"
                            style={{
                                color: word.isAccent ? color : undefined,
                                fontWeight: word.isAccent ? 700 : 500,
                            }}
                        >
                            {char}
                        </span>
                    ))}
                    {wordIndex < words.length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </h2>
    );
};

export default TitleSection;
