import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import ScrollToTop from "./components/ScrollToTop";
import CoffeeeExperience from "./components/coffeee/CoffeeeExperience";
import BrewbitGuide from "./components/coffeee/BrewbitGuide";
import { NavigationLabProvider } from "./components/navigation/NavigationLabContext";
import "./components/navigation/navigation-lab.css";

import Background3D from "./components/Background3D";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

// Lazy-loaded reference pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Experience = lazy(() => import("./pages/Experience"));
const Education = lazy(() => import("./pages/Education"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const seoConfig = {
  "/": {
    title: "Brewbit — Explore Dhiraj's World",
    description: "Explore Dhiraj Wasu's engineering journey, projects and technical interests with Brewbit, his interactive portfolio guide.",
  },
  "/classic": {
    title: "Dhiraj Wasu - Backend & Systems Engineer Portfolio",
    description: "Welcome to Dhiraj Wasu's Classic Portfolio. Explore high-performance caches, distributed queues, and RAG architectures.",
  },
  "/home": {
    title: "Dhiraj Wasu - Backend & Systems Engineer Portfolio",
    description: "Welcome to Dhiraj Wasu's Classic Portfolio. Explore high-performance caches, distributed queues, and RAG architectures.",
  },
  "/about": {
    title: "About - Dhiraj Wasu | Backend & Systems Engineer",
    description: "Learn about Dhiraj Wasu — Computer Science Engineering student at SGGSIE&T, Nanded, specializing in backend and distributed systems.",
  },
  "/education": {
    title: "Education - Dhiraj Wasu | B.Tech Computer Science",
    description: "Academic journey of Dhiraj Wasu — B.Tech at SGGSIE&T (8.40 CGPA) and Diploma at G.H. Raisoni (9.44 CGPA).",
  },
  "/academics": {
    title: "Education - Dhiraj Wasu | B.Tech Computer Science",
    description: "Academic journey of Dhiraj Wasu — B.Tech at SGGSIE&T (8.40 CGPA) and Diploma at G.H. Raisoni (9.44 CGPA).",
  },
  "/experience": {
    title: "Experience - Dhiraj Wasu | Backend & Systems Engineer",
    description: "Engineering experience, research projects, and technical honors of Dhiraj Wasu.",
  },
  "/skills": {
    title: "Skills - Dhiraj Wasu | Python, C++, Java, Redis, FastAPI",
    description: "Technical skills of Dhiraj Wasu — C++, Python, Java, FastAPI, Django, Redis, Docker, and distributed systems.",
  },
  "/projects": {
    title: "Projects - Dhiraj Wasu | Systems & AI Engineering Portfolio",
    description: "Explore backend and systems projects built by Dhiraj Wasu: Anuvada AI, AI Mesh System, ZeroTrust Defender, and In-Memory Cache.",
  },
  "/certificates": {
    title: "Certificates & Honors - Dhiraj Wasu | Engineering Awards",
    description: "Certifications and awards of Dhiraj Wasu, including Student of the Institute (2023) and State Level DIPEX Winner.",
  },
  "/contact": {
    title: "Contact - Dhiraj Wasu | Connect & Opportunities",
    description: "Get in touch with Dhiraj Wasu for systems engineering, backend roles, and technical discussions.",
  },
};

function SEOUpdater() {
  const location = useLocation();

  useEffect(() => {
    const info = seoConfig[location.pathname] || {
      title: "Dhiraj Wasu - Backend & Systems Engineer",
      description:
        "Portfolio of Dhiraj Wasu — Computer Science Engineering student passionate about backend systems, distributed architectures, and intelligent automation.",
    };

    document.title = info.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", info.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", info.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", info.description);
  }, [location.pathname]);

  return null;
}

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
}

// Classic Portfolio Layout matching reference design
function ClassicPortfolioLayout({ children }) {
  return (
    <div className="bg-black text-gray-100 min-h-screen flex flex-col font-sans selection:bg-white/20 selection:text-white">
      <Background3D />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return "dark";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <Router>
      <NavigationLabProvider>
        <ScrollToTop />
        <SEOUpdater />
        <RedirectHandler />
        <Routes>
          {/* Protected Coffeee Bot Experience */}
          <Route
            path="/"
            element={<CoffeeeExperience theme={theme} toggleTheme={toggleTheme} />}
          />

          {/* Recreated Classic Portfolio Experience */}
          <Route
            path="/classic"
            element={
              <ClassicPortfolioLayout>
                <Home />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/home"
            element={
              <ClassicPortfolioLayout>
                <Home />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/about"
            element={
              <ClassicPortfolioLayout>
                <About />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/education"
            element={
              <ClassicPortfolioLayout>
                <Education />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/academics"
            element={
              <ClassicPortfolioLayout>
                <Education />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/experience"
            element={
              <ClassicPortfolioLayout>
                <Experience />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/skills"
            element={
              <ClassicPortfolioLayout>
                <Skills />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/cp"
            element={
              <ClassicPortfolioLayout>
                <Skills />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <ClassicPortfolioLayout>
                <Projects />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/certificates"
            element={
              <ClassicPortfolioLayout>
                <Certificates />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <ClassicPortfolioLayout>
                <Contact />
              </ClassicPortfolioLayout>
            }
          />
          <Route
            path="*"
            element={
              <ClassicPortfolioLayout>
                <NotFound />
              </ClassicPortfolioLayout>
            }
          />
        </Routes>
        <BrewbitGuide theme={theme} />
        <Analytics />
      </NavigationLabProvider>
    </Router>
  );
}

export default App;
