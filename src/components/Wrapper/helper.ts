import { PATH } from "@/constants/path";

import HomeIcon from "../Icons/HomeIcon";
import UserIcon from "../Icons/UserIcon";

export const NAVIGATION_ITEMS = [
    { path: PATH.HOME, icon: HomeIcon, label: "home" },
    { path: PATH.ABOUT_ME, icon: UserIcon, label: "about-me" },
    // { path: PATH.PROJECT, icon: ProjectIcon, label: "Projects" },
] as const;
