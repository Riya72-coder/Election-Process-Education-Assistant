import { ShieldCheck, DollarSign, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AISummaryCard from '../chat/AISummaryCard';
import PageAIBar from '../chat/PageAIBar';
import CandidateParser from '../candidate/CandidateParser';
import ListenButton from '../ui/ListenButton';

export default function CampaigningPhase({ setActivePhase }) {
  const { t, i18n } = useTranslation();

  const mccPoints = t('campaigning.mccPoints', { returnObjects: true });
  const expenses  = t('campaigning.expenses',  { returnObjects: true });
  const timeline  = t('campaigning.timeline',  { returnObjects: true });

  const getPageText = () => {
    const parts = [
      t('campaigning.title'),
      t('campaigning.subtitle'),
      t('campaigning.description'),
      t('campaigning.mccTitle'),
      t('campaigning.mccDesc'),
      ...mccPoints.map(p => `${p.title}: ${p.detail}`),
      t('campaigning.expenseTitle'),
      ...expenses.map(e => `${e.category}: ${e.limit}`),
      t('campaigning.expenseWarning'),
      t('campaigning.timelineTitle'),
      ...timeline.map(t => `${t.phase}: ${t.detail}`),
      t('campaigning.dykLabel'),
      t('campaigning.dykText')
    ];
    return parts.join('. ');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-saffron-500 rounded-3xl p-8 text-white">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full" />
        <div className="relative">
          <span className="phase-badge bg-white/20 text-white mb-4">{t('campaigning.phase')}</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{t('campaigning.title')}</h2>
          <p className="text-orange-100 font-medium mb-2">{t('campaigning.subtitle')}</p>
          <p className="text-orange-50 text-sm max-w-2xl leading-relaxed">{t('campaigning.description')}</p>
          <div className="mt-3">
            <ListenButton text={getPageText()} lang={i18n.language} />
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              onClick={() => setActivePhase('mythbuster')}
              className="px-5 py-2.5 bg-white text-orange-600 rounded-xl font-bold text-sm shadow-lg shadow-orange-900/20 flex items-center gap-2 hover:bg-orange-50 transition-all active:scale-95"
            >
              <ShieldAlert size={18} />
              {t('campaigning.checkRulesBtn')}
            </button>
            
            <PageAIBar
              askLabel={t('campaigning.aiAskLabel')}
              askQuery={t('campaigning.aiAskQuery')}
              pageType="election campaigning"
            />
          </div>
        </div>
      </div>

      {/* AI Summary Card */}
      <AISummaryCard pageType="campaigning" accentColor="border-orange-500" />

      {/* MCC */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
          <ShieldCheck size={20} className="text-orange-500" />
          {t('campaigning.mccTitle')}
        </h3>
        <p className="text-sm text-slate-500 mb-5">{t('campaigning.mccDesc')}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {mccPoints.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100 animate-slide-up"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <ShieldCheck size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-800 text-sm">{point.title}</p>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">{point.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expense limits */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <DollarSign size={20} className="text-orange-500" />
          {t('campaigning.expenseTitle')}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {expenses.map((exp, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">{exp.category}</p>
              <p className="font-display text-2xl font-bold text-slate-800">{exp.limit}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 flex gap-2">
          <span className="text-red-500 text-lg">⚠️</span>
          <p className="text-xs text-red-700">{t('campaigning.expenseWarning')}</p>
        </div>
      </div>

      {/* Campaign Timeline */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Clock size={20} className="text-orange-500" />
          {t('campaigning.timelineTitle')}
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-orange-100" />
          <div className="space-y-5">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 animate-slide-up"
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold z-10">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.phase}</p>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Candidate Promise Parser ── */}
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CandidateParser />
      </div>

      {/* Did You Know */}
      <div className="did-you-know animate-slide-up">
        <p className="text-sm font-bold uppercase tracking-wider mb-2">{t('campaigning.dykLabel')}</p>
        <p className="text-sm leading-relaxed">{t('campaigning.dykText')}</p>
      </div>
    </div>
  );
}
