import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal, X, Check, Sparkles, ExternalLink,
  Award, Eye, BarChart2, BookOpen, Layers, ShieldCheck,
  ChevronRight, RefreshCw, Compass
} from "lucide-react";
import { useNavigationLab } from "./useNavigationLab";
import {
  NAVIGATION_VARIATIONS,
  COMPARISON_CRITERIA,
  calculateWeightedScore
} from "./NavigationComparisonData";

export default function NavigationLabWidget({ theme }) {
  const { activeNav, setActiveNav, isLabOpen, setIsLabOpen } = useNavigationLab();
  const [activeTab, setActiveTab] = useState("switcher"); // "switcher" | "matrix" | "recommendation"

  const currentVar = NAVIGATION_VARIATIONS.find((v) => v.id === activeNav) || NAVIGATION_VARIATIONS[0];

  return (
    <>
      {/* Floating Lab Toggle Button (Bottom-Left) */}
      <motion.button
        type="button"
        className="nav-lab-launcher-btn"
        onClick={() => setIsLabOpen((open) => !open)}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        title="Open Navigation Design Lab"
      >
        <span className="nav-lab-launcher-icon">
          <SlidersHorizontal size={14} />
        </span>
        <span className="nav-lab-launcher-text">
          <strong>Nav Lab</strong> · {currentVar.shortName}
        </span>
        <span className="nav-lab-launcher-badge">Opt {currentVar.numericId}</span>
      </motion.button>

      {/* Navigation Design Lab Modal */}
      <AnimatePresence>
        {isLabOpen && (
          <div className="nav-lab-backdrop" onClick={() => setIsLabOpen(false)}>
            <motion.div
              className="nav-lab-modal"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="nav-lab-header">
                <div className="nav-lab-title-group">
                  <div className="nav-lab-header-badge">
                    <Sparkles size={12} /> NAVIGATION DESIGN LAB
                  </div>
                  <h2>Explore & Compare 7 Navigation Concepts</h2>
                  <p>Preview each interactive navigation pattern live on this portfolio</p>
                </div>
                <button
                  type="button"
                  className="nav-lab-close-btn"
                  onClick={() => setIsLabOpen(false)}
                  aria-label="Close Navigation Lab"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="nav-lab-tabs">
                <button
                  type="button"
                  className={`nav-lab-tab ${activeTab === "switcher" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("switcher")}
                >
                  <Layers size={14} /> Variations Switcher (7)
                </button>
                <button
                  type="button"
                  className={`nav-lab-tab ${activeTab === "matrix" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("matrix")}
                >
                  <BarChart2 size={14} /> Comparison Matrix
                </button>
                <button
                  type="button"
                  className={`nav-lab-tab ${activeTab === "recommendation" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("recommendation")}
                >
                  <Award size={14} /> Recommendation Report
                </button>
              </div>

              {/* Tab 1: Variations Switcher */}
              {activeTab === "switcher" && (
                <div className="nav-lab-switcher-content">
                  <div className="nav-lab-cards-grid">
                    {NAVIGATION_VARIATIONS.map((variation) => {
                      const isSelected = variation.id === activeNav;
                      const score = calculateWeightedScore(variation.scores);

                      return (
                        <div
                          key={variation.id}
                          className={`nav-lab-variation-card ${isSelected ? "is-selected" : ""}`}
                          onClick={() => setActiveNav(variation.id)}
                        >
                          <div className="nav-lab-card-top">
                            <span className="nav-lab-card-num">Option {variation.numericId}</span>
                            <span className="nav-lab-card-badge">{variation.badge}</span>
                            <span className="nav-lab-card-score">{score} / 10</span>
                          </div>

                          <h3 className="nav-lab-card-title">{variation.name}</h3>
                          <p className="nav-lab-card-tagline">{variation.tagline}</p>
                          <p className="nav-lab-card-desc">{variation.description}</p>

                          <div className="nav-lab-card-footer">
                            <button
                              type="button"
                              className={`nav-lab-select-btn ${isSelected ? "is-active" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveNav(variation.id);
                              }}
                            >
                              {isSelected ? (
                                <>
                                  <Check size={13} /> Active Navigation
                                </>
                              ) : (
                                <>Preview Variation →</>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Comparison Matrix */}
              {activeTab === "matrix" && (
                <div className="nav-lab-matrix-content">
                  <div className="nav-lab-matrix-scroll">
                    <table className="nav-lab-matrix-table">
                      <thead>
                        <tr>
                          <th className="nav-lab-col-crit">Evaluation Criterion</th>
                          {NAVIGATION_VARIATIONS.map((v) => (
                            <th
                              key={v.id}
                              className={`nav-lab-col-var ${v.id === activeNav ? "is-current" : ""}`}
                            >
                              <div>Opt {v.numericId}</div>
                              <small>{v.shortName}</small>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {COMPARISON_CRITERIA.map((crit) => (
                          <tr key={crit.key}>
                            <td className="nav-lab-crit-cell">
                              <strong>{crit.label}</strong>
                              <small>{crit.desc}</small>
                            </td>
                            {NAVIGATION_VARIATIONS.map((v) => {
                              const val = v.scores[crit.key];
                              const isHighest = Math.max(...NAVIGATION_VARIATIONS.map((item) => item.scores[crit.key])) === val;
                              return (
                                <td
                                  key={v.id}
                                  className={`nav-lab-score-cell ${v.id === activeNav ? "is-current" : ""} ${isHighest ? "is-best" : ""}`}
                                >
                                  <span>{val.toFixed(1)}</span>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                        {/* Overall Weighted Total */}
                        <tr className="nav-lab-total-row">
                          <td className="nav-lab-crit-cell">
                            <strong>OVERALL WEIGHTED SCORE</strong>
                            <small>Weighted evaluation across all 9 factors</small>
                          </td>
                          {NAVIGATION_VARIATIONS.map((v) => {
                            const total = calculateWeightedScore(v.scores);
                            return (
                              <td
                                key={v.id}
                                className={`nav-lab-total-cell ${v.id === activeNav ? "is-current" : ""}`}
                              >
                                <strong>{total}</strong>
                                <small>/ 10</small>
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: Recommendation Report */}
              {activeTab === "recommendation" && (
                <div className="nav-lab-report-content">
                  <div className="nav-lab-report-grid">
                    <div className="nav-lab-report-card highlight">
                      <div className="nav-lab-report-badge">🏆 HIGHEST OVERALL SCORE</div>
                      <h3>Variation 1: Command-Bar Navigation (9.0 / 10)</h3>
                      <p>
                        Best aligns with modern software/AI engineering signals (Linear, Raycast, Vercel). The <code>⌘K</code> palette provides extreme density and instant access to all projects, skills, resume, and Brewbit queries while keeping the header clean.
                      </p>
                    </div>

                    <div className="nav-lab-report-card">
                      <div className="nav-lab-report-badge">👔 BEST FOR RECRUITERS</div>
                      <h3>Variation 3: Minimal Brand + Explore Dropdown (8.8 / 10)</h3>
                      <p>
                        Zero friction for hiring managers: immediately puts Dhiraj's name and the "Request resume" button in focus, while neatly organizing all engineering domains inside a single structured dropdown.
                      </p>
                    </div>

                    <div className="nav-lab-report-card">
                      <div className="nav-lab-report-badge">☕ BEST BREWBIT INTEGRATION</div>
                      <h3>Variation 6: Brewbit-Controlled Contextual (8.9 / 10)</h3>
                      <p>
                        Creates maximum synergy with the mascot. As visitors explore sections, Brewbit proactively suggests relevant deep-dives without feeling like an aggressive chatbot modal.
                      </p>
                    </div>

                    <div className="nav-lab-report-card">
                      <div className="nav-lab-report-badge">📱 BEST MOBILE EXPERIENCE</div>
                      <h3>Variation 2: Floating Bottom Navigation Dock (8.7 / 10)</h3>
                      <p>
                        Bottom thumb ergonomics excel on smartphones. Placing Home, About, Projects, Experience, and Brewbit in a floating island gives effortless single-handed navigation.
                      </p>
                    </div>
                  </div>

                  {/* Proposed Hybrid Architecture */}
                  <div className="nav-lab-hybrid-box">
                    <div className="nav-lab-hybrid-tag">RECOMMENDED HYBRID SYNTHESIS</div>
                    <h4>The "Engineered Executive" Hybrid Navigation</h4>
                    <p>
                      Rather than selecting an isolated design, the strongest architecture for Dhiraj's portfolio combines:
                    </p>
                    <ul>
                      <li>
                        <strong>Top Header:</strong> Clean executive brand + <code>⌘K</code> search trigger (Option 1) + direct Resume CTA (Option 3).
                      </li>
                      <li>
                        <strong>Conversational Integration:</strong> Brewbit contextual pills (Option 6) displayed smoothly beside active content.
                      </li>
                      <li>
                        <strong>Mobile Adaptation:</strong> Compact floating dock or bottom sheet (Option 2) for flawless handheld exploration.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
