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
        ".border-base-300": {
          borderColor: "oklch(40.5398% 0 0 / 1)",
        },
        ".color-main": {
          color: "rgba(40, 176, 255, 1)",
        },
        ".text-main": {
          color: "#ffffff",
          fontWeight: "500",
        },
        ".text-primary": {
          color: "oklch(0.8 0 0 / 1)",
          fontSize: "16px",
          fontWeight: "400",
        },
      });
    }),
  ],
};
export default config;
