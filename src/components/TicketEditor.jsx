import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trash, Save, RefreshCw, AlertCircle } from 'lucide-react';
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
  canSave
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-white p-6 space-y-6">
      {/* Customer Message Section */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans block">
          Customer Message
        </label>
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => onChangeMessage(e.target.value)}
            placeholder="Paste customer message here..."
            className="w-full min-h-[140px] max-h-[280px] p-4 text-sm text-slate-800 border border-slate-200 rounded-2xl bg-slate-50/50 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 transition-all font-sans leading-relaxed resize-y"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Error / Fallback Alert Notification */}
          <div>
            {error && (
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{error}</span>
              </div>
            )}
            {!error && isFallbackUsed && (
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600">
                <AlertCircle className="h-3.5 w-3.5 animate-bounce" />
                <span>AI unavailable. Fallback keyword analysis applied.</span>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || !message.trim()}
            onClick={onAnalyze}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Analyze with AI
          </motion.button>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Analysis Results & Draft Reply */}
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        analysis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Metric Cards (Category, Priority, Sentiment) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Category Card */}
              {(() => {
                const catStyles = getCategoryStyles(analysis.category);
                const Icon = catStyles.icon;
                return (
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl hover:border-slate-300 transition-colors shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-sans">
                      Category
                    </span>
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg border ${catStyles.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 font-sans">
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
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl hover:border-slate-300 transition-colors shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-sans">
                      Priority
                    </span>
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg border ${prioStyles.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 font-sans">
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
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl hover:border-slate-300 transition-colors shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-sans">
                      Sentiment
                    </span>
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg border ${sentStyles.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 font-sans">
                        {analysis.sentiment}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* AI Reply Section */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans block">
                AI Suggested Reply
              </label>
              <textarea
                value={reply}
                onChange={(e) => onChangeReply(e.target.value)}
                className="w-full min-h-[220px] p-4 text-sm text-slate-800 border border-slate-200 rounded-2xl bg-white hover:border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 transition-all font-sans leading-relaxed resize-y"
              />
            </div>

            {/* Save & Clear Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClear}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Trash className="h-4 w-4" />
                Clear
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!canSave}
                onClick={onSave}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-sm transition-colors cursor-pointer"
              >
                <Save className="h-4 w-4" />
                Save Conversation
              </motion.button>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
}
