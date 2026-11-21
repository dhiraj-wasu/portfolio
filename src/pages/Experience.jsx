import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Building2, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import ScrollAnimation from "../components/ScrollAnimation";
import contactConfig from "../config/contact";

export const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Connecticus Technologies",
      location: "Pune, India",
      period: "Aug 2026 – Present",
      type: "Internship & Systems",
      image: "/assets/sggs.jpeg",
      showCertificate: false,
      description: [
        "Designed and developed backend components of TrustOps Next, a Polarion-integrated risk and compliance product that turns failed CI test results into prepared tasks with priority, reviewer and SLA from approved rule cards, working in an Agile team.",
        "Built an event-driven ingestion pipeline (REST gateway, duplicate detection, queue-based writer with rate limiting, exponential-backoff retries and a dead-letter queue) and a traceability graph that shows every hazard a failed test reaches.",
      ],
    },
    {
      title: "AI & Backend Engineering Intern",
      company: "RGESIndia",
      location: "Hyderabad, India",
      period: "Apr 2025",
      type: "Internship & AI Decision Pipelines",
      image: "/assets/ghriet.png",
      showCertificate: false,
      description: [
        "Built AI and machine learning decision pipelines processing multi-source data (patient vitals, traffic, driver reliability) and integrated LLM-based modules, improving prioritization accuracy and supporting real-time automated decision-making.",
      ],
    },
    {
      title: "Student Technical Lead & Project Winner",
      company: "State Level Project Competition (DIPEX 2023)",
      location: "Maharashtra, India",
      period: "2023",
      type: "Competition & Leadership",
      image: "/assets/ghriet.png",
      certificateUrl: contactConfig.linkedin,
      showCertificate: true,
      description: [
        "Secured 1st Place as Winner of State Level Project Competition (DIPEX 2023) for outstanding technical innovation and practical engineering execution.",
        "Awarded Student of the Institute & Department (2023) at G.H. Raisoni Institute for academic excellence, technical leadership, and engineering achievements.",
        "Directed end-to-end technical system design, algorithmic validation, and live demonstration for judging panels.",
        "Conducted workshops on competitive programming, data structures, and backend fundamentals for junior engineering students.",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 max-w-5xl mx-auto pb-16 sm:pb-20">
      <ScrollAnimation>
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 gradient-text flex items-center gap-3">
          <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          <span>Professional Experience & Leadership</span>
        </h2>
      </ScrollAnimation>

      <div className="space-y-8 sm:space-y-12">
        {experiences.map((exp) => (
          <ScrollAnimation key={exp.title + exp.company}>
            <div className="group relative bg-gray-800/50 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-gray-800/70 transition-all border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-[1fr,300px]">
                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl group-hover:bg-white/20 transition-colors">
                      <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-gray-400 text-base sm:text-lg">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{exp.location}</span>
                    <span>•</span>
                    <span className="text-purple-300 font-medium">{exp.period}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-300">
                      {exp.type}
                    </span>
                  </div>

                  <ul className="space-y-3 sm:space-y-4">
                    {exp.description.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        <ArrowRight className="w-4 h-4 mt-1 text-purple-400 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.showCertificate && (
                    <motion.a
                      href={exp.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="md:hidden mt-6 inline-flex items-center gap-2 px-6 py-2.5 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all text-sm font-medium border border-white/5"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span>View Honors</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>

                {/* Right Image Banner (Desktop) */}
                <div className="relative hidden md:flex md:items-center md:justify-center overflow-hidden">
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800/90 via-gray-800/60 to-transparent" />
                  </div>
                  {exp.showCertificate && (
                    <div className="relative z-10 p-6">
                      <motion.a
                        href={exp.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 text-white font-medium bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-xl flex items-center gap-2 transition-all border border-white/15 shadow-lg"
                        whileHover={{ y: -3 }}
                      >
                        <span>View Honors</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Experience;
