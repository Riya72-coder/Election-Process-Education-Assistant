// ─── PageAIBar — "Ask AI" + Quick Action buttons row ─────────────────────────
import { Sparkles, MessageSquare, Zap, ClipboardList } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useChatTrigger } from './ChatContext';

/**
 * @param {{
 *   askLabel: string,   // e.g. "Can I register?"
 *   askQuery: string,   // full message sent to chat
 *   pageType: string,   // used to build quick-action prompts
 * }} props
 */
export default function PageAIBar({ askLabel, askQuery, pageType }) {
  const { t } = useTranslation();
  const openWithMessage = useChatTrigger();

  const QUICK_ACTIONS = [
    {
      id: 'explain',
      Icon: MessageSquare,
      label: t('header.aiBarExplain'),
      query: `Explain ${pageType} simply in plain language`,
    },
    {
      id: 'steps',
      Icon: Zap,
      label: t('header.aiBarSteps'),
      query: `Give me quick steps for ${pageType}`,
    },
    {
      id: 'checklist',
      Icon: ClipboardList,
      label: t('header.aiBarChecklist'),
      query: `Give me a checklist for ${pageType}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 py-0.5">
      {/* Primary "Ask AI" button */}
      <button
        onClick={() => openWithMessage(askQuery)}
        className="
          inline-flex items-center gap-1.5
          bg-gradient-to-r from-civic-600 to-teal-600
          hover:from-civic-700 hover:to-teal-700
          text-white text-xs font-semibold
          px-3.5 py-2 rounded-xl
          shadow-civic hover:shadow-lg
          transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0
        "
      >
        <Sparkles size={13} />
        {t('header.aiBarAsk')}: {askLabel}
      </button>

      {/* Divider */}
      <span className="hidden sm:block text-slate-200 text-lg font-light select-none">|</span>

      {/* Quick action chips */}
      {QUICK_ACTIONS.map(({ id, Icon, label, query }) => (
        <button
          key={id}
          onClick={() => openWithMessage(query)}
          className="
            inline-flex items-center gap-1.5
            bg-white hover:bg-slate-50
            border border-slate-200 hover:border-civic-300
            text-slate-600 hover:text-civic-700
            text-xs font-medium
            px-3 py-1.5 rounded-xl
            transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0
            shadow-sm
          "
        >
          <Icon size={12} />
          {label}
        </button>
      ))}
    </div>
  );
}
