// ─── ChatAssistant — floating button + sliding chat panel ───────────────────
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { getAIResponse } from './aiResponses';
import { streamGeminiResponse } from '../../api/gemini';
import { ChatContext } from './ChatContext';

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
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize welcome message with current language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'ai',
        content: t('chat.welcome', { returnObjects: true })
      }]);
    }
  }, [t, messages.length]);

  // Consume context to receive external triggers from pages
  const chatCtx = useContext(ChatContext);

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
      // onChunk — append streamed text
      (chunk) => {
        accumulated += chunk;
        setTyping(false);
        setMessages(prev => prev.map(m =>
          m.id === msgId
            ? { ...m, content: { short: accumulated, isStreaming: true } }
            : m
        ));
      },
      // onDone
      () => {
        setTyping(false);
        setMessages(prev => prev.map(m =>
          m.id === msgId
            ? { ...m, content: { short: accumulated, isStreaming: false } }
            : m
        ));
      },
      // onError — fall back to local AI
      (err) => {
        if (err.message !== 'NO_API_KEY') {
          console.warn('Gemini API error, falling back to local AI:', err.message);
        }
        setTyping(false);
        // Remove the empty streaming placeholder
        setMessages(prev => prev.filter(m => m.id !== msgId));
        
        // Fallback to local logic
        const aiContent = getAIResponse(trimmed, USER_PROFILE, i18n.language);
        streamResponse(aiContent);
      }
    );
  }, [i18n.language]);

  // Gradually reveal AI response (local fallback path)
  const streamResponse = (fullContent) => {
    const id = uid();
    const isFullString = typeof fullContent === 'string';
    const shortText = isFullString ? fullContent : fullContent.short;
    
    const initialMsg = { 
      id, 
      role: 'ai', 
      content: { short: '', isStreaming: true } 
    };
    setMessages(prev => [...prev, initialMsg]);

    let currentText = '';
    const speed = 20;
    let i = 0;
    const interval = setInterval(() => {
      if (i < shortText.length) {
        currentText += shortText[i];
        setMessages(prev => prev.map(m => 
          m.id === id 
            ? { ...m, content: { ...m.content, short: currentText } } 
            : m
        ));
        i++;
      } else {
        clearInterval(interval);
        setMessages(prev => prev.map(m => 
          m.id === id 
            ? { ...m, content: { ...(typeof fullContent === 'string' ? { short: fullContent } : fullContent), isStreaming: false } } 
            : m
        ));
      }
    }, speed);
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  // React to external openWithMessage() calls from pages
  useEffect(() => {
    if (!chatCtx?.pendingMessage) return;
    const { text } = chatCtx.pendingMessage;
    setOpen(true);
    setHasUnread(false);
    // Small delay so panel opens before message appears
    setTimeout(() => dispatchMessage(text), 300);
    chatCtx.clearPending();
  }, [chatCtx?.pendingMessage, dispatchMessage, chatCtx]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || typing) return;
    setInput('');
    dispatchMessage(trimmed);
    if (!open) setHasUnread(true);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Quick-reply chips
  const CHIPS = t('chat.chips', { returnObjects: true }) || [];

  const sendChip = (text) => {
    if (typing) return;
    dispatchMessage(text);
    setInput('');
  };

  return (
    <>
      {/* ── Floating Action Button ─────────────────────────────────────── */}
      <button
        id="civicguide-fab"
        aria-label="Open CivicGuide AI chat"
        onClick={() => setOpen((v) => !v)}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-gradient-to-br from-civic-600 to-teal-600
          shadow-[0_8px_30px_rgba(26,86,219,0.45)]
          flex items-center justify-center
          text-white transition-all duration-300
          hover:scale-110 hover:shadow-[0_12px_36px_rgba(26,86,219,0.55)]
          active:scale-95
          ${open ? 'rotate-0' : ''}
        `}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}

        {/* Unread dot */}
        {hasUnread && !open && (
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        )}

        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-civic-400 opacity-30 animate-ping" />
        )}
      </button>

      {/* ── Chat Panel ────────────────────────────────────────────────── */}
      <div
        id="civicguide-panel"
        className={`
          fixed bottom-24 right-6 z-50
          w-[340px] sm:w-[380px]
          bg-white rounded-2xl
          shadow-[0_24px_60px_rgba(0,0,0,0.18)]
          border border-slate-100
          flex flex-col overflow-hidden
          transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }
        `}
        style={{ maxHeight: 'calc(100vh - 140px)' }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-civic-900 to-civic-700 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-white font-semibold text-sm leading-none">CivicGuide AI</p>
              <Sparkles size={12} className="text-amber-300" />
            </div>
            <p className="text-white/60 text-xs mt-0.5">{t('chat.tagline')}</p>
          </div>
          {/* Online badge */}
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse-slow" />
            <span className="text-teal-300 text-xs font-medium">{t('chat.online')}</span>
          </div>
        </div>

        {/* Tricolour accent strip */}
        <div className="flex h-0.5 flex-shrink-0">
          <div className="flex-1 bg-india-saffron" />
          <div className="flex-1 bg-white/80" />
          <div className="flex-1 bg-india-green" />
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-slate-50/70 min-h-0">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-2.5 items-end animate-pulse">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-civic-600 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
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
                <span className="text-[10px] font-bold text-civic-500 uppercase tracking-widest ml-1">AI Thinking</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick-reply chips */}
        {messages.length <= 2 && !typing && (
          <div className="px-3 py-2 flex gap-1.5 flex-wrap bg-slate-50/70 border-t border-slate-100 flex-shrink-0">
            {CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => sendChip(chip)}
                className="text-xs bg-civic-50 hover:bg-civic-100 text-civic-700 border border-civic-200 rounded-full px-2.5 py-1 transition-colors duration-150 font-medium"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="px-3 py-3 border-t border-slate-100 bg-white flex items-end gap-2 flex-shrink-0">
          <textarea
            ref={inputRef}
            id="civicguide-input"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={t('chat.placeholder')}
            disabled={typing}
            className="
              flex-1 resize-none rounded-xl border border-slate-200
              bg-slate-50 px-3 py-2 text-sm text-slate-800
              placeholder:text-slate-400 outline-none
              focus:border-civic-400 focus:bg-white focus:ring-2 focus:ring-civic-100
              transition-all duration-150
              max-h-24 overflow-y-auto leading-snug
              disabled:opacity-50
            "
            style={{ minHeight: '38px' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
            }}
          />
          <button
            id="civicguide-send"
            onClick={sendMessage}
            disabled={!input.trim() || typing}
            aria-label="Send message"
            className="
              flex-shrink-0 w-9 h-9 rounded-xl
              bg-civic-600 hover:bg-civic-700
              disabled:bg-slate-200 disabled:cursor-not-allowed
              text-white disabled:text-slate-400
              flex items-center justify-center
              transition-all duration-150 hover:scale-105 active:scale-95
              shadow-civic disabled:shadow-none
            "
          >
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
