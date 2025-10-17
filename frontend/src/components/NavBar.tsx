import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { images } from "../constants";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";

interface NavBarProps {
  setDarkMode: (val: boolean) => void;
  darkMode: boolean;
}

const NavBar = ({ setDarkMode, darkMode }: NavBarProps) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigation = (href: string) => {
    navigate(href);
    setDrawerOpen(false);
  };

  const navigateHome = () => {
    navigate("/");
  };

  const navigationData = [
    { id: 0, title: "Home", href: "/" },
    { id: 1, title: "Chat", href: "/chat" },
    { id: 2, title: "Tickets", href: "/tickets" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "transparent" }}>
        <Toolbar
          sx={{
            mx: { xs: 2, md: 20 },
            display: "flex",
            justifyContent: "space-between",
            borderRadius: 0,
          }}
        >
          <Box
            component="img"
            src={images.logo}
            sx={{ height: 40, width: 40, borderRadius: 20 }}
            onClick={navigateHome}
          />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navigationData.map((nav) => (
              <Button
                key={nav.id}
                onClick={() => handleNavigation(nav.href)}
                sx={{ color: "#846CF4", bgcolor: "transparent", mx: 1 }}
              >
                {nav.title}
              </Button>
            ))}
            <IconButton
              color="inherit"
              sx={{ display: { xs: "flex" }, color: "#846CF4" }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <SunnyIcon /> : <BedtimeIcon />}
            </IconButton>
          </Box>

          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" }, color: "#846CF4" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 250,
          }}
        >
          <List>
            {navigationData.map((nav) => (
              <ListItem key={nav.id} disablePadding>
                <ListItemButton onClick={() => handleNavigation(nav.href)}>
                  <ListItemText primary={nav.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              width: "100%",
              height: "80vh",
            }}
          >
            <IconButton
              color="inherit"
              sx={{
                color: "#846CF4",
              }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <SunnyIcon /> : <BedtimeIcon />}
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
