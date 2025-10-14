import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBackHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "6rem", md: "10rem" },
          fontWeight: 700,
          color: "#846CF4",
        }}
      >
        404
      </Typography>

      <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, color: "text.secondary", maxWidth: 500 }}
      >
        Sorry, the page you are looking for doesn't exist or has been moved.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={handleGoBackHome}
        sx={{ bgcolor: "#846CF4" }}
      >
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFound;
