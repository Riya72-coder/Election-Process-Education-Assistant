import { CheckCircle, Lock, ChevronRight, RotateCcw } from 'lucide-react';
import { useJourney } from './JourneyContext';
import { useChatTrigger } from '../chat/ChatContext';

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

const STATUS_LABELS = { completed: '✓ Done', active: '▶ In Progress', locked: '🔒 Locked' };

export default function VotingJourney({ setActivePhase }) {
  const { journey, completeStep, profile, resetJourney } = useJourney();
  const openChat = useChatTrigger();

  if (!profile) return null;

  const completedCount = journey.filter(s => s.status === 'completed').length;
  const progress = Math.round((completedCount / journey.length) * 100);
  const allDone = completedCount === journey.length;

  const handleLearn = (step) => {
    if (step.status === 'locked') return;
    setActivePhase(step.phase);
    openChat(`Guide me through ${step.title.toLowerCase()} in the Indian election process.`);
  };

  return (
    <div className="section-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            🚀 Your AI Voting Journey
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Personalized for {profile.age}-year-old in {profile.state}
            {profile.isFirstTime ? ' · First-time voter' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">{progress}%</span>
            <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-widest">Complete</p>
          </div>
          <button
            onClick={resetJourney}
            title="Reset journey"
            className="text-slate-400 hover:text-red-400 transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 w-full bg-slate-100 rounded-full mb-7 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {journey.map((step, idx) => {
          const s = STEP_STYLES[step.status];
          const isActive = step.status === 'active';
          const isLocked = step.status === 'locked';

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
                <h4 className={`text-sm font-bold mt-1 ${s.title}`}>{step.title}</h4>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {!isLocked && (
                  <button
                    onClick={() => handleLearn(step)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 bg-white rounded-lg py-2 transition-all"
                  >
                    Go to page <ChevronRight size={13} />
                  </button>
                )}
                {isActive && (
                  <button
                    onClick={() => completeStep(step.id)}
                    className="w-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 transition-all active:scale-95"
                  >
                    Mark as Complete ✓
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
          <p className="font-bold text-lg">🎉 Journey Complete!</p>
          <p className="text-sm text-white/80 mt-0.5">You've completed all election phases. Proud voter!</p>
        </div>
      )}
    </div>
  );
}
