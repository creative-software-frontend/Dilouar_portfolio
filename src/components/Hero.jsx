"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import image from '../assets/UpdatedImage.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  },
};

export default function Hero() {
  const roles = ["Problem Solver", "Web Developer", "Web Designer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [solvedCount, setSolvedCount] = useState(125);

  useEffect(() => {
    async function fetchLcStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          if (data?.leetcode?.totalSolved) {
            setSolvedCount(data.leetcode.totalSolved);
          }
        }
      } catch (e) {
        console.error("Hero LC stats fetch error:", e);
      }
    }
    fetchLcStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const ripple = document.createElement("div");
      ripple.className = "fixed pointer-events-none w-8 h-8 border-2 border-indigo-400 rounded-full z-50 animate-ping";
      ripple.style.left = `${e.clientX - 16}px`;
      ripple.style.top = `${e.clientY - 16}px`;
      document.body.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <section className="min-h-screen flex items-center px-6 md:px-12 pt-24 pb-12 max-w-7xl mx-auto" id="home">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10"
        >
          <motion.p variants={itemVariants} className="text-xl text-on-surface-variant font-medium mb-4">Hey, I'm</motion.p>
          <motion.h1 variants={itemVariants} className="font-headline-xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-extrabold text-on-surface mb-4 flex items-center gap-4">
            Mohammad  Dilouar Hossain
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 2, duration: 1.5 }}
              className="text-5xl inline-block origin-bottom-right"
            >
              👋
            </motion.span>
          </motion.h1>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-on-surface-variant mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-indigo-500"></span> I am a{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-indigo-400 inline-block"
              >
                {roles[currentRoleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.h2>

          <motion.div variants={itemVariants} className="space-y-2 mb-10 text-outline text-lg max-w-lg">
            <p className="flex items-center gap-2"><span className="text-lg">🚀</span> Turning ideas into <span className="text-slate-900 dark:text-white font-semibold">Stunning Websites</span> 💻</p>
            <p className="flex items-center gap-2">| Available for projects and collaborations 🌟</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-95 shadow-xl shadow-indigo-500/20 group overflow-hidden relative"
            >
              <span className="relative z-10">Say Hello</span>
              <span className="relative z-10 material-symbols-outlined text-2xl rotate-[-45deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" data-icon="send">send</span>
            </button>

            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/cv.pdf';
                link.download = 'Mohammad_Ashikur_Rahman_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex items-center gap-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 px-8 py-4 rounded-full text-slate-900 dark:text-white font-bold text-lg transition-all active:scale-95 group"
            >
              <span>Download CV</span>
              <span className="material-symbols-outlined text-2xl group-hover:translate-y-1 transition-transform" data-icon="download">download</span>
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 flex items-center gap-3 text-outline hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group w-fit"
            onClick={() => {
              document.getElementById('qualification')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="w-6 h-10 border-2 border-outline/50 rounded-full flex justify-center p-1">
              <span className="w-1 h-2 bg-outline rounded-full animate-bounce"></span>
            </span>
            <span className="text-sm font-medium flex items-center gap-1">Scroll Down <span className="material-symbols-outlined text-xs">arrow_downward</span></span>
          </motion.div>
        </motion.div>

        {/* Right Content: Profile and Dynamic Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="relative flex justify-center items-center"
        >
          {/* Profile Image with Ring */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-black/10 dark:border-white/10 flex items-center justify-center p-4">
            <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-[spin_20s_linear_infinite]"></div>
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-black/5 dark:border-white/5 bg-slate-100 dark:bg-slate-900 shadow-2xl relative z-10">
              <Image alt="Mohammad  Dilouar Hossain" className="w-full h-full object-cover" src={image} priority />
            </div>

            {/* Dynamic Problem Solving Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, type: "spring" }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="absolute -top-4 -right-8 md:-right-12 z-20 glass px-4 md:px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border border-black/10 dark:border-white/10"
            >
              <span className="material-symbols-outlined text-indigo-500 dark:text-indigo-400" data-icon="task_alt">task_alt</span>
              <div>
                <div className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-none">{solvedCount}+</div>
                <div className="text-[10px] text-outline uppercase tracking-wider">Problem Solved</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, type: "spring" }}
              whileHover={{ x: -5, scale: 1.05 }}
              className="absolute top-1/2 -left-8 md:-left-16 -translate-y-1/2 z-20 glass px-4 md:px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border border-black/10 dark:border-white/10"
            >
              <span className="material-symbols-outlined text-indigo-500 dark:text-indigo-400" data-icon="work_history">work_history</span>
              <div>
                <div className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-none">B.Sc. CSE</div>
                <div className="text-[10px] text-outline uppercase tracking-wider">Education</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, type: "spring" }}
              whileHover={{ y: 5, scale: 1.05 }}
              className="absolute -bottom-6 right-0 z-20 glass px-4 md:px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border border-black/10 dark:border-white/10"
            >
              <span className="material-symbols-outlined text-indigo-500 dark:text-indigo-400" data-icon="rocket_launch">rocket_launch</span>
              <div>
                <div className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-none">7+</div>
                <div className="text-[10px] text-outline uppercase tracking-wider">Projects Completed</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
