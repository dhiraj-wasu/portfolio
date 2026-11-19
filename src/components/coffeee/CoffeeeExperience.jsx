import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUp, ChevronDown, Code2, Coffee, ExternalLink,
  FolderCode, GraduationCap, Mail, MessageSquare, Moon, Plus,
  Sun, UserRound, X
} from "lucide-react";
import CoffeeeLanding from "./CoffeeeLanding";
import CoffeeeBot from "./CoffeeeBot";
import { projects, answers, resolveAnswer } from "./coffeeeData";
import "./coffeee.css";

const navigation = [
  { label: "About Dhiraj", icon: UserRound, prompt: "Tell me about Dhiraj." },
  { label: "Projects", icon: FolderCode, prompt: "Show me Dhiraj's projects." },
  { label: "Technical skills", icon: Code2, prompt: "What are Dhiraj's technical skills?" },
  { label: "Experience & education", icon: GraduationCap, prompt: "Tell me about Dhiraj's education and experience." },
  { label: "Contact", icon: Mail, prompt: "How can I contact Dhiraj?" },
];

function AssistantAnswer({ answer, navigate }) {
  return (
    <article className="coffeee-answer">
      <div className="coffeee-answer-mark"><Coffee size={15} /></div>
      <div className="coffeee-answer-content">
        <div className="coffeee-answer-label">BREWBIT</div>
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
  const [view, setView] = useState("landing");

  const suggestions = [
    "Who is Dhiraj?",
    "Show me the projects",
    "What technologies does he use?",
    "Tell me about his education",
  ];

  useEffect(() => {
    if (botState === "idle" && messages.length > 0) {
      const timer = window.setTimeout(() => {
        setBotState("relaxing");
      }, 14000);
      return () => window.clearTimeout(timer);
    }
  }, [botState, messages.length]);

  const submitQuestion = (value = question) => {
    const clean = value.trim();
    if (!clean) return;
    const answer = resolveAnswer(clean);
    const topic = clean.length > 32 ? clean.slice(0, 32) + "…" : clean;
    setQuestion("");
    setView("chat");
    setActiveTopic(topic);
    setHistory((current) => current.includes(topic) ? current : [topic, ...current].slice(0, 8));
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", text: clean }]);
    setBotState("thinking");
    window.setTimeout(() => {
      setBotState("working");
      window.setTimeout(() => {
        setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", answer }]);
        setBotState("explaining");
        window.setTimeout(() => {
          setBotState("completed");
          window.setTimeout(() => {
            setBotState("idle");
          }, 3200);
        }, 1500);
      }, 700);
    }, 500);
  };

  const newConversation = () => {
    setMessages([]);
    setQuestion("");
    setView("landing");
    setActiveTopic("A new conversation");
    setBotState("idle");
    setSidebarOpen(false);
  };


  if (view === "landing") {
    return <CoffeeeLanding theme={theme} toggleTheme={toggleTheme} question={question} setQuestion={setQuestion} submitQuestion={submitQuestion} navigate={navigate} newConversation={newConversation} />;
  }

  return (
    <div className={`coffeee-app theme-${theme}`}>
      <aside className={`coffeee-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="coffeee-sidebar-brand">
          <button className="coffeee-wordmark" onClick={newConversation}><span className="coffeee-brand-icon"><Coffee size={17} /></span>brewbit<span className="coffeee-wordmark-dot">.</span></button>
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
              <div className="coffeee-thread-intro"><span className="coffeee-thread-avatar"><CoffeeeBot state={botState} compact /></span><div><strong>Brewbit</strong><p>Here’s what I found in Dhiraj’s portfolio.</p></div></div>
              {messages.map((message) => message.role === "user" ? (
                <div className="coffeee-user-row" key={message.id}><div className="coffeee-user-message">{message.text}</div></div>
              ) : <AssistantAnswer answer={message.answer} navigate={navigate} key={message.id} />)}
              {botState === "thinking" || botState === "working" ? <div className="coffeee-typing"><CoffeeeBot state={botState} compact /><span className="coffeee-dot" /><span className="coffeee-dot" /><span className="coffeee-dot" /> Brewbit is preparing a response</div> : null}
            </div>
          )}
        </section>

        <footer className="coffeee-composer-wrap">
          <form className="coffeee-composer" onSubmit={(event) => { event.preventDefault(); submitQuestion(); }}>
            <textarea
              value={question}
              onChange={(event) => { setQuestion(event.target.value); setBotState(event.target.value.trim() ? "curious" : "idle"); }}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submitQuestion(); } }}
              placeholder="Message Brewbit..."
              rows={1}
              aria-label="Message Brewbit"
            />
            <button type="submit" disabled={!question.trim()} aria-label="Send message"><ArrowUp size={18}/></button>
          </form>
          <p className="coffeee-disclaimer">Brewbit uses curated information from this portfolio. It isn't a live AI assistant.</p>
        </footer>
      </main>
    </div>
  );
}
