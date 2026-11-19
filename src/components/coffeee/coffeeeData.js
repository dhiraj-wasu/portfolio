export const projects = [
  {
    title: "Anuvada AI — Guidance System",
    category: "AI & Retrieval Systems",
    description: "A philosophy-aware RAG system with intent-based source routing and quote-faithful retrieval.",
    stack: "Python · FastAPI · RAG · Vector DB",
    url: "https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System",
  },
  {
    title: "AI Mesh System with Queue Distribution",
    category: "Distributed Systems & Backend",
    description: "Distributed AI task orchestration with Redis queues, worker heartbeats, retries and load scaling.",
    stack: "FastAPI · Redis · Distributed Systems",
    url: "https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution",
  },
  {
    title: "ZeroTrust Defender",
    category: "Cybersecurity & Automation",
    description: "An AI-driven ransomware defence architecture for endpoint detection, isolation and threat orchestration.",
    stack: "Python · Cybersecurity · EDR/SOAR",
    url: "https://github.com/dhiraj-wasu/ZeroTrust-Defender-AI-Driven-Ransomware-Detection",
  },
  {
    title: "High-Performance In-Memory Cache",
    category: "Systems & High Performance",
    description: "A low-latency C++ cache engine exploring multithreading, memory structures and eviction algorithms.",
    stack: "C++ · Multithreading · Systems",
    url: "https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-",
  },
  {
    title: "Thread-Safe Distributed Cache",
    category: "Systems & Concurrency",
    description: "A Java caching layer focused on thread safety, locking, eviction policies and concurrent access.",
    stack: "Java · Concurrency · Data Structures",
    url: "https://github.com/dhiraj-wasu/Thread-Safe-Distributed-Cache-Concurrency-focused-JAVA-",
  },
  {
    title: "MediSure AI — Emergency Response Orchestrator",
    category: "Microservices & Distributed Systems",
    description: "A healthcare response platform concept with emergency dispatch coordination and AI-assisted data aggregation.",
    stack: "Python · FastAPI · Microservices",
    url: "https://github.com/dhiraj-wasu/MediSure-AI",
  },
];

export const skillsByDomain = [
  {
    domain: "Languages",
    skills: ["C", "C++", "Python", "Java", "SQL"],
  },
  {
    domain: "Backend & Distributed Systems",
    skills: ["FastAPI", "Django REST Framework", "Microservices", "Celery", "WebSockets", "Redis", "Docker"],
  },
  {
    domain: "Systems & Concurrency",
    skills: ["Multithreading", "Thread Safety", "In-Memory Caching", "Locking & Eviction Policies", "System Architecture"],
  },
  {
    domain: "AI & Automation",
    skills: ["LLMs", "RAG Pipelines", "Vector Databases", "Agent Architectures", "Prompt Engineering"],
  },
];

export const answers = [
  {
    id: "about",
    match: ["about", "who", "dhiraj", "yourself", "background", "introduction"],
    title: "A little about Dhiraj",
    body: "Dhiraj Wasu is a Computer Science Engineering student at SGGSIE&T, Nanded. His interests sit at the intersection of backend engineering, distributed systems and AI. He enjoys understanding how systems behave under the hood, then turning that understanding into practical software.",
    facts: ["Backend engineering", "Distributed systems", "System design", "AI & automation"],
    link: { label: "Explore the about section", href: "/about" },
  },
  {
    id: "projects",
    match: ["project", "built", "build", "github", "work", "portfolio"],
    title: "Projects Dhiraj has been building",
    body: "The projects below cover AI retrieval, distributed task orchestration, cybersecurity and systems programming. Open a repository to inspect the implementation.",
    facts: ["6 featured projects", "Backend & systems focus"],
    showProjects: true,
  },
  {
    id: "skills",
    match: ["skill", "stack", "technology", "technologies", "language", "framework", "tools", "python", "java", "redis"],
    title: "Technical toolkit",
    body: "Dhiraj's listed skills span programming languages, backend frameworks, infrastructure and AI systems. These are the technologies represented in the portfolio.",
    groups: [
      { name: "Languages", values: ["C", "C++", "Python", "Java", "SQL"] },
      { name: "Backend", values: ["FastAPI", "Django REST Framework", "Microservices", "Celery", "WebSockets"] },
      { name: "Systems", values: ["Distributed systems", "Concurrency", "Redis", "Docker"] },
      { name: "AI", values: ["LLMs", "RAG", "Agent architectures", "Automation"] },
    ],
    link: { label: "Explore all skills", href: "/skills" },
  },
  {
    id: "education",
    match: ["education", "college", "degree", "academic", "study", "experience", "internship", "timeline"],
    title: "Education & experience",
    body: "Dhiraj studied Computer Science and Engineering at Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded, following a Diploma in Computer Science and Engineering at G.H. Raisoni Institute. His portfolio focuses on practical backend and systems engineering work.",
    facts: ["B.Tech — Computer Science & Engineering", "Diploma — Computer Science & Engineering", "SGGSIE&T, Nanded", "G.H. Raisoni Institute"],
    link: { label: "View education", href: "/academics" },
  },
  {
    id: "contact",
    match: ["contact", "email", "hire", "connect", "reach", "message", "resume"],
    title: "Let's connect",
    body: "For opportunities, collaboration or a technical discussion, you can reach Dhiraj directly by email or through his professional profiles.",
    facts: ["dhirajwasu120@gmail.com", "GitHub: dhiraj-wasu", "LinkedIn: dhiraj-wasu"],
    link: { label: "Open contact section", href: "/contact" },
  },
];

export function resolveAnswer(question) {
  const q = question.toLowerCase();
  return answers.find((item) => item.match.some((word) => q.includes(word))) || {
    id: "overview",
    title: "Let's find the right section",
    body: "I can answer questions about Dhiraj's background, featured projects, technical skills, education and contact details. Choose a topic from the guide or try asking in a different way.",
    facts: ["About", "Projects", "Skills", "Education", "Contact"],
  };
}
