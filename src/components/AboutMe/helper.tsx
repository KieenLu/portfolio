import FaceboolIcon from "@/assets/icons/i-facebook.svg";
import GithubIcon from "@/assets/icons/i-github.svg";
import GmailIcon from "@/assets/icons/i-gmail.svg";
import LinkedinIcon from "@/assets/icons/i-linkedin.svg";
import { ImageAvatar_1, ImageAvatarHero } from "@/assets/images";
import { PATH } from "@/constants/path";

import BriefAboutContent from "./BriefAboutContent";
import DetailAboutContent from "./DetailAboutContent";

export const LAYOUT_HOMEPAGE = {
    "about-me": { offsetX: 0, offsetY: -44, maxWidth: 600 },
    "where-i-work": { offsetX: -15, offsetY: -14, maxWidth: 400 },
    me: { offsetX: -7.5, offsetY: 0, maxWidth: 360 },
    "contact-me": { offsetX: 30, offsetY: 0.5, maxWidth: 300 },
    hobbies: { offsetX: 20, offsetY: -10, maxWidth: 300 },
} as const;

export const LAYOUT_ABOUT_ME = {
    "about-me": { offsetX: 0, offsetY: -44, maxWidth: 800 },
    me: { offsetX: 25, offsetY: 2, maxWidth: 360 },
    "where-i-work": { offsetX: -15, offsetY: 10, maxWidth: 400 },
    "contact-me": { offsetX: -5, offsetY: 20, maxWidth: 300 },
    hobbies: { offsetX: -25, offsetY: 0, maxWidth: 300 },
} as const;

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
        link: "https://www.linkedin.com/in/ki%C3%AAn-l%C6%B0-184282178/",
    },
    {
        name: "GitHub",
        icon: GithubIcon,
        link: "https://github.com/KieenLu",
    },
    {
        name: "Email",
        icon: GmailIcon,
        link: "mailto:kienlu2000@gmail.com",
    },
    {
        name: "Facebook",
        icon: FaceboolIcon,
        link: "https://www.facebook.com/kienlu2000",
    },
];
