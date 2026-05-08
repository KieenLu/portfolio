import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

import FaceboolIcon from "@/assets/icons/i-facebook.svg";
import GithubIcon from "@/assets/icons/i-github.svg";
import GmailIcon from "@/assets/icons/i-gmail.svg";
import LinkedinIcon from "@/assets/icons/i-linkedin.svg";
import { ImageAvatar_1, ImageAvatarHero } from "@/assets/images";
import { PATH } from "@/constants/path";
import { DeviceType } from "@/hooks/useDevice";

import BriefAboutContent from "./BriefAboutContent";
import DetailAboutContent from "./DetailAboutContent";

export type WindowKeys = "about-me" | "where-i-work" | "me" | "contact-me" | "hobbies";

export type LayoutItem = {
    offsetX: number;
    offsetY: number;
    maxWidth: number;
    alignX?: "left" | "right" | "center";
    paddingX?: number;
};

export type DeviceLayout = Record<WindowKeys, LayoutItem>;

export const LAYOUT_HOMEPAGE: Record<DeviceType, DeviceLayout> = {
    desktop: {
        "about-me": { offsetX: 0, offsetY: -520, maxWidth: 600, alignX: "center" },
        "where-i-work": { offsetX: -220, offsetY: -170, maxWidth: 400, alignX: "center" },
        me: { offsetX: -100, offsetY: 20, maxWidth: 360, alignX: "center" },
        "contact-me": { offsetX: 300, offsetY: 40, maxWidth: 300, alignX: "center" },
        hobbies: { offsetX: 240, offsetY: -80, maxWidth: 300, alignX: "center" },
    },
    tablet: {
        "about-me": { offsetX: 0, offsetY: 0, maxWidth: 500, alignX: "center" },
        me: { offsetX: 0, offsetY: 300, maxWidth: 320, alignX: "left" },
        "where-i-work": { offsetX: 0, offsetY: 680, maxWidth: 350, alignX: "right" },
        "contact-me": { offsetX: 0, offsetY: 820, maxWidth: 280, alignX: "right" },
        hobbies: { offsetX: 0, offsetY: 1040, maxWidth: 280, alignX: "right" },
    },
    mobile: {
        "about-me": { offsetX: 0, offsetY: 0, maxWidth: 340, alignX: "center" },
        me: { offsetX: 0, offsetY: 430, maxWidth: 280, alignX: "left" },
        "where-i-work": { offsetX: 0, offsetY: 760, maxWidth: 320, alignX: "left" },
        "contact-me": { offsetX: 0, offsetY: 890, maxWidth: 300, alignX: "left" },
        hobbies: { offsetX: 0, offsetY: 1100, maxWidth: 300, alignX: "left" },
    },
};

export const LAYOUT_ABOUT_ME: Record<DeviceType, DeviceLayout> = {
    desktop: {
        "about-me": { offsetX: 0, offsetY: -350, maxWidth: 800, alignX: "center" },
        me: { offsetX: 360, offsetY: 220, maxWidth: 360, alignX: "center" },
        "where-i-work": { offsetX: -220, offsetY: 310, maxWidth: 400, alignX: "center" },
        "contact-me": { offsetX: -50, offsetY: 430, maxWidth: 300, alignX: "center" },
        hobbies: { offsetX: -350, offsetY: 190, maxWidth: 300, alignX: "center" },
    },
    tablet: {
        "about-me": { offsetX: 0, offsetY: 0, maxWidth: 600, alignX: "center" },
        me: { offsetX: 0, offsetY: 500, maxWidth: 320, alignX: "right" },
        "where-i-work": { offsetX: 0, offsetY: 1030, maxWidth: 350, alignX: "left" },
        "contact-me": { offsetX: 0, offsetY: 1170, maxWidth: 280, alignX: "left" },
        hobbies: { offsetX: 0, offsetY: 1380, maxWidth: 280, alignX: "left" },
    },
    mobile: {
        "about-me": { offsetX: 0, offsetY: 0, maxWidth: 350, alignX: "center" },
        me: { offsetX: 0, offsetY: 860, maxWidth: 300, alignX: "right" },
        "where-i-work": { offsetX: 0, offsetY: 1310, maxWidth: 320, alignX: "right" },
        "contact-me": { offsetX: 0, offsetY: 1440, maxWidth: 300, alignX: "right" },
        hobbies: { offsetX: 0, offsetY: 1650, maxWidth: 300, alignX: "right" },
    },
};

export const CONCEPTS = {
    [PATH.HOME]: {
        layout: LAYOUT_HOMEPAGE,
        aboutMeContent: <BriefAboutContent />,
        imageAvt: ImageAvatarHero.src,
    },
    [PATH.ABOUT_ME]: {
        layout: LAYOUT_ABOUT_ME,
        aboutMeContent: <DetailAboutContent />,
        imageAvt: ImageAvatar_1.src,
    },
} as const;

export const CONTACT_ME_LIST = [
    {
        name: "LinkedIn",
        icon: LinkedinIcon,
        mIcon: FaLinkedin,
        link: "https://www.linkedin.com/in/ki%C3%AAn-l%C6%B0-184282178/",
    },
    {
        name: "GitHub",
        icon: GithubIcon,
        mIcon: FaGithub,
        link: "https://github.com/KieenLu",
    },
    {
        name: "Email",
        icon: GmailIcon,
        mIcon: FaEnvelope,
        link: "mailto:kienlu2000@gmail.com",
    },
    {
        name: "Facebook",
        icon: FaceboolIcon,
        mIcon: FaFacebook,
        link: "https://www.facebook.com/lu.kien.37",
    },
];

export const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

export const setBodyOverflow = (hidden: boolean) => {
    if (typeof document !== "undefined") {
        document.body.style.overflow = hidden ? "hidden" : "";
    }
};

export const WINDOW_CONFIG = {
    shadow: {
        resting: "0 10px 30px -10px rgba(0,0,0,0.5)",
        dragging: "0 30px 60px -15px rgba(0,0,0,0.7)",
    },
};
