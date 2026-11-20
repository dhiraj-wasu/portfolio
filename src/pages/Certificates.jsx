import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";
import ScrollAnimation from "../components/ScrollAnimation";
import contactConfig from "../config/contact";

export const Certificates = () => {
  const certificates = [
    {
      title: "Student of the Institute & Department (2023)",
      issuer: "G.H. Raisoni Institute of Engineering & Technology",
      date: "2023",
      link: contactConfig.linkedin,
      description: "Prestigious institutional honor awarded for exemplary academic performance, technical leadership, and engineering achievements across the department.",
      skills: ["Technical Leadership", "Academic Excellence", "Engineering Architecture"],
    },
    {
      title: "Winner – State Level Project Competition (DIPEX 2023)",
      issuer: "DIPEX State Technical Committee",
      date: "2023",
      link: contactConfig.linkedin,
      description: "Secured 1st Place / State Level Winner among top engineering institutes for outstanding technical innovation and practical systems execution.",
      skills: ["Technical Innovation", "System Design", "Engineering Execution", "Demonstration"],
    },
    {
      title: "Data Structures & Algorithmic Problem Solving",
      issuer: "HackerRank & LeetCode",
      date: "2023 - Present",
      link: contactConfig.hackerrank,
      description: "Rigorous competitive programming and problem-solving practice covering Advanced Data Structures, Graph Algorithms, and Dynamic Programming.",
      skills: ["Data Structures", "Algorithms", "C++", "Java", "Python"],
    },
    {
      title: "High-Performance In-Memory Cache Engine",
      issuer: "Systems Engineering Research",
      date: "2024",
      link: "https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-",
      description: "Low-latency systems development exploring memory allocation, multithreaded synchronization, locking mechanisms, and optimized eviction policies.",
      skills: ["C++", "Multithreading", "Memory Structures", "Low Latency"],
    },
    {
      title: "Distributed AI Task Queues & Orchestration",
      issuer: "Distributed Systems Engineering",
      date: "2024",
      link: "https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution",
      description: "Architectural implementation of distributed AI task dispatch with Redis queues, worker heartbeats, task retries, and automated load scaling.",
      skills: ["FastAPI", "Redis", "Distributed Systems", "Task Queues"],
    },
    {
      title: "Anuvada AI — Philosophy-Aware RAG Guidance",
      issuer: "AI Retrieval Systems",
      date: "2024",
      link: "https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System",
      description: "Design and deployment of intent-based source routing and quote-faithful context retrieval pipelines to eliminate hallucination in domain guidance.",
      skills: ["RAG Pipelines", "Vector Databases", "Prompt Engineering", "Python"],
    },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Award className="w-8 h-8 text-white" />
          <h2 className="text-4xl font-bold gradient-text">Certificates & Honors</h2>
        </motion.div>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <ScrollAnimation key={cert.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/70 transition-all group border border-white/5 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
                  {cert.title}
                </h3>
                <div className="text-gray-400 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-200 font-medium">{cert.issuer}</span>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs bg-white/10 rounded-full text-gray-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium group-hover:translate-x-1 transition-transform"
                  whileHover={{ scale: 1.02 }}
                >
                  <span>View Details</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
