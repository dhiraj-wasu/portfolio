import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Code2, Briefcase, GraduationCap } from "lucide-react";
import ScrollAnimation from "../components/ScrollAnimation";
import contactConfig from "../config/contact";

export const About = () => {
  const achievements = [
    {
      icon: <Briefcase className="w-6 h-6 text-white" />,
      title: "Software Engineer Intern",
      description: "Connecticus Technologies (TrustOps Next) & RGESIndia",
    },
    {
      icon: <Code2 className="w-6 h-6 text-white" />,
      title: "Systems & AI Engineering",
      description: "Distributed task queues, event-driven pipelines & RAG systems",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      title: "State Level Winner",
      description: "1st Place – DIPEX 2023 & Student of the Institute",
    },
  ];

  const interests = [
    "Scalable Microservices",
    "Distributed Task Orchestration",
    "Event-Driven Architectures",
    "RAG & LLM Integration",
    "Concurrency & Multithreading",
    "Docker & Cloud CI/CD",
  ];

  return (
    <div className="min-h-screen pt-20 px-4 max-w-4xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-8 gradient-text">About Me</h2>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Profile Image */}
        <ScrollAnimation>
          <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
            <img
              src="/assets/profilere.png"
              alt={contactConfig.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </ScrollAnimation>

        {/* Bio Content */}
        <ScrollAnimation className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Hi! I'm <strong className="text-white">Dhiraj Vinod Wasu</strong>, a Software Engineer and Computer Science Engineering undergraduate at{" "}
              <span className="text-white font-medium">Shri Guru Gobind Singhji Institute of Engineering and Technology (SGGSIE&T), Nanded</span> (8.52 CGPA).
            </p>
            <p className="text-gray-300 leading-relaxed">
              Currently, I am working as a <strong className="text-white">Software Engineer Intern at Connecticus Technologies</strong> in Pune, developing backend components of <em className="text-purple-300 not-italic font-medium">TrustOps Next</em> — building event-driven ingestion pipelines with REST gateways, duplicate detection, queue-based writers, rate limiting, retries, and comprehensive traceability graphs.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Previously, I interned at <strong className="text-white">RGESIndia</strong> engineering AI decision pipelines and real-time LLM-integrated modules. I also hold a <span className="text-white font-medium">9.44 CGPA</span> in my Diploma in Computer Engineering from G.H. Raisoni Institute, where I was awarded Student of the Institute & Department and won 1st Place at DIPEX 2023.
            </p>
          </div>

          {/* Quick Facts */}
          <ScrollAnimation>
            <div className="pt-2">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Quick Facts</h3>
              <ul className="list-none space-y-3">
                {[
                  "Based in Pune & Nanded, Maharashtra, India",
                  "Software Engineer Intern at Connecticus Technologies",
                  "B.Tech in CSE (SGGSIE&T) — 8.52 CGPA",
                  "Diploma in Computer Engineering (G.H. Raisoni) — 9.44 CGPA",
                  "Secondary School (St. Joseph's Convent) — 79.80%",
                  "Focus: Microservices, Distributed Systems & Grounded AI (RAG)",
                ].map((fact) => (
                  <motion.li key={fact} className="flex items-center space-x-2 text-gray-300">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                    <span>{fact}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>

          {/* Action Links */}
          <ScrollAnimation>
            <div className="flex justify-start space-x-4 pt-2">
              <a
                href={contactConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Download CV
              </a>
              <Link
                to="/skills"
                className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors text-sm border border-white/5"
              >
                My Skills
              </Link>
            </div>
          </ScrollAnimation>
        </ScrollAnimation>
      </div>

      {/* Achievements Section */}
      <ScrollAnimation>
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 gradient-text">Achievements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <ScrollAnimation key={item.title}>
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-all h-full">
                  <div className="text-white mb-4">{item.icon}</div>
                  <h4 className="text-xl font-semibold mb-2 text-white">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      {/* Areas of Interest */}
      <ScrollAnimation>
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 gradient-text">Areas of Interest</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((interest) => (
              <ScrollAnimation key={interest}>
                <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm flex items-center gap-3 border border-white/5 hover:bg-white/10 transition-all">
                  <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm font-medium">{interest}</span>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default About;
