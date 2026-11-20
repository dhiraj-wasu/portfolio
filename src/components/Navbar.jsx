import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Menu, X, Coffee } from "lucide-react";
import SearchDialog from "./SearchDialog";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/classic", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/education", label: "Education" },
    { path: "/experience", label: "Experience" },
    { path: "/skills", label: "Skills" },
    { path: "/projects", label: "Projects" },
    { path: "/certificates", label: "Certificates" },
    { path: "/contact", label: "Contact" },
  ];

  const isLinkActive = (path) => {
    if (path === "/classic") {
      return location.pathname === "/classic" || location.pathname === "/home";
    }
    if (path === "/education") {
      return location.pathname === "/education" || location.pathname === "/academics";
    }
    return location.pathname === path;
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <Link to="/classic" className="flex items-center space-x-2.5 group">
                <Code2 className="w-7 h-7 text-white group-hover:scale-105 transition-transform" aria-hidden="true" />
                <span className="text-xl font-bold text-white tracking-tight">Dhiraj</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <SearchDialog />

              {/* Experience Switcher to Coffeee Bot */}
              <Link
                to="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-200 border border-amber-500/30 hover:border-amber-500/60 hover:from-amber-500/30 hover:to-orange-500/30 transition-all shadow-sm"
                title="Switch to Coffeee Bot conversational portfolio"
              >
                <Coffee className="w-3.5 h-3.5 text-amber-300" />
                <span>Chat with Brewbit</span>
              </Link>

              <div className="flex items-center space-x-1">
                {navLinks.map((item) => {
                  const active = isLinkActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`nav-link ${
                        active ? "bg-white/15 backdrop-blur-sm text-white font-medium" : ""
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile / Tablet Bar */}
            <div className="flex lg:hidden items-center space-x-2">
              <SearchDialog />

              <Link
                to="/"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/30 hover:bg-amber-500/30 transition-all"
                title="Switch to Coffeee Bot conversational portfolio"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Brewbit</span>
              </Link>

              <button
                className="p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 pt-3 pb-4 space-y-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-sm font-semibold transition-colors mb-2"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Switch to Brewbit Chat Portfolio</span>
                </Link>

                {navLinks.map((item) => {
                  const active = isLinkActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? "bg-white/15 text-white font-medium"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
