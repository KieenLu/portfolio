import { motion } from "framer-motion";
import React from "react";

const ScrollAnimate = () => {
  return (
    <div className="absolute right-0 -top-10 max-lg:hidden">
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        viewBox="0 0 300 300"
        className="w-64 h-64 md:w-[150px] md:h-[150px] "
      >
        <defs>
          <path
            id="circlePath"
            d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
          />
        </defs>
        <text fill="#6d6d6d">
          <textPath xlinkHref="#circlePath" className="text-xl">
            Scroll to view Scroll to view Scroll to view
          </textPath>
        </text>
      </motion.svg>
      <div className="w-16 h-16 md:w-12 md:h-12 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center text-xs">
        Scroll
      </div>
    </div>
  );
};

export default ScrollAnimate;
