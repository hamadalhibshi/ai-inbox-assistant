import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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
import AnimatedButton from "./AnimatedButton";
import { motion } from "motion/react";
import AnimatedIconButton from "./AnimatedIconButton";
import { IconButton } from "@mui/material";

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
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Box
              component="img"
              src={images.logo}
              sx={{
                height: 40,
                width: 40,
                borderRadius: 20,
                cursor: "pointer",
              }}
              onClick={navigateHome}
            />
          </motion.div>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navigationData.map((nav) => (
              <AnimatedButton
                key={nav.id}
                onClick={() => handleNavigation(nav.href)}
                sx={{ color: "#846CF4", bgcolor: "transparent", mx: 1 }}
              >
                {nav.title}
              </AnimatedButton>
            ))}

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-block",
              }}
            >
              <AnimatedIconButton
                color="inherit"
                sx={{ display: { xs: "flex" }, color: "#846CF4" }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <SunnyIcon /> : <BedtimeIcon />}
              </AnimatedIconButton>
            </motion.div>
          </Box>

          <IconButton
            color="inherit"
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#846CF4",
            }}
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
            <AnimatedIconButton
              color="inherit"
              sx={{
                color: "#846CF4",
                mr: 1,
              }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <SunnyIcon /> : <BedtimeIcon />}
            </AnimatedIconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
