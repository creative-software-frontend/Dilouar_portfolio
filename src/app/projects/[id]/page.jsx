"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import projects from "@/data/projects.json";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa6";

export default function ProjectDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-36 pb-24 text-center px-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-outline mb-8">The project ID "{id}" could not be found.</p>
          <Link href="/projects" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold">
            Back to All Projects
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen relative hero-glow"
      >
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:text-indigo-400 mb-8 group"
        >
          <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Back to Projects
        </Link>

        {/* Project Header Banner */}
        <div className="glass rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl mb-12">
          <div className="h-64 sm:h-96 w-full relative overflow-hidden bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="px-4 py-1.5 glass rounded-full text-xs font-bold text-indigo-300 border border-indigo-500/30 uppercase tracking-widest mb-3 inline-block">
                  Project Showcase
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white">{project.title}</h1>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={project.githubClient}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/60 hover:bg-black text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all border border-white/10 flex items-center gap-2"
                >
                  <FaGithub className="text-lg" /> Client Code
                </a>

                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-xl shadow-indigo-500/30"
                >
                  <span className="material-symbols-outlined text-lg">open_in_new</span> Live Demo
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-outline mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400 text-base">layers</span>
                Main Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 glass rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 border border-black/10 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">description</span>
                Overview & Description
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Challenges Faced */}
            <div className="bg-amber-500/5 dark:bg-amber-500/10 p-6 md:p-8 rounded-2xl border border-amber-500/20">
              <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span>
                Challenges Faced During Development
              </h3>
              <ul className="space-y-3">
                {project.challenges && project.challenges.length > 0 ? (
                  project.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-800 dark:text-slate-200 text-sm md:text-base">
                      <span className="material-symbols-outlined text-amber-500 text-lg mt-0.5 shrink-0">
                        bolt
                      </span>
                      <span>{challenge}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500 text-sm">No specific challenges listed.</li>
                )}
              </ul>
            </div>

            {/* Potential Improvements & Future Plans */}
            <div className="bg-indigo-500/5 dark:bg-indigo-500/10 p-6 md:p-8 rounded-2xl border border-indigo-500/20">
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">rocket_launch</span>
                Potential Improvements & Future Plans
              </h3>
              <ul className="space-y-3">
                {project.improvements && project.improvements.length > 0 ? (
                  project.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-800 dark:text-slate-200 text-sm md:text-base">
                      <span className="material-symbols-outlined text-indigo-400 text-lg mt-0.5 shrink-0">
                        trending_up
                      </span>
                      <span>{imp}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500 text-sm">No specific future plans listed.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
