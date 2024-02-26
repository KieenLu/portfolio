"use client";

import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

import { ImageAvatar_1 } from "@/assets/images";
import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import HeadingCustom from "@/components/HeadingCustom";
import ScrollMotion from "@/components/ScrollMotion";
import { LIST_AVATAR } from "@/constants/about";

import animateFade from "./animate";
import Contact from "./Contact";
import Experience from "./Experience";
import SkillContainer from "./SkillContainer";

const cvLink = "./cv.pdf";

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const [indexImg, setIndexImg] = useState<number>(0);

  const getIndexFromScrollY = (scrollYValue: number) => {
    if (scrollYValue >= 1200) {
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
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
      >
        <div
          className="h-full overflow-y-scroll-scroll lg:flex max-lg:flex gap-40 max-lg:gap-20 mt-40 max-lg:mt-28 max-md:mt-14 max-sm:mt-5"
          ref={containerRef}
        >
          <div className="w-4/6 max-sm:w-full max-lg:w-3/5">
            <div className="hidden max-sm:block mb-5">
              <Avatar image={ImageAvatar_1.src} />
            </div>
            <div className="flex flex-col gap-12 justify-center pb-40 max-lg:pb-28 max-sm:pb-20">
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

              <div className="flex justify-end">
                <a
                  download={"Frontend_Developer_LuTrungKien.pdf"}
                  href={cvLink}
                  className={clsx(
                    "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50  px-4 py-2 font-bold transition-transform ease-out  hover:scale-105",
                  )}
                >
                  <span
                    className={clsx(
                      "absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                    )}
                  />
                  <span className="relative flex items-center justify-center gap-2 text-black">
                    View CV
                    <MdArrowOutward className="inline-block" />
                  </span>
                </a>
              </div>

              <ScrollMotion />
            </div>
            <SkillContainer />

            <Experience />

            <Contact />
          </div>
          <div className="w-2/6 max-lg:w-2/5 sticky top-20 pt-0 h-max max-sm:hidden">
            <AnimatePresence>
              {LIST_AVATAR.map((item) => (
                <motion.div
                  initial="hidden"
                  variants={animateFade(0.3)}
                  animate={{ translateX: -100 }}
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
