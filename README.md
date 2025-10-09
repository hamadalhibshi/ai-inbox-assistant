# AI Inbox Assistant

An intelligent email processing system that uses AI to automatically extract and categorize information from incoming messages.

## Features

- **Smart Field Extraction**: Automatically extracts key information from emails using AI
- **JSON Response Format**: Returns structured data for easy integration
- **RESTful API**: Simple HTTP endpoints for processing messages
- **Modern Stack**: Built with Node.js, Express, and React

## Architecture

- **Backend**: Node.js/Express server with OpenAI integration
- **Frontend**: React application for user interface
- **AI Processing**: Uses Groq's Llama model for fast, accurate text processing

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API credentials:
   ```
   OPENAI_API_KEY=your_api_key_here
   OPENAI_BASE_URL=https://api.groq.com/openai/v1
   OPENAI_MODEL=llama-3.1-8b-instant
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

### API Usage

Send a POST request to `/ai/extract` with your message:

```bash
curl -X POST http://localhost:3000/ai/extract \
  -H "Content-Type: application/json" \
  -d '{"messageText": "Your email content here"}'
```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /ai/extract` - Extract fields from email text
  - Body: `{"messageText": "email content"}`
  - Returns: JSON object with extracted fields

## Tech Stack

- **Backend**: Node.js, Express, OpenAI SDK
- **Frontend**: React, TypeScript, Vite
- **AI**: Groq API with Llama 3.1 model
