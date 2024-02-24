import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

import HeadingCustom from "@/components/HeadingCustom";

const Contact = () => {
  const contactRef = useRef(null);

  const isContactRefInView = useInView(contactRef, { margin: "-100px" });

  return (
    <div
      className="flex flex-col gap-12 justify-center pb-40 overflow-hidden"
      ref={contactRef}
    >
      <motion.div
        initial={{ x: "-300px" }}
        animate={isContactRefInView ? { x: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="font-bold text-2xl"
      >
        <HeadingCustom as="h3" size="md">
          Contact
        </HeadingCustom>
      </motion.div>
      <motion.div
        initial={{ x: "-300px" }}
        animate={isContactRefInView ? { x: 0 } : {}}
        className="flex gap-4 flex-wrap"
      >
        fasdfdasfs
      </motion.div>
    </div>
  );
};

export default Contact;
