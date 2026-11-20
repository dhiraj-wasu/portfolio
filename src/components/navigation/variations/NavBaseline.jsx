import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Moon, Sun, Menu, X } from "lucide-react";

export default function NavBaseline({ theme, toggleTheme, newConversation }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Experience", path: "/academics" },
  ];

  return (
    <>
      <header className="coffeee-landing-header nav-variation-baseline">
        <button
          className="coffeee-landing-brand"
          onClick={() => {
            if (newConversation) newConversation();
            else navigate("/");
          }}
        >
          dhiraj.wasu<span>.</span><small>PORTFOLIO V2.0</small>
        </button>

        <nav className="coffeee-landing-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              data-tour={item.path === "/about" ? "about" : item.path === "/projects" ? "projects" : "experience"}
              className={location.pathname === item.path ? "is-active" : ""}
            >
              {item.label}
            </button>
          ))}
        </nav>

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
          <button
            type="button"
            className="coffeee-mobile-nav-toggle"
            data-tour="mobile-nav"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="coffeee-mobile-nav-menu">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(item.path);
              }}
              data-tour={item.path === "/about" ? "about" : item.path === "/projects" ? "projects" : "experience"}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
