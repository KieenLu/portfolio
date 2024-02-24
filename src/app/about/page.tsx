"use client";

import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  ImageProjectBenoit,
  ImageProjectShopper,
  ImageProjectWooder,
} from "@/assets/images";
import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import HeadingCustom from "@/components/HeadingCustom";
import ScrollMotion from "@/components/ScrollMotion";

import animateFade from "./animate";
import Contact from "./Contact";
import Experience from "./Experience";
import SkillContainer from "./SkillContainer";

const LIST_IMG = [
  {
    img: ImageProjectShopper.src,
    key: 0,
  },
  {
    img: ImageProjectBenoit.src,
    key: 1,
  },
  {
    img: ImageProjectWooder.src,
    key: 2,
  },
];

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const [indexImg, setIndexImg] = useState<number>(0);

  const getIndexFromScrollY = (scrollYValue: number) => {
    if (scrollYValue >= 1000) {
      return 2;
    } else if (scrollYValue >= 600) {
      return 1;
    } else {
      return 0;
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIndexImg(getIndexFromScrollY(latest));
  });

  return (
    <Bounded ref={containerRef}>
      <motion.div
        className="h-full"
        initial={{ y: "-200vh" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
      >
        <div
          className="h-full overflow-y-scroll-scroll lg:flex gap-40 mt-40"
          ref={containerRef}
        >
          <div className="w-4/6 max-sm:w-full">
            <div className="flex flex-col gap-12 justify-center pb-40">
              <HeadingCustom as="h1" size="lg">
                About me
              </HeadingCustom>
              <p className="text-lg">
                Seeking for an entry-level position within a growing company
                where I can learn new things, technologies, and skills to
                accomplish any task that company assigns to me or I would have
                chance to work with. My goal is to become a professional
                front-end developer and have extensive knowledge in the future
              </p>

              <ScrollMotion />
            </div>
            <SkillContainer />

            <Experience />

            <Contact />
          </div>
          <div className="w-2/6 max-sm:w-full sticky top-20 pt-0 h-max">
            <AnimatePresence>
              {LIST_IMG.map((item) => (
                <motion.div
                  initial="hidden"
                  variants={animateFade(0.3)}
                  animate={{ translateX: 200 }}
                  whileInView={indexImg === item.key ? "show" : "hidden"}
                  key={item.key}
                  className={clsx("absolute top-0 left-0")}
                >
                  <Avatar image={item.img} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Bounded>
  );
};

export default AboutPage;
