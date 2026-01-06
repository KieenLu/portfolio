import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

const ButtonIcon = ({ active, children, href, onClick }: Props) => {
  const router = useRouter();

  const onNavigate = () => {
    if (!href) return;
    router.push(href);
  };
  return (
    <button
      onClick={onClick ? onClick : onNavigate}
      className={clsx("transition hover:text-neutral", {
        active: active,
      })}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
