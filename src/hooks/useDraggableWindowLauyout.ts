import { useEffect, useState } from "react";
import React from "react";

type OffsetConfig = Record<string, { offsetX: number; offsetY: number; maxWidth: number }>;
type Positions<T extends OffsetConfig> = Record<keyof T, { x: number; y: number }>;

export function useWindowLayout<T extends OffsetConfig>(
    containerRef: React.RefObject<HTMLElement>,
    layout: T,
    windowRefs: Partial<Record<keyof T, React.RefObject<HTMLElement>>>
) {
    const [positions, setPositions] = useState<Positions<T> | null>(null);

    const compute = (): Positions<T> => {
        const container = containerRef.current;
        const w = container ? container.offsetWidth : window.innerWidth;
        const h = container ? container.offsetHeight : window.innerHeight;

        return Object.fromEntries(
            Object.entries(layout).map(([key, { offsetX, offsetY, maxWidth }]) => {
                const windowEl = windowRefs[key as keyof T]?.current;
                const actualWidth = windowEl ? windowEl.offsetWidth : maxWidth;

                return [
                    key,
                    {
                        x: w / 2 + (w * offsetX) / 100 - actualWidth / 2,
                        y: h / 2 + (h * offsetY) / 100,
                    },
                ];
            })
        ) as Positions<T>;
    };

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setPositions(compute());
        });

        const onResize = () => setPositions(compute());
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return positions;
}
