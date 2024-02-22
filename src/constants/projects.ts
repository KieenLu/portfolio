import {
  ImageProjectBenoit,
  ImageProjectCFDCourse,
  ImageProjectShopper,
  ImageProjectWooder,
} from "@/assets/images";
import { TypeListProject } from "@/types/image";

export const LIST_PROJECT: TypeListProject[] = [
  {
    data: {
      name: "Shopper",
      href: "https://shopper-next.vercel.app/",
      tags: [
        "Next.js",
        "Typescript",
        "AntDesign",
        "TailWindCSS",
        "Axios",
        "Redux-Saga",
        "NextAuth",
        "...",
      ],
      image: {
        alt: "Image's Shopper eCommerce",
        url: ImageProjectShopper.src,
      },
    },
  },
  {
    data: {
      name: "CFD Course",
      href: "https://courses-cfd-kieenlu-livid.vercel.app/",
      tags: ["React", "AntDesign", "TailWindCSS", "Axios", "Redux", "..."],
      image: {
        alt: "Image's CDF Course",
        url: ImageProjectCFDCourse.src,
      },
    },
  },
  {
    data: {
      name: "Benoit",
      href: "https://kieenlu.github.io/Benoit/",
      tags: ["HTML", "CSS/SCSS", "Grunt"],
      image: {
        alt: "Image's Benoit Landing Page",
        url: ImageProjectBenoit.src,
      },
    },
  },

  {
    data: {
      name: "Wooder",
      href: "https://kieenlu.github.io/Wooder/",
      tags: ["HTML", "CSS/SCSS", "Grunt"],
      image: {
        alt: "Image's Wooder Landing Page",
        url: ImageProjectWooder.src,
      },
    },
  },
];
