import { Spinner } from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";

interface DogContainerProps {
  children: ReactNode;
}

export const DogSpinner = () => <Spinner size="xl" width={200} height={200} />;

export const DogContainer = forwardRef<HTMLDivElement, DogContainerProps>(
  ({ children }, ref) => (
    <div
      ref={ref}
      className="voxel-dog"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  ),
);
