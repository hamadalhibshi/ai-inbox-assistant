import { Box, Drawer, Typography } from "@mui/material";
import type { Ticket } from "../../types";

interface EditFormProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  ticket: Ticket;
}

const EditForm = ({ isOpen, setIsOpen, ticket }: EditFormProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeModal}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", md: 500 },
          maxWidth: "100%",
        },
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 4,
          height: "100%",
          outline: "none",
        }}
      >
        <Typography variant="h4">Ticket Details</Typography>
        <Typography variant="h5">{ticket.contact_name || "Unknown"}</Typography>
        <Typography variant="body1">Add your form fields here</Typography>
      </Box>
    </Drawer>
  );
};

export default EditForm;
