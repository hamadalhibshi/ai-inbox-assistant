import { Box, Chip, Grid, Typography, useTheme } from "@mui/material";
import type { Ticket } from "../../../types";

interface TicketInfoProps {
  ticket: Ticket;
}

const TicketInfo = ({ ticket }: TicketInfoProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        bgcolor: isDark ? "grey.800" : "grey.100",
        p: 3,
        borderRadius: 2,
        maxWidth: 700,
        mx: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Ticket Info
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid>
          <Typography variant="subtitle2">Status:</Typography>
          <Chip
            label={ticket.status?.toUpperCase() || "UNKNOWN"}
            color={ticket.status === "open" ? "success" : "default"}
            size="small"
          />
        </Grid>

        <Grid>
          <Typography variant="subtitle2">Created At:</Typography>
          <Typography variant="body2">
            {ticket.createdAt
              ? new Date(ticket.createdAt).toLocaleString()
              : "-"}
          </Typography>
        </Grid>

        <Grid>
          <Typography variant="subtitle2">Priority:</Typography>
          <Chip
            label={ticket.priority?.toUpperCase() || "-"}
            color={
              ticket.priority === "urgent"
                ? "error"
                : ticket.priority === "high"
                ? "warning"
                : "default"
            }
            size="small"
          />
        </Grid>

        <Grid>
          <Typography variant="subtitle2">Channel:</Typography>
          <Typography variant="body2">{ticket.channel || "-"}</Typography>
        </Grid>
      </Grid>

      {/* Contact Info */}
      <Typography variant="h6" gutterBottom>
        Contact Info
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid>
          <Typography variant="subtitle2">Name:</Typography>
          <Typography variant="body2">{ticket.contact.name || "-"}</Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle2">Email:</Typography>
          <Typography variant="body2">{ticket.contact.email || "-"}</Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle2">Phone:</Typography>
          <Typography variant="body2">{ticket.contact.phone || "-"}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Message
      </Typography>
      <Box
        sx={{
          bgcolor: "grey.900",
          color: "grey.100",
          p: 2,
          borderRadius: 1,
          fontSize: "0.875rem",
          whiteSpace: "pre-wrap",
          mb: 2,
        }}
      >
        {ticket.message_raw || "-"}
      </Box>
    </Box>
  );
};

export default TicketInfo;
