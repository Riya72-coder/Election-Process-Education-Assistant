import { motion } from 'framer-motion';
import { CheckCircle, FileText, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AISummaryCard from '../chat/AISummaryCard';
import PageAIBar from '../chat/PageAIBar';
import ListenButton from '../ui/ListenButton';

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
};

export default function RegistrationPhase() {
  const { t } = useTranslation();

  const epicPoints   = t('registration.epicPoints',  { returnObjects: true });
  const eligibility  = t('registration.eligibility', { returnObjects: true });
  const steps        = t('registration.steps',       { returnObjects: true });
  const forms        = t('registration.forms',       { returnObjects: true });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* Hero */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-teal-700 to-teal-500 rounded-3xl p-8 text-white"
      >
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full" />
        <div className="relative">
          <span className="phase-badge bg-white/20 text-white mb-4">{t('registration.phase')}</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{t('registration.title')}</h2>
          <p className="text-teal-100 font-medium mb-2">{t('registration.subtitle')}</p>
          <p className="text-teal-50 text-sm max-w-2xl leading-relaxed">{t('registration.description')}</p>
          <div className="mt-3">
            <ListenButton text={`${t('registration.subtitle')}. ${t('registration.description')}`} lang={t('_lang', 'en')} />
          </div>
          {/* AI Bar inside hero */}
          <div className="mt-5">
            <PageAIBar
              askLabel="Can I register?"
              askQuery="I want to register to vote. What are the steps and documents needed?"
              pageType="voter registration"
            />
          </div>
        </div>
      </motion.div>

      {/* AI Summary Card */}
      <AISummaryCard pageType="registration" accentColor="border-teal-500" />

      {/* EPIC Highlight */}
      <motion.div variants={itemVariants} className="section-card border-l-4 border-teal-500 rounded-2xl">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <CreditCard size={24} className="text-teal-700" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-teal-800">
              {t('registration.epicTitle')}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('registration.epicSubtitle')}
            </p>
          </div>
        </div>
        <ul className="space-y-2.5">
          {epicPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckCircle size={15} className="text-teal-500 flex-shrink-0 mt-0.5" />
              {pt}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Eligibility */}
      <motion.div variants={itemVariants} className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <CheckCircle size={20} className="text-teal-600" />
          {t('registration.eligibilityTitle')}
        </h3>
        <div className="space-y-3">
          {eligibility.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-teal-50 border border-teal-100">
              <CheckCircle size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-bold text-teal-800">{item.label}: </span>
                <span className="text-sm text-slate-600">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Steps */}
      <motion.div variants={itemVariants} className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-teal-600 rounded-full" />
          {t('registration.stepsTitle')}
        </h3>
        <div className="space-y-5">
          {steps.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                {idx + 1}
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                <p className="text-slate-500 text-sm leading-relaxed mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Forms table */}
      <motion.div variants={itemVariants} className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <FileText size={20} className="text-teal-600" />
          {t('registration.formsTitle')}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-teal-50">
                <th className="text-left px-4 py-3 text-teal-700 font-semibold rounded-l-lg">
                  {t('registration.formLabel')}
                </th>
                <th className="text-left px-4 py-3 text-teal-700 font-semibold rounded-r-lg">
                  {t('registration.purposeLabel')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {forms.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-teal-700">{row.form}</td>
                  <td className="px-4 py-3 text-slate-600">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Did You Know */}
      <motion.div variants={itemVariants} className="did-you-know">
        <p className="text-sm font-bold uppercase tracking-wider mb-2">
          {t('overview.dykLabel')}
        </p>
        <p className="text-sm leading-relaxed">{t('overview.dykText')}</p>
      </motion.div>
    </motion.div>
  );
}
