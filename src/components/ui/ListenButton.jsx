import { useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Reusable "Listen" button using Web Speech API.
 * @param {{ text: string, lang?: string }} props
 */
export default function ListenButton({ text, lang = 'en-US' }) {
  const [speaking, setSpeaking] = useState(false);

  // Map i18n codes to BCP-47 voice codes
  const LANG_MAP = {
    en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN',
    bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN',
  };

  const handleToggle = useCallback(() => {
    if (!window.speechSynthesis) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_MAP[lang] || 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }, [text, lang, speaking]);

  if (!window.speechSynthesis) return null;

  return (
    <button
      onClick={handleToggle}
      title={speaking ? 'Stop reading' : 'Listen to this section'}
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all
        ${speaking
          ? 'bg-teal-50 text-teal-700 border-teal-300 animate-pulse'
          : 'bg-white text-slate-500 border-slate-200 hover:text-teal-600 hover:border-teal-300'
        }`}
    >
      {speaking ? <VolumeX size={13} /> : <Volume2 size={13} />}
      {speaking ? 'Stop' : 'Listen'}
    </button>
  );
}
