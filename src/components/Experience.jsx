"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const education = [
  {
    institution: "P.P. Savani University",
    degree: "B.Tech IT&E Engineering",
    period: "2023 – Present",
    status: "Ongoing",
    description: "Focusing on Information Technology and Engineering, developing a strong foundation in software development, algorithms, and full-stack engineering.",
    color: "#9b59b6",       // purple
    bgColor: "rgba(155,89,182,0.12)",
  },
  {
    institution: "Shree Vasishtha Vidhyalaya",
    degree: "Higher Secondary (Class XII)",
    period: "2021 – 2023",
    description: "Completed with a focus on Science and Mathematical sciences, building analytical thinking and problem-solving fundamentals.",
    color: "#d45c8a",       // pink
    bgColor: "rgba(212,92,138,0.10)",
  },
  {
    institution: "Shree Vasishtha Vidhyalaya",
    degree: "Secondary (Class X)",
    period: "2019 – 2021",
    description: "Foundation in core academic subjects with a consistent academic record.",
    color: "#2ec4b6",       // teal
    bgColor: "rgba(46,196,182,0.10)",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-[clamp(1.5rem,5vw,6rem)] bg-[#080808]">
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-dm-mono text-xs uppercase tracking-widest text-accent-brick border border-accent-brick/20 px-4 py-1.5 rounded-full inline-block mb-4">
            Education
          </span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4">
            Academic <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            My educational background and continuous learning path.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-brick/30 via-white/10 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className={`flex-1 ml-14 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                  <div
                    className="glass p-7 rounded-3xl group transition-all duration-300"
                    style={{
                      boxShadow: `0 0 28px ${item.color}18`,
                      borderColor: `${item.color}20`,
                    }}
                  >
                    {/* Period badge */}
                    <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      <Calendar className="w-3.5 h-3.5" style={{ color: item.color }} />
                      <span
                        className="font-dm-mono text-xs font-semibold tracking-wider"
                        style={{ color: item.color }}
                      >
                        {item.period}
                      </span>
                      {item.status && (
                        <span
                          className="text-[10px] font-dm-mono px-2 py-0.5 rounded-full"
                          style={{ background: item.bgColor, color: item.color }}
                        >
                          {item.status}
                        </span>
                      )}
                    </div>

                    <h3 className="font-syne text-xl md:text-2xl font-bold mb-1.5 text-white">
                      {item.degree}
                    </h3>
                    <p className="font-medium mb-3 text-sm" style={{ color: item.color }}>
                      {item.institution}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot — positioned on the line */}
                <div
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 flex-shrink-0 transition-transform hover:scale-110"
                  style={{
                    background: item.bgColor,
                    border: `2px solid ${item.color}60`,
                    boxShadow: `0 0 20px ${item.color}40`,
                  }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color: item.color }} />
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

