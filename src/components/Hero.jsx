"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Mail, MapPin, Zap, Layers, Code2, Briefcase, Star } from "lucide-react";
import { Github } from "./Icons";
import { useRef } from "react";
import profileImg from "../assets/profile.jpg";

const statsData = [
  { label: "Projects Built", value: "5+", icon: <Briefcase className="w-4 h-4" /> },
  { label: "Tech Stack", value: "25+", icon: <Code2 className="w-4 h-4" /> },
  { label: "Experience", value: "1+ Yr", icon: <Star className="w-4 h-4" /> },
];

const quickSkills = ["React", "Next.js", "Tailwind CSS", "Node.js", "Android SDK", "Kotlin"];


function PhotoCard() {
  const cardRef = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);

  const springX = useSpring(rotX, { stiffness: 180, damping: 24 });
  const springY = useSpring(rotY, { stiffness: 180, damping: 24 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rotX.set((-y / rect.height) * 14);
    rotY.set((x / rect.width) * 14);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className="relative w-56 h-56 md:w-72 md:h-72 xl:w-80 xl:h-80 flex-shrink-0"
    >
      {/* Rotating gradient border */}
      <div className="gradient-border-spin w-full h-full">
        <div className="w-full h-full overflow-hidden rounded-full">
          <img
            src={profileImg}
            alt="Arpitsinh Thakor"
            className="w-full h-full object-cover scale-105 transition-all duration-700 hover:scale-110"
          />
        </div>
      </div>

      {/* Floating badge top-left */}
      <div className="animate-float-1 absolute top-[-20px] left-[-20px] md:top-[-28px] md:left-[-28px] z-20">
        <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 whitespace-nowrap border border-accent-brick/20 shadow-lg">
          <Layers className="w-4 h-4 text-accent-brick" />
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] text-slate-500 font-dm-mono uppercase tracking-wider">Stack</span>
            <span className="text-xs font-semibold text-white">React · Next.js</span>
          </div>
        </div>
      </div>

      {/* Floating badge top-right */}
      <div className="animate-float-2 absolute top-[-20px] right-[-20px] md:top-[-28px] md:right-[-28px] z-20">
        <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 whitespace-nowrap border border-accent-teal/20 shadow-lg">
          <Zap className="w-4 h-4 text-accent-teal" />
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] text-slate-500 font-dm-mono uppercase tracking-wider">Specialty</span>
            <span className="text-xs font-semibold text-white">Full Stack</span>
          </div>
        </div>
      </div>

      {/* Floating badge bottom */}
      <div className="animate-float-3 absolute bottom-[-20px] left-1/2 -translate-x-1/2 md:bottom-[-28px] z-20">
        <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 whitespace-nowrap border border-accent-pink/20 shadow-lg">
          <MapPin className="w-4 h-4 text-accent-pink" />
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] text-slate-500 font-dm-mono uppercase tracking-wider">Location</span>
            <span className="text-xs font-semibold text-white">Surat, Gujarat 🇮🇳</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-stretch pt-24 pb-16 px-[clamp(1.5rem,5vw,6rem)] overflow-hidden">
      <div className="w-full z-10 flex flex-col">
        <div className="w-full flex-1 glass rounded-[36px] box-shadow-brick border border-white/[0.06] min-h-[calc(100vh-9rem)] grid grid-cols-1 xl:grid-cols-2 overflow-hidden">

          {/* ── LEFT COLUMN — Photo + Stats ── */}
          <div className="flex flex-col items-center justify-center gap-10 p-10 md:p-14 xl:p-20 border-b md:border-b-0 md:border-r border-white/[0.06] bg-gradient-to-br from-accent-brick/[0.04] to-transparent">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-8"
            >
              <PhotoCard />
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full grid grid-cols-3 gap-4 mt-6"
            >
              {statsData.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-brick/30 transition-colors"
                >
                  <div className="text-accent-brick mb-1">{s.icon}</div>
                  <div className="font-syne text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="font-dm-mono text-[10px] text-slate-500 uppercase tracking-wider text-center">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Headline + Bio + CTA ── */}
          <div className="flex flex-col justify-center gap-8 p-10 md:p-14 xl:p-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-dm-mono px-4 py-1.5 rounded-full bg-accent-brick/10 border border-accent-brick/20 text-accent-brick text-xs mb-6 inline-block uppercase tracking-widest">
                ✦ Full Stack &amp; Android Developer
              </span>

              <h1 className="font-syne text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Hi, I&apos;m{" "}
                <span className="text-gradient">your name</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl">
                Full Stack Web Developer &amp; Android App Developer. I transform complex
                visions into high-performance, user-centric digital experiences.
              </p>
            </motion.div>

            {/* Tech chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap gap-2"
            >
              {quickSkills.map((skill) => (
                <span
                  key={skill}
                  className="font-dm-mono text-xs px-4 py-1.5 rounded-full glass border border-white/10 text-slate-300 hover:border-accent-brick/40 hover:text-accent-brick transition-colors"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#projects"
                className="px-8 py-4 bg-accent-brick text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 animate-glow-warm text-base"
              >
                View My Work <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 glass border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-base"
              >
                Let&apos;s Connect
              </a>
              <div className="flex gap-3 ml-auto">
                <a
                  href="https://github.com/arpitthakor28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 glass rounded-xl hover:bg-white/10 transition-all text-slate-300 hover:text-white"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:thakorarpitsinh25@gmail.com"
                  className="p-3.5 glass rounded-xl hover:bg-white/10 transition-all text-slate-300 hover:text-white"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Available for work badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 pt-4 border-t border-white/[0.06]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-avail flex-shrink-0" />
              <span className="font-dm-mono text-sm text-emerald-400 font-semibold">Available for Work</span>
              <span className="text-slate-600 text-sm ml-2">· Open to full-time &amp; freelance opportunities</span>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-brick/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent-teal/5 rounded-full blur-[140px] -z-10" />
    </section>
  );
}
