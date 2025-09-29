import React, { useEffect, useState } from "react";
import Button from "./ui/Button.jsx";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <Button variant="secondary" onClick={toggle} aria-label="Toggle theme" title="Toggle theme">
      <span className="text-base">{dark ? "🌙" : "☀️"}</span>
    </Button>
  );
};

export default ThemeToggle;
