import React, { useEffect, useMemo, useState } from "react";
import Card from "./ui/Card.jsx";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import { courses as COURSES, colleges as COLLEGES } from "../lib/data.js";

// Lightweight NLP helpers (no new deps)
const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
const tokens = (s) => Array.from(new Set(norm(s).split(" ").filter(Boolean)));
const overlap = (a, b) => a.filter((t) => b.includes(t));

// LocalStorage helpers
const loadJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const saveJSON = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* ignore */
  }
};

// Feedback keys
const FEEDBACK_KEY = "disha_feedback_v1"; // array of {q, a, intent, entityType, entityId, helpful, comment, ts}
const BOOSTS_KEY = "disha_token_boosts_v1"; // { entityType: { entityId: { token: score } } }

const ensureBoostsShape = (obj) => obj || { course: {}, college: {} };

const Chatbot = () => {
  const [history, setHistory] = useState([]); // {role, text, meta?}
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState(() => loadJSON(FEEDBACK_KEY, []));
  const [boosts, setBoosts] = useState(() => ensureBoostsShape(loadJSON(BOOSTS_KEY, {})));

  useEffect(() => saveJSON(FEEDBACK_KEY, feedback), [feedback]);
  useEffect(() => saveJSON(BOOSTS_KEY, boosts), [boosts]);

  const courseIndex = useMemo(() => COURSES.map((c) => ({
    id: c.id,
    name: c.name,
    stream: c.stream,
    text: norm([c.name, c.stream, c.description, ...(c.careerPaths?.map((p) => p.name) || [])].join(" ")),
    raw: c,
  })), []);

  const collegeIndex = useMemo(() => COLLEGES.map((c) => ({
    id: c.id,
    name: c.name,
    city: c.city,
    state: c.state,
    text: norm([c.name, c.city, c.state, c.eligibility, ...(c.courses || [])].join(" ")),
    raw: c,
  })), []);

  const tokenBoost = (entityType, entityId, qTokens) => {
    const b = ensureBoostsShape(boosts);
    const map = b[entityType]?.[entityId] || {};
    return qTokens.reduce((acc, t) => acc + (map[t] || 0), 0);
  };

  const scoreEntity = (q, idxItem, entityType) => {
    const qt = tokens(q);
    const it = tokens(idxItem.text + " " + idxItem.name);
    const hit = overlap(qt, it).length;
    const nameHit = overlap(qt, tokens(idxItem.name)).length;
    // base score from overlaps; slightly prioritize name hits
    let score = hit + nameHit * 1.5;
    // apply learned boosts
    score += tokenBoost(entityType, idxItem.id, qt) * 0.5;
    return score;
  };

  const findBestCourse = (q) => {
    const scored = courseIndex
      .map((it) => ({ it, s: scoreEntity(q, it, "course") }))
      .sort((a, b) => b.s - a.s);
    return scored[0]?.s > 0 ? scored[0].it : null;
  };

  const findBestCollege = (q) => {
    const scored = collegeIndex
      .map((it) => ({ it, s: scoreEntity(q, it, "college") }))
      .sort((a, b) => b.s - a.s);
    return scored[0]?.s > 0 ? scored[0].it : null;
  };

  const recordFeedback = ({ q, a, intent, entityType, entityId, helpful, comment }) => {
    setFeedback((prev) => [
      ...prev,
      { q: norm(q), a, intent, entityType, entityId, helpful, comment: comment || "", ts: Date.now() },
    ]);
    // update boosts: positive feedback reinforces tokens for that entity; negative reduces
    if (entityType && entityId) {
      const qt = tokens(q);
      setBoosts((prev) => {
        const next = ensureBoostsShape({ ...prev });
        next[entityType] = next[entityType] || {};
        next[entityType][entityId] = next[entityType][entityId] || {};
        qt.forEach((t) => {
          const cur = next[entityType][entityId][t] || 0;
          next[entityType][entityId][t] = cur + (helpful ? 1 : -1);
        });
        return next;
      });
    }
  };

  const formatCourseAnswer = (c, kind) => {
    if (!c) return "I couldn't match a specific course. Could you mention the course name?";
    const cc = c.raw;
    switch (kind) {
      case "details":
        return `${cc.icon} ${cc.name} — ${cc.description} Popular roles: ${cc.careerPaths.map((p) => p.name).join(", ")}. Entry packages: ${cc.packages.entry}; experienced: ${cc.packages.experienced}.`;
      case "exams":
        return `${cc.icon} For ${cc.name}, relevant exams include: ${cc.govExams.join(", ")}.`;
      case "careers":
        return `${cc.icon} Careers after ${cc.name}: ${cc.careerPaths.map((p) => p.name + " " + p.icon).join(", ")}. Growth: ${cc.careerGrowth}`;
      case "companies":
        return `${cc.icon} Top companies hiring for ${cc.name}: ${cc.topCompanies.join(", ")}.`;
      default:
        return `${cc.icon} ${cc.name}: ${cc.description}`;
    }
  };

  const formatCollegeAnswer = (c, kind) => {
    if (!c) return "I couldn't match a specific college. Try including the college or city name.";
    const cc = c.raw;
    switch (kind) {
      case "eligibility":
        return `🎓 ${cc.name} (${cc.city}, ${cc.state}) — Eligibility/entrance: ${cc.eligibility}. Offered courses: ${cc.courses.join(", ")}.`;
      case "courses":
        return `🎓 ${cc.name} offers: ${cc.courses.join(", ")}. Eligibility: ${cc.eligibility}.`;
      case "location":
        return `📍 ${cc.name} is in ${cc.city}, ${cc.state}. Facilities: ${cc.facilities}.`;
      default:
        return `🎓 ${cc.name} — Courses: ${cc.courses.join(", ")}. Eligibility: ${cc.eligibility}.`;
    }
  };

  const detectIntent = (q) => {
    const nq = norm(q);
    const qt = tokens(nq);
    const has = (w) => nq.includes(w);

    // greetings/help
    if (qt.some((t) => ["hi", "hello", "hey"].includes(t)) || has("help")) {
      return { intent: "greet" };
    }

    // course-focused
    if (has("course") || has("b.tech") || has("bcom") || has("mbbs") || has("engineering") || has("computer science")) {
      if (has("exam") || has("entrance") || has("jee") || has("neet") || has("gate")) return { intent: "course_exams" };
      if (has("career") || has("job") || has("scope") || has("roles")) return { intent: "course_careers" };
      if (has("company") || has("companies")) return { intent: "course_companies" };
      return { intent: "course_details" };
    }

    // college-focused
    if (has("college") || has("iit") || has("aiims") || has("srcc") || has("nlsiu")) {
      if (has("eligibility") || has("exam") || has("entrance")) return { intent: "college_eligibility" };
      if (has("course") || has("courses")) return { intent: "college_courses" };
      if (has("where") || has("location") || has("city") || has("state")) return { intent: "college_location" };
      if (has("top") || has("best")) return { intent: "top_colleges" };
      return { intent: "college_general" };
    }

    // top recommendations by stream/interest
    if (has("recommend") || has("suggest") || has("best")) {
      return { intent: "recommend_courses" };
    }

    // exams generic
    if (has("exam") || has("entrance")) {
      return { intent: "exams_overview" };
    }

    return { intent: "unknown" };
  };

  const answer = (q) => {
    const { intent } = detectIntent(q);
    let entity = null;
    let text = "";
    let entityType = null;

    // Use previous negative feedback to avoid repeating same answer verbatim
    const prevNeg = feedback.filter((f) => f.helpful === false && f.q === norm(q)).slice(-1)[0];

    if (intent.startsWith("course_")) {
      entity = findBestCourse(q);
      entityType = "course";
      if (intent === "course_exams") text = formatCourseAnswer(entity, "exams");
      else if (intent === "course_careers") text = formatCourseAnswer(entity, "careers");
      else if (intent === "course_companies") text = formatCourseAnswer(entity, "companies");
      else text = formatCourseAnswer(entity, "details");
    } else if (intent.startsWith("college_")) {
      entity = findBestCollege(q);
      entityType = "college";
      if (intent === "college_eligibility") text = formatCollegeAnswer(entity, "eligibility");
      else if (intent === "college_courses") text = formatCollegeAnswer(entity, "courses");
      else if (intent === "college_location") text = formatCollegeAnswer(entity, "location");
      else text = formatCollegeAnswer(entity, "general");
    } else if (intent === "top_colleges") {
      // heuristic: filter by city/state if mentioned
      const nq = norm(q);
      const cityOrState = COLLEGES.filter((c) => nq.includes(norm(c.city)) || nq.includes(norm(c.state)));
      const list = (cityOrState.length ? cityOrState : COLLEGES).slice(0, 3).map((c) => c.name).join(", ");
      text = `Top colleges to explore${cityOrState.length ? " in your region" : ""}: ${list}.`;
    } else if (intent === "recommend_courses") {
      // basic stream/interest based suggestions
      const nq = norm(q);
      let picks = COURSES;
      if (nq.includes("science")) picks = COURSES.filter((c) => c.stream === "Science");
      if (nq.includes("commerce")) picks = COURSES.filter((c) => c.stream === "Commerce");
      if (nq.includes("arts") || nq.includes("humanities")) picks = COURSES.filter((c) => c.stream === "Arts");
      const names = picks.slice(0, 3).map((c) => c.name).join(", ");
      text = `Based on your interests, consider: ${names}. Ask about any to see exams, careers, or packages.`;
    } else if (intent === "exams_overview") {
      text = "Common entrance exams by stream — Science: JEE, NEET; Commerce: CUET, CA Foundation; Arts: CUET, CLAT (for law). Ask about a specific course or college for details.";
    } else if (intent === "greet") {
      text = "Hi! I'm Disha. Ask me about specific courses (e.g., 'exams for MBBS') or colleges (e.g., 'eligibility for IIT Bombay').";
    } else {
      text = "I can help with courses, colleges, exams, and careers. Try: 'careers after B.Tech CSE' or 'eligibility for SRCC'.";
    }

    if (prevNeg) {
      text += " If this isn't what you were looking for, please thumbs down and tell me what to improve.";
    }

    return {
      text,
      meta: { intent, entityType, entityId: entity?.id || null },
    };
  };

  const send = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const newHistory = [...history, { role: "user", text: trimmed }];
    const bot = answer(trimmed);
    newHistory.push({ role: "assistant", text: bot.text, meta: bot.meta });
    setHistory(newHistory);
    setMessage("");
  };

  // Feedback UI handlers, tracked by message index
  const [pendingComment, setPendingComment] = useState({}); // {idx: string}
  const [voted, setVoted] = useState({}); // {idx: true}

  const onVote = (idx, helpful) => {
    const m = history[idx];
    if (!m || m.role !== "assistant" || voted[idx]) return;
    recordFeedback({
      q: history[idx - 1]?.text || "",
      a: m.text,
      intent: m.meta?.intent,
      entityType: m.meta?.entityType,
      entityId: m.meta?.entityId,
      helpful,
    });
    setVoted((s) => ({ ...s, [idx]: helpful ? "up" : "down" }));
  };

  const onSubmitComment = (idx) => {
    const comment = pendingComment[idx];
    if (!comment) return;
    const m = history[idx];
    recordFeedback({
      q: history[idx - 1]?.text || "",
      a: m.text,
      intent: m.meta?.intent,
      entityType: m.meta?.entityType,
      entityId: m.meta?.entityId,
      helpful: false,
      comment,
    });
    setPendingComment((s) => ({ ...s, [idx]: "" }));
  };

  return (
    <Card>
      <h3 className="mt-0 font-semibold">Chat with Disha</h3>
      <div className="max-h-72 overflow-auto border border-[hsl(var(--border))] rounded-lg p-2 bg-[hsl(var(--card))]">
        {history.length === 0 && (
          <div className="text-[hsl(var(--muted))]">
            Try questions like: "exams for MBBS", "careers after B.Tech CSE", "top colleges in Delhi".
          </div>
        )}
        {history.map((m, i) => (
          <div key={i} className="my-2">
            <div className="flex items-start gap-2">
              <strong className="min-w-14">{m.role === "user" ? "You" : "Disha"}:</strong>
              <span className="whitespace-pre-wrap flex-1">{m.text}</span>
            </div>
            {m.role === "assistant" && (
              <div className="ml-14 mt-1 text-xs text-[hsl(var(--muted))] flex items-center gap-2">
                <span>Helpful?</span>
                <button className="px-2 py-1 rounded border border-[hsl(var(--border))] hover:bg-[hsl(var(--bg))]" onClick={() => onVote(i, true)} disabled={!!voted[i]}>👍</button>
                <button className="px-2 py-1 rounded border border-[hsl(var(--border))] hover:bg-[hsl(var(--bg))]" onClick={() => onVote(i, false)} disabled={!!voted[i]}>👎</button>
                {voted[i] === "down" && (
                  <div className="flex items-center gap-2 ml-2 w-full">
                    <Input className="text-xs" value={pendingComment[i] || ""} onChange={(v) => setPendingComment((s) => ({ ...s, [i]: v }))} placeholder="What was missing? (optional)" />
                    <Button variant="secondary" className="text-xs" onClick={() => onSubmitComment(i)}>Submit</Button>
                  </div>
                )}
                {voted[i] === "up" && <span className="text-[hsl(var(--success,120,70%,40%))]">Thanks!</span>}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <Input value={message} onChange={setMessage} placeholder="Type your message..." />
        <Button onClick={send}>Send</Button>
      </div>
    </Card>
  );
};

export default Chatbot;
