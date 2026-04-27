import { TrendingUp, Gavel, BookOpen } from 'lucide-react';
import { resultsData } from '../../data/electionData';

export default function ResultsPhase({ langContent }) {
  const res = langContent?.phases?.results ?? {};
  const {
    title = resultsData.title,
    subtitle = resultsData.subtitle,
    description = resultsData.description,
    didYouKnow = resultsData.didYouKnow,
  } = res;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-800 to-cyan-600 rounded-3xl p-8 text-white">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full" />
        <div className="relative">
          <span className="phase-badge bg-white/20 text-white mb-4">Phase 4</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{title}</h2>
          <p className="text-teal-100 font-medium mb-2">{subtitle}</p>
          <p className="text-teal-50 text-sm max-w-2xl leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Counting process */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-teal-600" />
          {langContent?.phases?.results?.countingTitle ?? "How Counting Works"}
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-100" />
          <div className="space-y-5">
            {(res.countingSteps ?? resultsData.countingSteps).map((item) => (
              <div key={item.step} className="flex items-start gap-4 animate-slide-up">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold z-10">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Government Formation */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <Gavel size={20} className="text-teal-600" />
          {langContent?.phases?.results?.govTitle ?? "Government Formation"}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(res.governmentFormation ?? resultsData.governmentFormation).map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-teal-50 border border-teal-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <p className="font-semibold text-teal-800 text-sm mb-1">{item.title}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <BookOpen size={20} className="text-teal-600" />
          {langContent?.phases?.results?.conceptsTitle ?? "Key Electoral Concepts"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-teal-50">
                <th className="text-left px-4 py-3 text-teal-700 font-semibold rounded-l-lg">
                  {langContent?.phases?.results?.termLabel ?? "Term"}
                </th>
                <th className="text-left px-4 py-3 text-teal-700 font-semibold rounded-r-lg">
                  {langContent?.phases?.results?.meaningLabel ?? "Meaning"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(res.keyConcepts ?? resultsData.keyConcepts).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-teal-700">{row.term}</td>
                  <td className="px-4 py-3 text-slate-600">{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
