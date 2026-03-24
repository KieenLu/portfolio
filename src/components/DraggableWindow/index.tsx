"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonIcon from "../ButtonIcon";
import CloseIcon from "../Icons/CloseIcon";
import ExpandIcon from "../Icons/ExpandIcon";
import MinusIcon from "../Icons/MinusIcon";

let globalZIndex = 1;

const LERP_FACTOR = 0.1;
const SIDEBAR_WIDTH = 70;
const OPACITY_DEFAULT = 0.2;
const OPACITY_ACTIVE = 1;
const SCALE_DEFAULT = 0.92;
const SCALE_ACTIVE = 1;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const DraggableWindow = ({
    title,
    children,
    initialPosition = { x: 100, y: 100 },
    width = 300,
    className = "",
    containerRef,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [zIndex, setZIndex] = useState(() => globalZIndex++);

    const windowRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

    const targetRef = useRef({ ...initialPosition });
    const currentRef = useRef({ ...initialPosition });

    const rafRef = useRef<number | null>(null);
    const isDraggingRef = useRef(false);

    const getBounds = useCallback(() => {
        if (!windowRef.current) {
            return {
                minX: SIDEBAR_WIDTH,
                minY: 0,
                maxX: window.innerWidth,
                maxY: window.innerHeight,
            };
        }
        const windowWidth = windowRef.current.offsetWidth;
        const windowHeight = windowRef.current.offsetHeight;

        if (!containerRef?.current) {
            return {
                minX: SIDEBAR_WIDTH,
                minY: 0,
                maxX: window.innerWidth - windowWidth,
                maxY: window.innerHeight - windowHeight,
            };
        }
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        return {
            minX: SIDEBAR_WIDTH,
            minY: 0,
            maxX: containerWidth - windowWidth - SIDEBAR_WIDTH,
            maxY: containerHeight - windowHeight,
        };
    }, [containerRef]);

    const startRafLoop = useCallback(() => {
        if (rafRef.current) return;

        const tick = () => {
            const target = targetRef.current;
            const current = currentRef.current;

            current.x = lerp(current.x, target.x, LERP_FACTOR);
            current.y = lerp(current.y, target.y, LERP_FACTOR);

            if (windowRef.current) {
                windowRef.current.style.left = `${current.x}px`;
                windowRef.current.style.top = `${current.y}px`;
            }

            const dist = Math.abs(current.x - target.x) + Math.abs(current.y - target.y);
            if (isDraggingRef.current || dist > 0.05) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                current.x = target.x;
                current.y = target.y;
                if (windowRef.current) {
                    windowRef.current.style.left = `${current.x}px`;
                    windowRef.current.style.top = `${current.y}px`;
                }
                rafRef.current = null;
            }
        };

        rafRef.current = requestAnimationFrame(tick);
    }, []);

    const stopRafLoop = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    const handleMouseDownDrag = useCallback(
        (e: React.MouseEvent) => {
            if ((e.target as HTMLElement).closest(".window-controls")) return;

            setZIndex(++globalZIndex);
            setIsDragging(true);
            isDraggingRef.current = true;

            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";

            dragRef.current = {
                startX: e.clientX,
                startY: e.clientY,
                startPosX: currentRef.current.x,
                startPosY: currentRef.current.y,
            };

            gsap.to(windowRef.current, {
                boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
            });

            startRafLoop();
        },
        [startRafLoop]
    );

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - dragRef.current.startX;
            const deltaY = e.clientY - dragRef.current.startY;

            const newX = dragRef.current.startPosX + deltaX;
            const newY = dragRef.current.startPosY + deltaY;

            const bounds = getBounds();
            let resistedX = newX;
            let resistedY = newY;

            if (newX < bounds.minX) {
                resistedX = bounds.minX + (newX - bounds.minX) * 0.1;
            } else if (newX > bounds.maxX) {
                resistedX = bounds.maxX + (newX - bounds.maxX) * 0.1;
            }
            if (newY < bounds.minY) {
                resistedY = bounds.minY + (newY - bounds.minY) * 0.1;
            } else if (newY > bounds.maxY) {
                resistedY = bounds.maxY + (newY - bounds.maxY) * 0.1;
            }

            targetRef.current = { x: resistedX, y: resistedY };
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            setIsDragging(false);

            gsap.to(windowRef.current, {
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
            });

            const bounds = getBounds();
            const cx = Math.max(bounds.minX, Math.min(targetRef.current.x, bounds.maxX));
            const cy = Math.max(bounds.minY, Math.min(targetRef.current.y, bounds.maxY));

            targetRef.current = { x: cx, y: cy };
            startRafLoop();
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, getBounds, stopRafLoop, startRafLoop]);

    // Mount: bắt đầu nhỏ + mờ
    useEffect(() => {
        const anim = gsap.fromTo(
            windowRef.current,
            { scale: SCALE_DEFAULT, opacity: 0 },
            {
                scale: SCALE_DEFAULT,
                opacity: OPACITY_DEFAULT,
                duration: 0.4,
                ease: "back.out(1.4)",
                delay: Math.random() * 0.2,
            }
        );
        return () => {
            anim.kill();
        };
    }, []);

    // Scroll: scale up + fade khi toàn bộ window vào viewport
    useEffect(() => {
        const el = windowRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(el, {
                            opacity: OPACITY_ACTIVE,
                            scale: SCALE_ACTIVE,
                            duration: 0.6,
                            ease: "back.out(1.4)",
                            overwrite: "auto",
                        });
                    } else {
                        gsap.to(el, {
                            opacity: OPACITY_DEFAULT,
                            scale: SCALE_DEFAULT,
                            duration: 0.4,
                            ease: "power2.in",
                            overwrite: "auto",
                        });
                    }
                });
            },
            { threshold: 0.7 }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        return () => {
            stopRafLoop();
        };
    }, [stopRafLoop]);

    const windowStyle = {
        left: `${initialPosition.x}px`,
        top: `${initialPosition.y}px`,
        width: `${width}px`,
        height: `max-content`,
        zIndex,
    };

    return (
        <div
            ref={windowRef}
            className={`absolute select-none bg-black border border-gray-700 rounded-lg shadow-2xl overflow-hidden ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
            } ${className}`}
            style={windowStyle}
        >
            <div
                onMouseDown={handleMouseDownDrag}
                className="bg-black border-b border-gray-700 px-4 py-2 flex items-center justify-between select-none transition-colors"
            >
                <span className="text-gray-300 font-mono text-sm font-bold">{title}</span>
                <div className="window-controls flex gap-2">
                    <ButtonIcon aria-label="Minimize window">
                        <MinusIcon />
                    </ButtonIcon>
                    <ButtonIcon aria-label="Enter fullscreen">
                        <ExpandIcon />
                    </ButtonIcon>
                    <ButtonIcon aria-label="Close window">
                        <CloseIcon />
                    </ButtonIcon>
                </div>
            </div>
            <div ref={contentRef} className="p-3 text-gray-300 select-none">
                {children}
            </div>
        </div>
    );
};

export default DraggableWindow;
