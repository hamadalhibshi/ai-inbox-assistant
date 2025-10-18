import { Box, Typography, useTheme } from "@mui/material";
import "../../App.css";
import { images } from "../../constants";
import { useNavigate } from "react-router-dom";
import Tutorial from "./components/Tutorial";
import { AnimatedButton } from "../../components";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const navigateToChat = () => {
    navigate("/chat");
  };

  return (
    <Box>
      <Box
        sx={{
          height: 500,
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          px: { xs: 5 },
          textAlign: { xs: "center", md: "left" },
          bgcolor: theme.palette.mode === "dark" ? "#393939" : "#FFFEEF",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            fontSize={{ xs: 32, md: 60 }}
            fontWeight="bold"
            gutterBottom
          >
            AI Inbox Assistant
          </Typography>

          <Typography variant="body1" fontSize={{ xs: 16 }} gutterBottom>
            Simplify your emails, WhatsApp messages, SMS, and so much more!
          </Typography>

          <AnimatedButton
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: "#846CF4",
              px: 6,
              py: 2,
              fontSize: 16,
              borderRadius: 3,
              color: "white",
            }}
            onClick={navigateToChat}
          >
            Chat with AI
          </AnimatedButton>
        </Box>

        <Box
          component="img"
          src={images.heroLogo}
          alt="AI Chat Illustration"
          sx={{
            width: "100%",
            maxWidth: 500,
            borderRadius: 5,
          }}
        />
      </Box>

      <Tutorial />
    </Box>
  );
};

export default Home;
