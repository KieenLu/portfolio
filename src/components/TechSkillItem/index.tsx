import React from "react";

interface Props {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const TechSkillItem = ({ icon: Icon }: Props) => {
    return (
        <div
            className={`p-4 flex items-center justify-center rounded-lg `}
            style={{ aspectRatio: 300 / 150 }}
        >
            <Icon className="w-full h-full max-h-14" />
        </div>
    );
};

export default TechSkillItem;
