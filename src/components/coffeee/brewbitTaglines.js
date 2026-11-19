/**
 * Centralized tagline configuration for Brewbit mascot.
 * Short, witty, context-aware taglines that reflect Brewbit's personality.
 */
export const BREWBIT_TAGLINES = {
  initial: "Hey there, curious human!",
  welcome: "Your next discovery starts here.",
  idle: "Brewing up something interesting...",
  typing: "Ooh, that's an interesting question!",
  submitting: "Let me dig into that.",
  processing: "One moment, ideas are brewing.",
  answered: "Freshly brewed insights, coming up.",
  exploringProjects: "Let's get into the good stuff.",
  exploringExperience: "A little journey through the engineering years.",
  exploringSkills: "Tools of the trade, coming right up.",
  returnToIdle: "Still curious? So am I.",
};

/**
 * Resolve context-aware tagline based on situation or state
 */
export function resolveTagline(situation, fallback) {
  if (BREWBIT_TAGLINES[situation]) {
    return BREWBIT_TAGLINES[situation];
  }
  return fallback || BREWBIT_TAGLINES.initial;
}
