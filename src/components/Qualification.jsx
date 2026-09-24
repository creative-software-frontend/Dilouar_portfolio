"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const educationData = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Premier University, Chittagong",
    period: "2020 - 2025",
    year: "2025",
    grade: "CGPA: 3.45 / 4.00",
    badge: "Graduation / Bachelor's",
    highlight: true,
    details: [
      "Specialized in Software Engineering, Web Technologies, Data Structures, & Algorithms.",
      "Completed undergraduate thesis and practical projects on full-stack web applications.",
      "Consistently maintained strong academic standing with a 3.45 CGPA."
    ],
    icon: "school",
    color: "from-indigo-500 to-purple-600"
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    group: "Science",
    institution: "Uttar Kattali Al-Haj Mostafa Hakim Degree College, Chittagong",
    period: "2017 - 2019",
    year: "2019",
    grade: "GPA: 3.58 / 5.00",
    badge: "Higher Secondary",
    highlight: false,
    details: [
      "Focused on Physics, Chemistry, Higher Mathematics, and Information Technology.",
      "Developed foundational logical analytical thinking and problem-solving skills."
    ],
    icon: "history_edu",
    color: "from-blue-500 to-cyan-500"
  },
  {
    degree: "Dakhil / SSC (Secondary School Certificate)",
    group: "Science",
    institution: "Chittagong Nesaria Kamil (M.A) Madrasah, Chittagong",
    period: "2015 - 2017",
    year: "2017",
    grade: "GPA: 4.78 / 5.00",
    badge: "Secondary Education",
    highlight: false,
    details: [
      "Achieved outstanding GPA 4.78 / 5.00 in Science stream.",
      "Built strong groundwork in Mathematics and General Sciences."
    ],
    icon: "menu_book",
    color: "from-emerald-500 to-teal-600"
  }
];

export default function Qualification() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden" id="qualification">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 glass rounded-full text-xs font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20"
        >
          Academic Journey
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="font-headline-lg text-headline-lg text-on-surface mt-4 mb-4"
        >
          Educational Qualifications
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-outline text-base md:text-lg"
        >
          A visual representation of my academic degree and educational achievements beyond HSC.
        </motion.p>
      </div>

      {/* Interactive Timeline Visual Cards */}
      <div ref={cardsRef} className="relative max-w-4xl mx-auto space-y-8">
        {/* Vertical Timeline Bar for desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500 -translate-x-1/2 rounded-full opacity-30"></div>

        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative glass p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl overflow-hidden ${
              edu.highlight ? "ring-2 ring-indigo-500/40 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10" : ""
            }`}
          >
            {/* Top Accent Gradient Pill */}
            <div className={`absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r ${edu.color}`}></div>

            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${edu.color} text-white shadow-lg shrink-0`}>
                  <span className="material-symbols-outlined text-3xl">{edu.icon}</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 glass rounded-full text-xs font-bold text-indigo-400 border border-indigo-500/20">
                      {edu.badge}
                    </span>
                    <span className="text-xs font-semibold text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">calendar_month</span> {edu.period}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 font-medium text-sm md:text-base mb-3 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-indigo-500 text-sm">location_on</span>
                    {edu.institution}
                  </p>
                </div>
              </div>

              {/* Grade Badge */}
              <div className="self-start md:self-auto bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 px-5 py-3 rounded-2xl text-center shrink-0">
                <div className="text-xs font-bold text-outline uppercase tracking-wider">Achievement</div>
                <div className="text-lg md:text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {edu.grade}
                </div>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="mt-6 pt-6 border-t border-black/10 dark:border-white/10 space-y-2 text-sm text-outline">
              {edu.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-indigo-400 text-sm mt-0.5">check_circle</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
