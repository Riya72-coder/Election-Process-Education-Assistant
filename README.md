# ElectionEdu: CivicGuide AI Assistant 🇮🇳

**ElectionEdu** is a premium, interactive platform designed to empower Indian citizens through the world's largest democratic process. By blending context-aware AI with a personalized roadmap system, the app transforms complex election rules into a seamless, guided journey for every voter.

**🚀 Live Demo:** [https://election-edu-216772053294.us-central1.run.app](https://election-edu-216772053294.us-central1.run.app)

---

## 🤖 AI Features & Intelligence

### 1. 🦾 CivicGuide AI (Powered by Gemini)
A sophisticated AI chat interface utilizing the **Gemini 1.5 Flash** model to provide instant, context-aware guidance.
- **Streaming Responses**: Real-time "character-by-character" AI generation.
- **Context-Aware Summaries**: Dynamic "🧠 AI Summary" cards on every page that distill technical rules into simple takeaways.
- **Interactive Prompts**: Quick-reply chips and animated "AI Thinking" indicators.

### 2. 🛑 Election Myth Buster & MCC Checker
A dedicated tool to verify election-related claims and Model Code of Conduct (MCC) activities.
- **Claim Verification**: Instant checks on whether an activity is **Allowed**, **Not Allowed**, or **Misleading**.
- **ECI Rule Integration**: Deep logic based on Election Commission of India guidelines with confidence scoring.

---

## 🗺️ Key Functionalities

*   **Personalized Voting Journey**: A 4-phase interactive roadmap (Registration → Campaigning → Polling → Results) tailored to user age, state, and voter status.
*   **Multilingual Support**: Full internationalization for **6 major Indian languages**: English, Hindi (हिन्दी), Marathi (मराठी), Bengali (বাংলা), Tamil (தமிழ்), and Telugu (తెलुगु).
*   **Integrated Demo Mode**: A "one-click" automated walkthrough for presenters to showcase all major features in seconds.
*   **Premium Design**: Modern UI with glassmorphism, depth-based shadows, and smooth **Framer Motion** animations.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **AI Engine**: [Google Gemini API](https://aistudio.google.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Google Cloud Run](https://cloud.google.com/)
- **I18n**: [react-i18next](https://react.i18next.com/)

---

## ☁️ Google Cloud Integration

This project is built using a deep integration with the **Google Cloud Ecosystem** to ensure scalability, security, and cutting-edge AI capabilities.

*   **Google Gemini API (Generative Language API)**: The core intelligence engine using **Gemini 2.5 Flash** for real-time, context-aware civic guidance and multilingual support.
*   **Google Cloud Run (Serverless Hosting)**: Fully managed containerized environment for high-performance, autoscaling web hosting.
*   **Google Cloud Build (CI/CD Pipeline)**: Automated build and deployment pipeline that securely handles sensitive build arguments and containerization.
*   **Artifact Registry (Container Management)**: Secure, private storage and management for the project's Docker images, integrated directly with Cloud Build and Cloud Run.

---

## 📂 Project Structure

```text
src/
├── api/             # Gemini API integration and streaming logic
├── components/
│   ├── chat/        # CivicGuide AI engine & UI components
│   ├── journey/     # Personalized Roadmap & Progress Context
│   ├── mythbuster/  # Claim verification & MCC logic
│   ├── phases/      # Educational modules (Registration, Polling, etc.)
│   └── ui/          # Final polish: Onboarding, QuickToolbar
├── locales/         # Multi-language JSON dictionaries (en, hi, mr, bn, ta, te)
└── data/            # Static election data & language configurations
```

---

## ⚡ Local Development

1. **Clone & Install**:
   ```bash
   git clone https://github.com/Riya72-coder/Election-Process-Education-Assistant.git
   cd Election-Process-Education-Assistant
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Launch**:
   ```bash
   npm run dev
   ```

---

## 🧪 Professional Testing Suite

The project implements a robust testing architecture using **Vitest** and **React Testing Library** to ensure 100% reliability of core civic logic and UI interactions.

### 🔍 Test Coverage
1.  **Voter Eligibility (Unit)**: 9 dedicated tests covering age boundaries (18+), document requirements, and citizenship status logic.
2.  **CivicGuide AI (Integration)**: Full rendering tests for the ChatAssistant, simulating user typing, FAB interactions, and state management.
3.  **API Resilience (Edge Cases)**: Verification of graceful degradation during **429 Rate Limiting**, network failures, and 500 server errors using sophisticated **Gemini API mocking**.

### 🛠️ Testing Commands
| Command | Description |
| :--- | :--- |
| `npm run test` | Starts the test runner in interactive watch mode. |
| `npm run test:run` | Executes all tests once (ideal for CI/CD pipelines). |
| `npm run test:ui` | Launches a premium visual dashboard to inspect test results and coverage. |

---

## ☁️ Deployment (Google Cloud Run)

This project is configured for secure deployment via **Google Cloud Build**.

1. **Authentication**:
   ```bash
   gcloud auth login
   gcloud config set project [YOUR_PROJECT_ID]
   ```

2. **Deploy with Build Arguments**:
   To keep the API key out of the Docker image layers, we use build arguments:
   ```bash
   gcloud builds submit --config cloudbuild.yaml --substitutions=_VITE_GEMINI_API_KEY=[YOUR_KEY]
   ```

---

## 📄 License
This project is open-source and available under the **MIT License**.
