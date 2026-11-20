import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAVIGATION_VARIATIONS } from "./NavigationComparisonData";
import { NavigationLabContext } from "./NavigationLabContextDef";

const STORAGE_KEY = "dhiraj_nav_variation";

export function NavigationLabProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to resolve variation ID from param or number
  const resolveVariationId = useCallback((param) => {
    if (!param) return null;
    const lower = String(param).toLowerCase().trim();
    // Check numeric string
    const num = parseInt(lower, 10);
    if (!isNaN(num)) {
      const matchNum = NAVIGATION_VARIATIONS.find((v) => v.numericId === num);
      if (matchNum) return matchNum.id;
    }
    // Check key or short name
    const match = NAVIGATION_VARIATIONS.find(
      (v) => v.id === lower || v.id.startsWith(lower)
    );
    if (match) return match.id;
    return null;
  }, []);

  const [activeNav, setActiveNavState] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const navParam = params.get("nav");
      const resolved = resolveVariationId(navParam);
      if (resolved) return resolved;

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && NAVIGATION_VARIATIONS.some((v) => v.id === stored)) {
        return stored;
      }
    }
    return "baseline";
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(false);

  // Sync with URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const navParam = params.get("nav");
    if (navParam) {
      const resolved = resolveVariationId(navParam);
      if (resolved && resolved !== activeNav) {
        setActiveNavState(resolved);
        localStorage.setItem(STORAGE_KEY, resolved);
      }
    }
    const cmdParam = params.get("cmd");
    if (cmdParam === "open" || cmdParam === "true") {
      setIsCommandPaletteOpen(true);
    }
  }, [location.search, activeNav, resolveVariationId]);

  const setActiveNav = useCallback((id) => {
    if (!NAVIGATION_VARIATIONS.some((v) => v.id === id)) return;
    setActiveNavState(id);
    localStorage.setItem(STORAGE_KEY, id);

    // Update URL query param cleanly without reloading
    const params = new URLSearchParams(window.location.search);
    params.set("nav", id);
    const newRelativePathQuery = window.location.pathname + "?" + params.toString();
    window.history.replaceState(null, "", newRelativePathQuery);
  }, []);

  // Global keyboard shortcut for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Command Palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // Toggle Navigation Lab with Alt+N or Ctrl+Shift+L
      if (e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setIsLabOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentVariation = NAVIGATION_VARIATIONS.find((v) => v.id === activeNav) || NAVIGATION_VARIATIONS[0];

  const value = {
    activeNav,
    setActiveNav,
    currentVariation,
    variations: NAVIGATION_VARIATIONS,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    isLabOpen,
    setIsLabOpen,
  };

  return (
    <NavigationLabContext.Provider value={value}>
      {children}
    </NavigationLabContext.Provider>
  );
}
