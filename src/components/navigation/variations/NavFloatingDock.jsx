import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, User, FolderCode, GraduationCap, Coffee,
  ArrowUpRight, Moon, Sun, Sparkles, Menu, X
} from "lucide-react";
import NavStyleSwitcher from "../NavStyleSwitcher";

export default function NavFloatingDock({ theme, toggleTheme, newConversation }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
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

  return (
    <header className="floating-header-wrapper" role="banner">
      <div className="floating-nav-container">
        {/* Left Island: Free-floating Brand Pill */}
        <div className="floating-island-left">
          <button
            className="floating-brand-pill"
            onClick={() => {
              if (newConversation) newConversation();
              else navigate("/");
            }}
            aria-label="Dhiraj Wasu Home"
          >
            <span className="floating-brand-name">dhiraj.wasu</span>
            <span className="floating-brand-dot">.</span>
          </button>
        </div>

        {/* Center Island: Free-floating Main Navigation Dock (Truly Centered) */}
        <div className="floating-island-center">
          <nav className="floating-nav-dock" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.path ? location.pathname === item.path : false;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  data-tour={item.tour}
                  className={`floating-dock-item ${isActive ? "is-active" : ""} ${item.id === "brewbit" ? "floating-dock-item--brewbit" : ""}`}
                  onClick={() => handleItemClick(item)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  title={item.label}
                >
                  {isActive && (
                    <motion.span
                      layoutId="floating-dock-active-bg"
                      className="floating-dock-active-bg"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="floating-dock-icon-wrap">
                    <Icon size={20} />
                    {item.id === "brewbit" && (
                      <span className="floating-dock-sparkle">
                        <Sparkles size={11} />
                      </span>
                    )}
                  </span>
                  <span className="floating-dock-text">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Right Island: Free-floating Controls Dock & Utilities */}
        <div className="floating-island-right">
          <div className="floating-controls-dock">
            {/* Adjacent compact style switcher */}
            <NavStyleSwitcher className="floating-adjacent-switcher" />

            {/* Resume button */}
            <a
              className="floating-resume-link"
              data-tour="resume"
              href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
              title="Request Resume"
            >
              <span>Resume</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Theme toggle */}
            <button
              type="button"
              className="floating-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="floating-mobile-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation menu"
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
            className="floating-mobile-drawer"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
          >
            <div className="floating-mobile-links">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.path ? location.pathname === item.path : false;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-tour={item.tour}
                    className={`floating-mobile-link ${isActive ? "is-active" : ""}`}
                    onClick={() => {
                      setMobileOpen(false);
                      handleItemClick(item);
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="floating-mobile-actions">
              <NavStyleSwitcher />
              <a
                className="floating-resume-link"
                href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
              >
                <span>Resume</span>
                <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                className="floating-theme-toggle"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
