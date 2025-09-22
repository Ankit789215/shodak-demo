import React from "react";
import { motion } from "framer-motion";

const Card = ({ 
  children, 
  className = "", 
  onClick, 
  glass = false,
  hover = true,
  as: Component = "div",
  ...props 
}) => {
  const baseClasses = "rounded-xl p-4 shadow-sm transition-all duration-300 border";
  
  const normalClasses = "bg-[hsl(var(--card))] border-[hsl(var(--border))]";
  const glassClasses = "bg-[hsl(var(--card)/0.7)] backdrop-blur-md border-[hsl(var(--border)/0.5)]";
  
  const hoverClasses = hover 
    ? "hover:shadow-[0_8px_40px_hsl(var(--primary)/0.12)] hover:-translate-y-1 hover:scale-[1.01]" 
    : "";
  
  const clickableClasses = onClick 
    ? "cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.5)]" 
    : "";

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      onClick={onClick}
      className={`${baseClasses} ${glass ? glassClasses : normalClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      whileHover={hover ? { y: -2, scale: 1.005 } : undefined}
      whileTap={onClick ? { scale: 0.995 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Card;
