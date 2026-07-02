import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trash, Save, AlertCircle, PanelLeftOpen } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader';
import { getCategoryStyles, getPriorityStyles, getSentimentStyles } from '../utils/badgeStyles';

export default function TicketEditor({
  message,
  onChangeMessage,
  onAnalyze,
  analysis,
  isLoading,
  error,
  isFallbackUsed,
  reply,
  onChangeReply,
  onSave,
  onClear,
  canSave,
  isSidebarOpen,
  onToggleSidebar
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC] dark:bg-slate-950/20 p-6 space-y-6 transition-colors duration-300 relative">
      {/* Subtle radial glows in background */}
      <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] bg-gradient-to-br from-[#4F7CFF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-gradient-to-tr from-[#4F7CFF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Customer Message Section inside Premium Card */}
      <div className="premium-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          {/* Sidebar expand button when closed */}
          {!isSidebarOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-900 shadow-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
              title="Open history sidebar"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </motion.button>
          )}
          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans block">
            Customer Message
          </label>
        </div>
        
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => onChangeMessage(e.target.value)}
            placeholder="Paste customer message here..."
            className="w-full min-h-[145px] max-h-[280px] p-4 text-sm premium-input leading-relaxed resize-y shadow-xs"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Error alerts */}
          <div>
            {error && (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/5 px-2.5 py-1 rounded-lg border border-rose-500/10">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
            {!error && isFallbackUsed && (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/10">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>AI offline. Fallback classifier applied.</span>
              </div>
            )}
          </div>

          {/* Analyze Button with visual styling */}
          <button
            disabled={isLoading || !message.trim()}
            onClick={onAnalyze}
            className="premium-btn-primary px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 disabled:bg-slate-100 dark:disabled:bg-white/5 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Analyze with AI
          </button>
        </div>
      </div>

      {/* Analysis Results & Draft Reply */}
      {isLoading ? (
        <div className="premium-card p-6">
          <SkeletonLoader />
        </div>
      ) : analysis ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Metric Cards (Category, Priority, Sentiment) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category Card */}
            {(() => {
              const catStyles = getCategoryStyles(analysis.category);
              const Icon = catStyles.icon;
              return (
                <div className="result-card p-4">
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3 font-sans">
                    Category
                  </span>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-full bg-[#EAF2FF] text-[#4F7CFF] flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 font-sans">
                      {analysis.category}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Priority Card */}
            {(() => {
              const prioStyles = getPriorityStyles(analysis.priority);
              const Icon = prioStyles.icon;
              return (
                <div className="result-card p-4">
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3 font-sans">
                    Priority
                  </span>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-full bg-[#EAF2FF] text-[#4F7CFF] flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 font-sans">
                      {analysis.priority}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Sentiment Card */}
            {(() => {
              const sentStyles = getSentimentStyles(analysis.sentiment);
              const Icon = sentStyles.icon;
              return (
                <div className="result-card p-4">
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3 font-sans">
                    Sentiment
                  </span>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-full bg-[#EAF2FF] text-[#4F7CFF] flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 font-sans">
                      {analysis.sentiment}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* AI Reply Section inside Premium Card */}
          <div className="premium-card p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans block">
                AI Suggested Reply
              </label>
              <textarea
                value={reply}
                onChange={(e) => onChangeReply(e.target.value)}
                className="w-full min-h-[220px] p-4 text-sm premium-input leading-relaxed resize-y shadow-xs"
              />
            </div>

            {/* Save & Clear Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClear}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                Clear
              </button>
              
              <button
                disabled={!canSave}
                onClick={onSave}
                className="premium-btn-primary px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 disabled:bg-slate-100 dark:disabled:bg-white/5 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
              >
                <Save className="h-4 w-4" />
                Save Conversation
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Dynamic Empty State inside a Premium Card */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-12 flex flex-col items-center justify-center text-center space-y-4"
        >
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Simple gradient circles illustration */}
            <div className="absolute w-20 h-20 bg-gradient-to-tr from-[#5B7CFF]/10 to-[#7BA7FF]/10 rounded-full blur-xs" />
            <div className="absolute w-12 h-12 bg-gradient-to-br from-[#EAF2FF] to-[#EEF4FF] dark:from-slate-900 dark:to-slate-800 rounded-full flex items-center justify-center border border-slate-100 dark:border-white/5 shadow-sm">
              <Sparkles className="h-5 w-5 text-[#4F7CFF]" />
            </div>
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 tracking-tight">Awaiting Ticket Analysis</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
              Enter a customer message above and request AI analysis to populate ticket categories, priority parameters, and reply templates.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
