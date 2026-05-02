import { useState, useEffect, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import OverviewPhase from './components/phases/OverviewPhase';
import RegistrationPhase from './components/phases/RegistrationPhase';
import CampaigningPhase from './components/phases/CampaigningPhase';
import PollingPhase from './components/phases/PollingPhase';
import ResultsPhase from './components/phases/ResultsPhase';
import VoterEligibilityQuiz from './components/quiz/VoterEligibilityQuiz';
import MythBuster from './components/mythbuster/MythBuster';
import { getScriptConfig, isRTL } from './data/languages';
import ChatAssistant from './components/chat/ChatAssistant';
import { ChatContext } from './components/chat/ChatContext';
import Onboarding from './components/ui/Onboarding';
import QuickToolbar from './components/ui/QuickToolbar';
import { useJourney } from './components/journey/JourneyContext';
import ProfileModal from './components/journey/ProfileModal';
import BoothFinderModal from './components/ui/BoothFinderModal';

const phaseComponents = {
  overview: OverviewPhase,
  registration: RegistrationPhase,
  campaigning: CampaigningPhase,
  polling: PollingPhase,
  results: ResultsPhase,
  quiz: VoterEligibilityQuiz,
  mythbuster: MythBuster,
};

const pageVariants = {
  initial: { opacity: 0, x: 32, filter: 'blur(4px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, x: -24, filter: 'blur(4px)', transition: { duration: 0.22, ease: [0.55, 0, 1, 0.45] } },
};

export default function App() {
  const { i18n } = useTranslation();
  const [activePhase, setActivePhase] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isOpen } = useContext(ChatContext);
  const { isModalOpen, setIsModalOpen, isBoothModalOpen, setIsBoothModalOpen } = useJourney();

  // Apply RTL direction + script-specific CSS font vars on language change
  useEffect(() => {
    const lang = i18n.language;
    const { font, lineScale } = getScriptConfig(lang);
    document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.style.setProperty('--app-font', font);
    document.documentElement.style.setProperty('--app-line-scale', lineScale);
  }, [i18n.language]);

  const ActiveComponent = phaseComponents[activePhase] || OverviewPhase;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        activePhase={activePhase}
        setActivePhase={setActivePhase}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header activePhase={activePhase} setMobileOpen={setMobileOpen} />

        {/* ── Main Content Area + AI Panel Container ── */}
        <div className="flex-1 flex min-h-0 relative">
          <motion.main
            id="main-content"
            initial={false}
            animate={{ 
              width: isOpen ? '60%' : '100%',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-full overflow-y-auto p-4 lg:p-8 relative"
          >
            {/* Backdrop Blur Overlay when AI is active */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 bg-slate-900/5 backdrop-blur-[2px] pointer-events-none"
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePhase}-${i18n.language}`}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onAnimationComplete={() =>
                  document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' })
                }
              >
                <ActiveComponent setActivePhase={setActivePhase} />
                <div className="h-8" />
              </motion.div>
            </AnimatePresence>
          </motion.main>

          {/* ── AI Side Panel ── */}
          <ChatAssistant />
        </div>
      </div>

      {/* ── Final Polish Components ── */}
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <BoothFinderModal isOpen={isBoothModalOpen} onClose={() => setIsBoothModalOpen(false)} />
      <Onboarding />
      <QuickToolbar setActivePhase={setActivePhase} />
    </div>
  );
}
