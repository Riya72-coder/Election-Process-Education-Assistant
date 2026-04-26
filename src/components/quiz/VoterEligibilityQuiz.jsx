import { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award, AlertTriangle, HelpCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

// Build question list from translation keys
function buildQuestions(t) {
  return [
    {
      id: 1,
      question: t('Q1'),
      subtext: 'You must be 18 years or older on January 1 of the year you register.',
      options: [
        { label: t('Q1_A'), value: 'under18', eligible: false, feedback: "You're on your way! You need to be at least 18 years old to vote. 🌟" },
        { label: t('Q1_B'), value: '18to25', eligible: true, feedback: "First-time voters are the heart of democracy! 🎉" },
        { label: t('Q1_C'), value: '26to60', eligible: true, feedback: "You're in the prime of your civic life! 💪" },
        { label: t('Q1_D'), value: 'over60', eligible: true, feedback: "Senior voters bring decades of wisdom. Your voice matters! 🌺" },
      ],
    },
    {
      id: 2,
      question: t('Q2'),
      subtext: 'Only Indian citizens are entitled to vote in Indian elections.',
      options: [
        { label: t('Q2_A'), value: 'citizen', eligible: true, feedback: "Wonderful! As an Indian citizen, you are entitled to vote. 🇮🇳" },
        { label: t('Q2_B'), value: 'foreign', eligible: false, feedback: "Voting is reserved for Indian citizens. You can still engage with democracy through civic education!" },
        { label: t('Q2_C'), value: 'oci', eligible: false, feedback: "OCI / PIO cardholders are not eligible to vote. Indian nationality can be taken up formally." },
      ],
    },
    {
      id: 3,
      question: t('Q3'),
      subtext: 'Section 16 of the Representation of the People Act, 1950.',
      options: [
        { label: t('Q3_A'), value: 'no', eligible: true, feedback: "Great! This criterion doesn't apply to you. Let's continue." },
        { label: t('Q3_B'), value: 'yes', eligible: false, feedback: "A legal declaration of unsound mind creates a temporary disqualification. If revoked, eligibility is restored." },
      ],
    },
    {
      id: 4,
      question: t('Q4'),
      subtext: 'E.g., convicted of election offences under the RPA 1951.',
      options: [
        { label: t('Q4_A'), value: 'no', eligible: true, feedback: "Excellent! You're clear on this criterion. Nearly there!" },
        { label: t('Q4_B'), value: 'yes', eligible: false, feedback: "A conviction for election offences leads to a disqualification period. Once it lapses, you become eligible again." },
      ],
    },
    {
      id: 5,
      question: t('Q5'),
      subtext: 'Your name must appear in the Electoral Roll to cast a valid vote.',
      options: [
        { label: t('Q5_A'), value: 'enrolled', eligible: true, feedback: "You're all set! Verify at voters.eci.gov.in. See you at the polling booth!" },
        { label: t('Q5_B'), value: 'plan', eligible: true, feedback: "Visit voters.eci.gov.in or fill Form 6 to register. It takes just minutes!" },
        { label: t('Q5_C'), value: 'dunno', eligible: true, feedback: "Don't worry — visit voters.eci.gov.in and click 'Register as New Voter'. Your BLO can also help!" },
      ],
    },
  ];
}

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

export default function VoterEligibilityQuiz({ language = 'en' }) {
  const { t } = useTranslation(language);
  const questions = buildQuestions(t);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentQ = questions[step - 1];
  const isIneligible = answers.some(a => !a.eligible);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);
    setTimeout(() => {
      const newAnswers = [...answers, { q: currentQ.id, eligible: option.eligible, option }];
      setAnswers(newAnswers);
      if (!option.eligible) { setFinished(true); return; }
      if (step >= questions.length) { setFinished(true); }
      else { setSelectedOption(null); setShowFeedback(false); setStep(s => s + 1); }
    }, 2500);
  };

  const reset = () => {
    setStep(0); setAnswers([]); setSelectedOption(null); setShowFeedback(false); setFinished(false);
  };

  // Intro
  if (step === 0) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="section-card text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-civic-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-civic">
            <HelpCircle size={40} className="text-white" />
          </div>
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-slate-800 mb-3">{t('QUIZ_TITLE')}</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">{t('QUIZ_SUBTITLE')}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-civic-50 rounded-xl">
              <p className="font-bold text-civic-700 text-lg">{questions.length}</p>
              <p className="text-xs text-slate-500">Questions</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-xl">
              <p className="font-bold text-teal-700 text-lg">2 min</p>
              <p className="text-xs text-slate-500">Time</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <p className="font-bold text-green-700 text-lg">100%</p>
              <p className="text-xs text-slate-500">Private</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 text-left">
            <p className="font-semibold mb-1">⚠️ Disclaimer</p>
            <p>{t('QUIZ_DISCLAIMER')}</p>
          </div>
          <button onClick={() => setStep(1)} className="btn-primary text-base px-8 py-3 mx-auto">
            {t('QUIZ_START')} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Result
  if (finished) {
    const eligible = !isIneligible;
    const lastAnswer = answers[answers.length - 1];
    return (
      <div className="max-w-2xl mx-auto animate-bounce-in">
        <div className="section-card text-center space-y-6">
          {eligible ? (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Award size={44} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-green-700">{t('ELIGIBLE_TITLE')}</h3>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left">
                <p className="font-semibold text-green-800 text-sm mb-2">{t('NEXT_STEPS')}:</p>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="mt-0.5 flex-shrink-0" />Check your name at <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-medium">voters.eci.gov.in</a></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="mt-0.5 flex-shrink-0" />If not registered, fill Form 6 online — under 5 minutes</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="mt-0.5 flex-shrink-0" />On polling day, carry your Voter ID or any valid photo ID</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <AlertTriangle size={44} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-orange-700">{t('INELIGIBLE_TITLE')}</h3>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-left text-sm text-orange-700">
                <p className="font-semibold mb-1">💬 A Note of Encouragement:</p>
                <p>{lastAnswer?.option?.feedback}</p>
              </div>
            </>
          )}
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t('YOUR_ANSWERS')}</p>
            <div className="space-y-2">
              {answers.map((ans, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600">Q{ans.q}: {ans.option.label}</span>
                  {ans.eligible ? <CheckCircle size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-400" />}
                </div>
              ))}
            </div>
          </div>
          <button onClick={reset} className="btn-outline mx-auto">
            <RotateCcw size={16} /> {t('RETAKE')}
          </button>
        </div>
      </div>
    );
  }

  // Question
  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <div className="section-card space-y-6">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Question {step} of {questions.length}</span>
            <span>{Math.round(((step - 1) / questions.length) * 100)}% done</span>
          </div>
          <ProgressBar current={step - 1} total={questions.length} />
        </div>
        <div>
          <div className="w-10 h-10 rounded-xl bg-civic-100 flex items-center justify-center mb-4">
            <span className="font-bold text-civic-600 text-sm">Q{step}</span>
          </div>
          <h3 className="font-display text-xl font-bold text-slate-800 mb-2">{currentQ.question}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">{currentQ.subtext}</p>
        </div>
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption?.value === opt.value;
            const showResult = showFeedback && isSelected;
            return (
              <button
                key={opt.value}
                onClick={() => !showFeedback && handleSelect(opt)}
                disabled={showFeedback}
                className={`w-full text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${showResult
                    ? opt.eligible ? 'border-green-400 bg-green-50 text-green-800' : 'border-red-400 bg-red-50 text-red-800'
                    : isSelected ? 'border-civic-400 bg-civic-50 text-civic-700'
                      : showFeedback ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
                        : 'border-slate-200 hover:border-civic-300 hover:bg-civic-50 text-slate-700 cursor-pointer'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.label}</span>
                  {showResult && (opt.eligible
                    ? <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                    : <XCircle size={18} className="text-red-500 flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {showFeedback && selectedOption && (
          <div className={`rounded-xl p-4 text-sm leading-relaxed animate-slide-up ${selectedOption.eligible ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
            <p className="font-semibold mb-1">{selectedOption.eligible ? '✅ Great!' : '❌ Not Eligible'}</p>
            <p>{selectedOption.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
