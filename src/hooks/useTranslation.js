import { translations, PRIMARY_LANGS } from '../data/translations';

/**
 * useTranslation(currentLanguage)
 * Returns t(key) — resolves key from the active language,
 * falls back to English for any missing key.
 */
export function useTranslation(currentLanguage) {
  const lang = PRIMARY_LANGS.includes(currentLanguage) ? currentLanguage : 'en';
  const langData = translations[lang] || translations.en;

  const t = (key) => langData[key] ?? translations.en[key] ?? key;

  return { t, lang };
}
