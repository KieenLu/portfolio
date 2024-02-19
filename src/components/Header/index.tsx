"use client";

import clsx from "clsx";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";

import Container from "../Container";
import MenuLogo from "./MenuLogo";
import MenuPath from "./MenuPath";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <nav aria-label="Main navigation">
        <ul className="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 mt-4 md:flex-row md:items-center md:rounded-xl">
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
              "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
              open ? "translate-x-0" : "translate-x-[100%]",
            )}
          >
            <button
              aria-label="Close menu"
              aria-expanded={open}
              className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden "
              onClick={() => setOpen(false)}
            >
              <MdClose />
            </button>
          </div>
          <MenuPath />
        </ul>
      </nav>
    </Container>
  );
}
