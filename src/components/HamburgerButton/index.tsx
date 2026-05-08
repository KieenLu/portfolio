"use client";

import { gsap } from "gsap";
import { useRef } from "react";

interface HamburgerButtonProps {
    onToggle?: (isOpen: boolean) => void;
    className?: string;
}

export default function HamburgerButton({ onToggle, className = "" }: HamburgerButtonProps) {
    const topRef = useRef<HTMLSpanElement>(null);
    const midRef = useRef<HTMLSpanElement>(null);
    const botRef = useRef<HTMLSpanElement>(null);

    const isOpenRef = useRef(false);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const handleClick = () => {
        const next = !isOpenRef.current;
        isOpenRef.current = next;

        tlRef.current?.kill();

        const tl = gsap.timeline();
        tlRef.current = tl;

        if (next) {
            tl.to(midRef.current, { scaleX: 0, opacity: 0, duration: 0.15, ease: "power2.in" })
                .to(topRef.current, { scaleX: 0.6, duration: 0.18, ease: "power2.inOut" }, "<")
                .to(botRef.current, { scaleX: 0.6, duration: 0.18, ease: "power2.inOut" }, "<")
                .to(topRef.current, { y: 8, duration: 0.2, ease: "power2.inOut" })
                .to(botRef.current, { y: -8, duration: 0.2, ease: "power2.inOut" }, "<")
                .to(topRef.current, { rotation: 45, scaleX: 1, duration: 0.25, ease: "expo.out" })
                .to(
                    botRef.current,
                    { rotation: -45, scaleX: 1, duration: 0.25, ease: "expo.out" },
                    "<"
                );
        } else {
            tl.to(topRef.current, { rotation: 0, scaleX: 0.6, duration: 0.2, ease: "power2.in" })
                .to(
                    botRef.current,
                    { rotation: 0, scaleX: 0.6, duration: 0.2, ease: "power2.in" },
                    "<"
                )
                .to(topRef.current, { y: 0, scaleX: 1, duration: 0.2, ease: "power2.out" })
                .to(botRef.current, { y: 0, scaleX: 1, duration: 0.2, ease: "power2.out" }, "<")
                .to(midRef.current, {
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.25,
                    ease: "back.out(2.5)",
                });
        }

        onToggle?.(next);
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Toggle menu"
            aria-expanded={isOpenRef.current}
            className={[
                "group relative flex flex-col items-center justify-center gap-[6px]",
                "transition-colors duration-200 cursor-pointer",
                className,
            ].join(" ")}
        >
            <span
                ref={topRef}
                className="block w-[22px] h-[2px] rounded-full bg-zinc-100 origin-center"
            />
            <span
                ref={midRef}
                className="block w-[22px] h-[2px] rounded-full bg-zinc-100 origin-center"
            />
            <span
                ref={botRef}
                className="block w-[22px] h-[2px] rounded-full bg-zinc-100 origin-center"
            />
        </button>
    );
}
