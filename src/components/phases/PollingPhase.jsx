import { CreditCard, ShieldCheck, Star } from 'lucide-react';
import { pollingData } from '../../data/electionData';

export default function PollingPhase() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-civic-900 via-civic-700 to-cyan-600 rounded-3xl p-8 text-white">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full" />
        <div className="relative">
          <span className="phase-badge bg-white/20 text-white mb-4">Phase 3</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{pollingData.title}</h2>
          <p className="text-civic-200 font-medium mb-2">{pollingData.subtitle}</p>
          <p className="text-civic-100 text-sm max-w-2xl leading-relaxed">{pollingData.description}</p>
        </div>
      </div>

      {/* What to bring */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <CreditCard size={20} className="text-civic-600" />
          What to Bring on Polling Day
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {pollingData.whatToBring.map((doc, idx) => (
            <div key={idx} className="fact-card animate-bounce-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <p className="font-semibold text-civic-700 text-sm">{doc.item}</p>
              <p className="text-slate-500 text-xs mt-1">{doc.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Voting Steps */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-civic-600 rounded-full" />
          How to Cast Your Vote
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {pollingData.steps.map((item) => (
            <div key={item.step} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-civic-200 hover:bg-civic-50 transition-all duration-200">
              <div className="step-number text-xs">{item.step}</div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voter Rights */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <ShieldCheck size={20} className="text-civic-600" />
          Your Voter Rights
        </h3>
        <div className="space-y-3">
          {pollingData.rights.map((right, idx) => (
            <div key={idx} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${idx * 0.06}s` }}>
              <Star size={16} className="text-civic-500 flex-shrink-0 mt-0.5" fill="currentColor" />
              <p className="text-sm text-slate-600 leading-relaxed">{right}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl bg-civic-50 border border-civic-100 flex gap-2 items-center">
          <span className="text-2xl">📞</span>
          <p className="text-sm text-civic-700 font-medium">Report violations: ECI Toll-Free <strong>1950</strong></p>
        </div>
      </div>

      {/* Did You Know */}
      <div className="did-you-know animate-slide-up">
        <p className="text-sm font-bold uppercase tracking-wider mb-2">💡 Did You Know?</p>
        <p className="text-sm leading-relaxed">{pollingData.didYouKnow}</p>
      </div>
    </div>
  );
}
