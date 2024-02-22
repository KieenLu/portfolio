import Bounded from "@/components/Bounded";
import HeadingCustom from "@/components/HeadingCustom";
import { LIST_EXPERIENCE } from "@/constants/experience";

const Experience = () => {
  return (
    <Bounded>
      <HeadingCustom as="h2" size="lg">
        Experience
      </HeadingCustom>
      {LIST_EXPERIENCE.map(({ company, describe, time }, index) => (
        <div key={index} className="ml-6 mt-8 max-w-prose md:ml-12">
          <div className="flex gap-2 items-end">
            <div className="text-4xl">{company}</div>
            <div className="mt-1 flex w-fit items-center gap-1 text-xl font-semibold tracking-tight text-slate-400">
              (<span>{time}</span>)
            </div>
          </div>
          <div className="prose prose-lg prose-invert mt-4 ml-2">
            {describe}
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
