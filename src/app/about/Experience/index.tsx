import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

import HeadingCustom from "@/components/HeadingCustom";
import ScrollMotion from "@/components/ScrollMotion";

const Experience = () => {
  const experienceRef = useRef(null);

  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <div
      className="flex flex-col gap-12 justify-center pb-40 max-lg:pb-28 max-sm:pb-20 overflow-hidden"
      ref={experienceRef}
    >
      <motion.div
        initial={{ x: "-300px" }}
        animate={isExperienceRefInView ? { x: "0" } : {}}
        transition={{ delay: 0.2 }}
        className="font-bold text-2xl"
      >
        <HeadingCustom as="h3" size="md">
          Experience
        </HeadingCustom>
      </motion.div>
      <motion.div
        initial={{ x: "-300px" }}
        animate={isExperienceRefInView ? { x: "0" } : {}}
        className=""
      >
        <div className="flex justify-between h-48">
          <div className="w-1/3 ">
            <div className="bg-white p-3 font-semibold rounded-lg text-black">
              Frontend Developer
            </div>
            <div className="p-3 text-sm italic">
              I working web development, offering expertise in React frameworks.
            </div>
            <div className="p-3 text-red-400 text-sm font-semibold">
              04/2023 - Present
            </div>
            <div className="p-2 rounded bg-white text-sm font-semibold w-fit text-black">
              Atech Solution
            </div>
          </div>
          <div className="w-1/6 flex justify-center">
            <div className="w-1 h-full bg-gray-600 rounded relative">
              <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
            </div>
          </div>
          <div className="w-1/3 "></div>
        </div>
        <div className="flex justify-between h-48">
          <div className="w-1/3 "></div>
          <div className="w-1/6 flex justify-center">
            <div className="w-1 h-full bg-gray-600 rounded relative">
              <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
            </div>
          </div>
          <div className="w-1/3 ">
            <div className="bg-white p-3 font-semibold rounded-lg text-black">
              Freelancer
            </div>
            <div className="p-3 text-sm italic">
              I provided web solutions, applying a range of technologies to
              address client requirements.
            </div>
            <div className="p-3 text-red-400 text-sm font-semibold">
              11/2022 - 04/2023
            </div>
          </div>
        </div>
        <div className="flex justify-between h-48">
          <div className="w-1/3 ">
            <div className="bg-white p-3 font-semibold rounded-lg text-black">
              Graduated from CTUT - Can Tho University of Technology
            </div>
            <div className="p-3 text-sm italic">
              Completed the study program at CTUT - Can Tho University of
              Technology
            </div>
            <div className="p-3 text-red-400 text-sm font-semibold">
              2022 - 2024
            </div>
          </div>
          <div className="w-1/6 flex justify-center">
            <div className="w-1 h-full bg-gray-600 rounded relative">
              <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
            </div>
          </div>
          <div className="w-1/3 "></div>
        </div>
        <div className="flex justify-between h-48">
          <div className="w-1/3 "></div>
          <div className="w-1/6 flex justify-center">
            <div className="w-1 h-full bg-gray-600 rounded relative">
              <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
              <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2 -bottom-5"></div>
            </div>
          </div>
          <div className="w-1/3 ">
            <div className="bg-white p-3 font-semibold rounded-lg text-black">
              TOEIC Certificate
            </div>
            <div className="p-3 text-sm italic">
              Completed TOEIC certificate with 515 scores.
            </div>
            <div className="p-3 text-red-400 text-sm font-semibold">2022</div>
          </div>
        </div>

        <div className="flex justify-between h-48">
          <div className="w-1/3 ">
            <div className="bg-white p-3 font-semibold rounded-lg text-black">
              Born in Ca Mau, Vietnamese
            </div>

            <div className="p-3 text-red-400 text-sm font-semibold">
              25/11/2000
            </div>
          </div>

          <div className="w-1/3 "></div>
        </div>
      </motion.div>
      <ScrollMotion />
    </div>
  );
};

export default Experience;
