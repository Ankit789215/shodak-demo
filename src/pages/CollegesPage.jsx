import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Modal from "../components/ui/Modal.jsx";
import { colleges } from "../lib/data.js";
import { haversineKm } from "../lib/utils.js";

// Enhanced Tag Pill Component with animation
const Pill = ({ children, delay = 0 }) => (
  <motion.span 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3, type: "spring", stiffness: 300 }}
    className="inline-flex items-center rounded-full bg-[hsl(var(--card)/0.8)] backdrop-blur-sm
               border border-[hsl(var(--border)/0.6)] px-4 py-2 text-sm font-semibold 
               text-[hsl(var(--fg))] hover:bg-[hsl(var(--accent)/0.1)] transition-colors duration-200"
  >
    {children}
  </motion.span>
);

const CollegesPage = () => {
  const [q, setQ] = useState("");
  const [sorted, setSorted] = useState(colleges);
  const [note, setNote] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [loading, setLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const filtered = useMemo(() => {
    const m = q.trim().toLowerCase();
    if (!m) return sorted;
    return sorted.filter(
      (c) =>
        c.name.toLowerCase().includes(m) ||
        c.city.toLowerCase().includes(m) ||
        c.courses.some((x) => x.toLowerCase().includes(m))
    );
  }, [q, sorted]);

  const findNearest = async () => {
    if (!navigator.geolocation) {
      setNote("Geolocation not supported by your browser.");
      return;
    }
    
    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const withDist = [...colleges].map((c) => ({
          ...c,
          dist: haversineKm(latitude, longitude, c.lat, c.lon)
        }));
        withDist.sort((a, b) => a.dist - b.dist);
        setSorted(withDist);
        setNote("Sorted by distance from your location.");
        setLoading(false);
      },
      () => {
        setNote("Permission denied or unavailable.");
        setLoading(false);
      }
    );
  };

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
      <div>
        <h1 className="text-4xl font-extrabold leading-tight mb-2">College Directory</h1>
        <p className="text-lg text-gray-500 mb-7">
          Discover colleges and universities that match your preferences
        </p>
      </div>

      {/* Search and Nearest */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">🔎</span>
          <Input
            value={q}
            onChange={setQ}
            placeholder="Search colleges, cities, or courses..."
            className="pl-10 text-lg rounded-xl border border-gray-300"
          />
        </div>
        <Button className="flex items-center gap-2 bg-blue-600 text-white text-lg font-semibold px-5 py-2 rounded-xl" onClick={findNearest}>
          <span>📍</span>
          <span>Find Nearest</span>
        </Button>
      </div>

      {note && <div className="text-gray-500 mb-4">{note}</div>}

      {/* College Cards */}
      <div className="grid gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.id} className="bg-gray-50 rounded-2xl shadow-md p-8 flex flex-col gap-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
              <span className="text-blue-800 text-2xl">🏫</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <span>📍</span>
              <span>{c.city}, {c.state}</span>
              {c.dist != null && (
                <span className="ml-auto text-sm font-semibold px-3 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {c.dist.toFixed(1)} km
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <span>🧾</span>
                <span>Courses Offered</span>
              </div>
              {renderTags(c.courses)}
            </div>
            <div>
              <p className="text-gray-800 mb-1">
                <span className="font-bold">Eligibility:</span> {c.eligibility}
              </p>
              <p className="text-gray-800 mb-1">
                <span className="font-bold">Medium:</span> {c.medium}
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2 text-gray-700">Facilities</p>
              <div className="flex flex-wrap gap-2">
                {String(c.facilities)
                  .split(",")
                  .map((f, i) => <Pill key={i}>{f.trim()}</Pill>)}
              </div>
            </div>
            <div className="mt-3">
              <Button className="w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-xl"
                onClick={() => setSelectedCollege(c)}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* College Details Modal */}
      {selectedCollege && (
        <Modal
          open={!!selectedCollege}
          onClose={() => setSelectedCollege(null)}
          title={selectedCollege.name}
        >
          <div className="space-y-4 text-gray-800 text-base">
            <p><strong>Location:</strong> {selectedCollege.city}, {selectedCollege.state}</p>
            <p><strong>Year Founded:</strong> {selectedCollege.yearFounded || "N/A"}</p>
            <p><strong>Courses Offered:</strong> {selectedCollege.courses.join(", ")}</p>
            <p><strong>Eligibility:</strong> {selectedCollege.eligibility}</p>
            <p><strong>Medium:</strong> {selectedCollege.medium}</p>
            <p><strong>Facilities:</strong> {selectedCollege.facilities}</p>
            {selectedCollege.contactPhone && <p><strong>Phone:</strong> {selectedCollege.contactPhone}</p>}
            {selectedCollege.contactEmail && (
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${selectedCollege.contactEmail}`} className="text-blue-600 underline">
                  {selectedCollege.contactEmail}
                </a>
              </p>
            )}
            {selectedCollege.website && (
              <p>
                <strong>Website:</strong>{" "}
                <a href={selectedCollege.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {selectedCollege.website}
                </a>
              </p>
            )}
            {selectedCollege.accreditation && <p><strong>Accreditation:</strong> {selectedCollege.accreditation}</p>}
            {selectedCollege.dist != null && (
              <p><strong>Distance:</strong> {selectedCollege.dist.toFixed(1)} km</p>
            )}
            {selectedCollege.description && (
              <>
                <h4 className="mt-6 text-lg font-semibold">Description</h4>
                <p>{selectedCollege.description}</p>
              </>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setSelectedCollege(null)} className="px-5 py-2 rounded-lg bg-gray-300 text-gray-800">
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CollegesPage;
