"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 glass border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      <div className="w-full px-[clamp(1.5rem,5vw,6rem)] flex justify-between items-center">

        <a href="#" className="text-2xl font-bold tracking-tighter">
          AT<span className="text-accent-brick">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="px-6 py-2.5 bg-accent-brick text-white font-bold rounded-lg text-sm hover:scale-105 transition-transform"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/5 p-6 space-y-4"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="block text-lg font-medium text-slate-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="block w-full py-3 bg-accent-cyan text-[#050505] font-bold rounded-lg text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Let&apos;s Talk
          </a>
        </motion.div>
      )}
    </nav>
  );
}
