"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

import { useFullscreen } from "@/hooks/useFullScreenMode";
import { usePageConcept } from "@/hooks/usePageConcept";

import ButtonIcon from "../ButtonIcon";
import FloatingCharacters from "../FloatingCharacters";
import HeadingSection from "../HeadingSection";
import CloseIcon from "../Icons/CloseIcon";
import ExpandIcon from "../Icons/ExpandIcon";
import MinimizeIcon from "../Icons/MinimizeIcon";
import MinusIcon from "../Icons/MinusIcon";
import { NAVIGATION_ITEMS } from "./helper";

interface Props {
    children: ReactNode;
}

const Wrapper = ({ children }: Props) => {
    const mainRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    const { color } = usePageConcept();

    const { isFullScreen, toggleFullScreen } = useFullscreen();

    useEffect(() => {
        if (!mainRef.current) return;
        const lenis = new Lenis({
            wrapper: mainRef.current,
            content: mainRef.current.firstElementChild as HTMLElement,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
        });
        let rafId: number;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    const handleExitFullScreen = () => {
        if (isFullScreen) {
            toggleFullScreen();
        }
    };

    return (
        <div className="relative grid h-full grid-cols-[40px_1fr] grid-rows-[40px_1fr_40px] overflow-hidden rounded transition-all duration-7000 p-2">
            {/* Top Left Corner */}
            <div className="border border-base-300" />

            {/* Top Navigation Bar */}
            <header className="glossy flex items-center justify-between border-b border-r border-t border-base-300 p-3">
                <HeadingSection title="Home" />

                <div className="flex items-center gap-3">
                    <ButtonIcon onClick={handleExitFullScreen} aria-label="Minimize window">
                        <MinusIcon />
                    </ButtonIcon>
                    <ButtonIcon
                        onClick={toggleFullScreen}
                        aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                        {isFullScreen ? <MinimizeIcon /> : <ExpandIcon />}
                    </ButtonIcon>
                    <ButtonIcon onClick={handleExitFullScreen} aria-label="Close window">
                        <CloseIcon />
                    </ButtonIcon>
                </div>
            </header>

            {/* Left Sidebar Navigation */}
            <nav className="glossy row-span-1 flex flex-col items-center justify-center gap-3 border-l border-r border-base-300">
                {NAVIGATION_ITEMS.map(({ path, icon: Icon, label }) => (
                    <ButtonIcon
                        key={path}
                        href={path}
                        active={pathname === path}
                        aria-label={label}
                        label={label}
                    >
                        <Icon />
                    </ButtonIcon>
                ))}
            </nav>

            {/* Main Content Area */}
            <main
                ref={mainRef}
                className="scrollbar-custom overflow-y-auto overflow-x-clip border-r border-base-300 relative"
                style={{ "--scroll-color": color } as React.CSSProperties}
            >
                {children}
            </main>

            {/* Bottom Left Corner */}
            <div className="border-l border-t border-b border-base-300" />

            {/* Bottom Navigation Bar */}
            <footer className="border-t border-base-300 border-b border-r" />

            <FloatingCharacters />
        </div>
    );
};

export default Wrapper;
