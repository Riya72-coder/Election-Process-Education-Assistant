import { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award, AlertTriangle, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/** Thin progress bar shown during the quiz */
function ProgressBar({ current, total }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-civic-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}

export default function VoterEligibilityQuiz() {
  const { t } = useTranslation();

  // Pull all quiz strings from the active locale
  const questions    = t('quiz.questions_data', { returnObjects: true });
  const nextStepsList = t('quiz.nextStepsList', { returnObjects: true });

  const [step, setStep]               = useState(0);
  const [answers, setAnswers]         = useState([]);
  const [selectedOption, setSelected] = useState(null);
  const [showFeedback, setFeedback]   = useState(false);
  const [finished, setFinished]       = useState(false);

  const currentQ   = questions[step - 1];
  const isIneligible = answers.some((a) => !a.eligible);

  const handleSelect = (option) => {
    setSelected(option);
    setFeedback(true);
    setTimeout(() => {
      const updated = [...answers, { q: currentQ.id, eligible: option.eligible, option }];
      setAnswers(updated);
      if (!option.eligible) { setFinished(true); return; }
      if (step >= questions.length) { setFinished(true); }
      else { setSelected(null); setFeedback(false); setStep((s) => s + 1); }
    }, 2500);
  };

  const reset = () => {
    setStep(0); setAnswers([]); setSelected(null); setFeedback(false); setFinished(false);
  };

  /* ── INTRO ── */
  if (step === 0) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="section-card text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-civic-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-civic">
            <HelpCircle size={40} className="text-white" />
          </div>
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
              {t('quiz.title')}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
              {t('quiz.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-civic-50 rounded-xl">
              <p className="font-bold text-civic-700 text-lg">{questions.length}</p>
              <p className="text-xs text-slate-500">{t('quiz.questions')}</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-xl">
              <p className="font-bold text-teal-700 text-lg">2 min</p>
              <p className="text-xs text-slate-500">{t('quiz.time')}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <p className="font-bold text-green-700 text-lg">100%</p>
              <p className="text-xs text-slate-500">{t('quiz.private')}</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 text-left">
            <p className="font-semibold mb-1">⚠️ Disclaimer</p>
            <p>{t('quiz.disclaimer')}</p>
          </div>
          <button onClick={() => setStep(1)} className="btn-primary text-base px-8 py-3 mx-auto">
            {t('quiz.startBtn')} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  /* ── RESULT ── */
  if (finished) {
    const eligible   = !isIneligible;
    const lastAnswer = answers[answers.length - 1];
    return (
      <div className="max-w-2xl mx-auto animate-bounce-in">
        <div className="section-card text-center space-y-6">
          {eligible ? (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Award size={44} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-green-700">
                {t('quiz.eligibleTitle')}
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left">
                <p className="font-semibold text-green-800 text-sm mb-2">{t('quiz.nextSteps')}:</p>
                <ul className="space-y-2 text-sm text-green-700">
                  {nextStepsList.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
                      {item.includes('voters.eci.gov.in') ? (
                        <span>
                          {item.split('voters.eci.gov.in')[0]}
                          <a
                            href="https://voters.eci.gov.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline font-medium"
                          >
                            voters.eci.gov.in
                          </a>
                          {item.split('voters.eci.gov.in')[1]}
                        </span>
                      ) : item}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <AlertTriangle size={44} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-orange-700">
                {t('quiz.ineligibleTitle')}
              </h3>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-left text-sm text-orange-700">
                <p className="font-semibold mb-1">{t('quiz.noteLabel')}</p>
                <p>{lastAnswer?.option?.feedback}</p>
              </div>
            </>
          )}

          {/* Answer summary */}
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {t('quiz.yourAnswers')}
            </p>
            <div className="space-y-2">
              {answers.map((ans, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600">Q{ans.q}: {ans.option.label}</span>
                  {ans.eligible
                    ? <CheckCircle size={16} className="text-green-500" />
                    : <XCircle    size={16} className="text-red-400" />}
                </div>
              ))}
            </div>
          </div>

          <button onClick={reset} className="btn-outline mx-auto">
            <RotateCcw size={16} /> {t('quiz.retake')}
          </button>
        </div>
      </div>
    );
  }

  /* ── QUESTION ── */
  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <div className="section-card space-y-6">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>{t('quiz.questions')} {step} of {questions.length}</span>
            <span>{Math.round(((step - 1) / questions.length) * 100)}% {t('quiz.doneLabel')}</span>
          </div>
          <ProgressBar current={step - 1} total={questions.length} />
        </div>

        {/* Question */}
        <div>
          <div className="w-10 h-10 rounded-xl bg-civic-100 flex items-center justify-center mb-4">
            <span className="font-bold text-civic-600 text-sm">Q{step}</span>
          </div>
          <h3 className="font-display text-xl font-bold text-slate-800 mb-2">{currentQ.question}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">{currentQ.subtext}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected  = selectedOption?.value === opt.value;
            const showResult  = showFeedback && isSelected;
            return (
              <button
                key={opt.value}
                onClick={() => !showFeedback && handleSelect(opt)}
                disabled={showFeedback}
                className={`w-full text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                  showResult
                    ? opt.eligible
                      ? 'border-green-400 bg-green-50 text-green-800'
                      : 'border-red-400 bg-red-50 text-red-800'
                    : isSelected
                      ? 'border-civic-400 bg-civic-50 text-civic-700'
                      : showFeedback
                        ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
                        : 'border-slate-200 hover:border-civic-300 hover:bg-civic-50 text-slate-700 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.label}</span>
                  {showResult && (
                    opt.eligible
                      ? <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                      : <XCircle    size={18} className="text-red-500 flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && selectedOption && (
          <div className={`rounded-xl p-4 text-sm leading-relaxed animate-slide-up ${
            selectedOption.eligible
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <p className="font-semibold mb-1">
              {selectedOption.eligible ? t('quiz.correctLabel') : t('quiz.incorrectLabel')}
            </p>
            <p>{selectedOption.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
