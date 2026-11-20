import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Command, X } from "lucide-react";

const searchPages = [
  {
    title: "Home",
    description: "Welcome page with portfolio overview & live GitHub stats",
    path: "/classic",
    keywords: ["home", "start", "welcome", "portfolio", "dhiraj", "dhiraj wasu", "backend developer", "systems engineer"],
  },
  {
    title: "Chat with Brewbit (Coffeee Bot)",
    description: "Conversational AI portfolio guide & interactive assistant",
    path: "/",
    keywords: ["chat", "brewbit", "coffeee", "bot", "assistant", "ai guide", "conversation", "questions"],
  },
  {
    title: "About",
    description: "Background, education, quick facts, achievements, and interests",
    path: "/about",
    keywords: ["about", "background", "education", "bio", "profile", "cv", "resume", "dhiraj", "sggsiet"],
  },
  {
    title: "Education",
    description: "Academic journey: B.Tech at SGGSIE&T & Diploma at G.H. Raisoni",
    path: "/education",
    keywords: ["education", "academics", "college", "degree", "btech", "sggsiet", "diploma", "nanded", "nagpur"],
  },
  {
    title: "Experience",
    description: "Engineering background, technical roles, and internships",
    path: "/experience",
    keywords: ["experience", "work", "career", "internships", "systems", "backend", "developer"],
  },
  {
    title: "Skills",
    description: "Categorized technical skills, languages, frameworks, and infrastructure",
    path: "/skills",
    keywords: ["skills", "technologies", "programming", "python", "cpp", "c++", "java", "fastapi", "django", "redis", "docker", "systems"],
  },
  {
    title: "Projects",
    description: "Featured engineering projects: RAG AI, Task Queues, In-Memory Cache",
    path: "/projects",
    keywords: ["projects", "anuvada", "ai mesh", "zerotrust", "cache", "redis", "fastapi", "c++", "java", "github"],
  },
  {
    title: "Certificates",
    description: "Professional certifications, competitions, and honors",
    path: "/certificates",
    keywords: ["certificates", "achievements", "awards", "dipex", "hackerrank", "problem solving", "honors"],
  },
  {
    title: "Contact",
    description: "Get in touch: email, LinkedIn, GitHub, or send a message",
    path: "/contact",
    keywords: ["contact", "email", "message", "connect", "hire", "collaboration", "opportunity"],
  },
];

export const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(searchPages);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (isOpen) {
        if (e.key === "Escape") {
          setIsOpen(false);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === "Enter" && results.length > 0) {
          e.preventDefault();
          navigate(results[selectedIndex].path);
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate]);

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const filtered = searchPages.filter(
        (page) =>
          page.title.toLowerCase().includes(q) ||
          page.description.toLowerCase().includes(q) ||
          page.keywords.some((k) => k.toLowerCase().includes(q))
      );
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults(searchPages);
    }
  }, [query]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-3 py-1.5 text-gray-400 hover:text-white transition-colors bg-white/10 hover:bg-white/15 rounded-lg text-sm border border-white/5"
        aria-label="Open search dialog"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <span className="hidden md:flex items-center space-x-1 px-1.5 py-0.5 text-xs bg-white/10 rounded">
          <Command className="w-3 h-3" />
          <span>K</span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
        <div className="inline-block w-full max-w-2xl mt-24 text-left align-middle transition-all transform relative z-10">
          <div className="relative bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center px-4 border-b border-white/10">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search pages, projects, skills..."
                className="w-full px-4 py-4 text-white bg-transparent border-0 focus:outline-none focus:ring-0 text-base"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded"
                aria-label="Close search"
              >
                <span className="px-1.5 py-0.5 text-xs text-gray-400 bg-white/10 rounded">Esc</span>
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto divide-y divide-white/5">
              {results.length === 0 ? (
                <div className="p-6 text-sm text-gray-400 text-center">
                  No results found for "{query}".
                </div>
              ) : (
                <div className="py-2">
                  {results.map((item, index) => (
                    <button
                      key={item.path + item.title}
                      className={`w-full px-4 py-3 text-left hover:bg-white/5 flex items-center justify-between transition-colors ${
                        index === selectedIndex ? "bg-white/10" : ""
                      }`}
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                    >
                      <div>
                        <div className="text-white font-medium flex items-center gap-2">
                          {item.title}
                          {item.path === "/" && (
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                              Interactive
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">
                          {item.description}
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 text-gray-400 ${
                          index === selectedIndex ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
