import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import { quizQuestions, courses } from "../../lib/data.js";
import { clamp } from "../../lib/utils.js";

const QuizPage = ({ onSubmit }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const current = quizQuestions[step];
  const progress = Math.round(((step + 1) / quizQuestions.length) * 100);

  const select = (qid, oid) => setAnswers({ ...answers, [qid]: oid });

  const computeRecommendations = () => {
    const counts = { Science: 0, Commerce: 0, Arts: 0 };
    Object.entries(answers).forEach(([, v]) => {
      if (["maths", "science", "engineering", "lab"].includes(v)) counts.Science++;
      if (["finance", "commerce", "corporate", "operations"].includes(v)) counts.Commerce++;
      if (["arts", "media", "creative", "people", "studio"].includes(v)) counts.Arts++;
    });
    const recommendedStream = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    const recommendedCourses = courses.filter((c) => c.stream === recommendedStream).slice(0, 3).map((c) => c.name);
    const recommendedCareers = courses
      .filter((c) => c.stream === recommendedStream)
      .flatMap((c) => c.careerPaths.map((p) => p.name))
      .slice(0, 5);
    const bestCareerOption = recommendedCareers[0] || "Generalist";
    const reasoning = `Based on your choices, ${recommendedStream} aligns with your interests and strengths.`;
    return { recommendedStream, recommendedCourses, recommendedCareers, bestCareerOption, reasoning };
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[hsl(var(--bg))] via-[hsl(var(--bg)/0.98)] to-[hsl(var(--primary)/0.02)] flex flex-col items-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[hsl(var(--secondary)/0.1)] to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[hsl(var(--primary)/0.3)] rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Progress section */}
      <motion.div 
        className="w-full max-w-2xl mx-auto mt-8 mb-6 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.div 
            className="text-lg font-medium text-[hsl(var(--fg))]"
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            Question {step + 1} of {quizQuestions.length}
          </motion.div>
          <motion.div 
            className="text-lg font-medium text-[hsl(var(--muted))]"
            key={progress}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {progress}% Complete
          </motion.div>
        </div>
        
        <ProgressBar
          value={progress}
          max={100}
          showLabel={false}
          size="lg"
          animated={true}
        />
      </motion.div>

      {/* Main quiz card */}
      <motion.div 
        className="max-w-2xl w-full px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card 
          glass={true}
          className="p-8 md:p-12 backdrop-blur-xl shadow-[0_20px_80px_hsl(var(--primary)/0.1)]"
        >
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] bg-clip-text text-transparent">
              Career Aptitude Assessment
            </h2>
            <p className="text-[hsl(var(--muted))] text-lg">
              Answer honestly to get the most accurate career recommendations
            </p>
          </motion.div>

          {/* Question content with transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="mb-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            >
              <motion.div 
                className="text-2xl font-semibold mb-6 text-[hsl(var(--fg))]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {current.question}
              </motion.div>
              
              <ul className="space-y-4">
                {current.options.map((o, index) => (
                  <motion.li
                    key={o.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <motion.label 
                      className="group flex items-center gap-4 cursor-pointer text-lg p-4 rounded-xl bg-[hsl(var(--card)/0.5)] hover:bg-[hsl(var(--card)/0.8)] border border-[hsl(var(--border)/0.5)] hover:border-[hsl(var(--primary)/0.3)] transition-all duration-300"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 25px hsl(var(--primary) / 0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.input
                        type="radio"
                        name={current.id}
                        className="w-6 h-6 accent-[hsl(var(--primary))] cursor-pointer"
                        checked={answers[current.id] === o.id}
                        onChange={() => select(current.id, o.id)}
                        whileHover={{ scale: 1.1 }}
                      />
                      <span className="group-hover:text-[hsl(var(--primary))] transition-colors">
                        {o.text}
                      </span>
                    </motion.label>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <motion.div 
            className="flex justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="glass"
              size="lg"
              onClick={() => setStep(clamp(step - 1, 0, quizQuestions.length - 1))}
              disabled={step === 0}
              className="flex items-center gap-2"
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -3 }}
                className="text-xl"
              >
                ←
              </motion.span>
              Previous
            </Button>
            
            {step < quizQuestions.length - 1 ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => setStep(clamp(step + 1, 0, quizQuestions.length - 1))}
                disabled={!answers[current.id]}
                className="flex items-center gap-2"
              >
                Next
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  className="text-xl"
                >
                  →
                </motion.span>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={() => onSubmit(computeRecommendations())}
                disabled={Object.keys(answers).length < quizQuestions.length}
                className="shadow-[0_10px_40px_hsl(var(--primary)/0.3)]"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  Complete Assessment ✨
                </motion.span>
              </Button>
            )}
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default QuizPage;
