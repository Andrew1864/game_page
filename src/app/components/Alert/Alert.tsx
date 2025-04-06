import { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";

const alignClasses = {
  center: "left-1/2 transform -translate-x-1/2",
};

const iconsComponents = {
  success: <CheckCircleOutlineIcon className="w-6 h-6 text-emerald-600" />,
  warning: <WarningAmberIcon className="w-6 h-6 text-rose-600" />,
};

const variantClasses = {
  success: "bg-green-100 border-green-500 text-green-700",
  danger: "bg-red-100 border-red-500 text-red-700",
};

interface alertProps {
  variant: "success" | "danger"; // только два варианта
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  align?: "center"; 
};

const Alert: React.FC<alertProps> = ({
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
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`inline-flex transform-gpu transition-transform duration-500 ease-in-out items-center
         ${variantClasses[variant]} ${alignClasses[align]}
        ${isOpen ? "translate-y-0" : "translate-y-96"}
         fixed bottom-4 z-10 w-[28rem] px-3 py-2 rounded-md shadow-md`}
        role="alert"
      >
        {iconVariant && <div id="icon">{iconVariant}</div>}
        <div className="ml-4 mr-4">
          {title && (
            <h3 className="font-bold text-md text-zinc-800">{title}</h3>
          )}
          {subtitle && <p className="text-md text-zinc-800">{subtitle}</p>}
        </div>
        <button onClick={onClose} className="absolute right-2 top-2">
          <HighlightOffSharpIcon className="w-6 h-6 fill-zinc-800" />
        </button>
      </div>
    </>
  );
};

export default Alert;
