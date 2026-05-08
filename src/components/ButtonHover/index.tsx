"use client";

import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { usePageConcept } from "@/hooks/usePageConcept";

interface Props {
    label?: string;
    href?: string;
    onClick?: () => void;
}

export default function ButtonHover({ label = "about-me", href, onClick }: Props) {
    const router = useRouter();

    const fillRef = useRef<HTMLSpanElement>(null);
    const charsRef = useRef<HTMLSpanElement[]>([]);
    const arrowRef = useRef<HTMLSpanElement>(null);

    const { color } = usePageConcept();

    const chars = label.split("");
    charsRef.current = [];

    const handleMouseEnter = () => {
        gsap.killTweensOf([fillRef.current, ...charsRef.current, arrowRef.current]);

        const tl = gsap.timeline();

        tl.fromTo(
            fillRef.current,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.35, ease: "power3.out" },
            0
        );

        tl.to(
            charsRef.current,
            { y: "-100%", duration: 0.15, ease: "power2.in", stagger: 0.02 },
            0
        );
        tl.set(charsRef.current, { y: "100%" });
        tl.to(charsRef.current, {
            y: "0%",
            duration: 0.15,
            ease: "power2.out",
            stagger: 0.02,
        });

        tl.to(arrowRef.current, { y: "-100%", duration: 0.15, ease: "power2.in" }, 0);
        tl.set(arrowRef.current, { y: "100%" });
        tl.to(arrowRef.current, {
            y: "0%",
            duration: 0.15,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.killTweensOf([fillRef.current, ...charsRef.current, arrowRef.current]);

        const tl = gsap.timeline();

        tl.to(
            fillRef.current,
            { clipPath: "inset(0 100% 0 0)", duration: 0.3, ease: "power3.inOut" },
            0
        );

        tl.to(charsRef.current, { y: "100%", duration: 0.15, ease: "power2.in", stagger: 0.02 }, 0);
        tl.set(charsRef.current, { y: "-100%" });
        tl.to(charsRef.current, {
            y: "0%",
            duration: 0.15,
            ease: "power2.out",
            stagger: 0.02,
        });

        tl.to(arrowRef.current, { y: "100%", duration: 0.15, ease: "power2.in" }, 0);
        tl.set(arrowRef.current, { y: "-100%" });
        tl.to(arrowRef.current, {
            y: "0%",
            duration: 0.15,
            ease: "power2.out",
        });
    };

    const handleClick = () => {
        if (onClick) onClick();
        if (href) router.push(href);
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="glossy hover-button relative inline-flex items-center gap-[0.3em] px-4 py-3 lg:px-6 lg:py-4 cursor-pointer font-mono text-xs tracking-widest select-none whitespace-nowrap"
            style={
                {
                    textDecoration: "none",
                    ["--hover-color"]: color,
                } as React.CSSProperties
            }
        >
            <span
                ref={fillRef}
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    clipPath: "inset(0 100% 0 0)",
                    backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`,
                    borderRadius: "2px",
                }}
                aria-hidden="true"
            />

            <span
                className="relative z-10 inline-flex overflow-hidden"
                style={{ height: "100%" }}
                aria-label={label}
            >
                {chars.map((char, i) => (
                    <span
                        key={i}
                        ref={(el) => {
                            if (el) charsRef.current[i] = el;
                        }}
                        className="inline-flex items-center justify-center text-btn-hv lowercase"
                        style={{
                            height: "100%",
                            width: char === " " ? "0.35em" : "",
                            color: color,
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </span>

            <span
                className="relative z-10 inline-flex overflow-hidden"
                style={{ height: "100%", width: "1em" }}
                aria-hidden="true"
            >
                <span
                    ref={arrowRef}
                    className="inline-flex items-center justify-center w-full"
                    style={{
                        height: "100%",
                        color: color,
                    }}
                >
                    →
                </span>
            </span>
        </button>
    );
}
