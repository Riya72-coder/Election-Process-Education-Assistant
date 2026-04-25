import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import OverviewPhase from './components/phases/OverviewPhase';
import RegistrationPhase from './components/phases/RegistrationPhase';
import CampaigningPhase from './components/phases/CampaigningPhase';
import PollingPhase from './components/phases/PollingPhase';
import ResultsPhase from './components/phases/ResultsPhase';
import VoterEligibilityQuiz from './components/quiz/VoterEligibilityQuiz';

const phaseComponents = {
  overview:     OverviewPhase,
  registration: RegistrationPhase,
  campaigning:  CampaigningPhase,
  polling:      PollingPhase,
  results:      ResultsPhase,
  quiz:         VoterEligibilityQuiz,
};

// Slide-and-fade page transition variants
const pageVariants = {
  initial: { opacity: 0, x: 32, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -24,
    filter: 'blur(4px)',
    transition: { duration: 0.22, ease: [0.55, 0, 1, 0.45] },
  },
};

export default function App() {
  const [activePhase, setActivePhase] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  const ActiveComponent = phaseComponents[activePhase] || OverviewPhase;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        activePhase={activePhase}
        setActivePhase={setActivePhase}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activePhase={activePhase} setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
          {/*
            AnimatePresence: enables exit animations when the active phase changes.
            mode="wait" ensures the outgoing page fully exits before the new one enters.
          */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePhase}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ActiveComponent setActivePhase={setActivePhase} />
              <div className="h-8" />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
