import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StatWidget = ({ 
  icon, 
  value, 
  label, 
  trend,
  trendValue,
  className = "",
  animated = true,
  delay = 0
}) => {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated) return;
    
    const timer = setTimeout(() => {
      let start = 0;
      const end = parseInt(value) || 0;
      const increment = end / 30;
      
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 50);
      
      return () => clearInterval(counter);
    }, delay * 100);
    
    return () => clearTimeout(timer);
  }, [value, animated, delay]);

  const getTrendColor = () => {
    if (!trend) return "";
    return trend === "up" ? "text-[hsl(var(--success))]" : "text-[hsl(var(--destructive))]";
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === "up" ? "↗" : "↘";
  };

  return (
    <motion.div
      className={`bg-[hsl(var(--card))] rounded-xl p-6 border border-[hsl(var(--border))] shadow-sm hover:shadow-[0_8px_30px_hsl(var(--primary)/0.08)] transition-all duration-300 ${className}`}
      initial={animated ? { opacity: 0, y: 20 } : { opacity: 1 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: delay * 0.1
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 12px 40px hsl(var(--primary) / 0.15)"
      }}
    >
      <div className="flex items-center justify-between">
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-2xl">
            {icon}
          </div>
        )}
        
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
            <span>{getTrendIcon()}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="text-3xl font-bold text-[hsl(var(--fg))] mb-1">
          {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
        </div>
        <div className="text-sm text-[hsl(var(--muted))]">{label}</div>
      </div>
    </motion.div>
  );
};

export default StatWidget;
