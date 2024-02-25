import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

import { TypeListProject } from "@/types/image";

const ProjectItemStyle = styled.div`
  .img-project {
    max-width: initial;
    object-fit: cover;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    transition: 0.4s;

    &:hover {
      transition: transform 0.4s;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  .tag-project {
    color: #ffe768;
  }
`;

const ProjectItem = ({ href, image, name, tags }: TypeListProject) => {
  const onGoProject = (href: string) => {
    if (!href) return;

    window.open(href, "_blank");
  };
  return (
    <ProjectItemStyle
      className={`h-full w-full flex items-start justify-start bg-gradient-to-r max-lg:block`}
    >
      <div className="flex flex-col gap-8 max-sm:gap-4 text-white">
        <h1 className="text-3xl font-bold max-sm:text-xl">{name}</h1>
        <div className="relative w-full h-56 md:w-full md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px] overflow-hidden ">
          <Image
            onClick={() => onGoProject(href)}
            className="img-project cursor-pointer"
            src={image.url}
            alt={image.alt}
            fill
          />
        </div>
        <div className="flex gap-2 flex-wrap tag-project">
          {tags.map((tag, index) => (
            <span
              className="text-lg font-bold max-sm:text-sm max-lg:text-base"
              key={index}
            >
              {tag},
            </span>
          ))}
        </div>
      </div>
    </ProjectItemStyle>
  );
};

export default ProjectItem;
