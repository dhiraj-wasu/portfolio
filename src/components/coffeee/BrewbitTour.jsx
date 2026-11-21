import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles, X, ChevronLeft, ArrowRight,
  RotateCcw, Compass, ExternalLink, Coffee
} from "lucide-react";
import CoffeeeBot from "./CoffeeeBot";

const TOUR_STEPS = [
  {
    id: "intro",
    type: "modal",
    pose: "greeting",
    badge: "WELCOME",
    title: "Brewbit Quick Tour",
    message: "Hey! Let me show you how to get the most out of this portfolio in 4 quick steps!",
    targetSelector: null,
    nextLabel: "Let's begin! →",
  },
  {
    id: "chat-input",
    type: "spotlight",
    pose: "working",
    badge: "STEP 1 OF 4",
    title: "How to Chat & What to Ask",
    message: "Start by asking me anything! Ask about Dhiraj's backend projects, distributed systems, AI architectures, or tech stack. I provide instant interactive answers, live GitHub links, and deep dives!",
    targetSelector: '[data-tour="chat-input"]',
    scrollSelector: ".coffeee-landing-composer",
    scrollPosition: "center",
    sampleQuestion: "Tell me about Dhiraj's backend projects",
    nextLabel: "Next: Top Nav Bar →",
  },
  {
    id: "nav-sections",
    type: "spotlight",
    pose: "explaining",
    badge: "STEP 2 OF 4",
    title: "Click Nav Sections to Prompt Chat",
    message: "Notice the top navbar items — About, Projects, and Experience. When you click any of them, it prompts me into chat directly right here, so you get instant tailored answers without leaving!",
    targetSelector: '[data-tour="nav-sections"]',
    fallbackSelector: '[data-tour="about"]',
    scrollSelector: "header",
    scrollPosition: "top",
    nextLabel: "Next: Classic Site →",
  },
  {
    id: "classic-site",
    type: "spotlight",
    pose: "curious",
    badge: "STEP 3 OF 4",
    title: "Switch to Normal Portfolio Site",
    message: "Prefer a traditional multi-page website? Click the 'Classic Site ↗' button anytime in the top bar to visit the full classic portfolio site with all standard pages.",
    targetSelector: '[data-tour="classic-site"]',
    scrollSelector: "header",
    scrollPosition: "top",
    nextLabel: "Next: Resume & CV →",
  },
  {
    id: "resume",
    type: "spotlight",
    pose: "explaining",
    badge: "STEP 4 OF 4",
    title: "Quick Resume / CV Request",
    message: "Need Dhiraj's official resume? Click 'CV.pdf' (or 'Resume') in the header anytime to request his latest CV directly via email.",
    targetSelector: '[data-tour="resume"]',
    scrollSelector: "header",
    scrollPosition: "top",
    nextLabel: "Finish →",
  },
  {
    id: "final",
    type: "modal",
    pose: "completed",
    badge: "TOUR COMPLETE",
    title: "You're All Set!",
    message: "That's everything! Ask me anything in chat, click nav items for instant answers, or switch to the classic site whenever you like. Have fun exploring!",
    targetSelector: null,
  },
];

export default function BrewbitTour({
  isOpen,
  onClose,
  onComplete,
  onAskQuestion,
  theme = "light",
}) {
  const [stepIndex, setStepIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const s = parseInt(params.get("tourStep"), 10);
      if (!isNaN(s) && s >= 0 && s < TOUR_STEPS.length) return s;
    }
    return 0;
  });
  const [targetRect, setTargetRect] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const bubbleRef = useRef(null);

  const currentStep = TOUR_STEPS[stepIndex] || TOUR_STEPS[0];
  const isIntro = currentStep.id === "intro";
  const isFinal = currentStep.id === "final";
  const isSpotlight = currentStep.type === "spotlight";

  // Locate active DOM target
  const getTargetElement = useCallback((step) => {
    if (!step?.targetSelector) return null;
    let el = document.querySelector(step.targetSelector);
    if (!el && step.fallbackSelector) {
      el = document.querySelector(step.fallbackSelector);
    }
    return el;
  }, []);

  // Update bounding rectangle
  const updateTargetRect = useCallback(() => {
    if (!isOpen) {
      setTargetRect(null);
      return;
    }

    const el = getTargetElement(currentStep);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right,
      });
    } else {
      setTargetRect(null);
    }
  }, [isOpen, currentStep, getTargetElement]);

  // Handle step transitions and smooth scroll
  useEffect(() => {
    if (!isOpen) return;

    // Scroll to relevant section if specified
    if (currentStep.scrollSelector) {
      const scrollEl = document.querySelector(currentStep.scrollSelector);
      if (scrollEl) {
        if (currentStep.scrollPosition === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          scrollEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    } else if (currentStep.scrollPosition === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Measure target after scroll starts
    const timer = setTimeout(() => {
      updateTargetRect();
    }, 180);

    const timer2 = setTimeout(() => {
      updateTargetRect();
    }, 450);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [isOpen, stepIndex, currentStep, updateTargetRect]);

  // Window resize & scroll listeners to keep spotlight aligned
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      updateTargetRect();
    };

    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("scroll", handleScrollOrResize);
    };
  }, [isOpen, updateTargetRect]);

  // Keyboard navigation: Escape, ArrowRight, ArrowLeft
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleNext = () => {
    if (stepIndex < TOUR_STEPS.length - 1) {
      setStepIndex((idx) => idx + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex((idx) => idx - 1);
    }
  };

  const handleReplay = () => {
    setStepIndex(1); // Jump straight to Step 1: How to chat & what to ask
  };

  const handleApplySampleQuestion = () => {
    if (currentStep.sampleQuestion) {
      const input = document.querySelector('[data-tour="chat-input"]');
      if (input) {
        // Trigger React's synthetic change event
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          "value"
        )?.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(input, currentStep.sampleQuestion);
          const ev = new Event("input", { bubbles: true });
          input.dispatchEvent(ev);
        } else {
          input.value = currentStep.sampleQuestion;
        }
        input.focus();
      }
      onAskQuestion?.(currentStep.sampleQuestion);
    }
  };

  const handleStartExploring = () => {
    onComplete?.();
  };

  const handleAskBrewbit = () => {
    onClose?.();
    setTimeout(() => {
      const input = document.querySelector('[data-tour="chat-input"]');
      if (input) {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        input.focus();
      }
    }, 250);
  };

  // Calculate Speech Bubble Position relative to targetRect
  const bubblePosition = useMemo(() => {
    const BUBBLE_WIDTH = 340;
    const BUBBLE_HEIGHT = 220;
    const MARGIN = 16;
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
    const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;

    if (!targetRect || !isSpotlight) {
      // Centered dialog
      return {
        top: Math.max(MARGIN, Math.min(screenHeight - BUBBLE_HEIGHT - MARGIN, screenHeight * 0.32)),
        left: Math.max(MARGIN, (screenWidth - BUBBLE_WIDTH) / 2),
        placement: "center",
      };
    }

    // Horizontal centering on target
    const targetCenterX = targetRect.left + targetRect.width / 2;
    let left = targetCenterX - BUBBLE_WIDTH / 2;
    if (left < MARGIN) left = MARGIN;
    if (left + BUBBLE_WIDTH > screenWidth - MARGIN) {
      left = screenWidth - BUBBLE_WIDTH - MARGIN;
    }

    // Vertical placement: prefer below if ample space, else above
    const spaceBelow = screenHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;
    let top = 0;
    let placement = "bottom";

    if (spaceBelow >= BUBBLE_HEIGHT + 24 || spaceBelow >= spaceAbove) {
      top = targetRect.bottom + 14;
      placement = "bottom"; // Bubble is below target
    } else {
      top = targetRect.top - BUBBLE_HEIGHT - 14;
      placement = "top"; // Bubble is above target
    }

    // Clamp top within viewport
    if (top < MARGIN) top = MARGIN;
    if (top + BUBBLE_HEIGHT > screenHeight - MARGIN) {
      top = screenHeight - BUBBLE_HEIGHT - MARGIN;
    }

    return { top, left, placement };
  }, [targetRect, isSpotlight]);

  if (!isOpen) return null;

  const spotlightPadding = 6;
  const spotlightRadius = 12;

  return (
    <div className={`brewbit-tour-root theme-${theme}`}>
      {/* 1. Spotlight SVG Mask with translucent backdrop */}
      <AnimatePresence>
        {isSpotlight && targetRect && (
          <motion.svg
            key="spotlight-svg"
            className="brewbit-tour-spotlight-svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            <defs>
              <mask id="brewbit-spotlight-cutout">
                <rect width="100%" height="100%" fill="white" />
                <rect
                  x={targetRect.left - spotlightPadding}
                  y={targetRect.top - spotlightPadding}
                  width={targetRect.width + spotlightPadding * 2}
                  height={targetRect.height + spotlightPadding * 2}
                  rx={spotlightRadius}
                  ry={spotlightRadius}
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(24, 20, 16, 0.48)"
              mask="url(#brewbit-spotlight-cutout)"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Dim backdrop when no spotlight target (Intro & Final modal steps) */}
      {(!isSpotlight || !targetRect) && (
        <motion.div
          className="brewbit-tour-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* 2. Target Highlight Glow Ring */}
      <AnimatePresence>
        {isSpotlight && targetRect && (
          <motion.div
            key={`highlight-ring-${stepIndex}`}
            className="brewbit-tour-target-ring"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            style={{
              top: targetRect.top - spotlightPadding,
              left: targetRect.left - spotlightPadding,
              width: targetRect.width + spotlightPadding * 2,
              height: targetRect.height + spotlightPadding * 2,
              borderRadius: spotlightRadius,
            }}
          />
        )}
      </AnimatePresence>

      {/* 3. Floating Speech Bubble & Mascot Card */}
      <motion.div
        ref={bubbleRef}
        key={`tour-bubble-${stepIndex}`}
        className={`brewbit-tour-bubble ${isIntro || isFinal ? "brewbit-tour-bubble--modal" : ""} brewbit-tour-bubble--${bubblePosition.placement}`}
        style={{
          top: bubblePosition.top,
          left: bubblePosition.left,
        }}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: bubblePosition.placement === "top" ? -14 : 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Directional speech pointer */}
        {isSpotlight && targetRect && (
          <div
            className={`brewbit-tour-pointer brewbit-tour-pointer--${bubblePosition.placement}`}
            style={{
              left: Math.max(
                20,
                Math.min(
                  300,
                  targetRect.left + targetRect.width / 2 - bubblePosition.left - 8
                )
              ),
            }}
          />
        )}

        {/* Mascot & Header */}
        <div className="brewbit-tour-card-body">
          <div className="brewbit-tour-top">
            <div className="brewbit-tour-mascot-avatar">
              <CoffeeeBot state={currentStep.pose} compact />
            </div>

            <div className="brewbit-tour-content-header">
              <div className="brewbit-tour-badge-row">
                <span className="brewbit-tour-badge">
                  <Sparkles size={11} /> {currentStep.badge}
                </span>
                <button
                  type="button"
                  className="brewbit-tour-close"
                  onClick={onClose}
                  aria-label="Exit tour"
                >
                  <X size={15} />
                </button>
              </div>
              <h3 className="brewbit-tour-title">{currentStep.title}</h3>
            </div>
          </div>

          {/* Speech Text */}
          <p className="brewbit-tour-text">{currentStep.message}</p>

          {/* Interactive example chip on Chat step */}
          {currentStep.sampleQuestion && (
            <div className="brewbit-tour-sample-wrap">
              <span className="brewbit-tour-sample-label">Try asking:</span>
              <button
                type="button"
                className="brewbit-tour-sample-chip"
                onClick={handleApplySampleQuestion}
                title="Insert question into chat composer"
              >
                <Coffee size={13} />
                <span>"{currentStep.sampleQuestion}"</span>
              </button>
            </div>
          )}

          {/* Step Actions */}
          {!isFinal ? (
            <div className="brewbit-tour-nav-bar">
              <button
                type="button"
                className="brewbit-tour-skip-text"
                onClick={onClose}
              >
                Skip tour
              </button>

              <div className="brewbit-tour-button-group">
                {stepIndex > 0 && (
                  <button
                    type="button"
                    className="brewbit-tour-back-btn"
                    onClick={handlePrev}
                  >
                    <ChevronLeft size={14} /> Back
                  </button>
                )}
                <button
                  type="button"
                  className="brewbit-tour-next-btn"
                  onClick={handleNext}
                >
                  {currentStep.nextLabel || "Next →"}
                </button>
              </div>
            </div>
          ) : (
            /* Final Step Action Offerings */
            <div className="brewbit-tour-final-actions">
              <button
                type="button"
                className="brewbit-tour-action-btn primary"
                onClick={handleStartExploring}
              >
                Start exploring <ArrowRight size={14} />
              </button>
              <button
                type="button"
                className="brewbit-tour-action-btn secondary"
                onClick={handleAskBrewbit}
              >
                <Coffee size={14} /> Ask Brewbit something
              </button>
              <button
                type="button"
                className="brewbit-tour-action-btn tertiary"
                onClick={handleReplay}
              >
                <RotateCcw size={13} /> Replay tour
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
