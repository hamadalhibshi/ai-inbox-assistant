import {
  Box,
  Drawer,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  Typography,
  Paper,
  FormHelperText,
  FormControl,
  Button,
  IconButton,
} from "@mui/material";
import type { Ticket } from "../../types";
import { channels, priorities, status } from "../constants";
import CloseIcon from "@mui/icons-material/Close";
import { deleteTicket } from "../utils/api";
import { useToast } from "../hooks/useToast";
import { useState } from "react";
import { useTicketContext } from "../contexts/TicketContext";

interface EditFormProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  ticket: Ticket | undefined;
  fromChat?: boolean;
  setIsEditedDeleted?: (val: boolean) => void;
}

const EditForm = ({
  isOpen,
  setIsOpen,
  ticket,
  fromChat,
  setIsEditedDeleted,
}: EditFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { handleToast } = useToast();
  const { formik } = useTicketContext();

  const closeModal = () => {
    if (isEditing) {
      setIsEditing(!isEditing);
    }

    formik?.resetForm();
    setIsOpen(false);
  };

  const handleDeleteTicket = () => {
    handleToast(() => deleteTicket(ticket?.id), {
      loadingMessage: "Deleting ticket...",
      successMessage: "Ticket deleted successfully!",
      errorMessage: "Failed to delete ticket",
      onSuccess: (res) => {
        console.log("Ticket deleted:", res);
        closeModal();
        setIsEditedDeleted?.(true);
      },
      onError: (err) => {
        console.error("Delete error:", err);
      },
    });
  };

  const handleSave = () => {
    if (!formik?.errors) {
      if (isEditing) {
        setIsEditedDeleted?.(true);
      }
      formik?.handleSubmit();
      setIsOpen(false);
      setIsEditing(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeModal}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", md: 700 },
          maxWidth: "100%",
        },
      }}
    >
      <Box
        sx={{
          p: 4,
          height: "100%",
          outline: "none",
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "background.paper",
            height: "90%",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={4}
            alignItems={"center"}
          >
            <Typography variant="h5">
              {fromChat ? "Edit Ticket" : "Ticket Details"}
            </Typography>
            <IconButton onClick={closeModal}>
              <CloseIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
          </Box>

          <>
            <Box sx={{ height: "80%" }}>
              <Box
                display="flex"
                justifyContent="space-between"
                gap={2}
                flexWrap={{ xs: "wrap", md: "nowrap" }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  placeholder="Name"
                  name="contact.name"
                  value={
                    formik?.values?.contact?.name ?? ticket?.contact?.name ?? ""
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.contact?.name &&
                    Boolean(formik?.errors?.contact?.name)
                  }
                  helperText={
                    formik?.touched?.contact?.name
                      ? formik?.errors?.contact?.name
                      : ""
                  }
                  disabled={fromChat ? !fromChat : !isEditing}
                />

                <TextField
                  type="tel"
                  fullWidth
                  label="Phone"
                  placeholder="Phone Number"
                  name="contact.phone"
                  value={
                    formik?.values?.contact?.phone ??
                    ticket?.contact?.phone ??
                    ""
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.contact?.phone &&
                    Boolean(formik?.errors?.contact?.phone)
                  }
                  helperText={
                    formik?.touched?.contact?.phone
                      ? formik?.errors?.contact?.phone
                      : ""
                  }
                  disabled={fromChat ? !fromChat : !isEditing}
                />
              </Box>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={2}
                mt={3}
                flexWrap={{ xs: "wrap", md: "nowrap" }}
              >
                <TextField
                  type="email"
                  fullWidth
                  label="Email"
                  placeholder="Email"
                  name="contact.email"
                  value={
                    formik?.values?.contact?.email ??
                    ticket?.contact?.email ??
                    ""
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  error={
                    formik?.touched?.contact?.email &&
                    Boolean(formik?.errors?.contact?.email)
                  }
                  helperText={
                    formik?.touched?.contact?.email
                      ? formik?.errors?.contact?.email
                      : ""
                  }
                  disabled={fromChat ? !fromChat : !isEditing}
                />

                <FormControl
                  fullWidth
                  error={
                    formik?.touched?.status && Boolean(formik?.errors?.status)
                  }
                >
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={formik?.values?.status ?? ticket?.status ?? ""}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    disabled={fromChat ? !fromChat : !isEditing}
                  >
                    {Object.entries(status).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik?.touched?.status && formik?.errors?.status && (
                    <FormHelperText>{formik.errors.status}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box display="flex" justifyContent="space-between" gap={2} mt={3}>
                <FormControl
                  fullWidth
                  error={
                    formik?.touched?.status && Boolean(formik?.errors?.status)
                  }
                >
                  <InputLabel>Channel</InputLabel>
                  <Select
                    label="Channel"
                    name="channel"
                    value={formik?.values?.channel ?? ticket?.channel ?? ""}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    disabled={fromChat ? !fromChat : !isEditing}
                  >
                    {Object.entries(channels).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik?.touched?.channel && formik?.errors?.channel && (
                    <FormHelperText>{formik.errors.channel}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  error={
                    formik?.touched?.priority &&
                    Boolean(formik?.errors?.priority)
                  }
                >
                  <InputLabel>Priority</InputLabel>
                  <Select
                    label="Priority"
                    name="priority"
                    value={formik?.values?.priority ?? ticket?.priority ?? ""}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    disabled={fromChat ? !fromChat : !isEditing}
                  >
                    {Object.entries(priorities).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik?.touched?.priority && formik?.errors?.priority && (
                    <FormHelperText>{formik.errors.priority}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Intent"
                  placeholder="Intent"
                  name="intent"
                  value={formik?.values?.intent ?? ticket?.intent ?? ""}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  disabled={fromChat ? !fromChat : !isEditing}
                  error={
                    formik?.touched?.intent && Boolean(formik?.errors?.intent)
                  }
                  helperText={
                    formik?.touched?.intent ? formik?.errors?.intent : ""
                  }
                />
              </Box>
            </Box>

            {fromChat || isEditing ? (
              <Box
                display={"flex"}
                justifyContent={{ xs: "center", md: "flex-start" }}
                gap={2}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSave}
                  sx={{ py: 2, bgcolor: "#846CF4", color: "white" }}
                  disabled={formik?.isSubmitting || !formik?.dirty}
                >
                  Save
                </Button>

                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={closeModal}
                  sx={{ py: 2, color: "white" }}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              // TODO: Complete edit flow
              <Box
                display={"flex"}
                justifyContent={{ xs: "center", md: "flex-start" }}
                gap={2}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => setIsEditing(true)}
                  sx={{ py: 2, color: "white" }}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={handleDeleteTicket}
                  sx={{ py: 2, color: "white" }}
                >
                  Delete
                </Button>
              </Box>
            )}
          </>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default EditForm;
