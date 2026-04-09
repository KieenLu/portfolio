"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { usePageConcept } from "@/hooks/usePageConcept";

export const ScrollLineIndicator = ({ innerRef }) => {
    const lineRef = useRef(null);
    const { color } = usePageConcept();

    useEffect(() => {
        const line = lineRef.current;
        if (!line) return;

        gsap.killTweensOf(line);

        gsap.fromTo(
            line,
            { opacity: 0, scaleY: 0 },
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
            boxShadow: `
        0 0 20px ${color},
        0 0 40px color-mix(in srgb, ${color} 40%, transparent)
      `,
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
    }, [color]);

    return (
        <div
            ref={(el) => {
                lineRef.current = el;
                if (innerRef) innerRef.current = el;
            }}
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 h-28 z-50"
            style={{
                width: "1px",
                background: `linear-gradient(
          to bottom,
          transparent 0%,
          color-mix(in srgb, ${color} 30%, transparent) 20%,
          ${color} 40%,
          ${color} 60%,
          color-mix(in srgb, ${color} 30%, transparent) 80%,
          transparent 100%
        )`,
                borderRadius: "50px",
                boxShadow: `0 0 6px color-mix(in srgb, ${color} 50%, transparent)`,
                clipPath: "ellipse(100% 100% at 50% 50%)",
            }}
        />
    );
};
