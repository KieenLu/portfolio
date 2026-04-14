"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";

import { PATH } from "@/constants/path";
import { useWindowLayout } from "@/hooks/useDraggableWindowLauyout";
import { usePageConcept } from "@/hooks/usePageConcept";

import ButtonHover from "../ButtonHover";
import DraggableWindow from "../DraggableWindow";
import TitleSection from "../TitleSection";
import { CONCEPTS, CONTACT_ME_LIST, LAYOUT_ABOUT_ME } from "./helper";

const AboutMe = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const windowRefs = {
        "about-me": useRef<HTMLDivElement>(null),
        "where-i-work": useRef<HTMLDivElement>(null),
        me: useRef<HTMLDivElement>(null),
        "contact-me": useRef<HTMLDivElement>(null),
        hobbies: useRef<HTMLDivElement>(null),
    };

    const { color } = usePageConcept();

    const pathname = usePathname();
    const renderLayouts = CONCEPTS[pathname].layout ?? LAYOUT_ABOUT_ME;
    const pos = useWindowLayout(containerRef, renderLayouts, windowRefs);

    const isAboutMePage = pathname === PATH.ABOUT_ME;

    const ready = pos !== null;

    return (
        <section className="container pb-20">
            {!isAboutMePage && <TitleSection title="About **me**" />}
            <div ref={containerRef} className="w-full h-[1200px] bg-gradient-to-br relative">
                <div style={{ visibility: ready ? "visible" : "hidden" }}>
                    <DraggableWindow
                        ref={windowRefs["me"]}
                        containerRef={containerRef}
                        title="me"
                        initialPosition={pos?.["me"] ?? { x: 0, y: 0 }}
                        maxWidth={renderLayouts["me"].maxWidth}
                    >
                        <div className="bg-slate-700">
                            <img
                                src={CONCEPTS[pathname].imageAvt}
                                alt="avatar-me"
                                draggable="false"
                                className="w-full"
                            />
                        </div>
                    </DraggableWindow>
                    <DraggableWindow
                        ref={windowRefs["about-me"]}
                        containerRef={containerRef}
                        title="about-me"
                        initialPosition={pos?.["about-me"] ?? { x: 0, y: 0 }}
                        maxWidth={renderLayouts["about-me"].maxWidth}
                    >
                        {CONCEPTS[pathname].aboutMeContent}
                    </DraggableWindow>

                    <DraggableWindow
                        ref={windowRefs["hobbies"]}
                        containerRef={containerRef}
                        title="hobbies"
                        initialPosition={pos?.["hobbies"] ?? { x: 0, y: 0 }}
                        maxWidth={renderLayouts["hobbies"].maxWidth}
                    >
                        <div className="font-mono text-base leading-relaxed">
                            <div className="mb-3">
                                <span className="text-gray-500">1. </span>🎮 Gaming
                            </div>
                            <div className="mb-3">
                                <span className="text-gray-500">2. </span>💪🏼 Calisthenics
                            </div>
                        </div>
                    </DraggableWindow>

                    <DraggableWindow
                        ref={windowRefs["where-i-work"]}
                        containerRef={containerRef}
                        title="where-i-work"
                        initialPosition={pos?.["where-i-work"] ?? { x: 0, y: 0 }}
                        maxWidth={renderLayouts["where-i-work"].maxWidth}
                    >
                        <div className="font-mono text-base leading-relaxed">
                            <div className="mb-3">
                                <span className="text-gray-500">1. </span>
                                Base: Ho Chi Minh City, Vietnam.
                            </div>
                            <div className="mb-3">
                                <span className="text-gray-500">2. </span>
                                Available for full-time/remote work.
                            </div>
                        </div>
                    </DraggableWindow>

                    <DraggableWindow
                        ref={windowRefs["contact-me"]}
                        containerRef={containerRef}
                        title="contact-me"
                        initialPosition={pos?.["contact-me"] ?? { x: 0, y: 0 }}
                        maxWidth={renderLayouts["contact-me"].maxWidth}
                    >
                        <div
                            className="font-mono text-base leading-relaxed"
                            style={{ "--hover-color": color } as React.CSSProperties}
                        >
                            {CONTACT_ME_LIST.map((item) => (
                                <a
                                    key={item.name}
                                    target="_blank"
                                    href={item.link}
                                    className="mb-3 flex items-center gap-4 w-max hover:cursor-pointer transition-colors"
                                >
                                    <span
                                        className={`text-gray-300 hover:[color:var(--hover-color)] duration-300`}
                                    >
                                        {CONTACT_ME_LIST.indexOf(item) + 1}. {item.name}
                                    </span>
                                    {item.icon && (
                                        <div className="w-6 h-6 p-1 bg-white rounded-full">
                                            <item.icon className="w-full h-full" />
                                        </div>
                                    )}
                                </a>
                            ))}
                        </div>
                    </DraggableWindow>
                </div>
            </div>
            {!isAboutMePage && (
                <div className="text-center">
                    <ButtonHover href="/about-me" label="About me" />
                </div>
            )}
        </section>
    );
};

export default AboutMe;
