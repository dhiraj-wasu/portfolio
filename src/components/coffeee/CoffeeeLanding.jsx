import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp, ArrowUpRight, Code2, Coffee, FolderCode,
  Github, Linkedin, MessageSquare, Moon, Sun, UserRound,
  Menu, X
} from "lucide-react";
import CoffeeeBot from "./CoffeeeBot";
import DynamicNavigation from "../navigation/DynamicNavigation";
import { BREWBIT_TAGLINES } from "./brewbitTaglines";

const questions = [
  { label: "Tell me about your engineering journey", prompt: "Tell me about Dhiraj's engineering journey.", icon: UserRound },
  { label: "What are you building at Connecticus?", prompt: "What is Dhiraj building at Connecticus?", icon: Code2 },
  { label: "Show me your most interesting projects", prompt: "Show me Dhiraj's most interesting projects.", icon: FolderCode },
  { label: "What is your approach to backend engineering?", prompt: "What is Dhiraj's approach to backend engineering?", icon: MessageSquare },
  { label: "What makes you different as an engineer?", prompt: "What makes Dhiraj different as an engineer?", icon: Coffee },
];

const work = [
  { title: "Anuvada AI", category: "AI · RETRIEVAL SYSTEMS", description: "A philosophy-aware guidance system with intent-based source routing and quote-faithful retrieval.", stack: "Python / FastAPI / RAG", url: "https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System", kind: "anuvada" },
  { title: "AI Mesh System", category: "BACKEND · DISTRIBUTED SYSTEMS", description: "Distributed AI task orchestration with queue-based workers, retries, heartbeats and load scaling.", stack: "FastAPI / Redis / Python", url: "https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution", kind: "mesh" },
  { title: "ZeroTrust Defender", category: "SECURITY · AUTOMATION", description: "An AI-driven ransomware defence architecture for endpoint detection and threat orchestration.", stack: "Python / EDR / SOAR", url: "https://github.com/dhiraj-wasu/ZeroTrust-Defender-AI-Driven-Ransomware-Detection", kind: "security" },
  { title: "High-Performance Cache", category: "SYSTEMS · C++", description: "A low-latency in-memory cache exploring multithreading, memory structures and eviction algorithms.", stack: "C++ / Concurrency / Systems", url: "https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-", kind: "cache" },
];

export default function CoffeeeLanding({
  theme,
  toggleTheme,
  question,
  setQuestion,
  submitQuestion,
  navigate,
  newConversation,
}) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Transition to idle tagline after 12s of inactivity
  useEffect(() => {
    if (question.trim()) return;
    const timer = setTimeout(() => {
      setIsIdle(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, [question]);

  // Determine dynamic tagline and pose state
  const isTyping = Boolean(question.trim());
  let currentTagline = BREWBIT_TAGLINES.initial;
  let botState = "greeting";

  if (isTyping) {
    currentTagline = BREWBIT_TAGLINES.typing;
    botState = "curious";
  } else if (hasInteracted) {
    currentTagline = BREWBIT_TAGLINES.returnToIdle;
    botState = "idle";
  } else if (isIdle) {
    currentTagline = BREWBIT_TAGLINES.idle;
    botState = "idle";
  } else {
    currentTagline = BREWBIT_TAGLINES.initial;
    botState = "greeting";
  }

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
    if (e.target.value) {
      setHasInteracted(true);
      setIsIdle(false);
    }
  };

  return (
    <div className={`coffeee-app coffeee-landing theme-${theme}`}>
      <DynamicNavigation
        theme={theme}
        toggleTheme={toggleTheme}
        newConversation={newConversation}
      />

      <main className="coffeee-landing-main">
        <section className="coffeee-hero">
          <motion.div
            className="coffeee-hero-mascot"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <CoffeeeBot
              state={botState}
              tagline={currentTagline}
              onClick={() => submitQuestion("Who is Dhiraj?")}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Hey, explorer! <br className="coffeee-mobile-break" />
            <span className="coffeee-hero-nowrap">I'm Brewbit <span className="coffeee-hero-coffee-emoji" role="img" aria-label="coffee">☕︎</span></span>
          </motion.h1>

          <div className="coffeee-hero-kicker">
            YOUR LITTLE GUIDE TO EXPLORING THIS PORTFOLIO
          </div>

          <p className="coffeee-hero-copy">
            Curious about something? I can take you through his projects, skills, experience, and everything he's building. Pick a suggestion or ask me anything!
          </p>

          <form
            className="coffeee-landing-composer"
            onSubmit={(e) => {
              e.preventDefault();
              submitQuestion();
            }}
          >
            <textarea
              data-tour="chat-input"
              value={question}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitQuestion();
                }
              }}
              placeholder="Ask anything about Dhiraj..."
              rows={2}
              aria-label="Ask Brewbit about Dhiraj"
            />
            <div className="coffeee-landing-composer-bottom">
              <span className="coffeee-composer-hint">
                <Coffee size={15} /> Brewbit is ready to help you explore
              </span>
              <button
                type="submit"
                disabled={!question.trim()}
                aria-label="Send question"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </form>

          <div className="coffeee-try-asking">
            <span>TRY ASKING</span>
            <div>
              {questions.map(({ label, prompt, icon: Icon }) => (
                <button key={label} onClick={() => submitQuestion(prompt)}>
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="coffeee-selected-work" id="selected-work" data-tour="selected-work">
          <div className="coffeee-section-heading">
            <div>
              <span>SELECTED WORK</span>
              <h3>A few things I’ve been building.</h3>
            </div>
            <button onClick={() => navigate("/projects")} data-tour="all-projects-btn">
              All projects <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="coffeee-featured-grid">
            {work.map((p, i) => (
              <a
                className="coffeee-featured-card"
                data-tour={i === 0 ? "project-card" : undefined}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                key={p.title}
              >
                <div className={`coffeee-project-visual coffeee-project-visual--${p.kind}`}>
                  <span className="coffeee-visual-index">0{i + 1}</span>
                  {p.kind === "anuvada" && (
                    <div className="coffeee-visual-orbit">
                      <span>Intent</span>
                      <i />
                      <b>Source</b>
                      <i />
                      <strong>Answer</strong>
                    </div>
                  )}
                  {p.kind === "mesh" && (
                    <div className="coffeee-visual-nodes">
                      <i /><i /><i /><i /><i />
                      <b>QUEUE</b>
                    </div>
                  )}
                  {p.kind === "security" && (
                    <div className="coffeee-visual-shield">
                      <div>ZT</div>
                      <span>DEFENCE LAYER</span>
                    </div>
                  )}
                  {p.kind === "cache" && (
                    <div className="coffeee-visual-cache">
                      <span>GET</span>
                      <b>key → value</b>
                      <span>HIT · 0.4ms</span>
                    </div>
                  )}
                  <ArrowUpRight className="coffeee-project-open" size={17} />
                </div>
                <div className="coffeee-featured-meta">{p.category}</div>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                <small>{p.stack}</small>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="coffeee-landing-footer">
        <span>© {new Date().getFullYear()} Dhiraj Wasu</span>
        <span>BUILT WITH CURIOSITY <Coffee size={12} /></span>
      </footer>
    </div>
  );
}
