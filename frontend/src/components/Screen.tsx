import { Box } from "@mui/material";
import type { ReactNode } from "react";
import Footer from "./Footer";

interface ScreenType {
  children: ReactNode;
}

const Screen = ({ children }: ScreenType) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        mx: { xs: 2, md: 20 },
        mt: 10,
      }}
    >
      <Box sx={{ flex: 1 }}>{children}</Box>

      <Footer />
    </Box>
  );
};

export default Screen;
