import { Box, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import Footer from "./Footer";

interface ScreenType {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const Screen = ({ children, sx }: ScreenType) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "90vh",
        mx: { xs: 2, md: 20 },
        mt: 10,
        ...sx,
      }}
    >
      <Box sx={{ flex: 1 }}>{children}</Box>

      <Footer />
    </Box>
  );
};

export default Screen;
