import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

app.use(
  cors({
    origin: process.env.VITE_APP_URL,
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/", async (req, res) => {
  const messageText = req.body.messageText;
  const resp = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      { role: "system", content: "You extract fields and return strict JSON." },
      {
        role: "user",
        content: `Extract fields from this message: ${messageText}`,
      },
    ],
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  res.json(JSON.parse(resp.choices[0].message.content));
});

app.get("/ai/extract", (req, res) => {
  res.json({ message: "Hello World" });
});
