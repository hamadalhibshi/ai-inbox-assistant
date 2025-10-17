import { Box, IconButton, Modal, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { language } from "../../../constants/language";

interface ExampleModalProps {
  visible: boolean;
  setIsVisible: (val: boolean) => void;
}

const ExampleModal = ({ visible, setIsVisible }: ExampleModalProps) => {
  const handleClose = () => {
    setIsVisible(!visible);
  };

  return (
    <Modal
      open={visible}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={handleClose}
    >
      <Paper
        sx={{
          width: { xs: "90%", md: "30%" },
          minHeight: "50%",
          p: 3,
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontWeight={700}>Sample Message</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
          {language.exampleText}
        </Typography>
      </Paper>
    </Modal>
  );
};

export default ExampleModal;
