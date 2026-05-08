import React from "react";

import { CONTACT_ME_LIST } from "../helper";

export const MeContent = ({ concept }: any) => (
    <div className=" bg-slate-700">
        <img
            src={concept.imageAvt}
            alt="avatar"
            className="pointer-events-none w-full select-none object-cover"
            draggable="false"
        />
    </div>
);

export const AboutContent = ({ concept }: any) => (
    <div
        className="p-3
       
    "
    >
        {concept.aboutMeContent}
    </div>
);

export const HobbiesContent = () => (
    <div className="font-mono text-base leading-relaxed p-3 w-[240px]">
        <div className="mb-3">
            <span className="text-gray-300">1. </span>🎮 Gaming
        </div>
        <div>
            <span className="text-gray-300">2. </span>💪🏼 Calisthenics
        </div>
    </div>
);

export const WorkContent = () => (
    <div className="font-mono text-base leading-relaxed p-3">
        <div className="mb-3">
            <span className="text-gray-300">1. </span>Base: Ho Chi Minh City, VN.
        </div>
        <div>
            <span className="text-gray-300">2. </span>Remote / Full-time.
        </div>
    </div>
);

export const ContactContent = ({ themeColor }: { themeColor: string }) => (
    <div
        className="font-mono text-base leading-relaxed p-3"
        style={{ "--hover-color": themeColor } as React.CSSProperties}
    >
        {CONTACT_ME_LIST.map((item, index) => (
            <a
                key={item.name}
                target="_blank"
                href={item.link}
                rel="noopener noreferrer"
                className="group mb-3 flex w-max items-center gap-4 last:mb-0"
            >
                <span className="text-gray-300 duration-300 group-hover:[color:var(--hover-color)]">
                    {index + 1}. {item.name}
                </span>
                {item.icon && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white p-1">
                        <item.icon className="h-full w-full text-black" />
                    </div>
                )}
            </a>
        ))}
    </div>
);
