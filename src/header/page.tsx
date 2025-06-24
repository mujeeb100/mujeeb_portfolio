"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: You can use any icon lib or emoji

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close menu on selection
  };

  return (
    <>
      <main className="bg-gradient-to-b from-white to-[#f2f4fc] text-gray-800 sticky top-0 z-50 w-full">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div className="text-xl font-bold text-blue-600">
            MA <span className="text-black">Mujeeb Ansari</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
            <button onClick={() => handleScroll("home")} className="text-blue-600">Home</button>
            <button onClick={() => handleScroll("about")}>About</button>
            <button onClick={() => handleScroll("experience")}>Experience</button>
            <button onClick={() => handleScroll("experience")}>Projects</button>
            <button onClick={() => handleScroll("skills")}>Skills</button>
            <button onClick={() => handleScroll("contact")}>Contact</button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <nav className="md:hidden px-6 py-4 bg-white shadow-sm space-y-4 flex flex-col text-gray-600 font-medium">
            <button onClick={() => handleScroll("home")} className="text-blue-600 text-left">Home</button>
            <button onClick={() => handleScroll("about")} className="text-left">About</button>
            <button onClick={() => handleScroll("experience")} className="text-left">Experience</button>
            <button onClick={() => handleScroll("experience")} className="text-left">Projects</button>
            <button onClick={() => handleScroll("skills")} className="text-left">Skills</button>
            <button onClick={() => handleScroll("contact")} className="text-left">Contact</button>
          </nav>
        )}
      </main>
    </>
  );
}
