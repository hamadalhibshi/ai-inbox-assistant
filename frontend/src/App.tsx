import { CustomToaster, NavBar } from "./components";
import { Chat, Home, NotFound, Tickets } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <CustomToaster />
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
