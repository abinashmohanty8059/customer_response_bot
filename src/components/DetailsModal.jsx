import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowUpRight, Trash2 } from 'lucide-react';
import { getCategoryStyles, getPriorityStyles, getSentimentStyles } from '../utils/badgeStyles';
import { formatModalTime } from '../utils/time';

export default function DetailsModal({
  conversation,
  onClose,
  onLoadIntoWorkspace,
  onDelete
}) {
  // Prevent background scrolling while the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Listen to Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!conversation) return null;

  const catInfo = getCategoryStyles(conversation.category);
  const prioInfo = getPriorityStyles(conversation.priority);
  const sentInfo = getSentimentStyles(conversation.sentiment);

  const CategoryIcon = catInfo.icon;
  const PriorityIcon = prioInfo.icon;
  const SentimentIcon = sentInfo.icon;

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      onDelete(conversation.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay backdrop with fade effect and slight blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/35 backdrop-blur-xs"
      />

      {/* Modal panel card with scale and fade effect */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[850px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_12px_40px_rgba(79,124,255,0.12)] border border-slate-100 dark:border-white/5 flex flex-col overflow-hidden z-10 font-sans"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            Conversation Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Customer Message */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Customer Message
            </label>
            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-white/5 p-4 rounded-xl text-sm text-slate-800 dark:text-slate-200 leading-relaxed min-h-[100px] max-h-[220px] overflow-y-auto font-sans whitespace-pre-wrap break-words">
              {conversation.customerMessage || conversation.message || ''}
            </div>
          </div>

          {/* Badges Container */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category */}
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-white dark:bg-slate-800 ${catInfo.color}`}>
              <span className="p-0.5 rounded-full bg-[#EAF2FF] dark:bg-indigo-950 text-[#4F7CFF] dark:text-indigo-400 flex items-center justify-center">
                <CategoryIcon className="h-3.5 w-3.5" />
              </span>
              Category: {conversation.category}
            </span>

            {/* Priority */}
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${prioInfo.color}`}>
              <span className="p-0.5 rounded-full bg-[#EAF2FF] dark:bg-indigo-950 text-[#4F7CFF] dark:text-indigo-400 flex items-center justify-center">
                <PriorityIcon className="h-3.5 w-3.5" />
              </span>
              Priority: {conversation.priority}
            </span>

            {/* Sentiment */}
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${sentInfo.color}`}>
              <span className="p-0.5 rounded-full bg-[#EAF2FF] dark:bg-indigo-950 text-[#4F7CFF] dark:text-indigo-400 flex items-center justify-center">
                <SentimentIcon className="h-3.5 w-3.5" />
              </span>
              Sentiment: {conversation.sentiment}
            </span>
          </div>

          {/* AI Suggested Reply */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              AI Suggested Reply
            </label>
            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-white/5 p-4 rounded-xl text-sm text-slate-800 dark:text-slate-200 leading-relaxed max-h-[220px] overflow-y-auto font-sans whitespace-pre-wrap">
              {conversation.reply}
            </div>
          </div>

          {/* Timestamp Footer */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <Calendar className="h-4 w-4 text-slate-300 dark:text-slate-600" />
            <span>{formatModalTime(conversation.createdAt)}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/30 flex flex-wrap items-center justify-between gap-3">
          {/* Delete Action (Red outlines) */}
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-rose-200 dark:border-rose-900/30 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/5 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>

          <div className="flex items-center gap-3">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              Close
            </button>
            {/* Primary Action Button (Gradient) */}
            <button
              onClick={() => onLoadIntoWorkspace(conversation)}
              className="premium-btn-primary px-5 py-2 text-sm font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <ArrowUpRight className="h-4 w-4" />
              Load into Workspace
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
