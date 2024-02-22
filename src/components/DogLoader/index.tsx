import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { forwardRef, ReactNode } from "react";

const DogContainerStyle = styled.div`
  margin: auto;
  margin-top: -120px;
  margin-bottom: -200px;
  width: 640px;
  height: 640px;
  position: relative;

  @media (max-width: 991px) {
    margin-top: -60px;
    margin-bottom: -140px;
    width: 480px;
    height: 480px;
  }

  @media (max-width: 767px) {
    margin-top: -20px;
    margin-bottom: -40px;
    width: 280px;
    height: 280px;
  }
`;

interface DogContainerProps {
  children: ReactNode;
}
export const DogSpinner = () => (
  <Spinner
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
    width={["5px", "10px", "20px"]}
    height={["5px", "10px", "20px"]}
  />
);

export const DogContainer = forwardRef<HTMLDivElement, DogContainerProps>(
  ({ children }, ref) => (
    <DogContainerStyle ref={ref} className="voxel-dog">
      {children}
    </DogContainerStyle>
  ),
);

const Loader = () => {
  return (
    <DogContainer>
      <DogSpinner />
    </DogContainer>
  );
};

export default Loader;
