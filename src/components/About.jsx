"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import Image from "next/image";
import image from '../assets/UpdatedImage.png';

import projectsData from "@/data/projects.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const [solvedCount, setSolvedCount] = useState(null);
  const [projectsCount, setProjectsCount] = useState(projectsData?.length || 7);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          if (data?.leetcode?.totalSolved !== undefined) {
            setSolvedCount(data.leetcode.totalSolved);
          }
        }
      } catch (e) {
        console.error("About stats fetch error:", e);
      }
    }
    fetchStats();
  }, []);

  useGSAP(() => {
    // Image reveal animation
    gsap.fromTo(
      imageRef.current,
      { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
      {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
        },
      }
    );

    // Text stagger reveal
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Stats stagger reveal (runs once)
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
          <Image
            ref={imageRef}
            alt="About Mohammad Ashikur Rahman"
            className="relative glass rounded-2xl w-full h-[400px] object-cover border border-black/10 dark:border-white/10"
            src={image}
          />
        </div>

        <div>
          <div ref={textRef}>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">About me</h2>
            <p className="font-body-md text-body-md text-outline mb-10 leading-relaxed">
              I am a Computer Science graduate and passionate web developer specializing in building full-stack web applications with React, Next.js, Node.js, and modern UI frameworks. I enjoy solving complex problems on LeetCode, writing clean maintainable code, and turning innovative ideas into dynamic digital experiences.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl border-t border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="text-secondary font-headline-md text-headline-md mb-1 font-bold">
                {solvedCount !== null ? `${solvedCount}+` : "..."}
              </div>
              <div className="text-xs font-label-caps text-outline uppercase tracking-widest">Problems Solved</div>
            </div>

            <div className="glass p-6 rounded-xl border-t border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="text-primary font-headline-md text-headline-md mb-1 font-bold">B.Sc. CSE</div>
              <div className="text-xs font-label-caps text-outline uppercase tracking-widest">Graduation (3.45)</div>
            </div>

            <div className="glass p-6 rounded-xl border-t border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="text-tertiary font-headline-md text-headline-md mb-1 font-bold">
                {projectsCount}+
              </div>
              <div className="text-xs font-label-caps text-outline uppercase tracking-widest">Projects Finished</div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/cv.pdf';
                link.download = 'Mohammad_Ashikur_Rahman_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="inline-flex items-center gap-3 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20 px-8 py-4 rounded-xl font-bold transition-all active:scale-95 group"
            >
              <span>Download Full CV</span>
              <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform" data-icon="download">download</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
