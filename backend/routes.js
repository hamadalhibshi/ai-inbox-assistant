import express from "express";
import {
  getTickets,
  getExtractedTickets,
  saveTicket,
  DeleteTicket,
  EditTicket,
} from "./controllers/tickets.js";
import { getAiMessage } from "./controllers/ai.js";

const router = express.Router();

router.post("/filter", (req, res) => {
  getTickets(res, req.body.filters);
});

router.get("/extract", (req, res) => {
  getExtractedTickets(res);
});

router.post("/", (req, res) => {
  getAiMessage(req, res);
});

router.post("/save", (req, res) => {
  saveTicket(req, res);
});

router.delete("/:id", (req, res) => {
  DeleteTicket(req, res);
});

router.put("/:id", (req, res) => {
  EditTicket(req, res);
});

export default router;
