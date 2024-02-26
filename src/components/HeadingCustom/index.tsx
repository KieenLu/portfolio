import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h5";
  size?: "xl" | "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
};

export default function HeadingCustom({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  const textSizeClasses = {
    xl: "text-5xl md:text-7xl",
    lg: "text-4xl md:text-5xl",
    md: "text-3xl md:text-4xl",
    sm: "text-2xl md:text-3xl",
  };

  return (
    <Comp
      className={clsx(
        "font-bold leading-tight tracking-tight text-white uppercase",
        textSizeClasses[size],
        className,
      )}
    >
      {children}
    </Comp>
  );
}
