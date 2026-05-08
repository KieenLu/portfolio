import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

import { useLenisStore } from "@/store/Lenis";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function useScrollReveal(
    windowRef: React.RefObject<HTMLDivElement | null>,
    onComplete?: () => void
) {
    const lenis = useLenisStore((state) => state.lenis);

    useEffect(() => {
        const el = windowRef.current;

        if (!el || !lenis) return;

        const scrollerElement = lenis.options.wrapper as HTMLElement;

        const ctx = gsap.context(() => {
            gsap.set(el, { opacity: 0, scale: 0.85, y: 40, transformOrigin: "center center" });

            ScrollTrigger.create({
                trigger: el,
                scroller: scrollerElement,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    let triggered = false;

                    gsap.to(el, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1.4,
                        ease: "expo.out",
                        onUpdate: function () {
                            if (!triggered && this.progress() >= 0.3) {
                                triggered = true;
                                onComplete?.();
                            }
                        },
                    });
                },
            });
        }, el);

        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
        };
    }, [windowRef, lenis, onComplete]);
}
