import {
    ImageProjectBenoit,
    ImageProjectCFDCourse,
    ImageProjectShopper,
    ImageProjectWooder,
} from "@/assets/images";

export const PROJECTS = [
    {
        index: 1,
        title: "Shopper E-commerce",
        year: "2025",
        tags: [
            "Next.js",
            "Typescript",
            "AntDesign",
            "TailWindCSS",
            "Axios",
            "Redux",
            "TanStack Query",
        ],
        imageSrc: ImageProjectShopper.src,
        href: "https://shopper-next.vercel.app/",
    },
    {
        index: 2,
        title: "CFD Course",
        year: "2025",
        tags: ["React", "AntDesign", "TailWindCSS", "Axios", "Redux"],
        imageSrc: ImageProjectCFDCourse.src,
        href: "https://courses-cfd.vercel.app/",
    },
    {
        index: 3,
        title: "Benoit Landing Page",
        year: "2025",
        tags: ["HTML", "CSS", "SCSS", "Grunt", "Figma"],
        imageSrc: ImageProjectBenoit.src,
        href: "https://kieenlu.github.io/Benoit/",
    },
    {
        index: 4,
        title: "Wooder Landing Page",
        year: "2025",
        tags: ["HTML", "CSS", "SCSS", "Grunt", "Figma"],
        imageSrc: ImageProjectWooder.src,
        href: "https://kieenlu.github.io/Wooder/",
    },
];
