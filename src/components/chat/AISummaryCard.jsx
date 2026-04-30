// ─── AISummaryCard — reusable "🧠 AI Summary" card for every phase page ──────
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getPageSummary } from './aiResponses';

/**
 * @param {{ pageType: string, userProfile?: object, accentColor?: string }} props
 * accentColor: Tailwind border-* class, e.g. 'border-teal-500' or 'border-civic-600'
 */
export default function AISummaryCard({ pageType, userProfile = {}, accentColor = 'border-civic-500' }) {
  const { t, i18n } = useTranslation();
  const summary = getPageSummary(pageType, userProfile, i18n.language);

  return (
    <div className={`section-card border-l-4 ${accentColor} bg-gradient-to-r from-slate-50 to-white animate-fade-in`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-civic-600 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-civic">
          <Sparkles size={15} className="text-white" />
        </div>
        <div>
          <p className="font-display font-bold text-slate-800 text-sm leading-none">{t('header.summaryCardTitle')}</p>
          <p className="text-xs text-slate-400 mt-0.5">{t('header.summaryCardSubtitle')}</p>
        </div>
      </div>

      {/* Short summary */}
      <p className="text-sm text-slate-700 leading-relaxed mb-4 font-medium">{summary.summary}</p>

      {/* Highlights row */}
      {summary.highlights && summary.highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {summary.highlights.map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full shadow-sm font-medium"
            >
              {h}
            </span>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Steps */}
        {summary.steps && summary.steps.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('header.summaryStepsLabel')}</p>
            <ol className="space-y-1.5">
              {summary.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-civic-100 text-civic-700 flex items-center justify-center font-bold text-[10px]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Checklist */}
        {summary.checklist && summary.checklist.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('header.summaryChecklistLabel')}</p>
            <ul className="space-y-1.5">
              {summary.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                  <span className="text-teal-500 mt-0.5 flex-shrink-0">✅</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
