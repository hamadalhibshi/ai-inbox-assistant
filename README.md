# AI Inbox Assistant

An intelligent email, whatsapp, messages, etc. processing system that uses AI to automatically extract and categorize information from incoming messages.

## Features

- **Smart Field Extraction**: Automatically extracts key information from emails using AI
- **JSON Response Format**: Returns structured data for easy integration
- **RESTful API**: Simple HTTP endpoints for processing messages
- **Modern Stack**: Built with Node.js, Express, SQLite, and React

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

4. Create a myDatabase.db file in the root of backend

5. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```
   VITE_API_URL=your_api_url_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Tech Stack

- **Backend**: Node.js, Express, OpenAI SDK, cors, dotenv
- **Frontend**: React, TypeScript, Vite
- **AI**: Groq API with Llama 3.1 model
