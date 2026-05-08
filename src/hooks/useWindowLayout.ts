import React, { useCallback, useEffect, useRef, useState } from "react";

import { DeviceType } from "@/hooks/useDevice";

import { LayoutItem } from "../components/AboutMe/helper";

type Positions<T> = Record<keyof T, { x: number; y: number }>;

interface WindowLayoutResult<T> {
    positions: Positions<T> | null;
    containerHeight: number | null;
}

export function useWindowLayout<T extends Record<string, LayoutItem>>(
    containerRef: React.RefObject<HTMLElement>,
    layout: T,
    windowRefs: Partial<Record<keyof T, React.RefObject<HTMLElement>>>,
    device: DeviceType
): WindowLayoutResult<T> {
    const [positions, setPositions] = useState<Positions<T> | null>(null);
    const [containerHeight, setContainerHeight] = useState<number | null>(null);

    const layoutRef = useRef(layout);
    layoutRef.current = layout;

    const windowRefsRef = useRef(windowRefs);
    windowRefsRef.current = windowRefs;

    const compute = useCallback(() => {
        const container = containerRef.current;
        const w = container ? container.offsetWidth : 0;
        if (w === 0) return;

        const currentLayout = layoutRef.current;
        const currentWindowRefs = windowRefsRef.current;
        const isDesktop = device === "desktop";

        const startY = isDesktop ? window.innerHeight / 2 : 50;
        const PADDING_BOTTOM = 100;
        const GAP = 20;
        const placedWindows: { x: number; y: number; w: number; h: number }[] = [];

        const entries = Object.entries(currentLayout).map(([key, config]) => {
            const {
                offsetX,
                offsetY,
                maxWidth,
                alignX = "center",
                paddingX = 0,
            } = config as LayoutItem;

            const windowEl = currentWindowRefs[key as keyof T]?.current;
            const actualWidth = windowEl ? windowEl.offsetWidth : (maxWidth as number);
            const actualHeight = windowEl ? windowEl.offsetHeight : 0;

            let x = 0;
            switch (alignX) {
                case "left":
                    x = paddingX + offsetX;
                    break;
                case "right":
                    x = w - actualWidth - paddingX + offsetX;
                    break;
                case "center":
                default:
                    x = (w - actualWidth) / 2 + offsetX;
                    break;
            }

            x = Math.min(Math.max(0, x), Math.max(0, w - actualWidth));

            let finalY = startY + offsetY;

            if (device !== "desktop" && actualHeight > 0) {
                let isOverlapping = true;
                let safetyNet = 0;

                while (isOverlapping && safetyNet < 10) {
                    isOverlapping = false;
                    for (const placed of placedWindows) {
                        const overlapX =
                            x < placed.x + placed.w + GAP && x + actualWidth + GAP > placed.x;
                        const overlapY =
                            finalY < placed.y + placed.h + GAP &&
                            finalY + actualHeight + GAP > placed.y;

                        if (overlapX && overlapY) {
                            finalY = placed.y + placed.h + GAP;
                            isOverlapping = true;
                            break;
                        }
                    }
                    safetyNet++;
                }
            }

            if (device !== "desktop" && actualHeight > 0) {
                placedWindows.push({ x, y: finalY, w: actualWidth, h: actualHeight });
            }

            return { key, x, y: finalY, h: actualHeight };
        });

        const newPositions = Object.fromEntries(
            entries.map(({ key, x, y }) => [key, { x, y }])
        ) as Positions<T>;

        const newHeight = entries.reduce((maxH, { y, h }) => {
            return Math.max(maxH, y + h + PADDING_BOTTOM);
        }, 0);

        setPositions(newPositions);
        if (newHeight > 0) setContainerHeight(newHeight);
    }, [containerRef, device]);

    useEffect(() => {
        const rafId = requestAnimationFrame(compute);
        const observers: ResizeObserver[] = [];

        Object.values(windowRefsRef.current).forEach((ref) => {
            const el = (ref as React.RefObject<HTMLElement>)?.current;
            if (el) {
                const ro = new ResizeObserver(compute);
                ro.observe(el);
                observers.push(ro);
            }
        });

        if (containerRef.current) {
            const ro = new ResizeObserver(compute);
            ro.observe(containerRef.current);
            observers.push(ro);
        }

        window.addEventListener("resize", compute);
        return () => {
            cancelAnimationFrame(rafId);
            observers.forEach((ro) => ro.disconnect());
            window.removeEventListener("resize", compute);
        };
    }, [compute]);

    return { positions, containerHeight };
}
