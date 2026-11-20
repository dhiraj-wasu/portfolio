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

  // Sync with URL query parameter when route location.search changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const navParam = params.get("nav");
    if (navParam) {
      const resolved = resolveVariationId(navParam);
      if (resolved) {
        setActiveNavState((curr) => {
          if (curr !== resolved) {
            try {
              localStorage.setItem(STORAGE_KEY, resolved);
            } catch (e) {}
            return resolved;
          }
          return curr;
        });
      }
    }
    const cmdParam = params.get("cmd");
    if (cmdParam === "open" || cmdParam === "true") {
      setIsCommandPaletteOpen(true);
    }
  }, [location.search, resolveVariationId]);

  const setActiveNav = useCallback((id) => {
    if (!NAVIGATION_VARIATIONS.some((v) => v.id === id)) return;
    setActiveNavState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {}

    // Update URL query param using React Router navigate so location.search stays in sync
    const params = new URLSearchParams(location.search);
    params.set("nav", id);
    const newSearch = params.toString();
    navigate(
      {
        pathname: location.pathname,
        search: newSearch ? `?${newSearch}` : "",
      },
      { replace: true }
    );
  }, [location.pathname, location.search, navigate]);

  const cycleNav = useCallback((direction = 1) => {
    const currentIndex = NAVIGATION_VARIATIONS.findIndex((v) => v.id === activeNav);
    const validIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (validIndex + direction + NAVIGATION_VARIATIONS.length) % NAVIGATION_VARIATIONS.length;
    const nextVar = NAVIGATION_VARIATIONS[nextIndex];
    if (nextVar) {
      setActiveNav(nextVar.id);
    }
  }, [activeNav, setActiveNav]);

  // Global keyboard shortcut for ⌘K / Ctrl+K and Nav Lab
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Command Palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // Toggle Navigation Lab with Alt+N
      if (e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setIsLabOpen((prev) => !prev);
      }
      // Cycle navigation options with Alt+Right / Alt+Left
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        cycleNav(1);
      }
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        cycleNav(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cycleNav]);

  const currentVariation = NAVIGATION_VARIATIONS.find((v) => v.id === activeNav) || NAVIGATION_VARIATIONS[0];

  const value = {
    activeNav,
    setActiveNav,
    cycleNav,
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
