import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Compass, User, FolderCode, GraduationCap, Coffee,
  ArrowUpRight, Moon, Sun, Sparkles, Menu, X, ExternalLink
} from "lucide-react";
import NavStyleSwitcher from "../NavStyleSwitcher";

export default function NavOSStyle({ theme, toggleTheme, newConversation, onPromptChat }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Live system clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const osNavItems = [
    { id: "home", label: "Home", action: "home", icon: Compass, tour: "home" },
    { id: "about", label: "About", prompt: "Tell me about Dhiraj.", icon: User, tour: "about" },
    { id: "projects", label: "Projects", prompt: "Show me Dhiraj's projects.", icon: FolderCode, tour: "projects" },
    { id: "experience", label: "Experience", prompt: "Tell me about Dhiraj's education and experience.", icon: GraduationCap, tour: "experience" },
    { id: "brewbit", label: "Brewbit", action: "brewbit", icon: Coffee, tour: "brewbit" },
  ];

  const handleItemClick = (item) => {
    if (item.action === "brewbit") {
      const p = new URLSearchParams(window.location.search);
      p.set("guide", "true");
      navigate(window.location.pathname + "?" + p.toString());
    } else if (item.action === "home" || item.id === "home") {
      if (newConversation) {
        newConversation();
      } else {
        navigate("/");
      }
    } else if (item.prompt) {
      if (onPromptChat) {
        onPromptChat(item.prompt);
      } else {
        window.dispatchEvent(new CustomEvent("brewbit:prompt", { detail: item.prompt }));
        if (location.pathname !== "/") {
          navigate("/?prompt=" + encodeURIComponent(item.prompt));
        }
      }
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleBrewbitDaemonClick = () => {
    const p = new URLSearchParams(window.location.search);
    p.set("guide", "true");
    navigate(window.location.pathname + "?" + p.toString());
  };

  return (
    <header className="os-header-wrapper" role="banner" aria-label="Operating system navigation">
      <div className="os-nav-container">
        {/* Left Island: Free-floating OS Terminal Host Pill */}
        <div className="os-island-left">
          <button
            type="button"
            className="os-brand-pill"
            onClick={() => {
              if (newConversation) newConversation();
              else navigate("/");
            }}
            title="Dhiraj OS Workstation (v2.4)"
            aria-label="Home / Dhiraj OS"
          >
            <span className="os-brand-prompt">
              <Terminal size={20} className="os-terminal-icon" />
              <span className="os-brand-name">dhiraj.os</span>
            </span>
            <span className="os-brand-badge" aria-hidden="true">
              <span className="os-status-led" />
              <span className="os-status-text">sys:ok</span>
            </span>
          </button>
        </div>

        {/* Center Island: Free-floating Main OS Launcher Dock (Truly Centered) */}
        <div className="os-island-center">
          <nav className="os-nav-dock" data-tour="nav-sections" aria-label="System launcher navigation">
            {osNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === "home" && location.pathname === "/" && !location.search.includes("guide");

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  data-tour={item.tour}
                  className={`os-dock-item ${isActive ? "is-active" : ""} ${item.id === "brewbit" ? "os-dock-item--brewbit" : ""}`}
                  onClick={() => handleItemClick(item)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  title={item.prompt ? `Ask Brewbit: "${item.prompt}"` : item.label}
                >
                  {isActive && (
                    <motion.span
                      layoutId="os-dock-active-bg"
                      className="os-dock-active-bg"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="os-dock-icon-wrap">
                    <span className={`os-dock-dot ${isActive ? "is-active" : ""}`} aria-hidden="true" />
                    <Icon size={20} className="os-dock-icon" />
                    {item.id === "brewbit" && (
                      <span className="os-dock-sparkle">
                        <Sparkles size={11} />
                      </span>
                    )}
                  </span>
                  <span className="os-dock-text">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Right Island: Free-floating Workstation System Tray */}
        <div className="os-island-right">
          <div className="os-tray-dock">
            {/* Adjacent compact style switcher */}
            <NavStyleSwitcher className="os-adjacent-switcher" />

            <span className="os-tray-divider" aria-hidden="true" />

            {/* Switch to Classic Normal Portfolio Site */}
            <Link
              to="/classic"
              className="os-tray-btn os-tray-classic"
              data-tour="classic-site"
              title="Visit Classic Full Portfolio Site"
              aria-label="Visit classic portfolio site"
            >
              <ExternalLink size={13} className="os-classic-icon" />
              <span className="os-classic-label">Classic Site</span>
            </Link>

            {/* Brewbit Companion Daemon */}
            <button
              type="button"
              className="os-tray-btn os-tray-daemon"
              onClick={handleBrewbitDaemonClick}
              title="Brewbit Companion Daemon — Online & Ready"
            >
              <span className="os-daemon-indicator" />
              <Coffee size={16} />
              <span className="os-daemon-label">brewbitd</span>
            </button>

            {/* Quick CV Download/Request */}
            <a
              className="os-tray-btn os-tray-cv"
              data-tour="resume"
              href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
              title="Request Dhiraj's Resume (CV.pdf)"
            >
              <span>CV.pdf</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Theme Toggle */}
            <button
              type="button"
              className="os-tray-btn os-tray-theme"
              onClick={toggleTheme}
              title={theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Live System Clock */}
            <div className="os-tray-clock" aria-label="Current system time">
              <span>{currentTime || "12:00 PM"}</span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="os-mobile-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle OS system menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="os-mobile-drawer"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
          >
            <div className="os-mobile-header">
              <Terminal size={15} className="os-terminal-icon" />
              <span className="os-mobile-title">dhiraj.os — SYSTEM LAUNCHER</span>
              <span className="os-status-led" />
            </div>

            <div className="os-mobile-list">
              {osNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === "home" && location.pathname === "/" && !location.search.includes("guide");

                return (
                  <button
                    key={item.id}
                    type="button"
                    data-tour={item.tour}
                    className={`os-mobile-row ${isActive ? "is-active" : ""}`}
                    onClick={() => {
                      setMobileOpen(false);
                      handleItemClick(item);
                    }}
                  >
                    <span className={`os-dock-dot ${isActive ? "is-active" : ""}`} aria-hidden="true" />
                    <Icon size={17} />
                    <span>{item.label}</span>
                    {item.prompt && <span className="os-mobile-badge os-mobile-badge--prompt">prompt</span>}
                    {isActive && <span className="os-mobile-badge">ACTIVE</span>}
                  </button>
                );
              })}

              <Link
                to="/classic"
                className="os-mobile-classic-link"
                onClick={() => setMobileOpen(false)}
              >
                <ExternalLink size={15} />
                <span>Visit Classic Portfolio Site</span>
              </Link>
            </div>

            <div className="os-mobile-bottom">
              <NavStyleSwitcher className="os-mobile-switcher" />
              <a
                className="os-tray-btn os-tray-cv"
                href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
              >
                <span>CV.pdf</span>
                <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                className="os-tray-btn os-tray-theme"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <div className="os-tray-clock">
                <span>{currentTime || "12:00 PM"}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
