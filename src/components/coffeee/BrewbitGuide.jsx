import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Compass, FolderCode, Code2, GraduationCap, HelpCircle,
  X, ArrowRight, ArrowUp, ChevronLeft, ExternalLink,
  Sparkles, Coffee, Send
} from "lucide-react";
import CoffeeeBot from "./CoffeeeBot";
import { projects, skillsByDomain, answers, resolveAnswer } from "./coffeeeData";

const STORAGE_KEY = "brewbit_welcome_seen";

export default function BrewbitGuide({ theme = "light" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Mode: "hidden" | "bubble" | "expanded" | "response" | "floating"
  const [guideState, setGuideState] = useState(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    return seen === "true" ? "floating" : "hidden";
  });

  const [botPose, setBotPose] = useState("greeting");
  const [customQuestion, setCustomQuestion] = useState("");
  const [activeResponse, setActiveResponse] = useState(null);
  const inputRef = useRef(null);

  // First-visit 5-second delay
  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen === "true") return;

    const timer = setTimeout(() => {
      setGuideState((current) => {
        if (current === "hidden") {
          setBotPose("greeting");
          return "bubble";
        }
        return current;
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Dismiss handler
  const handleDismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setGuideState("floating");
    setActiveResponse(null);
    setBotPose("idle");
  }, []);

  // Open guide from floating or bubble
  const handleOpenExpanded = useCallback(() => {
    setGuideState("expanded");
    setActiveResponse(null);
    setBotPose("curious");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  }, []);

  // Return to suggestion list
  const handleBackToSuggestions = useCallback(() => {
    setActiveResponse(null);
    setGuideState("expanded");
    setBotPose("curious");
  }, []);

  // Contextual suggestions based on route
  const currentPath = location.pathname;

  const suggestions = useMemo(() => {
    const list = [
      {
        id: "tour",
        label: "Give me a quick tour",
        icon: Compass,
        action: "tour",
        visible: true,
      },
      {
        id: "projects",
        label: "Explore Dhiraj's projects",
        icon: FolderCode,
        action: "projects",
        visible: currentPath !== "/projects",
      },
      {
        id: "skills",
        label: "See his skills and tech stack",
        icon: Code2,
        action: "skills",
        visible: currentPath !== "/skills",
      },
      {
        id: "experience",
        label: "Check out his experience",
        icon: GraduationCap,
        action: "experience",
        visible: currentPath !== "/academics",
      },
      {
        id: "how-to",
        label: "How do I use this portfolio?",
        icon: HelpCircle,
        action: "how-to",
        visible: true,
      },
    ];

    return list.filter((item) => item.visible);
  }, [currentPath]);

  // Execute selected action
  const handleSelectSuggestion = useCallback(
    (actionId) => {
      if (actionId === "tour") {
        setBotPose("explaining");
        setActiveResponse({
          type: "tour",
          title: "A Quick Tour of Dhiraj's Portfolio",
          body: "Dhiraj Wasu is a Computer Science Engineering student at SGGSIE&T, Nanded, specializing in backend systems, distributed architectures, and AI. Here is what you can discover:",
          sections: [
            { label: "About", path: "/about", note: "Background, mindset, and what drives his engineering work." },
            { label: "Projects", path: "/projects", note: "Production-grade RAG, distributed queues, in-memory caches, and cybersecurity." },
            { label: "Skills", path: "/skills", note: "Languages (C++, Python, Java, SQL) and backend infrastructure." },
            { label: "Experience", path: "/academics", note: "Education timeline and academic credentials." },
            { label: "Contact", path: "/contact", note: "Email, GitHub, LinkedIn, and resume request options." },
          ],
        });
        setGuideState("response");
      } else if (actionId === "projects") {
        setBotPose("explaining");
        if (currentPath !== "/projects") {
          navigate("/projects");
        }
        setActiveResponse({
          type: "projects",
          title: "Projects & Engineering Focus",
          body: "Dhiraj's projects span backend systems, distributed task orchestration, AI retrieval, and cybersecurity. Here are the core categories:",
          categories: [
            {
              domain: "AI & Retrieval Systems",
              sample: "Anuvada AI — Philosophy-aware RAG with quote-faithful routing.",
            },
            {
              domain: "Distributed Systems & Backend",
              sample: "AI Mesh System — Redis queues, worker heartbeats, retries, load scaling.",
            },
            {
              domain: "Cybersecurity & Automation",
              sample: "ZeroTrust Defender — AI-driven ransomware endpoint isolation & SOAR.",
            },
            {
              domain: "Systems & Concurrency",
              sample: "High-Performance In-Memory Cache (C++) & Thread-Safe Cache (Java).",
            },
          ],
        });
        setGuideState("response");
      } else if (actionId === "skills") {
        setBotPose("explaining");
        if (currentPath !== "/skills") {
          navigate("/skills");
        }
        setActiveResponse({
          type: "skills",
          title: "Skills & Technical Stack",
          body: "Dhiraj's technical stack organized by core engineering domain:",
          groups: skillsByDomain,
        });
        setGuideState("response");
      } else if (actionId === "experience") {
        setBotPose("completed");
        if (currentPath !== "/academics") {
          navigate("/academics");
        }
        setActiveResponse({
          type: "experience",
          title: "Experience & Education Timeline",
          body: "Dhiraj's formal education and practical systems engineering foundation:",
          milestones: [
            {
              degree: "B.Tech in Computer Science & Engineering",
              institute: "Shri Guru Gobind Singhji Institute of Engineering & Technology (SGGSIE&T), Nanded",
              focus: "Backend systems, distributed architectures, database engines, and networking.",
            },
            {
              degree: "Diploma in Computer Science & Engineering",
              institute: "G.H. Raisoni Institute",
              focus: "Core programming fundamentals, data structures, algorithms, and web development.",
            },
          ],
        });
        setGuideState("response");
      } else if (actionId === "how-to") {
        setBotPose("explaining");
        setActiveResponse({
          type: "how-to",
          title: "How to Use This Portfolio",
          body: "This portfolio combines an interactive AI mascot guide with comprehensive deep-dive pages:",
          tips: [
            {
              title: "Brewbit Guide & Chat",
              desc: "Ask any natural question about Dhiraj's code, stack, or experience, or click suggestion chips anytime.",
            },
            {
              title: "Page Navigation",
              desc: "Use the top header or mobile menu to explore About, Projects, Skills, Academics, CP, and Contact.",
            },
            {
              title: "Project Deep Dives",
              desc: "Click external links on project cards to inspect the GitHub repositories and source code directly.",
            },
            {
              title: "Resume Request",
              desc: "Click 'Request resume' in the top bar to request Dhiraj's official CV directly via email.",
            },
            {
              title: "Dark / Light Mode",
              desc: "Toggle between light and dark themes anytime using the sun/moon icon.",
            },
          ],
        });
        setGuideState("response");
      }
    },
    [currentPath, navigate]
  );

  // Submit custom question
  const handleSubmitCustomQuestion = useCallback(
    (e) => {
      e?.preventDefault();
      const clean = customQuestion.trim();
      if (!clean) return;

      setBotPose("thinking");
      setGuideState("response");

      setTimeout(() => {
        setBotPose("working");
        setTimeout(() => {
          const ans = resolveAnswer(clean);
          setActiveResponse({
            type: "custom",
            title: ans.title,
            body: ans.body,
            facts: ans.facts,
            groups: ans.groups,
            link: ans.link,
            showProjects: ans.showProjects,
            questionText: clean,
          });
          setBotPose("explaining");
          setCustomQuestion("");
        }, 350);
      }, 300);
    },
    [customQuestion]
  );

  // If hidden, render nothing
  if (guideState === "hidden") {
    return null;
  }

  // Animation settings
  const transitionConfig = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", damping: 26, stiffness: 280 };

  return (
    <div className={`brewbit-guide-root theme-${theme}`}>
      <AnimatePresence mode="wait">
        {/* STATE 2: POPUP BUBBLE (5-second first visit pop-in) */}
        {guideState === "bubble" && (
          <motion.div
            key="brewbit-bubble-card"
            className="brewbit-bubble-container"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={transitionConfig}
          >
            {/* Speech bubble */}
            <div className="brewbit-speech-bubble" onClick={handleOpenExpanded}>
              <div className="brewbit-bubble-header">
                <span className="brewbit-badge">
                  <Sparkles size={11} /> BREWBIT
                </span>
                <button
                  type="button"
                  className="brewbit-close-mini"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss();
                  }}
                  aria-label="Dismiss guide"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="brewbit-bubble-message">
                <h3>Hey! Need a hand exploring?</h3>
                <p>I'm Brewbit. I can show you around!</p>
              </div>

              <div className="brewbit-bubble-cta">
                <span>Where would you like to go?</span>
                <button type="button" className="brewbit-btn-explore" onClick={handleOpenExpanded}>
                  Explore options <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Mascot Button */}
            <div className="brewbit-mascot-anchor">
              <CoffeeeBot
                state={botPose}
                className="brewbit-mascot--interactive"
                onClick={handleOpenExpanded}
              />
            </div>
          </motion.div>
        )}

        {/* STATE 3: EXPANDED SUGGESTIONS CARD */}
        {guideState === "expanded" && (
          <motion.div
            key="brewbit-expanded-card"
            className="brewbit-expanded-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.96 }}
            transition={transitionConfig}
          >
            {/* Card Header */}
            <div className="brewbit-card-header">
              <div className="brewbit-card-header-left">
                <div className="brewbit-header-avatar">
                  <CoffeeeBot state={botPose} compact />
                </div>
                <div>
                  <div className="brewbit-header-kicker">
                    <Sparkles size={11} /> YOUR LITTLE GUIDE
                  </div>
                  <h3 className="brewbit-card-title">Hey! Need a hand exploring?</h3>
                  <p className="brewbit-card-subtitle">I'm Brewbit. I can show you around!</p>
                </div>
              </div>
              <button
                type="button"
                className="brewbit-close-btn"
                onClick={handleDismiss}
                aria-label="Close guide"
              >
                <X size={17} />
              </button>
            </div>

            {/* Suggestions List */}
            <div className="brewbit-card-body">
              <div className="brewbit-section-title">Where would you like to go?</div>
              <div className="brewbit-suggestions-list">
                {suggestions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className="brewbit-suggestion-button"
                      onClick={() => handleSelectSuggestion(item.action)}
                    >
                      <span className="brewbit-suggestion-icon">
                        <Icon size={16} />
                      </span>
                      <span className="brewbit-suggestion-label">{item.label}</span>
                      <ArrowRight size={14} className="brewbit-suggestion-arrow" />
                    </button>
                  );
                })}
              </div>

              {/* Free-form question composer */}
              <div className="brewbit-composer-section">
                <label className="brewbit-composer-label" htmlFor="brewbit-input">
                  Or just type your own question. I'm all ears!
                </label>
                <form className="brewbit-composer-form" onSubmit={handleSubmitCustomQuestion}>
                  <input
                    id="brewbit-input"
                    ref={inputRef}
                    type="text"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Ask about projects, stack, experience..."
                    aria-label="Ask Brewbit a question"
                  />
                  <button
                    type="submit"
                    disabled={!customQuestion.trim()}
                    aria-label="Submit question"
                    className="brewbit-submit-btn"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>

            {/* Card Footer */}
            <div className="brewbit-card-footer">
              <span className="brewbit-signature">"A little caffeine, a lot of code."</span>
              <button type="button" className="brewbit-dismiss-btn" onClick={handleDismiss}>
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        {/* STATE 4: ACTIVE RESPONSE DISPLAY */}
        {guideState === "response" && activeResponse && (
          <motion.div
            key="brewbit-response-card"
            className="brewbit-expanded-card brewbit-response-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.96 }}
            transition={transitionConfig}
          >
            {/* Header with back button */}
            <div className="brewbit-card-header">
              <button
                type="button"
                className="brewbit-back-btn"
                onClick={handleBackToSuggestions}
                aria-label="Back to suggestions"
              >
                <ChevronLeft size={16} />
                <span>Back</span>
              </button>
              <div className="brewbit-header-avatar">
                <CoffeeeBot state={botPose} compact />
              </div>
              <button
                type="button"
                className="brewbit-close-btn"
                onClick={handleDismiss}
                aria-label="Close guide"
              >
                <X size={17} />
              </button>
            </div>

            {/* Response Content */}
            <div className="brewbit-card-body brewbit-response-body">
              <div className="brewbit-response-tag">
                <Coffee size={13} /> BREWBIT’S ANSWER
              </div>
              <h3 className="brewbit-response-title">{activeResponse.title}</h3>
              <p className="brewbit-response-text">{activeResponse.body}</p>

              {/* Tour Sections */}
              {activeResponse.sections && (
                <div className="brewbit-tour-grid">
                  {activeResponse.sections.map((sec) => (
                    <button
                      key={sec.label}
                      type="button"
                      className="brewbit-tour-item"
                      onClick={() => {
                        navigate(sec.path);
                      }}
                    >
                      <div className="brewbit-tour-item-head">
                        <strong>{sec.label}</strong>
                        <ArrowRight size={13} />
                      </div>
                      <small>{sec.note}</small>
                    </button>
                  ))}
                </div>
              )}

              {/* Project Categories */}
              {activeResponse.categories && (
                <div className="brewbit-categories-list">
                  {activeResponse.categories.map((cat) => (
                    <div key={cat.domain} className="brewbit-category-item">
                      <strong>{cat.domain}</strong>
                      <p>{cat.sample}</p>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="brewbit-action-chip"
                    onClick={() => navigate("/projects")}
                  >
                    View All Projects on Page <ExternalLink size={13} />
                  </button>
                </div>
              )}

              {/* Skills by Domain */}
              {activeResponse.groups && (
                <div className="brewbit-skills-groups">
                  {activeResponse.groups.map((grp) => (
                    <div key={grp.domain || grp.name} className="brewbit-skills-group">
                      <h4>{grp.domain || grp.name}</h4>
                      <div className="brewbit-skills-tags">
                        {(grp.skills || grp.values || []).map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Education Milestones */}
              {activeResponse.milestones && (
                <div className="brewbit-timeline-list">
                  {activeResponse.milestones.map((m) => (
                    <div key={m.degree} className="brewbit-timeline-item">
                      <div className="brewbit-timeline-dot" />
                      <div>
                        <strong>{m.degree}</strong>
                        <div className="brewbit-timeline-inst">{m.institute}</div>
                        <p>{m.focus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* How-To Tips */}
              {activeResponse.tips && (
                <div className="brewbit-tips-list">
                  {activeResponse.tips.map((tip) => (
                    <div key={tip.title} className="brewbit-tip-item">
                      <strong>{tip.title}</strong>
                      <p>{tip.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Facts (for custom question) */}
              {activeResponse.facts && (
                <div className="brewbit-facts-chips">
                  {activeResponse.facts.map((fact) => (
                    <span key={fact}>{fact}</span>
                  ))}
                </div>
              )}

              {/* Link */}
              {activeResponse.link && (
                <button
                  type="button"
                  className="brewbit-action-chip"
                  onClick={() => navigate(activeResponse.link.href)}
                >
                  {activeResponse.link.label} <ArrowRight size={13} />
                </button>
              )}
            </div>

            {/* Response Footer */}
            <div className="brewbit-card-footer">
              <button
                type="button"
                className="brewbit-btn-secondary"
                onClick={handleBackToSuggestions}
              >
                ← Back to options
              </button>
              <button type="button" className="brewbit-dismiss-btn" onClick={handleDismiss}>
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        {/* STATE 5: SMALL FLOATING MASCOT STATE */}
        {guideState === "floating" && (
          <motion.div
            key="brewbit-floating-widget"
            className="brewbit-floating-widget"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={transitionConfig}
          >
            <button
              type="button"
              className="brewbit-floating-button"
              onClick={handleOpenExpanded}
              aria-label="Ask Brewbit — open portfolio guide"
            >
              <div className="brewbit-floating-avatar">
                <CoffeeeBot state={botPose} compact />
              </div>
              <div className="brewbit-floating-label">
                <span className="brewbit-status-dot" />
                <span className="brewbit-floating-text">Brewbit Guide</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
