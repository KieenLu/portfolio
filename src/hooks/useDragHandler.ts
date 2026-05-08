import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";

import { BoundsType } from "@/components/DraggableWindow";
import { clamp, setBodyOverflow, WINDOW_CONFIG } from "@/components/DraggableWindow/helper";

import { useLerpLoop } from "./useLerpLoop";

let globalZIndex = 1;

interface UseDragHandlerOptions {
    windowRef: React.RefObject<HTMLDivElement>;
    containerRef?: React.RefObject<HTMLElement>;
    enabled?: boolean;
}

export function useDragHandler({ windowRef, containerRef, enabled = true }: UseDragHandlerOptions) {
    const [isDragging, setIsDragging] = useState(false);

    const zIndexRef = useRef(globalZIndex++);
    const dragOriginRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

    const { targetRef, currentRef, isDraggingRef, startLoop } = useLerpLoop(windowRef);

    const getBounds = useCallback((): BoundsType => {
        const winW = windowRef.current?.offsetWidth ?? 0;
        const winH = windowRef.current?.offsetHeight ?? 0;

        const containerLeft = containerRef?.current
            ? containerRef.current.getBoundingClientRect().left
            : 0;
        const containerHeight = containerRef?.current
            ? containerRef.current.offsetHeight
            : window.innerHeight;

        return {
            minX: -containerLeft,
            maxX: window.innerWidth - winW - containerLeft,
            minY: 0,
            maxY: containerHeight - winH,
        };
    }, [containerRef, windowRef]);

    const bringToFront = useCallback(() => {
        zIndexRef.current = ++globalZIndex;
        if (windowRef.current) {
            windowRef.current.style.zIndex = String(zIndexRef.current);
        }
    }, [windowRef]);

    const handlePointerDown = useCallback(
        (e: React.PointerEvent) => {
            if (!enabled) return;
            if ((e.target as HTMLElement).closest(".window-controls")) return;

            const target = e.currentTarget as HTMLElement;
            target.setPointerCapture(e.pointerId);

            bringToFront();
            setIsDragging(true);
            isDraggingRef.current = true;
            setBodyOverflow(true);

            const domX = currentRef.current.x;
            const domY = currentRef.current.y;

            targetRef.current = { x: domX, y: domY };

            dragOriginRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                startPosX: domX,
                startPosY: domY,
            };

            gsap.to(windowRef.current, {
                boxShadow: WINDOW_CONFIG.shadow.dragging,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
            });

            startLoop();
        },
        [enabled, bringToFront, isDraggingRef, currentRef, targetRef, startLoop, windowRef]
    );

    useEffect(() => {
        if (!isDragging) return;

        const resist = (raw: number, min: number, max: number) =>
            raw < min ? min + (raw - min) * 0.1 : raw > max ? max + (raw - max) * 0.1 : raw;

        const handlePointerMove = (e: PointerEvent) => {
            const { startX, startY, startPosX, startPosY } = dragOriginRef.current;
            const bounds = getBounds();

            targetRef.current = {
                x: resist(startPosX + (e.clientX - startX), bounds.minX, bounds.maxX),
                y: resist(startPosY + (e.clientY - startY), bounds.minY, bounds.maxY),
            };
        };

        const handlePointerUp = (e: PointerEvent) => {
            const target = e.currentTarget as HTMLElement;
            if (e.pointerId !== undefined) {
                try {
                    target.releasePointerCapture(e.pointerId);
                } catch (e) {}
            }

            isDraggingRef.current = false;
            setBodyOverflow(false);
            setIsDragging(false);

            gsap.to(windowRef.current, {
                boxShadow: WINDOW_CONFIG.shadow.resting,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
            });

            const bounds = getBounds();
            targetRef.current = {
                x: clamp(targetRef.current.x, bounds.minX, bounds.maxX),
                y: clamp(targetRef.current.y, bounds.minY, bounds.maxY),
            };

            startLoop();
        };

        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp);
        return () => {
            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging, getBounds, startLoop, isDraggingRef, targetRef, windowRef]);

    return { isDragging, handlePointerDown, zIndexRef, targetRef, currentRef };
}
