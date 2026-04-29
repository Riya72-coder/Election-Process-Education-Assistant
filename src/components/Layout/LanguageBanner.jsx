import { motion, AnimatePresence } from 'framer-motion';
import { X, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * LanguageBanner
 * Shown when the browser language is a Scheduled Language not in the Big 6.
 * Props: nativeName, onAccept, onDismiss
 */
export default function LanguageBanner({ nativeName, onAccept, onDismiss }) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        key="lang-banner"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-civic-800 to-teal-700 text-white shadow-lg"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Languages size={18} className="flex-shrink-0 text-teal-300" />
            <p className="text-sm">
              {t('banner.detected')}{' '}
              <span className="font-bold text-teal-200">{nativeName}</span>.{' '}
              {t('banner.question')}{' '}
              <span className="text-white/50 text-xs">{t('banner.apiNote')}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onAccept}
              className="text-xs font-semibold bg-teal-400 hover:bg-teal-300 text-teal-950 px-3 py-1.5 rounded-lg transition-colors"
            >
              {t('banner.accept')}
            </button>
            <button
              onClick={onDismiss}
              className="text-xs text-white/70 hover:text-white px-2 py-1.5 rounded-lg transition-colors"
            >
              {t('banner.dismiss')}
            </button>
            <button onClick={onDismiss} className="text-white/50 hover:text-white ml-1">
              <X size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
