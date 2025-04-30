"use client";

import React from "react";

interface ModalInfoProps {
  title: string;
  description: string;
  onClose: () => void;
};

const ModalInfo: React.FC<ModalInfoProps> = ({
  title,
  description,
  onClose,
}) => {
  
  const handleClickOutside = (event: React.MouseEvent) => {
    if ((event.target as Element).classList.contains("modal-overlay")) {
      onClose(); // Закрываем окно при клике на фон
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 modal-overlay bg-opacity-20"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-6 rounded-xl w-[90%] sm:w-[400px] text-center border border-gray-300">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        <button
          onClick={onClose}
          className="bg-gray-800 cursor-pointer text-white px-4 py-2 rounded-xl w-full hover:bg-gray-900 transition"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ModalInfo;
