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
      <div className="floating-header-bar">
        {/* Left: Brand / Logo */}
        <button
          className="floating-nav-brand"
          onClick={() => {
            if (newConversation) newConversation();
            else navigate("/");
          }}
          aria-label="Dhiraj Wasu Home"
        >
          <span className="floating-brand-name">dhiraj.wasu</span>
          <span className="floating-brand-dot">.</span>
        </button>

        {/* Right: Main Navigation Pill + Adjacent Switcher + Utilities */}
        <div className="floating-nav-right">
          {/* Main Navigation Pill */}
          <nav className="floating-nav-pill" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.path ? location.pathname === item.path : false;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  data-tour={item.tour}
                  className={`floating-nav-item ${isActive ? "is-active" : ""} ${item.id === "brewbit" ? "floating-nav-item--brewbit" : ""}`}
                  onClick={() => handleItemClick(item)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  title={item.label}
                >
                  {isActive && (
                    <motion.span
                      layoutId="floating-nav-active-bg"
                      className="floating-nav-active-bg"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="floating-nav-icon-wrap">
                    <Icon size={16} />
                    {item.id === "brewbit" && (
                      <span className="floating-nav-sparkle">
                        <Sparkles size={8} />
                      </span>
                    )}
                  </span>
                  <span className="floating-nav-text">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Compact Style Switcher - Immediately adjacent to navigation pill */}
          <NavStyleSwitcher className="floating-adjacent-switcher" />

          {/* Resume & Theme Utilities */}
          <div className="floating-nav-utilities">
            <a
              className="floating-resume-link"
              data-tour="resume"
              href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
              title="Request Resume"
            >
              <span>Resume</span>
              <ArrowUpRight size={13} />
            </a>
            <button
              type="button"
              className="floating-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
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
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
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
                    <Icon size={16} />
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
                <ArrowUpRight size={13} />
              </a>
              <button
                type="button"
                className="floating-theme-toggle"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
