import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, ExternalLink, FileText } from "lucide-react";
import ScrollAnimation from "../components/ScrollAnimation";

export const Education = () => {
  const educationList = [
    {
      school: "Shri Guru Gobind Singhji Institute of Engineering and Technology",
      location: "Nanded, Maharashtra, India",
      duration: "Aug 2023 – May 2026",
      degree: "B.Tech in Computer Science and Engineering",
      grade: "CGPA: 8.52 / 10",
      image: "/assets/sggs.jpeg",
      link: "https://www.sggs.ac.in/",
      coursework: [
        "Distributed Systems",
        "Operating Systems",
        "Database Management",
        "Computer Networks",
        "Design & Analysis of Algorithms",
        "System Architecture",
        "Software Engineering",
      ],
      description:
        "Building a deep foundation in core computer science, software engineering, and distributed architectures. Focusing on low-latency memory caching, asynchronous task orchestration, and intelligent retrieval systems.",
    },
    {
      school: "G.H. Raisoni Institute of Engineering & Technology",
      location: "Nagpur, Maharashtra, India",
      duration: "May 2020 – Jun 2023",
      degree: "Diploma in Computer Engineering",
      grade: "CGPA: 9.44 / 10",
      image: "/assets/ghriet.png",
      link: "https://ghrietn.raisoni.net/",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (Java & C++)",
        "Relational Databases & SQL",
        "Web Development",
        "Computer Hardware & Networking",
      ],
      description:
        "Completed Diploma with exceptional academic standing (9.44 CGPA). Awarded Student of the Institute & Department (2023) and secured 1st Place as Winner in the State Level Project Competition (DIPEX 2023).",
    },
    {
      school: "St. Joseph's Convent Senior Secondary School",
      location: "Fetri, Nagpur, Maharashtra, India",
      duration: "June 2019 - March 2020",
      degree: "Secondary School Certificate (Class X - CBSE)",
      grade: "79.80%",
      image: "/assets/sjc.png",
      link: "https://sjcsfetrinagpur.edu.in/",
      coursework: [
        "Mathematics",
        "Science",
        "Social Science",
        "English",
        "Information Technology",
      ],
      description:
        "Completed Class X secondary school education under CBSE board with 79.80%, building strong early fundamentals in mathematics, science, and computing.",
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
          <GraduationCap className="w-8 h-8 text-white" />
          <h2 className="text-4xl font-bold gradient-text">Education</h2>
        </motion.div>
      </ScrollAnimation>

      <div className="space-y-12">
        {educationList.map((item, index) => (
          <ScrollAnimation key={item.school}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-gray-800/70 transition-all border border-white/5"
            >
              {/* Duration badge */}
              <div className="absolute top-0 right-0 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-bl-xl flex items-center gap-2 border-l border-b border-white/5 z-10">
                <Calendar className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm font-medium">{item.duration}</span>
              </div>

              <div className="grid md:grid-cols-[350px,1fr]">
                {/* Left image column */}
                <div className="relative h-72 md:h-full">
                  <img
                    src={item.image}
                    alt={item.school}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">{item.school}</h3>
                      <div className="flex items-center gap-2 text-gray-300 mb-1 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300 text-sm font-semibold">
                        <Award className="w-4 h-4 text-purple-400" />
                        <span>{item.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right details column */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-gray-400" />
                      <h4 className="text-lg sm:text-xl font-semibold text-white">
                        {item.degree}
                      </h4>
                    </div>

                    <div className="flex items-start gap-2 text-gray-300 mb-6">
                      <FileText className="w-5 h-5 mt-1 flex-shrink-0 text-gray-400" />
                      <p className="text-sm leading-relaxed text-gray-300">
                        {item.description}
                      </p>
                    </div>

                    {item.coursework && (
                      <div className="mb-6">
                        <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                          Relevant Coursework
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.coursework.map((course) => (
                            <span
                              key={course}
                              className="px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm text-gray-200 border border-white/5"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <motion.a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm font-medium border border-white/5 text-white"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span>Visit Institute</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Education;
