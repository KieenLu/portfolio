import { useCallback, useEffect, useRef } from "react";

import { PositionType } from "@/components/DraggableWindow";
import { lerp, WINDOW_CONFIG } from "@/components/DraggableWindow/helper";

export function useLerpLoop(windowRef: React.RefObject<HTMLDivElement>) {
    const targetRef = useRef<PositionType>({ x: 0, y: 0 });
    const currentRef = useRef<PositionType>({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);
    const isDraggingRef = useRef(false);

    const startLoop = useCallback(() => {
        if (rafRef.current) return;

        const tick = () => {
            const { x: tx, y: ty } = targetRef.current;
            const cur = currentRef.current;

            cur.x = lerp(cur.x, tx, WINDOW_CONFIG.lerpFactor);
            cur.y = lerp(cur.y, ty, WINDOW_CONFIG.lerpFactor);

            if (windowRef.current) {
                windowRef.current.style.left = `${cur.x}px`;
                windowRef.current.style.top = `${cur.y}px`;
            }

            const dist = Math.abs(cur.x - tx) + Math.abs(cur.y - ty);
            const shouldContinue = isDraggingRef.current || dist > 0.05;

            if (shouldContinue) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                cur.x = tx;
                cur.y = ty;
                if (windowRef.current) {
                    windowRef.current.style.left = `${cur.x}px`;
                    windowRef.current.style.top = `${cur.y}px`;
                }
                rafRef.current = null;
            }
        };

        rafRef.current = requestAnimationFrame(tick);
    }, [windowRef]);

    const stopLoop = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    useEffect(() => () => stopLoop(), [stopLoop]);

    return { targetRef, currentRef, isDraggingRef, startLoop, stopLoop };
}
