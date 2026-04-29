/**
 * @deprecated
 * This custom hook was part of the old manual translation system.
 * The project now uses react-i18next exclusively.
 * Use `import { useTranslation } from 'react-i18next'` instead.
 *
 * Kept in place to avoid breaking any external references during transition.
 * Safe to delete once all consumers have been confirmed removed.
 */
export function useTranslation() {
  throw new Error(
    '[useTranslation] This custom hook is deprecated. ' +
    "Import useTranslation from 'react-i18next' instead."
  );
}
