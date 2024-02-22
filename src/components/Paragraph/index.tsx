import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Paragraph = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        "prose prose-xl max-sm:prose-base prose-slate prose-invert col-start-1",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Paragraph;
