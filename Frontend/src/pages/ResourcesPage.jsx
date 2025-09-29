import React, { useMemo, useState } from "react";
import Card from "../components/ui/Card.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { resources } from "../lib/data.js";

// Enhanced Tag Pill Component with animation
const Pill = ({ children, delay = 0 }) => (
  <span 
    className="inline-flex items-center rounded-full bg-[hsl(var(--card)/0.8)] backdrop-blur-sm
               border border-[hsl(var(--border)/0.6)] px-3 py-1 text-sm font-medium 
               text-[hsl(var(--fg))] hover:bg-[hsl(var(--accent)/0.1)] transition-colors duration-200"
  >
    {children}
  </span>
);

const ResourcesPage = () => {
  const [q, setQ] = useState("");

  // Real-time search filtering similar to colleges
  const filtered = useMemo(() => {
    const m = q.trim().toLowerCase();
    if (!m) return resources;
    return resources.filter(
      (r) =>
        r.name.toLowerCase().includes(m) ||
        r.category.toLowerCase().includes(m) ||
        r.description.toLowerCase().includes(m) ||
        r.subjects.some((s) => s.toLowerCase().includes(m)) ||
        r.features.some((f) => f.toLowerCase().includes(m))
    );
  }, [q]);

  const renderTags = (arr, max = 3) => {
    const shown = arr.slice(0, max);
    const more = arr.length - shown.length;
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {shown.map((t, i) => (
          <Pill key={i}>{t}</Pill>
        ))}
        {more > 0 && <Pill>+{more} more</Pill>}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold leading-tight mb-2">Learning Resources</h1>
        <p className="text-lg text-gray-500 mb-7">
          Discover educational platforms and resources for your learning journey
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">🔎</span>
          <Input
            value={q}
            onChange={setQ}
            placeholder="Search resources, subjects, or categories..."
            className="pl-10 text-lg rounded-xl border border-gray-300"
          />
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((r) => (
          <Card key={r.id} className="bg-gray-50 rounded-2xl shadow-md p-8 flex flex-col gap-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{r.name}</h3>
              <span className="text-2xl">{r.icon}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <span>🏷️</span>
              <span className="font-semibold">{r.category}</span>
              <span className="ml-auto text-sm font-semibold px-3 py-0.5 rounded-full bg-green-100 text-green-700">
                {r.type}
              </span>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {r.description}
            </p>

            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <span>📚</span>
                <span>Subjects</span>
              </div>
              {renderTags(r.subjects)}
            </div>

            <div>
              <div className="flex items-center gap-2 font-semibold mb-2">
                <span>⭐</span>
                <span>Features</span>
              </div>
              {renderTags(r.features)}
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span className="font-semibold">{r.rating}/5</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {r.level.map((l, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <Button 
                className="w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-xl"
                onClick={() => window.open(r.url, "_blank")}
              >
                Visit Resource
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && q.trim() && (
        <div className="text-center py-12">
          <span className="text-4xl mb-4 block">🔍</span>
          <h3 className="text-xl font-semibold mb-2">No resources found</h3>
          <p className="text-gray-500">Try searching with different keywords or browse all resources</p>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
