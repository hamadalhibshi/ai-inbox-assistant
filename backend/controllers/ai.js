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

  // TODO: Fix issue with date, returning older dates instead of current

  const systemPrompt = `
  You are not a chatbot or assistant. You are a strict data extractor that only processes customer communications.
  
  Your ONLY task:
  - Analyze a message that might come from WhatsApp, email, SMS, or chat.
  - If the message is a real customer message (e.g., a request, complaint, booking, payment issue, inquiry, or support message), extract structured data.
  - If it is NOT a customer message (e.g., a general question to the AI, random text, jokes, greetings, or instructions), DO NOT reply conversationally — reject it.
  
  ---
  
  ### When the message IS relevant:
  Return ONLY a **pure JSON object** with exactly these keys:
  
  {
    "id": "auto-generated-unique-id everytime on submit",
    "status": "open" or "closed",
    "createdAt": "ISO 8601 timestamp",
    "contact": {
      "name": "extracted name or null",
      "email": "extracted email or null",
      "phone": "extracted phone or null"
    },
    "channel": "email" or "whatsapp" or "sms" or "chat" or "unknown",
    "language": "language code like 'en' or 'ar'",
    "intent": "short description like 'booking inquiry' or 'payment issue'",
    "priority": "low" or "medium" or "high" or "urgent",
    "entities": [{"type": "entity type", "value": "entity value"}],
    "message_raw": "exact original message text",
    "reply_suggestion": "short polite draft reply in the detected language",
    "relevant": "true if message is relevant or false if not and should be a boolean"
  }
  
  Rules for JSON mode:
  - Always include all keys
  - Generate a unique ID using current timestamp + random string
  - Use current timestamp for createdAt
  - Detect and set language
  - Keep message_raw exactly as provided
  - Suggest a short, helpful reply (1–2 sentences)
  - Do NOT add any extra text before or after JSON
  
  ---
  
  ### When the message is NOT relevant:
  If the message is general, personal, random, or directed at the AI itself, DO NOT answer it.
  Respond ONLY with the exact phrase (no quotes, no extra text):
  
  This message does not appear to be a valid Email, Whatsapp message etc. Please provide a real message.
  
  ---
  
  ### Critical Rules:
  - You are NOT a chatbot.
  - Never answer questions.
  - Never explain anything.
  - Never output both text and JSON together.
  - Only two valid outputs exist:
    1. ✅ JSON object (for relevant customer messages)
    2. 🚫 Exact rejection phrase above (for irrelevant messages)
  `;

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
