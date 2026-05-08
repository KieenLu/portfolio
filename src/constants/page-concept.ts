import { PATH } from "./path";

interface PageConcept {
    color: string;
    backgroundRgb: string;
    baseGradientFrom: string;
    floatingCharactersConfig: {
        textColor: number;
        rimLightColor: number;
        shadowOpacity: number;
    };
    listCharacters: {
        char: string;
        position: { x: number; y: number; z: number };
        size: number;
        rotation: { x: number; y: number; z: number };
        mobilePosition: { x: number; y: number; z: number };
        mobileSize: number;
        tabletPosition: { x: number; y: number; z: number };
        tabletSize: number;
    }[];
    lightPointPosition: {
        topRightX: number;
        topRightY: number;
        topRightRadius: number;
        bottomLeftX: number;
        bottomLeftY: number;
        bottomLeftRadius: number;
    };
}

export const PAGE_CONCEPTS: Record<string, PageConcept> = {
    [PATH.HOME]: {
        color: "rgb(40, 176, 255, 1)",
        backgroundRgb: "64, 164, 223",
        baseGradientFrom: "#0a0f16",
        floatingCharactersConfig: {
            textColor: 0x808080,
            rimLightColor: 0x64a4df,
            shadowOpacity: 0.4,
        },
        listCharacters: [
            {
                char: "{",
                position: { x: -5.5, y: -2, z: 7 },
                size: 1.5,
                rotation: { x: -0.2, y: 1, z: 0.1 },
                tabletPosition: { x: -5, y: -6, z: 14 },
                tabletSize: 3.5,
                mobilePosition: { x: -7, y: -11, z: 20 },
                mobileSize: 5,
            },
            {
                char: "@",
                position: { x: -6.5, y: 3.2, z: 2 },
                size: 1.5,
                rotation: { x: -0.2, y: 0.1, z: 0.3 },
                tabletPosition: { x: -4, y: 4, z: 6 },
                tabletSize: 2.5,
                mobilePosition: { x: -10, y: 8, z: 5 },
                mobileSize: 4.5,
            },
            // {
            //     char: "$",
            //     position: { x: -5.2, y: 4.2, z: -0.5 },
            //     size: 1.3,
            //     rotation: { x: 0.2, y: -0.1, z: 0.1 },
            // },
            {
                char: "&",
                position: { x: 7.8, y: -2, z: 1 },
                size: 1.7,
                rotation: { x: -0.1, y: 0.2, z: -0.1 },
                tabletPosition: { x: 6, y: -4, z: 6 },
                tabletSize: 2.5,
                mobilePosition: { x: 8, y: -6, z: 12 },
                mobileSize: 5,
            },
            // {
            //     char: "#",
            //     position: { x: 7.4, y: -3, z: 0.1 },
            //     size: 1.5,
            //     rotation: { x: 0.5, y: -0.2, z: -0.2 },
            // },
            {
                char: "}",
                position: { x: 7.5, y: 2, z: 6 },
                size: 3,
                rotation: { x: 0, y: -0.3, z: 0.1 },
                tabletPosition: { x: 6, y: 7, z: 12 },
                tabletSize: 4,
                mobilePosition: { x: 7, y: 11, z: 20 },
                mobileSize: 6,
            },
        ],
        lightPointPosition: {
            topRightX: 0.85,
            topRightY: 0.15,
            bottomLeftX: 0.15,
            bottomLeftY: 0.85,
            topRightRadius: 0.55,
            bottomLeftRadius: 0.35,
        },
    },
    [PATH.ABOUT_ME]: {
        color: "rgb(227, 227, 18, 1)",
        backgroundRgb: "255, 255, 0",
        baseGradientFrom: "#0F0F03",
        floatingCharactersConfig: {
            textColor: 0x808080,
            rimLightColor: 0x333308,
            shadowOpacity: 0.4,
        },
        listCharacters: [
            {
                char: "(",
                position: { x: -5.5, y: 1, z: 7 },
                size: 1.5,
                rotation: { x: -0.2, y: 1, z: 0.1 },
                tabletPosition: { x: -5, y: 6, z: 14 },
                tabletSize: 3.5,
                mobilePosition: { x: -7, y: 6, z: 20 },
                mobileSize: 6,
            },
            {
                char: "~",
                position: { x: -6.5, y: -3.2, z: 2 },
                size: 1.5,
                rotation: { x: -0.2, y: 0.1, z: 0.3 },
                tabletPosition: { x: -4, y: -5, z: 6 },
                tabletSize: 3,
                mobilePosition: { x: -5, y: -6, z: 12 },
                mobileSize: 5,
            },
            // {
            //     char: "$",
            //     position: { x: -5.2, y: 4.2, z: -0.5 },
            //     size: 1.3,
            //     rotation: { x: 0.2, y: -0.1, z: 0.1 },
            // },
            {
                char: "!",
                position: { x: 7.8, y: 2, z: 1 },
                size: 1.7,
                rotation: { x: -0.1, y: 0.2, z: -0.1 },
                tabletPosition: { x: 6, y: 3, z: 6 },
                tabletSize: 3.5,
                mobilePosition: { x: 6, y: 3, z: 12 },
                mobileSize: 5,
            },
            // {
            //     char: "#",
            //     position: { x: 7.4, y: -3, z: 0.1 },
            //     size: 1.5,
            //     rotation: { x: 0.5, y: -0.2, z: -0.2 },
            // },
            {
                char: "]",
                position: { x: 7.5, y: -2, z: 6 },
                size: 2,
                rotation: { x: 0, y: -0.3, z: 0.1 },
                tabletPosition: { x: 5, y: -6, z: 12 },
                tabletSize: 3.5,
                mobilePosition: { x: 7, y: -5, z: 20 },
                mobileSize: 6,
            },
        ],
        lightPointPosition: {
            topRightX: 0.85,
            topRightY: 0.5,
            bottomLeftX: 0.15,
            bottomLeftY: 0.15,
            topRightRadius: 0.35,
            bottomLeftRadius: 0.25,
        },
    },
};
