import React, { useState } from "react";
import "../../App.css";
import { extractFields, saveAiTicket } from "../../utils/api";
import type { Ticket } from "../../../types";
import { useToast } from "../../hooks/useToast";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const Chat = () => {
  const [messageText, setMessageText] = useState("");
  const [extractedFields, setExtractedFields] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText) return;

    setLoading(true);
    setError(null);
    setExtractedFields(null);

    handleToast(() => extractFields(messageText), {
      loadingMessage: "Processing message...",
      successMessage: "Data retrieved successfully!",
      errorMessage: "Failed to extract data",
      onSuccess: (res) => {
        setExtractedFields(res);
      },
      onError: (err) => {
        setError(err?.message || "An error occurred");
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleFieldsSaved = (e: React.FormEvent) => {
    e.preventDefault();

    handleToast(
      () =>
        saveAiTicket({
          id: extractedFields?.id,
          status: extractedFields?.status,
          createdAt: extractedFields?.createdAt,
          contact: extractedFields?.contact,
          channel: extractedFields?.channel,
          language: extractedFields?.language,
          intent: extractedFields?.intent,
          priority: extractedFields?.priority,
          entities: [],
          message_raw: extractedFields?.message_raw,
          reply_suggestion: extractedFields?.reply_suggestion,
        }),
      {
        loadingMessage: "Saving ticket...",
        successMessage: "Ticket saved successfully!",
        errorMessage: "Failed to save ticket",
        onSuccess: (res) => {
          console.log("Ticket saved:", res);
        },
        onError: (err) => {
          console.error("Save error:", err);
        },
      }
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          AI Inbox Assistant
        </Typography>
        <Typography variant="subtitle1">
          Extract structured information from your messages
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 5,
        }}
      >
        <Box sx={{ width: "95%" }}>
          <TextField
            label="AI Inbox Chat"
            variant="outlined"
            multiline
            fullWidth
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Paste message content here..."
          />
        </Box>

        <Box sx={{ width: "5%" }}>
          <IconButton
            type="submit"
            disabled={loading || !messageText}
            size="large"
            loading={loading}
            onClick={handleSubmit}
          >
            <ArrowCircleRightIcon />
          </IconButton>
        </Box>
      </Box>

      {error && (
        <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: "error.light" }}>
          <Typography variant="h6" color="error.main">
            Error:
          </Typography>
          <Typography>{error}</Typography>
        </Paper>
      )}

      {extractedFields && (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h6"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              py: 1,
              px: 2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            AI Reply Suggestion
          </Typography>

          <Typography
            variant="body1"
            sx={{
              p: 2,
              bgcolor: "grey.100",
              borderRadius: 1,
              mb: 3,
              whiteSpace: "pre-wrap",
            }}
          >
            {extractedFields.reply_suggestion}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Extracted Fields</Typography>
            <Box>
              <Button
                variant="contained"
                color="success"
                onClick={handleFieldsSaved}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Box>
          </Stack>

          <Box
            component="pre"
            sx={{
              bgcolor: "grey.900",
              color: "grey.100",
              p: 2,
              borderRadius: 1,
              fontSize: "0.875rem",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(extractedFields, null, 2)}
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default Chat;
