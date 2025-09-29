import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Divider from "../components/ui/Divider.jsx";
import { courses } from "../lib/data.js";

const CoursesPage = () => {
    const groups = useMemo(() => {
        const by = { Science: [], Commerce: [], Arts: [] };
        for (const c of courses) by[c.stream].push(c);
        return by;
    }, []);
    const [openId, setOpenId] = useState(null);
    const [tab, setTab] = useState("careers");
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
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

    const expandVariants = {
        hidden: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        visible: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.4, ease: "easeInOut" }
        }
    };

    const tabIndicatorVariants = {
        initial: { x: 0, width: 0 },
        animate: {
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    const StreamSection = ({ stream, items, index }) => (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.15 }}
        >
            <Card
                glass={true}
                hover={true}
                className="p-6 md:p-8 mb-8 relative overflow-hidden"
            >
                {/* Floating background decorations */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.1)] rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr from-[hsl(var(--accent)/0.1)] to-[hsl(var(--primary)/0.1)] rounded-full blur-2xl"></div>

                {/* Glass header */}
                <motion.div
                    className="mb-7 relative z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-1 h-8 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full"></div>
                        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent leading-tight">
                            {stream}
                        </h2>
                    </div>
                    <div className="text-[hsl(var(--muted))] ml-4 text-sm md:text-base leading-relaxed">
                        Courses and career paths in the {stream.toLowerCase()} stream.
                    </div>
                </motion.div>

                <motion.div
                    className="space-y-1 relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {items.map((c, idx) => (
                        <motion.div
                            key={c.id}
                            variants={itemVariants}
                            layout
                            className="group"
                        >
                            {/* Course Main Row */}
                            <motion.div
                                onClick={() => setOpenId(openId === c.id ? null : c.id)}
                                className="flex items-center justify-between cursor-pointer px-4 py-4 rounded-[var(--radius)] 
                         hover:bg-[hsl(var(--card)/0.8)] hover:backdrop-blur-sm 
                         hover:shadow-[0_4px_20px_hsl(var(--primary)/0.1)] 
                         border border-transparent hover:border-[hsl(var(--border)/0.5)]
                         transition-all duration-300 group-hover:scale-[1.01]"
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <motion.span
                                        className="h-10 w-10 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.1)] 
                             rounded-[var(--radius)] text-xl border border-[hsl(var(--border)/0.5)]"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        <span className="text-[hsl(var(--primary))]">{c.icon}</span>
                                    </motion.span>
                                    <span className="text-lg md:text-xl font-bold text-[hsl(var(--fg))] leading-tight truncate">
                                        {c.name}
                                    </span>
                                </div>
                                <motion.span
                                    className="select-none text-[hsl(var(--muted))] text-xl"
                                    animate={{ rotate: openId === c.id ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    ▾
                                </motion.span>
                            </motion.div>

                            {/* Expanded Details */}
                            <AnimatePresence>
                                {openId === c.id && (
                                    <motion.div
                                        variants={expandVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-[hsl(var(--card)/0.7)] backdrop-blur-md rounded-[var(--radius)] 
                                        mt-2 mx-2 px-4 md:px-6 py-4 md:py-6 border border-[hsl(var(--border)/0.4)]
                                        shadow-[0_8px_30px_hsl(var(--primary)/0.05)]">
                                            {/* Tab Navigation with sliding indicator */}
                                            <div className="relative mb-6">
                                                <div className="flex gap-1 flex-wrap p-1 bg-[hsl(var(--bg)/0.5)] rounded-[var(--radius)] border border-[hsl(var(--border)/0.4)]">
                                                    {[
                                                        { key: "careers", label: "Careers" },
                                                        { key: "details", label: "Details" },
                                                        { key: "industry", label: "Industry" },
                                                        { key: "journeys", label: "Journeys" },
                                                    ].map((t, tabIndex) => (
                                                        <Button
                                                            key={t.key}
                                                            variant={tab === t.key ? "primary" : "ghost"}
                                                            size="sm"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                setTab(t.key);
                                                            }}
                                                            className={`relative z-10 transition-all duration-300 ${tab === t.key ? 'text-white' : 'text-[hsl(var(--fg))] hover:text-[hsl(var(--primary))]'
                                                                }`}
                                                        >
                                                            {t.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tab Content with animations */}
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={tab}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    {tab === "careers" && (
                                                        <div className="grid gap-6 md:grid-cols-2">
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.1 }}
                                                            >
                                                                <div className="font-semibold mb-4 text-[hsl(var(--fg))] text-lg">Career Paths</div>
                                                                <ul className="space-y-3">
                                                                    {c.careerPaths.map((p, i) => (
                                                                        <motion.li
                                                                            key={i}
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: i * 0.05 }}
                                                                            className="flex items-center gap-3 text-[hsl(var(--fg))] hover:text-[hsl(var(--primary))] transition-colors duration-200"
                                                                        >
                                                                            <span className="text-[hsl(var(--primary))] text-lg flex-shrink-0">{p.icon}</span>
                                                                            <span className="leading-relaxed">{p.name}</span>
                                                                        </motion.li>
                                                                    ))}
                                                                </ul>
                                                            </motion.div>
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.2 }}
                                                                className="space-y-3"
                                                            >
                                                                <div className="p-4 bg-[hsl(var(--card)/0.5)] rounded-[var(--radius-sm)] border border-[hsl(var(--border)/0.3)]">
                                                                    <div className="font-semibold text-[hsl(var(--fg))] mb-2 text-sm">Further Studies:</div>
                                                                    <div className="text-[hsl(var(--fg))] text-sm leading-relaxed">{c.furtherStudies.join(", ")}</div>
                                                                </div>
                                                                <div className="p-4 bg-[hsl(var(--card)/0.5)] rounded-[var(--radius-sm)] border border-[hsl(var(--border)/0.3)]">
                                                                    <div className="font-semibold text-[hsl(var(--fg))] mb-2 text-sm">Government Exams:</div>
                                                                    <div className="text-[hsl(var(--fg))] text-sm leading-relaxed">{c.govExams.join(", ")}</div>
                                                                </div>
                                                            </motion.div>
                                                        </div>
                                                    )}

                                                    {tab === "details" && (
                                                        <div className="grid gap-6 md:grid-cols-2">
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.1 }}
                                                                className="space-y-4"
                                                            >
                                                                <div className="p-4 bg-[hsl(var(--card)/0.5)] rounded-[var(--radius)] border border-[hsl(var(--border)/0.3)]">
                                                                    <div className="text-[hsl(var(--fg))] mb-4 leading-relaxed text-sm">{c.description}</div>
                                                                    <div className="space-y-3">
                                                                        <div className="text-sm">
                                                                            <span className="font-semibold text-[hsl(var(--primary))] block mb-1">Career Growth:</span>
                                                                            <span className="text-[hsl(var(--fg))] leading-relaxed">{c.careerGrowth}</span>
                                                                        </div>
                                                                        <div className="text-sm">
                                                                            <span className="font-semibold text-[hsl(var(--primary))] block mb-1">Salary Packages:</span>
                                                                            <span className="text-[hsl(var(--fg))]">Entry: {c.packages.entry} • Experienced: {c.packages.experienced}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.2 }}
                                                            >
                                                                <div className="font-semibold mb-4 text-[hsl(var(--fg))] text-lg">Videos</div>
                                                                <ul className="space-y-3">
                                                                    {c.videos.map((v, i) => (
                                                                        <motion.li
                                                                            key={i}
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: i * 0.05 }}
                                                                            className="group"
                                                                        >
                                                                            <a
                                                                                href={v}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors duration-200 text-sm leading-relaxed flex items-center gap-2 p-2 rounded hover:bg-[hsl(var(--card)/0.5)] group-hover:translate-x-1"
                                                                            >
                                                                                <span className="text-xs">🎥</span>
                                                                                <span className="break-all">{v}</span>
                                                                            </a>
                                                                        </motion.li>
                                                                    ))}
                                                                </ul>
                                                            </motion.div>
                                                        </div>
                                                    )}

                                                    {tab === "industry" && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.1 }}
                                                        >
                                                            <div className="font-semibold mb-4 text-[hsl(var(--fg))] text-lg">Top Companies</div>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                {c.topCompanies.map((co, i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ delay: i * 0.03 }}
                                                                        className="p-3 bg-[hsl(var(--card)/0.5)] rounded-[var(--radius-sm)] border border-[hsl(var(--border)/0.3)] text-[hsl(var(--fg))] text-sm font-medium hover:bg-[hsl(var(--card)/0.7)] hover:border-[hsl(var(--primary)/0.3)] transition-all duration-200"
                                                                    >
                                                                        {co}
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {tab === "journeys" && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.1 }}
                                                        >
                                                            <div className="font-semibold mb-4 text-[hsl(var(--fg))] text-lg">Inspirational Journeys</div>
                                                            <div className="space-y-4">
                                                                {c.topPeople.map((p, i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        initial={{ opacity: 0, x: -20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: i * 0.1 }}
                                                                        className="p-4 bg-[hsl(var(--card)/0.5)] rounded-[var(--radius)] border border-[hsl(var(--border)/0.3)] hover:bg-[hsl(var(--card)/0.7)] hover:border-[hsl(var(--primary)/0.3)] transition-all duration-200"
                                                                    >
                                                                        <div className="text-[hsl(var(--primary))] font-bold text-sm mb-2">{p.name}</div>
                                                                        <div className="text-[hsl(var(--fg))] text-sm leading-relaxed">{p.story}</div>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Row Divider */}
                            {idx !== items.length - 1 && (
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: idx * 0.05 + 0.3, duration: 0.3 }}
                                >
                                    <Divider />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </Card>
        </motion.div>
    );

    return (
        <div className="relative">
            {/* Enhanced background with floating elements - positioned relative to content area */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--bg))] via-[hsl(var(--bg))] to-[hsl(var(--card))] pointer-events-none">
                {/* Ambient background decorations */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[hsl(var(--primary)/0.03)] to-[hsl(var(--accent)/0.02)] rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tr from-[hsl(var(--accent)/0.03)] to-[hsl(var(--primary)/0.02)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-[hsl(var(--success)/0.02)] to-transparent rounded-full blur-2xl"></div>
            </div>

            {/* Floating action elements - positioned relative to content */}
            <div className="absolute top-8 right-8 z-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
                    className="bg-[hsl(var(--card)/0.9)] backdrop-blur-lg border border-[hsl(var(--border)/0.6)] 
                   rounded-full p-3 shadow-[0_8px_30px_hsl(var(--primary)/0.1)]"
                >
                    <div className="w-3 h-3 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full"></div>
                </motion.div>
            </div>

            <div className="relative z-10">
                <div className="w-full">
                    {/* Enhanced header */}
                    <motion.div
                        className="mb-8 text-center"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="text-4xl md:text-5xl font-extrabold mb-4 relative"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <span className="text-gradient bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
                                Course-to-Career
                            </span>
                            <br />
                            <span className="text-[hsl(var(--fg))]">Explorer</span>

                            {/* Decorative elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-full opacity-20"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-tr from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full opacity-30"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [360, 180, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: 1
                                }}
                            />
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-[hsl(var(--muted))] max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Discover where each degree can take you. Explore comprehensive career paths, growth opportunities, and success stories.
                        </motion.p>

                        {/* Progress indicator */}
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] mx-auto mt-6 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        />
                    </motion.div>

                    {/* Stream sections with enhanced staggered animations */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {/* Science */}
                        <StreamSection stream="Science" items={groups.Science} index={0} />

                        {/* Commerce */}
                        <StreamSection stream="Commerce" items={groups.Commerce} index={1} />

                        {/* Arts */}
                        <StreamSection stream="Arts" items={groups.Arts} index={2} />
                    </motion.div>

                    {/* Footer enhancement */}
                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--card)/0.6)] backdrop-blur-lg 
                          border border-[hsl(var(--border)/0.4)] rounded-full text-[hsl(var(--muted))]">
                            <motion.div
                                className="w-2 h-2 bg-[hsl(var(--success))] rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-sm">Constantly updated with latest career insights</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
