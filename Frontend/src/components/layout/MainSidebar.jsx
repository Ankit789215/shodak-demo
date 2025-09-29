import React from "react";

const items = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "quiz", label: "Career Quiz", icon: "🧠" },
  { key: "courses", label: "Courses", icon: "📘" },
  { key: "colleges", label: "Colleges", icon: "🏫" },
  { key: "timeline", label: "Timeline", icon: "🗓️" },
  { key: "resources", label: "Resources", icon: "📚" },
  { key: "counselling", label: "Counselling", icon: "👩‍🏫" },
  { key: "profile", label: "Profile", icon: "👤" },
];

const MainSidebar = ({ open, current, onNavigate }) => (
  <aside className={`sticky top-0 h-screen bg-[hsl(var(--card))] border-r border-[hsl(var(--border))] ${open ? 'w-64' : 'w-20'} transition-[width]`}>
    {/* Brand */}
    <div className="h-14 flex items-center gap-3 px-3 border-b border-[hsl(var(--border))]">
      <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] text-white grid place-items-center">🎯</div>
      {open && <div className="font-semibold">Disha Darshan</div>}
    </div>

    {/* Section label */}
    {open && <div className="px-4 pt-3 pb-1 text-xs uppercase tracking-wide text-[hsl(var(--muted))]">Navigation</div>}

    {/* Navigation */}
    <nav aria-label="Main Navigation">
      <ul className="py-1">
        {items.map((item) => {
          const isActive = current === item.key;
          return (
            <li key={item.key}>
              <button
                onClick={() => onNavigate(item.key)}
                className={`group mx-2 my-0.5 w-[calc(100%-1rem)] flex items-center gap-3 px-3 py-2.5 text-left rounded-lg 
                ${isActive ? 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.35)]' : 'hover:bg-[hsl(var(--primary)/0.08)] border border-transparent'}`}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
              >
                <span className="w-6 text-center">{item.icon}</span>
                {open && <span className="truncate">{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  </aside>
);

export default MainSidebar;
