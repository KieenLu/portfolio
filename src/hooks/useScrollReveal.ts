import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(
    windowRef: React.RefObject<HTMLDivElement>,
    onComplete?: () => void
) {
    useEffect(() => {
        const el = windowRef.current;
        if (!el) return;

        const mainElement = el.closest("main");
        if (!mainElement) return;

        gsap.set(el, { opacity: 0, scale: 0.85, y: 40, transformOrigin: "center center" });

        const trigger = ScrollTrigger.create({
            trigger: el,
            scroller: mainElement,
            start: "top 90%",
            once: true,
            toggleActions: "play none none reverse",
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

        return () => trigger.kill();
    }, [windowRef, onComplete]);
}
