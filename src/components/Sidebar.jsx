import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Search, Calendar, PanelLeftClose } from 'lucide-react';
import { getCategoryStyles, getPriorityStyles, getSentimentStyles } from '../utils/badgeStyles';

export default function Sidebar({ 
  conversations, 
  onSelectConversation, 
  onDeleteConversation, 
  activeId,
  isOpen,
  onToggleSidebar
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => {
    const term = searchTerm.toLowerCase();
    return (
      conv.message.toLowerCase().includes(term) ||
      conv.category.toLowerCase().includes(term) ||
      conv.priority.toLowerCase().includes(term) ||
      conv.sentiment.toLowerCase().includes(term)
    );
  });

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const getTruncatedMessage = (msg) => {
    if (!msg) return '';
    return msg.length > 60 ? msg.substring(0, 60) + '...' : msg;
  };

  return (
    <motion.div
      animate={{ 
        width: isOpen ? 'var(--sidebar-width, 350px)' : '0px',
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-[calc(100vh-73px)] shrink-0 overflow-hidden border-r border-slate-200/80 dark:border-white/5 flex flex-col bg-gradient-to-b from-white to-[#F8FBFF] dark:from-slate-900 dark:to-slate-950 shadow-[4px_0_24px_rgba(79,124,255,0.02)]"
      style={{
        '--sidebar-width': '350px'
      }}
    >
      <div className="w-[350px] flex flex-col h-full">
        {/* Header and Search */}
        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans">
            Conversation History ({filteredConversations.length})
          </h2>
          
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        <div className="p-3 border-b border-slate-100 dark:border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm premium-input focus:ring-1 focus:ring-[#4F7CFF]/25 font-sans"
            />
          </div>
        </div>

        {/* History Items List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          <AnimatePresence initial={false}>
            {filteredConversations.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 px-4"
              >
                <p className="text-sm text-slate-400 dark:text-slate-500">No conversations.</p>
              </motion.div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = activeId === conv.id;
                const catInfo = getCategoryStyles(conv.category);
                const prioInfo = getPriorityStyles(conv.priority);
                const sentInfo = getSentimentStyles(conv.sentiment);

                const CategoryIcon = catInfo.icon;
                const PriorityIcon = prioInfo.icon;
                const SentimentIcon = sentInfo.icon;

                return (
                  <motion.div
                    key={conv.id}
                    layoutId={`card-${conv.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => onSelectConversation(conv)}
                    className={`group relative p-4 rounded-2xl border cursor-pointer transition-all duration-250 ${
                      isActive 
                        ? 'border-[#4F7CFF] dark:border-indigo-500 bg-[#EEF4FF] dark:bg-indigo-500/10 shadow-sm' 
                        : 'border-slate-200/80 dark:border-white/5 bg-white dark:bg-slate-900/40 hover:border-[#4F7CFF]/50 hover:bg-[#EEF4FF]/20 hover:shadow-xs'
                    }`}
                  >
                    {/* Badges line with circular wrapped icons */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        <span className="p-0.5 rounded-full bg-[#EAF2FF] dark:bg-indigo-950 text-[#4F7CFF] dark:text-indigo-400 flex items-center justify-center">
                          <CategoryIcon className="h-2.5 w-2.5" />
                        </span>
                        {conv.category}
                      </span>

                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        <span className="p-0.5 rounded-full bg-[#EAF2FF] dark:bg-indigo-950 text-[#4F7CFF] dark:text-indigo-400 flex items-center justify-center">
                          <PriorityIcon className="h-2.5 w-2.5" />
                        </span>
                        {conv.priority}
                      </span>

                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        <span className="p-0.5 rounded-full bg-[#EAF2FF] dark:bg-indigo-950 text-[#4F7CFF] dark:text-indigo-400 flex items-center justify-center">
                          <SentimentIcon className="h-2.5 w-2.5" />
                        </span>
                        {conv.sentiment}
                      </span>
                    </div>

                    {/* Message snippet */}
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-2 mb-3 leading-relaxed font-sans">
                      {getTruncatedMessage(conv.message)}
                    </p>

                    {/* Date and Delete Action */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(conv.timestamp)}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conv.id);
                        }}
                        className="p-1 rounded-md text-slate-400 dark:text-slate-500 hover:bg-slate-200/50 dark:hover:bg-white/5 hover:text-rose-600 dark:hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
