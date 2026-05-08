"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { bowByOneFont } from "@/constants/localFont";
import { useDevice } from "@/hooks/useDevice";
import { usePageConcept } from "@/hooks/usePageConcept";
import { useLoaderStore } from "@/store/Loader";

import { PRELOADER_CONFIG, PRELOADER_TIMING } from "./helper";

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
    const { device, width } = useDevice();
    const { color } = usePageConcept();

    const containerRef = useRef<HTMLDivElement>(null);
    const loader1Ref = useRef<HTMLDivElement>(null);
    const loader2Ref = useRef<HTMLDivElement>(null);
    const loaderParentRef = useRef<HTMLDivElement>(null);
    const counterElRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!hasAppBeenLoaded) setShouldRender(true);
    }, [hasAppBeenLoaded]);

    const cfg = PRELOADER_CONFIG[device];

    useGSAP(
        () => {
            if (!shouldRender || width === 0) return;

            const tl = gsap.timeline();
            const steps = generateRandomSteps();
            const counter = { value: 0 };
            const stepDuration = (PRELOADER_TIMING.revealStart - 0.5) / steps.length;

            if (counterElRef.current) counterElRef.current.textContent = "";

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

            tl.fromTo(
                loader1Ref.current,
                { width: 0 },
                {
                    width: cfg.bar1Max,
                    duration: PRELOADER_TIMING.loaderBarDuration,
                    ease: "power2.inOut",
                },
                0
            );
            tl.fromTo(
                loader2Ref.current,
                { width: 0 },
                {
                    width: cfg.bar2Max,
                    duration: PRELOADER_TIMING.loaderBarDuration,
                    ease: "power2.inOut",
                },
                PRELOADER_TIMING.loader2Delay
            );

            tl.to(
                counterElRef.current,
                { y: cfg.outro.counterY, opacity: 0, duration: 0.6, ease: "power4.inOut" },
                PRELOADER_TIMING.revealStart
            );
            tl.to(
                loaderParentRef.current,
                { background: "none", duration: 0.1 },
                PRELOADER_TIMING.revealStart
            );
            tl.to(
                loader1Ref.current,
                { rotate: cfg.outro.bar1Rotate, y: cfg.outro.bar1Y, duration: 0.5 },
                PRELOADER_TIMING.revealStart
            );
            tl.to(
                loader2Ref.current,
                { x: cfg.outro.bar2X, y: cfg.outro.bar2Y, duration: 0.5 },
                PRELOADER_TIMING.revealStart
            );

            tl.to(
                loaderParentRef.current,
                {
                    scale: cfg.outro.finalScale,
                    rotate: 45,
                    y: cfg.outro.finalY,
                    x: cfg.outro.finalX,
                    duration: 1,
                    ease: "power2.inOut",
                },
                PRELOADER_TIMING.scaleStart
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
                PRELOADER_TIMING.fadeStart
            );
        },
        { dependencies: [shouldRender, color, device], scope: containerRef }
    );

    if (!shouldRender) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] w-full h-full bg-black text-white pointer-events-auto select-none overflow-hidden"
        >
            <div
                ref={loaderParentRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex"
                style={{
                    width: cfg.loaderWidth,
                    height: cfg.loaderHeight,
                    background: "rgb(80,80,80)",
                }}
            >
                <div
                    ref={loader1Ref}
                    style={{
                        position: "relative",
                        background: color,
                        height: cfg.loaderHeight,
                        marginRight: "-1px",
                    }}
                />
                <div
                    ref={loader2Ref}
                    style={{ position: "relative", background: color, height: cfg.loaderHeight }}
                />
            </div>

            <div
                className="fixed overflow-hidden transition-all duration-300"
                style={{
                    right: cfg.counterRight,
                    bottom: cfg.counterBottom,
                    fontSize: cfg.fontSize,
                    lineHeight: cfg.lineHeight,
                }}
            >
                <div
                    ref={counterElRef}
                    className="font-bold text-[#b0b0b0] p-2"
                    style={{
                        lineHeight: cfg.lineHeight,
                        fontFamily: bowByOneFont.style.fontFamily,
                    }}
                />
            </div>
        </div>
    );
}
