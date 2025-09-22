import React, { useState } from "react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";

const Chip = ({ children }) => (
  <span className="inline-block rounded-full bg-gray-100 px-4 py-2 text-base font-semibold text-gray-800 mr-2 mb-2">
    {children}
  </span>
);

const mentorsSeed = [
  {
    id: "m1",
    name: "Dr. Priya Sharma",
    initials: "DPS",
    rating: 4.9,
    reviews: 127,
    expertiseTags: ["Engineering Careers", "IIT Preparation", "Technology Trends"],
    experienceText: "15+ years in education and career counseling",
  },
  {
    id: "m2",
    name: "Prof. Rajesh Kumar",
    initials: "PRK",
    rating: 4.8,
    reviews: 89,
    expertiseTags: ["Medical Careers", "NEET Guidance", "Healthcare Industry"],
    experienceText: "20+ years as medical professor and counselor",
  },
  {
    id: "m3",
    name: "Ms. Anita Gupta",
    initials: "MAG",
    rating: 4.7,
    reviews: 156,
    expertiseTags: ["Commerce & Business", "MBA Preparation", "Finance Careers"],
    experienceText: "12+ years in corporate and education",
  },
  {
    id: "m4",
    name: "Dr. Arun Mehta",
    initials: "DAM",
    rating: 4.6,
    reviews: 94,
    expertiseTags: ["Arts & Humanities", "Creative Careers", "Psychology"],
    experienceText: "18+ years in arts education and counseling",
  }
];

const timeSlots = ["10:00", "11:00", "14:00", "16:00", "18:00"];

const CounsellingPage = () => {
  const mentors = mentorsSeed;
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [joinOpen, setJoinOpen] = useState(false);
  const [toast, setToast] = useState("");

  const openBooking = (mentor) => {
    setSelectedMentor(mentor);
    setModalOpen(true);
  };

  const confirmBooking = () => {
    if (!date || !time) return;
    const booking = { id: `${selectedMentor.id}-${date}-${time}`, mentor: selectedMentor, date, time };
    setBookings((b) => [...b, booking]);
    setModalOpen(false);
    setDate("");
    setTime("");
    setToast(`Session booked with ${selectedMentor.name} on ${booking.date} at ${booking.time}`);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Expert Counselling</h1>
        <p className="text-lg text-gray-500">Book one-on-one sessions with experienced career counselors and mentors</p>
      </div>
      {toast && (
        <div className="bg-green-50 text-green-800 p-3 mb-4 rounded-lg text-base font-semibold" aria-live="polite">{toast}</div>
      )}

      {/* Upcoming Sessions */}
      <Card className="mb-10 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Upcoming Sessions</h3>
        {bookings.length === 0 ? (
          <p className="text-gray-400">No sessions yet.</p>
        ) : (
          <div className="grid gap-3">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                <div className="text-lg">
                  <strong>{b.mentor.name}</strong> • {b.date} {b.time}
                </div>
                <Button onClick={() => setJoinOpen(true)} className="ml-4">Join Call</Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {mentors.map((m) => (
          <Card key={m.id} className="p-8 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-5 mb-4">
                <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 border border-gray-300">
                  {m.initials}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{m.name}</div>
                  <div className="flex items-center gap-3 text-gray-600 mt-1">
                    <span className="flex items-center gap-1">⭐ <span className="font-semibold">{m.rating}</span></span>
                    <span className="text-sm">({m.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-2">Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {m.expertiseTags.map((tag, idx) => (
                    <Chip key={idx}>{tag}</Chip>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-1">Experience</div>
                <div className="text-gray-500 text-base">{m.experienceText}</div>
              </div>
            </div>
            <Button
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl mt-2"
              onClick={() => openBooking(m)}
            >
              <span role="img" aria-label="clock">⏰</span>
              <span>Book a Session</span>
            </Button>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`Book with ${selectedMentor?.name || "Mentor"}`}>
        <div className="grid gap-4">
          <label className="flex items-center gap-3 text-lg">
            <span>Date:</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 text-lg" />
          </label>
          <div className="flex gap-3 flex-wrap">
            {timeSlots.map((t) => (
              <Button key={t}
                className={`px-4 py-2 ${time === t ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} rounded-lg font-semibold`}
                onClick={() => setTime(t)}
              >
                {t}
              </Button>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-2">
            <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
              onClick={confirmBooking} disabled={!date || !time}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Join session modal */}
      <Modal open={joinOpen} onClose={() => setJoinOpen(false)} title="Join Session">
        <p className="text-lg mb-4">
          You are about to join the call. Meeting link:{" "}
          <a href="https://zoom.us/j/123456789" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">
            https://zoom.us/j/123456789
          </a>
        </p>
        <div className="flex justify-end">
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold" onClick={() => setJoinOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CounsellingPage;
