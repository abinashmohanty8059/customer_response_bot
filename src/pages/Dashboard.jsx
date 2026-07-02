import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TicketEditor from '../components/TicketEditor';
import DetailsModal from '../components/DetailsModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { analyzeMessageWithAI, isApiConfigured } from '../services/gemini';

export default function Dashboard() {
  const [conversations, setConversations] = useLocalStorage('customer_support_history', []);
  
  // Editor States
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [reply, setReply] = useState('');
  const [activeId, setActiveId] = useState(null);

  // Modal State
  const [selectedConversationForModal, setSelectedConversationForModal] = useState(null);

  // Layout & Theme States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = window.localStorage.getItem('dark_mode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Status & Loading States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFallbackUsed, setIsFallbackUsed] = useState(false);
  const [isAiConnected, setIsAiConnected] = useState(false);

  // Toggle Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    window.localStorage.setItem('dark_mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Check API configuration on mount
  useEffect(() => {
    setIsAiConnected(isApiConfigured());
  }, []);

  const handleAnalyze = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);
    setIsFallbackUsed(false);

    try {
      const result = await analyzeMessageWithAI(message);
      setAnalysis({
        category: result.category,
        priority: result.priority,
        sentiment: result.sentiment
      });
      setReply(result.reply);
      setIsAiConnected(true);
    } catch (err) {
      console.error("Gemini AI API Request Failed:", err);
      setError(err.message || "AI unavailable.");
      setIsAiConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!message.trim() || !analysis) return;

    const targetId = Date.now().toString();
    const createdAt = new Date().toISOString();

    const newConversation = {
      id: targetId,
      customerMessage: message,
      category: analysis.category,
      priority: analysis.priority,
      sentiment: analysis.sentiment,
      reply,
      createdAt
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveId(targetId);
  };

  const handleClear = () => {
    setMessage('');
    setAnalysis(null);
    setReply('');
    setActiveId(null);
    setError(null);
    setIsFallbackUsed(false);
  };

  const handleSelectConversation = (conv) => {
    // Opens the details modal instead of immediately loading it to workspace
    setSelectedConversationForModal(conv);
  };

  const handleLoadIntoWorkspace = (conv) => {
    setActiveId(conv.id);
    setMessage(conv.customerMessage || conv.message || '');
    setAnalysis({
      category: conv.category,
      priority: conv.priority,
      sentiment: conv.sentiment
    });
    setReply(conv.reply);
    setError(null);
    setIsFallbackUsed(false);
    setSelectedConversationForModal(null);
  };

  const handleDeleteConversation = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) {
      handleClear();
    }
  };

  const handleDeleteFromModal = (id) => {
    handleDeleteConversation(id);
    setSelectedConversationForModal(null);
  };

  const handleDeleteAll = () => {
    setConversations([]);
    handleClear();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar 
        isAiConnected={isAiConnected} 
        isDarkMode={isDarkMode} 
        onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for Conversation History */}
        <Sidebar 
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
          onDeleteAll={handleDeleteAll}
          activeId={activeId}
          isOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(false)}
        />

        {/* Current Ticket Editor */}
        <TicketEditor 
          message={message}
          onChangeMessage={setMessage}
          onAnalyze={handleAnalyze}
          analysis={analysis}
          isLoading={isLoading}
          error={error}
          isFallbackUsed={isFallbackUsed}
          reply={reply}
          onChangeReply={setReply}
          onSave={handleSave}
          onClear={handleClear}
          canSave={!!(message.trim() && analysis)}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(true)}
        />
      </div>

      {/* Details View Modal */}
      <AnimatePresence>
        {selectedConversationForModal && (
          <DetailsModal
            conversation={selectedConversationForModal}
            onClose={() => setSelectedConversationForModal(null)}
            onLoadIntoWorkspace={handleLoadIntoWorkspace}
            onDelete={handleDeleteFromModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
