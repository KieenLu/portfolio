"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ScrollLineIndicator } from "../ScrollLineIndicator";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const containerRef = useRef(null);
    const scrollLineRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const titleElement = titleRef.current;
            const descElement = descRef.current;
            const container = containerRef.current;
            const scrollLine = scrollLineRef.current;

            if (!titleElement || !descElement || !container) return;

            const mainElement = container.closest("main");
            if (!mainElement) return;

            const splitTitle = titleElement.innerText;
            const splitDesc = descElement.innerText;

            const frontendStart = splitTitle.indexOf("frontend");

            let html = "";
            let i = 0;

            while (i < splitTitle.length) {
                if (i === frontendStart) {
                    html += '<span style="display: inline-block; white-space: nowrap;">';
                    for (let j = 0; j < "frontend".length; j++) {
                        html += `<span class="color-main" style="display: inline-block;">${splitTitle[i]}</span>`;
                        i++;
                    }
                    html += "</span>";
                } else {
                    const char = splitTitle[i];
                    if (char === " ") {
                        html += '<span style="display: inline-block; width: 0.25em;"></span>';
                    } else {
                        html += `<span style="display: inline-block;">${char}</span>`;
                    }
                    i++;
                }
            }

            titleElement.innerHTML = html;

            descElement.innerHTML = splitDesc
                .split("")
                .map((char, i) =>
                    char === " "
                        ? '<span style="display: inline-block; width: 0.25em;"></span>'
                        : `<span style="display: inline-block;">${char}</span>`
                )
                .join("");

            const titleChars = titleElement.querySelectorAll("span");
            const descChars = descElement.querySelectorAll("span");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    scroller: mainElement,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            titleChars.forEach((char, i) => {
                const angle = (Math.random() - 0.5) * 180;
                const distance = 100 + Math.random() * 200;
                const xMove = Math.cos((angle * Math.PI) / 180) * distance;
                const yMove = Math.sin((angle * Math.PI) / 180) * distance - 150;

                tl.to(
                    char,
                    {
                        x: xMove,
                        y: yMove,
                        rotation: Math.random() * 720 - 360,
                        opacity: 0,
                        scale: 0.3,
                        ease: "power2.out",
                    },
                    i * 0.01
                );
            });

            descChars.forEach((char, i) => {
                const angle = (Math.random() - 0.5) * 180;
                const distance = 80 + Math.random() * 150;
                const xMove = Math.cos((angle * Math.PI) / 180) * distance;
                const yMove = Math.sin((angle * Math.PI) / 180) * distance - 100;

                tl.to(
                    char,
                    {
                        x: xMove,
                        y: yMove,
                        rotation: Math.random() * 720 - 360,
                        opacity: 0,
                        scale: 0.2,
                        ease: "power2.out",
                    },
                    i * 0.008
                );
            });

            if (scrollLine) {
                ScrollTrigger.create({
                    trigger: container,
                    scroller: mainElement,
                    start: "top top",
                    end: "top top-=300",
                    scrub: 1,
                    onUpdate: (self) => {
                        gsap.to(scrollLine, {
                            opacity: 1 - self.progress,
                            duration: 0.1,
                        });
                    },
                });
            }

            ScrollTrigger.refresh();
        }, 300);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex relative items-center flex-col justify-center min-h-[calc(100vh-80px)] w-full gap-5 overflow-hidden"
        >
            <div
                ref={titleRef}
                className="text-7xl text-center text-main lg:w-6/12"
                style={{ willChange: "transform" }}
            >
                Hi, I'm Killian, a frontend developer
            </div>
            <p
                ref={descRef}
                className="text-primary lg:w-6/12 text-center"
                style={{ willChange: "transform" }}
            >
                I bring value to web development projects by merging technical expertise with
                meticulous attention to every detail.
            </p>
            <ScrollLineIndicator ref={scrollLineRef} />
        </div>
    );
};

export default Hero;
