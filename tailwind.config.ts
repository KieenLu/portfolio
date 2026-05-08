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
            colors: {
                dynamic: "var(--hover-color)",
            },
            stroke: {
                icon: "oklch(40.5398% 0 0 / 1)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        plugin(function ({ addUtilities }) {
            addUtilities({
                //bg
                ".glossy": {
                    backgroundColor: "oklch(16.8416% 0 0/0.25)",
                },
                //text
                ".text-btn-hv": {
                    fontSize: "12px",
                    "@screen lg": {
                        fontSize: "16px",
                    },
                },
                ".text-title-section ": {
                    fontSize: "26px",
                    "@screen md": {
                        fontSize: "40px",
                    },
                    "@screen lg": {
                        fontSize: "48px",
                    },
                },
                ".text-base": {
                    fontSize: "13px",
                    "@screen md": {
                        fontSize: "14px",
                    },
                    "@screen lg": {
                        fontSize: "14px",
                    },
                    "@screen xl": {
                        fontSize: "16px",
                    },
                },
                ".anim-title": {
                    color: "white",
                    lineHeight: "1.5",
                    fontSize: "1.875rem",
                    "@screen sm": {
                        fontSize: "3rem",
                        lineHeight: "1",
                    },
                    "@screen md": {
                        fontSize: "3.75rem",
                        lineHeight: "1",
                    },
                    "@screen lg": {
                        fontSize: "4.5rem",
                        lineHeight: "1",
                    },
                    "@screen xl": { fontSize: "4.5rem", lineHeight: "1" },
                    "@screen 2xl": { fontSize: "6rem", lineHeight: "1" },
                },
                ".anim-sub": {
                    display: "inline-block",
                    willChange: "transform, opacity",
                },
                //layout
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
                ".technical-skill": {},
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
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    "@screen md": {
                        fontSize: "14px",
                    },
                    "@screen lg": {
                        fontSize: "16px",
                    },
                    "@screen xl": {
                        fontSize: "18px",
                    },
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
