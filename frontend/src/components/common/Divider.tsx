import React from "react";

interface DividerProps {
  text?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, className = "" }) => {
  if (text) {
    return (
      <div className={`relative flex items-center my-6 ${className}`}>
        <div className="grow border-t border-gray-300"></div>
        <span className="shrink mx-4 text-gray-500 text-sm">{text}</span>
        <div className="grow border-t border-gray-300"></div>
      </div>
    );
  }

  return <hr className={`border-gray-300 my-6 ${className}`} />;
};

export default Divider;
