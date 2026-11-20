import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ArrowUpRight, Github, Linkedin, Moon, Sun,
  User, FolderCode, GraduationCap, Code2, Trophy, Mail,
  Coffee, Sparkles, ArrowRight
} from "lucide-react";

const EXPLORE_ITEMS = [
  { id: "about", label: "About Dhiraj", desc: "Background, philosophy and engineering mindset", path: "/about", icon: User },
  { id: "projects", label: "Featured Projects", desc: "Production RAG, distributed queues & caches", path: "/projects", icon: FolderCode },
  { id: "experience", label: "Experience & Education", desc: "SGGSIE&T Computer Science credentials", path: "/academics", icon: GraduationCap },
  { id: "skills", label: "Technical Skills", desc: "C++, Python, FastAPI, Redis, Docker, SQL", path: "/skills", icon: Code2 },
  { id: "cp", label: "Competitive Programming", desc: "Codeforces, LeetCode & problem solving", path: "/cp", icon: Trophy },
  { id: "contact", label: "Contact & Connect", desc: "Email, socials and professional outreach", path: "/contact", icon: Mail },
];

export default function NavExploreDropdown({ theme, toggleTheme, newConversation }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  const handleNavigate = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  const handleAskBrewbit = () => {
    setDropdownOpen(false);
    const p = new URLSearchParams(window.location.search);
    p.set("guide", "true");
    navigate(window.location.pathname + "?" + p.toString());
  };

  return (
    <header className="coffeee-landing-header nav-variation-explore">
      {/* Brand */}
      <button
        className="coffeee-landing-brand"
        onClick={() => {
          if (newConversation) newConversation();
          else navigate("/");
        }}
      >
        dhiraj.wasu<span>.</span><small>EXECUTIVE</small>
      </button>

      {/* Center Explore Controls */}
      <div className="nav-explore-center" ref={dropdownRef}>
        {/* Explore Dropdown Trigger */}
        <div className="nav-explore-dropdown-wrapper">
          <button
            type="button"
            className={`nav-explore-trigger-btn ${dropdownOpen ? "is-open" : ""}`}
            onClick={() => setDropdownOpen((open) => !open)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <span>Explore portfolio</span>
            <ChevronDown size={14} className={`nav-explore-chevron ${dropdownOpen ? "is-flipped" : ""}`} />
          </button>

          {/* Categorized Dropdown Panel */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className="nav-explore-menu-panel"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.16 }}
              >
                <div className="nav-explore-menu-header">
                  <span>PORTFOLIO SECTIONS</span>
                  <small>Quick Navigation</small>
                </div>
                <div className="nav-explore-grid">
                  {EXPLORE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`nav-explore-item ${isActive ? "is-active" : ""}`}
                        onClick={() => handleNavigate(item.path)}
                      >
                        <span className="nav-explore-item-icon">
                          <Icon size={15} />
                        </span>
                        <div className="nav-explore-item-text">
                          <div className="nav-explore-item-title">{item.label}</div>
                          <div className="nav-explore-item-desc">{item.desc}</div>
                        </div>
                        <ArrowRight size={12} className="nav-explore-arrow" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Ask Brewbit shortcut */}
        <button
          type="button"
          className="nav-explore-brewbit-pill"
          onClick={handleAskBrewbit}
          title="Ask Brewbit a question"
        >
          <Coffee size={13} />
          <span>Ask Brewbit</span>
          <Sparkles size={11} className="text-accent" />
        </button>
      </div>

      {/* Right Utilities */}
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
        <a
          className="coffeee-social-link"
          href="https://www.linkedin.com/in/dhiraj-wasu/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={17} />
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
  );
}
