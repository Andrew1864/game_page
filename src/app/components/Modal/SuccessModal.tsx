"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  isSuccess: boolean;
  title?: string;
  description?: string;
}

const modalRoot = typeof window !== "undefined" ? document.body : null;

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  isSuccess,
  title,
  description,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.30)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-300 hover:text-gray-600 transition"
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center gap-4">
          <div
            className="flex items-center justify-center text-5xl mb-2"
            style={{ color: isSuccess ? "#a855f7" : "#ef4444" }}
          >
            {isSuccess ? (
              <StarPurple500Icon fontSize="inherit" />
            ) : (
              <ErrorOutlineIcon fontSize="inherit" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <span className="block text-gray-400 text-sm mb-6">
            {description}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition text-base shadow-sm"
          >
            Завершить
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default SuccessModal;
