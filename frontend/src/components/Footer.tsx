import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: { xs: 4, sm: 8 },
        width: "100%",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <div>
        <Link color="text.secondary" variant="body2">
          Privacy Policy
        </Link>
        <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}>
          &nbsp;•&nbsp;
        </Typography>
        <Link color="text.secondary" variant="body2">
          Terms of Service
        </Link>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {"Copyright © "}
          <Link color="text.secondary">Sitemark</Link>
          &nbsp;
          {new Date().getFullYear()}
        </Typography>
      </div>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ justifyContent: "left", color: "text.secondary" }}
      >
        <IconButton
          color="inherit"
          size="small"
          aria-label="GitHub"
          sx={{ alignSelf: "center" }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="X"
          sx={{ alignSelf: "center" }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="LinkedIn"
          sx={{ alignSelf: "center" }}
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
