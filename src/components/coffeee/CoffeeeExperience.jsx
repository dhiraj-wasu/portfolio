import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp, ChevronDown, Code2, Coffee, ExternalLink,
  FolderCode, GraduationCap, Mail, MessageSquare, Moon, Plus,
  Sun, UserRound, X
} from "lucide-react";
import CoffeeeBot from "./CoffeeeBot";
import "./coffeee.css";

const navigation = [
  { label: "About Dhiraj", icon: UserRound, prompt: "Tell me about Dhiraj." },
  { label: "Projects", icon: FolderCode, prompt: "Show me Dhiraj's projects." },
  { label: "Technical skills", icon: Code2, prompt: "What are Dhiraj's technical skills?" },
  { label: "Experience & education", icon: GraduationCap, prompt: "Tell me about Dhiraj's education and experience." },
  { label: "Contact", icon: Mail, prompt: "How can I contact Dhiraj?" },
];

const projects = [
  { title: "Anuvada AI — Guidance System", description: "A philosophy-aware RAG system with intent-based source routing and quote-faithful retrieval.", stack: "Python · FastAPI · RAG · Vector DB", url: "https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System" },
  { title: "AI Mesh System with Queue Distribution", description: "Distributed AI task orchestration with Redis queues, worker heartbeats, retries and load scaling.", stack: "FastAPI · Redis · Distributed Systems", url: "https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution" },
  { title: "ZeroTrust Defender", description: "An AI-driven ransomware defence architecture for endpoint detection, isolation and threat orchestration.", stack: "Python · Cybersecurity · EDR/SOAR", url: "https://github.com/dhiraj-wasu/ZeroTrust-Defender-AI-Driven-Ransomware-Detection" },
  { title: "High-Performance In-Memory Cache", description: "A low-latency C++ cache engine exploring multithreading, memory structures and eviction algorithms.", stack: "C++ · Multithreading · Systems", url: "https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-" },
  { title: "Thread-Safe Distributed Cache", description: "A Java caching layer focused on thread safety, locking, eviction policies and concurrent access.", stack: "Java · Concurrency · Data Structures", url: "https://github.com/dhiraj-wasu/Thread-Safe-Distributed-Cache-Concurrency-focused-JAVA-" },
  { title: "MediSure AI — Emergency Response Orchestrator", description: "A healthcare response platform concept with emergency dispatch coordination and AI-assisted data aggregation.", stack: "Python · FastAPI · Microservices", url: "https://github.com/dhiraj-wasu/MediSure-AI" },
];

const answers = [
  {
    id: "about", match: ["about", "who", "dhiraj", "yourself", "background", "introduction"],
    title: "A little about Dhiraj",
    body: "Dhiraj Wasu is a Computer Science Engineering student at SGGSIE&T, Nanded. His interests sit at the intersection of backend engineering, distributed systems and AI. He enjoys understanding how systems behave under the hood, then turning that understanding into practical software.",
    facts: ["Backend engineering", "Distributed systems", "System design", "AI & automation"],
    link: { label: "Explore the about section", href: "/about" },
  },
  {
    id: "projects", match: ["project", "built", "build", "github", "work", "portfolio"],
    title: "Projects Dhiraj has been building",
    body: "The projects below cover AI retrieval, distributed task orchestration, cybersecurity and systems programming. Open a repository to inspect the implementation.",
    facts: ["6 featured projects", "Backend & systems focus"],
    showProjects: true,
  },
  {
    id: "skills", match: ["skill", "stack", "technology", "technologies", "language", "framework", "tools", "python", "java", "redis"],
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
    id: "education", match: ["education", "college", "degree", "academic", "study", "experience", "internship"],
    title: "Education & experience",
    body: "Dhiraj studied Computer Science and Engineering at Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded, following a Diploma in Computer Science and Engineering at G.H. Raisoni Institute. His portfolio focuses on practical backend and systems engineering work.",
    facts: ["B.Tech — Computer Science & Engineering", "Diploma — Computer Science & Engineering", "SGGSIE&T, Nanded", "G.H. Raisoni Institute"],
    link: { label: "View education", href: "/academics" },
  },
  {
    id: "contact", match: ["contact", "email", "hire", "connect", "reach", "message"],
    title: "Let's connect",
    body: "For opportunities, collaboration or a technical discussion, you can reach Dhiraj directly by email or through his professional profiles.",
    facts: ["dhirajwasu120@gmail.com", "GitHub: dhiraj-wasu", "LinkedIn: dhiraj-wasu"],
    link: { label: "Open contact section", href: "/contact" },
  },
];

function resolveAnswer(question) {
  const q = question.toLowerCase();
  return answers.find((item) => item.match.some((word) => q.includes(word))) || {
    id: "overview",
    title: "Let's find the right section",
    body: "I can answer questions about Dhiraj's background, featured projects, technical skills, education and contact details. Choose a topic from the sidebar or try asking in a different way.",
    facts: ["About", "Projects", "Skills", "Education", "Contact"],
  };
}

function AssistantAnswer({ answer, navigate }) {
  return (
    <article className="coffeee-answer">
      <div className="coffeee-answer-mark"><Coffee size={15} /></div>
      <div className="coffeee-answer-content">
        <div className="coffeee-answer-label">COFFEEe</div>
        <h2>{answer.title}</h2>
        <p>{answer.body}</p>
        {answer.facts && <div className="coffeee-fact-list">{answer.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>}
        {answer.groups && <div className="coffeee-skill-groups">{answer.groups.map((group) => (
          <section key={group.name}><h3>{group.name}</h3><div>{group.values.map((value) => <span key={value}>{value}</span>)}</div></section>
        ))}</div>}
        {answer.showProjects && <div className="coffeee-project-grid">{projects.map((project, index) => (
          <a className="coffeee-project-card" href={project.url} target="_blank" rel="noreferrer" key={project.title}>
            <div className="coffeee-project-card-top"><span>0{index + 1}</span><ExternalLink size={14} /></div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <small>{project.stack}</small>
          </a>
        ))}</div>}
        {answer.link && <button className="coffeee-inline-link" onClick={() => navigate(answer.link.href)}>{answer.link.label}<ExternalLink size={14} /></button>}
        <div className="coffeee-answer-foot">Curated portfolio information</div>
      </div>
    </article>
  );
}

export default function CoffeeeExperience({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeTopic, setActiveTopic] = useState("A new conversation");
  const [botState, setBotState] = useState("idle");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const suggestions = [
    "Who is Dhiraj?",
    "Show me the projects",
    "What technologies does he use?",
    "Tell me about his education",
  ];

  const submitQuestion = (value = question) => {
    const clean = value.trim();
    if (!clean) return;
    const answer = resolveAnswer(clean);
    const topic = clean.length > 32 ? clean.slice(0, 32) + "…" : clean;
    setQuestion("");
    setActiveTopic(topic);
    setHistory((current) => current.includes(topic) ? current : [topic, ...current].slice(0, 8));
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", text: clean }]);
    setBotState("thinking");
    window.setTimeout(() => {
      setBotState("working");
      window.setTimeout(() => {
        setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", answer }]);
        setBotState("done");
      }, 380);
    }, 220);
  };

  const newConversation = () => {
    setMessages([]);
    setQuestion("");
    setActiveTopic("A new conversation");
    setBotState("idle");
    setSidebarOpen(false);
  };


  return (
    <div className={`coffeee-app theme-${theme}`}>
      <aside className={`coffeee-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="coffeee-sidebar-brand">
          <button className="coffeee-wordmark" onClick={newConversation}><span className="coffeee-brand-icon"><Coffee size={17} /></span>coffeee<span className="coffeee-wordmark-dot">.</span></button>
          <button className="coffeee-icon-button coffeee-close-sidebar" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"><X size={17} /></button>
        </div>
        <button className="coffeee-new-chat" onClick={newConversation}><Plus size={16} /> New chat</button>
        <div className="coffeee-sidebar-section">
          <span className="coffeee-sidebar-caption">PORTFOLIO</span>
          {navigation.map(({ label, icon: Icon, prompt }) => (
            <button key={label} onClick={() => { submitQuestion(prompt); setSidebarOpen(false); }}><Icon size={16} />{label}</button>
          ))}
        </div>
        <div className="coffeee-sidebar-section coffeee-history">
          <span className="coffeee-sidebar-caption">RECENT CONVERSATIONS</span>
          {history.length ? history.map((item, index) => (
            <button className={item === activeTopic ? "is-active" : ""} key={item + index} onClick={() => { setMessages([]); setActiveTopic(item); submitQuestion(item); setSidebarOpen(false); }}><MessageSquare size={14} /><span>{item}</span></button>
          )) : <p className="coffeee-history-empty">Your conversations will appear here.</p>}
        </div>
        <div className="coffeee-sidebar-profile">
          <div className="coffeee-avatar">D</div>
          <div><strong>Dhiraj Wasu</strong><span>Portfolio visitor view</span></div>
          <ChevronDown size={15} />
        </div>
      </aside>

      {sidebarOpen && <button className="coffeee-sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}

      <main className="coffeee-main">
        <header className="coffeee-topbar">
          <div className="coffeee-topbar-left">
            <button className="coffeee-icon-button coffeee-open-sidebar" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar"><span className="coffeee-menu-lines" /></button>
            <span className="coffeee-current-title">{activeTopic}</span>
            <ChevronDown size={15} className="coffeee-title-chevron" />
          </div>
          <div className="coffeee-topbar-right">
            <span className="coffeee-mode-label">PORTFOLIO GUIDE</span>
            <button className="coffeee-icon-button" onClick={toggleTheme} aria-label="Toggle theme">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </header>

        <section className={`coffeee-thread ${messages.length ? "has-messages" : "is-empty"}`}>
          {messages.length === 0 ? (
            <div className="coffeee-empty-state">
              <div className="coffeee-empty-bot"><CoffeeeBot state={botState} onClick={() => submitQuestion("Who is Dhiraj?")} /></div>
              <div className="coffeee-eyebrow"><span /> YOUR PERSONAL PORTFOLIO GUIDE</div>
              <h1>What would you like<br />to know about <em>Dhiraj?</em></h1>
              <p>Explore the work, ideas and engineering journey behind the portfolio.</p>
              <div className="coffeee-suggestion-grid">
                {suggestions.map((item) => <button key={item} onClick={() => submitQuestion(item)}>{item}<ArrowUp size={14} /></button>)}
              </div>
            </div>
          ) : (
            <div className="coffeee-message-list">
              <div className="coffeee-thread-intro"><span className="coffeee-thread-avatar"><Coffee size={17} /></span><div><strong>Coffeee</strong><p>Here’s what I found in Dhiraj’s portfolio.</p></div></div>
              {messages.map((message) => message.role === "user" ? (
                <div className="coffeee-user-row" key={message.id}><div className="coffeee-user-message">{message.text}</div></div>
              ) : <AssistantAnswer answer={message.answer} navigate={navigate} key={message.id} />)}
              {botState === "thinking" || botState === "working" ? <div className="coffeee-typing"><span /><span /><span /> Coffeee is preparing a response</div> : null}
            </div>
          )}
        </section>

        <footer className="coffeee-composer-wrap">
          <form className="coffeee-composer" onSubmit={(event) => { event.preventDefault(); submitQuestion(); }}>
            <textarea
              value={question}
              onChange={(event) => { setQuestion(event.target.value); setBotState(event.target.value ? "curious" : "idle"); }}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submitQuestion(); } }}
              placeholder="Message Coffeee..."
              rows={1}
              aria-label="Message Coffeee"
            />
            <button type="submit" disabled={!question.trim()} aria-label="Send message"><ArrowUp size={18} /></button>
          </form>
          <p className="coffeee-disclaimer">Coffeee uses curated information from this portfolio. It isn't a live AI assistant.</p>
        </footer>
      </main>
    </div>
  );
}
