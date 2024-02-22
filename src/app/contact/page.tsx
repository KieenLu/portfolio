import React from "react";

import Bounded from "@/components/Bounded";
import HeadingCustom from "@/components/HeadingCustom";

const ContactPage = () => {
  return (
    <div className="py-16">
      <Bounded>
        <HeadingCustom size="xl" className="mb-8 max-sm:mb-4">
          Contact
        </HeadingCustom>
        <div className="prose prose-xl prose-invert mb-10">
          A selection of some of my favorite website and design projects.
        </div>
      </Bounded>
    </div>
  );
};

export default ContactPage;
