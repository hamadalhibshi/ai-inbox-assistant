import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { DB } from "./connect.js";

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

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/ai", (req, res) => {
  res.set("content-type", "applications/json");
  const sql = "SELECT * from tickets";
  let data = { tickets: [] };
  try {
    DB.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        data.tickets.push({
          id: row.id,
          status: row.status,
          createdAt: row.createdAt,
          contact_name: row.contact_name,
          contact_email: row.contact_email,
          contact_phone: row.contact_phone,
          channel: row.channel,
          language: row.language,
          intent: row.intent,
          priority: row.priority,
          message_raw: row.message_raw,
          reply_suggestion: row.reply_suggestion,
          updatedAt: row.updatedAt,
        });
      });
      let content = JSON.stringify(data);
      res.send(content);
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/ai", async (req, res) => {
  const messageText = req.body.messageText;

  // Input validation
  if (!messageText || typeof messageText !== "string") {
    return res.status(400).json({
      error: "A message is required.",
    });
  }

  const systemPrompt = `You are an AI assistant that extracts structured data from customer messages. You must return a JSON object with EXACTLY these keys:
    {
    "id": "auto-generated-unique-id",
    "status": "open" or "closed",
    "createdAt": "ISO 8601 timestamp",
    "contact": {
        "name": "extracted name or null",
        "email": "extracted email or null", 
        "phone": "extracted phone or null"
    },
    "channel": "email" or "whatsapp" or "sms" or "chat" or "unknown",
    "language": "language code like 'en' or 'ar'",
    "intent": "short description like 'billing question' or 'maintenance request'",
    "priority": "low" or "medium" or "high",
    "entities": [
        {"type": "entity type", "value": "entity value"}
    ],
    "message_raw": "original message text",
    "reply_suggestion": "short draft reply in detected language"
    }

    Rules:
    - Always include ALL keys, even if some values are null
    - Generate a unique ID (use timestamp + random string)
    - Set status to "open" for new messages
    - Use current timestamp for createdAt
    - Extract contact info if present, otherwise use null
    - Detect channel from context (email signatures, phone numbers, etc.)
    - Detect language and set appropriate code
    - Determine intent from message content
    - Set priority based on urgency indicators
    - Extract entities like dates, amounts, reference numbers
    - Keep message_raw exactly as provided
    - Generate helpful reply suggestion`;

  const resp = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Extract fields from this message: ${messageText}`,
      },
    ],
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  const data = JSON.parse(resp.choices[0].message.content);
  res.json(data);
});

app.get("/ai/extract", (req, res) => {
  const sql = `SELECT * FROM tickets`;

  DB.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to fetch tickets",
        details: err.message,
      });
    }

    const tickets = rows.map((row) => ({
      id: row.id,
      status: row.status,
      createdAt: row.createdAt,
      contact: {
        name: row.contact_name,
        email: row.contact_email,
        phone: row.contact_phone,
      },
      channel: row.channel,
      language: row.language,
      intent: row.intent,
      priority: row.priority,
      message_raw: row.message_raw,
      reply_suggestion: row.reply_suggestion,
      updatedAt: row.updatedAt,
    }));

    res.json(tickets);
  });
});

app.post("/ai/save", (req, res) => {
  try {
    const {
      id,
      status,
      createdAt,
      contact,
      channel,
      language,
      intent,
      priority,
      entities,
      message_raw,
      reply_suggestion,
    } = req.body;

    // Debug: Log the received data
    console.log("Received data:", {
      id,
      status,
      createdAt,
      contact,
      channel,
      language,
      intent,
      priority,
      message_raw,
      reply_suggestion,
    });

    // Validate required fields
    if (
      !id ||
      !status ||
      !createdAt ||
      !channel ||
      !language ||
      !intent ||
      !priority ||
      !message_raw ||
      !reply_suggestion
    ) {
      return res.status(400).json({
        error: "Missing required fields",
        received: {
          id: !!id,
          status: !!status,
          createdAt: !!createdAt,
          channel: !!channel,
          language: !!language,
          intent: !!intent,
          priority: !!priority,
          message_raw: !!message_raw,
          reply_suggestion: !!reply_suggestion,
        },
      });
    }

    const sql = `
      INSERT INTO tickets (
        id, status, createdAt, contact_name, contact_email, contact_phone,
        channel, language, intent, priority, message_raw, reply_suggestion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      id,
      status || "open",
      createdAt,
      contact?.name || null,
      contact?.email || null,
      contact?.phone || null,
      channel || "unknown",
      language || "en",
      intent || "general inquiry",
      priority || "medium",
      message_raw,
      reply_suggestion,
    ];

    DB.run(sql, values, (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          error: "Failed to save message to database",
          details: err.message,
        });
      }

      res.json({
        success: true,
        message: "Message saved successfully",
        messageId: id,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
});
