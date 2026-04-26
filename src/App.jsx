import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import LanguageBanner from './components/Layout/LanguageBanner';
import OverviewPhase from './components/phases/OverviewPhase';
import RegistrationPhase from './components/phases/RegistrationPhase';
import CampaigningPhase from './components/phases/CampaigningPhase';
import PollingPhase from './components/phases/PollingPhase';
import ResultsPhase from './components/phases/ResultsPhase';
import VoterEligibilityQuiz from './components/quiz/VoterEligibilityQuiz';
import { content, SUPPORTED_LANGS } from './data/electionData';
import { getScriptConfig, isRTL } from './data/languages';
import { detectedLangNames } from './data/translations';

// ── Browser language detection ─────────────────────────────
function detectBrowserLanguage() {
  const raw = (navigator.language || navigator.languages?.[0] || 'en');
  const code = raw.split('-')[0].toLowerCase();
  return SUPPORTED_LANGS.includes(code) ? code : 'en';
}

const phaseComponents = {
  overview: OverviewPhase, registration: RegistrationPhase,
  campaigning: CampaigningPhase, polling: PollingPhase,
  results: ResultsPhase, quiz: VoterEligibilityQuiz,
};

const pageVariants = {
  initial: { opacity: 0, x: 32, filter: 'blur(4px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -24, filter: 'blur(4px)', transition: { duration: 0.22, ease: [0.55, 0, 1, 0.45] } },
};

export default function App() {
  const [activePhase, setActivePhase] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  // Initialise from browser language — falls back to 'en' if unsupported
  const [language, setLanguage] = useState(detectBrowserLanguage);

  // Banner for non-supported but recognised Scheduled Languages
  const [showBanner, setShowBanner] = useState(false);
  const [bannerLangName, setBannerLangName] = useState('');

  useEffect(() => {
    const raw = (navigator.language || navigator.languages?.[0] || '');
    const code = raw.split('-')[0].toLowerCase();
    // If browser lang is a known Scheduled Language but NOT in our Big-3 supported set
    if (code && !SUPPORTED_LANGS.includes(code) && detectedLangNames[code]) {
      setBannerLangName(detectedLangNames[code]);
      setShowBanner(true);
    }
  }, []);

  // Apply RTL direction + dynamic font CSS variables on language change
  useEffect(() => {
    const rtl = isRTL(language);
    const { font, lineScale } = getScriptConfig(language);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.style.setProperty('--app-font', font);
    document.documentElement.style.setProperty('--app-line-scale', lineScale);
  }, [language]);

  // The content block for the current language (falls back to English)
  const langContent = content[language] ?? content.en;

  const ActiveComponent = phaseComponents[activePhase] || OverviewPhase;

  return (
    <>
      {showBanner && (
        <LanguageBanner
          nativeName={bannerLangName}
          onAccept={() => setShowBanner(false)}
          onDismiss={() => setShowBanner(false)}
        />
      )}

      <div
        className="flex h-screen overflow-hidden bg-slate-50"
        style={{ paddingTop: showBanner ? '52px' : '0' }}
      >
        <Sidebar
          activePhase={activePhase}
          setActivePhase={setActivePhase}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          sidebar={langContent.sidebar}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header
            activePhase={activePhase}
            setMobileOpen={setMobileOpen}
            currentLanguage={language}
            setLanguage={setLanguage}
            header={langContent.header}
          />

          <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePhase + language}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ActiveComponent
                  setActivePhase={setActivePhase}
                  language={language}
                  langContent={langContent}
                />
                <div className="h-8" />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}
