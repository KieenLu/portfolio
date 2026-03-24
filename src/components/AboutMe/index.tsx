"use client";

import React, { useRef } from "react";
import DraggableWindow from "../DraggableWindow";
import { ImageAvatarHero } from "@/assets/images";
import ContactMe from "./ContactMe";
import LinkedinIcon from "@/assets/icons/i-linkedin.svg";
import GithubIcon from "@/assets/icons/i-github.svg";

const AboutMe = () => {
    const containerRef = useRef(null);
    return (
        <div ref={containerRef} className="w-full  h-screen bg-gradient-to-br relative">
            <DraggableWindow
                containerRef={containerRef}
                title="about-me"
                initialPosition={{ x: 120, y: 10 }}
                width={600}
            >
                <div className="font-mono text-sm leading-relaxed">
                    <div className="mb-3">
                        <span className="text-white-500">1. </span>
                        Nice to meet you! My name is{" "}
                        <span className="text-green-400">Lu Trung Kien</span>, a{" "}
                        <span className="text-yellow-400">Web Developer</span> passionate about
                        building modern web experiences.
                    </div>

                    <div className="mb-3">
                        <span className="text-white-500">2. </span>I'm specialized in{" "}
                        <span className="text-blue-400">React</span>,{" "}
                        <span className="text-cyan-400">Next.js</span>, and{" "}
                        <span className="text-purple-400">UI animations</span>, focusing on creating{" "}
                        <span className="text-green-400">fast</span>,{" "}
                        <span className="text-green-400">smooth</span>, and{" "}
                        <span className="text-green-400">engaging</span> user interfaces.
                    </div>

                    <div className="mb-3">
                        <span className="text-white-500">3. </span>
                        With experiences in both <span className="text-yellow-400">
                            frontend
                        </span>{" "}
                        and <span className="text-red-400">backend</span>, I can collaborate
                        effectively and contribute to building{" "}
                        <span className="text-blue-400">scalable products</span>.
                    </div>

                    <div className="mb-3">
                        <span className="text-white-500">4. </span>
                        Coding for me is more than a job — I enjoy{" "}
                        <span className="text-purple-400">experimenting</span> with new
                        technologies,{" "}
                        <span className="text-yellow-400">optimizing performance</span>, and turning
                        complex ideas into <span className="text-green-400">modular solutions</span>
                        .
                    </div>
                </div>
            </DraggableWindow>

            <DraggableWindow
                containerRef={containerRef}
                title="where-i-work"
                initialPosition={{ x: 600, y: 350 }}
                width={400}
            >
                <div className="font-mono text-sm leading-relaxed">
                    <div className="mb-3">
                        <span className="text-white-500">1. </span>Base: Ho Chi Minh City,
                        Vietnamese.
                    </div>
                    <div className="mb-3">
                        <span className="text-white-500">2. </span>Available for full-time/remote
                        work
                    </div>
                </div>
            </DraggableWindow>

            <DraggableWindow
                containerRef={containerRef}
                title="hobbies"
                initialPosition={{ x: 1100, y: 460 }}
            >
                <div className="font-mono text-sm leading-relaxed">
                    <div className="mb-3">
                        <span className="text-white-500">1. </span>
                        🎮 Gaming
                    </div>
                    <div className="mb-3">
                        <span className="text-white-500">2. </span>💪🏼 Calisthenics
                    </div>
                </div>
            </DraggableWindow>

            <DraggableWindow
                containerRef={containerRef}
                title="me"
                initialPosition={{ x: 220, y: 340 }}
            >
                <div className={`font-mono text-sm leading-relaxed bg-slate-700`}>
                    <img src={ImageAvatarHero.src} alt="avatar-me" draggable="false" />
                </div>
            </DraggableWindow>

            <DraggableWindow
                containerRef={containerRef}
                title="contact-me"
                initialPosition={{ x: 980, y: 180 }}
            >
                <div className="font-mono text-sm leading-relaxed">
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/ki%C3%AAn-l%C6%B0-184282178/"
                        className="mb-3 flex items-center gap-2 w-[max-content] hover:cursor-pointer hover:color-main transition-colors"
                    >
                        <span className="text-white-500">1. Linkedin</span>

                        <div className="w-6 h-6 p-1 bg-white rounded-full group-hover:scale-110 transition-transform duration-200">
                            <LinkedinIcon className="w-full h-full" />
                        </div>
                    </a>

                    <a
                        target="_blank"
                        href="https://github.com/KieenLu"
                        className="mb-3 flex items-center gap-2 w-[max-content] hover:cursor-pointer hover:color-main transition-colors"
                    >
                        <span className="text-white-500">2. Github</span>
                        <div className="w-6 h-6 p-1 bg-white rounded-full">
                            <GithubIcon className="w-full h-full" />
                        </div>
                    </a>
                </div>
            </DraggableWindow>
        </div>
    );
};

export default AboutMe;
