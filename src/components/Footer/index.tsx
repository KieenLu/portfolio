"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

import Bounded from "@/components/Bounded";
import { LIST_CONTACT_ME } from "@/constants/contact";
import { LIST_MENU } from "@/constants/menu";

export default function Footer() {
  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto max-md:mt-0 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-250 hover:text-yellow-400"
          >
            Kieenlu
          </Link>
          <span
            className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
            aria-hidden={true}
          >
            /
          </span>
          <p className=" text-sm text-slate-300 ">
            © {new Date().getFullYear()} Lu Trung Kien
          </p>
        </div>
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {LIST_MENU.map(({ link, name }, index) => (
              <React.Fragment key={index}>
                <li>
                  <Link
                    href={link}
                    className={clsx(
                      "group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-250 hover:hover:text-yellow-400",
                    )}
                  >
                    {name}
                  </Link>
                </li>
                {index < LIST_MENU.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-[0] text-slate-400"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {LIST_CONTACT_ME.map(({ href, icon }, index) => (
            <Link
              href={href}
              key={index}
              className="p-2 text-2xl text-slate-300 transition-all duration-250 hover:scale-125 hover:text-yellow-400"
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </Bounded>
  );
}
