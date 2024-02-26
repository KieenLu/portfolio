"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import HeadingCustom from "@/components/HeadingCustom";
import ProjectItem from "@/components/ProjectItem";
import ScrollAnimate from "@/components/ScrollAnimate";
import { LIST_PROJECT } from "@/constants/projects";

const PortfolioPage = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <motion.div
      className="h-full"
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-[450vh] relative max-lg:h-full" ref={ref}>
        <div className="sticky top-0 z-10 flex overflow-hidden max-lg:overflow-visible h-screen max-lg:h-full justify-center items-center max-lg:static">
          <div className="relative z-10 max-w-screen-xl w-full m-auto flex-1 px-4 max-lg:mt-14 max-sm:mt-5">
            <HeadingCustom as="h1" size="lg">
              Projects
            </HeadingCustom>
            <ScrollAnimate />
            <div className="w-full">
              <motion.div
                style={{ x }}
                className="flex mt-10 gap-10 max-lg:grid max-lg:grid-cols-2 max-lg:!transform-none max-lg:my-10 max-sm:grid-cols-1"
              >
                {LIST_PROJECT.map((item, index) => (
                  <ProjectItem key={index} {...item} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
