import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import Input from "../common/Input";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showPasswordStrength?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = "Password", showPasswordStrength = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        label={label}
        icon={FiLock}
        rightIcon={showPassword ? FiEyeOff : FiEye}
        onRightIconClick={() => setShowPassword(!showPassword)}
        autoComplete="current-password"
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
