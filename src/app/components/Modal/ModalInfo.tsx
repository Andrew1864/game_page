"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalInfoProps {
  title: string;
  description: string;
  onClose: () => void;
}

const ModalInfo: React.FC<ModalInfoProps> = ({
  title,
  description,
  onClose,
}) => {
  // Для SSR: ждем, пока компонент смонтируется на клиенте
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === "undefined" || !mounted) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  // Контент модалки
  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-20 modal-overlay"
      onClick={(event) => {
        if ((event.target as Element).classList.contains("modal-overlay")) {
          onClose();
        }
      }}
    >
      <div className="bg-white p-6 rounded-xl w-[90%] sm:w-[400px] text-center border border-gray-300">
        <h2 className="text-xl text-black font-bold mb-2">{title}</h2>
        <p className="mb-4 text-gray-700">{description}</p>
        <button
          onClick={onClose}
          className="bg-gray-800 cursor-pointer text-white px-4 py-2 rounded-xl w-full hover:bg-gray-900 transition"
        >
          Закрыть
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default ModalInfo;
