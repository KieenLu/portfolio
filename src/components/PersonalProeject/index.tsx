"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { PROJECTS } from "@/constants/projects";
import { useLenisStore } from "@/store/Lenis";

import ProjectHighlight from "../ProjectHightlightCard";
import TitleSection from "../TitleSection";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsHighlight() {
    const listRef = useRef<HTMLDivElement>(null);
    const lenis = useLenisStore((state) => state.lenis);

    useEffect(() => {
        const list = listRef.current;
        if (!list || !lenis) return;

        const scroller = lenis.options.wrapper as HTMLElement;
        const cards = list.querySelectorAll<HTMLElement>(":scope > *");

        const ctx = gsap.context(() => {
            gsap.set(cards, { opacity: 0, x: -120 });

            cards.forEach((card) => {
                gsap.to(card, {
                    opacity: 1,
                    x: 0,
                    duration: 1.6,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: card,
                        scroller: scroller,
                        start: "top 85%",
                        once: true,
                    },
                });
            });
        }, list);

        return () => ctx.revert();
    }, [lenis]);

    return (
        <section className="container">
            <TitleSection title="**Personal** Projects" classname="mt-40" />

            <div
                ref={listRef}
                className="flex flex-col lg:gap-8 md:gap-20 gap-32 xl:py-32 md:pb-32 md:pt-20 mb-24 mt-40"
            >
                {PROJECTS.map((p) => (
                    <ProjectHighlight key={p.index} {...p} />
                ))}
            </div>
        </section>
    );
}
