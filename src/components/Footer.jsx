import React from "react";
import { Link } from "react-router-dom";
import { Code2, Mail, Phone, Github, Linkedin } from "lucide-react";
import contactConfig from "../config/contact";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Home", path: "/classic" },
    { name: "About", path: "/about" },
    { name: "Education", path: "/education" },
    { name: "Experience", path: "/experience" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Certificates", path: "/certificates" },
    { name: "Contact", path: "/contact" },
  ];

  const col1 = links.slice(0, 3);
  const col2 = links.slice(3, 6);
  const col3 = links.slice(6, 8);

  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-12">
          {/* Brand & Summary */}
          <div className="space-y-4">
            <Link to="/classic" className="flex items-center space-x-3">
              <Code2 className="w-8 h-8 text-white" aria-hidden="true" />
              <span className="text-xl font-bold text-white">{contactConfig.name}</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Computer Science Engineering student & backend engineer based in Maharashtra, India.
            </p>
            <div className="pt-1">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <span>☕︎ Switch to Brewbit Chat</span>
              </Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  aria-label={`Email ${contactConfig.name}`}
                >
                  <Mail className="w-4 h-4 text-gray-400" aria-hidden="true" />
                  <span>{contactConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactConfig.phone.replace(/\s+/g, "")}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  aria-label={`Call ${contactConfig.name}`}
                >
                  <Phone className="w-4 h-4 text-gray-400" aria-hidden="true" />
                  <span>{contactConfig.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-2">
              <div>
                {col1.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div>
                {col2.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="col-span-2 sm:col-span-1">
                {col3.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Social</h3>
            <div className="flex space-x-4">
              <a
                href={contactConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={contactConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={contactConfig.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LeetCode profile"
              >
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M21.469 23.907l-3.595 3.473c-0.624 0.625-1.484 0.885-2.432 0.885s-1.807-0.26-2.432-0.885l-5.776-5.812c-0.62-0.625-0.937-1.537-0.937-2.485 0-0.952 0.317-1.812 0.937-2.432l5.76-5.844c0.62-0.619 1.5-0.859 2.448-0.859s1.808 0.26 2.432 0.885l3.595 3.473c0.687 0.688 1.823 0.663 2.536-0.052 0.708-0.713 0.735-1.848 0.047-2.536l-3.473-3.511c-0.901-0.891-2.032-1.505-3.261-1.787l3.287-3.333c0.688-0.687 0.667-1.823-0.047-2.536s-1.849-0.735-2.536-0.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996 0.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-0.683 5.109-1.989l3.479-3.521c0.688-0.683 0.661-1.817-0.052-2.531s-1.849-0.74-2.531-0.052zM27.749 17.349h-13.531c-0.932 0-1.692 0.801-1.692 1.791 0 0.991 0.76 1.797 1.692 1.797h13.531c0.933 0 1.693-0.807 1.693-1.797 0-0.989-0.76-1.791-1.693-1.791z" />
                </svg>
              </a>
              <a
                href={contactConfig.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="HackerRank profile"
              >
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M 15.998047 3 C 14.225047 3 5.5352031 7.9839062 4.6582031 9.5039062 C 3.7802031 11.024906 3.7802031 20.983047 4.6582031 22.498047 C 5.5392031 24.017047 14.229047 29 15.998047 29 C 17.762047 29 26.451938 24.019953 27.335938 22.501953 C 28.222938 20.979953 28.222938 11.014047 27.335938 9.4980469 L 27.335938 9.4960938 C 26.444937 7.9790937 17.756047 3 15.998047 3 z M 15.996094 5.0117188 C 17.693094 5.3647187 24.417703 9.2167656 25.595703 10.509766 C 26.135703 12.150766 26.134703 19.844281 25.595703 21.488281 C 24.425703 22.779281 17.695094 26.636281 15.996094 26.988281 C 14.298094 26.638281 7.5723906 22.783234 6.4003906 21.490234 C 5.8653906 19.842234 5.8653906 12.155766 6.4003906 10.509766 C 7.5693906 9.2167656 14.297094 5.3617187 15.996094 5.0117188 z M 13 9 L 11 11 L 12 11 L 12 21 L 14 21 L 14 17 L 18 17 L 18 21 L 17 21 L 19 23 L 21 21 L 20 21 L 20 12 L 18 12 L 18 15 L 14 15 L 14 11 L 15 11 L 13 9 z" />
                </svg>
              </a>
              <a
                href={`mailto:${contactConfig.email}`}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} {contactConfig.name}. All rights reserved.</p>
            <p className="mt-4 md:mt-0">{contactConfig.name}'s Portfolio</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
