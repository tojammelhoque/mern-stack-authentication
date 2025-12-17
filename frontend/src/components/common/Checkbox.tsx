import React, { type InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div>
        <label className="flex items-center cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            className={`
              w-5 h-5 rounded border-2 
              text-purple-600 
              focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              transition-all
              ${error ? "border-red-500" : "border-gray-300"}
              ${className}
            `}
            {...props}
          />
          {label && (
            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;