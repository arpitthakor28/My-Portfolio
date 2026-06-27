"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Monitor, Smartphone, Cpu, Activity, Utensils, Layers } from "lucide-react";
import { Github } from "./Icons";
import { useRef, useState } from "react";

const projects = [
  {
    title: "DineFlow",
    description: "A real-time restaurant management system and QR-based guest self-ordering portal featuring live order-sync, a KDS kitchen panel, and a cashier POS console.",
    tech: ["React", "Socket.io", "Firebase", "Node.js"],
    link: "https://hkrn-a2804.web.app",
    github: "https://github.com/arpitthakor28",
    type: "SaaS Web Application",
    icon: <Utensils className="w-5 h-5" />,
    accent: "#ff9f1c",
    accentBg: "rgba(255,159,28,0.08)",
  },
  {
    title: "AirSketch",
    description: "A futuristic gesture-controlled drawing application that lets you draw in the air using AI-powered hand tracking and MediaPipe.",
    tech: ["React", "MediaPipe", "Firebase", "Canvas API"],
    link: "https://airsketch-f610c.web.app",
    github: "https://github.com/arpitthakor28",
    type: "Web Application",
    icon: <Monitor className="w-5 h-5" />,
    accent: "#B6624B",
    accentBg: "rgba(182,98,75,0.08)",
  },
  {
    title: "BudgetBuddy",
    description: "A full-stack Android application for personal finance tracking, featuring expense categorization, analytics dashboards and SQLite local persistence.",
    tech: ["Android SDK", "Java/Kotlin", "Firebase", "SQLite"],
    github: "https://github.com/arpitthakor28",
    type: "Android App",
    icon: <Smartphone className="w-5 h-5" />,
    accent: "#8FBC8F",
    accentBg: "rgba(143,188,143,0.08)",
  },
  {
    title: "Interactive Portfolio",
    description: "A premium developer portfolio featuring a custom canvas spring-physics cursor, drifting particle networks, 3D hover effects, and a Node/Express backend for email delivery.",
    tech: ["React", "Vite", "Tailwind v4", "Express", "Framer Motion"],
    link: "https://portfolio-673bc.web.app",
    github: "https://github.com/arpitthakor28/My-Portfolio",
    type: "Web Application",
    icon: <Layers className="w-5 h-5" />,
    accent: "#7c6aff",
    accentBg: "rgba(124,106,255,0.08)",
  },
  {
    title: "Smart Traffic System",
    description: "An IoT-based congestion reduction system that optimizes traffic flow using real-time sensor data and adaptive signal control algorithms.",
    tech: ["IoT", "Python", "Data Analytics", "Hardware Integration"],
    github: "https://github.com/arpitthakor28",
    type: "IoT Project",
    icon: <Cpu className="w-5 h-5" />,
    accent: "#2ec4b6",
    accentBg: "rgba(46,196,182,0.08)",
  },
  {
    title: "SIH-2025: Health Monitor",
    description: "Smart community health monitoring system designed to detect and track water-borne diseases using real-time data pipelines and visualization.",
    tech: ["Web Stack", "Data Visualization", "API Integration"],
    github: "https://github.com/arpitthakor28",
    type: "Health Analytics",
    icon: <Activity className="w-5 h-5" />,
    accent: "#d45c8a",
    accentBg: "rgba(212,92,138,0.08)",
  },
];



function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 200, damping: 28 });
  const springY = useSpring(rotY, { stiffness: 200, damping: 28 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rotX.set((-y / rect.height) * 10);
    rotY.set((x / rect.width) * 10);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-3xl overflow-hidden transition-all duration-500 h-full relative hover:-translate-y-2 hover:scale-[1.01] group"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformPerspective: 800,
          boxShadow: hovered
            ? `0 0 40px ${project.accent}30, 0 20px 60px rgba(0,0,0,0.3)`
            : "0 0 30px rgba(182,98,75,0.07)",
        }}
      >

        {/* Top-edge gradient reveal */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${project.accent}, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div className="flex flex-col items-center text-center h-full relative z-10" style={{ padding: "2.5rem 2rem" }}>
          <div className="flex justify-center items-center gap-4 mb-6 w-full relative">
            <div className="absolute right-0 top-0 flex gap-3">
              {project.github && (

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div
            className="p-4 rounded-3xl transition-colors duration-300 mb-6"
            style={{
              background: hovered ? project.accentBg : "rgba(255,255,255,0.04)",
              color: project.accent,
            }}
          >
            {project.icon}
          </div>

          <span
            className="font-dm-mono text-xs font-semibold uppercase tracking-widest mb-4 block"
            style={{ color: project.accent }}
          >
            {project.type}
          </span>
          <h3
            className="font-syne text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300"
            style={{ color: hovered ? project.accent : "white" }}
          >
            {project.title}
          </h3>
          <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-auto pt-8">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="font-dm-mono px-3 py-1 rounded-lg text-xs font-medium text-slate-300 border border-white/5 transition-colors duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: hovered ? `${project.accent}30` : "rgba(255,255,255,0.05)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-[clamp(1.5rem,5vw,6rem)] bg-[#080808]">
      <div className="w-full">
        <motion.div


          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div>
            <span className="font-dm-mono text-xs uppercase tracking-widest text-accent-brick border border-accent-brick/20 px-4 py-1.5 rounded-full inline-block mb-4">
              Portfolio
            </span>
            <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-xl">
              A selection of my recent work across Web, Android, and IoT domains.
            </p>
          </div>
          <a
            href="https://github.com/arpitthakor28"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-brick flex items-center gap-2 mt-6 md:mt-0 hover:underline font-semibold font-syne"
          >
            View all on GitHub
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

