import React from "react";
import {
  Code,
  Server,
  Terminal,
  Brain,
  Wrench,
  Layers,
  Database,
  Cpu,
} from "lucide-react";
import ScrollAnimation from "../components/ScrollAnimation";
import {
  PythonIcon,
  CppIcon,
  JavaIcon,
  FastAPIIcon,
  DjangoIcon,
  RedisIcon,
  DockerIcon,
  GitIcon,
  GitHubIcon,
  LinuxIcon,
  BashIcon,
  SQLIcon,
} from "../components/TechLogos";

export const Skills = () => {
  const skillCategories = [
    {
      category: "Programming Languages",
      icon: <Code className="w-6 h-6 text-white" />,
      items: [
        { name: "C++", icon: <CppIcon /> },
        { name: "Python", icon: <PythonIcon /> },
        { name: "Java", icon: <JavaIcon /> },
        { name: "C", icon: <CppIcon /> },
        { name: "SQL", icon: <SQLIcon /> },
        { name: "Bash", icon: <BashIcon /> },
      ],
    },
    {
      category: "Backend & Distributed Systems",
      icon: <Server className="w-6 h-6 text-white" />,
      items: [
        { name: "FastAPI", icon: <FastAPIIcon /> },
        { name: "Django REST", icon: <DjangoIcon /> },
        { name: "Microservices", icon: <Layers className="w-4 h-4" /> },
        { name: "Redis", icon: <RedisIcon /> },
        { name: "Celery", icon: <Server className="w-4 h-4" /> },
        { name: "WebSockets", icon: <Cpu className="w-4 h-4" /> },
      ],
    },
    {
      category: "Systems & Infrastructure",
      icon: <Terminal className="w-6 h-6 text-white" />,
      items: [
        { name: "Distributed Systems", icon: <Layers className="w-4 h-4" /> },
        { name: "Concurrency", icon: <Cpu className="w-4 h-4" /> },
        { name: "Docker", icon: <DockerIcon /> },
        { name: "Linux", icon: <LinuxIcon /> },
        { name: "Git", icon: <GitIcon /> },
        { name: "GitHub Actions", icon: <GitHubIcon /> },
      ],
    },
    {
      category: "AI & Intelligent Automation",
      icon: <Brain className="w-6 h-6 text-white" />,
      items: [
        { name: "LLMs", icon: <Brain className="w-4 h-4" /> },
        { name: "RAG Pipelines", icon: <Database className="w-4 h-4" /> },
        { name: "Vector DBs", icon: <Database className="w-4 h-4" /> },
        { name: "Agent Architecture", icon: <Layers className="w-4 h-4" /> },
        { name: "System Design", icon: <Server className="w-4 h-4" /> },
        { name: "Automation", icon: <Wrench className="w-4 h-4" /> },
      ],
    },
    {
      category: "Tools & Development",
      icon: <Wrench className="w-6 h-6 text-white" />,
      items: [
        { name: "VS Code", icon: <Terminal className="w-4 h-4" /> },
        { name: "Postman", icon: <Wrench className="w-4 h-4" /> },
        { name: "Ubuntu / Linux", icon: <LinuxIcon /> },
        { name: "MySQL", icon: <SQLIcon /> },
        { name: "Git CLI", icon: <GitIcon /> },
        { name: "Bash Scripting", icon: <BashIcon /> },
      ],
    },
    {
      category: "Core Competencies",
      icon: <Cpu className="w-6 h-6 text-white" />,
      items: [
        { name: "DSA", icon: <Code className="w-4 h-4" /> },
        { name: "Multithreading", icon: <Cpu className="w-4 h-4" /> },
        { name: "Cache Architecture", icon: <Database className="w-4 h-4" /> },
        { name: "Thread Safety", icon: <Server className="w-4 h-4" /> },
        { name: "Problem Solving", icon: <Brain className="w-4 h-4" /> },
        { name: "High Throughput", icon: <Layers className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-4 gradient-text">Technical Skills</h2>
        <p className="text-gray-400 mb-12 max-w-2xl">
          A comprehensive overview of my technical expertise, programming languages, backend frameworks, and systems engineering tools.
        </p>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((sec) => (
          <ScrollAnimation key={sec.category}>
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/70 transition-all border border-white/5 h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-white/10 rounded-lg text-white">
                  {sec.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {sec.category}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                {sec.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-gray-700/50 px-3 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all group border border-white/5"
                  >
                    <div className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-gray-400 group-hover:text-white transition-colors text-xs sm:text-sm font-medium truncate">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Skills;
