import { useState, useRef, useEffect } from 'react';
import { Menu, ExternalLink, ChevronDown, Check } from 'lucide-react';

const LANG_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
];

export default function Header({ activePhase, setMobileOpen, currentLanguage, setLanguage, header }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Use translated labels from content[lang].header, fallback gracefully
  const phaseLabels = header?.phaseLabels ?? {};
  const registerBtn = header?.registerBtn ?? 'Register to Vote';
  const activeLabel = phaseLabels[activePhase] || activePhase;
  const activeLang  = LANG_OPTIONS.find(l => l.code === currentLanguage) || LANG_OPTIONS[0];


  return (
    <header className="flex-shrink-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-6 gap-3">
      {/* Left — breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(prev => !prev)}
          className="lg:hidden w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors flex-shrink-0"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-sm truncate">
          <span className="text-slate-400">ElectionEdu</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-civic-700 truncate">{activeLabel}</span>
        </div>
        <span className="sm:hidden font-semibold text-civic-700 text-sm truncate">{activeLabel}</span>
      </div>

      {/* Right — language picker + CTA */}
      <div className="flex items-center gap-2 flex-shrink-0">

        {/* Language Dropdown */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-civic-700 border border-slate-200 hover:border-civic-300 px-3 py-1.5 rounded-xl transition-all"
          >
            <span>{activeLang.label}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50">
              {LANG_OPTIONS.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-civic-50 transition-colors"
                >
                  <span className={lang.code === currentLanguage ? 'font-semibold text-civic-700' : 'text-slate-700'}>
                    {lang.label}
                  </span>
                  {lang.code === currentLanguage && <Check size={14} className="text-civic-600" />}
                </button>
              ))}
              <div className="border-t border-slate-100 mt-1 px-4 py-2">
                <p className="text-[10px] text-slate-400 leading-snug">
                  Other languages auto-detected from your browser.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Register CTA */}
        <a
          href="https://voters.eci.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 bg-civic-600 hover:bg-civic-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
        >
          <ExternalLink size={12} />
          {registerBtn}
        </a>

        {/* Avatar badge */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-civic-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          IN
        </div>
      </div>
    </header>
  );
}
