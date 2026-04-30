import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Send, Sparkles, HelpCircle } from 'lucide-react';
import { checkElectionClaim } from '../chat/aiResponses';

export default function MythBuster() {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const EXAMPLES = t('mythbuster.examples', { returnObjects: true }) || [];

  const handleCheck = () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI processing delay
    setTimeout(() => {
      const data = checkElectionClaim(input, i18n.language);
      setResult(data);
      setIsAnalyzing(false);
    }, 800);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'allowed':
        return {
          icon: CheckCircle2,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-100',
          label: t('mythbuster.allowed'),
          accent: 'bg-emerald-500'
        };
      case 'not_allowed':
        return {
          icon: XCircle,
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          border: 'border-rose-100',
          label: t('mythbuster.notAllowed'),
          accent: 'bg-rose-500'
        };
      case 'misleading':
      default:
        return {
          icon: AlertTriangle,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-100',
          label: t('mythbuster.misleading'),
          accent: 'bg-amber-500'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">🛑 {t('mythbuster.title')}</h1>
            <p className="text-slate-500">{t('mythbuster.subtitle')}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-focus-within:opacity-10 transition-opacity">
              <Sparkles size={120} />
            </div>
            
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              {t('mythbuster.inputLabel')}
            </label>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('mythbuster.placeholder')}
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none transition-all resize-none text-slate-700"
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <HelpCircle size={14} />
                <span>Powered by CivicGuide AI</span>
              </div>
              
              <button
                onClick={handleCheck}
                disabled={isAnalyzing || !input.trim()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  isAnalyzing || !input.trim() 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-200 active:scale-95'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles size={18} />
                    </motion.div>
                    {t('mythbuster.analyzing')}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t('mythbuster.checkBtn')}
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500 mb-3 ml-1">{t('mythbuster.examplesLabel')}</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setInput(ex)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition-all active:scale-95 text-left"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`rounded-3xl border ${getStatusConfig(result.status).border} bg-white shadow-xl overflow-hidden h-full flex flex-col`}
              >
                <div className={`${getStatusConfig(result.status).bg} p-6 border-b ${getStatusConfig(result.status).border}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusConfig(result.status).bg} ${getStatusConfig(result.status).color} border ${getStatusConfig(result.status).border}`}>
                      {getStatusConfig(result.status).label}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{t('mythbuster.confidence')}:</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 ${
                        result.confidence === 'High' ? 'text-emerald-600' : 
                        result.confidence === 'Medium' ? 'text-amber-600' : 'text-slate-500'
                      }`}>
                        {result.confidence}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${getStatusConfig(result.status).bg} border ${getStatusConfig(result.status).border} flex items-center justify-center ${getStatusConfig(result.status).color}`}>
                      {(() => {
                        const Icon = getStatusConfig(result.status).icon;
                        return <Icon size={24} />;
                      })()}
                    </div>
                    <h3 className={`text-xl font-bold ${getStatusConfig(result.status).color}`}>
                      {result.status === 'allowed' ? t('mythbuster.success') : 
                       result.status === 'not_allowed' ? t('mythbuster.violation') : t('mythbuster.verification')}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-6 flex-1">
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('mythbuster.explanationLabel')}</h4>
                    <p className="text-slate-700 leading-relaxed">{result.explanation}</p>
                  </section>

                  <section className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <ShieldAlert size={14} className="text-slate-400" />
                      {t('mythbuster.factLabel')}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed italic">
                      "{result.correctInfo}"
                    </p>
                  </section>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 text-center uppercase font-medium tracking-widest leading-tight">
                    {t('mythbuster.footerNote')}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-4">
                  <ShieldAlert size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-400">{t('mythbuster.analysisPending')}</h3>
                <p className="text-sm text-slate-400 max-w-[200px] mt-2">
                  {t('mythbuster.pendingDesc')}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
