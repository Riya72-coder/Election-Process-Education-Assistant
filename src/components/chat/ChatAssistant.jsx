// ─── ChatAssistant — floating button + sliding chat panel ───────────────────
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { getAIResponse } from './aiResponses';
import { streamGeminiResponse } from '../../api/gemini';
import { ChatContext } from './ChatContext';
import { AnimatePresence } from 'framer-motion';

// ── Optional: tweak the user profile for personalized responses ──────────────
const USER_PROFILE = {
  // age: 19,
  // state: 'Maharashtra',
  // isFirstTime: true,
};

let _id = 1;
const uid = () => `msg-${_id++}`;

export default function ChatAssistant() {
  const { t, i18n } = useTranslation();
  const { isOpen, setIsOpen, pendingMessage, clearPending } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'ai',
        content: t('chat.welcome', { returnObjects: true })
      }]);
    }
  }, [t, messages.length]);

  // ── Core send logic ──────────────────────────────────────────────────────
  const dispatchMessage = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    
    const userMsg = { id: uid(), role: 'user', content: trimmed };
    const msgId = uid();
    const initMsg = { id: msgId, role: 'ai', content: { short: '', isStreaming: true } };
    
    setMessages((prev) => [...prev, userMsg, initMsg]);
    setTyping(true);

    let accumulated = '';

    streamGeminiResponse(
      trimmed,
      i18n.language,
      (chunk) => {
        accumulated += chunk;
        setTyping(false);
        setMessages(prev => prev.map(m =>
          m.id === msgId
            ? { ...m, content: { short: accumulated, isStreaming: true } }
            : m
        ));
      },
      () => {
        setTyping(false);
        setMessages(prev => prev.map(m =>
          m.id === msgId
            ? { ...m, content: { short: accumulated, isStreaming: false } }
            : m
        ));
      },
      (err) => {
        if (err.message !== 'NO_API_KEY') {
          console.warn('Gemini API error, falling back to local AI:', err.message);
        }
        setTyping(false);
        setMessages(prev => prev.filter(m => m.id !== msgId));
        const aiContent = getAIResponse(trimmed, USER_PROFILE, i18n.language);
        streamResponse(aiContent);
      }
    );
  }, [i18n.language]);

  const streamResponse = (fullContent) => {
    const id = uid();
    const isFullString = typeof fullContent === 'string';
    const shortText = isFullString ? fullContent : fullContent.short;
    const initialMsg = { id, role: 'ai', content: { short: '', isStreaming: true } };
    setMessages(prev => [...prev, initialMsg]);

    let currentText = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < shortText.length) {
        currentText += shortText[i];
        setMessages(prev => prev.map(m => 
          m.id === id ? { ...m, content: { ...m.content, short: currentText } } : m
        ));
        i++;
      } else {
        clearInterval(interval);
        setMessages(prev => prev.map(m => 
          m.id === id ? { ...m, content: { ...(typeof fullContent === 'string' ? { short: fullContent } : fullContent), isStreaming: false } } : m
        ));
      }
    }, 20);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!pendingMessage) return;
    const { text } = pendingMessage;
    setIsOpen(true);
    setHasUnread(false);
    setTimeout(() => dispatchMessage(text), 300);
    clearPending();
  }, [pendingMessage, dispatchMessage, setIsOpen, clearPending]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || typing) return;
    setInput('');
    dispatchMessage(trimmed);
    if (!isOpen) setHasUnread(true);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const CHIPS = t('chat.chips', { returnObjects: true }) || [];
  const sendChip = (text) => {
    if (typing) return;
    dispatchMessage(text);
    setInput('');
  };

  return (
    <>
      {/* ── FAB — only visible when panel is closed ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="civicguide-fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            aria-label="Open CivicGuide AI chat"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-civic-600 to-teal-600 shadow-xl flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
          >
            <MessageCircle size={22} />
            
            {/* Pulse effect restored */}
            <span className="absolute inset-0 rounded-full bg-civic-400 opacity-40 animate-ping pointer-events-none" />

            {hasUnread && (
              <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── AI Side Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="civicguide-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`
              fixed lg:relative top-0 right-0 z-50
              h-full w-full lg:w-[40%]
              bg-white flex flex-col overflow-hidden
              border-l border-slate-200 shadow-2xl lg:shadow-none
            `}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-civic-900 to-civic-700 px-4 py-4 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-semibold text-base leading-none">CivicGuide AI</p>
                  <Sparkles size={14} className="text-amber-300" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-white/60 text-[10px] uppercase tracking-wider font-medium">{t('chat.tagline')}</p>
                  <div className="flex items-center gap-1 bg-teal-400/20 px-1.5 py-0.5 rounded-full border border-teal-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-teal-300 text-[9px] font-bold uppercase tracking-tighter">{t('chat.online')}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tricolour accent strip */}
            <div className="flex h-1 flex-shrink-0">
              <div className="flex-1 bg-india-saffron" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-india-green" />
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/50 min-h-0 custom-scrollbar">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
              ))}
              {typing && (
                <div className="flex gap-3 items-end animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-civic-600 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-civic-400"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-civic-500 uppercase tracking-widest">AI Thinking</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chips */}
            {messages.length <= 2 && !typing && (
              <div className="px-4 py-3 flex gap-2 flex-wrap bg-white border-t border-slate-100">
                {CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendChip(chip)}
                    className="text-xs bg-civic-50 hover:bg-civic-100 text-civic-700 border border-civic-200 rounded-full px-3 py-1.5 transition-colors font-medium"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="px-4 py-4 border-t border-slate-100 bg-white">
              <div className="relative flex items-end gap-2 bg-slate-50 rounded-2xl p-2 border border-slate-200 focus-within:border-civic-400 focus-within:ring-2 focus-within:ring-civic-100 transition-all">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={t('chat.placeholder')}
                  disabled={typing}
                  className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-800 outline-none max-h-32 min-h-[40px] leading-relaxed"
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || typing}
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-civic-600 hover:bg-civic-700 disabled:bg-slate-200 text-white flex items-center justify-center transition-all shadow-lg shadow-civic/20"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-3 font-medium tracking-wide">
                AI can make mistakes. Verify important information.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
