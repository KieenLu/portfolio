"use client";

import { gsap } from "gsap";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef } from "react";

import { useFullscreen } from "@/hooks/useFullScreenMode";
import { usePageConcept } from "@/hooks/usePageConcept";
import { useLenisStore } from "@/store/Lenis";

import ButtonIcon from "../ButtonIcon";
import FloatingCharacters from "../FloatingCharacters";
import HamburgerButton from "../HamburgerButton";
import HeadingSection from "../HeadingSection";
import CloseIcon from "../Icons/CloseIcon";
import ExpandIcon from "../Icons/ExpandIcon";
import MinimizeIcon from "../Icons/MinimizeIcon";
import MinusIcon from "../Icons/MinusIcon";
import MobileMenu from "../MenuMobile";
import { NAVIGATION_ITEMS } from "./helper";

interface Props {
    children: ReactNode;
}

const Wrapper = ({ children }: Props) => {
    const mainRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const isMenuOpen = useRef(false);
    const pathname = usePathname();

    const { color } = usePageConcept();
    const { isFullScreen, toggleFullScreen } = useFullscreen();
    const setLenis = useLenisStore((s) => s.setLenis);

    const handleExitFullScreen = () => {
        if (isFullScreen) toggleFullScreen();
    };

    useEffect(() => {
        if (!menuRef.current) return;
        gsap.set(menuRef.current, { yPercent: -100, autoAlpha: 0 });
    }, []);

    useEffect(() => {
        if (!menuRef.current || !isMenuOpen.current) return;
        isMenuOpen.current = false;
        lenisRef.current?.start();
        gsap.to(menuRef.current, {
            yPercent: -100,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power3.inOut",
        });
    }, [pathname]);

    useEffect(() => {
        if (!mainRef.current || !contentRef.current) return;

        const lenis = new Lenis({
            wrapper: mainRef.current,
            content: contentRef.current,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
            autoResize: true,
        });

        const rafFn = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(rafFn);
        gsap.ticker.lagSmoothing(0);

        lenisRef.current = lenis;
        setLenis(lenis);

        lenis.scrollTo(0, { immediate: true });

        return () => {
            gsap.ticker.remove(rafFn);
            lenis.destroy();
            lenisRef.current = null;
            setLenis(null);
        };
    }, [pathname, setLenis]);

    const handleMenuToggle = useCallback((isOpen: boolean) => {
        if (!menuRef.current) return;
        isMenuOpen.current = isOpen;

        const items = menuRef.current.querySelectorAll(".menu-item");

        if (isOpen) {
            lenisRef.current?.stop();
            gsap.fromTo(
                menuRef.current,
                { yPercent: -100, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }
            );
            gsap.fromTo(
                items,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.07, delay: 0.25 }
            );
        } else {
            gsap.to(items, {
                opacity: 0,
                y: -12,
                duration: 0.2,
                stagger: 0.04,
                ease: "power2.in",
            });
            gsap.to(menuRef.current, {
                yPercent: -100,
                autoAlpha: 0,
                duration: 0.5,
                ease: "power3.inOut",
                delay: 0.15,
                onComplete: () => lenisRef.current?.start(),
            });
        }
    }, []);

    const label = NAVIGATION_ITEMS.find((item) => item.path === pathname)?.label;

    return (
        <div className="relative grid h-full grid-cols-1 md:grid-cols-[40px_1fr] grid-rows-[40px_1fr_40px] overflow-hidden rounded transition-all duration-700 p-2">
            <div className="hidden md:block border border-base-300" />

            <header className="glossy relative flex items-center justify-between border-t border-b border-r border-l md:border-l-0 border-base-300 p-3 z-[9997]">
                <MobileMenu menuRef={menuRef} pathname={pathname} />
                <HeadingSection title={label || "Home"} />

                <div className="hidden md:flex items-center gap-3">
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

                <div className="block md:hidden">
                    <HamburgerButton key={pathname} onToggle={handleMenuToggle} />
                </div>
            </header>

            <nav className="glossy hidden md:flex flex-col items-center justify-center gap-3 border-l border-r border-base-300">
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

            <main
                ref={mainRef}
                className="scrollbar-custom overflow-y-auto overflow-x-clip border-r border-l md:border-l-0 border-base-300 relative"
                style={{ "--scroll-color": color } as React.CSSProperties}
            >
                <div ref={contentRef} className="w-full min-h-full">
                    {children}
                </div>
            </main>

            <div className="hidden md:block border-l border-t border-b border-base-300" />
            <footer className="border-t border-b border-r border-l md:border-l-0 border-base-300" />
            <FloatingCharacters />
        </div>
    );
};

export default Wrapper;
