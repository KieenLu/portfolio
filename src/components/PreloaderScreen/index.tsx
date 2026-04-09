"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { usePageConcept } from "@/hooks/usePageConcept";

export default function PreloaderScreen() {
    const loadingScreenRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const loader1Ref = useRef<HTMLDivElement>(null);
    const loader2Ref = useRef<HTMLDivElement>(null);
    const counter3Ref = useRef<HTMLDivElement>(null);
    const counter2Ref = useRef<HTMLDivElement>(null);
    const counter1Ref = useRef<HTMLDivElement>(null);

    const { color } = usePageConcept();

    useEffect(() => {
        const counter3 = counter3Ref.current;
        if (!counter3) return;

        function animate(counter: HTMLElement | null, duration: number, delay = 0) {
            if (!counter) return;
            const numEl = counter.querySelector<HTMLElement>(".num");
            const numHeight = numEl?.clientHeight ?? 100;
            const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;
            gsap.to(counter, {
                y: -totalDistance,
                duration,
                delay,
                ease: "power2.inOut",
            });
        }

        animate(counter3Ref.current, 7);
        animate(counter2Ref.current, 8);
        animate(counter1Ref.current, 2, 6);

        gsap.to(".digit", {
            top: "-150px",
            stagger: { amount: 0.25 },
            delay: 8,
            duration: 1,
            ease: "power4.inOut",
        });

        gsap.to(loader1Ref.current, {
            width: 200,
            duration: 6,
            ease: "power2.inOut",
        });
        gsap.to(loader2Ref.current, {
            width: 100,
            duration: 6,
            delay: 1.9,
            ease: "power2.inOut",
        });

        gsap.to(loaderRef.current, {
            background: "none",
            delay: 8,
            duration: 0.1,
        });
        gsap.to(loader1Ref.current, {
            rotate: 90,
            y: -50,
            duration: 0.5,
            delay: 8,
        });
        gsap.to(loader2Ref.current, { x: -75, y: 75, duration: 0.5, delay: 8 });
        gsap.to(loaderRef.current, {
            scale: 40,
            duration: 1,
            delay: 9,
            ease: "power2.inOut",
        });
        gsap.to(loaderRef.current, {
            rotate: 45,
            y: 500,
            x: 2000,
            duration: 1,
            delay: 9,
            ease: "power2.inOut",
        });
        gsap.to(loadingScreenRef.current, {
            opacity: 0,
            duration: 0.5,
            delay: 9.5,
            ease: "power1.inOut",
            onComplete: () => {
                if (loadingScreenRef.current) {
                    loadingScreenRef.current.style.display = "none";
                }
            },
        });
    }, []);

    return (
        <div
            ref={loadingScreenRef}
            className="fixed inset-0 z-50 w-full h-full bg-black text-white pointer-events-none"
        >
            <div
                ref={loaderRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex"
                style={{ width: "300px", height: "50px", background: "rgb(80,80,80)" }}
            >
                <div
                    ref={loader1Ref}
                    style={{
                        position: "relative",
                        background: color,
                        width: "0px",
                        height: "50px",
                    }}
                />
                <div
                    ref={loader2Ref}
                    style={{
                        position: "relative",
                        background: color,
                        width: "0px",
                        height: "50px",
                    }}
                />
            </div>

            <div
                className="fixed left-[50px] bottom-[50px] flex h-[100px] overflow-hidden"
                style={{
                    fontSize: "100px",
                    lineHeight: "102px",
                    fontWeight: 400,
                    clipPath: "polygon(0 0, 100% 0, 100% 100px, 0 100px)",
                }}
            >
                <div ref={counter1Ref} className="digit relative" style={{ top: "8px" }}>
                    <div className="num" style={{ height: "100px", lineHeight: "102px" }}>
                        0
                    </div>
                    <div
                        className="num"
                        style={{
                            height: "100px",
                            lineHeight: "102px",
                            position: "relative",
                            right: "-12px",
                        }}
                    >
                        1
                    </div>
                </div>

                <div ref={counter2Ref} className="digit relative" style={{ top: "8px" }}>
                    {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((n, i) => (
                        <div
                            key={i}
                            className="num"
                            style={{
                                height: "100px",
                                lineHeight: "102px",
                                ...(i === 1 ? { position: "relative", right: "-10px" } : {}),
                            }}
                        >
                            {n}
                        </div>
                    ))}
                </div>

                <div ref={counter3Ref} className="digit relative" style={{ top: "8px" }}>
                    {[...Array(2)].flatMap((_, i) =>
                        [...Array(10)].map((_, j) => (
                            <div
                                key={`${i}-${j}`}
                                className="num"
                                style={{ height: "100px", lineHeight: "102px" }}
                            >
                                {j}
                            </div>
                        ))
                    )}
                    <div className="num" style={{ height: "100px", lineHeight: "102px" }}>
                        0
                    </div>
                </div>
            </div>
        </div>
    );
}
