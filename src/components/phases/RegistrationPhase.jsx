import { CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { registrationData } from '../../data/electionData';

export default function RegistrationPhase() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-700 to-teal-500 rounded-3xl p-8 text-white">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full" />
        <div className="relative">
          <span className="phase-badge bg-white/20 text-white mb-4">Phase 1</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{registrationData.title}</h2>
          <p className="text-teal-100 font-medium mb-2">{registrationData.subtitle}</p>
          <p className="text-teal-50 text-sm max-w-2xl leading-relaxed">{registrationData.description}</p>
        </div>
      </div>

      {/* Eligibility */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <CheckCircle size={20} className="text-teal-600" />
          Who Can Register?
        </h3>
        <div className="space-y-3">
          {registrationData.eligibility.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-teal-50 border border-teal-100 animate-slide-up" style={{ animationDelay: `${idx * 0.06}s` }}>
              <CheckCircle size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-bold text-teal-800">{item.label}: </span>
                <span className="text-sm text-slate-600">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-teal-600 rounded-full" />
          How to Register — Step by Step
        </h3>
        <div className="space-y-5">
          {registrationData.steps.map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                {item.step}
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                <p className="text-slate-500 text-sm leading-relaxed mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forms table */}
      <div className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <FileText size={20} className="text-teal-600" />
          Important Forms
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-teal-50">
                <th className="text-left px-4 py-3 text-teal-700 font-semibold rounded-l-lg">Form</th>
                <th className="text-left px-4 py-3 text-teal-700 font-semibold rounded-r-lg">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registrationData.forms.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-teal-700">{row.form}</td>
                  <td className="px-4 py-3 text-slate-600">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Did You Know */}
      <div className="did-you-know animate-slide-up">
        <p className="text-sm font-bold uppercase tracking-wider mb-2">💡 Did You Know?</p>
        <p className="text-sm leading-relaxed">{registrationData.didYouKnow}</p>
      </div>
    </div>
  );
}
