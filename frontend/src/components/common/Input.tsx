import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: IconType;
  rightIcon?: IconType;
  onRightIconClick?: () => void;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon: Icon,
      rightIcon: RightIcon,
      onRightIconClick,
      helperText,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon size={20} />
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-4 py-3 
              ${Icon ? "pl-11" : ""} 
              ${RightIcon ? "pr-11" : ""}
              border rounded-lg 
              transition-all duration-200
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              }
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              disabled:bg-gray-100 disabled:cursor-not-allowed
              placeholder:text-gray-400
              ${className}
            `}
            {...props}
          />

          {RightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RightIcon size={20} />
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
