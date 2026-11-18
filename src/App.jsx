import React, { useState, useEffect, useCallback, memo } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import CoffeeeExperience from "./components/coffeee/CoffeeeExperience";

import About from "./components/About";
import Skills from "./components/Skills";
import Academics from "./components/Academics";
import Projects from "./components/Projects";
import CP from "./components/CP";
import Contact from "./components/Contact";

export const StaticBackground = memo(({ theme }) => {
  const styles = theme === "light"
    ? {
        backgroundColor: "hsl(210, 40%, 98%)",
        backgroundImage: "radial-gradient(ellipse at 10% 10%, hsla(210, 100%, 94%, .5), transparent), radial-gradient(ellipse at 90% 90%, hsla(240, 100%, 94%, .5), transparent), linear-gradient(hsl(210, 40%, 96%) 1.5px, transparent 1.5px), linear-gradient(to right, hsl(210, 40%, 96%) 1.5px, hsl(210, 40%, 98%) 1.5px)",
        backgroundSize: "40px 40px",
      }
    : {
        backgroundColor: "hsl(222, 47%, 11%)",
        backgroundImage: "radial-gradient(ellipse at 10% 10%, hsla(212, 96%, 15%, .8), transparent), radial-gradient(ellipse at 90% 90%, hsla(260, 90%, 20%, .5), transparent), linear-gradient(hsla(222, 47%, 13%, 1) 1.5px, transparent 1.5px), linear-gradient(to right, hsla(222, 47%, 13%, 1) 1.5px, hsl(222, 47%, 11%) 1.5px)",
        backgroundSize: "40px 40px",
      };

  return <div className="fixed inset-0 -z-50 pointer-events-none transition-colors duration-500" style={styles} />;
});
StaticBackground.displayName = "StaticBackground";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

const AnimatedRoutes = memo(() => {
  const location = useLocation();
  const routesConfig = [
    { path: "/about", Component: About },
    { path: "/skills", Component: Skills },
    { path: "/academics", Component: Academics },
    { path: "/projects", Component: Projects },
    { path: "/cp", Component: CP },
    { path: "/contact", Component: Contact },
  ];

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routesConfig.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Component />
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
});
AnimatedRoutes.displayName = "AnimatedRoutes";

function LegacyPortfolio({ theme, toggleTheme, sideNavOpen, setSideNavOpen }) {
  return (
    <Layout theme={theme} toggleTheme={toggleTheme} sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen}>
      <AnimatedRoutes />
    </Layout>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return "dark";
  });
  const [sideNavOpen, setSideNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((previous) => (previous === "light" ? "dark" : "light"));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CoffeeeExperience theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/*" element={<LegacyPortfolio theme={theme} toggleTheme={toggleTheme} sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
