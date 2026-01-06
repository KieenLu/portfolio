"use client";

import gsap from "gsap";
import { forwardRef, useEffect, useRef } from "react";

export const ScrollLineIndicator = forwardRef((_, forwardedRef) => {
    const lineRef = useRef(null);

    useEffect(() => {
        const line = lineRef.current;
        if (!line) return;

        gsap.fromTo(
            line,
            {
                opacity: 0,
                scaleY: 0,
            },
            {
                opacity: 1,
                scaleY: 1,
                duration: 1.5,
                delay: 0.5,
                ease: "power2.out",
                transformOrigin: "top",
            }
        );

        gsap.to(line, {
            y: 30,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(line, {
            boxShadow: "0 0 20px rgba(0, 255, 65, 0.8), 0 0 40px rgba(0, 255, 65, 0.4)",
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(line, {
            scaleX: 1.5,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        if (forwardedRef) {
            if (typeof forwardedRef === "function") {
                forwardedRef(line);
            } else {
                forwardedRef.current = line;
            }
        }
    }, [forwardedRef]);

    return (
        <div
            ref={lineRef}
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 h-28 z-50"
            style={{
                width: "1px",
                background:
                    "linear-gradient(to bottom, transparent 0%, rgba(0, 255, 65, 0.3) 20%, #00ff41 40%, #00ff41 60%, rgba(0, 255, 65, 0.3) 80%, transparent 100%)",
                borderRadius: "50px",
                boxShadow: "0 0 6px rgba(0, 255, 65, 0.4)",
                clipPath: "ellipse(100% 100% at 50% 50%)",
            }}
        />
    );
});

ScrollLineIndicator.displayName = "ScrollLineIndicator";
