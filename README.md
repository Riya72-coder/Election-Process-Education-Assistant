# ElectionEdu: CivicGuide AI Assistant 🇮🇳

**ElectionEdu** is a premium, interactive platform designed to empower Indian citizens through the world's largest democratic process. By blending context-aware AI with a personalized roadmap system, the app transforms complex election rules into a seamless, guided journey for every voter.

---

## 🚀 Key Features

### 1. 🗺️ Personalized Voting Journey
A tailored roadmap that tracks your progress from registration to the final results.
- **Onboarding Experience**: A premium introduction that captures your age, state, and voter status to customize your learning path.
- **Progress Tracking**: 4-phase interactive journey (Registration → Campaigning → Polling → Results) with real-time progress visualization and milestone badges.

### 2. 🤖 CivicGuide AI (Smart Assistant)
A sophisticated, simulated AI chat interface built for instant guidance.
- **Streaming Responses**: Real-time "character-by-character" AI generation for a lifelike experience.
- **Context-Aware Summaries**: Dynamic "🧠 AI Summary" cards on every page that distill technical rules into simple takeaways.
- **Typing Indicator**: Animated "AI Thinking" states and interactive quick-reply chips.

### 3. 🛑 Election Myth Buster & MCC Checker
A dedicated tool to verify election-related claims and activities.
- **Claim Verification**: Instant checks on whether an activity is **Allowed**, **Not Allowed**, or **Misleading**.
- **Model Code of Conduct (MCC)**: Deep integration of ECI rules to provide legal context and confidence scores.

### 4. 🌍 Multilingual by Design
Seamless support for India's linguistic diversity with **6 major languages**:
- 🇮🇳 English, Hindi (हिन्दी), Marathi (मराठी), Bengali (বাংলা), Tamil (தமிழ்), and Telugu (తెలుగు).
- **Auto-Detection**: Dynamically detects browser language and applies script-specific typography and RTL support where necessary.

### 5. 🎬 Integrated Demo Mode
A "one-click" demonstration sequence for judges and presenters.
- **Automated Walkthrough**: Simulates a live user session including AI chat interactions, journey navigation, and myth-busting sequences with a single click.

---

## 🎨 Design & UX
- **Premium Aesthetic**: Modern UI with glassmorphism, depth-based shadows, and high-quality gradients.
- **Micro-Animations**: Powered by **Framer Motion** for hover scales, sliding transitions, and bouncing feedback.
- **Accessibility**: Standardized on `rounded-2xl` corners and high-contrast typography for maximum readability.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **I18n**: [react-i18next](https://react.i18next.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── chat/        # CivicGuide AI engine (aiResponses.js) & UI
│   ├── journey/     # Personalized Journey logic & Progress Context
│   ├── mythbuster/  # Claim verification & MCC logic
│   ├── phases/      # Educational modules (Registration, Polling, etc.)
│   └── ui/          # Final polish: Onboarding, QuickToolbar (Demo Mode)
├── locales/         # Multi-language JSON dictionaries
├── data/            # Static election data & language configurations
└── App.jsx          # Root layout & State management
```

---

## ⚡ Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/Riya72-coder/Election-Process-Education-Assistant.git
   cd Election-Process-Education-Assistant
   npm install
   ```
2. **Launch**:
   ```bash
   npm run dev
   ```

---

## 🏆 Hackathon Vision
This project aims to bridge the civic awareness gap by replacing dense manuals with an **AI-guided companion**. It empowers Gen-Z and first-time voters to participate confidently in Indian democracy through technology and personalized education.

---

## 📄 License
This project is open-source and available under the **MIT License**.
