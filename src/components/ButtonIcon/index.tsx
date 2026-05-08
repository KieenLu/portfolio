"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
    children: React.ReactNode;
    active?: boolean;
    href?: string;
    label?: string;
    isNavigateItem?: boolean;
    onClick?: () => void;
}

const ButtonIcon = ({ active, children, href, onClick, label }: Props) => {
    const router = useRouter();

    const onNavigate = () => {
        if (!href) return;
        router.push(href);
    };

    return (
        <div className="relative flex items-center group">
            <button
                onClick={onClick ? onClick : onNavigate}
                className={clsx("transition hover:text-neutral", {
                    active: active,
                })}
            >
                {children}
            </button>

            {label && (
                <div
                    className="
            absolute left-full ml-5
            px-2 py-1
            text-xs rounded-md
            leading-none
            bg-white text-black
            whitespace-nowrap
            shadow-md
            lowercase
            opacity-0 translate-x-[-8px]
            pointer-events-none
            
            [@media(hover:hover)]:group-hover:opacity-100 
            [@media(hover:hover)]:group-hover:translate-x-0
            transition-all duration-500 ease-out
        "
                >
                    {label}

                    <div
                        className="
                absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full
                w-0 h-0
                border-t-[6px] border-t-transparent
                border-b-[6px] border-b-transparent
                border-r-[6px] border-r-white
            "
                    />
                </div>
            )}
        </div>
    );
};

export default ButtonIcon;
