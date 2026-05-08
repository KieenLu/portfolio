"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { useDevice } from "@/hooks/useDevice";

interface Props {
    index: number;
    title: string;
    year: string | number;
    tags: string[];
    imageSrc: string;
    imageAlt?: string;
    href?: string;
}

const LAYER_COUNT = 5;

const LAYER_FAN = [
    { rotate: -1, x: 0, y: 0 },
    { rotate: -0.5, x: 0, y: 0 },
    { rotate: 0, x: 0, y: 0 },
    { rotate: 0.5, x: 0, y: 0 },
    { rotate: 1, x: 0, y: 0 },
];

export default function ProjectHighlight({
    index = 1,
    title = "Consensys",
    year = "2025",
    tags = ["svelte", "css", "gsap", "contentful"],
    imageSrc = "/project-preview.png",
    imageAlt,
    href = "#",
}: Props) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const mockupRef = useRef<HTMLDivElement>(null);
    const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const indexRef = useRef<HTMLSpanElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);

    const cardTl = useRef<gsap.core.Timeline | null>(null);
    const fanTl = useRef<gsap.core.Timeline | null>(null);

    const { device } = useDevice();

    const isDesktop = device === "desktop";

    useEffect(() => {
        if (!isDesktop) return;

        gsap.set(mockupRef.current, {
            scale: 0.65,
            opacity: 0,
            transformOrigin: "50% 50%",
            force3D: true,
        });

        layerRefs.current.forEach((el) => {
            gsap.set(el, { rotate: 0, x: 0, y: 0, force3D: true });
        });

        gsap.set(arrowRef.current, { opacity: 0, x: -4 });
    }, []);

    const handleCardEnter = () => {
        if (!isDesktop) return;

        cardTl.current?.kill();
        cardTl.current = gsap.timeline();

        cardTl.current.to(
            mockupRef.current,
            {
                scale: 1,
                opacity: 1,
                duration: 1.0,
                ease: "power3.out",
            },
            0
        );

        cardTl.current.to(leftRef.current, { x: -28, duration: 0.5, ease: "power3.out" }, 0);
        cardTl.current.to(indexRef.current, { opacity: 0, duration: 0.18 }, 0);
        cardTl.current.to(rightRef.current, { x: -14, duration: 0.5 }, 0);
        cardTl.current.to(arrowRef.current, { opacity: 1, x: 0, duration: 0.28 }, 0.1);
    };

    const handleCardLeave = () => {
        if (!isDesktop) return;

        cardTl.current?.kill();
        fanTl.current?.kill();
        cardTl.current = gsap.timeline();

        layerRefs.current.forEach((el, i) => {
            cardTl.current!.to(
                el,
                {
                    rotate: 0,
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    delay: i * 0.02,
                },
                0
            );
        });

        cardTl.current.to(
            mockupRef.current,
            {
                scale: 0.65,
                opacity: 0,
                duration: 0.38,
                ease: "power3.in",
            },
            0.1
        );

        cardTl.current.to(leftRef.current, { x: 0, duration: 0.42 }, 0);
        cardTl.current.to(indexRef.current, { opacity: 1, duration: 0.28 }, 0.05);
        cardTl.current.to(rightRef.current, { x: 0, duration: 0.42 }, 0);
        cardTl.current.to(arrowRef.current, { opacity: 0, x: -4, duration: 0.18 }, 0);
    };

    const handleImageEnter = () => {
        if (!isDesktop) return;

        fanTl.current?.kill();
        fanTl.current = gsap.timeline();

        layerRefs.current.forEach((el, i) => {
            const fan = LAYER_FAN[i];
            fanTl.current!.to(
                el,
                {
                    rotate: fan.rotate,
                    x: fan.x,
                    y: fan.y,
                    duration: 0.65,
                    ease: "expo.out",
                },
                0
            );
        });
    };

    const handleImageLeave = () => {
        if (!isDesktop) return;

        fanTl.current?.kill();
        fanTl.current = gsap.timeline();

        [...layerRefs.current].reverse().forEach((el) => {
            fanTl.current!.to(
                el,
                {
                    rotate: 0,
                    x: 0,
                    y: 0,
                    duration: 0.65,
                },
                0
            );
        });
    };

    const padIndex = String(index).padStart(2, "0");

    return (
        <Link
            ref={cardRef}
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
            href={href}
            target="_blank"
            className="relative flex flex-col md:flex-row lg:items-center md:items-end items-start w-full rounded-sm border border-white/[0.3] lg:px-10 lg:h-72 md:h-80 h-64 cursor-pointer p-6 md:p-8"
            style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                transition: "background-color 0.3s, border-color 0.3s",
            }}
        >
            <div
                ref={mockupRef}
                className="pointer-events-auto absolute z-20 w-[520px] top-[-5px] h-[300px] right-[15%] hidden xl:block"
                style={{
                    aspectRatio: "2/1",
                    transformOrigin: "50% 50%",
                }}
                onMouseEnter={handleImageEnter}
                onMouseLeave={handleImageLeave}
            >
                <div
                    className="hidden xl:block absolute inset-0"
                    style={{ zIndex: 1, contain: "layout style" }}
                >
                    {Array.from({ length: LAYER_COUNT })
                        .map((_, i) => i)
                        .reverse()
                        .map((i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    layerRefs.current[i] = el;
                                }}
                                className="absolute inset-0 rounded-sm"
                                style={{
                                    backgroundColor: "black",
                                    transformOrigin: "center center",
                                    border: "1px solid gray",
                                    zIndex: LAYER_COUNT - i,
                                }}
                            />
                        ))}
                </div>

                <div
                    className="absolute inset-0 rounded-sm overflow-hidden transition-transform duration-300 hover:rotate-[-1.5deg]"
                    style={{
                        zIndex: LAYER_COUNT + 2,
                        boxShadow: "0 20px 56px rgba(0,0,0,0.7)",
                        transformOrigin: "center center",
                        isolation: "isolate",
                        contain: "layout style paint",
                    }}
                >
                    <img
                        src={imageSrc}
                        alt={imageAlt ?? title}
                        className="w-full h-full"
                        style={{ display: "block", transform: "none" }}
                    />
                </div>
            </div>

            <div
                className="block md:hidden z-20 absolute top-0 right-[50%] translate-x-[50%] translate-y-[-50%]"
                style={{ aspectRatio: "16/9", width: "calc(100% - 30px)" }}
            >
                <img
                    src={imageSrc}
                    alt={imageAlt ?? title}
                    className="w-full h-full object-contain"
                    style={{ display: "block", transform: "none" }}
                />
            </div>

            <div className="hidden md:block xl:hidden pointer-events-auto absolute z-20 w-[420px] top-[-60px] h-[230px] right-[5%] rotate-[-2deg]">
                <img
                    src={imageSrc}
                    alt={imageAlt ?? title}
                    className="w-full h-full"
                    style={{ display: "block", transform: "none" }}
                />
            </div>

            <div className="flex md:hidden justify-between w-full mb-3 items-center z-10">
                <span className="text-sm font-mono text-white/65">{padIndex}</span>
                <span className="text-sm text-white/80">{year}</span>
            </div>

            <div
                ref={leftRef}
                className="z-10 flex items-end md:items-start gap-4 flex-1 min-w-0 w-full"
            >
                <span
                    ref={indexRef}
                    className="hidden md:block mt-[6px] text-xs font-mono text-white/65"
                >
                    {padIndex}.
                </span>

                <div className="flex flex-col gap-3 min-w-0 w-full">
                    <h2 className="font-black text-white text-2xl md:text-3xl whitespace-normal md:whitespace-nowrap">
                        {title}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                style={{
                                    paddingBlock: "6px",
                                    paddingInline: "12px",
                                    lineHeight: "1",
                                }}
                                key={tag}
                                className="rounded-full border border-white/[0.25] lowercase text-[11px] text-white/65"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={rightRef} className="hidden md:flex z-10 flex-shrink-0 ml-6">
                <div
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white/80"
                    onClick={(e) => e.stopPropagation()}
                >
                    {year}
                    <span ref={arrowRef}>
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M3 13L13 3M7 3h6v6" stroke="currentColor" strokeWidth="2.2" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
