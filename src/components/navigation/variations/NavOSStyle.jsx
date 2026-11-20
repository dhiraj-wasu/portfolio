import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, FolderCode, User, GraduationCap, Code2,
  Trophy, Mail, Coffee, Sparkles, Moon, Sun, ArrowUpRight,
  Wifi, BatteryCharging, ChevronDown
} from "lucide-react";

const OS_MENUS = {
  work: [
    { label: "Anuvada AI (RAG)", desc: "Guidance System", url: "https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System" },
    { label: "AI Mesh System", desc: "Distributed Queues", url: "https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution" },
    { label: "ZeroTrust Defender", desc: "Endpoint SOAR", url: "https://github.com/dhiraj-wasu/ZeroTrust-Defender-AI-Driven-Ransomware-Detection" },
    { label: "Low-Latency Cache (C++)", desc: "Systems Concurrency", url: "https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-" },
    { label: "All Projects Workspace...", desc: "Directory View", path: "/projects", divider: true },
  ],
  profile: [
    { label: "About Dhiraj", desc: "Background & story", path: "/about" },
    { label: "Academic Timeline", desc: "SGGSIE&T B.Tech CSE", path: "/academics" },
    { label: "Contact Developer...", desc: "dhirajwasu120@gmail.com", path: "/contact" },
  ],
  tools: [
    { label: "Technical Skills", desc: "Languages & Frameworks", path: "/skills" },
    { label: "Competitive Programming", desc: "Codeforces & LeetCode", path: "/cp" },
    { label: "Request Resume (PDF)...", desc: "Official CV", action: "resume" },
  ],
};

export default function NavOSStyle({ theme, toggleTheme, newConversation }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const menuBarRef = useRef(null);

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

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    if (activeMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeMenu]);

  const handleAction = (item) => {
    setActiveMenu(null);
    if (item.path) {
      navigate(item.path);
    } else if (item.url) {
      window.open(item.url, "_blank", "noreferrer");
    } else if (item.action === "resume") {
      window.location.href = "mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume";
    }
  };

  const handleBrewbitClick = () => {
    const p = new URLSearchParams(window.location.search);
    p.set("guide", "true");
    navigate(window.location.pathname + "?" + p.toString());
  };

  return (
    <header className="coffeee-landing-header nav-variation-os" ref={menuBarRef}>
      {/* Left Menu Bar */}
      <div className="nav-os-left">
        <button
          className="nav-os-apple-logo"
          onClick={() => {
            if (newConversation) newConversation();
            else navigate("/");
          }}
          title="Home / Dhiraj OS"
        >
          <Terminal size={14} />
          <span>dhiraj.os</span>
        </button>

        {/* Menu Items */}
        <div className="nav-os-menus">
          {["work", "profile", "tools"].map((menuKey) => (
            <div key={menuKey} className="nav-os-menu-wrap">
              <button
                type="button"
                className={`nav-os-menu-btn ${activeMenu === menuKey ? "is-open" : ""}`}
                onClick={() => setActiveMenu((cur) => (cur === menuKey ? null : menuKey))}
                onMouseEnter={() => {
                  if (activeMenu) setActiveMenu(menuKey);
                }}
              >
                <span>{menuKey.charAt(0).toUpperCase() + menuKey.slice(1)}</span>
              </button>

              <AnimatePresence>
                {activeMenu === menuKey && (
                  <motion.div
                    className="nav-os-dropdown-window"
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.12 }}
                  >
                    {OS_MENUS[menuKey].map((subItem) => (
                      <React.Fragment key={subItem.label}>
                        {subItem.divider && <div className="nav-os-dropdown-divider" />}
                        <button
                          type="button"
                          className="nav-os-dropdown-row"
                          onClick={() => handleAction(subItem)}
                        >
                          <span className="nav-os-row-title">{subItem.label}</span>
                          <span className="nav-os-row-desc">{subItem.desc}</span>
                        </button>
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Right System Tray */}
      <div className="nav-os-right">
        {/* Brewbit Daemon Status */}
        <button
          type="button"
          className="nav-os-tray-item nav-os-tray-brewbit"
          onClick={handleBrewbitClick}
          title="Brewbit Assistant Daemon — Ready"
        >
          <span className="nav-os-brewbit-dot" />
          <Coffee size={13} />
          <span>brewbitd</span>
        </button>

        {/* Quick Resume */}
        <a
          className="nav-os-tray-item nav-os-tray-resume"
          data-tour="resume"
          href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
        >
          <span>CV.pdf</span> <ArrowUpRight size={11} />
        </a>

        {/* Theme */}
        <button
          type="button"
          className="nav-os-tray-item nav-os-tray-icon"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        {/* System Time */}
        <div className="nav-os-tray-item nav-os-tray-clock">
          <span>{currentTime || "12:00 PM"}</span>
        </div>
      </div>
    </header>
  );
}
