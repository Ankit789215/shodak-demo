import React from "react";

const Input = ({ value, onChange, onKeyPress, onKeyDown, placeholder, type = "text", className = "", ...props }) => (
  <input
    type={type}
    value={value || ""}
    onChange={(e) => onChange?.(e.target.value)}
    onKeyPress={onKeyPress}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    className={`w-full rounded-lg border border-[hsl(var(--border))] bg-white dark:bg-[hsl(var(--card))] px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-all duration-200 ${className}`}
    {...props}
  />
);

export default Input;
