import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAVIGATION_VARIATIONS } from "./NavigationComparisonData";
import { NavigationLabContext } from "./NavigationLabContextDef";

const STORAGE_KEY = "dhiraj_nav_style";

export function NavigationLabProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to resolve variation ID from param or name
  const resolveVariationId = useCallback((param) => {
    if (!param) return null;
    const lower = String(param).toLowerCase().trim();
    if (lower === "os" || lower === "os-style" || lower === "2" || lower === "system") {
      return "os";
    }
    if (lower === "floating" || lower === "dock" || lower === "1" || lower === "pill") {
      return "floating";
    }
    return null;
  }, []);

  const [activeNav, setActiveNavState] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const navParam = params.get("nav");
      const resolved = resolveVariationId(navParam);
      if (resolved) return resolved;

      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("dhiraj_nav_variation");
      const storedResolved = resolveVariationId(stored);
      if (storedResolved) return storedResolved;
    }
    return "floating";
  });

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
            } catch {
              // Ignore storage errors in restricted contexts
            }
            return resolved;
          }
          return curr;
        });
      }
    }
  }, [location.search, resolveVariationId]);

  const setActiveNav = useCallback((id) => {
    const target = id === "os" || id === "os-style" ? "os" : "floating";
    setActiveNavState(target);
    try {
      localStorage.setItem(STORAGE_KEY, target);
    } catch {
      // Ignore storage errors in restricted contexts
    }

    // Update URL query param cleanly without full page reload
    const params = new URLSearchParams(location.search);
    params.set("nav", target);
    navigate(
      {
        pathname: location.pathname,
        search: `?${params.toString()}`,
      },
      { replace: true }
    );
  }, [location.pathname, location.search, navigate]);

  const toggleNav = useCallback(() => {
    setActiveNav(activeNav === "floating" ? "os" : "floating");
  }, [activeNav, setActiveNav]);

  // Keyboard shortcut: Alt+N or Alt+S toggles style
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key.toLowerCase() === "n" || e.key.toLowerCase() === "s")) {
        e.preventDefault();
        toggleNav();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleNav]);

  const currentVariation = NAVIGATION_VARIATIONS.find((v) => v.id === activeNav) || NAVIGATION_VARIATIONS[0];

  const value = {
    activeNav,
    setActiveNav,
    toggleNav,
    currentVariation,
    variations: NAVIGATION_VARIATIONS,
  };

  return (
    <NavigationLabContext.Provider value={value}>
      {children}
    </NavigationLabContext.Provider>
  );
}
