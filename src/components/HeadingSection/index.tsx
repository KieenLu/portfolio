import React from "react";

interface Props {
    title: string;
}

const HeadingSection = ({ title }: Props) => {
    return <div className="text-primary !text-xs uppercase">{title}</div>;
};

export default HeadingSection;
