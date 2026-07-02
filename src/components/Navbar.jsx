import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Navbar({ isAiConnected }) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 text-white p-2 rounded-xl flex items-center justify-center">
          <Sparkles className="h-5 w-5" />
        </div>
        <h1 className="font-bold text-lg text-slate-900 tracking-tight m-0 p-0 font-sans">
          Customer Support AI
        </h1>
      </div>
      
      <div>
        {isAiConnected ? (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            AI Connected
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Offline Mode
          </span>
        )}
      </div>
    </header>
  );
}
