import React from "react";
import Card from "../components/ui/Card.jsx";
import { timelineEvents } from "../lib/data.js";

// Icon for each category
const iconFor = (category) => {
  switch ((category || "").toLowerCase()) {
    case "admissions":
      return (
        <span className="h-12 w-12 inline-flex rounded-xl bg-blue-50 items-center justify-center text-blue-600 text-3xl">
          🎓
        </span>
      );
    case "exams":
      return (
        <span className="h-12 w-12 inline-flex rounded-xl bg-orange-50 items-center justify-center text-orange-500 text-3xl">
          📝
        </span>
      );
    case "scholarships":
      return (
        <span className="h-12 w-12 inline-flex rounded-xl bg-green-50 items-center justify-center text-green-600 text-3xl">
          🎁
        </span>
      );
    default:
      return (
        <span className="h-12 w-12 inline-flex rounded-xl bg-gray-100 items-center justify-center text-gray-400 text-3xl">
          📅
        </span>
      );
  }
};

const Tag = ({ children }) => (
  <span className="text-base font-semibold px-4 py-2 rounded-full bg-gray-50 text-gray-900 border border-gray-200">
    {children}
  </span>
);

const TimelinePage = () => (
  <div className="max-w-6xl mx-auto py-12 px-6">
    <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Important Dates & Timeline</h1>
    <p className="text-lg text-gray-500 mb-10">
      Keep track of admissions, exams, and scholarship deadlines.
    </p>
    <div className="flex flex-col gap-8">
      {timelineEvents.map((e) => (
        <Card key={e.id} className="flex items-center px-8 py-7 bg-gray-50 rounded-2xl shadow-sm border-none">
          {/* Icon */}
          <div className="shrink-0 mr-6">{iconFor(e.category)}</div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-gray-500 text-base font-bold">
              {new Date(e.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <div className="text-xl md:text-2xl font-bold text-gray-900 mt-0.5 mb-1">
              {e.title}
            </div>
            <div className="text-lg text-gray-600 mb-2">{e.description}</div>
            {/* Detailed instructions, if wanted */}
            {/* <div className="text-gray-400 text-base">{e.details}</div> */}
          </div>
          {/* Tag */}
          <div className="ml-auto pl-6 flex items-center">
            <Tag>{e.category.charAt(0).toUpperCase() + e.category.slice(1)}</Tag>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default TimelinePage;
