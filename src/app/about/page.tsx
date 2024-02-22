"use client";

import Link from "next/link";

import BioTitle from "@/components/Bio";
import Bounded from "@/components/Bounded";
import Paragraph from "@/components/Paragraph";
import Section from "@/components/Section";
import { LIST_ABOUT } from "@/constants/about";
import { LIST_CONTACT_ME } from "@/constants/contact";

import Biography from "./Biography";

const AboutPage = () => {
  return (
    <Bounded>
      <Section delay={0.2}>
        <Biography />
      </Section>

      <Section delay={0.2}>
        <BioTitle title="Bio" />
        <div className="mt-4 max-sm:mt-2">
          {LIST_ABOUT.map(({ detail, time }, index) => (
            <div key={index} className="flex text-xl items-center">
              <span className="font-bold w-3/12 max-sm:w-3/12 max-sm:text-lg">
                {time}
              </span>
              <Paragraph>{detail}</Paragraph>
            </div>
          ))}
        </div>
      </Section>

      <Section delay={0.3}>
        <BioTitle title="I ♥" />
        <div className="mt-4 max-sm:mt-2">
          <Paragraph>Art, Music, Playing Drums, Games</Paragraph>
        </div>
      </Section>

      <Section delay={0.3}>
        <BioTitle title="Contact" />

        <div className="flex flex-col mt-4 gap-4">
          {LIST_CONTACT_ME.map(({ name, href, icon }, index) => (
            <Link
              className="inline-flex items-center transition-all duration-150 hover:text-yellow-400 w-max"
              key={index}
              href={href}
              target="_blank"
            >
              <div className="mr-4">{icon}</div>
              <p>{name}</p>
            </Link>
          ))}
        </div>
      </Section>
    </Bounded>
  );
};

export default AboutPage;
