import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const JourneyContext = createContext(null);

const DEFAULT_STEPS = [
  { id: 'registration', title: 'Register to Vote', phase: 'registration', icon: '📝' },
  { id: 'campaigning',  title: 'Understand Campaigning', phase: 'campaigning', icon: '📢' },
  { id: 'polling',      title: 'Polling Day', phase: 'polling', icon: '🗳️' },
  { id: 'results',      title: 'View Results', phase: 'results', icon: '📊' },
];

export function JourneyProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('voter_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [journey, setJourney] = useState(() => {
    const saved = localStorage.getItem('voter_journey');
    if (saved) return JSON.parse(saved);
    return DEFAULT_STEPS.map((s, i) => ({
      ...s,
      status: i === 0 ? 'active' : 'locked'
    }));
  });

  useEffect(() => {
    if (profile) localStorage.setItem('voter_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('voter_journey', JSON.stringify(journey));
  }, [journey]);

  const completeStep = useCallback((id) => {
    setJourney(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx].status = 'completed';
      if (next[idx + 1]) {
        next[idx + 1].status = 'active';
      }
      return next;
    });
  }, []);

  const resetJourney = () => {
    setProfile(null);
    setJourney(DEFAULT_STEPS.map((s, i) => ({ ...s, status: i === 0 ? 'active' : 'locked' })));
    localStorage.removeItem('voter_profile');
    localStorage.removeItem('voter_journey');
  };

  return (
    <JourneyContext.Provider value={{ profile, setProfile, journey, completeStep, resetJourney }}>
      {children}
    </JourneyContext.Provider>
  );
}

export const useJourney = () => useContext(JourneyContext);
