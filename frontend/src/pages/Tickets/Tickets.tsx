import { useEffect, useState } from "react";
import { editTicket, getTickets } from "../../utils/api";
import type { Filters, Ticket } from "../../../types";
import { EditForm, Screen } from "../../components";
import {
  Box,
  Typography,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableHead,
  TablePagination,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { handlePriorityColors, handleStatusColors } from "./Helpers/helpers";
import moment from "moment";
import toast from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";
import { language, priorities, status } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { useFormik } from "formik";
import TicketContext from "../../contexts/TicketContext";

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
  const [isEditedDeleted, setIsEditedDeleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    priority: "all",
    language: "all",
    status: "all",
    search: "",
  });
  const { handleToast } = useToast();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: selectedTicket?.id ?? "",
      status: selectedTicket?.status ?? "",
      createdAt: selectedTicket?.createdAt ?? "",
      contact: {
        name: selectedTicket?.contact?.name ?? "",
        phone: selectedTicket?.contact?.phone ?? "",
        email: selectedTicket?.contact?.email ?? "",
      },
      channel: selectedTicket?.channel ?? "",
      language: selectedTicket?.language ?? "",
      intent: selectedTicket?.intent ?? "",
      priority: selectedTicket?.priority ?? "",
      entities: selectedTicket?.entities ?? [],
      message_raw: selectedTicket?.message_raw ?? "",
      reply_suggestion: selectedTicket?.reply_suggestion ?? "",
    },
    onSubmit: (values: Ticket) => {
      handleToast(
        () =>
          editTicket({
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
    // TODO: Add validation
    // validationSchema: () => {},
  });

  useEffect(() => {
    setTickets([]);
    setIsLoading(true);
    getTickets(filters)
      .then((res) => {
        setTickets(res?.data);
      })
      .catch((err) => {
        toast.error("Error getting Tickets");
        console.log(err.message);
      })
      .finally(() => {
        setIsEditedDeleted(false);
        setIsLoading(false);
      });
  }, [isEditedDeleted, filters]);

  const handleTicketClick = (ticket: Ticket) => {
    setViewModal(!viewModal);
    setSelectedTicket(ticket);
  };

  return (
    <TicketContext.Provider value={{ formik }}>
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

        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: 2,
            mb: 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: { xs: "wrap", md: "nowrap" },
              alignItems: "center",
              gap: 2,
              p: 2,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search by name or phone number..."
              size="small"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: { xs: "100%", md: "25%" } }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", md: "flex-end" },
                alignItems: "center",
                gap: 2,
                flex: 1,
              }}
            >
              <FormControl
                size="small"
                sx={{ minWidth: { xs: "30%", md: 150 } }}
              >
                <InputLabel>Priority</InputLabel>
                <Select
                  label="Priority"
                  value={filters.priority}
                  onChange={(e) =>
                    handleFilterChange("priority", e.target.value)
                  }
                >
                  <MenuItem value="all">All</MenuItem>
                  {Object.entries(priorities).map(([key, value]) => (
                    <MenuItem value={value.toString().toLowerCase()} key={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ minWidth: { xs: "30%", md: 150 } }}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  {Object.entries(status).map(([key, value]) => (
                    <MenuItem value={value.toString().toLowerCase()} key={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ minWidth: { xs: "30%", md: 150 } }}
              >
                <InputLabel>Language</InputLabel>
                <Select
                  label="Language"
                  value={filters.language}
                  onChange={(e) =>
                    handleFilterChange("language", e.target.value)
                  }
                >
                  <MenuItem value="all">All</MenuItem>
                  {Object.entries(language).map(([key, value]) => (
                    <MenuItem value={value.toString().toLowerCase()} key={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Divider />

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
              <CircularProgress size={24} color="inherit" />
            </Box>
          )}

          {tickets?.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Intent</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Channel</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Language</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
                      Priority
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tickets.map((ticket: Ticket, index: number) => (
                    <TableRow
                      key={index}
                      hover
                      onClick={() => handleTicketClick(ticket)}
                      sx={{
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <TableCell>
                        <Typography fontWeight={600}>
                          {ticket?.contact?.name || "Unknown"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>
                          {ticket?.contact?.phone || "No number"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {ticket?.intent}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>{ticket?.channel || "Unknown"}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {ticket?.language}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {moment(ticket?.createdAt).format("DD/MM/YYYY")}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ width: "10%" }}>
                        <Box
                          sx={{
                            bgcolor: handlePriorityColors(ticket?.priority),
                            borderRadius: 2,
                            px: 1.5,
                            py: 0.5,
                            color: "white",
                            display: "inline-block",
                            minWidth: 70,
                          }}
                        >
                          <Typography variant="caption" fontWeight={600}>
                            {ticket?.priority?.toUpperCase()}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="center" sx={{ width: "10%" }}>
                        <Box
                          sx={{
                            bgcolor: handleStatusColors(ticket?.status),
                            borderRadius: 2,
                            px: 1.5,
                            py: 0.5,
                            color: "white",
                            display: "inline-block",
                            minWidth: 70,
                          }}
                        >
                          <Typography variant="caption" fontWeight={600}>
                            {ticket?.status?.toUpperCase()}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            !isLoading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center",
                  p: 5,
                }}
              >
                <Typography variant="body1" color="textSecondary">
                  No Tickets
                </Typography>
              </Box>
            )
          )}

          {/* TODO Add Pagination */}
          <TablePagination
            component="div"
            count={tickets?.length}
            page={1}
            onPageChange={() => {}}
            rowsPerPage={10}
            onRowsPerPageChange={() => {}}
            rowsPerPageOptions={[10, 25]}
            labelRowsPerPage="Rows per page"
            disabled={tickets.length === 0}
          />
        </Paper>

        <EditForm
          isOpen={viewModal}
          setIsOpen={setViewModal}
          ticket={selectedTicket}
          setIsEditedDeleted={setIsEditedDeleted}
        />
      </Screen>
    </TicketContext.Provider>
  );
};

export default Tickets;
