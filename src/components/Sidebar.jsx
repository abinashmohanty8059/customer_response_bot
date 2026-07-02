import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Search, Calendar, PanelLeftClose, Trash } from 'lucide-react';
import { getCategoryStyles, getPriorityStyles, getSentimentStyles } from '../utils/badgeStyles';
import { formatRelativeTime } from '../utils/time';

export default function Sidebar({ 
  conversations, 
  onSelectConversation, 
  onDeleteConversation, 
  onDeleteAll,
  activeId,
  isOpen,
  onToggleSidebar
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => {
    const term = searchTerm.toLowerCase();
    const messageText = conv.customerMessage || '';
    const categoryText = conv.category || '';
    const priorityText = conv.priority || '';
    const sentimentText = conv.sentiment || '';

    return (
      messageText.toLowerCase().includes(term) ||
      categoryText.toLowerCase().includes(term) ||
      priorityText.toLowerCase().includes(term) ||
      sentimentText.toLowerCase().includes(term)
    );
  });

  const handleDeleteAllClick = () => {
    if (window.confirm("Are you sure you want to delete all saved conversations? This action cannot be undone.")) {
      onDeleteAll();
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
            History ({filteredConversations.length})
          </h2>
          
          <div className="flex items-center gap-1.5">
            {conversations.length > 0 && (
              <button
                onClick={handleDeleteAllClick}
                className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-500/5 transition-colors cursor-pointer"
                title="Delete all conversations"
              >
                <Trash className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>
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
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <AnimatePresence initial={false}>
            {filteredConversations.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-2"
              >
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No conversations yet</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[200px] leading-relaxed">
                  Analyze and save your first customer message.
                </p>
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      height: 0, 
                      margin: 0, 
                      padding: 0, 
                      overflow: 'hidden' 
                    }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => onSelectConversation(conv)}
                    className={`group relative p-[18px] rounded-[18px] border cursor-pointer transition-all duration-200 overflow-hidden shadow-xs ${
                      isActive 
                        ? 'border-[#4F7CFF] bg-[#EEF4FF] dark:bg-indigo-500/10' 
                        : 'border-slate-200 bg-white dark:bg-slate-900/40 hover:border-[#4F7CFF]/50 hover:bg-[#EEF4FF]/25'
                    }`}
                  >
                    {/* Left Colored Priority Strip */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-[5px]" 
                      style={{ backgroundColor: prioInfo.stripColor }} 
                    />

                    {/* Badges line with wrapped icons */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2.5 pl-1.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border ${catInfo.color}`}>
                        <CategoryIcon className="h-2.5 w-2.5" />
                        {conv.category}
                      </span>

                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border ${prioInfo.color}`}>
                        <PriorityIcon className="h-2.5 w-2.5" />
                        {conv.priority}
                      </span>

                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border ${sentInfo.color}`}>
                        <SentimentIcon className="h-2.5 w-2.5" />
                        {conv.sentiment}
                      </span>
                    </div>

                    {/* Message snippet */}
                    <p className="text-[15px] font-medium text-[#1F2937] dark:text-slate-100 line-clamp-2 mb-3 leading-[1.5] font-sans pl-1.5 whitespace-pre-wrap break-words">
                      {conv.customerMessage || conv.message || ''}
                    </p>

                    {/* Date and Delete Action */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pl-1.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatRelativeTime(conv.createdAt)}
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
