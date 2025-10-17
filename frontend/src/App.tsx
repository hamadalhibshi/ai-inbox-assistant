import { CustomToaster, NavBar } from "./components";
import { Chat, Home, NotFound, Tickets } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Paper } from "@mui/material";
import { useState } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#323232" : "#f9f9f9",
      },
    },
    typography: {
      fontFamily: `"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper sx={{ borderRadius: 0 }}>
        <BrowserRouter>
          <CustomToaster />
          <NavBar setDarkMode={setDarkMode} darkMode={darkMode} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
