"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";

import { LIST_MENU_MOBILE } from "@/constants/menu";

import Bounded from "../Bounded";
import MenuLogo from "./MenuLogo";
import MenuPath from "./MenuPath";

export default function Header() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const onGoLink = (href: string) => {
    if (!href) return;

    setOpen(false);
    router.push(href);
  };

  return (
    <Bounded>
      <nav aria-label="Main navigation" className="max-sm:pb-12">
        <ul className="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:flex-row md:items-center md:rounded-xl !rounded-t-none max-sm:fixed max-sm:w-full max-sm:top-0 max-sm:left-0 z-50">
          <div className="flex items-center justify-between">
            <MenuLogo name="Kieenlu" />
            <button
              aria-expanded={open}
              aria-label="Open menu"
              className="block p-2 text-2xl text-slate-800 md:hidden"
              onClick={() => setOpen(true)}
            >
              <MdMenu />
            </button>
          </div>
          <div
            className={clsx(
              "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-black transition-transform duration-300 ease-in-out md:hidden ",
              open ? "translate-x-0" : "translate-x-[100%]",
            )}
          >
            <button
              aria-label="Close menu"
              aria-expanded={open}
              className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden "
              onClick={() => setOpen(false)}
            >
              <MdClose color="white" />
            </button>

            <ul className="h-screen w-screen flex items-center justify-center flex-col gap-2">
              {LIST_MENU_MOBILE.map(({ link, name, key }) => (
                <li key={key}>
                  <div
                    onClick={() => onGoLink(link)}
                    className="text-white uppercase text-xl font-bold"
                  >
                    {name}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <MenuPath />
        </ul>
      </nav>
    </Bounded>
  );
}
