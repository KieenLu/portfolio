import "@/styles/globals.css";
import "@/styles/custom.css";

import clsx from "clsx";
import type { Metadata } from "next";
import localFont from "next/font/local";

import CreativeBackground from "@/components/CreativeBackground";
import PreloaderScreen from "@/components/PreloaderScreen";
import Wrapper from "@/components/Wrapper";

const ppNeueMachina = localFont({
    src: "../../public/fonts/PPNeueMachina-InktrapRegular.otf",
    display: "swap",
    variable: "--font-pp-neue-machina",
    fallback: [
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
    ],
});
export const metadata: Metadata = {
    title: "Portfolio's Killian",
    description: "Portfolio's Killian",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={clsx(ppNeueMachina.className, "relative h-dvh overflow-hidden")}>
                {/* <PreloaderScreen /> */}
                <CreativeBackground />

                <Wrapper>{children}</Wrapper>
            </body>
        </html>
    );
}
