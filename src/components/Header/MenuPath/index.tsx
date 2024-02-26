import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { PATH } from "@/constants/path";

const MenuPath = () => {
  const pathname = usePathname();
  return (
    <ul className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      <li>
        <Link
          className={clsx(
            "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900",
          )}
          href={PATH.about}
        >
          <span
            className={clsx(
              "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
              pathname.includes("about") ? "translate-y-6" : "translate-y-8",
            )}
          />
          <span className="relative">About</span>
        </Link>
      </li>
      <span
        className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
        aria-hidden="true"
      >
        /
      </span>
      <li>
        <Link
          className={clsx(
            "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900",
          )}
          href={PATH.projects}
        >
          <span
            className={clsx(
              "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
              pathname.includes("projects") ? "translate-y-6" : "translate-y-8",
            )}
          />
          <span className="relative">Projects</span>
        </Link>
      </li>
    </ul>
  );
};

export default MenuPath;
