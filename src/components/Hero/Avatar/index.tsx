import styled from "@emotion/styled";
import React from "react";

const AvatarHeroStyle = styled.div`
  grid-column-start: 3;
  transition: transform 0.5s ease;

  img {
    object-fit: cover;
    transition: transform 0.4s;

    &:hover {
      animation: scaleImage 0.4s ease forwards;
    }

    /* Animation outside of hover state */
    animation: rotateImage 4s infinite;
    transform-origin: center center;
  }

  @keyframes rotateImage {
    0%,
    100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-5deg);
    }
    75% {
      transform: rotate(5deg);
    }
  }

  @keyframes scaleImage {
    to {
      transform: scale(1.1) rotate(0deg);
    }
  }
`;
import { ImageAvatarHero } from "@/assets/images";

const AvatarHero = () => {
  return (
    <AvatarHeroStyle className="col-start-3 flex items-center justify-center overflow-hidden">
      <img className="" src={ImageAvatarHero.src} alt="avatar" />
    </AvatarHeroStyle>
  );
};

export default AvatarHero;
