import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command, Search, ArrowUpRight, Github, Linkedin, Moon, Sun,
  X, FolderCode, User, GraduationCap, Code2, Coffee, Sparkles,
  ArrowRight, FileText, CornerDownLeft
} from "lucide-react";
import { useNavigationLab } from "../useNavigationLab";

const COMMAND_ACTIONS = [
  // Navigation
  { id: "about", category: "Navigation", label: "Go to About", hint: "Background, mindset and story", icon: User, path: "/about" },
  { id: "projects", category: "Navigation", label: "Explore Projects", hint: "RAG, distributed queues, cache", icon: FolderCode, path: "/projects" },
  { id: "experience", category: "Navigation", label: "View Experience & Education", hint: "SGGSIE&T academic timeline", icon: GraduationCap, path: "/academics" },
  { id: "skills", category: "Navigation", label: "Discover Skills & Tech Stack", hint: "C++, Python, FastAPI, Redis", icon: Code2, path: "/skills" },
  { id: "home", category: "Navigation", label: "Go to Home / Landing", hint: "Main portfolio overview", icon: Coffee, path: "/" },

  // Projects Deep Dive
  { id: "proj-anuvada", category: "Engineering Projects", label: "Anuvada AI — RAG System", hint: "Philosophy-aware guidance system", icon: FolderCode, external: "https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System" },
  { id: "proj-mesh", category: "Engineering Projects", label: "AI Mesh System — Distributed Queues", hint: "FastAPI + Redis task orchestration", icon: FolderCode, external: "https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution" },
  { id: "proj-zerotrust", category: "Engineering Projects", label: "ZeroTrust Defender — Ransomware SOAR", hint: "Endpoint isolation and defence", icon: FolderCode, external: "https://github.com/dhiraj-wasu/ZeroTrust-Defender-AI-Driven-Ransomware-Detection" },
  { id: "proj-cache", category: "Engineering Projects", label: "High-Performance In-Memory Cache (C++)", hint: "Low-latency systems concurrency", icon: FolderCode, external: "https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-" },

  // Actions
  { id: "resume", category: "Quick Actions", label: "Request Dhiraj's Resume", hint: "Opens email request with CV subject", icon: FileText, action: "resume" },
  { id: "theme", category: "Quick Actions", label: "Toggle Theme (Light / Dark)", hint: "Switch visual appearance", icon: Sun, action: "theme" },
  { id: "brewbit-tour", category: "Brewbit Assistant", label: "Take Interactive Brewbit Tour", hint: "Live guided walkthrough of portfolio", icon: Sparkles, action: "tour" },
];

export default function NavCommandBar({ theme, toggleTheme, newConversation }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCommandPaletteOpen, setIsCommandPaletteOpen } = useNavigationLab();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Filter actions based on query
  const filteredActions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return COMMAND_ACTIONS;
    return COMMAND_ACTIONS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [isCommandPaletteOpen]);

  // Execute selected command
  const executeCommand = (item) => {
    setIsCommandPaletteOpen(false);
    if (item.path) {
      navigate(item.path);
    } else if (item.external) {
      window.open(item.external, "_blank", "noreferrer");
    } else if (item.action === "resume") {
      window.location.href = "mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume";
    } else if (item.action === "theme") {
      toggleTheme();
    } else if (item.action === "tour") {
      const p = new URLSearchParams(window.location.search);
      p.set("tour", "true");
      navigate("/?" + p.toString());
    }
  };

  // Keyboard navigation within command palette
  const handleKeyDown = (e) => {
    if (!isCommandPaletteOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredActions[selectedIndex];
      if (current) executeCommand(current);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsCommandPaletteOpen(false);
    }
  };

  const isMac = typeof navigator !== "undefined" && navigator.platform?.toUpperCase().indexOf("MAC") >= 0;

  return (
    <>
      <header className="coffeee-landing-header nav-variation-command">
        <button
          className="coffeee-landing-brand"
          onClick={() => {
            if (newConversation) newConversation();
            else navigate("/");
          }}
        >
          dhiraj.wasu<span>.</span><small>COMMAND</small>
        </button>

        {/* Center Command Pill */}
        <button
          type="button"
          className="nav-command-trigger"
          onClick={() => setIsCommandPaletteOpen(true)}
          title="Open Command Palette (Ctrl+K or ⌘K)"
        >
          <Search size={14} className="nav-command-search-icon" />
          <span className="nav-command-placeholder">Search sections or commands...</span>
          <kbd className="nav-command-kbd">
            {isMac ? "⌘K" : "Ctrl+K"}
          </kbd>
        </button>

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

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="nav-command-palette-backdrop" onClick={() => setIsCommandPaletteOpen(false)}>
            <motion.div
              className="nav-command-palette-dialog"
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
            >
              {/* Search Bar */}
              <div className="nav-command-input-row">
                <Search size={17} className="nav-command-palette-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type a command or jump to page..."
                  aria-label="Search portfolio commands"
                />
                <button
                  type="button"
                  className="nav-command-close-btn"
                  onClick={() => setIsCommandPaletteOpen(false)}
                >
                  <kbd>ESC</kbd>
                </button>
              </div>

              {/* Action List */}
              <div className="nav-command-list" role="listbox">
                {filteredActions.length === 0 ? (
                  <div className="nav-command-empty">
                    <p>No commands matching "{searchQuery}"</p>
                    <small>Try searching "projects", "resume", "skills" or "about"</small>
                  </div>
                ) : (
                  filteredActions.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        className={`nav-command-item ${isSelected ? "is-selected" : ""}`}
                        onClick={() => executeCommand(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <span className="nav-command-item-icon">
                          <Icon size={15} />
                        </span>
                        <div className="nav-command-item-content">
                          <span className="nav-command-item-title">{item.label}</span>
                          <span className="nav-command-item-hint">{item.hint}</span>
                        </div>
                        <span className="nav-command-item-category">{item.category}</span>
                        {isSelected && <CornerDownLeft size={13} className="nav-command-item-enter" />}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Command Palette Footer */}
              <div className="nav-command-footer">
                <div className="nav-command-shortcuts">
                  <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                  <span><kbd>↵</kbd> Select</span>
                  <span><kbd>esc</kbd> Dismiss</span>
                </div>
                <div className="nav-command-branding">
                  <Sparkles size={11} /> <span>Dhiraj Wasu Portfolio</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
