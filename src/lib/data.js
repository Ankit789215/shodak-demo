// Centralized mock data for Disha Darshan

export const quizQuestions = [
  {
    id: "q1",
    question: "Which subjects do you enjoy the most?",
    options: [
      { id: "maths", text: "Mathematics" },
      { id: "science", text: "Science" },
      { id: "commerce", text: "Commerce/Business" },
      { id: "arts", text: "Arts/Humanities" },
    ],
  },
  {
    id: "q2",
    question: "What type of tasks do you prefer?",
    options: [
      { id: "analytical", text: "Analytical problem solving" },
      { id: "creative", text: "Creative expression" },
      { id: "people", text: "Working with people" },
      { id: "operations", text: "Operations/Management" },
    ],
  },
  {
    id: "q3",
    question: "Pick a career area that excites you the most:",
    options: [
      { id: "engineering", text: "Engineering/Tech" },
      { id: "medicine", text: "Medicine/Health" },
      { id: "finance", text: "Finance/Accounting" },
      { id: "media", text: "Media/Psychology/Law" },
    ],
  },
  {
    id: "q4",
    question: "How do you like to study?",
    options: [
      { id: "practical", text: "Hands-on and practical" },
      { id: "theory", text: "Theory-heavy and research" },
      { id: "balanced", text: "Balanced" },
      { id: "self", text: "Self-paced" },
    ],
  },
  {
    id: "q5",
    question: "Your ideal workplace would be...",
    options: [
      { id: "lab", text: "Lab/Tech environment" },
      { id: "hospital", text: "Hospital/Clinic" },
      { id: "corporate", text: "Corporate office" },
      { id: "studio", text: "Studio/Court/Field" },
    ],
  },
];

export const courses = [
  {
    id: "cse",
    name: "B.E./B.Tech Computer Science",
    stream: "Science",
    icon: "💻",
    description:
      "Learn algorithms, data structures, systems, and software engineering to build modern applications.",
    careerPaths: [
      { name: "Software Engineer", icon: "🧑‍💻" },
      { name: "Data Scientist", icon: "📊" },
      { name: "AI/ML Engineer", icon: "🤖" },
    ],
    furtherStudies: ["M.Tech (CSE)", "MS (CS)", "MBA"],
    govExams: ["GATE", "ISRO Scientist", "DRDO"],
    careerGrowth:
      "Strong growth in product companies, startups, and research; opportunities in leadership and entrepreneurship.",
    packages: { entry: "₹4–8 LPA", experienced: "₹20–60+ LPA" },
    videos: [
      "https://www.youtube.com/watch?v=4IRiQE9i5gY",
      "https://www.youtube.com/watch?v=3h8mzO9D1rY",
    ],
    topCompanies: ["TCS", "Infosys", "Google", "Microsoft", "Flipkart"],
    topPeople: [
      { name: "Sundar Pichai", story: "From IIT Kharagpur to CEO of Google." },
      { name: "Falguni Nayar", story: "Tech-enabled entrepreneurship with Nykaa." },
    ],
  },
  {
    id: "mbbs",
    name: "MBBS",
    stream: "Science",
    icon: "🩺",
    description:
      "Medical degree covering human anatomy, diagnosis, and treatment; leads to various specialties.",
    careerPaths: [
      { name: "Physician", icon: "👩‍⚕️" },
      { name: "Surgeon", icon: "🔪" },
      { name: "Public Health", icon: "🏥" },
    ],
    furtherStudies: ["MD", "MS", "DM/MCh"],
    govExams: ["NEET-PG", "AIIMS", "JIPMER"],
    careerGrowth:
      "Prestigious and impactful; long training period but strong respect and stability.",
    packages: { entry: "₹6–12 LPA", experienced: "₹20–80+ LPA" },
    videos: ["https://www.youtube.com/watch?v=n2t3b_2bR8w"],
    topCompanies: ["Fortis", "Apollo Hospitals", "Narayana"],
    topPeople: [
      { name: "Devi Shetty", story: "Pioneering cardiac surgeon and social entrepreneur." },
    ],
  },
  {
    id: "bcom",
    name: "B.Com",
    stream: "Commerce",
    icon: "📘",
    description:
      "Foundations in accounting, finance, taxation, and business management for corporate roles.",
    careerPaths: [
      { name: "Accountant", icon: "🧾" },
      { name: "Financial Analyst", icon: "📈" },
      { name: "Banking", icon: "🏦" },
    ],
    furtherStudies: ["M.Com", "MBA", "CA/CS/CMA"],
    govExams: ["SBI PO", "RBI Grade B", "SSC CGL"],
    careerGrowth:
      "Diverse opportunities in finance, consulting, and analytics across sectors.",
    packages: { entry: "₹3–6 LPA", experienced: "₹10–25+ LPA" },
    videos: ["https://www.youtube.com/watch?v=pQxYk5xHFc0"],
    topCompanies: ["Deloitte", "KPMG", "HDFC Bank", "TCS"],
    topPeople: [
      { name: "Uday Kotak", story: "From commerce to founding Kotak Mahindra Bank." },
    ],
  },
  {
    id: "ca",
    name: "Chartered Accountancy (CA)",
    stream: "Commerce",
    icon: "🧮",
    description:
      "Professional route to become a chartered accountant; auditing, taxation, and financial management.",
    careerPaths: [
      { name: "Auditor", icon: "📚" },
      { name: "Tax Consultant", icon: "💼" },
      { name: "CFO", icon: "🏢" },
    ],
    furtherStudies: ["CFA", "MBA"],
    govExams: ["UPSC (Indian Revenue Service)"],
    careerGrowth:
      "High responsibility roles with strong compensation; respected professional credential.",
    packages: { entry: "₹6–10 LPA", experienced: "₹20–50+ LPA" },
    videos: ["https://www.youtube.com/watch?v=duoRr3ZQF2U"],
    topCompanies: ["EY", "PwC", "ICICI", "Kotak"],
    topPeople: [
      { name: "Naina Lal Kidwai", story: "Trailblazing banker and chartered accountant." },
    ],
  },
  {
    id: "ba-psy",
    name: "B.A. Psychology",
    stream: "Arts",
    icon: "🧠",
    description:
      "Study human behavior, cognition, and mental health; roles in counseling, HR, and research.",
    careerPaths: [
      { name: "Counselor", icon: "🗣️" },
      { name: "HR Specialist", icon: "👥" },
      { name: "Researcher", icon: "🔬" },
    ],
    furtherStudies: ["M.A. Psychology", "M.Phil", "PhD"],
    govExams: ["NET/JRF", "UPSC (Social Services)"],
    careerGrowth:
      "Rising demand in mental health and organizational psychology.",
    packages: { entry: "₹3–6 LPA", experienced: "₹10–20+ LPA" },
    videos: ["https://www.youtube.com/watch?v=1cD2b6t0spw"],
    topCompanies: ["NGOs", "Hospitals", "IT HR Depts"],
    topPeople: [
      { name: "Vikram Patel", story: "Global mental health researcher from India." },
    ],
  },
  {
    id: "ba-law",
    name: "B.A. LL.B",
    stream: "Arts",
    icon: "⚖️",
    description:
      "Integrated law degree leading to litigation, corporate law, and public policy roles.",
    careerPaths: [
      { name: "Advocate", icon: "📜" },
      { name: "Corporate Lawyer", icon: "🏛️" },
      { name: "Policy Analyst", icon: "🧭" },
    ],
    furtherStudies: ["LL.M", "Public Policy"],
    govExams: ["Judiciary Exams", "UPSC"],
    careerGrowth:
      "High-impact roles in courts, firms, and think tanks.",
    packages: { entry: "₹5–10 LPA", experienced: "₹15–50+ LPA" },
    videos: ["https://www.youtube.com/watch?v=QmP_ZAh0H6A"],
    topCompanies: ["Top Law Firms", "PSUs", "Policy Orgs"],
    topPeople: [
      { name: "Harish Salve", story: "Leading Indian advocate with global practice." },
    ],
  },
];

export const colleges = [
  {
    id: "iitb",
    name: "IIT Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    courses: ["B.Tech", "M.Tech", "PhD"],
    eligibility: "JEE Advanced",
    medium: "English",
    facilities: "Hostel, Labs, Sports, Library",
    lat: 19.1334,
    lon: 72.9133,
  },
  {
    id: "aiims",
    name: "AIIMS Delhi",
    city: "New Delhi",
    state: "Delhi",
    courses: ["MBBS", "MD", "MS"],
    eligibility: "NEET",
    medium: "English",
    facilities: "Hospital, Labs, Hostel",
    lat: 28.5672,
    lon: 77.2100,
  },
  {
    id: "srcc",
    name: "SRCC",
    city: "Delhi",
    state: "Delhi",
    courses: ["B.Com(H)", "Economics"],
    eligibility: "CUET",
    medium: "English",
    facilities: "Library, Labs, Societies",
    lat: 28.6790,
    lon: 77.2210,
  },
  {
    id: "tiss",
    name: "TISS",
    city: "Mumbai",
    state: "Maharashtra",
    courses: ["BA Social Sciences", "MA"],
    eligibility: "Entrance",
    medium: "English",
    facilities: "Hostel, Research, Fieldwork",
    lat: 19.0430,
    lon: 72.8567,
  },
  {
    id: "nlsiu",
    name: "NLSIU",
    city: "Bengaluru",
    state: "Karnataka",
    courses: ["BA LL.B", "LL.M"],
    eligibility: "CLAT",
    medium: "English",
    facilities: "Library, Moot Courts, Hostel",
    lat: 12.9784,
    lon: 77.6408,
  },
];

export const timelineEvents = [
  {
    id: "e1",
    date: "2025-10-01",
    title: "JEE Main 2026 Registration Opens",
    description: "Start applying for JEE Main session 1.",
    category: "Exams",
    details: "Visit the official NTA website. Keep documents ready: Aadhar, photo, signature.",
  },
  {
    id: "e2",
    date: "2025-11-15",
    title: "Scholarship - Inspire Deadline",
    description: "Inspire scholarship application closes.",
    category: "Scholarships",
    details: "Ensure you submit mark sheets and recommendation letters.",
  },
  {
    id: "e3",
    date: "2026-01-10",
    title: "DU Admissions Portal Opens",
    description: "Apply for UG programs via CUET counselling.",
    category: "Admissions",
    details: "Check program-wise eligibility before applying.",
  },
];

export const resources = [
  {
    id: "khan-academy",
    name: "Khan Academy",
    category: "Educational Platform",
    subjects: ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "Computer Science", "History", "Art"],
    description: "Free world-class education for anyone, anywhere with interactive exercises and videos",
    url: "https://www.khanacademy.org/",
    type: "Free",
    level: ["Beginner", "Intermediate", "Advanced"],
    features: ["Interactive Exercises", "Progress Tracking", "Certificates"],
    rating: 4.8,
    icon: "🎓"
  },
  {
    id: "coursera",
    name: "Coursera",
    category: "MOOC Platform",
    subjects: ["Computer Science", "Data Science", "Business", "Engineering", "Arts", "Health", "Social Sciences"],
    description: "Online courses and certificates from top universities and companies",
    url: "https://www.coursera.org/",
    type: "Freemium",
    level: ["Beginner", "Intermediate", "Advanced"],
    features: ["University Courses", "Certificates", "Degrees", "Financial Aid"],
    rating: 4.6,
    icon: "📚"
  },
  {
    id: "edx",
    name: "edX",
    category: "MOOC Platform",
    subjects: ["Computer Science", "Engineering", "Business", "Data Science", "Medicine", "Philosophy"],
    description: "High-quality courses from the world's best universities and institutions",
    url: "https://www.edx.org/",
    type: "Freemium",
    level: ["Beginner", "Intermediate", "Advanced"],
    features: ["MicroMasters", "Professional Education", "University Credits"],
    rating: 4.5,
    icon: "🏛️"
  },
  {
    id: "mit-ocw",
    name: "MIT OpenCourseWare",
    category: "University Resource",
    subjects: ["Engineering", "Computer Science", "Mathematics", "Physics", "Economics", "Management"],
    description: "Free MIT course materials for self-paced learning",
    url: "https://ocw.mit.edu/",
    type: "Free",
    level: ["Advanced"],
    features: ["Lecture Notes", "Assignments", "Exams", "Video Lectures"],
    rating: 4.9,
    icon: "🏫"
  },
  {
    id: "freecodecamp",
    name: "freeCodeCamp",
    category: "Coding Platform",
    subjects: ["Programming", "Web Development", "Data Science", "Machine Learning", "Mobile Development"],
    description: "Learn to code for free with hands-on projects and certifications",
    url: "https://www.freecodecamp.org/",
    type: "Free",
    level: ["Beginner", "Intermediate"],
    features: ["Hands-on Projects", "Certifications", "Community Support"],
    rating: 4.7,
    icon: "💻"
  },
  {
    id: "udacity",
    name: "Udacity",
    category: "Tech Education",
    subjects: ["Programming", "AI", "Data Science", "Cloud Computing", "Autonomous Systems"],
    description: "Industry-relevant nanodegrees and courses for tech careers",
    url: "https://www.udacity.com/",
    type: "Paid",
    level: ["Intermediate", "Advanced"],
    features: ["Nanodegrees", "Industry Projects", "Mentorship", "Career Services"],
    rating: 4.3,
    icon: "🤖"
  },
  {
    id: "youtube-edu",
    name: "YouTube Educational Channels",
    category: "Video Learning",
    subjects: ["All Subjects", "Tutorials", "Lectures", "Demonstrations"],
    description: "Vast collection of educational content from creators worldwide",
    url: "https://www.youtube.com/education",
    type: "Free",
    level: ["Beginner", "Intermediate", "Advanced"],
    features: ["Video Content", "Playlists", "Live Streams", "Community"],
    rating: 4.4,
    icon: "📺"
  },
  {
    id: "github",
    name: "GitHub",
    category: "Development Platform",
    subjects: ["Programming", "Open Source", "Version Control", "Collaboration"],
    description: "Platform for version control and collaborative software development",
    url: "https://github.com/",
    type: "Freemium",
    level: ["Beginner", "Intermediate", "Advanced"],
    features: ["Code Repositories", "Collaboration", "Project Management", "Learning Lab"],
    rating: 4.8,
    icon: "🐙"
  },
  {
    id: "stackoverflow",
    name: "Stack Overflow",
    category: "Q&A Platform",
    subjects: ["Programming", "Development", "Technology", "Problem Solving"],
    description: "Community-driven Q&A platform for programmers and developers",
    url: "https://stackoverflow.com/",
    type: "Free",
    level: ["All Levels"],
    features: ["Q&A", "Community", "Documentation", "Jobs"],
    rating: 4.6,
    icon: "❓"
  },
  {
    id: "codecademy",
    name: "Codecademy",
    category: "Interactive Coding",
    subjects: ["Programming", "Web Development", "Data Science", "Computer Science"],
    description: "Interactive coding lessons and projects for programming languages",
    url: "https://www.codecademy.com/",
    type: "Freemium",
    level: ["Beginner", "Intermediate"],
    features: ["Interactive Coding", "Projects", "Skill Paths", "Certificates"],
    rating: 4.5,
    icon: "⌨️"
  },
  {
    id: "brilliant",
    name: "Brilliant",
    category: "Interactive Learning",
    subjects: ["Mathematics", "Science", "Computer Science", "Problem Solving"],
    description: "Interactive courses that make learning STEM subjects engaging",
    url: "https://brilliant.org/",
    type: "Freemium",
    level: ["Beginner", "Intermediate", "Advanced"],
    features: ["Interactive Lessons", "Problem Solving", "Daily Challenges"],
    rating: 4.7,
    icon: "💡"
  },
  {
    id: "w3schools",
    name: "W3Schools",
    category: "Web Development",
    subjects: ["HTML", "CSS", "JavaScript", "Python", "SQL", "Web Development"],
    description: "World's largest web developer site with tutorials and references",
    url: "https://www.w3schools.com/",
    type: "Free",
    level: ["Beginner", "Intermediate"],
    features: ["Tutorials", "Examples", "References", "Online Editor"],
    rating: 4.4,
    icon: "🌐"
  }
];
