import React from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

const LandingPage = ({ onGetStarted, onExploreCourses }) => (
  <div className="min-h-screen">
    {/* Animated Background */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[hsl(var(--primary)/0.1)] via-transparent to-[hsl(var(--accent)/0.05)]"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    </div>

    {/* Top bar */}
    <motion.header 
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-lg bg-[hsl(var(--bg)/0.8)] border-b border-[hsl(var(--border)/0.5)]"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <motion.div 
        className="flex items-center gap-2 text-xl font-semibold"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.span 
          className="text-[hsl(var(--primary))] text-2xl"
          animate={{ 
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          🎓
        </motion.span>
        <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
          Disha Darshan
        </span>
      </motion.div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button 
          size="lg" 
          variant="glass" 
          onClick={onGetStarted}
        >
          Go to Dashboard
        </Button>
      </div>
    </motion.header>

    {/* Hero */}
    <section className="relative px-6 pt-20 pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="mt-0 text-4xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover Your Perfect{" "}
            <motion.span 
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Career Path
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p 
          className="mt-5 text-[hsl(var(--muted))] text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Get personalized career guidance through AI-powered aptitude tests, explore detailed course information,
          connect with expert mentors, and make informed decisions about your future.
        </motion.p>

        <motion.div 
          className="mt-8 flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Button 
            size="xl" 
            onClick={onGetStarted}
            className="group"
          >
            <span>Get Started</span>
            <motion.span 
              className="ml-2 inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Button>
          <Button 
            size="xl" 
            variant="glass" 
            onClick={onExploreCourses}
            className="group"
          >
            <motion.span 
              className="mr-2 inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ▶
            </motion.span>
            <span>Explore Courses</span>
          </Button>
        </motion.div>
      </div>

      {/* Showcase placeholder */}
      <motion.div 
        className="max-w-5xl mx-auto mt-16 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
      >
        <Card 
          className="p-8 overflow-hidden" 
          glass={true}
          hover={true}
        >
          <motion.div 
            className="rounded-xl min-h-[280px] grid place-items-center bg-gradient-to-br from-[hsl(var(--primary)/0.05)] to-[hsl(var(--accent)/0.05)] border border-[hsl(var(--border)/0.5)] relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Floating elements */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[hsl(var(--primary)/0.4)] rounded-full"
                  style={{
                    left: `${20 + (i * 12)}%`,
                    top: `${20 + (i * 8)}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
            
            <div className="text-center relative z-10">
              <motion.div 
                className="text-6xl mb-4"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                📊
              </motion.div>
              <motion.p 
                className="text-[hsl(var(--muted))] text-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Your personalized roadmap preview will appear here
              </motion.p>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </section>

    {/* Features */}
    <section className="px-6 pb-16">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Everything You Need for Career Success
          </h2>
          <p className="text-[hsl(var(--muted))] text-lg max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and guidance you need to make informed decisions
            about your educational and career journey.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            {
              icon: "🧠",
              title: "Course & Career Matching",
              description: "Take our comprehensive aptitude quiz powered by AI to discover courses and careers that match your interests, skills, and personality.",
              delay: 0
            },
            {
              icon: "🧭", 
              title: "Career Path Explorer",
              description: "Explore detailed information about different careers, including salary ranges, growth prospects, required skills, and top companies.",
              delay: 0.2
            },
            {
              icon: "👥",
              title: "Expert Counselling", 
              description: "Book one-on-one sessions with experienced career counselors and mentors who can provide personalized guidance for your future.",
              delay: 0.4
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: feature.delay,
                type: "spring",
                stiffness: 100
              }}
            >
              <Card 
                className="text-left p-8 min-h-[240px] group cursor-pointer" 
                hover={true}
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.1)] flex items-center justify-center text-3xl"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2))"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="mt-0 text-xl font-semibold text-[hsl(var(--fg))] group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[hsl(var(--muted))] text-base leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="px-6 py-10 border-t border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[hsl(var(--muted-foreground))]">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-[hsl(var(--primary))]">🎓</span>
          <span>Disha Darshan</span>
        </div>
        <div className="flex items-center gap-6">
          <a className="hover:underline" href="#">Privacy Policy</a>
          <a className="hover:underline" href="#">Terms of Service</a>
          <a className="hover:underline" href="#">Contact Us</a>
        </div>
        <div>© {new Date().getFullYear()} Disha Darshan. All rights reserved.</div>
      </div>
    </footer>
  </div>
);

export default LandingPage;
