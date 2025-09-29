import React, { useEffect, useState } from "react";

import AppHeader from "./components/layout/AppHeader.jsx";
import MainSidebar from "./components/layout/MainSidebar.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import QuizPage from "./pages/quiz/QuizPage.jsx";
import QuizResultsPage from "./pages/quiz/QuizResultsPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import CollegesPage from "./pages/CollegesPage.jsx";
import TimelinePage from "./pages/TimelinePage.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";
import CounsellingPage from "./pages/CounsellingPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const wrap = (children) => (
    <div className="min-h-screen flex">
      {authed && <MainSidebar open={sidebarOpen} current={page} onNavigate={setPage} />}
      <div className={`flex-1 grid ${authed ? 'grid-rows-[auto_1fr]' : 'grid-rows-1'}`}>
        {authed && (
          <AppHeader onMenu={() => setSidebarOpen((s) => !s)} onThemeToggle={() => setDark((d) => !d)} isDark={dark} />
        )}
        <main className="p-4 w-full max-w-screen-xl mx-auto">{children}</main>
      </div>
    </div>
  );

  if (!authed)
    return wrap(
      <LandingPage
        onGetStarted={() => {
          setAuthed(true);
          setPage("dashboard");
        }}
        onExploreCourses={() => {
          setAuthed(true);
          setPage("courses");
        }}
      />
    );

  return wrap(
    <>
      {page === "dashboard" && <DashboardPage onQuickLink={setPage} recommendations={quizResults} />}
      {page === "quiz" && (
        <QuizPage
          onSubmit={(res) => {
            setQuizResults(res);
            setPage("quiz-results");
          }}
        />
      )}
      {page === "quiz-results" && quizResults && <QuizResultsPage results={quizResults} />}
      {page === "courses" && <CoursesPage />}
      {page === "colleges" && <CollegesPage />}
      {page === "timeline" && <TimelinePage />}
      {page === "resources" && <ResourcesPage />}
      {page === "counselling" && <CounsellingPage />}
      {page === "profile" && <ProfilePage />}
    </>
  );
}

export default App;
