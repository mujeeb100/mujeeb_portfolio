"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "consultation", label: "Hire Me" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offsets: Record<string, number> = {};

      navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) {
          offsets[link.id] = el.offsetTop - 100; // small buffer
        }
      });

      const current = navLinks.findLast((link) => scrollY >= (offsets[link.id] || 0));
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial trigger

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkClasses = (id: string) =>
    `transition-colors duration-300 ${
      activeSection === id
        ? "text-blue-600 dark:text-blue-400 font-bold"
        : "text-gray-600 dark:text-gray-300"
    }`;

  return (
    <main className="bg-gradient-to-b from-white to-[#f2f4fc] dark:from-black dark:to-gray-900 text-gray-800 dark:text-white sticky top-0 z-50 w-full">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="text-xl font-bold text-blue-600 dark:text-white">
          MA <span className="text-black dark:text-blue-400">Mujeeb Ansari</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className={getLinkClasses(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-yellow-300 hover:scale-105 transition"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden px-6 py-4 bg-white dark:bg-gray-800 shadow-sm space-y-4 flex flex-col font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className={`${getLinkClasses(link.id)} text-left`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </main>
  );
}
