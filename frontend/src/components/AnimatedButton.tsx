import {
  Button,
  type ButtonProps,
  type SxProps,
  type Theme,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  divStyle?: React.CSSProperties;
}

const AnimatedButton = ({
  children,
  sx,
  divStyle,
  ...buttonProps
}: AnimatedButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: "inline-block",
        ...divStyle,
      }}
    >
      <Button sx={sx} {...buttonProps}>
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
