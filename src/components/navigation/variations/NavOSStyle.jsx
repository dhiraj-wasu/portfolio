import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Compass, User, FolderCode, GraduationCap, Coffee,
  ArrowUpRight, Moon, Sun, Menu, X
} from "lucide-react";
import NavStyleSwitcher from "../NavStyleSwitcher";

export default function NavOSStyle({ theme, toggleTheme, newConversation }) {
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
    { id: "home", label: "Home", path: "/", icon: Compass },
    { id: "about", label: "About", path: "/about", icon: User, tour: "about" },
    { id: "projects", label: "Projects", path: "/projects", icon: FolderCode, tour: "projects" },
    { id: "experience", label: "Experience", path: "/academics", icon: GraduationCap, tour: "experience" },
    { id: "brewbit", label: "Brewbit", action: "brewbit", icon: Coffee },
  ];

  const handleItemClick = (item) => {
    if (item.action === "brewbit") {
      const p = new URLSearchParams(window.location.search);
      p.set("guide", "true");
      navigate(window.location.pathname + "?" + p.toString());
    } else if (item.path) {
      if (item.path === "/" && newConversation) {
        newConversation();
      } else {
        navigate(item.path);
      }
    }
  };

  const handleBrewbitDaemonClick = () => {
    const p = new URLSearchParams(window.location.search);
    p.set("guide", "true");
    navigate(window.location.pathname + "?" + p.toString());
  };

  return (
    <header className="os-menu-bar" role="banner" aria-label="Operating system navigation">
      {/* Left: Minimal System Identity & Launcher Controls */}
      <div className="os-nav-left">
        <button
          type="button"
          className="os-brand-btn"
          onClick={() => {
            if (newConversation) newConversation();
            else navigate("/");
          }}
          title="Home / Dhiraj OS"
        >
          <Terminal size={14} className="os-terminal-icon" />
          <span className="os-brand-text">dhiraj.os</span>
        </button>

        <span className="os-nav-divider" aria-hidden="true" />

        {/* Compact OS Launcher Navigation */}
        <nav className="os-nav-launcher" aria-label="System sections">
          {osNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path ? location.pathname === item.path : false;

            return (
              <button
                key={item.id}
                type="button"
                data-tour={item.tour}
                className={`os-nav-item ${isActive ? "is-active" : ""}`}
                onClick={() => handleItemClick(item)}
                title={item.label}
              >
                <span className="os-nav-dot" aria-hidden="true" />
                <Icon size={14} className="os-item-icon" />
                <span className="os-item-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: Adjacent Style Switcher + Workstation System Tray */}
      <div className="os-nav-right">
        {/* Style Switcher styled cleanly to match OS aesthetic */}
        <NavStyleSwitcher className="os-style-switcher" />

        <span className="os-nav-divider" aria-hidden="true" />

        {/* Brewbit Daemon Status */}
        <button
          type="button"
          className="os-tray-btn os-tray-daemon"
          onClick={handleBrewbitDaemonClick}
          title="Brewbit Companion Daemon — Online & Ready"
        >
          <span className="os-daemon-indicator" />
          <Coffee size={13} />
          <span className="os-daemon-label">brewbitd</span>
        </button>

        {/* Quick CV Download/Request */}
        <a
          className="os-tray-btn os-tray-cv"
          data-tour="resume"
          href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
          title="Request Dhiraj's Resume (PDF)"
        >
          <span>CV.pdf</span>
          <ArrowUpRight size={11} />
        </a>

        {/* Theme Toggle */}
        <button
          type="button"
          className="os-tray-btn os-tray-theme"
          onClick={toggleTheme}
          title={theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        {/* Live System Clock */}
        <div className="os-tray-clock" aria-label="Current system time">
          <span>{currentTime || "12:00 PM"}</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="os-mobile-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle OS system menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="os-mobile-drawer"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <div className="os-mobile-list">
              {osNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.path ? location.pathname === item.path : false;
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
                    <Icon size={14} />
                    <span>{item.label}</span>
                    {isActive && <span className="os-mobile-badge">CURRENT</span>}
                  </button>
                );
              })}
            </div>
            <div className="os-mobile-bottom">
              <NavStyleSwitcher />
              <a
                className="os-tray-btn os-tray-cv"
                href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
              >
                <span>CV.pdf</span>
                <ArrowUpRight size={11} />
              </a>
              <button
                type="button"
                className="os-tray-btn os-tray-theme"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
