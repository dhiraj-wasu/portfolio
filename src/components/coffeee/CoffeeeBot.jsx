import { useState } from "react";
import { Coffee, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reactions = {
  idle: { label: "Just hanging out", message: "Need a hand exploring?" },
  greeting: { label: "Hello there", message: "Hey! Welcome in." },
  curious: { label: "Curious", message: "Ooh, what are we looking at?" },
  thinking: { label: "Thinking", message: "Let me think that through…" },
  working: { label: "Working", message: "On it. Brewing an answer…" },
  done: { label: "Ready", message: "Freshly brewed." },
};

export default function CoffeeeBot({ state = "idle", compact = false, onClick }) {
  const [imageFailed, setImageFailed] = useState(false);
  const reaction = reactions[state] || reactions.idle;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Coffeee Bot — open the portfolio assistant"
      className={`coffeee-bot group relative flex flex-col items-center justify-center ${compact ? "coffeee-bot--compact" : ""}`}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence mode="wait">
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
      </AnimatePresence>

      <motion.div
        className="coffeee-bot__art"
        animate={
          state === "working"
            ? { y: [0, -3, 0], rotate: [0, -1, 1, 0] }
            : state === "done"
              ? { y: [0, -12, 0] }
              : { y: [0, -5, 0] }
        }
        transition={{
          duration: state === "done" ? 0.55 : state === "working" ? 0.8 : 3.2,
          repeat: state === "done" ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        {!imageFailed ? (
          <img
            src="/assets/coffeee-bot.webp"
            alt="Coffeee Bot, the portfolio's coffee-cup mascot"
            onError={() => setImageFailed(true)}
            draggable="false"
          />
        ) : (
          <div className="coffeee-bot__fallback" aria-hidden="true">
            <span className="coffeee-bot__steam">〰</span>
            <div className="coffeee-bot__cup">
              <Coffee size={58} strokeWidth={1.35} />
              <span className="coffeee-bot__eyes">••</span>
            </div>
            <span className="coffeee-bot__fallback-caption">Coffeee</span>
          </div>
        )}
      </motion.div>
      <span className="coffeee-bot__status">
        <span className={state === "working" || state === "thinking" ? "is-busy" : ""} />
        {reaction.label}
        <Sparkles size={12} />
      </span>
    </motion.button>
  );
}
