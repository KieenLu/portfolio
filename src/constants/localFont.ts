import localFont from "next/font/local";

export const bowByOneFont = localFont({
    src: [
        {
            path: "../../public/fonts/BowlbyOneSC-Regular.ttf",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-bow-by-one",
});
