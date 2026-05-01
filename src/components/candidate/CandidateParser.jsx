import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, BarChart3, Info, Sparkles } from 'lucide-react';
import { parseCandidatePromise } from '../chat/aiResponses';

export default function CandidateParser() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    // Simulated AI processing delay
    setTimeout(() => {
      const result = parseCandidatePromise(input);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="section-card border-t-4 border-indigo-500 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Brain size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Search size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Know Your Candidate Promise</h3>
            <p className="text-xs text-slate-500">Paste a candidate's promise to analyze its civic impact.</p>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 'We will build 50 new schools and upgrade the local healthcare centers...'"
            className="w-full h-32 p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-300 outline-none transition-all text-sm resize-none bg-slate-50/50"
          />
          
          <button
            onClick={handleAnalyze}
            disabled={!input.trim() || isAnalyzing}
            className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
              isAnalyzing 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
            }`}
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={18} />
                </motion.div>
                AI Analyzing...
              </>
            ) : (
              <>
                <Brain size={18} />
                Analyze Impact
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Category</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white border border-indigo-200 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
                      {analysis.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 sm:text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Civic Impact Score</p>
                  <div className="flex items-center sm:justify-end gap-2">
                    <span className="text-2xl font-black text-indigo-600">{analysis.score}/10</span>
                  </div>
                </div>
              </div>

              {/* Score Bar */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-white rounded-full overflow-hidden p-0.5 border border-indigo-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis.score * 10}%` }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      analysis.score > 7 ? 'from-green-400 to-teal-500' : 
                      analysis.score > 4 ? 'from-indigo-400 to-indigo-600' : 
                      'from-orange-400 to-red-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span>Modest</span>
                  <span>Transformative</span>
                </div>
              </div>

              <div className="bg-white/80 p-4 rounded-2xl border border-indigo-100/50 flex gap-3 items-start shadow-sm">
                <Info size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{analysis.explanation}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
