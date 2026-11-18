import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ArrowUp, BriefcaseBusiness, Code2, Coffee, FolderCode,
  Mail, Moon, Plus, Search, Sun, UserRound, X
} from "lucide-react";
import CoffeeeBot from "./CoffeeeBot";
import "./coffeee.css";

const suggestions = [
  { label: "Who is Dhiraj?", icon: UserRound, prompt: "Tell me about Dhiraj and his engineering interests." },
  { label: "Explore projects", icon: FolderCode, prompt: "Show me Dhiraj's most interesting projects." },
  { label: "Technical skills", icon: Code2, prompt: "What technologies does Dhiraj work with?" },
];

const destinations = [
  { label: "About", to: "/about", icon: UserRound },
  { label: "Projects", to: "/projects", icon: FolderCode },
  { label: "Skills", to: "/skills", icon: Code2 },
  { label: "Education", to: "/academics", icon: BriefcaseBusiness },
  { label: "Contact", to: "/contact", icon: Mail },
];

const knowledge = [
  {
    keys: ["who", "about", "dhiraj", "yourself"],
    title: "A little about Dhiraj",
    text: "Dhiraj Wasu is a computer science engineer interested in backend engineering, distributed systems, and AI-powered applications. He enjoys understanding how systems work under the hood and building practical software around those ideas.",
    tags: ["Backend engineering", "Distributed systems", "AI & RAG", "System design"],
    links: [{ label: "Read about Dhiraj", to: "/about" }],
  },
  {
    keys: ["project", "trustops", "risktrack", "anuvada", "cache", "mesh", "medisure", "zerotrust"],
    title: "Projects worth exploring",
    text: "Dhiraj's portfolio includes Anuvada AI, an AI Mesh System with queue-based distribution, ZeroTrust Defender, high-performance and thread-safe cache projects, and MediSure AI. Each project explores a different engineering problem.",
    tags: ["Anuvada AI", "AI Mesh", "ZeroTrust Defender", "Distributed Cache", "MediSure AI"],
    links: [{ label: "Explore all projects", to: "/projects" }],
  },
  {
    keys: ["skill", "technology", "stack", "language", "python", "java", "backend"],
    title: "Technical toolkit",
    text: "The portfolio highlights programming with C, C++, Python and Java; backend development with FastAPI and Django REST Framework; and systems work involving Redis, concurrency, distributed systems and AI/RAG.",
    tags: ["Python", "Java", "FastAPI", "Django REST", "Redis", "RAG"],
    links: [{ label: "Browse skills", to: "/skills" }],
  },
  {
    keys: ["education", "college", "degree", "academic"],
    title: "Education",
    text: "Dhiraj studied Computer Science and Engineering at Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded, after completing a Diploma in Computer Science and Engineering at G.H. Raisoni Institute.",
    tags: ["Computer Science", "SGGSIE&T", "G.H. Raisoni"],
    links: [{ label: "View education", to: "/academics" }],
  },
  {
    keys: ["contact", "email", "hire", "connect", "reach"],
    title: "Let's connect",
    text: "Want to discuss an engineering role, a project, or an idea? You can reach Dhiraj through the contact section or email.",
    tags: ["Collaboration", "Engineering", "Opportunities"],
    links: [{ label: "Contact Dhiraj", to: "/contact" }],
  },
];

function getAnswer(question) {
  const normalized = question.toLowerCase();
  const match = knowledge.find((item) => item.keys.some((key) => normalized.includes(key)));
  return match || {
    title: "Let's explore that",
    text: "I can help you explore Dhiraj's background, projects, technical skills, education and contact details. Try one of those topics, or use the portfolio sections to browse directly.",
    tags: ["About", "Projects", "Skills", "Education"],
    links: destinations.map(({ label, to }) => ({ label, to })),
  };
}

function ThemeButton({ theme, onToggle }) {
  return (
    <button className="coffeee-icon-button" type="button" onClick={onToggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
      {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}

export default function CoffeeeExperience({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [view, setView] = useState("home");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [botState, setBotState] = useState("idle");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const startChat = (prompt = question) => {
    const clean = prompt.trim();
    if (!clean) return;
    setQuestion("");
    setView("chat");
    setBotState("thinking");
    const answer = getAnswer(clean);
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", text: clean },
    ]);
    window.setTimeout(() => {
      setBotState("working");
      window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          { id: crypto.randomUUID(), role: "assistant", answer },
        ]);
        setBotState("done");
      }, 650);
    }, 420);
  };

  const openSection = (to) => navigate(to);

  const currentTopic = useMemo(() => {
    const last = [...messages].reverse().find((message) => message.role === "user");
    return last ? last.text.length > 34 ? `${last.text.slice(0, 34)}…` : last.text : "New conversation";
  }, [messages]);

  return (
    <div className={`coffeee-app theme-${theme}`}>
      <header className="coffeee-topbar">
        <button className="coffeee-wordmark" type="button" onClick={() => { setView("home"); setMessages([]); }}>
          <span className="coffeee-brand-icon"><Coffee size={18} /></span>
          <span>coffeee<span className="coffeee-wordmark-dot">.</span></span>
        </button>
        <div className="coffeee-topbar-actions">
          <span className="coffeee-topbar-note">A little portfolio, a lot to explore</span>
          <ThemeButton theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === "home" ? (
          <motion.main
            key="home"
            className="coffeee-home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32 }}
          >
            <div className="coffeee-orb coffeee-orb--one" />
            <div className="coffeee-orb coffeee-orb--two" />
            <div className="coffeee-home-content">
              <div className="coffeee-eyebrow"><span /> YOUR PERSONAL PORTFOLIO GUIDE</div>
              <h1>Hey, I'm <span>Coffeee.</span></h1>
              <p className="coffeee-home-subtitle">Let's explore Dhiraj's world.</p>
              <p className="coffeee-home-copy">
                Curious about his engineering journey, the systems he builds, or the ideas he's exploring?
                Ask away. I'll help you find your way around.
              </p>
              <div className="coffeee-hero-bot">
                <CoffeeeBot state={botState} onClick={() => startChat("What can you tell me about Dhiraj?")} />
              </div>
              <form className="coffeee-prompt" onSubmit={(event) => { event.preventDefault(); startChat(); }}>
                <input
                  value={question}
                  onChange={(event) => { setQuestion(event.target.value); setBotState(event.target.value ? "curious" : "idle"); }}
                  placeholder="Ask Coffeee anything..."
                  aria-label="Ask Coffeee anything"
                />
                <button type="submit" aria-label="Send question" disabled={!question.trim()}><ArrowUp size={19} /></button>
              </form>
              <div className="coffeee-suggestions">
                {suggestions.map(({ label, icon: Icon, prompt }) => (
                  <button type="button" key={label} onClick={() => startChat(prompt)}>
                    <Icon size={15} /> {label}
                  </button>
                ))}
              </div>
              <div className="coffeee-section-nav">
                {destinations.map(({ label, to, icon: Icon }) => (
                  <button type="button" key={label} onClick={() => openSection(to)}>
                    <Icon size={17} /><span>{label}</span><ArrowRight className="coffeee-nav-arrow" size={13} />
                  </button>
                ))}
              </div>
            </div>
            <footer className="coffeee-home-footer">Built with curiosity by Dhiraj Wasu <span>·</span> Powered by Coffeee</footer>
          </motion.main>
        ) : (
          <motion.main
            key="chat"
            className="coffeee-chat-layout"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            <aside className={`coffeee-sidebar ${sidebarOpen ? "is-open" : ""}`}>
              <div className="coffeee-sidebar-head">
                <span className="coffeee-sidebar-label">YOUR SPACE</span>
                <button className="coffeee-icon-button coffeee-mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"><X size={17} /></button>
              </div>
              <button className="coffeee-new-chat" onClick={() => { setMessages([]); setView("home"); setSidebarOpen(false); }}><Plus size={16} /> New conversation</button>
              <div className="coffeee-sidebar-group">
                <span>EXPLORE PORTFOLIO</span>
                {destinations.map(({ label, to, icon: Icon }) => (
                  <button key={label} onClick={() => openSection(to)}><Icon size={16} />{label}</button>
                ))}
              </div>
              <div className="coffeee-sidebar-group">
                <span>THIS SESSION</span>
                <button className="is-current"><Search size={15} />{currentTopic}</button>
              </div>
              <div className="coffeee-sidebar-bottom">
                <Coffee size={17} /> Coffeee Bot <span className="coffeee-online-dot" />
              </div>
            </aside>
            {sidebarOpen && <button className="coffeee-sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}
            <section className="coffeee-conversation">
              <div className="coffeee-chat-heading">
                <button className="coffeee-icon-button coffeee-mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar"><span className="coffeee-menu-lines" /></button>
                <div><span className="coffeee-chat-kicker">COFFEEE CONVERSATION</span><h2>{currentTopic}</h2></div>
                <button className="coffeee-back-home" onClick={() => { setView("home"); setMessages([]); }}><Coffee size={15} /> Home</button>
              </div>
              <div className="coffeee-messages">
                <div className="coffeee-welcome-row">
                  <div className="coffeee-mini-bot"><Coffee size={20} /></div>
                  <div><strong>Hey, I'm Coffeee.</strong><p>I'll help you explore Dhiraj's work. What would you like to know?</p></div>
                </div>
                {messages.map((message) => message.role === "user" ? (
                  <div className="coffeee-user-message" key={message.id}>{message.text}</div>
                ) : (
                  <article className="coffeee-answer" key={message.id}>
                    <div className="coffeee-answer-brand"><span><Coffee size={15} /></span> COFFEEE</div>
                    <h3>{message.answer.title}</h3>
                    <p>{message.answer.text}</p>
                    <div className="coffeee-answer-tags">{message.answer.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="coffeee-answer-links">{message.answer.links.map((link) => (
                      <button key={link.label} onClick={() => link.to && openSection(link.to)}>{link.label}<ArrowRight size={14} /></button>
                    ))}</div>
                    <small className="coffeee-preview-note">Portfolio preview · Curated information</small>
                  </article>
                ))}
              </div>
              <form className="coffeee-composer" onSubmit={(event) => { event.preventDefault(); startChat(); }}>
                <textarea
                  value={question}
                  onChange={(event) => { setQuestion(event.target.value); setBotState(event.target.value ? "curious" : "idle"); }}
                  onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); startChat(); } }}
                  placeholder="Ask a follow-up..."
                  rows={1}
                  aria-label="Ask a follow-up question"
                />
                <button type="submit" disabled={!question.trim()} aria-label="Send message"><ArrowUp size={18} /></button>
                <span>Enter to send · Shift + Enter for a new line</span>
              </form>
            </section>
            <div className="coffeee-chat-pet"><CoffeeeBot compact state={botState} onClick={() => setBotState("greeting")} /></div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
