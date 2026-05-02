import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Loader2, ExternalLink, RefreshCcw, MessageSquare } from 'lucide-react';
import { useChatTrigger } from '../chat/ChatContext';

export default function BoothFinderModal({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle'); // idle, detecting, success, error
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const openChat = useChatTrigger();

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMsg('Geolocation is not supported by your browser');
      return;
    }

    setStatus('detecting');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding using OpenStreetMap Nominatim (Free)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
          );
          const data = await response.json();
          
          const city = data.address.city || data.address.town || data.address.village || data.address.state_district || 'Unknown City';
          const state = data.address.state || 'Unknown State';
          
          setLocation({ city, state });
          setStatus('success');
        } catch (err) {
          console.error("Geocoding error:", err);
          setStatus('success'); // Fallback to generic success if geocoding fails but GPS works
          setLocation({ city: 'Current Location', state: 'Detected' });
        }
      },
      (err) => {
        setStatus('error');
        setErrorMsg(err.message || 'Unable to retrieve your location');
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    if (isOpen) {
      detectLocation();
    } else {
      // Reset when closing
      setTimeout(() => {
        setStatus('idle');
        setLocation(null);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-civic-100 flex items-center justify-center text-civic-600">
              <MapPin size={18} />
            </div>
            <h3 className="font-bold text-slate-800">Find My Booth</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {status === 'detecting' && (
              <motion.div
                key="detecting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center text-center space-y-4 py-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-civic-200 rounded-full animate-ping opacity-20" />
                  <div className="w-16 h-16 rounded-full bg-civic-50 flex items-center justify-center text-civic-600 relative z-10">
                    <Loader2 size={32} className="animate-spin" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Detecting your location...</p>
                  <p className="text-sm text-slate-500 mt-1">Please allow location access if prompted</p>
                </div>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-200">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-widest">Detected Area</p>
                    <p className="text-lg font-bold text-slate-800">
                      {location?.city}, {location?.state}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    📍 Your specific polling booth is tied to your <strong>registered permanent address</strong> in your Voter ID.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => window.open('https://electoralsearch.eci.gov.in/', '_blank')}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 shadow-xl"
                  >
                    <ExternalLink size={18} />
                    Find Exact Booth (Official)
                  </button>

                  <button
                    onClick={() => {
                      openChat(`Based on my location in ${location?.city}, ${location?.state}, where will I likely vote and what documents do I need?`);
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-civic-100 text-civic-700 font-bold hover:bg-civic-50 transition-all text-sm"
                  >
                    <MessageSquare size={16} />
                    Ask AI about my booth
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center space-y-4 py-6"
              >
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                  <X size={32} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Location Access Failed</p>
                  <p className="text-sm text-slate-500 mt-1">{errorMsg}</p>
                </div>
                <button
                  onClick={detectLocation}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
                >
                  <RefreshCcw size={16} />
                  Retry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-8 py-4 text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
            CivicGuide uses your location only once to provide local election data
          </p>
        </div>
      </motion.div>
    </div>
  );
}
