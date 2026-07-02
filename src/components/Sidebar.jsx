import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Search, Calendar, ChevronRight } from 'lucide-react';
import { getCategoryStyles, getPriorityStyles, getSentimentStyles } from '../utils/badgeStyles';

export default function Sidebar({ 
  conversations, 
  onSelectConversation, 
  onDeleteConversation, 
  activeId 
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
    <aside className="w-full md:w-80 lg:w-96 border-r border-slate-200 bg-slate-50 flex flex-col h-[calc(100vh-73px)] shrink-0">
      {/* Header and Search */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Conversation History ({filteredConversations.length})
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 transition-all font-sans"
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
              <p className="text-sm text-slate-400">No conversations found.</p>
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
                  transition={{ duration: 0.2 }}
                  onClick={() => onSelectConversation(conv)}
                  className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 bg-white ${
                    isActive 
                      ? 'border-indigo-600 shadow-sm ring-1 ring-indigo-50' 
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Badges line */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    {/* Category Badge */}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${catInfo.color}`}>
                      <CategoryIcon className="h-3 w-3" />
                      {conv.category}
                    </span>

                    {/* Priority Badge */}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${prioInfo.color}`}>
                      <PriorityIcon className="h-3 w-3" />
                      {conv.priority}
                    </span>

                    {/* Sentiment Badge */}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${sentInfo.color}`}>
                      <SentimentIcon className="h-3 w-3" />
                      {conv.sentiment}
                    </span>
                  </div>

                  {/* Message snippet */}
                  <p className="text-sm font-medium text-slate-800 line-clamp-2 mb-3 leading-relaxed">
                    {getTruncatedMessage(conv.message)}
                  </p>

                  {/* Date and Delete Action */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(conv.timestamp)}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conv.id);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
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
    </aside>
  );
}
