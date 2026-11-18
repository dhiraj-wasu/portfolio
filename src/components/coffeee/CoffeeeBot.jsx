import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reactions = {
  idle: { label: "Just hanging out", message: "Need a hand exploring?" },
  greeting: { label: "Hello there", message: "Hey! Welcome in." },
  curious: { label: "Curious", message: "Ooh, what are we looking at?" },
  thinking: { label: "Thinking", message: "Let me think that through…" },
  working: { label: "Working", message: "On it. Brewing an answer…" },
  explaining: { label: "Explaining", message: "Here's what I found." },
  completed: { label: "Ready", message: "Freshly brewed." },
  relaxing: { label: "Coffee break", message: "Take your time. I'll be here." },
};

const motionByState = {
  idle: { y: [0, -4, 0] },
  greeting: { y: [0, -5, 0], rotate: [0, 2, 0] },
  curious: { y: [0, -3, 0], rotate: [0, -2, 2, 0] },
  thinking: { y: [0, -2, 0], rotate: [0, -2, 0] },
  working: { y: [0, -2, 0], rotate: [0, -1, 1, 0] },
  explaining: { y: [0, -4, 0], rotate: [0, 1, 0] },
  completed: { y: [0, -12, 0] },
  relaxing: { y: [0, -2, 0], rotate: [0, 1, 0] },
};

const poseClass = {
  idle: "pose-idle",
  greeting: "pose-greeting",
  thinking: "pose-thinking",
  working: "pose-working",
  explaining: "pose-explaining",
  completed: "pose-completed",
  curious: "pose-curious",
  relaxing: "pose-relaxing",
};

export default function CoffeeeBot({ state = "idle", compact = false, onClick }) {
  const reaction = reactions[state] || reactions.idle;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      aria-label={onClick ? "Coffeee Bot — open the portfolio assistant" : `Coffeee Bot — ${reaction.label}`}
      className={`coffeee-bot ${compact ? "coffeee-bot--compact" : ""}`}
      whileHover={onClick ? { y: -5, scale: 1.025 } : undefined}
      whileTap={onClick ? { scale: 0.97 } : undefined}
    >
      <AnimatePresence mode="wait">
        {!compact && (
          <motion.span
            key={state}
            className="coffeee-bot__bubble"
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            {reaction.message}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        key={state}
        className={`coffeee-bot__sprite ${poseClass[state] || poseClass.idle}`}
        role="img"
        aria-label="Coffeee Bot mascot"
        animate={motionByState[state] || motionByState.idle}
        transition={{
          duration: state === "completed" ? 0.58 : state === "working" ? 0.72 : 2.8,
          repeat: state === "completed" ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
      {!compact && (
        <span className="coffeee-bot__status">
          <span className={state === "working" || state === "thinking" ? "is-busy" : ""} />
          {reaction.label}
          <Sparkles size={12} />
        </span>
      )}
    </motion.button>
  );
}
