import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

interface PasswordStrengthMeterProps {
  password: string;
}

interface Criteria {
  label: string;
  met: boolean;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const criteria: Criteria[] = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains number", met: /\d/.test(password) },
    {
      label: "Contains special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const strength = criteria.filter((c) => c.met).length;

  const getStrengthText = () => {
    if (strength === 0) return { text: "", color: "" };
    if (strength <= 2) return { text: "Weak", color: "text-red-500" };
    if (strength <= 3) return { text: "Fair", color: "text-yellow-500" };
    if (strength <= 4) return { text: "Good", color: "text-blue-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const getStrengthColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const strengthInfo = getStrengthText();

  if (!password) return null;

  return (
    <div className="mt-4 space-y-3">
      {/* Strength Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Password Strength
          </span>
          <span className={`text-sm font-semibold ${strengthInfo.color}`}>
            {strengthInfo.text}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Criteria List */}
      <div className="space-y-2">
        {criteria.map((criterion, index) => (
          <div key={index} className="flex items-center gap-2">
            {criterion.met ? (
              <FiCheck className="text-green-500 shrink-0" size={16} />
            ) : (
              <FiX className="text-gray-400 shrink-0" size={16} />
            )}
            <span
              className={`text-sm ${
                criterion.met ? "text-green-600" : "text-gray-500"
              }`}
            >
              {criterion.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
