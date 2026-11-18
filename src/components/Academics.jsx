import React, { useMemo, memo } from "react";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

// --- Animation Variants (UNCHANGED) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// --- Education Card Component (UNCHANGED) ---
const EducationCard = memo(({ education }) => {
  const { logo, alt, title, link, program, year, scoreLabel, score } = education;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow p-6 flex items-center gap-6"
    >
      <div className="w-16 h-16 flex-shrink-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shadow rounded-xl p-1 overflow-hidden">
        <img
          src={logo}
          alt={alt}
          className="w-full h-full object-contain rounded-lg"
          loading="lazy"
          decoding="async"
          width={64}
          height={64}
          style={{ aspectRatio: "1/1" }}
        />
      </div>

      <div className="flex flex-col text-left gap-1">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">
          {title}
        </h3>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline hover:text-foreground font-medium transition-colors"
        >
          {program}
        </a>

        <div className="text-sm text-muted-foreground mt-2 space-y-1">
          <p>
            <span className="font-medium text-foreground/80">Year:</span> {year}
          </p>
          <p>
            <span className="font-medium text-foreground/80">
              {scoreLabel}:
            </span>{" "}
            {score}
          </p>
        </div>
      </div>
    </motion.div>
  );
});
EducationCard.displayName = "EducationCard";

// --- YOUR ACADEMIC DATA (UPDATED) ---
const ACADEMICS_DATA = [
  {
    logo: "/assets/logos/sggsiet.png",
    alt: "SGGSIE&T Logo",
    title:
      "Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded",
    link: "https://www.sggs.ac.in/",
    program: "B.Tech in Computer Science and Engineering",
    year: "Aug 2023 – May 2026",
    scoreLabel: "CGPA",
    score: "8.40 / 10",
  },
  {
    logo: "/assets/logos/ghraisoini.png",
    alt: "G.H. Raisoni Institute of Engineering & Technology Logo",
    title: "G.H. Raisoni Institute of Engineering & Technology, Nagpur",
    link: "https://ghrietn.raisoni.net/",
    program: "Diploma in Computer Science and Engineering",
    year: "May 2020 – June 2023",
    scoreLabel: "CGPA",
    score: "9.44 / 10",
  },
];

// --- Main Academics Component ---
const AcademicsComponent = memo(function Academics() {
  const educationCards = useMemo(
    () =>
      ACADEMICS_DATA.map((education, index) => (
        <EducationCard
          key={`${education.title}-${index}`}
          education={education}
        />
      )),
    []
  );

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center w-full"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center gap-4 text-foreground">
            <GraduationCap className="w-8 h-8 sm:w-11 sm:h-11 text-primary" />
            Education
          </h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            My academic journey is grounded in computer science fundamentals,
            with a strong focus on software engineering, backend systems, and
            distributed architectures. Alongside formal education, I actively
            apply concepts through real-world projects, internships, and
            system-level experimentation.
          </motion.p>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          variants={containerVariants}
          className="w-full max-w-2xl flex flex-col gap-8"
        >
          {educationCards}
        </motion.div>
      </motion.div>
    </div>
  );
});

AcademicsComponent.displayName = "Academics";

export default AcademicsComponent;
