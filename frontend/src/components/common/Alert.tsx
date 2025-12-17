import type { ReactNode } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

interface AlertProps {
  type?: "success" | "error" | "info" | "warning";
  title?: string;
  message: string | ReactNode;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  message,
  onClose,
  className = "",
}) => {
  const configs = {
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      iconColor: "text-green-500",
      Icon: FiCheckCircle,
    },
    error: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      iconColor: "text-red-500",
      Icon: FiAlertCircle,
    },
    warning: {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-500",
      Icon: FiAlertTriangle,
    },
    info: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      iconColor: "text-blue-500",
      Icon: FiInfo,
    },
  };

  const config = configs[type];
  const Icon = config.Icon;

  return (
    <div
      className={`
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border rounded-lg p-4 flex gap-3
        ${className}
      `}
      role="alert"
    >
      <Icon className={`${config.iconColor} flex-shrink-0 mt-0.5`} size={20} />
      
      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="text-sm">{message}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Close alert"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
};

export default Alert;