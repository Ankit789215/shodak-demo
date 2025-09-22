import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ 
  value, 
  max = 100, 
  className = "", 
  showLabel = true,
  label,
  size = "md",
  color = "primary",
  animated = true 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizes = {
    sm: "h-2",
    md: "h-3", 
    lg: "h-4"
  };

  const colors = {
    primary: "bg-[hsl(var(--primary))]",
    success: "bg-[hsl(var(--success))]",
    warning: "bg-[hsl(var(--warning))]",
    destructive: "bg-[hsl(var(--destructive))]"
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-medium text-[hsl(var(--fg))]">
            {label || "Progress"}
          </span>
          <span className="text-[hsl(var(--muted))]">{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div className={`w-full ${sizes[size]} bg-[hsl(var(--border))] rounded-full overflow-hidden`}>
        <motion.div
          className={`${sizes[size]} ${colors[color]} rounded-full relative overflow-hidden`}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            delay: 0.1
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
