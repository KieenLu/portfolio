"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { bowByOneFont } from "@/constants/localFont";
import { usePageConcept } from "@/hooks/usePageConcept";
import { useLoaderStore } from "@/store/Loader";

const TIMING = {
    loaderBarDuration: 1.2,
    loader2Delay: 0.7,
    revealStart: 2,
    scaleStart: 3.0,
    fadeStart: 3.4,
} as const;

const generateRandomSteps = (total = 100) => {
    const steps = [0];
    while (steps[steps.length - 1] < total) {
        const jump = Math.floor(Math.random() * 10) + 1;
        steps.push(Math.min(steps[steps.length - 1] + jump, total));
    }
    return steps;
};

export default function PreloaderScreen() {
    const hasAppBeenLoaded = useLoaderStore((state) => state.hasAppBeenLoaded);
    const setAppLoaded = useLoaderStore((state) => state.setAppLoaded);

    const [shouldRender, setShouldRender] = useState(false);
    const { color } = usePageConcept();
    const containerRef = useRef<HTMLDivElement>(null);

    const loader1Ref = useRef<HTMLDivElement>(null);
    const loader2Ref = useRef<HTMLDivElement>(null);
    const loaderParentRef = useRef<HTMLDivElement>(null);
    const counterElRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!hasAppBeenLoaded) {
            setShouldRender(true);
        }
    }, [hasAppBeenLoaded]);

    useGSAP(
        () => {
            if (!shouldRender) return;

            const tl = gsap.timeline();

            const steps = generateRandomSteps();
            const counter = { value: 0 };
            const stepDuration = (TIMING.revealStart - 0.5) / steps.length;

            tl.to(
                counter,
                {
                    keyframes: steps.map((v) => ({
                        value: v,
                        duration: stepDuration,
                        ease: "steps(1, end)",
                    })),
                    onUpdate: () => {
                        if (counterElRef.current) {
                            const v = Math.round(counter.value);
                            counterElRef.current.textContent = v > 0 ? String(v) : "";
                        }
                    },
                },
                0
            );

            // Loading bar animation
            tl.fromTo(
                loader1Ref.current,
                { width: 0 },
                { width: 200, duration: TIMING.loaderBarDuration, ease: "power2.inOut" },
                0
            );
            tl.fromTo(
                loader2Ref.current,
                { width: 0 },
                { width: 100, duration: TIMING.loaderBarDuration, ease: "power2.inOut" },
                TIMING.loader2Delay
            );

            // Reveal & Outro
            tl.to(
                counterElRef.current,
                { y: -120, opacity: 0, duration: 0.6, ease: "power4.inOut" },
                TIMING.revealStart
            );
            tl.to(
                loaderParentRef.current,
                { background: "none", duration: 0.1 },
                TIMING.revealStart
            );
            tl.to(loader1Ref.current, { rotate: 90, y: -50, duration: 0.5 }, TIMING.revealStart);
            tl.to(loader2Ref.current, { x: -75, y: 75, duration: 0.5 }, TIMING.revealStart);

            tl.to(
                loaderParentRef.current,
                { scale: 40, rotate: 45, y: 500, x: 2000, duration: 0.8, ease: "power2.inOut" },
                TIMING.scaleStart
            );

            tl.to(
                containerRef.current,
                {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power1.inOut",
                    onComplete: () => {
                        setShouldRender(false);
                        setAppLoaded();
                    },
                },
                TIMING.fadeStart
            );
        },
        { dependencies: [shouldRender, color], scope: containerRef }
    );

    if (!shouldRender) return null;

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 z-[9999] w-full h-full bg-black text-white pointer-events-auto select-none `}
        >
            <div
                ref={loaderParentRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex"
                style={{ width: 300, height: 50, background: "rgb(80,80,80)" }}
            >
                <div
                    ref={loader1Ref}
                    style={{ position: "relative", background: color, width: 0, height: 50 }}
                />
                <div
                    ref={loader2Ref}
                    style={{ position: "relative", background: color, width: 0, height: 50 }}
                />
            </div>

            <div
                className="fixed right-[50px] bottom-[50px] overflow-hidden"
                style={{
                    fontSize: 400,
                    lineHeight: "400px",
                    clipPath: "polygon(0 0, 100% 0, 100% 440px, 0 440px)",
                }}
            >
                <div
                    ref={counterElRef}
                    style={{
                        height: 400,
                        lineHeight: "400px",
                        fontWeight: "bold",
                        fontFamily: bowByOneFont.style.fontFamily,
                        color: "#b0b0b0",
                        letterSpacing: "-4px",
                    }}
                />
            </div>
        </div>
    );
}
