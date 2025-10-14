import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export const getAiMessage = async (req, res) => {
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
      "priority": "low" or "medium" or "high or urgent",
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
};
