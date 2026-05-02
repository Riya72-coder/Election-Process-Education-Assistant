import { Play, ShieldAlert, Map, ExternalLink, PhoneCall } from 'lucide-react';
import { useJourney } from '../journey/JourneyContext';
import { motion } from 'framer-motion';

export default function QuickToolbar({ setActivePhase }) {
  const { profile } = useJourney();
  const isPune = profile?.state === 'Maharashtra' && profile?.city?.toLowerCase() === 'pune';

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
    </div>
  );
}
