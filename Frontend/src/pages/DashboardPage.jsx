
import React from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Chatbot from "../components/Chatbot.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import StatWidget from "../components/ui/StatWidget.jsx";

const QuickLinkCard = ({ icon, title, description, cta, onClick, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      delay,
      type: "spring",
      stiffness: 100,
      damping: 20
    }}
    whileHover={{ 
      scale: 1.02,
      rotateY: 2,
      rotateX: 2
    }}
    className="perspective-1000"
  >
    <Card className="p-6 h-full group cursor-pointer" hover={true} onClick={onClick}>
      <div className="flex items-start gap-3">
        <motion.div 
          className="w-12 h-12 rounded-xl grid place-items-center bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))] text-2xl"
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 8px 25px hsl(var(--primary) / 0.25)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="m-0 text-base font-semibold group-hover:text-[hsl(var(--primary))] transition-colors">{title}</h3>
          <p className="mt-1 text-sm text-[hsl(var(--muted))] leading-relaxed">{description}</p>
          <Button 
            className="mt-3 w-full group-hover:shadow-lg transition-all duration-300" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {cta}
          </Button>
        </div>
      </div>
    </Card>
  </motion.div>
);

const DashboardPage = ({ onQuickLink, recommendations }) => (
  <div className="space-y-10 md:space-y-14">
    {/* Welcome / Hero */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6 md:p-8 overflow-hidden relative" glass={true}>
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.15)] via-[hsl(var(--accent)/0.08)] to-transparent pointer-events-none" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[hsl(var(--primary)/0.6)] rounded-full"
              style={{
                left: `${10 + (i * 10)}%`,
                top: `${20 + (i * 8)}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.span 
            className="inline-flex items-center gap-2 text-xs md:text-sm text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.10)] px-3 py-1.5 rounded-full border border-[hsl(var(--border)/0.5)] backdrop-blur-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              ✨
            </motion.span>
            Your personalized dashboard
          </motion.span>
          
          <motion.h1 
            className="m-0 mt-4 text-3xl md:text-4xl font-extrabold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Welcome back, Rahul!{" "}
            <motion.span
              animate={{ 
                rotate: [0, 14, -8, 14, -4, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="inline-block origin-bottom"
            >
              👋
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-3 text-[hsl(var(--muted))] text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Continue your journey to discover the perfect career path
          </motion.p>
          
          <motion.div 
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button onClick={() => onQuickLink?.("quiz")} size="lg">
              Start Career Quiz
            </Button>
            <Button variant="glass" onClick={() => onQuickLink?.("courses")} size="lg">
              Explore Courses
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>

    {/* Profile completion */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <Card className="p-6 md:p-8" hover={true}>
        <motion.h2 
          className="m-0 text-xl md:text-2xl font-semibold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Your Profile
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <ProgressBar 
            value={75} 
            label="Profile Completion" 
            className="mt-6" 
            size="lg"
            animated={true}
          />
          <motion.p 
            className="mt-4 text-[hsl(var(--muted))]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Complete your profile to get more personalized recommendations
          </motion.p>
        </motion.div>

        {/* Quick stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatWidget
            value={8}
            label="Saved Courses"
            icon="📚"
            trend="up"
            trendValue="+3"
            delay={0}
            animated={true}
          />
          <StatWidget
            value={2}
            label="Sessions Booked"
            icon="👩‍🏫"
            trend="up" 
            trendValue="+1"
            delay={1}
            animated={true}
          />
          <StatWidget
            value={3}
            label="Upcoming Deadlines"
            icon="⏰"
            trend="down"
            trendValue="-2"
            delay={2}
            animated={true}
          />
        </div>
      </Card>
    </motion.div>

    {/* Quick Links */}
    <motion.section 
      className="space-y-4 md:space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <motion.div 
        className="flex items-end justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="m-0 text-xl md:text-2xl font-semibold">Quick Links</h2>
        <p className="m-0 text-xs md:text-sm text-[hsl(var(--muted))]">Jump to popular actions</p>
      </motion.div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-fr">
        <QuickLinkCard
          icon="🧠"
          title="Career Tests"
          description="Discover your ideal career path"
          cta="Take Quiz"
          onClick={() => onQuickLink("quiz")}
          delay={0.1}
        />
        <QuickLinkCard
          icon="📘"
          title="Courses"
          description="Explore courses and career options"
          cta="Browse"
          onClick={() => onQuickLink("courses")}
          delay={0.2}
        />
        <QuickLinkCard
          icon="👩‍🏫"
          title="Counselling"
          description="Book session with expert mentors"
          cta="Book Now"
          onClick={() => onQuickLink("counselling")}
          delay={0.3}
        />
        <QuickLinkCard
          icon="📈"
          title="Progress Tracker"
          description="Track your learning journey"
          cta="View Progress"
          onClick={() => onQuickLink("timeline")}
          delay={0.4}
        />
      </div>
    </motion.section>

    {/* AI sections */}
    <section className="grid gap-10 grid-cols-1 xl:grid-cols-3">
      <Card className="p-6 md:p-8 xl:col-span-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="m-0 text-xl md:text-2xl font-semibold">AI-Powered Recommendations</h2>
            <p className="mt-2 text-sm md:text-base text-[hsl(var(--muted))]">
              Personalized suggestions based on your profile and interests
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="m-0 text-base md:text-lg font-semibold">Recommended Courses</h3>
            <div className="mt-3 flex flex-wrap gap-2 md:gap-3">
              {(recommendations?.courses ?? ["Computer Science Engineering", "Data Science", "Artificial Intelligence"]).map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--fg))] px-3 py-1.5 text-sm md:text-base border border-[hsl(var(--border))]"
                >
                  {c} <span className="opacity-60">↗</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="m-0 text-base md:text-lg font-semibold">Career Paths</h3>
            <div className="mt-3 flex flex-wrap gap-2 md:gap-3">
              {(recommendations?.careers ?? ["Software Developer", "Data Scientist", "Machine Learning Engineer"]).map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--card))] text-[hsl(var(--fg))] px-3 py-1.5 text-sm md:text-base border border-[hsl(var(--border))]"
                >
                  {c} <span className="opacity-60">↗</span>
                </span>
              ))}
            </div>
          </div>

          <p className="text-[hsl(var(--muted))] text-sm md:text-base">
            {recommendations?.reasoning ??
              "Based on your interests in technology and problem-solving, these tech-focused paths align well with your aptitude profile."}
          </p>

          <Button className="mt-2" onClick={() => onQuickLink?.("quiz")}>
            Get Detailed Career Analysis
          </Button>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden xl:col-span-3">
        <div className="p-5 md:p-6 border-b border-[hsl(var(--border))]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <h2 className="m-0 text-xl md:text-2xl font-semibold">AI Career Assistant - Disha</h2>
            </div>
            <p className="m-0 hidden md:block text-sm text-[hsl(var(--muted))]">Ask about exams, eligibility, careers, or colleges</p>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <Chatbot />
        </div>
      </Card>
    </section>
  </div>
);

export default DashboardPage;
