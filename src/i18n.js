import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import bn from './locales/bn.json';
import ta from './locales/ta.json';
import te from './locales/te.json';

/** Supported language codes */
export const SUPPORTED_LANGS = ['en', 'hi', 'mr', 'bn', 'ta', 'te'];

/** Detect browser language and return closest supported code (defaults to 'en') */
function detectLang() {
  const raw = navigator.language || navigator.languages?.[0] || 'en';
  const code = raw.split('-')[0].toLowerCase();
  return SUPPORTED_LANGS.includes(code) ? code : 'en';
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      mr: { translation: mr },
      bn: { translation: bn },
      ta: { translation: ta },
      te: { translation: te },
    },
    lng: detectLang(),
    fallbackLng: 'en',
    interpolation: {
      // React already escapes values — no double-escaping needed
      escapeValue: false,
    },
  });

export default i18n;
