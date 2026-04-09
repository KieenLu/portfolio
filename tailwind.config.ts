import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            stroke: {
                icon: "oklch(40.5398% 0 0 / 1)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".glossy": {
                    backgroundColor: "oklch(16.8416% 0 0/0.25)",
                },
                ".container": {
                    width: "100%",
                    margin: "0 auto",
                    padding: "0 16px",
                    "@screen lg": {
                        maxWidth: "1280px",
                    },
                    "@screen xl": {
                        maxWidth: "1440px",
                    },
                },
                ".border-base-300": {
                    borderColor: "oklch(40.5398% 0 0 / 1)",
                },
                ".color-main": {
                    color: "rgba(40, 176, 255, 1)",
                },
                ".title-section": {
                    color: "#a3e635",
                    fontWeight: "500",
                },
                ".text-primary": {
                    color: "oklch(0.8 0 0 / 1)",
                    fontSize: "16px",
                    fontWeight: "400",
                },
                ".scrollbar-custom": {
                    scrollbarWidth: "thin",
                    scrollbarColor: "var(--scroll-color) transparent",

                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "var(--scroll-color)",
                        borderRadius: "999px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "color-mix(in srgb, var(--scroll-color) 80%, white)",
                    },
                },
                ".hover-button": {
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "2px",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                },
                ".hover-button:hover": {
                    borderColor: "var(--hover-color)",
                    boxShadow: `
                        0 0 10px var(--hover-color), 
                        0 0 20px color-mix(in srgb, var(--hover-color) 40%, transparent)
                    `,
                },
                ".tech-item-hidden": {
                    opacity: "0",
                    transform: `translateY(20px) scale(0.85)`,
                },
            });
        }),
    ],
};
export default config;
