import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import StatWidget from "../../components/ui/StatWidget.jsx";

const QuizResultsPage = ({ results, onRetake, onExploreMore }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[hsl(var(--bg))] via-[hsl(var(--bg)/0.95)] to-[hsl(var(--primary)/0.03)] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Celebration background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-[hsl(var(--primary)/0.15)] via-[hsl(var(--accent)/0.1)] to-transparent rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-[hsl(var(--success)/0.1)] to-transparent rounded-full blur-3xl"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating celebration particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[hsl(var(--primary)/0.6)] rounded-full"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${15 + (i * 6)}%`,
            }}
            animate={{
              y: [-30, -50, -30],
              x: [-10, 10, -10],
              scale: [1, 2, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3 + (i * 0.3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header with celebration */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="text-6xl mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            🎉
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
              Your Career Path Revealed!
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-[hsl(var(--muted))] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Based on your responses, we've identified the perfect career matches for your unique talents and interests.
          </motion.p>
        </motion.div>

        {/* Key Results */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-8 h-full text-center" glass={true} hover={true}>
              <motion.div 
                className="text-5xl mb-4"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                🎯
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--fg))]">Your Perfect Stream</h3>
              <motion.div 
                className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              >
                {results.recommendedStream}
              </motion.div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="p-8 h-full text-center" glass={true} hover={true}>
              <motion.div 
                className="text-5xl mb-4"
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ⭐
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--fg))]">Top Career Match</h3>
              <motion.div 
                className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] bg-clip-text text-transparent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              >
                {results.bestCareerOption}
              </motion.div>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-8 mb-8" glass={true} hover={true}>
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className="text-4xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                📚
              </motion.div>
              <h3 className="text-2xl font-semibold text-[hsl(var(--fg))]">Recommended Courses</h3>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              {results.recommendedCourses.map((course, index) => (
                <motion.div
                  key={course}
                  className="p-4 rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.05)] border border-[hsl(var(--border)/0.5)] hover:border-[hsl(var(--primary)/0.3)] transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px hsl(var(--primary) / 0.15)"
                  }}
                >
                  <div className="font-semibold text-[hsl(var(--fg))]">{course}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className="text-4xl"
                animate={{ 
                  y: [-3, 3, -3],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                💼
              </motion.div>
              <h3 className="text-2xl font-semibold text-[hsl(var(--fg))]">Career Opportunities</h3>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {results.recommendedCareers.map((career, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(var(--card)/0.5)] hover:bg-[hsl(var(--card)/0.8)] border border-[hsl(var(--border)/0.3)] hover:border-[hsl(var(--primary)/0.3)] transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <motion.span 
                    className="text-xl"
                    whileHover={{ scale: 1.2 }}
                  >
                    →
                  </motion.span>
                  <span className="font-medium text-[hsl(var(--fg))]">{career}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[hsl(var(--primary)/0.08)] to-[hsl(var(--accent)/0.05)] border border-[hsl(var(--border)/0.5)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-start gap-3">
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                >
                  💡
                </motion.span>
                <div>
                  <h4 className="font-semibold text-[hsl(var(--fg))] mb-2">Why This Match?</h4>
                  <p className="text-[hsl(var(--muted))] leading-relaxed">{results.reasoning}</p>
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            size="xl"
            onClick={onExploreMore}
            className="group"
          >
            <span>Explore Detailed Courses</span>
            <motion.span 
              className="ml-2"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Button>
          
          <Button
            variant="glass"
            size="xl"
            onClick={onRetake}
          >
            <motion.span 
              className="mr-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🔄
            </motion.span>
            Retake Assessment
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuizResultsPage;
