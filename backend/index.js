import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.VITE_APP_URL, //replace with your frontend link or add to .env
    credentials: true,
  })
);

app.use("/ai", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
