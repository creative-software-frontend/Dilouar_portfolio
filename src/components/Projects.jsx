"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import allProjects from "@/data/projects.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// =============================================================================
// FEATURED PROJECTS SELECTION BY ID
// Specify which project IDs you want to display in the Featured Projects section!
// Initial setting: "plant-companion" only.
// To feature more projects, simply add their ID strings to this array below:
// =============================================================================
const featuredProjectIds = [
  "plant-companion",
  "digi-mart",
  "prompt-world",
  "pet-is-family",
  // "tile-canvas",     // <-- Uncomment or add ID to feature Tile Canvas
];

export default function Projects() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  // Filter projects by featured IDs or fallback to featured flag
  const displayedProjects = allProjects.filter((p) =>
    featuredProjectIds.includes(p.id)
  );

  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        }
      });
    }

    if (gridRef.current) {
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden" id="projects">
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Featured Projects</h2>
          <p className="text-outline">Crafted with precision and performance in mind.</p>
        </div>
        <Link href="/projects">
          <button className="font-label-caps text-label-caps text-secondary flex items-center gap-2 group hover:text-secondary-fixed transition-colors">
            VIEW ALL WORK ({allProjects.length}) <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
          </button>
        </Link>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project) => (
          <div key={project.id} className="h-full">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass group rounded-2xl overflow-hidden flex flex-col h-full border border-black/10 dark:border-white/10"
            >
              <div className="h-48 overflow-hidden relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  src={project.image}
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{project.title}</h3>
                <p className="text-outline text-sm mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 5).map((tag, tagIndex) => (
                    <span key={tagIndex} className={`px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-wider ${project.tagColor}`}>
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="px-2 py-1 glass rounded-full text-[10px] text-outline font-bold">
                      +{project.tags.length - 5}
                    </span>
                  )}
                </div>

                <div className="mt-auto space-y-3">
                  {/* View Details Button */}
                  <Link href={`/projects/${project.id}`} className="block w-full">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95">
                      <span className="material-symbols-outlined text-base">info</span>
                      View More / Details
                    </button>
                  </Link>

                  <div className="flex gap-3">
                    <a href={project.githubClient} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <button className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 py-2 rounded-lg font-label-caps text-[11px] hover:bg-black/10 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-colors flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">code</span>
                        GitHub
                      </button>
                    </a>

                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <button className="w-full bg-secondary text-on-secondary-container py-2 rounded-lg font-label-caps text-[11px] font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        Live Demo
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
