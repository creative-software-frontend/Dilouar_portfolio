"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../assets/logo.png";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hide navbar on scroll down, show on scroll up (unless mobile menu is open)
    if (previous !== undefined && latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 w-full z-50 px-4 md:px-6 transition-all duration-300"
    >
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-0" : ""
        }`}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center"
        >
          <Link href="/" className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter" onClick={closeMenu}>
            <Image src={logo} alt="Logo" width={100} height={100} className="w-[80px] h-auto md:w-[100px]" />
          </Link>
        </motion.div>

        {/* Desktop Centered Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:flex items-center gap-1 nav-glass px-4 py-2 rounded-full shadow-2xl"
        >
          <Link
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              pathname === "/" ? "nav-active text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            href="/#home"
          >
            <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 scale-90" data-icon="home">home</span> Home
          </Link>
          <a
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition-all"
            href="/#qualification"
          >
            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 scale-90" data-icon="school">school</span> Qualification
          </a>
          <a
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition-all"
            href="/#skills"
          >
            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 scale-90" data-icon="code">code</span> Skills
          </a>
          <a
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition-all"
            href="/#projects"
          >
            <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 scale-90" data-icon="work">work</span> Projects
          </a>
          <Link
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              pathname === "/projects" ? "nav-active text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            href="/projects"
          >
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 scale-90" data-icon="view_list">view_list</span> All Projects
          </Link>
          <a
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium transition-all"
            href="/#contact"
          >
            <span className="material-symbols-outlined text-pink-600 dark:text-pink-400 scale-90" data-icon="send">send</span> Say Hello
          </a>
        </motion.div>

        {/* Social Links & Mobile Hamburger Trigger */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/mohammad-ashikur-rahman-rahat/"
              className="w-9 h-9 flex items-center justify-center rounded-full nav-glass text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-lg active:scale-95 border border-black/5 dark:border-white/5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/arRahat129"
              className="w-9 h-9 flex items-center justify-center rounded-full nav-glass text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-lg active:scale-95 border border-black/5 dark:border-white/5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://x.com/A_R_Rahat"
              className="w-9 h-9 flex items-center justify-center rounded-full nav-glass text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-lg active:scale-95 border border-black/5 dark:border-white/5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitterX />
            </a>
          </div>

          {/* Hamburger Menu Toggle Button for md and sm screens */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full nav-glass text-slate-800 dark:text-white transition-all border border-black/10 dark:border-white/10 active:scale-95 shadow-lg"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </motion.div>
      </nav>

      {/* Mobile & Tablet Navigation Dropdown Menu (md & sm) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden max-w-6xl mx-auto mt-3 overflow-hidden rounded-3xl nav-glass border border-black/10 dark:border-white/10 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-2">
              <Link
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 font-medium transition-all"
                href="/#home"
              >
                <span className="material-symbols-outlined text-yellow-500">home</span>
                Home
              </Link>

              <a
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 font-medium transition-all"
                href="/#qualification"
              >
                <span className="material-symbols-outlined text-purple-400">school</span>
                Qualification
              </a>

              <a
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 font-medium transition-all"
                href="/#skills"
              >
                <span className="material-symbols-outlined text-emerald-400">code</span>
                Skills & Stats
              </a>

              <a
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 font-medium transition-all"
                href="/#projects"
              >
                <span className="material-symbols-outlined text-orange-400">work</span>
                Featured Projects
              </a>

              <Link
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 font-medium transition-all"
                href="/projects"
              >
                <span className="material-symbols-outlined text-blue-400">view_list</span>
                All Projects
              </Link>

              <a
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 font-medium transition-all"
                href="/#contact"
              >
                <span className="material-symbols-outlined text-pink-400">send</span>
                Say Hello
              </a>

              {/* Mobile Social Buttons */}
              <div className="flex items-center justify-around pt-4 mt-2 border-t border-black/10 dark:border-white/10 sm:hidden">
                <a
                  href="https://www.linkedin.com/in/mohammad-ashikur-rahman-rahat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <FaLinkedinIn className="text-base text-blue-500" /> LinkedIn
                </a>
                <a
                  href="https://github.com/arRahat129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <FaGithub className="text-base" /> GitHub
                </a>
                <a
                  href="https://x.com/A_R_Rahat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <BsTwitterX className="text-base" /> X
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
