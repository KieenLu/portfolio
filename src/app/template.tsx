"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set(overlayRef.current, { scaleY: 1 });

        gsap.to(overlayRef.current, {
            scaleY: 0,
            duration: 0.6,
            ease: "power3.inOut",
            transformOrigin: "top",
            delay: 0.2,
        });
    }, []);

    return (
        <>
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[90] bg-black pointer-events-none"
                style={{ transformOrigin: "top" }}
            />
            {children}
        </>
    );
}
