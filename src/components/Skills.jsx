"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Code2, Smartphone, Database, Wrench } from "lucide-react";

const allSkills = [
  "React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3",
  "Tailwind CSS", "Framer Motion", "Node.js", "Express", "REST APIs",
  "MongoDB", "Firebase", "Supabase", "SQL", "Android SDK", "Java",
  "Kotlin", "Git", "Maven", "Gradle", "MediaPipe", "Canvas API",
  "IoT", "Python", "Data Visualization",
];

const aboutSkillChips = [
  "Full Stack", "Android Dev", "UI/UX", "IoT", "Open Source", "Problem Solver",
];

const skillGroups = [
  {
    title: "Frontend",
    icon: <Code2 className="w-5 h-5 text-accent-brick" />,
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    accent: "accent-brick",
  },
  {
    title: "Backend",
    icon: <Wrench className="w-5 h-5 text-accent-warm" />,
    skills: ["Node.js", "Express", "REST APIs", "API Integration"],
    accent: "accent-warm",
  },
  {
    title: "Database",
    icon: <Database className="w-5 h-5 text-accent-teal" />,
    skills: ["MongoDB", "Firebase", "Supabase", "SQL"],
    accent: "accent-teal",
  },
  {
    title: "Tools & Android",
    icon: <Smartphone className="w-5 h-5 text-accent-pink" />,
    skills: ["Android SDK", "Java", "Kotlin", "Git", "Maven", "Gradle"],
    accent: "accent-pink",
  },
];

function SkillTicker() {
  // Duplicate items so seamless loop works
  const doubled = [...allSkills, ...allSkills];
  return (
    <div className="relative overflow-hidden py-3">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="ticker-track">
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="font-dm-mono text-sm px-5 py-2 rounded-full glass border border-white/8 text-slate-300 whitespace-nowrap hover:border-accent-brick/40 hover:text-accent-brick transition-colors flex-shrink-0"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <>
      {/* ── About Section ── */}
      <section id="about" className="py-32 px-[clamp(1.5rem,5vw,6rem)] bg-[#060606]">
        <div className="w-full">
          <motion.div

            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-dm-mono text-xs uppercase tracking-widest text-accent-brick border border-accent-brick/20 px-4 py-1.5 rounded-full inline-block mb-4">
              About Me
            </span>
            <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4">
              Who I <span className="text-gradient">Am</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Mini profile card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl p-8 flex flex-col items-center text-center gap-5 box-shadow-brick"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-brick/30 shadow-lg">
                <img src="./assets/profile.jpg" alt="Arpitsinh" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-syne text-xl font-bold">Arpitsinh Thakor</h3>
                <p className="text-slate-400 text-sm mt-1 font-dm-mono">Full Stack · Android Dev</p>
              </div>

              {/* Availability badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-sage/10 border border-accent-sage/20 animate-pulse-avail">
                <CheckCircle2 className="w-4 h-4 text-accent-sage" />
                <span className="text-xs font-dm-mono font-semibold text-accent-sage">Available for Work</span>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 justify-center">
                {aboutSkillChips.map((chip) => (
                  <span key={chip} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/8 text-slate-300">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Bio text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 glass rounded-3xl p-8 md:p-10 box-shadow-brick"
            >
              <h3 className="font-syne text-2xl font-bold mb-4">
                Crafting Digital{" "}
                <span className="font-instrument text-accent-warm">Experiences</span>
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                I&apos;m a B.Tech IT&amp;E student at P.P. Savani University with a deep passion for building beautiful, fast, and functional digital products. I bridge the gap between design thinking and engineering excellence.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                From crafting gesture-controlled apps with AI-powered hand tracking to building community health monitoring systems for SIH-2025, I love tackling real-world problems with elegant code.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Projects Built", value: "5+" },
                  { label: "Tech Stack", value: "25+" },
                  { label: "Experience", value: "1+ Yr" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/3 rounded-2xl p-4 text-center border border-white/5">
                    <div className="font-syne text-2xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-1 font-dm-mono">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills Ticker ── */}
      <section id="skills" className="py-32 px-[clamp(1.5rem,5vw,6rem)] bg-[#050505] relative">
        {/* Top Gradient Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="w-full mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="text-gradient">Stack</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              A modern, battle-tested technology stack across web, mobile, and backend.
            </p>
          </motion.div>

          {/* Ticker */}
          <SkillTicker />

          {/* Skill groups grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {skillGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass p-8 rounded-3xl group hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-accent-brick/50 transition-all duration-300 box-shadow-brick flex flex-col items-center text-center relative overflow-hidden"
                style={{ padding: "2rem" }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent-brick/0 to-accent-brick/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col items-center gap-4 mb-5 relative z-10">
                  <div className="p-2 bg-white/5 rounded-xl group-hover:bg-accent-brick/10 transition-colors">
                    {group.icon}
                  </div>
                  <h3 className="font-syne text-lg font-bold text-white group-hover:text-accent-brick transition-colors">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="font-dm-mono px-3 py-1.5 bg-white/5 rounded-lg text-xs font-medium text-slate-300 border border-white/5 group-hover:border-accent-brick/20 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

