"use client";

import gsap from "gsap";
import { useRef } from "react";

import IconAntd from "@/assets/icons/i-ant-design.svg";
import IconAxios from "@/assets/icons/i-axios.svg";
import IconCss from "@/assets/icons/i-css.svg";
import IconFigma from "@/assets/icons/i-figma.svg";
import IconFlutter from "@/assets/icons/i-flutter.svg";
import IconGsap from "@/assets/icons/i-gsap.svg";
import IconHTML from "@/assets/icons/i-html5.svg";
import IconJavaScript from "@/assets/icons/i-js.svg";
import IconMaterialUI from "@/assets/icons/i-materialui.svg";
import IconNestJs from "@/assets/icons/i-nestjs.svg";
import IconNextJs from "@/assets/icons/i-nextjs.svg";
import IconReact from "@/assets/icons/i-react.svg";
import IconRedux from "@/assets/icons/i-redux.svg";
import IconSass from "@/assets/icons/i-sass.svg";
import IconTailwind from "@/assets/icons/i-tailwind.svg";
import IconTanStack from "@/assets/icons/i-tanstack.svg";
import IconTypeScript from "@/assets/icons/i-typescript.svg";
import IconZustand from "@/assets/icons/i-zustand.svg";
import DraggableWindow from "@/components/DraggableWindow";
import TechSkillItem from "@/components/TechSkillItem";
import TitleSection from "@/components/TitleSection";
import { usePageConcept } from "@/hooks/usePageConcept";

type SvgIcon = React.FC<React.SVGProps<SVGSVGElement>>;
type Variant = "core" | "interactive" | "exploring";

interface TechItem {
    icon: SvgIcon;
    variant?: Variant;
}

const TECH_LIST: TechItem[] = [
    { icon: IconReact },
    { icon: IconNextJs },
    { icon: IconTypeScript },
    { icon: IconJavaScript },
    { icon: IconNestJs },
    { icon: IconFlutter },
    { icon: IconTailwind },
    { icon: IconSass },
    { icon: IconCss },
    { icon: IconHTML },
    { icon: IconMaterialUI },
    { icon: IconAntd },
    { icon: IconRedux },
    { icon: IconTanStack },
    { icon: IconZustand },
    { icon: IconGsap },
    { icon: IconAxios },
    { icon: IconFigma },
];

const TechnicalBanner = () => {
    const itemsRef = useRef<HTMLDivElement[]>([]);

    const { color } = usePageConcept();
    console.log("🚀 >> TechnicalBanner >> color:", color);

    const handleRevealComplete = () => {
        const items = itemsRef.current.filter(Boolean);
        if (!items.length) return;

        gsap.set(items, { opacity: 0, y: 20, scale: 0.65 });

        gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.06,
        });
    };

    return (
        <div className="container flex items-center justify-center">
            <div className="pt-60 pb-96">
                <TitleSection classname="mb-56" title="Some of the **techs** I like to work with" />

                <div
                    className="relative before:content-[''] before:h-[165px] before:absolute before:w-[1px] before:left-[50%] before:top-[-165px] before:bg-gradient-to-t from-[#e3e40d] to-transparent
                
                 after:content-[''] after:h-[165px] after:absolute after:w-[1px] after:left-[50%] after:bottom-[-165px] after:bg-gradient-to-t after:rotate-180
                "
                >
                    <DraggableWindow
                        maxWidth={1200}
                        title="techs"
                        isDrag={false}
                        onRevealComplete={handleRevealComplete}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
                                {TECH_LIST.map(({ icon }, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer"
                                        style={{ opacity: 0 }}
                                        ref={(el) => {
                                            if (el) itemsRef.current[index] = el;
                                        }}
                                    >
                                        <TechSkillItem icon={icon} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DraggableWindow>
                </div>
            </div>
        </div>
    );
};

export default TechnicalBanner;
