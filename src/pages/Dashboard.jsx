import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TicketEditor from '../components/TicketEditor';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { analyzeMessageWithAI, isApiConfigured } from '../services/gemini';
import { classifyMessageOffline } from '../utils/fallback';

export default function Dashboard() {
  const [conversations, setConversations] = useLocalStorage('customer_support_history', []);
  
  // Editor States
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [reply, setReply] = useState('');
  const [activeId, setActiveId] = useState(null);

  // Status & Loading States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFallbackUsed, setIsFallbackUsed] = useState(false);
  const [isAiConnected, setIsAiConnected] = useState(false);

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

    const targetId = activeId || Date.now().toString();
    const timestamp = new Date().toISOString();

    const updatedConversation = {
      id: targetId,
      message,
      category: analysis.category,
      priority: analysis.priority,
      sentiment: analysis.sentiment,
      reply, // save the current edited reply state
      timestamp
    };

    setConversations((prev) => {
      const exists = prev.some((c) => c.id === targetId);
      if (exists) {
        return prev.map((c) => (c.id === targetId ? updatedConversation : c));
      } else {
        return [updatedConversation, ...prev];
      }
    });

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
    setActiveId(conv.id);
    setMessage(conv.message);
    setAnalysis({
      category: conv.category,
      priority: conv.priority,
      sentiment: conv.sentiment
    });
    setReply(conv.reply);
    setError(null);
    setIsFallbackUsed(false);
  };

  const handleDeleteConversation = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) {
      handleClear();
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Navbar isAiConnected={isAiConnected} />
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar for Conversation History */}
        <Sidebar 
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
          activeId={activeId}
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
        />
      </div>
    </div>
  );
}
