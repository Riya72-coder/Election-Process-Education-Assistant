import { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useJourney } from './JourneyContext';
import { useChatTrigger } from '../chat/ChatContext';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry',
];

export default function ProfileModal({ isOpen, onClose }) {
  const { setProfile } = useJourney();
  const openChat = useChatTrigger();
  const [form, setForm] = useState({ age: '', state: 'Maharashtra', city: '', isFirstTime: true });
  const [errors, setErrors] = useState({});

  // Reset form every time modal opens
  useEffect(() => {
    if (isOpen) setForm({ age: '', state: 'Maharashtra', city: '', isFirstTime: true });
    setErrors({});
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.age || form.age < 17 || form.age > 120) e.age = 'Enter a valid age (17+)';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const profile = { ...form, age: Number(form.age) };
    setProfile(profile);
    openChat(
      `I am ${profile.age} years old from ${profile.state}. ${profile.isFirstTime ? "I'm a first-time voter." : ''} Guide me step by step through the Indian election process.`
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-bounce-in">

        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 to-teal-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display leading-none">Start Your AI Journey</h2>
              <p className="text-blue-100 text-xs mt-0.5">We'll personalise your election roadmap</p>
            </div>
          </div>
          {/* Tricolour strip */}
          <div className="flex h-1 mt-4 rounded-full overflow-hidden">
            <div className="flex-1 bg-orange-400" />
            <div className="flex-1 bg-white/80" />
            <div className="flex-1 bg-green-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Age */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Your Age
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                type="number" min="17" max="120" required placeholder="e.g. 22"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all
                  focus:ring-2 focus:ring-blue-100 focus:border-blue-400
                  ${errors.age ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                value={form.age}
                onChange={e => { setForm({...form, age: e.target.value}); setErrors({}); }}
              />
            </div>
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Your State / UT
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={17} />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none transition-all"
                value={form.state}
                onChange={e => setForm({...form, state: e.target.value})}
              >
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          
          {/* City (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Your City (Optional)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                type="text" placeholder="e.g. Pune"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                value={form.city}
                onChange={e => setForm({...form, city: e.target.value})}
              />
            </div>
          </div>

          {/* First-time voter toggle */}
          <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={form.isFirstTime}
                onChange={e => setForm({...form, isFirstTime: e.target.checked})}
              />
              <div className="w-10 h-6 bg-slate-200 rounded-full peer-checked:bg-blue-600 transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-700 block">First-time voter</span>
              <span className="text-xs text-slate-400">Get extra guidance tailored for you</span>
            </div>
          </label>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
          >
            <Sparkles size={16} />
            Generate My Roadmap
          </button>
        </form>
      </div>
    </div>
  );
}
