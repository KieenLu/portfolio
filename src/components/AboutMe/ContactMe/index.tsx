import DraggableWindow from "@/components/DraggableWindow";
import React from "react";

import GithubIcon from "@/assets/icons/i-github.svg";
import LinkedinIcon from "@/assets/icons/i-linkedin.svg";

interface Props {
    containerRef: React.RefObject<HTMLDivElement>;
}

const ContactMe = ({ containerRef }: Props) => {
    return (
        <DraggableWindow
            containerRef={containerRef}
            title="contact-me"
            initialPosition={{ x: 680, y: 180 }}
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
    );
};

export default ContactMe;
