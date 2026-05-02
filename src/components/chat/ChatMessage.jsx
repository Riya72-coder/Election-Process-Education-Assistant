import ReactMarkdown from 'react-markdown';
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

/** Renders structured AI response with Markdown support */
function AIContent({ content }) {
  const text = typeof content === 'string' ? content : content.short;
  
  return (
    <div className="space-y-2 overflow-hidden">
      <div className={`
        prose prose-sm max-w-none prose-slate
        prose-headings:text-civic-800 prose-headings:font-bold prose-headings:mt-1 prose-headings:mb-1
        prose-p:leading-snug prose-p:my-1
        prose-li:my-0.5 prose-strong:text-civic-700
        transition-all duration-300 
        ${content.isStreaming ? 'border-r-2 border-civic-400 animate-pulse-slow' : ''}
      `}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>

      {content.steps && content.steps.length > 0 && (
        <ol className="space-y-1 pl-1">
          {content.steps.map((s, i) => (
            <li key={i} className="flex gap-2 text-slate-700 text-xs leading-snug">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-civic-100 text-civic-700 flex items-center justify-center font-bold text-[10px]">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      )}

      {content.checklist && content.checklist.length > 0 && (
        <ul className="space-y-1">
          {content.checklist.map((item, i) => (
            <li key={i} className="text-xs text-slate-700 leading-snug flex gap-1.5">
              <span className="text-teal-500 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {content.tip && (
        <div className="bg-amber-50 border-l-2 border-amber-400 pl-2 pr-1 py-1 rounded-r-lg text-xs text-amber-800 italic leading-snug">
          💡 {content.tip}
        </div>
      )}
    </div>
  );
}
