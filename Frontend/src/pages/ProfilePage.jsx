import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatWidget from "../components/ui/StatWidget.jsx";

const interests = ["Technology", "Innovation", "Problem Solving"];

const ProfilePage = () => {
    const [profileCompletion, setProfileCompletion] = useState(0);
    const [hoveredStat, setHoveredStat] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProfileCompletion(75);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const floatingElements = Array.from({ length: 6 }, (_, i) => (
        <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full opacity-20"
            style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (i * 10)}%`,
            }}
            animate={{
                y: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 3 + (i * 0.5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
            }}
        />
    ));

    return (
        <div className="relative min-h-screen">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingElements}
                <motion.div
                    className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-[hsl(var(--primary)/0.03)] to-[hsl(var(--accent)/0.05)] rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-[hsl(var(--accent)/0.03)] to-[hsl(var(--primary)/0.05)] rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="max-w-5xl mx-auto py-16 px-6 relative z-10">
                <motion.h2
                    className="text-4xl font-extrabold mb-10 text-[hsl(var(--fg))] text-gradient"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                    Your Profile
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left: Personal Info Card */}
                    <motion.div
                        className="glass rounded-2xl shadow-soft p-10 flex flex-col items-center min-h-[520px] relative overflow-hidden"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 80,
                            damping: 20,
                            delay: 0.2
                        }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 20px 60px -12px hsl(var(--primary) / 0.15)"
                        }}
                    >
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[hsl(var(--primary)/0.08)] to-transparent rounded-bl-full" />

                        {/* Interactive Profile Avatar */}
                        <motion.div
                            className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full w-32 h-32 flex items-center justify-center text-5xl font-extrabold text-white mb-8 relative overflow-hidden cursor-pointer"
                            whileHover={{
                                scale: 1.1,
                                boxShadow: "0 20px 40px -12px hsl(var(--primary) / 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: 0.5
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                animate={{
                                    x: ['-100%', '200%'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                    ease: "easeInOut",
                                }}
                            />
                            RS
                        </motion.div>

                        <motion.h3
                            className="text-3xl font-bold mb-2 text-[hsl(var(--fg))]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Rahul Sharma
                        </motion.h3>

                        <motion.p
                            className="text-lg text-[hsl(var(--muted))] mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            12th Student
                        </motion.p>

                        {/* Animated Profile Completion */}
                        <motion.div
                            className="w-full mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="text-lg text-[hsl(var(--muted))] mb-2 block font-medium">
                                Profile Completion
                            </label>
                            <div className="w-full h-3 rounded-full bg-[hsl(var(--border)/0.5)] overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${profileCompletion}%` }}
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeOut",
                                        delay: 0.8
                                    }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                                        animate={{
                                            x: ['-100%', '200%'],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 4,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </motion.div>
                            </div>
                            <motion.span
                                className="text-md text-[hsl(var(--muted))] mt-2 block text-right font-semibold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                {profileCompletion}%
                            </motion.span>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            className="flex flex-col items-start w-full mt-6 text-[hsl(var(--fg))] gap-4 text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                        >
                            {[
                                { icon: "📧", text: "rahul.sharma@email.com", color: "var(--primary)" },
                                { icon: "📱", text: "+91 98765 43210", color: "var(--success)" },
                                { icon: "📍", text: "New Delhi, Delhi", color: "var(--destructive)" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center group cursor-pointer"
                                    whileHover={{ x: 5 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2 + (index * 0.1) }}
                                >
                                    <motion.div
                                        className="w-8 h-8 rounded-lg bg-[hsl(var(--card))] flex items-center justify-center mr-4 text-lg group-hover:bg-[hsl(var(--primary)/0.1)] transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {item.icon}
                                    </motion.div>
                                    <span className="group-hover:text-[hsl(var(--primary))] transition-colors">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: Academic Info Card */}
                    <motion.div
                        className="glass rounded-2xl shadow-soft p-10 min-h-[520px] relative overflow-hidden"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 80,
                            damping: 20,
                            delay: 0.4
                        }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 20px 60px -12px hsl(var(--accent) / 0.15)"
                        }}
                    >
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[hsl(var(--accent)/0.08)] to-transparent rounded-br-full" />

                        <motion.h4
                            className="text-2xl font-bold mb-3 text-[hsl(var(--fg))]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Academic Information
                        </motion.h4>

                        <motion.p
                            className="text-lg text-[hsl(var(--muted))] mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            Your current academic status and educational background
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                        >
                            {["12th", "CBSE", "Science"].map((tag, index) => (
                                <motion.span
                                    key={tag}
                                    className={`px-4 py-2 rounded-full text-lg font-semibold ${tag === "Science"
                                            ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]"
                                            : "bg-[hsl(var(--card))] text-[hsl(var(--muted))]"
                                        }`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1 + (index * 0.1) }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -2,
                                        boxShadow: "0 4px 12px hsl(var(--primary) / 0.2)"
                                    }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>

                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                        >
                            <h5 className="font-semibold text-lg text-[hsl(var(--muted))] mb-2">School Details</h5>
                            <p className="text-[hsl(var(--fg))] text-lg font-medium">Delhi Public School</p>
                            <p className="text-md text-[hsl(var(--muted))]">New Delhi, Delhi</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3 }}
                        >
                            <h5 className="font-semibold text-lg text-[hsl(var(--muted))] mb-4">Interests</h5>
                            <div className="flex gap-3 flex-wrap">
                                {interests.map((interest, index) => (
                                    <motion.span
                                        key={interest}
                                        className="bg-[hsl(var(--card))] px-4 py-2 rounded-lg text-lg font-medium text-[hsl(var(--fg))] hover:bg-[hsl(var(--accent)/0.1)] hover:text-[hsl(var(--accent))] transition-all cursor-pointer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1.4 + (index * 0.1) }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {interest}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Enhanced Stats Section */}
                <motion.div
                    className="mt-20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <motion.h3
                        className="text-2xl font-bold mb-8 text-[hsl(var(--fg))] text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 }}
                    >
                        Your Activity Summary
                    </motion.h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatWidget
                            icon="🎯"
                            value={3}
                            label="Quizzes Taken"
                            animated={true}
                            delay={0}
                            trend="up"
                            trendValue="+2"
                            className="hover:scale-105 transition-transform"
                        />
                        <StatWidget
                            icon="📚"
                            value={12}
                            label="Courses Explored"
                            animated={true}
                            delay={1}
                            trend="up"
                            trendValue="+5"
                            className="hover:scale-105 transition-transform"
                        />
                        <StatWidget
                            icon="🏫"
                            value={5}
                            label="Colleges Shortlisted"
                            animated={true}
                            delay={2}
                            trend="up"
                            trendValue="+1"
                            className="hover:scale-105 transition-transform"
                        />
                        <StatWidget
                            icon="📅"
                            value={2}
                            label="Sessions Booked"
                            animated={true}
                            delay={3}
                            className="hover:scale-105 transition-transform"
                        />
                    </div>
                </motion.div>

                {/* Additional floating elements */}
                <AnimatePresence>
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={`float-${i}`}
                            className="absolute w-1 h-1 bg-[hsl(var(--primary))] rounded-full opacity-30"
                            style={{
                                right: `${20 + (i * 25)}%`,
                                bottom: `${30 + (i * 15)}%`,
                            }}
                            animate={{
                                y: [-5, 5, -5],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 2 + (i * 0.3),
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;
