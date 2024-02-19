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
      className="text-xl font-extrabold tracking-tighter text-slate-900"
    >
      {name}
    </Link>
  );
};

export default MenuLogo;
