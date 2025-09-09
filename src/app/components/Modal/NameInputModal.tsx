"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import {
  setAchievements,
  setName,
  setProgress,
  setUserId,
  updateAchievements,
  showAlert,
} from "@/app/slices/userSlice";
import BASE_URL from "@/app/utils/apiConfig";

interface NameInputModalProps {
  open: boolean;
  onClose: () => void;
}

const NameInputModal: React.FC<NameInputModalProps> = ({ open, onClose }) => {
  const [name, setNameInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (name.trim() === "") return;
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      dispatch(updateAchievements("Написал имя"));
      dispatch(setUserId(newUser.id));
      dispatch(setProgress(newUser.progress));
      dispatch(setAchievements(newUser.achievements));
      dispatch(
        showAlert({
          title: "Поздравляем!",
          subtitle: "Вы получили первую ачивку и +10 очков!",
          variant: "success",
        })
      );
      onClose();
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
    }
  };

  if (!open || typeof window === "undefined" || !mounted) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 modal-overlay"
      onClick={(e) => {
        if ((e.target as Element).classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-xl">
        <h2 className="text-2xl font-bold text-black mb-4">Введите свое имя</h2>
        <input
          type="text"
          className="w-full border border-gray-700 rounded p-2 mb-4"
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
        />
        <button
          className="w-full bg-gray-800 text-white font-semibold rounded-xl py-2 hover:bg-gray-900 transition cursor-pointer"
          onClick={handleSubmit}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default NameInputModal;