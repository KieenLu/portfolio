import React from "react";

interface Props {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const TechSkillItem = ({ icon: Icon }: Props) => {
    return (
        <div className={`p-1 md:p-2 xl:p-4 flex items-center justify-center technical-skill `}>
            <Icon
                className="w-full h-full max-h-14 "
                style={{
                    aspectRatio: "3/1",
                }}
            />
        </div>
    );
};

export default TechSkillItem;
