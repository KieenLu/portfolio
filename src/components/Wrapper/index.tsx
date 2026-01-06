"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { useFullscreen } from "@/hooks/useFullScreenMode";

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
    const pathname = usePathname();
    const { isFullScreen, toggleFullScreen } = useFullscreen();

    const handleMinimize = () => {};

    const handleClose = () => {};

    return (
        <div className="relative grid h-full grid-cols-[40px_1fr] grid-rows-[40px_1fr_40px] overflow-hidden rounded border border-base-300 transition-all duration-7000">
            {/* Top Left Corner */}
            <div className="border-r border-b border-base-300" />

            {/* Top Navigation Bar */}
            <header className="glossy flex items-center justify-between border-b border-base-300 p-3">
                <HeadingSection title="Home" />

                <div className="flex items-center gap-3">
                    <ButtonIcon onClick={handleMinimize} aria-label="Minimize window">
                        <MinusIcon />
                    </ButtonIcon>
                    <ButtonIcon
                        onClick={toggleFullScreen}
                        aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                        {isFullScreen ? <MinimizeIcon /> : <ExpandIcon />}
                    </ButtonIcon>
                    <ButtonIcon onClick={handleClose} aria-label="Close window">
                        <CloseIcon />
                    </ButtonIcon>
                </div>
            </header>

            {/* Left Sidebar Navigation */}
            <nav className="glossy row-span-1 flex flex-col items-center justify-center gap-3 border-r border-base-300">
                {NAVIGATION_ITEMS.map(({ path, icon: Icon, label }) => (
                    <ButtonIcon
                        key={path}
                        href={path}
                        active={pathname === path}
                        aria-label={label}
                    >
                        <Icon />
                    </ButtonIcon>
                ))}
            </nav>

            {/* Main Content Area */}
            <main className="overflow-y-scroll">{children}</main>

            {/* Bottom Left Corner */}
            <div className="border-l border-t border-base-300" />

            {/* Bottom Navigation Bar */}
            <footer className="border-t border-base-300" />

            <FloatingCharacters />
        </div>
    );
};

export default Wrapper;
