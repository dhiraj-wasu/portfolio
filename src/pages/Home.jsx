import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Copy, FileDown, User, Github, Linkedin } from "lucide-react";
import useSWR from "swr";
import { TerminalIcon } from "../components/TechLogos";
import contactConfig from "../config/contact";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const Home = () => {
  const [copied, setCopied] = useState(false);
  const email = contactConfig.email;

  // Live GitHub repo count via SWR
  const { data: githubData } = useSWR(
    "https://api.github.com/users/dhiraj-wasu",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  const formatRepoCount = (count) => {
    if (!count) return "18+";
    return count < 5 ? count.toString() : `${Math.floor(count / 5) * 5}+`;
  };

  const repoDisplay = formatRepoCount(githubData?.public_repos || 18);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEmailClick = (e) => {
    if (window.innerWidth <= 640) {
      window.location.href = `mailto:${email}`;
      e.preventDefault();
    } else {
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-7 sm:mt-0 md:mt-3 lg:mt-5">
      <div className="text-center relative z-10 max-w-4xl mx-auto">
        {/* Name Header */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 relative tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <br className="hidden sm:inline" />
          Dhiraj Wasu
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 relative tracking-tighter gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          I architect & build systems
        </motion.h2>

        {/* Professional Summary */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Computer Science Engineering student passionate about backend systems, distributed architectures, and intelligent automation.
        </motion.p>

        {/* Action Buttons & Email Pill */}
        <motion.div
          className="flex flex-col items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <a
              href={contactConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-full text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              Download CV
            </a>

            <Link
              to="/about"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 text-white rounded-full text-sm sm:text-base font-medium hover:bg-white/20 transition-colors flex items-center gap-2 border border-white/5"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              About Me
            </Link>
          </div>

          {/* Interactive Email Copy Pill */}
          <button
            onClick={handleEmailClick}
            className="group relative flex items-center gap-2 py-2 pl-8 pr-4 hover:bg-white/5 rounded-full transition-all cursor-copy sm:cursor-pointer border border-white/5"
            aria-label={`Email: ${email}`}
          >
            <div className="absolute left-3 flex items-center">
              <div className="w-3 text-gray-500 group-hover:text-white transition-colors">
                <TerminalIcon />
              </div>
              <span className="text-lg font-mono text-gray-400 ml-3 group-hover:text-white transition-colors">
                ~
              </span>
            </div>
            <span className="text-gray-400 group-hover:text-white transition-colors ml-4 sm:text-base">
              {email}
            </span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hidden sm:block">
              {copied ? (
                <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400 hover:text-white transition-colors" aria-hidden="true" />
              )}
            </div>
          </button>
        </motion.div>

        {/* 3 Stats Cards */}
        <motion.div
          className="grid grid-cols-3 justify-items-center gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-xs sm:max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* GitHub Stats */}
          <motion.a
            href={contactConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group w-full bg-white/5 hover:bg-white/10 p-3 sm:p-4 rounded-xl border border-white/5 transition-all"
            whileHover={{ y: -3 }}
            aria-label="Visit GitHub profile"
          >
            <div className="p-2 sm:p-3 rounded-lg mb-1">
              <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors mx-auto" />
            </div>
            <span className="text-base sm:text-lg font-semibold text-white">
              {repoDisplay}
            </span>
            <span className="text-xs sm:text-sm text-gray-400">
              GitHub Repos
            </span>
          </motion.a>

          {/* LinkedIn Stats */}
          <motion.a
            href={contactConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group w-full bg-white/5 hover:bg-white/10 p-3 sm:p-4 rounded-xl border border-white/5 transition-all"
            whileHover={{ y: -3 }}
            aria-label="Visit LinkedIn profile"
          >
            <div className="p-2 sm:p-3 rounded-lg mb-1">
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors mx-auto" />
            </div>
            <span className="text-base sm:text-lg font-semibold text-white">
              2000+
            </span>
            <span className="text-xs sm:text-sm text-gray-400">
              Network
            </span>
          </motion.a>

          {/* LeetCode / Problem Solving Stats */}
          <motion.a
            href={contactConfig.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group w-full bg-white/5 hover:bg-white/10 p-3 sm:p-4 rounded-xl border border-white/5 transition-all"
            whileHover={{ y: -3 }}
            aria-label="Visit LeetCode profile"
          >
            <div className="p-2 sm:p-3 rounded-lg mb-1">
              <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors mx-auto" fill="currentColor" aria-hidden="true">
                <path d="M21.469 23.907l-3.595 3.473c-0.624 0.625-1.484 0.885-2.432 0.885s-1.807-0.26-2.432-0.885l-5.776-5.812c-0.62-0.625-0.937-1.537-0.937-2.485 0-0.952 0.317-1.812 0.937-2.432l5.76-5.844c0.62-0.619 1.5-0.859 2.448-0.859s1.808 0.26 2.432 0.885l3.595 3.473c0.687 0.688 1.823 0.663 2.536-0.052 0.708-0.713 0.735-1.848 0.047-2.536l-3.473-3.511c-0.901-0.891-2.032-1.505-3.261-1.787l3.287-3.333c0.688-0.687 0.667-1.823-0.047-2.536s-1.849-0.735-2.536-0.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996 0.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-0.683 5.109-1.989l3.479-3.521c0.688-0.683 0.661-1.817-0.052-2.531s-1.849-0.74-2.531-0.052zM27.749 17.349h-13.531c-0.932 0-1.692 0.801-1.692 1.791 0 0.991 0.76 1.797 1.692 1.797h13.531c0.933 0 1.693-0.807 1.693-1.797 0-0.989-0.76-1.791-1.693-1.791z" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-semibold text-white">
              DSA
            </span>
            <span className="text-xs sm:text-sm text-gray-400">
              Problem Solving
            </span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
