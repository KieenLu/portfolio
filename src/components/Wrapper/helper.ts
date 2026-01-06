import { PATH } from "@/constants/path";

import HomeIcon from "../Icons/HomeIcon";
import ProjectIcon from "../Icons/ProjectIcon";
import UserIcon from "../Icons/UserIcon";

export const NAVIGATION_ITEMS = [
  { path: PATH.HOME, icon: HomeIcon, label: "Home" },
  { path: PATH.ABOUT_ME, icon: UserIcon, label: "About Me" },
  { path: PATH.PROJECT, icon: ProjectIcon, label: "Projects" },
] as const;
