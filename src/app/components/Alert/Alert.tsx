"use client";

import { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";

const iconsComponents = {
  success: <CheckCircleOutlineIcon className="w-6 h-6 text-emerald-600" />,
  danger: <WarningAmberIcon className="w-6 h-6 text-rose-600" />,
};

const variantClasses = {
  success: "bg-green-100 border-green-500 text-green-800",
  danger: "bg-red-100 border-red-500 text-red-800",
};

interface AlertProps {
  variant: "success" | "danger";
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
}

const Alert: React.FC<AlertProps> = ({
  variant,
  isOpen,
  onClose,
  icon,
  title,
  subtitle,
}) => {
  const iconVariant = icon ?? iconsComponents[variant];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pointer-events-none">
      <div
        className={`transform-gpu transition-all duration-300 ease-in-out
          ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
          w-full max-w-md mx-auto flex items-start p-4 rounded-lg shadow-lg border-2 pointer-events-auto
          ${variantClasses[variant]}`}
        role="alert"
      >
        {/* Иконка */}
        {iconVariant && (
          <div className="mr-3 mt-0.5 flex-shrink-0">{iconVariant}</div>
        )}

        {/* Контент */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="font-bold text-base text-zinc-900 break-words">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-zinc-700 mt-1 break-words">{subtitle}</p>
          )}
        </div>

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer"
          aria-label="Закрыть уведомление"
        >
          <HighlightOffSharpIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
