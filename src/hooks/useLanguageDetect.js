import { useState, useEffect } from 'react';
import { PRIMARY_LANGS, detectedLangNames } from '../data/translations';

/**
 * useLanguageDetect()
 *
 * Reads navigator.language (e.g. "gu-IN", "pa", "ml-IN").
 * - If the browser lang is one of the Big 6  → auto-select it silently.
 * - If it's another Scheduled Language        → show the "We detected…" banner.
 * - Otherwise                                 → default to 'en', no banner.
 *
 * Returns:
 *   detectedLang      — ISO code of what the browser reported (or null)
 *   detectedNativeName — native-script name for the banner (e.g. 'ગુજરાતી')
 *   showBanner        — whether to render the suggestion banner
 *   dismissBanner     — call to hide the banner
 */
export function useLanguageDetect(setLanguage) {
  const [detectedLang, setDetectedLang] = useState(null);
  const [detectedNativeName, setDetectedNativeName] = useState('');
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const raw = navigator.language || navigator.languages?.[0] || '';
    // Normalise: 'gu-IN' → 'gu', 'zh-Hant-TW' → 'zh'
    const code = raw.split('-')[0].toLowerCase();

    if (!code) return;

    if (PRIMARY_LANGS.includes(code)) {
      // Auto-apply the detected Big-6 language
      setLanguage(code);
    } else if (detectedLangNames[code]) {
      // Non-Big-6 Scheduled Language → show banner
      setDetectedLang(code);
      setDetectedNativeName(detectedLangNames[code]);
      setShowBanner(true);
    }
    // Otherwise: unknown language → silently use English
  }, [setLanguage]);

  const dismissBanner = () => setShowBanner(false);

  const acceptTranslation = () => {
    // In future: call translateWithAPI and switch content
    // For now, just dismiss gracefully
    setShowBanner(false);
  };

  return { detectedLang, detectedNativeName, showBanner, dismissBanner, acceptTranslation };
}
