"use client";

import { useEffect, useState } from "react";

import { PATH } from "@/constants/path";

const getTime = () =>
    new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

const Footer = () => {
    const footerMenu = [
        { name: "Home", href: PATH.HOME },
        { name: "About", href: PATH.ABOUT_ME },
        // { name: "Work", href: PATH.WORK },
        // { name: "Experiments", href: PATH.EXPERIMENTS },
        // { name: "Contact", href: PATH.CONTACT },
    ];

    const [time, setTime] = useState("");

    useEffect(() => {
        setTime(getTime());

        let intervalId: ReturnType<typeof setInterval>;
        const msUntilNextSecond = 1000 - (Date.now() % 1000);
        const timeoutId = setTimeout(() => {
            setTime(getTime());
            intervalId = setInterval(() => setTime(getTime()), 1000);
        }, msUntilNextSecond);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <footer
            className="glossy-25 border-t border-base-300 py-10 font-medium"
            style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                transition: "background-color 0.3s, border-color 0.3s",
            }}
        >
            <div className="container flex max-w-screen-2xl flex-col gap-20 lg:w-10/12 lg:gap-80 items-end lg:pt-20 lg:pb-60">
                <nav
                    className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between"
                    aria-label="Footer Menu"
                >
                    <ul className="flex flex-col items-center gap-6 sm:flex-row">
                        {footerMenu.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className="py-2 lowercase transition-colors hover:text-gray-300 text-gray-400 duration-300"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="text-gray-300 text-center">
                Ho Chi Minh City, Vietnam Time:{" "}
                <span className="tabular-nums" suppressHydrationWarning>
                    {time}
                </span>
            </div>
        </footer>
    );
};

export default Footer;
