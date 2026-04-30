import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldAlert, Map, ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Onboarding({ onComplete }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('civic_onboarding_seen');
    if (!hasSeen) {
      setShow(true);
    }
  }, []);

  const handleStart = () => {
    localStorage.setItem('civic_onboarding_seen', 'true');
    setShow(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative"
          >
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-civic-600 via-teal-500 to-orange-500" />
            
            <button 
              onClick={() => setShow(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400"
            >
              <X size={20} />
            </button>

            <div className="p-8 lg:p-10 pt-12">
              <div className="w-16 h-16 rounded-2xl bg-civic-50 flex items-center justify-center mb-6 mx-auto shadow-sm">
                <Sparkles className="text-civic-600" size={32} />
              </div>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-3 leading-tight">
                  {t('onboarding.title')}
                </h2>
                <p className="text-slate-500 text-lg">
                  {t('onboarding.subtitle')}
                </p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t('onboarding.feature1')}</h4>
                    <p className="text-sm text-slate-500">{t('onboarding.feature1Desc')}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t('onboarding.feature2')}</h4>
                    <p className="text-sm text-slate-500">{t('onboarding.feature2Desc')}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Map className="text-teal-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t('onboarding.feature3')}</h4>
                    <p className="text-sm text-slate-500">{t('onboarding.feature3Desc')}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full py-4 bg-civic-600 hover:bg-civic-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-civic-200 group active:scale-95"
              >
                {t('onboarding.button')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
