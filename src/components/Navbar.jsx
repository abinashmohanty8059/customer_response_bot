import React from 'react';
import { Sparkles, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ isAiConnected, isDarkMode, onToggleTheme }) {
  return (
    <header className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5 shadow-[0_4px_20px_rgba(79,124,255,0.05)] transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-[#5B7CFF] to-[#7BA7FF] text-white p-2 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/10">
          <Sparkles className="h-5 w-5" />
        </div>
        <h1 className="font-semibold text-lg text-slate-900 dark:text-white tracking-tight m-0 p-0 font-sans">
          Customer Support AI
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Connection status badge with gradient background */}
        <div>
          {isAiConnected ? (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-[#EAF6FF] to-[#F3FFFC] dark:from-slate-900/60 dark:to-slate-800/60 text-slate-700 dark:text-slate-300 border border-[rgba(79,124,255,0.12)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              AI Connected
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/5">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Offline Mode
            </span>
          )}
        </div>

        {/* Theme Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleTheme}
          className="p-2 rounded-xl border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.button>
      </div>
    </header>
  );
}
