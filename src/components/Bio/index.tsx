import styled from "@emotion/styled";

export const BioTitleStyle = styled.h3`
  font-weight: bold;
  font-size: 1.875rem;
  line-height: 2.25rem;
  position: relative;

  display: inline-block;

  span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% + 10px);
    height: 10px;
    background-color: #fce46f;
    z-index: -1;
  }
`;

import React from "react";

interface Props {
  title: string;
}

const BioTitle = ({ title }: Props) => {
  return (
    <BioTitleStyle>
      {title}
      <span />
    </BioTitleStyle>
  );
};

export default BioTitle;
