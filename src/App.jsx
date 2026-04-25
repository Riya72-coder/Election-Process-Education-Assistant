import { useState } from 'react';
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

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <ActiveComponent
            key={activePhase}
            setActivePhase={setActivePhase}
          />
          {/* Bottom padding for breathing room */}
          <div className="h-8" />
        </main>
      </div>
    </div>
  );
}
