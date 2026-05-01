import { useState, useCallback, useEffect } from 'react';
import { Volume2, VolumeX, AlertCircle } from 'lucide-react';

/**
 * Robust "Listen" button using Web Speech API with fuzzy voice matching and error handling.
 * @param {{ text: string, lang?: string }} props
 */
export default function ListenButton({ text, lang = 'en' }) {
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState(null);

  // Expanded language name mappings for fuzzy search
  const LANG_SEARCH = {
    hi: ['hi', 'hindi'],
    mr: ['mr', 'marathi'],
    bn: ['bn', 'bengali'],
    ta: ['ta', 'tamil'],
    te: ['te', 'telugu'],
    en: ['en', 'english', 'india']
  };

  const getBestVoice = useCallback((targetLang) => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const terms = LANG_SEARCH[targetLang] || [targetLang];

    // 1. Try exact BCP-47 match (e.g., 'hi-IN')
    const bcpMatch = voices.find(v => v.lang.toLowerCase().startsWith(targetLang.toLowerCase()));
    if (bcpMatch) return bcpMatch;

    // 2. Fuzzy match in name or lang string (e.g., 'Google Hindi')
    return voices.find(v => {
      const name = v.name.toLowerCase();
      const vlang = v.lang.toLowerCase();
      return terms.some(term => name.includes(term) || vlang.includes(term));
    });
  }, []);

  const handleToggle = useCallback(() => {
    if (!window.speechSynthesis) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    setError(null);
    const voice = getBestVoice(lang);

    // Validation: If no native voice found for non-English content, warn user
    if (lang !== 'en' && !voice) {
      setError('Native voice not found on this device');
      setTimeout(() => setError(null), 4000);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.lang = voice ? voice.lang : (lang === 'en' ? 'en-IN' : lang);
    utterance.rate = 0.95; // Slightly slower for better clarity
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech Synthesis Error:', e);
      setSpeaking(false);
      setError('Voice playback failed');
      setTimeout(() => setError(null), 3000);
    };

    window.speechSynthesis.speak(utterance);
  }, [text, lang, speaking, getBestVoice]);

  // Stop speaking if text or language changes
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, lang]);

  // Pre-load voices and handle async loading
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const load = () => window.speechSynthesis.getVoices();
      load();
      window.speechSynthesis.onvoiceschanged = load;
    }
  }, []);

  if (!window.speechSynthesis) return null;

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleToggle}
        title={speaking ? 'Stop' : 'Listen (Text-to-Speech)'}
        className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all shadow-sm
          ${speaking
            ? 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse'
            : 'bg-white/90 text-slate-600 border-slate-200 hover:text-indigo-600 hover:border-indigo-300 hover:bg-white'
          }`}
      >
        {speaking ? <VolumeX size={13} /> : <Volume2 size={13} />}
        {speaking ? 'STOP' : 'LISTEN'}
      </button>

      {/* Error Toast */}
      {error && (
        <div className="absolute left-0 -bottom-9 whitespace-nowrap bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-xl animate-bounce-in z-[100]">
          <AlertCircle size={12} className="text-amber-400" />
          {error}
        </div>
      )}
    </div>
  );
}
