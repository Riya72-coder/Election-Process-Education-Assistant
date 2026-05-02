import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n'; // initialise i18next before React renders
import App from './App.jsx';

import { ChatProvider } from './components/chat/ChatContext';
import { JourneyProvider } from './components/journey/JourneyContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JourneyProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </JourneyProvider>
  </StrictMode>,
);
