import React, { useRef, useState } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";

interface VerificationCodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
  error?: string;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  length = 6,
  onComplete,
  error,
}) => {
  const [codes, setCodes] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only accept numbers
    if (!/^\d*$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value.slice(-1); // Take only the last digit
    setCodes(newCodes);

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (newCodes.every((code) => code !== "")) {
      onComplete(newCodes.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newCodes = pastedData.split("");
    while (newCodes.length < length) {
      newCodes.push("");
    }
    setCodes(newCodes.slice(0, length));

    // Focus last filled input or first empty
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    // Trigger completion if all filled
    if (pastedData.length === length) {
      onComplete(pastedData);
    }
  };

  return (
    <div>
      <div className="flex gap-2 justify-center">
        {codes.map((code, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={code}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`
              w-12 h-14 text-center text-2xl font-bold
              border-2 rounded-lg
              transition-all duration-200
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              }
              focus:outline-none focus:ring-2 focus:ring-opacity-50
            `}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 text-center flex items-center justify-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default VerificationCodeInput;