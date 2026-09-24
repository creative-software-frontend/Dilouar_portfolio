"use client";

import Image from "next/image";
import logo from "../assets/logo.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 w-full py-16 border-t border-black/5 dark:border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter">
            <Image src={logo} alt="Logo" width={100} height={100} />
          </div>
          <p className="font-sans text-sm tracking-wide text-slate-500 italic">© {new Date().getFullYear()} Mohammad Ashikur Rahman. Engineered for the future.</p>
        </div>

        <div className="flex items-center gap-8">
          <a className="text-slate-500 hover:text-indigo-400 transition-all font-sans text-sm tracking-wide" href="https://github.com/arRahat129" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-slate-500 hover:text-indigo-400 transition-all font-sans text-sm tracking-wide" href="https://www.linkedin.com/in/mohammad-ashikur-rahman-rahat/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-slate-500 hover:text-indigo-400 transition-all font-sans text-sm tracking-wide" href="https://x.com/A_R_Rahat" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a className="text-slate-500 hover:text-indigo-400 transition-all font-sans text-sm tracking-wide" href="mailto:rahashik129@gmail.com">Email</a>
        </div>

        <div className="opacity-70 hover:opacity-100 transition-opacity">
          <button
            onClick={scrollToTop}
            className="bg-black/5 dark:bg-white/5 p-3 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Scroll to top"
          >
            <span className="material-symbols-outlined text-indigo-500" data-icon="keyboard_arrow_up">keyboard_arrow_up</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
