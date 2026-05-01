import { CheckCircle, Lock, ChevronRight, RotateCcw, Fingerprint } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useJourney } from './JourneyContext';
import { useChatTrigger } from '../chat/ChatContext';

/**
 * A creative "Digital Ink" mark component.
 * As progress increases, a purple stain spreads on the finger.
 */
function DigitalInkMark({ progress }) {
  return (
    <div className="relative group cursor-help" title={`${progress}% Ready to Vote`}>
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Shadow/Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: progress > 0 ? [0.2, 0.4, 0.2] : 0 
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-indigo-500 rounded-full blur-xl"
        />
        
        {/* The Finger Icon (SVG) */}
        <svg viewBox="0 0 24 24" className="w-12 h-12 relative z-10 drop-shadow-md">
          <defs>
            <linearGradient id="inkGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset={`${progress}%`} stopColor="#6366f1" />
              <stop offset={`${progress}%`} stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>
          <path 
            d="M12 2C10.9 2 10 2.9 10 4V12.4L8.1 11.5C7.3 11.1 6.3 11.4 5.9 12.2C5.5 13 5.8 14 6.6 14.4L11 16.6V20C11 21.1 11.9 22 13 22H17C18.1 22 19 21.1 19 20V12C19 10.9 18.1 10 17 10H16V4C16 2.9 15.1 2 14 2H12Z" 
            fill="url(#inkGradient)"
            stroke="#cbd5e1"
            strokeWidth="0.5"
            className="transition-all duration-1000"
          />
          {/* Nail highlight to make it look like a finger */}
          <rect x="12" y="3" width="2" height="3" rx="1" fill={progress > 90 ? "#312e81" : "#cbd5e1"} className="opacity-40" />
        </svg>

        {/* Floating Sparkles when nearing completion */}
        {progress > 50 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Fingerprint size={16} className="text-indigo-400 animate-pulse" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Static styles — Tailwind must see full class names, no dynamic interpolation
const STEP_STYLES = {
  completed: {
    card:   'border-teal-200 bg-teal-50',
    badge:  'bg-teal-500 text-white',
    title:  'text-teal-800',
    status: 'text-teal-600',
  },
  active: {
    card:   'border-blue-400 bg-blue-50 shadow-lg ring-2 ring-blue-100',
    badge:  'bg-blue-600 text-white',
    title:  'text-slate-800',
    status: 'text-blue-600',
  },
  locked: {
    card:   'border-slate-200 bg-slate-50 opacity-55',
    badge:  'bg-slate-300 text-slate-500',
    title:  'text-slate-400',
    status: 'text-slate-400',
  },
};

export default function VotingJourney({ setActivePhase, onEditProfile }) {
  const { t } = useTranslation();
  const { journey, completeStep, profile, resetJourney } = useJourney();
  const openChat = useChatTrigger();

  if (!profile) return null;

  const STATUS_LABELS = { 
    completed: t('journey.doneLabel'), 
    active: t('journey.activeLabel'), 
    locked: t('journey.lockedLabel') 
  };

  const completedCount = journey.filter(s => s.status === 'completed').length;
  const progress = Math.round((completedCount / journey.length) * 100);
  const allDone = completedCount === journey.length;

  const handleLearn = (step) => {
    if (step.status === 'locked') return;
    setActivePhase(step.phase);
    const title = t(`journey.stepTitles.${step.id}`);
    openChat(`Guide me through ${title.toLowerCase()} in the Indian election process.`);
  };

  return (
    <div className="section-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            🚀 {t('journey.title')}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span>{t('journey.subtitle', { age: profile.age, state: profile.state })}</span>
            {profile.city && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-indigo-600 font-semibold">{profile.city}</span>
              </>
            )}
            {profile.isFirstTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>{t('journey.firstTime')}</span>
              </>
            )}
            <button 
              onClick={onEditProfile}
              className="ml-1 text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-tighter"
            >
              (Edit)
            </button>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">{progress}%</span>
            <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-widest">{t('journey.completeLabel')}</p>
          </div>
          <button
            onClick={resetJourney}
            title={t('journey.resetTitle')}
            className="text-slate-400 hover:text-red-400 transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Progress Section — The "Vibe" Tracker */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
        <DigitalInkMark progress={progress} />
        
        <div className="flex-1 w-full space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">
                Digital Ink Readiness
              </p>
              <h4 className="text-xl font-display font-bold text-slate-900 leading-none">
                {progress < 100 ? t('journey.activeLabel') : t('journey.doneLabel')}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-indigo-600 tabular-nums">{progress}%</span>
            </div>
          </div>
          
          <div className="h-4 w-full bg-white rounded-full overflow-hidden shadow-inner border border-slate-100 p-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out relative"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]" />
            </motion.div>
          </div>
          
          <p className="text-[10px] text-slate-400 font-medium">
            Completing all phases earns you the digital mark of democracy.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {journey.map((step, idx) => {
          const s = STEP_STYLES[step.status];
          const isActive = step.status === 'active';
          const isLocked = step.status === 'locked';
          const title = t(`journey.stepTitles.${step.id}`);

          return (
            <div
              key={step.id}
              className={`relative rounded-2xl border-2 p-5 transition-all duration-200 ${s.card}`}
            >
              {/* Step number badge + status icon */}
              <div className="flex items-center justify-between mb-4">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-base ${s.badge}`}>
                  {step.status === 'completed'
                    ? <CheckCircle size={18} />
                    : isLocked
                    ? <Lock size={15} />
                    : idx + 1}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${s.status}`}>
                  {STATUS_LABELS[step.status]}
                </span>
              </div>

              {/* Icon + Title */}
              <div className="mb-4">
                <span className="text-2xl">{step.icon}</span>
                <h4 className={`text-sm font-bold mt-1 ${s.title}`}>{title}</h4>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {!isLocked && (
                  <button
                    onClick={() => handleLearn(step)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 bg-white rounded-lg py-2 transition-all"
                  >
                    {t('journey.goLabel')} <ChevronRight size={13} />
                  </button>
                )}
                {isActive && (
                  <button
                    onClick={() => completeStep(step.id)}
                    className="w-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 transition-all active:scale-95"
                  >
                    {t('journey.markLabel')} ✓
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion banner */}
      {allDone && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white text-center">
          <p className="font-bold text-lg">{t('journey.completeTitle')}</p>
          <p className="text-sm text-white/80 mt-0.5">{t('journey.completeSubtitle')}</p>
        </div>
      )}
    </div>
  );
}
