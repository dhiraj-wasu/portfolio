import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee, Sparkles, ArrowUpRight, Github, Linkedin, Moon, Sun,
  Compass, FolderCode, User, GraduationCap, ChevronDown, ArrowRight
} from "lucide-react";

export default function NavBrewbitContextual({ theme, toggleTheme, newConversation }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);

  // Dynamic context suggestions based on location.pathname
  const currentPath = location.pathname;

  let contextualSuggestions = [];
  let contextLabel = "BREWBIT RECOMMENDS";

  if (currentPath === "/") {
    contextLabel = "BREWBIT DISCOVERY";
    contextualSuggestions = [
      { label: "Explore Dhiraj's work", action: () => { const el = document.getElementById("selected-work"); if (el) el.scrollIntoView({ behavior: "smooth" }); else navigate("/projects"); } },
      { label: "Discover his background", action: () => navigate("/about") },
      { label: "View technical skills", action: () => navigate("/skills") },
      { label: "Check education", action: () => navigate("/academics") },
      { label: "Take guided tour", action: () => { const p = new URLSearchParams(window.location.search); p.set("tour", "true"); navigate("/?" + p.toString()); } },
    ];
  } else if (currentPath === "/projects") {
    contextLabel = "SYSTEMS EXPLORATION";
    contextualSuggestions = [
      { label: "Anuvada AI (RAG)", action: () => window.open("https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System", "_blank") },
      { label: "AI Mesh System", action: () => window.open("https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution", "_blank") },
      { label: "ZeroTrust Defender", action: () => window.open("https://github.com/dhiraj-wasu/ZeroTrust-Defender-AI-Driven-Ransomware-Detection", "_blank") },
      { label: "High-Performance Cache (C++)", action: () => window.open("https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-", "_blank") },
      { label: "← Back to Home", action: () => navigate("/") },
    ];
  } else if (currentPath === "/about") {
    contextLabel = "ENGINEERING STORY";
    contextualSuggestions = [
      { label: "Explore built projects", action: () => navigate("/projects") },
      { label: "See technical stack", action: () => navigate("/skills") },
      { label: "Academic credentials", action: () => navigate("/academics") },
      { label: "← Back to Home", action: () => navigate("/") },
    ];
  } else {
    contextLabel = "EXPLORE WITH BREWBIT";
    contextualSuggestions = [
      { label: "Projects overview", action: () => navigate("/projects") },
      { label: "Meet Dhiraj", action: () => navigate("/about") },
      { label: "Skills & stack", action: () => navigate("/skills") },
      { label: "← Back to Home", action: () => navigate("/") },
    ];
  }

  const directJumpPages = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Skills", path: "/skills" },
    { label: "Education", path: "/academics" },
    { label: "Competitive Programming", path: "/cp" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="nav-brewbit-context-container">
      {/* Top Utility Header */}
      <header className="coffeee-landing-header nav-variation-brewbit-top">
        <button
          className="coffeee-landing-brand"
          onClick={() => {
            if (newConversation) newConversation();
            else navigate("/");
          }}
        >
          dhiraj.wasu<span>.</span><small>AGENT-DRIVEN</small>
        </button>

        {/* Fallback Direct Jump Selector */}
        <div className="nav-brewbit-direct-jump-wrap">
          <button
            type="button"
            className="nav-brewbit-jump-btn"
            onClick={() => setQuickJumpOpen((o) => !o)}
          >
            <Compass size={13} />
            <span>Direct menu</span>
            <ChevronDown size={12} />
          </button>

          <AnimatePresence>
            {quickJumpOpen && (
              <motion.div
                className="nav-brewbit-jump-menu"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                {directJumpPages.map((page) => (
                  <button
                    key={page.path}
                    type="button"
                    onClick={() => {
                      setQuickJumpOpen(false);
                      navigate(page.path);
                    }}
                  >
                    {page.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="coffeee-landing-actions">
          <a
            className="coffeee-resume-link"
            data-tour="resume"
            href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
          >
            Request resume <ArrowUpRight size={14} />
          </a>
          <a
            className="coffeee-social-link"
            href="https://github.com/dhiraj-wasu"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <button
            className="coffeee-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </header>

      {/* Proactive Contextual Navigation Strip */}
      <div className="nav-brewbit-strip">
        <div className="nav-brewbit-strip-inner">
          <div className="nav-brewbit-badge">
            <Coffee size={12} />
            <span>{contextLabel}</span>
          </div>
          <div className="nav-brewbit-chips-scroll">
            {contextualSuggestions.map((sugg) => (
              <button
                key={sugg.label}
                type="button"
                className="nav-brewbit-chip"
                onClick={sugg.action}
              >
                <Sparkles size={11} className="nav-brewbit-sparkle" />
                <span>{sugg.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
