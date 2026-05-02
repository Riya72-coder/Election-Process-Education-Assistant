import { motion } from 'framer-motion';
import { Users, MapPin, Building2, Flag, ArrowRight, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { overviewData } from '../../data/electionData';
import AISummaryCard from '../chat/AISummaryCard';
import PageAIBar from '../chat/PageAIBar';
import { useJourney } from '../journey/JourneyContext';
import VotingJourney from '../journey/VotingJourney';

const iconMap = { Users, MapPin, Building2, Flag };
const JOURNEY_PHASES = ['registration', 'campaigning', 'polling', 'results'];
const STAT_KEYS = ['voters', 'stations', 'seats', 'assemblies'];

const PHASE_STYLES = {
  registration: { badge: 'bg-teal-600 text-white',   ring: 'hover:border-teal-300' },
  campaigning:  { badge: 'bg-orange-500 text-white', ring: 'hover:border-orange-300' },
  polling:      { badge: 'bg-blue-700 text-white',   ring: 'hover:border-blue-300' },
  results:      { badge: 'bg-teal-600 text-white',   ring: 'hover:border-teal-300' },
};

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function OverviewPhase({ setActivePhase }) {
  const { t } = useTranslation();
  const { profile, setIsModalOpen, setIsBoothModalOpen } = useJourney();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* ── HERO ── */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-civic-900 via-civic-800 to-civic-600 rounded-3xl p-8 lg:p-14 text-white"
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-teal-400/10 rounded-full pointer-events-none" />

        <div className="relative max-w-2xl">
          <div className="flex items-center gap-1.5 mb-6">
            <span className="w-4 h-4 rounded-full bg-india-saffron" />
            <span className="w-4 h-4 rounded-full bg-white/90" />
            <span className="w-4 h-4 rounded-full bg-india-green" />
            <span className="ml-3 text-white/50 text-xs font-semibold uppercase tracking-widest">
              {t('overview.tagline')}
            </span>
          </div>

          <h2 className="font-display text-4xl lg:text-6xl font-extrabold leading-tight mb-4">
            {t('overview.heroTitle')}
          </h2>
          <p className="text-civic-100 text-base lg:text-lg leading-relaxed mb-3 max-w-xl">
            {t('overview.heroSubtitle')}
          </p>
          <p className="text-civic-200/70 text-sm leading-relaxed mb-10 max-w-lg">
            {t('overview.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-3">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivePhase('registration')}
              className="group inline-flex items-center gap-2.5 bg-teal-400 hover:bg-teal-300 text-teal-950 font-bold px-7 py-3.5 rounded-xl shadow-lg text-sm transition-colors duration-200"
            >
              {t('overview.ctaJourney')}
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
            {!profile && (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-civic-800 font-bold px-7 py-3.5 rounded-xl shadow-lg text-sm"
              >
                🚀 Start My AI Voting Journey
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivePhase('quiz')}
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white/80 hover:text-white font-semibold px-5 py-3.5 rounded-xl text-sm transition-all duration-200"
            >
              {t('overview.ctaEligibility')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsBoothModalOpen(true)}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-bold transition-all px-4 py-2 border border-white/10 hover:border-white/30 rounded-full"
            >
              <MapPin size={14} />
              Find nearby booth
            </motion.button>
          </div>

          <div className="mt-6">
            <PageAIBar
              askLabel="How does voting work?"
              askQuery="Give me an overview of how the Indian election process works."
              pageType="election process"
            />
          </div>
        </div>
      </motion.div>

      {profile && (
        <motion.div variants={itemVariants}>
          <VotingJourney 
            setActivePhase={setActivePhase} 
            onEditProfile={() => setIsModalOpen(true)}
          />
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewData.stats.map((stat, idx) => {
          const Icon = iconMap[stat.icon];
          return (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              className="section-card text-center cursor-default"
            >
              <div className="w-12 h-12 bg-civic-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                {Icon && <Icon size={22} className="text-civic-600" />}
              </div>
              <p className="font-display text-2xl font-bold text-civic-700">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">
                {t(`overview.stats.${STAT_KEYS[idx]}`)}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <AISummaryCard pageType="overview" accentColor="border-civic-600" />

      <motion.div
        variants={itemVariants}
        className="section-card flex flex-col md:flex-row items-start md:items-center gap-5 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-100"
      >
        <div className="w-14 h-14 flex-shrink-0 bg-teal-500 rounded-2xl flex items-center justify-center shadow-md">
          <Smartphone size={26} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-display font-bold text-teal-800 text-base mb-1">
            {t('overview.helplinkTitle')}
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t('overview.helplinkDesc')}
          </p>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.eci.citizen"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 btn-primary text-xs px-4 py-2"
        >
          {t('overview.helplinkBtn')}
        </a>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="font-display text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-civic-600 rounded-full" />
          {t('overview.journeyTitle')}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {JOURNEY_PHASES.map((phaseId, idx) => {
            const styles = PHASE_STYLES[phaseId];
            return (
              <motion.button
                key={phaseId}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePhase(phaseId)}
                className={`text-left p-5 rounded-2xl border-2 border-slate-100 bg-white transition-all duration-200 group ${styles.ring}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${styles.badge}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm group-hover:text-civic-700 transition-colors">
                      {t(`overview.journey.${phaseId}.phase`)}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                      {t(`overview.journey.${phaseId}.summary`)}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-civic-600 rounded-full" />
          {t('overview.timelineTitle')}
        </h3>
        <div className="relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-slate-100" />
          <div className="space-y-5">
            {t('overview.timeline', { returnObjects: true }).map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-civic-600 text-white flex items-center justify-center z-10">
                  <span className="text-[10px] font-bold leading-none">
                    {item.year.split('–')[0].slice(-2)}
                  </span>
                </div>
                <div className="flex-1 pb-2">
                  <span className="text-xs font-bold text-civic-600 uppercase tracking-wide">{item.year}</span>
                  <p className="text-sm text-slate-700 mt-0.5 leading-relaxed">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="did-you-know">
        <p className="text-sm font-bold uppercase tracking-wider mb-2">{t('overview.dykLabel')}</p>
        <p className="text-sm leading-relaxed">{t('overview.dykText')}</p>
      </motion.div>
    </motion.div>
  );
}
