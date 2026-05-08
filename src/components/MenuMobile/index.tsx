"use client";

import Link from "next/link";
import { RefObject } from "react";

import { usePageConcept } from "@/hooks/usePageConcept";

import { CONTACT_ME_LIST } from "../AboutMe/helper";
import { NAVIGATION_ITEMS } from "../Wrapper/helper";

interface MobileMenuProps {
    menuRef: RefObject<HTMLDivElement>;
    pathname: string;
}

export default function MobileMenu({ menuRef, pathname }: MobileMenuProps) {
    const { color } = usePageConcept();
    return (
        <div className="md:hidden absolute top-[39px] left-0 w-full overflow-hidden pointer-events-none z-[9996]">
            <div
                ref={menuRef}
                className="w-full bg-black pointer-events-auto"
                style={{ height: "calc(100dvh - 96px)" }}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex-1 flex flex-col justify-center gap-6 px-4">
                        {NAVIGATION_ITEMS.map((item, index) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className="menu-item flex items-baseline gap-4 group"
                                >
                                    <span className="text-white font-mono text-xs">
                                        {String(index + 1).padStart(2, "0")}.
                                    </span>
                                    <span
                                        style={{ color: isActive ? color : "white" }}
                                        className="text-4xl font-bold tracking-tighter transition-colors"
                                    >
                                        {isActive && "/"}
                                        {item.label.toLowerCase()}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="menu-item space-y-6 px-4 pb-4">
                        <div className="flex gap-8 text-xl justify-end text-white">
                            {CONTACT_ME_LIST.map((item) => (
                                <Link target="_blank" href={item.link} key={item.name}>
                                    <item.mIcon className="hover:text-white cursor-pointer transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
