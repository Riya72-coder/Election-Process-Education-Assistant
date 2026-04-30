import { useTranslation } from 'react-i18next';
import { Home, ClipboardList, Megaphone, Vote, BarChart3, HelpCircle, ChevronRight, X, Award, ShieldAlert } from 'lucide-react';

const PHASES = [
  { id: 'overview',     Icon: Home,          badge: '01' },
  { id: 'registration', Icon: ClipboardList, badge: '02' },
  { id: 'campaigning',  Icon: Megaphone,     badge: '03' },
  { id: 'polling',      Icon: Vote,          badge: '04' },
  { id: 'results',      Icon: BarChart3,     badge: '05' },
  { id: 'quiz',         Icon: HelpCircle,    badge: '06' },
  { id: 'mythbuster',   Icon: ShieldAlert,   badge: 'NEW' },
];

const COLORS = {
  overview:     { active: 'bg-civic-600 text-white shadow-civic', hover: 'hover:bg-civic-50 hover:text-civic-700' },
  registration: { active: 'bg-teal-600 text-white shadow-md',     hover: 'hover:bg-teal-50 hover:text-teal-700' },
  campaigning:  { active: 'bg-orange-500 text-white shadow-md',   hover: 'hover:bg-orange-50 hover:text-orange-700' },
  polling:      { active: 'bg-civic-600 text-white shadow-civic', hover: 'hover:bg-civic-50 hover:text-civic-700' },
  results:      { active: 'bg-teal-600 text-white shadow-md',     hover: 'hover:bg-teal-50 hover:text-teal-700' },
  quiz:         { active: 'bg-orange-500 text-white shadow-md',   hover: 'hover:bg-orange-50 hover:text-orange-700' },
  mythbuster:   { active: 'bg-rose-600 text-white shadow-md',     hover: 'hover:bg-rose-50 hover:text-rose-700' },
};

export default function Sidebar({ activePhase, setActivePhase, mobileOpen, setMobileOpen }) {
  const { t } = useTranslation();
  const nav = (id) => { setActivePhase(id); setMobileOpen(false); };

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed lg:relative inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-100 shadow-xl lg:shadow-none flex flex-col transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

        {/* Brand header */}
        <div className="relative bg-gradient-to-br from-civic-900 to-civic-700 p-6 flex-shrink-0">
          <button className="absolute top-4 right-4 text-white/60 hover:text-white lg:hidden" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Award size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-lg leading-tight">{t('sidebar.title')}</h1>
              <p className="text-white/60 text-xs">{t('sidebar.tagline')}</p>
            </div>
          </div>
          {/* Indian tricolour accent */}
          <div className="flex mt-4 rounded-full overflow-hidden h-1">
            <div className="flex-1 bg-india-saffron" /><div className="flex-1 bg-white/80" /><div className="flex-1 bg-india-green" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">{t('sidebar.sectionLabel')}</p>
          {PHASES.map(({ id, Icon, badge }) => {
            const isActive = activePhase === id;
            const c = COLORS[id] ?? COLORS.overview;
            return (
              <button
                key={id}
                onClick={() => nav(id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group text-left ${isActive ? c.active : `text-slate-600 ${c.hover}`}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'}`}>
                  <Icon size={16} />
                </div>
                <span className="flex-1">{t(`sidebar.phases.${id}`)}</span>
                {id === 'quiz' && (
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-white/20 px-2 py-0.5 rounded-full">{t('sidebar.tryIt')}</span>
                )}
                {isActive
                  ? <ChevronRight size={14} className="opacity-70" />
                  : <span className="text-xs text-slate-400 font-medium">{badge}</span>
                }
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <div className="bg-civic-50 rounded-xl p-3 text-center">
            <p className="text-xs text-civic-700 font-medium">{t('sidebar.footerVote')}</p>
            <p className="text-xs text-slate-500 mt-0.5">{t('sidebar.footerEvent')}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
