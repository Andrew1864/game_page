import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "1rem", // rounded-xl
  boxShadow: 24,
  p: 4,
  textAlign: "center" as "center",
};

interface NameInputModalProps {
  open: boolean;
  onClose: () => void;
};

const NameInputModal: React.FC<NameInputModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Введите свое имя
        </Typography>
        <TextField
          id="modal-modal-input"
          label="Имя"
          variant="outlined"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            borderRadius: "1rem",
            mt: 2,
            bgcolor: "darkgrey",
            color: "white",
          }}
        >
          Подтвердить
        </Button>
      </Box>
    </Modal>
  );
};

export default NameInputModal;
