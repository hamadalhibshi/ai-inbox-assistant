import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {
  getTickets,
  getExtractedTickets,
  saveTicket,
} from "./controllers/tickets.js";
import { getAiMessage } from "./controllers/ai.js";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: process.env.VITE_APP_URL,
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// routes
app.get("/ai", (req, res) => {
  getTickets(res);
});

app.get("/ai/extract", (req, res) => {
  getExtractedTickets(res);
});

app.post("/ai", (req, res) => {
  getAiMessage(req, res);
});

app.post("/ai/save", (req, res) => {
  saveTicket(req, res);
});
