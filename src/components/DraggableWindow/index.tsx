"use client";

import { forwardRef, useCallback, useEffect, useRef } from "react";

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
    maxWidth?: number;
    className?: string;
    containerRef?: React.RefObject<HTMLElement>;
    onRevealComplete?: () => void;
}

const BASE_CLASSES =
    "select-none bg-black/60 transition-colors duration-300 border rounded border border-base-300 shadow-2xl overflow-hidden";

const DraggableWindow = forwardRef<HTMLDivElement, DraggableWindowProps>(
    (
        {
            title,
            children,
            isDrag = true,
            initialPosition = { x: 100, y: 100 },
            maxWidth = 300,
            className = "",
            containerRef,
            onRevealComplete,
        },
        outerRef
    ) => {
        const windowRef = useRef<HTMLDivElement>(null);

        const setRef = useCallback(
            (el: HTMLDivElement | null) => {
                (windowRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                if (typeof outerRef === "function") outerRef(el);
                else if (outerRef) outerRef.current = el;
            },
            [outerRef]
        );

        const { isDragging, handleMouseDown, zIndexRef, targetRef, currentRef } = useDragHandler({
            windowRef,
            containerRef,
            enabled: isDrag,
        });

        useScrollReveal(windowRef, onRevealComplete);

        useEffect(() => {
            if (!isDrag) return;
            targetRef.current = { ...initialPosition };
            currentRef.current = { ...initialPosition };
            if (windowRef.current) {
                windowRef.current.style.left = `${initialPosition.x}px`;
                windowRef.current.style.top = `${initialPosition.y}px`;
            }
        }, [isDrag, initialPosition.x, initialPosition.y]);

        if (!isDrag) {
            return (
                <div
                    ref={setRef}
                    className={`${BASE_CLASSES} ${className}`}
                    style={{ maxWidth, width: "max-content", minWidth: maxWidth }}
                >
                    <WindowHeader title={title} />
                    <div className="p-3 text-gray-300">{children}</div>
                </div>
            );
        }

        return (
            <div
                ref={setRef}
                className={`absolute ${BASE_CLASSES} ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                } ${className}`}
                style={{
                    left: 0,
                    top: 0,
                    maxWidth,
                    width: "max-content",
                    minWidth: maxWidth,
                    height: "max-content",
                    zIndex: zIndexRef.current,
                }}
            >
                <WindowHeader title={title} onMouseDown={handleMouseDown} />
                <div className="p-3 text-gray-300 select-none">{children}</div>
            </div>
        );
    }
);

DraggableWindow.displayName = "DraggableWindow";
export default DraggableWindow;
