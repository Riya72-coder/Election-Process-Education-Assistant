import { Menu, Bell, ExternalLink } from 'lucide-react';

export default function Header({ activePhase, setMobileOpen }) {
  const phaseLabels = {
    overview:     'Overview',
    registration: 'Voter Registration',
    campaigning:  'Campaigning & MCC',
    polling:      'Polling Day',
    results:      'Results & Government',
    quiz:         'Voter Eligibility Quiz',
  };

  return (
    <header className="flex-shrink-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-6">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(prev => !prev)}
          className="lg:hidden w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-slate-400">ElectionEdu</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-civic-700">{phaseLabels[activePhase] || 'Overview'}</span>
        </div>
        <span className="sm:hidden font-semibold text-civic-700 text-sm">
          {phaseLabels[activePhase]}
        </span>
      </div>

      {/* Right: CTA */}
      <div className="flex items-center gap-2">
        <a
          href="https://voters.eci.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 bg-civic-600 hover:bg-civic-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
        >
          <ExternalLink size={12} />
          Register to Vote
        </a>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-civic-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
          IN
        </div>
      </div>
    </header>
  );
}
