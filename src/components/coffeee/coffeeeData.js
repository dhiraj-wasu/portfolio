export const projects = [
  {
    title: "Anuvada: A Philosophy-Aware Guidance System",
    category: "AI & Retrieval Systems",
    description: "Intent-driven RAG system with problem vs concept routing, preventing cross-book hallucination with quote-faithful retrieval and grounded LLM explanations.",
    stack: "LLM · RAG · Qdrant · Python · FastAPI",
    url: "https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System",
  },
  {
    title: "AI Mesh System with Queue-Based Distribution",
    category: "Distributed Systems & Backend",
    description: "Distributed auto-scaling backend task execution framework with Redis multi-queue isolation, complexity-aware scheduling, and dynamic worker scaling (1→8).",
    stack: "FastAPI · Redis · Docker · Distributed Systems",
    url: "https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution",
  },
  {
    title: "Automated Paperless Transparent College System",
    category: "Full-Stack & Real-Time Systems",
    description: "College administration platform with digital student elections, facility booking for 15+ locations, AI complaint filtering, and WebSockets live updates.",
    stack: "React · Django REST · PostgreSQL · WebSockets · SQL",
    url: "https://github.com/dhiraj-wasu",
  },
  {
    title: "High-Performance In-Memory Cache",
    category: "Systems & High Performance",
    description: "Speed-focused low-latency C++ cache engine exploring custom memory management, multithreading, and optimized key-value eviction algorithms.",
    stack: "C++ · Multithreading · Cache Architecture",
    url: "https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-",
  },
  {
    title: "Thread-Safe Distributed Cache",
    category: "Systems & Concurrency",
    description: "A Java caching layer engineered with robust thread safety, locking mechanisms, eviction policies, and high-concurrency throughput.",
    stack: "Java · Concurrency · Data Structures",
    url: "https://github.com/dhiraj-wasu/Thread-Safe-Distributed-Cache-Concurrency-focused-JAVA-",
  },
  {
    title: "ZeroTrust Defender (AI Ransomware Detection)",
    category: "Cybersecurity & Automation",
    description: "An AI-driven distributed ransomware defense architecture with real-time endpoint threat detection, automated isolation, and threat orchestration.",
    stack: "Python · Cybersecurity · EDR/SOAR · ML",
    url: "https://github.com/dhiraj-wasu/ZeroTrust-Defender-AI-Driven-Ransomware-Detection",
  },
];

export const skillsByDomain = [
  {
    domain: "Languages & Frameworks",
    skills: ["Java", "Python", "C++", "SQL", "FastAPI", "Django REST", "Node.js", "React"],
  },
  {
    domain: "AI & GenAI",
    skills: ["LLMs", "RAG", "AI Agents", "Fine-tuning", "Knowledge Graph", "LangChain", "LangGraph", "MCP"],
  },
  {
    domain: "Cloud & Infrastructure",
    skills: ["Docker", "Microservices", "Cloud-Based Architectures", "CI/CD", "Redis", "Task Queues"],
  },
  {
    domain: "Software Systems Engineering",
    skills: ["Multithreading", "Sync/Async Programming", "Distributed Systems", "Concurrency"],
  },
  {
    domain: "Developer Tools",
    skills: ["Git", "GitHub", "GitHub Actions", "GitHub Copilot", "Postman", "Qdrant Vector DB"],
  },
];

export const answers = [
  {
    id: "about",
    match: ["about", "who", "dhiraj", "yourself", "background", "introduction"],
    title: "A little about Dhiraj",
    body: "Dhiraj Vinod Wasu is a Software Engineer based in Pune and studying Computer Science Engineering at SGGSIE&T, Nanded (8.52 CGPA). Currently a Software Engineer Intern at Connecticus Technologies in Pune working on TrustOps Next, with prior internship experience at RGESIndia building AI decision pipelines.",
    facts: ["Software Engineer Intern — Connecticus Technologies", "AI & Backend Intern — RGESIndia", "Distributed Systems & Microservices", "Grounded AI & RAG"],
    link: { label: "Explore the about section", href: "/about" },
  },
  {
    id: "projects",
    match: ["project", "built", "build", "github", "work", "portfolio"],
    title: "Projects Dhiraj has been building",
    body: "Dhiraj's portfolio features Anuvada (Philosophy-Aware RAG System), AI Mesh System with Redis Queue Distribution, and the Automated Paperless Transparent College System, alongside high-performance in-memory and distributed caches.",
    facts: ["Anuvada (RAG + Qdrant)", "AI Mesh System (FastAPI + Redis + Docker)", "Automated College Admin System (React + Django + WebSockets)"],
    showProjects: true,
  },
  {
    id: "skills",
    match: ["skill", "stack", "technology", "technologies", "language", "framework", "tools", "python", "java", "redis"],
    title: "Technical toolkit",
    body: "Dhiraj's skills span Python, Java, C++, SQL, FastAPI, Django REST, React, Node.js, LLMs, RAG, AI Agents, LangGraph, MCP, Docker, Microservices, and Distributed Systems.",
    groups: [
      { name: "Languages & Frameworks", values: ["Python", "Java", "C++", "SQL", "FastAPI", "Django REST", "React"] },
      { name: "AI & GenAI", values: ["LLMs", "RAG Pipelines", "AI Agents", "LangChain", "LangGraph", "MCP"] },
      { name: "Cloud & Systems", values: ["Docker", "Microservices", "Distributed Systems", "Redis", "CI/CD"] },
      { name: "Core Engineering", values: ["Multithreading", "Concurrency", "Sync/Async", "DSA"] },
    ],
    link: { label: "Explore all skills", href: "/skills" },
  },
  {
    id: "education",
    match: ["education", "college", "degree", "academic", "study", "experience", "internship", "timeline"],
    title: "Education & experience",
    body: "Dhiraj is pursuing B.Tech in CSE at SGGSIE&T, Nanded (8.52 CGPA) and holds a Diploma in Computer Engineering from G.H. Raisoni Institute (9.44 CGPA). He is currently a Software Engineer Intern at Connecticus Technologies in Pune.",
    facts: ["B.Tech CSE (SGGSIE&T) — 8.52 CGPA", "Diploma in Computer Engg (G.H. Raisoni) — 9.44 CGPA", "Connecticus Technologies Intern", "RGESIndia Intern"],
    link: { label: "View education", href: "/academics" },
  },
  {
    id: "contact",
    match: ["contact", "email", "hire", "connect", "reach", "message", "resume", "phone"],
    title: "Let's connect",
    body: "For opportunities, collaboration, or engineering discussions, reach Dhiraj at dhirajwasu120@gmail.com or +91 95792 95098. Based in Pune, Maharashtra, India.",
    facts: ["dhirajwasu120@gmail.com", "+91 95792 95098", "Pune, Maharashtra, India", "LinkedIn: dhiraj-wasu"],
    link: { label: "Open contact section", href: "/contact" },
  },
];

export function resolveAnswer(question) {
  const q = question.toLowerCase();
  return answers.find((item) => item.match.some((word) => q.includes(word))) || {
    id: "overview",
    title: "Let's find the right section",
    body: "I can answer questions about Dhiraj's background, featured projects, technical skills, internships, education and contact details. Choose a topic from the guide or try asking in a different way.",
    facts: ["About", "Experience", "Projects", "Skills", "Education", "Contact"],
  };
}
