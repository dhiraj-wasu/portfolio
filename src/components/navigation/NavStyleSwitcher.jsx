import React from "react";
import { useNavigationLab } from "./useNavigationLab";

export default function NavStyleSwitcher({ className = "" }) {
  const { activeNav, setActiveNav } = useNavigationLab();
  const isFloating = activeNav !== "os";

  return (
    <div
      className={`nav-compact-switcher ${className}`}
      role="radiogroup"
      aria-label="Navigation style switcher"
    >
      <button
        type="button"
        role="radio"
        aria-checked={isFloating}
        className={`nav-switcher-opt ${isFloating ? "is-active" : ""}`}
        onClick={() => setActiveNav("floating")}
        title="Switch to Floating Navigation style"
      >
        Floating
      </button>
      <span className="nav-switcher-divider" aria-hidden="true" />
      <button
        type="button"
        role="radio"
        aria-checked={!isFloating}
        className={`nav-switcher-opt ${!isFloating ? "is-active" : ""}`}
        onClick={() => setActiveNav("os")}
        title="Switch to OS Navigation style"
      >
        OS
      </button>
    </div>
  );
}
