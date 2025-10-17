import React, { useState } from "react";
import "../../App.css";
import { extractFields, saveAiTicket } from "../../utils/api";
import type { Ticket } from "../../types";
import { useToast } from "../../hooks/useToast";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { EditForm, Screen } from "../../components";
import { useFormik } from "formik";
import TicketInfo from "./components/TicketInfo";
import ExampleModal from "./components/ExampleModal";
import TicketContext, {
  ticketValidationSchema,
} from "../../contexts/TicketContext";

interface TicketRelevance extends Ticket {
  relevant?: boolean;
}

const Chat = () => {
  const [messageText, setMessageText] = useState("");
  const [ticket, setTicket] = useState<TicketRelevance | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExampleOpen, setIsExampleOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { handleToast } = useToast();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: ticket?.id ?? "",
      status: ticket?.status ?? "",
      createdAt: ticket?.createdAt ?? "",
      contact: {
        name: ticket?.contact?.name ?? "",
        phone: ticket?.contact?.phone ?? "",
        email: ticket?.contact?.email ?? "",
      },
      channel: ticket?.channel ?? "",
      language: ticket?.language ?? "",
      intent: ticket?.intent ?? "",
      priority: ticket?.priority ?? "",
      entities: ticket?.entities ?? [],
      message_raw: ticket?.message_raw ?? "",
      reply_suggestion: ticket?.reply_suggestion ?? "",
    },
    onSubmit: (values: Ticket) => {
      handleToast(
        () =>
          saveAiTicket({
            id: values?.id,
            status: values?.status,
            createdAt: values?.createdAt,
            contact: values?.contact,
            channel: values?.channel,
            language: values?.language,
            intent: values?.intent,
            priority: values?.priority,
            entities: [],
            message_raw: values?.message_raw,
            reply_suggestion: values?.reply_suggestion,
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
    },
    validationSchema: ticketValidationSchema,
  });

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText) return;

    setLoading(true);
    setError(null);
    setTicket(undefined);

    handleToast(() => extractFields(messageText), {
      loadingMessage: "Processing message...",
      successMessage: "Data retrieved successfully!",
      errorMessage: "Failed to extract data",
      onSuccess: (res) => {
        setTicket(res);
      },
      onError: (err) => {
        setError(err?.message || "An error occurred");
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleEditTicket = () => {
    setIsSidebarOpen(true);
    setIsEdit(true);
  };

  const openExampleModal = () => {
    setIsExampleOpen(true);
  };

  return (
    <TicketContext.Provider value={{ formik }}>
      <Screen
        sx={{
          py: 6,
          minHeight: "95vh",
        }}
      >
        <Container maxWidth="md" sx={{ mb: 5 }}>
          <Box textAlign="center" mb={5}>
            <Typography variant="h3" fontWeight="bold" sx={{}}>
              AI Inbox Assistant
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Extract structured information from your messages effortlessly.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                color: "white",
                bgcolor: "#846CF4",
              }}
              onClick={openExampleModal}
            >
              Example of message
            </Button>
          </Box>

          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              flexGrow: 1,
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              label="AI Inbox Chat"
              variant="outlined"
              multiline
              fullWidth
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Paste your message, chat, or email content here..."
              sx={{
                borderRadius: 2,
              }}
            />
            <IconButton
              color="primary"
              onClick={handleChatSubmit}
              disabled={loading || !messageText}
              sx={{
                color: "#846CF4",
                width: 56,
                height: 56,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <ArrowCircleRightIcon fontSize="large" />
              )}
            </IconButton>
          </Paper>

          {error && (
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                bgcolor: "error.light",
                color: "white",
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Error
              </Typography>
              <Typography>{error}</Typography>
            </Paper>
          )}

          {ticket && (
            <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
              <Box
                sx={{
                  bgcolor: "#846CF4",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  mb: 3,
                  boxShadow: 2,
                }}
              >
                <LightbulbIcon sx={{ color: "white", fontSize: 24 }} />
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  AI Reply Suggestion
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  p: 2,
                  bgcolor: isDark ? "grey.800" : "grey.100",
                  borderRadius: 2,
                  mb: 3,
                  fontSize: "1rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {ticket?.reply_suggestion}
              </Typography>

              {ticket?.relevant && (
                <>
                  <Divider sx={{ mb: 3 }} />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      Extracted Fields
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={() => formik.handleSubmit()}
                        sx={{ bgcolor: "#846CF4", color: "white" }}
                        disabled={formik.isSubmitting}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleEditTicket}
                        disabled={formik.isSubmitting}
                        sx={{ color: "white" }}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </Stack>

                  <TicketInfo ticket={ticket} />
                </>
              )}
            </Paper>
          )}
          <EditForm
            setIsOpen={setIsSidebarOpen}
            isOpen={isSidebarOpen}
            fromChat={isEdit}
            ticket={ticket}
          />
        </Container>
        <ExampleModal setIsVisible={setIsExampleOpen} visible={isExampleOpen} />
      </Screen>
    </TicketContext.Provider>
  );
};

export default Chat;
