import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button.jsx";

const IconButton = ({ label, onClick, children }) => (
  <Button variant="ghost" onClick={onClick} aria-label={label} className="h-9 w-9 p-0 rounded-full">
    {children}
  </Button>
);

const MenuItem = ({ icon, children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[hsl(var(--primary)/0.06)] rounded-[var(--radius)]"
  >
    <span className="text-base">{icon}</span>
    <span className="text-sm font-medium">{children}</span>
  </button>
);

const AppHeader = ({ onMenu, onThemeToggle, isDark, onProfile, onSettings, onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] flex items-center justify-between px-4 h-14">
      <div className="flex items-center gap-2">
        <IconButton label="Toggle sidebar" onClick={onMenu}>☰</IconButton>
        <strong className="text-base md:text-lg">Career Guidance Dashboard</strong>
      </div>
      <div className="flex items-center gap-1.5" ref={menuRef}>
        <IconButton label="Notifications">🔔</IconButton>
        <IconButton label="Toggle theme" onClick={onThemeToggle}>{isDark ? "🌙" : "🌞"}</IconButton>
        <div className="relative ml-1 flex items-center gap-2 pl-3">
          <button
            className="w-9 h-9 rounded-full bg-[hsl(var(--border))] grid place-items-center text-sm font-semibold"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            RS
          </button>
          {open && (
            <div
              role="menu"
              className="absolute right-0 top-11 w-60 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-soft rounded-xl p-2 animate-in"
            >
              <div className="px-3 py-2 rounded-[var(--radius)]">
                <div className="text-sm font-semibold">Rahul Sharma</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">rahul.sharma@email.com</div>
              </div>
              <div className="my-1 h-px bg-[hsl(var(--border))]" />
              <MenuItem icon="👤" onClick={() => (onProfile ? onProfile() : console.log("profile"))}>Profile</MenuItem>
              <MenuItem icon="⚙️" onClick={() => (onSettings ? onSettings() : console.log("settings"))}>Settings</MenuItem>
              <div className="my-1 h-px bg-[hsl(var(--border))]" />
              <MenuItem icon="↩️" onClick={() => (onLogout ? onLogout() : console.log("logout"))}>Log out</MenuItem>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
