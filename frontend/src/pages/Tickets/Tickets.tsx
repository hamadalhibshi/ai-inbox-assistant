import { useEffect, useState } from "react";
import { getTickets } from "../../utils/api";
import type { Ticket } from "../../../types";
import { EditForm, Screen } from "../../components";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box, Typography, List } from "@mui/material";
import { useToast } from "../../hooks/useToast";
import { handlePriorityColors, handleStatusColors } from "./Helpers/helpers";

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [viewModal, setViewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket>([]);
  const { handleToast } = useToast();

  useEffect(() => {
    handleToast(() => getTickets(), {
      errorMessage: "Error trying to retrive Tickets",
      onSuccess: (res) => {
        setTickets(res?.tickets);
      },
      onError: (err) => {
        console.log(err.message);
      },
    });
  }, []);

  const handleTicketClick = (ticket: Ticket) => {
    setViewModal(!viewModal);
    setSelectedTicket(ticket);
  };

  return (
    <Screen>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{
          textAlign: "center",
          mb: 3,
          letterSpacing: 0.5,
        }}
      >
        Tickets
      </Typography>

      {tickets?.length ? (
        <List>
          {tickets.map((ticket: Ticket, index: number) => (
            <>
              <ListItem
                key={index}
                alignItems="flex-start"
                onClick={() => handleTicketClick(ticket)}
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  mb: 1,
                  boxShadow: 1,
                  p: 2,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "action.hover",
                    transform: "scale(1.02)",
                  },
                  flexWrap: { xs: "wrap", md: "nowrap" },
                }}
              >
                <ListItemAvatar>
                  <Avatar src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography fontWeight={600}>
                      {ticket.contact_name || "Unknown"}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2">
                      {ticket.reply_suggestion}
                    </Typography>
                  }
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: { xs: 0.5, md: 0 },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: handlePriorityColors(ticket?.priority),
                      borderRadius: 2,
                      px: 1.5,
                      py: 0.5,
                      color: "white",
                      minWidth: 60,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" fontWeight={600}>
                      {ticket.priority?.toUpperCase()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: handleStatusColors(ticket?.status),
                      borderRadius: 2,
                      px: 1.5,
                      py: 0.5,
                      color: "white",
                      minWidth: 60,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" fontWeight={600}>
                      {ticket.status?.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            </>
          ))}
        </List>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="body1" color="textSecondary">
            No Tickets
          </Typography>
        </Box>
      )}
      <EditForm
        isOpen={viewModal}
        setIsOpen={setViewModal}
        ticket={selectedTicket}
      />
    </Screen>
  );
};

export default Tickets;
