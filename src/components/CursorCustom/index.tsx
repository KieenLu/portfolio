"use client";

import gsap from "gsap";
import { useEffect } from "react";

const CursorCustom = () => {
  useEffect(() => {
    const cursor = document.getElementById("cursor-custom");
    const hovered = document.querySelectorAll(".hovered");

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, { x: clientX, y: clientY });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 3.5 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1 });
    };

    hovered.forEach((item) => {
      item.addEventListener("mouseenter", onMouseEnter);
      item.addEventListener("mouseleave", onMouseLeave);
    });

    document.addEventListener("mousemove", onMouseMove);
  }, []);
  return <div id="cursor-custom" className="cursor-custom" />;
};

export default CursorCustom;
