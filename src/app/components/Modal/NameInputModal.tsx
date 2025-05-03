import * as React from "react";
import { useDispatch } from "react-redux";
import {
  setAchievements,
  setName,
  setProgress,
  setUserId,
  updateAchievements,
} from "@/app/slices/userSlice";
import Alert from "../Alert/Alert";
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
}

const NameInputModal: React.FC<NameInputModalProps> = ({ open, onClose }) => {
  const [name, setNameInput] = React.useState("");
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const dispatch = useDispatch(); // Используем Redux dispatch

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value); // Обновляем локальное состояние
  };

  const handleSubmit = async () => {
    if (name.trim() === "") {
      alert("Пожалуйста, введите имя.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          progress: 10,
          achievements: [
            {
              id: 1,
              title: "Написал имя",
              description: "Вы ввели имя!",
              completed: true,
            },
          ],
        }),
      });

      const newUser = await response.json();

      dispatch(setName(newUser.name));
      dispatch(updateAchievements("Написал имя"))
      dispatch(setUserId(newUser.id));
      dispatch(setProgress(newUser.progress));
      dispatch(setAchievements(newUser.achievements));
      setIsAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
      alert("Произошла ошибка при сохранении данных.");
    }
  };

  return (
    <>
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
            value={name}
            onChange={handleNameChange}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
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
      <Alert
        variant="success"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Поздравляем!"
        subtitle="Вы получили первую ачивку и +10 очков! "
      />
    </>
  );
};

export default NameInputModal;
