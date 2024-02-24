import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import HeadingCustom from "@/components/HeadingCustom";
import { LIST_CONTACT_ME } from "@/constants/contact";

const Contact = () => {
  const contactRef = useRef(null);

  const isContactRefInView = useInView(contactRef, { margin: "-100px" });

  const onNavigate = (key: string, href: string) => {
    if (key === "phone") return;

    if (key === "gmail") {
      window.location.href = `mailto:${href}`;
      return;
    }
    window.open(href, "_blank");
  };

  return (
    <div
      className="flex flex-col gap-12 justify-center pb-40 max-lg:pb-28 max-sm:pb-20 overflow-hidden"
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
        <div className="flex flex-col gap-5">
          {LIST_CONTACT_ME.map(({ href, icon, name, key }, index) => (
            <div
              onClick={() => onNavigate(key, href)}
              className="flex gap-3 transition-all duration-250 hover:text-yellow-400 cursor-pointer"
              key={index}
            >
              {icon}
              <span>{name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
