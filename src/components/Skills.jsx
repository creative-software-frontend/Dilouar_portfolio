"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaCode, FaServer, FaTools, FaTerminal } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { initialSkillCategories } from "@/data/skillsData";

const iconMap = {
  FaCode,
  FaServer,
  FaTools,
  FaTerminal,
};

export default function Skills() {
  const containerRef = useRef(null);
  const [categories, setCategories] = useState(initialSkillCategories);
  const [statsData, setStatsData] = useState({
    github: {
      username: "arRahat129",
      totalRepos: 18,
      languages: [
        { name: "JavaScript", percentage: 42, color: "#f7df1e" },
        { name: "TypeScript", percentage: 28, color: "#3178c6" },
        { name: "HTML", percentage: 18, color: "#e34f26" },
        { name: "CSS", percentage: 12, color: "#1572b6" },
      ],
    },
    leetcode: {
      username: "dilouarbd",
      enabled: true,
      totalSolved: 125,
      easySolved: 65,
      mediumSolved: 50,
      hardSolved: 10,
      acceptanceRate: "68.4%",
      totalSubmissions: 240,
    },
    codeforces: { enabled: false },
    hackerrank: { enabled: false },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStatsData((prev) => ({
            ...prev,
            ...data,
          }));
          if (data.skillCategories) {
            setCategories(data.skillCategories);
          }
        }
      } catch (e) {
        console.error("Failed to load dynamic stats", e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  useGSAP(() => {
    gsap.from(".skill-bar-fill", {
      width: "0%",
      duration: 1.2,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden" id="skills">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 glass rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/20"
        >
          Technical Expertise
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="font-headline-lg text-headline-lg text-on-surface mt-4 mb-4"
        >
          Skills & Live Platform Stats
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-outline text-base md:text-lg"
        >
          Graphical overview of technical skills alongside live metrics from GitHub and LeetCode.
        </motion.p>
      </div>

      {/* Categorized Skills Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {categories.map((cat, idx) => {
          const IconComp = iconMap[cat.iconName] || cat.icon || FaCode;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                    <IconComp className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {cat.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex justify-between text-sm font-semibold mb-1">
                        <span className="text-slate-800 dark:text-slate-200">{skill.name}</span>
                        <span className="text-outline">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
                        <div
                          className="skill-bar-fill h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Stats Header */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 border-t border-black/10 dark:border-white/10 pt-16">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
            <span className="material-symbols-outlined text-indigo-400">insights</span> Live Developer Stats
          </h3>
          <p className="text-outline text-sm">Dynamically pulled from public developer API endpoints.</p>
        </div>
      </div>

      {/* Platform Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* GitHub Stats Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-xl font-bold">
                GH
              </span>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">GitHub Language Usage</h4>
                <a
                  href={`https://github.com/${statsData.github.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:underline"
                >
                  @{statsData.github.username}
                </a>
              </div>
            </div>
            <span className="px-3 py-1 glass rounded-full text-xs font-bold text-slate-900 dark:text-white">
              {statsData.github.totalRepos} Public Repos
            </span>
          </div>

          {/* Languages Visual Progress Bars */}
          <div className="space-y-4">
            {statsData.github.languages.map((lang, lIdx) => (
              <div key={lIdx}>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }}></span>
                    {lang.name}
                  </span>
                  <span className="text-outline">{lang.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* LeetCode Problem Solving Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-xl font-bold">
                LC
              </span>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">LeetCode Metrics</h4>
                <a
                  href={`https://leetcode.com/u/${statsData.leetcode.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:underline"
                >
                  @{statsData.leetcode.username}
                </a>
              </div>
            </div>
            <span className="px-3 py-1 glass rounded-full text-xs font-bold text-amber-500 border border-amber-500/20">
              {statsData.leetcode.totalSolved} Solved
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5 text-center">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {statsData.leetcode.totalSolved}
              </div>
              <div className="text-xs text-outline font-medium">Problems Solved</div>
            </div>
            <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5 text-center">
              <div className="text-2xl font-extrabold text-emerald-500">
                {statsData.leetcode.acceptanceRate}
              </div>
              <div className="text-xs text-outline font-medium">Submission Accuracy</div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-emerald-600 dark:text-emerald-400">
              <div>Easy</div>
              <div className="text-base font-extrabold">{statsData.leetcode.easySolved}</div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-amber-600 dark:text-amber-400">
              <div>Medium</div>
              <div className="text-base font-extrabold">{statsData.leetcode.mediumSolved}</div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl text-rose-600 dark:text-rose-400">
              <div>Hard</div>
              <div className="text-base font-extrabold">{statsData.leetcode.hardSolved}</div>
            </div>
          </div>
        </motion.div>

        {/* 
          =============================================================================
          FUTURE PLATFORMS (Codeforces, HackerRank, etc.)
          You can enable these anytime by uncommenting the blocks below or toggling
          enabled: true in src/data/statsConfig.js!
          =============================================================================
          
          {statsData.codeforces.enabled && (
            <motion.div className="glass p-6 rounded-3xl border border-black/10 dark:border-white/10">
              <h4>Codeforces Stats</h4>
              <p>Rating: {statsData.codeforces.rating}</p>
            </motion.div>
          )}

          {statsData.hackerrank.enabled && (
            <motion.div className="glass p-6 rounded-3xl border border-black/10 dark:border-white/10">
              <h4>HackerRank Stats</h4>
              <p>Badges: {statsData.hackerrank.badges}</p>
            </motion.div>
          )}
        */}
      </div>
    </section>
  );
}
