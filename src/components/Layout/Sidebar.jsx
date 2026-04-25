import {
  Home, ClipboardList, Megaphone, Vote, BarChart3,
  HelpCircle, ChevronRight, X, Menu, Award
} from 'lucide-react';
import { phases } from '../../data/electionData';

const iconMap = {
  Home, ClipboardList, Megaphone, Vote, BarChart3, HelpCircle,
};

const phaseColors = {
  overview:     { active: 'bg-civic-600 text-white shadow-civic', hover: 'hover:bg-civic-50 hover:text-civic-700' },
  registration: { active: 'bg-teal-600 text-white shadow-md',     hover: 'hover:bg-teal-50 hover:text-teal-700' },
  campaigning:  { active: 'bg-saffron-500 text-white shadow-md',  hover: 'hover:bg-orange-50 hover:text-orange-700' },
  polling:      { active: 'bg-civic-600 text-white shadow-civic', hover: 'hover:bg-civic-50 hover:text-civic-700' },
  results:      { active: 'bg-teal-600 text-white shadow-md',     hover: 'hover:bg-teal-50 hover:text-teal-700' },
  quiz:         { active: 'bg-saffron-500 text-white shadow-md',  hover: 'hover:bg-orange-50 hover:text-orange-700' },
};

export default function Sidebar({ activePhase, setActivePhase, mobileOpen, setMobileOpen }) {
  const handleNav = (id) => {
    setActivePhase(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-100
          shadow-xl lg:shadow-none flex flex-col transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="relative bg-gradient-to-br from-civic-900 to-civic-700 p-6 flex-shrink-0">
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Award size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-lg leading-tight">ElectionEdu</h1>
              <p className="text-white/60 text-xs">India's Democracy Guide</p>
            </div>
          </div>
          {/* Tricolour accent bar */}
          <div className="flex mt-4 rounded-full overflow-hidden h-1">
            <div className="flex-1 bg-india-saffron" />
            <div className="flex-1 bg-white/80" />
            <div className="flex-1 bg-india-green" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">
            Election Phases
          </p>
          {phases.map((phase, idx) => {
            const Icon = iconMap[phase.icon];
            const isActive = activePhase === phase.id;
            const colors = phaseColors[phase.id];

            return (
              <button
                key={phase.id}
                onClick={() => handleNav(phase.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group text-left
                  ${isActive ? colors.active : `text-slate-600 ${colors.hover}`}
                `}
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                  ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'}
                `}>
                  {Icon && <Icon size={16} />}
                </div>
                <span className="flex-1">{phase.label}</span>
                {phase.id === 'quiz' && (
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-white/20 px-2 py-0.5 rounded-full">
                    Try it!
                  </span>
                )}
                {isActive && <ChevronRight size={14} className="opacity-70" />}
                {!isActive && (
                  <span className="text-xs text-slate-400 font-medium">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <div className="bg-civic-50 rounded-xl p-3 text-center">
            <p className="text-xs text-civic-700 font-medium">🗳️ Your vote is your voice</p>
            <p className="text-xs text-slate-500 mt-0.5">Hack2Skills PromptWars 2026</p>
          </div>
        </div>
      </aside>
    </>
  );
}
