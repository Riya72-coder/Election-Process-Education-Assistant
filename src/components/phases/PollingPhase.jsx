import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Star, Cpu, FileText } from 'lucide-react';
import { pollingData } from '../../data/electionData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
};

export default function PollingPhase({ langContent }) {
  const poll = langContent?.phases?.polling ?? {};
  const {
    title = pollingData.title,
    steps = pollingData.steps,
    inkFacts = pollingData.indelibleInk.facts,
  } = poll;

  const subtitle = poll.subtitle ?? pollingData.subtitle;
  const description = poll.description ?? pollingData.description;
  const didYouKnow = poll.didYouKnow ?? pollingData.didYouKnow;

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
        className="relative overflow-hidden bg-gradient-to-br from-civic-900 via-civic-700 to-cyan-600 rounded-3xl p-8 text-white"
      >
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full" />
        <div className="relative">
          <span className="phase-badge bg-white/20 text-white mb-4">Phase 3</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{title}</h2>
          <p className="text-civic-200 font-medium mb-2">{subtitle}</p>
          <p className="text-civic-100 text-sm max-w-2xl leading-relaxed">{description}</p>
        </div>
      </motion.div>

      {/* EVM + VVPAT deep dive */}
      <motion.div variants={itemVariants} className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
          <Cpu size={20} className="text-civic-600" />
          {langContent?.phases?.polling?.evmVvpatTitle ?? pollingData.evmVvpat.title}
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          {langContent?.phases?.polling?.evmVvpatSubtitle ?? "How India's tamper-proof voting system works"}
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {/* EVM */}
          <div className="p-4 rounded-2xl bg-civic-50 border border-civic-100">
            <p className="font-semibold text-civic-800 text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-civic-600" /> Electronic Voting Machine (EVM)
            </p>
            <ul className="space-y-2.5">
              {(poll.evm ?? pollingData.evmVvpat.evm).map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <span className="text-civic-500 font-bold flex-shrink-0 mt-0.5">{idx + 1}.</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          {/* VVPAT */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
            <p className="font-semibold text-teal-800 text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600" /> VVPAT — Paper Audit Trail
            </p>
            <ul className="space-y-2.5">
              {(poll.vvpat ?? pollingData.evmVvpat.vvpat).map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <span className="text-teal-500 font-bold flex-shrink-0 mt-0.5">{idx + 1}.</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Indelible Ink */}
      <motion.div variants={itemVariants} className="section-card border-l-4 border-amber-400 rounded-2xl">
        <h3 className="font-display text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🖊️</span> {langContent?.phases?.polling?.inkTitle ?? pollingData.indelibleInk.title}
        </h3>
        <ul className="space-y-2.5">
          {inkFacts.map((fact, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
              <Star size={14} className="text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" />
              {fact}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* What to bring */}
      <motion.div variants={itemVariants} className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <CreditCard size={20} className="text-civic-600" />
          {langContent?.phases?.polling?.bringTitle ?? "What to Bring on Polling Day"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(poll.whatToBring ?? pollingData.whatToBring).map((doc, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="fact-card cursor-default"
            >
              <p className="font-semibold text-civic-700 text-sm">{doc.item}</p>
              <p className="text-slate-500 text-xs mt-1">{doc.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Voting Steps */}
      <motion.div variants={itemVariants} className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-civic-600 rounded-full" />
          {langContent?.phases?.polling?.stepsTitle ?? "How to Cast Your Vote — Step by Step"}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-civic-200 hover:bg-civic-50 transition-all duration-200"
            >
              <div className="step-number text-xs">{item.step}</div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Voter Rights */}
      <motion.div variants={itemVariants} className="section-card">
        <h3 className="font-display text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <ShieldCheck size={20} className="text-civic-600" />
          {langContent?.phases?.polling?.rightsTitle ?? "Your Voter Rights"}
        </h3>
        <div className="space-y-3">
          {(poll.rights ?? pollingData.rights).map((right, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Star size={16} className="text-civic-500 flex-shrink-0 mt-0.5" fill="currentColor" />
              <p className="text-sm text-slate-600 leading-relaxed">{right}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-xl bg-civic-50 border border-civic-100 flex gap-2 items-center">
          <span className="text-2xl">📞</span>
          <p className="text-sm text-civic-700 font-medium">
            {langContent?.phases?.polling?.reportLabel ?? "Report violations:"} ECI Toll-Free <strong>1950</strong>
          </p>
        </div>
      </motion.div>

      {/* Did You Know — Pune */}
      <motion.div variants={itemVariants} className="did-you-know">
        <p className="text-sm font-bold uppercase tracking-wider mb-2">
          {langContent?.overview?.dykLabel ?? "💡 Did You Know? — Pune Edition"}
        </p>
        <p className="text-sm leading-relaxed">{didYouKnow}</p>
      </motion.div>
    </motion.div>
  );
}
