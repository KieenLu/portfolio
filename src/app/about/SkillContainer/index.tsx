import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

import HeadingCustom from "@/components/HeadingCustom";
import ScrollMotion from "@/components/ScrollMotion";
import Skill from "@/components/Skill";
import { LIST_SKILL } from "@/constants/skill";

const SkillContainer = () => {
  const skillRef = useRef(null);

  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  return (
    <div
      className="flex flex-col gap-12 justify-center pb-40 max-lg:pb-28 max-sm:pb-20 overflow-hidden"
      ref={skillRef}
    >
      <motion.div
        initial={{ x: "-300px" }}
        animate={isSkillRefInView ? { x: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="font-bold text-2xl"
      >
        <HeadingCustom as="h3" size="md">
          Skills
        </HeadingCustom>
      </motion.div>
      <motion.div
        initial={{ x: "-300px" }}
        animate={isSkillRefInView ? { x: 0 } : {}}
        className="flex gap-4 flex-wrap"
      >
        {LIST_SKILL.map((item, index) => (
          <Skill key={index} {...item} />
        ))}
      </motion.div>
      <ScrollMotion />
    </div>
  );
};

export default SkillContainer;
