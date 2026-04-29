// ─── ChatContext — shared state for triggering chat from any page ─────────────
import { createContext, useContext, useState, useCallback } from 'react';

export const ChatContext = createContext(null);

/**
 * Wrap your app root with this. Children can call useChatTrigger() to open
 * the chat panel with a pre-typed message.
 */
export function ChatProvider({ children }) {
  // Each time this changes, ChatAssistant will react to it
  const [pendingMessage, setPendingMessage] = useState(null);

  /** Call from any page: openWithMessage("How do I register?") */
  const openWithMessage = useCallback((text) => {
    setPendingMessage({ text, ts: Date.now() }); // ts forces re-render even for same text
  }, []);

  const clearPending = useCallback(() => setPendingMessage(null), []);

  return (
    <ChatContext.Provider value={{ pendingMessage, openWithMessage, clearPending }}>
      {children}
    </ChatContext.Provider>
  );
}

/** Hook for pages to trigger the chat */
export function useChatTrigger() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatTrigger must be used inside <ChatProvider>');
  return ctx.openWithMessage;
}
