"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import projects from "@/data/projects.json";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen relative hero-glow"
      >
        <div className="mb-16">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">All My Projects</h1>
          <p className="text-outline text-lg max-w-2xl">
            A comprehensive collection of my web development projects, full-stack applications, and experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="glass group rounded-2xl overflow-hidden flex flex-col h-full border border-black/10 dark:border-white/10 shadow-lg"
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
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={`px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-wider ${project.tagColor}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto space-y-3">
                  {/* View Details Link */}
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
                        GitHub Client
                      </button>
                    </a>

                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <button className="w-full bg-secondary text-on-secondary-container py-2 rounded-lg font-label-caps text-[11px] font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        Live Site
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
