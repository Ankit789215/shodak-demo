import React from "react";
import { motion } from "framer-motion";

const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  disabled, 
  className = "", 
  onMouseDown, 
  onMouseUp,
  as: Component = "button",
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.5)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  const variants = {
    primary: "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.9)] text-white border border-transparent hover:shadow-[0_8px_30px_hsl(var(--primary)/0.3)] hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-[hsl(var(--card))] text-[hsl(var(--fg))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--bg))] hover:shadow-[0_4px_20px_hsl(var(--border)/0.4)] hover:scale-[1.01] active:scale-[0.99]",
    ghost: "bg-transparent text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.08)] border border-transparent hover:scale-[1.02] active:scale-[0.98]",
    outline: "bg-transparent text-[hsl(var(--primary))] border border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white hover:shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:scale-[1.02] active:scale-[0.98]",
    destructive: "bg-gradient-to-r from-[hsl(var(--destructive))] to-[hsl(var(--destructive)/0.9)] text-white border border-transparent hover:shadow-[0_8px_30px_hsl(var(--destructive)/0.3)] hover:scale-[1.02] active:scale-[0.98]",
    glass: "bg-[hsl(var(--card)/0.7)] backdrop-blur-md text-[hsl(var(--fg))] border border-[hsl(var(--border)/0.5)] hover:bg-[hsl(var(--card)/0.9)] hover:shadow-[0_8px_30px_hsl(var(--primary)/0.15)] hover:scale-[1.02] active:scale-[0.98]"
  };

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizes[size]} ${variants[variant] ?? variants.primary} ${className}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      <span className="relative z-10">
        {children}
      </span>
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
    </MotionComponent>
  );
};

export default Button;
