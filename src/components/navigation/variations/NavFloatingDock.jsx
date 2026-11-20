import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass, User, FolderCode, GraduationCap, Coffee,
  ArrowUpRight, Github, Linkedin, Moon, Sun, Sparkles
} from "lucide-react";

export default function NavFloatingDock({ theme, toggleTheme, newConversation }) {
  const navigate = useNavigate();
  const location = useLocation();

  const dockItems = [
    { id: "home", label: "Home", path: "/", icon: Compass },
    { id: "about", label: "About", path: "/about", icon: User },
    { id: "projects", label: "Projects", path: "/projects", icon: FolderCode },
    { id: "experience", label: "Experience", path: "/academics", icon: GraduationCap },
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
    <>
      {/* Minimal Top Utility Header with Centered Floating Dock */}
      <header className="coffeee-landing-header nav-variation-dock-header">
        <button
          className="coffeee-landing-brand"
          onClick={() => {
            if (newConversation) newConversation();
            else navigate("/");
          }}
        >
          dhiraj.wasu<span>.</span><small>FLOATING</small>
        </button>

        {/* Floating Top Navigation Dock (Centered above Mascot) */}
        <motion.nav
          className="nav-floating-dock-container"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          aria-label="Quick dock navigation"
        >
          <div className="nav-floating-dock-pill">
            {dockItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.path ? location.pathname === item.path : false;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  className={`nav-dock-btn ${isActive ? "is-active" : ""} ${item.id === "brewbit" ? "nav-dock-btn--brewbit" : ""}`}
                  onClick={() => handleItemClick(item)}
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  title={item.label}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dock-active-pill"
                      className="nav-dock-active-background"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="nav-dock-icon-wrap">
                    <Icon size={20} />
                    {item.id === "brewbit" && <span className="nav-dock-brewbit-sparkle"><Sparkles size={10} /></span>}
                  </span>
                  <span className="nav-dock-label">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.nav>

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
    </>
  );
}
