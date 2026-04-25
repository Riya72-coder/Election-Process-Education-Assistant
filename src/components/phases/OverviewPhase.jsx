import { Users, MapPin, Building2, Flag, ArrowRight } from 'lucide-react';
import { overviewData } from '../../data/electionData';

const iconMap = { Users, MapPin, Building2, Flag };

export default function OverviewPhase({ setActivePhase }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-civic-900 via-civic-800 to-civic-600 rounded-3xl p-8 lg:p-12 text-white">
        {/* decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full" />

        <div className="relative">
          <div className="flex gap-2 mb-6">
            <span className="w-4 h-4 rounded-full bg-india-saffron animate-pulse-slow" />
            <span className="w-4 h-4 rounded-full bg-white" />
            <span className="w-4 h-4 rounded-full bg-india-green animate-pulse-slow" />
          </div>
          <p className="text-civic-200 text-sm font-semibold uppercase tracking-widest mb-2">
            {overviewData.subtitle}
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-4">
            {overviewData.title}
          </h2>
          <p className="text-civic-100 text-base lg:text-lg max-w-2xl leading-relaxed mb-8">
            {overviewData.description}
          </p>
          <button
            onClick={() => setActivePhase('quiz')}
            className="inline-flex items-center gap-2 bg-white text-civic-700 font-bold px-6 py-3 rounded-xl hover:bg-civic-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg text-sm"
          >
            Check Your Eligibility <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewData.stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={stat.label} className="section-card text-center hover:shadow-civic transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 bg-civic-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                {Icon && <Icon size={22} className="text-civic-600" />}
              </div>
              <p className="font-display text-2xl font-bold text-civic-700">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-civic-600 rounded-full" />
          Historical Timeline
        </h3>
        <div className="relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-slate-100" />
          <div className="space-y-6">
            {overviewData.timeline.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 animate-slide-up" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-civic-600 text-white flex items-center justify-center z-10">
                  <span className="text-[10px] font-bold leading-none text-center">{item.year.split('–')[0].slice(2)}</span>
                </div>
                <div className="flex-1 pb-2">
                  <span className="text-xs font-bold text-civic-600 uppercase tracking-wide">{item.year}</span>
                  <p className="text-sm text-slate-700 mt-0.5 leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Did You Know */}
      <div className="did-you-know animate-slide-up">
        <p className="text-sm font-bold uppercase tracking-wider mb-2">💡 Did You Know?</p>
        <p className="text-sm leading-relaxed">{overviewData.didYouKnow}</p>
      </div>
    </div>
  );
}
