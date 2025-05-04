import { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";

const alignClasses = {
  center: "top-4 left-1/2 transform -translate-x-1/2",
};

const iconsComponents = {
  success: <CheckCircleOutlineIcon className="w-8 h-8 text-emerald-600" />,
  warning: <WarningAmberIcon className="w-8 h-8 text-rose-600" />,
};

const variantClasses = {
  success: "bg-green-100 border-green-500 text-green-800",
  danger: "bg-red-100 border-red-500 text-red-800",
};

interface AlertProps {
  variant: "success" | "danger"; // только два варианта
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  align?: "center";
}

const Alert: React.FC<AlertProps> = ({
  variant,
  isOpen,
  onClose,
  icon,
  title,
  subtitle,
  align = "center",
}) => {
  const iconVariant =
    icon ?? iconsComponents[variant as keyof typeof iconsComponents];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`inline-flex transform-gpu transition-transform duration-500 ease-in-out items-center
         ${variantClasses[variant]} ${alignClasses[align]}
        ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-96 opacity-0"}
         fixed z-50 w-[38rem] px-6 py-4 rounded-lg shadow-lg border-2`}
        role="alert"
      >
        {iconVariant && (
          <div id="icon" className="mr-4">
            {iconVariant}
          </div>
        )}
        <div className="flex flex-col">
          {title && (
            <h3 className="font-bold text-lg text-zinc-900">{title}</h3>
          )}
          {subtitle && <p className="text-md text-zinc-700 mt-1">{subtitle}</p>}
        </div>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          <HighlightOffSharpIcon className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default Alert;
