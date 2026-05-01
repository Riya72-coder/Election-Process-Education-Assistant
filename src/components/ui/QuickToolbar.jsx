import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ShieldAlert, Map, MessageSquare, CheckCircle2, PhoneCall, ExternalLink } from 'lucide-react';
import { useChatTrigger } from '../chat/ChatContext';
import { useJourney } from '../journey/JourneyContext';

export default function QuickToolbar({ setActivePhase }) {
  const { profile } = useJourney();
  const openWithMessage = useChatTrigger();
  const [isDemoing, setIsDemoing] = useState(false);

  const isPune = profile?.state === 'Maharashtra' && profile?.city?.toLowerCase() === 'pune';

  const runDemo = async () => {
    if (isDemoing) return;
    setIsDemoing(true);

    // Step 1: Trigger Chat
    openWithMessage("I am 19 from Maharashtra and it's my first time voting.");
    
    // Step 2: Navigate to Journey (Overview)
    await new Promise(r => setTimeout(r, 2500));
    setActivePhase('overview');

    // Step 3: Navigate to Myth Buster
    await new Promise(r => setTimeout(r, 3000));
    setActivePhase('mythbuster');

    // Step 4: Complete
    await new Promise(r => setTimeout(r, 3000));
    setIsDemoing(false);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-2xl flex items-center gap-2 sm:gap-4 ring-1 ring-slate-900/5">
      <button
        onClick={() => setActivePhase('overview')}
        className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 flex flex-col items-center gap-1 min-w-[60px]"
      >
        <Map size={20} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Journey</span>
      </button>

      <button
        onClick={() => setActivePhase('mythbuster')}
        className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 flex flex-col items-center gap-1 min-w-[60px]"
      >
        <ShieldAlert size={20} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Myths</span>
      </button>

      {isPune && (
        <>
          <div className="w-[1px] h-8 bg-slate-200 mx-1" />
          <button
            onClick={() => window.open('https://pune.nic.in/election/', '_blank')}
            className="p-2 rounded-xl hover:bg-orange-50 transition-colors text-orange-600 flex flex-col items-center gap-1 min-w-[60px]"
            title="Pune District Election Office"
          >
            <ExternalLink size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Pune DEO</span>
          </button>
          <button
            onClick={() => window.open('tel:1950')}
            className="p-2 rounded-xl hover:bg-teal-50 transition-colors text-teal-600 flex flex-col items-center gap-1 min-w-[60px]"
            title="Voter Helpline"
          >
            <PhoneCall size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Help 1950</span>
          </button>
        </>
      )}

      <div className="w-[1px] h-8 bg-slate-200 mx-1" />

      <button
        onClick={runDemo}
        disabled={isDemoing}
        className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all ${
          isDemoing 
            ? 'bg-teal-50 text-teal-600' 
            : 'bg-civic-600 text-white hover:bg-civic-700 hover:shadow-lg hover:shadow-civic-200 shadow-md'
        }`}
      >
        {isDemoing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Play size={18} fill="currentColor" />
            </motion.div>
            <span className="hidden sm:inline">Demoing...</span>
          </>
        ) : (
          <>
            <Play size={18} fill="currentColor" />
            <span className="hidden sm:inline">Run Demo</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {isDemoing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-xl"
          >
            Running AI Demo Sequence
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
