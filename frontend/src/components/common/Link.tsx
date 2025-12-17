import React from "react";
import { Link as RouterLink, type LinkProps } from "react-router-dom";

interface CustomLinkProps extends LinkProps {
  variant?: "primary" | "secondary" | "muted";
  className?: string;
}

const Link: React.FC<CustomLinkProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "text-purple-600 hover:text-purple-700 font-medium hover:underline",
    secondary: "text-blue-600 hover:text-blue-700 hover:underline",
    muted: "text-gray-600 hover:text-gray-800 hover:underline",
  };

  return (
    <RouterLink
      className={`transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Link;