import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Github, Moon, Sun, ArrowRight, BookOpen } from "lucide-react";

export default function NavEditorial({ theme, toggleTheme, newConversation }) {
  const navigate = useNavigate();
  const location = useLocation();

  const editorialLinks = [
    { label: "Engineering journey", path: "/about", sub: "mindset & story" },
    { label: "Working systems", path: "/projects", sub: "RAG & backend" },
    { label: "Experience", path: "/academics", sub: "timeline" },
    { label: "Technical stack", path: "/skills", sub: "core tools" },
  ];

  return (
    <header className="coffeee-landing-header nav-variation-editorial">
      {/* Brand with editorial publication marker */}
      <button
        className="coffeee-landing-brand nav-editorial-brand"
        onClick={() => {
          if (newConversation) newConversation();
          else navigate("/");
        }}
      >
        <span className="nav-editorial-issue">VOL. 02</span>
        dhiraj.wasu<span>.</span>
      </button>

      {/* Editorial Navigation Ribbons */}
      <nav className="nav-editorial-links" aria-label="Editorial chapter navigation">
        {editorialLinks.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              type="button"
              className={`nav-editorial-link ${isActive ? "is-active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-editorial-label">{item.label}</span>
              <span className="nav-editorial-sub">{item.sub}</span>
            </button>
          );
        })}
      </nav>

      {/* Utilities */}
      <div className="coffeee-landing-actions">
        <a
          className="coffeee-resume-link nav-editorial-resume"
          data-tour="resume"
          href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume"
        >
          Curriculum Vitae <ArrowUpRight size={13} />
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
  );
}
