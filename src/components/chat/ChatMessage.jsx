// ─── ChatMessage — individual message bubble ─────────────────────────────────
import { Bot, User } from 'lucide-react';

/**
 * @param {{ role: 'user'|'ai', content: import('./aiResponses').AIResponse|string }} props
 */
export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-2.5 items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs
          ${isUser ? 'bg-civic-600' : 'bg-gradient-to-br from-teal-500 to-civic-600'}`}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm
          ${isUser
            ? 'bg-civic-600 text-white rounded-br-sm'
            : 'bg-white border border-slate-100 text-slate-800 rounded-bl-sm'
          }`}
      >
        {isUser ? (
          <p>{typeof content === 'string' ? content : content.short}</p>
        ) : (
          <AIContent content={content} />
        )}
      </div>
    </div>
  );
}

/** Renders structured AI response: short + optional steps + checklist + tip */
function AIContent({ content }) {
  if (typeof content === 'string') return <p>{content}</p>;
  const { short, steps, checklist, tip } = content;
  return (
    <div className="space-y-2">
      <p className="font-medium leading-snug">{short}</p>

      {steps && steps.length > 0 && (
        <ol className="space-y-1 pl-1">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-2 text-slate-700 text-xs leading-snug">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-civic-100 text-civic-700 flex items-center justify-center font-bold text-[10px]">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      )}

      {checklist && checklist.length > 0 && (
        <ul className="space-y-1">
          {checklist.map((item, i) => (
            <li key={i} className="text-xs text-slate-700 leading-snug flex gap-1.5">
              <span className="text-teal-500 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {tip && (
        <div className="bg-amber-50 border-l-2 border-amber-400 pl-2 pr-1 py-1 rounded-r-lg text-xs text-amber-800 italic leading-snug">
          💡 {tip}
        </div>
      )}
    </div>
  );
}
