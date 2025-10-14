import { useEffect, useState } from "react";
import { getTickets } from "../../utils/api";
import type { Ticket } from "../../../types";
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
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  InputAdornment,
} from "@mui/material";
import { handlePriorityColors, handleStatusColors } from "./Helpers/helpers";
import moment from "moment";
import toast from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";
import { language, priorities, status } from "../../constants";

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [viewModal, setViewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
  const [isDeleted, setIsDeleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  useEffect(() => {
    getTickets()
      .then((res) => {
        setTickets(res?.data);
        setIsDeleted(false);
      })
      .catch((err) => {
        toast.error("Error getting Tickets");
        console.log(err.message);
      });
  }, [isDeleted]);

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

      {tickets?.length > 0 ? (
        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: 2,
            mb: 10,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              p: 3,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 50 }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {Object.entries(priorities).map(([key, value]) => (
                  <MenuItem value={value.toString().toLowerCase()} key={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {Object.entries(status).map(([key, value]) => (
                  <MenuItem value={value.toString().toLowerCase()} key={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Language</InputLabel>
              <Select
                label="Language"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {Object.entries(language).map(([key, value]) => (
                  <MenuItem value={value.toString().toLowerCase()} key={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Divider />

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
                      <Typography variant="body2">{ticket?.intent}</Typography>
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
          />
        </Paper>
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
        setIsDeleted={setIsDeleted}
      />
    </Screen>
  );
};

export default Tickets;
