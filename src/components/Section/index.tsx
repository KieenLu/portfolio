import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay: number;
}

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => {
    return shouldForwardProp(prop) || prop === "transition";
  },
});

const Section = ({ children, delay = 0 }: Props) => (
  <StyledDiv
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: "0.8", delay: `${delay}` }}
    mb={24}
  >
    {children}
  </StyledDiv>
);

export default Section;
