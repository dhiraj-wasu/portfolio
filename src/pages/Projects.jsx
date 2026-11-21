import React from "react";
import { Github, ExternalLink } from "lucide-react";
import ScrollAnimation from "../components/ScrollAnimation";

export const Projects = () => {
  const projects = [
    {
      title: "Anuvada: A Philosophy-Aware Guidance System",
      description: "Intent-driven RAG system routing user queries between canonical texts based on problem vs concept classification, preventing cross-book hallucination with quote-faithful retrieval and grounded LLM explanations.",
      image: "/assets/project-1-BPjpZffZ.png",
      github: "https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System",
      tags: ["LLM", "RAG", "Qdrant", "Python", "FastAPI"],
    },
    {
      title: "AI Mesh System with Queue-Based Distribution",
      description: "Distributed auto-scaling backend task framework with Redis multi-queue isolation, complexity-aware scheduling, dynamic worker scaling (1→8 workers), dead-letter queues, and heartbeat monitoring.",
      image: "/assets/project-2-C-wKW9ir.png",
      github: "https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution",
      tags: ["FastAPI", "Redis", "Docker", "Distributed Systems", "Task Queues"],
    },
    {
      title: "Automated Paperless Transparent College System",
      description: "Full-stack college administration platform with digital student elections, priority facility booking for 15+ locations, AI complaint filtering, budget tracking, and real-time WebSockets, reducing manual processing by 80%.",
      image: "/assets/project.png",
      github: "https://github.com/dhiraj-wasu",
      tags: ["React", "Django REST", "PostgreSQL", "WebSockets", "SQL"],
    },
    {
      title: "High-Performance In-Memory Cache",
      description: "Speed-focused, low-latency cache engine developed in C++ using multithreading, custom memory structures, and optimized key-value eviction algorithms to maximize throughput.",
      image: "/assets/project-4-Ll_CcPP2.png",
      github: "https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-",
      tags: ["C++", "Multithreading", "Cache Architecture", "Low Latency", "Systems"],
    },
    {
      title: "Thread-Safe Distributed Cache",
      description: "Concurrency-focused distributed caching layer engineered in Java with robust thread safety, locking mechanisms, eviction policies, and high-concurrency throughput.",
      image: "/assets/project-1-BPjpZffZ.png",
      github: "https://github.com/dhiraj-wasu/Thread-Safe-Distributed-Cache-Concurrency-focused-JAVA-",
      tags: ["Java", "Concurrency", "Distributed Systems", "Thread Safety", "Data Structures"],
    },
    {
      title: "MediSure AI (Emergency Response Orchestrator)",
      description: "Intelligent healthcare response platform powered by a FastAPI backend orchestrator, real-time emergency dispatch coordination, and AI-assisted clinical data aggregation.",
      image: "/assets/project-2-C-wKW9ir.png",
      github: "https://github.com/dhiraj-wasu/MediSure-AI",
      tags: ["Python", "FastAPI", "Microservices", "REST APIs", "Healthcare Tech"],
    },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 max-w-6xl mx-auto pb-20">
      <ScrollAnimation>
        <h2 className="text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
        <p className="text-gray-400 mb-12 max-w-2xl">
          Core backend systems, distributed architectures, intelligent RAG pipelines, and high-concurrency software engineered by Dhiraj Wasu.
        </p>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ScrollAnimation key={project.title}>
            <div className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm h-full flex flex-col border border-white/5 hover:border-white/20 transition-all group">
              <div className="relative overflow-hidden h-48 bg-gray-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-md border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 pt-2 border-t border-white/5 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Details</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Projects;
