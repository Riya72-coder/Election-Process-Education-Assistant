import { ShieldCheck, DollarSign, Clock } from 'lucide-react';
import { campaigningData } from '../../data/electionData';

export default function CampaigningPhase({ langContent }) {
  const camp = langContent?.phases?.campaigning ?? {};
  const {
    title = campaigningData.title,
    subtitle = campaigningData.subtitle,
    description = campaigningData.description,
    didYouKnow = campaigningData.didYouKnow,
  } = camp;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-saffron-500 rounded-3xl p-8 text-white">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full" />
        <div className="relative">
          <span className="phase-badge bg-white/20 text-white mb-4">Phase 2</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{title}</h2>
          <p className="text-orange-100 font-medium mb-2">{subtitle}</p>
          <p className="text-orange-50 text-sm max-w-2xl leading-relaxed">{description}</p>
        </div>
      </div>

      {/* MCC */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
          <ShieldCheck size={20} className="text-orange-500" />
          {langContent?.phases?.campaigning?.mccTitle ?? "Model Code of Conduct (MCC)"}
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          {langContent?.phases?.campaigning?.mccDesc ?? "The MCC is a set of guidelines issued by the Election Commission to ensure free and fair elections."}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {(camp.mccPoints ?? campaigningData.mccPoints).map((point, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100 animate-slide-up" style={{ animationDelay: `${idx * 0.06}s` }}>
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
          {langContent?.phases?.campaigning?.expenseTitle ?? "Election Expense Limits"}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(camp.expenses ?? campaigningData.expenses).map((exp, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">{exp.category}</p>
              <p className="font-display text-2xl font-bold text-slate-800">{exp.limit}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 flex gap-2">
          <span className="text-red-500 text-lg">⚠️</span>
          <p className="text-xs text-red-700">{langContent?.phases?.campaigning?.expenseWarning ?? "Exceeding these limits is an electoral offence."}</p>
        </div>
      </div>

      {/* Campaign Timeline */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Clock size={20} className="text-orange-500" />
          {langContent?.phases?.campaigning?.timelineTitle ?? "Campaign Timeline"}
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-orange-100" />
          <div className="space-y-5">
            {(camp.timeline ?? campaigningData.timeline).map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 animate-slide-up" style={{ animationDelay: `${idx * 0.07}s` }}>
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

      {/* Did You Know */}
      <div className="did-you-know animate-slide-up">
        <p className="text-sm font-bold uppercase tracking-wider mb-2">
          {langContent?.overview?.dykLabel ?? "💡 Did You Know?"}
        </p>
        <p className="text-sm leading-relaxed">{didYouKnow}</p>
      </div>
    </div>
  );
}
