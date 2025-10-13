import { Box, Typography } from "@mui/material";
import { Screen } from "../../../components";

const Tutorial = () => {
  const data = [
    {
      id: 0,
      title: "Get Started Instantly",
      desc: "Open the AI Inbox Assistant from any device and start organizing your messages in seconds.",
    },
    {
      id: 1,
      title: "Paste Your Message or Email",
      desc: "Simply copy and paste your chat, email, or conversation into the chatbox — no formatting needed.",
    },
    {
      id: 2,
      title: "Let AI Handle the Rest",
      desc: "The AI Inbox Assistant will analyze, summarize, and structure your message automatically for you.",
    },
  ];

  return (
    <Screen>
      <Typography
        textAlign="center"
        variant="h5"
        fontWeight={800}
        gutterBottom
        fontSize={30}
      >
        Smarter Inbox. Less Effort.
      </Typography>
      <Typography textAlign="center" variant="body1" gutterBottom>
        Automate responses, organize emails, and focus on what matters.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 4,
          textAlign: "center",
          py: 4,
        }}
      >
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: { xs: "100%", sm: "100%", md: "30%" },
              gap: 2,
            }}
          >
            <Box
              component="img"
              src=""
              sx={{
                bgcolor: "#846CF4",
                height: 250,
                width: 250,
                borderRadius: 75,
              }}
            />

            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" fontWeight={800}>
                {item.title}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                {item.desc}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Screen>
  );
};

export default Tutorial;
