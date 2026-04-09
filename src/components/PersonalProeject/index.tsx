"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import {
    ImageProjectBenoit,
    ImageProjectCFDCourse,
    ImageProjectShopper,
    ImageProjectWooder,
} from "@/assets/images";

import ProjectHighlight from "../ProjectHightlightCard";
import TitleSection from "../TitleSection";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        index: 1,
        title: "Shopper E-commerce",
        year: "2023",
        tags: [
            "Next.js",
            "Typescript",
            "AntDesign",
            "TailWindCSS",
            "Axios",
            "Redux",
            "TanStack Query",
        ],
        imageSrc: ImageProjectShopper.src,
        href: "https://shopper-next.vercel.app/",
    },
    {
        index: 2,
        title: "CFD Course",
        year: "2023",
        tags: ["React", "AntDesign", "TailWindCSS", "Axios", "Redux"],
        imageSrc: ImageProjectCFDCourse.src,
        href: "https://courses-cfd.vercel.app/",
    },
    {
        index: 3,
        title: "Benoit Landing Page",
        year: "2023",
        tags: ["HTML", "CSS", "SCSS", "Grunt", "Figma"],
        imageSrc: ImageProjectBenoit.src,
        href: "https://kieenlu.github.io/Benoit/",
    },
    {
        index: 4,
        title: "Wooder Lading Page",
        year: "2023",
        tags: ["HTML", "CSS", "SCSS", "Grunt", "Figma"],
        imageSrc: ImageProjectWooder.src,
        href: "https://kieenlu.github.io/Wooder/",
    },
];

export default function ProjectsHighlight() {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const list = listRef.current;
            if (!list) return;

            const mainElement = list.closest("main");
            if (!mainElement) return;

            const cards = list.querySelectorAll<HTMLElement>(":scope > *");

            gsap.set(cards, { opacity: 0, x: -120 });

            const triggers = Array.from(cards).map((card) =>
                ScrollTrigger.create({
                    trigger: card,
                    scroller: mainElement,
                    start: "top 75%",
                    onEnter: () =>
                        gsap.to(card, {
                            opacity: 1,
                            x: 0,
                            duration: 1.6,
                            ease: "expo.out",
                        }),
                    onLeaveBack: () =>
                        gsap.to(card, {
                            opacity: 0,
                            x: -120,
                            duration: 0.6,
                            ease: "power2.in",
                        }),
                })
            );

            ScrollTrigger.refresh();

            return () => triggers.forEach((t) => t.kill());
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="w-full py-24 px-6 mb-36">
            <TitleSection title="**Personal** Projects" />

            <div ref={listRef} className="flex flex-col gap-6 max-w-5xl mx-auto pt-20">
                {PROJECTS.map((p) => (
                    <ProjectHighlight key={p.index} {...p} />
                ))}
            </div>

            {/* <div className="text-center pt-32">
                <ButtonHover href="/projects" label="All projects" />
            </div> */}
        </section>
    );
}
