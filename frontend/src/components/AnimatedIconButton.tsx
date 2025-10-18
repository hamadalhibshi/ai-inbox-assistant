import { IconButton, type IconButtonProps } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedIconButtonProps extends IconButtonProps {
  children: React.ReactNode;
}

const AnimatedIconButton = ({
  children,
  ...iconButtonProps
}: AnimatedIconButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: "inline-block",
      }}
    >
      <IconButton {...iconButtonProps}>{children}</IconButton>
    </motion.div>
  );
};

export default AnimatedIconButton;
