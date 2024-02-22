import Link from "next/link";
import React from "react";

import { PATH } from "@/constants/path";

interface Props {
  name: string;
}

const MenuLogo = ({ name }: Props) => {
  return (
    <Link
      href={PATH.home}
      aria-label="Home page"
      className="text-2xl font-extrabold tracking-tighter text-slate-900 transition-all duration-150 hover:text-yellow-400"
    >
      {name}
    </Link>
  );
};

export default MenuLogo;
