"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { PATH } from "@/constants/path";
import { useDevice } from "@/hooks/useDevice";
import { usePageConcept } from "@/hooks/usePageConcept";
import { useWindowLayout } from "@/hooks/useWindowLayout";

import ButtonHover from "../ButtonHover";
import DraggableWindow from "../DraggableWindow";
import TitleSection from "../TitleSection";
import { CONCEPTS, WindowKeys } from "./helper";
import {
    AboutContent,
    ContactContent,
    HobbiesContent,
    MeContent,
    WorkContent,
} from "./WindowContent";

const WINDOW_KEYS: WindowKeys[] = ["me", "about-me", "hobbies", "where-i-work", "contact-me"];

const WINDOW_CONTENT_MAP: Record<WindowKeys, React.FC<any>> = {
    me: MeContent,
    "about-me": AboutContent,
    hobbies: HobbiesContent,
    "where-i-work": WorkContent,
    "contact-me": ContactContent,
};

const FULL_WIDTH_MAP: Record<WindowKeys, boolean> = {
    "about-me": true,
    "where-i-work": false,
    me: false,
    hobbies: false,
    "contact-me": false,
};

const AboutMe = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { device } = useDevice();
    const { color } = usePageConcept();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const isAboutMePage = pathname === PATH.ABOUT_ME;
    const isDesktop = device === "desktop";

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const windowRefs = useRef(
        WINDOW_KEYS.reduce(
            (acc, key) => {
                acc[key] = React.createRef<HTMLDivElement>();

                return acc;
            },

            {} as Record<WindowKeys, React.RefObject<HTMLDivElement>>
        )
    ).current;

    const currentConcept = useMemo(
        () => CONCEPTS[pathname as keyof typeof CONCEPTS] || CONCEPTS[PATH.ABOUT_ME],

        [pathname]
    );

    const renderLayouts = useMemo(() => currentConcept.layout[device], [currentConcept, device]);

    const { positions: pos, containerHeight } = useWindowLayout(
        isMounted ? containerRef : { current: null },
        renderLayouts,
        windowRefs,
        device
    );

    if (!isMounted) return null;

    const isReady = !!pos;

    return (
        <section className="container">
            {!isAboutMePage && <TitleSection title="About **me**" />}

            <div
                ref={containerRef}
                className="relative w-full transition-[height] duration-500 ease-in-out"
                style={{ height: containerHeight ?? "100vh" }}
            >
                <div
                    style={{
                        visibility: isReady ? "visible" : "hidden",
                        opacity: isReady ? 1 : 0,
                        transition: "opacity 0.7s ease-in-out",
                    }}
                >
                    {WINDOW_KEYS.map((key) => {
                        const layout = renderLayouts[key];
                        const windowWidth =
                            !isDesktop && FULL_WIDTH_MAP[key] ? "100%" : layout.maxWidth;
                        const ContentComponent = WINDOW_CONTENT_MAP[key];
                        return (
                            <DraggableWindow
                                key={`${pathname}-${key}-${device}`}
                                ref={windowRefs[key]}
                                containerRef={containerRef}
                                title={key}
                                initialPosition={pos?.[key] ?? { x: 0, y: 0 }}
                                width={windowWidth}
                            >
                                <ContentComponent concept={currentConcept} themeColor={color} />
                            </DraggableWindow>
                        );
                    })}
                </div>
            </div>

            {!isAboutMePage && (
                <div className="lg:mt-20 mt-0  text-center">
                    <ButtonHover href="/about-me" label="About me" />
                </div>
            )}
        </section>
    );
};

export default AboutMe;
