/**
 * @deprecated
 * This hook was part of the old manual translation system.
 * Language detection is now handled inside `src/i18n.js` via the
 * built-in browser-language detection in i18next.
 *
 * The LanguageBanner component (for non-Big-6 Scheduled Languages)
 * should be wired via App.jsx if needed in future.
 *
 * Safe to delete once all consumers have been confirmed removed.
 */
export function useLanguageDetect() {
  throw new Error(
    '[useLanguageDetect] This custom hook is deprecated. ' +
    'Language detection is now handled by i18next in src/i18n.js.'
  );
}
