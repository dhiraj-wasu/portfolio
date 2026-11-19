import { Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BREWBIT_TAGLINES } from "./brewbitTaglines";

const defaultTaglineByState = {
  idle: BREWBIT_TAGLINES.idle,
  greeting: BREWBIT_TAGLINES.initial,
  curious: BREWBIT_TAGLINES.typing,
  thinking: BREWBIT_TAGLINES.submitting,
  working: BREWBIT_TAGLINES.processing,
  explaining: BREWBIT_TAGLINES.answered,
  completed: BREWBIT_TAGLINES.answered,
  relaxing: BREWBIT_TAGLINES.returnToIdle,
};

const reactions = {
  idle: { label: "Just hanging out" },
  greeting: { label: "Hello there" },
  curious: { label: "Curious" },
  thinking: { label: "Thinking" },
  working: { label: "Working" },
  explaining: { label: "Explaining" },
  completed: { label: "Ready" },
  relaxing: { label: "Coffee break" },
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

export default function CoffeeeBot({
  state = "idle",
  compact = false,
  className = "",
  onClick,
  tagline,
}) {
  const shouldReduceMotion = useReducedMotion();
  const reaction = reactions[state] || reactions.idle;
  const currentTagline = tagline || defaultTaglineByState[state] || BREWBIT_TAGLINES.initial;
  const spriteUrl = `${import.meta.env.BASE_URL}assets/coffeee/coffeee-sprite.webp`;

  const content = (
    <>
      <AnimatePresence mode="wait">
        {!compact && (
          <motion.span
            key={currentTagline}
            className="coffeee-bot__bubble"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.96 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
          >
            {currentTagline}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        key={state}
        className={`coffeee-bot__sprite ${poseClass[state] || poseClass.idle}`}
        role="img"
        aria-label="Brewbit mascot"
        style={{ backgroundImage: `url("${spriteUrl}")` }}
        animate={shouldReduceMotion ? undefined : motionByState[state] || motionByState.idle}
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
    </>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        aria-label="Brewbit — open the portfolio assistant"
        className={`coffeee-bot ${compact ? "coffeee-bot--compact" : ""} ${className}`}
        whileHover={!shouldReduceMotion ? { y: -5, scale: 1.025 } : undefined}
        whileTap={!shouldReduceMotion ? { scale: 0.97 } : undefined}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.div
      role="img"
      aria-label={`Brewbit — ${reaction.label}`}
      className={`coffeee-bot ${compact ? "coffeee-bot--compact" : ""} ${className}`}
    >
      {content}
    </motion.div>
  );
}
