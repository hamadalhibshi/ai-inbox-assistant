import { Box, Button, Typography } from "@mui/material";
import "../../App.css";
import { images } from "../../constants";
import { useNavigate } from "react-router-dom";
import Tutorial from "./components/Tutorial";

const Home = () => {
  const navigate = useNavigate();

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
          bgcolor: "#FFFEEF",
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

          <Button
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: "#846CF4",
              px: 6,
              py: 2,
              fontSize: 16,
              borderRadius: 3,
            }}
            onClick={navigateToChat}
          >
            Chat with AI
          </Button>
        </Box>

        <Box
          component="img"
          src={images.heroLogo}
          alt="AI Chat Illustration"
          sx={{
            width: "100%",
            maxWidth: 500,
            mb: { xs: 5, md: 0 },
          }}
        />
      </Box>

      <Tutorial />
    </Box>
  );
};

export default Home;
