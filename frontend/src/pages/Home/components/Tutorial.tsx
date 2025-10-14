import { Box, Typography } from "@mui/material";
import { Screen } from "../../../components";
import { tutorialData } from "../../../constants";

const Tutorial = () => {
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
        {tutorialData.map((item, index) => (
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
            {/* TODO: remove bg color and generate an image using AI */}
            <Box
              component="img"
              src={item?.image}
              sx={{
                height: 250,
                width: 250,
                borderRadius: 75,
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" fontWeight={800}>
                {item?.title}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                {item?.desc}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Screen>
  );
};

export default Tutorial;
