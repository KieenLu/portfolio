"use client";

import { forwardRef, useCallback, useEffect, useRef } from "react";

import { useDevice } from "@/hooks/useDevice";
import { useDragHandler } from "@/hooks/useDragHandler";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import { WindowHeader } from "./WindowHeader";

export interface PositionType {
    x: number;
    y: number;
}
export interface BoundsType {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

export interface DraggableWindowProps {
    title: string;
    children: React.ReactNode;
    isDrag?: boolean;
    initialPosition?: PositionType;
    className?: string;
    containerRef?: React.RefObject<HTMLElement>;
    onRevealComplete?: () => void;
    width?: string | number;
}

const BASE_WINDOW_CLASSES =
    "select-none bg-black/60 transition-colors duration-300 rounded border border-base-300 shadow-2xl overflow-hidden";

const DraggableWindow = forwardRef<HTMLDivElement, DraggableWindowProps>(
    (
        {
            title,
            children,
            isDrag = true,
            initialPosition = { x: 100, y: 100 },
            className = "",
            containerRef,
            onRevealComplete,
            width = "max-content",
        },
        forwardedRef
    ) => {
        const { device } = useDevice();

        const isDragEnabled = isDrag && device !== "mobile";

        const internalRef = useRef<HTMLDivElement>(null);

        const setRef = useCallback(
            (node: HTMLDivElement | null) => {
                internalRef.current = node;
                if (typeof forwardedRef === "function") forwardedRef(node);
                else if (forwardedRef) (forwardedRef as any).current = node;
            },
            [forwardedRef]
        );

        const { isDragging, handlePointerDown, zIndexRef, targetRef, currentRef } = useDragHandler({
            windowRef: internalRef,
            containerRef,
            enabled: isDragEnabled,
        });

        useScrollReveal(internalRef, onRevealComplete);

        const clampPosition = useCallback(
            (x: number, y: number) => {
                if (!containerRef?.current || !internalRef.current) return { x, y };

                const containerW = containerRef.current.offsetWidth;
                const windowW = internalRef.current.offsetWidth;
                const maxX = Math.max(0, containerW - windowW);
                const clampedX = Math.min(Math.max(0, x), maxX);
                const clampedY = Math.max(0, y);

                return { x: clampedX, y: clampedY };
            },
            [containerRef]
        );

        useEffect(() => {
            if (!isDrag) return;

            requestAnimationFrame(() => {
                const { x, y } = clampPosition(initialPosition.x, initialPosition.y);

                targetRef.current = { x, y };
                currentRef.current = { x, y };

                if (internalRef.current) {
                    internalRef.current.style.left = `${x}px`;
                    internalRef.current.style.top = `${y}px`;
                }
            });
        }, [isDrag, initialPosition.x, initialPosition.y, targetRef, currentRef, clampPosition]);

        useEffect(() => {
            if (!isDragEnabled || !containerRef?.current || !internalRef.current) return;

            const handleResize = () => {
                const currentX = currentRef.current.x;
                const currentY = currentRef.current.y;

                const { x: newX, y: newY } = clampPosition(currentX, currentY);

                if (newX !== currentX || newY !== currentY) {
                    currentRef.current = { x: newX, y: newY };
                    targetRef.current = { x: newX, y: newY };

                    internalRef.current.style.left = `${newX}px`;
                    internalRef.current.style.top = `${newY}px`;
                }
            };

            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(containerRef.current);
            window.addEventListener("resize", handleResize);

            return () => {
                resizeObserver.disconnect();
                window.removeEventListener("resize", handleResize);
            };
        }, [isDragEnabled, containerRef, currentRef, targetRef, clampPosition]);

        const commonStyle: React.CSSProperties = {
            width: width === "100%" ? "100%" : width,
            maxWidth: typeof width === "number" ? `${width}px` : width,
            minWidth: "200px",
        };

        return (
            <div
                ref={setRef}
                className={`${isDrag ? "absolute" : ""} ${BASE_WINDOW_CLASSES} ${isDragEnabled ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""} ${className}`}
                style={{
                    ...commonStyle,
                    left: isDrag ? 0 : undefined,
                    top: isDrag ? 0 : undefined,
                    zIndex: zIndexRef.current,
                    touchAction: isDragEnabled ? "none" : "auto",
                }}
            >
                <WindowHeader
                    title={title}
                    onPointerDown={isDragEnabled ? handlePointerDown : undefined}
                />
                <div className="text-gray-300 select-none">{children}</div>
            </div>
        );
    }
);

DraggableWindow.displayName = "DraggableWindow";
export default DraggableWindow;
