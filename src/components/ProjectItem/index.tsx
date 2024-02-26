import styled from "@emotion/styled";
import Image from "next/image";

import { TypeListProject } from "@/types/image";

const ProjectItemStyle = styled.div`
  @keyframes animateTitle {
    0% {
      transform: translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg)
        rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    }
    100% {
      transform: translate3d(0px, -100%, 0px) scale3d(1, 1, 1) rotateX(0deg)
        rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    }
  }
  &:hover {
    .img-project {
      transition: transform 0.4s;
      transform: translate(-50%, -50%) scale(1.1);
    }

    .flex-pixel {
      h2 {
        animation: animateTitle 0.4s;
        transform-style: preserve-3d;
      }
    }
  }

  .img-project {
    max-width: initial;
    object-fit: cover;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    transition: 0.4s;
  }

  .tag-project {
    color: #ffe768;
  }

  .flex-pixel {
    display: flex;
    overflow: hidden;
    flex-direction: column;

    h2 {
      display: flex;
      margin-top: 0px;
      margin-bottom: 0px;
      justify-content: space-between;
      align-items: center;
      text-transform: capitalize;

      color: rgb(255, 255, 255);
      transform-style: preserve-3d;
    }
  }
`;

const ProjectItem = ({ href, image, name, tags }: TypeListProject) => {
  const onGoProject = (href: string) => {
    if (!href) return;

    window.open(href, "_blank");
  };
  return (
    <ProjectItemStyle
      className={`h-full w-full flex items-start justify-start bg-gradient-to-r max-lg:block aaaaaaaa`}
    >
      <div className="flex flex-col gap-8 max-sm:gap-4 text-white">
        <div className="flex-pixel h-9 max-sm:h-7">
          <h2 className="text-3xl font-bold max-sm:text-xl">{name}</h2>
          <h2 className="text-3xl font-bold max-sm:text-xl">{name}</h2>
        </div>
        <div className="relative w-full h-56 md:w-full md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[360px] overflow-hidden ">
          <Image
            onClick={() => onGoProject(href)}
            className="img-project cursor-pointer"
            src={image.url}
            alt={image.alt}
            loading="lazy"
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
