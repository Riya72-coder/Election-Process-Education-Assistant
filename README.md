# ElectionEdu: AI-Powered Election Education Assistant 🇮🇳

**ElectionEdu** is a state-of-the-art, interactive platform designed to educate Indian citizens on the election process. By leveraging a context-aware AI assistant and a personalized roadmap system, the app transforms complex bureaucratic procedures into a seamless, guided journey for every voter.

---

## 🚀 Key Features

### 1. Personalized AI Voting Journey
A tailored roadmap that guides users based on their specific profile.
- **Onboarding:** Collects age, state, and "first-time voter" status to customize the experience.
- **Progress Tracking:** Interactive 4-step roadmap (Registration → Campaigning → Polling → Results) with real-time progress bars.
- **Dynamic Unlocking:** Steps unlock sequentially as the user completes each phase.

### 2. CivicGuide AI (Intelligent Assistant)
A sophisticated, keyword-driven AI chat interface built directly into the UI.
- **Context Awareness:** The AI knows which page you are on and provides relevant summaries.
- **Multi-Format Responses:** Can generate "Quick Steps," "Checklists," or "Simple Explanations" on demand.
- **Zero-Latency:** Mock response engine ensures instant feedback without expensive backend calls.

### 3. Smart Phase Modules
Comprehensive deep-dives into every stage of the Indian election cycle:
- **Registration:** Guidance on Form 6, required documents (Aadhaar/EPIC), and online portal links.
- **Campaigning:** Insights into the Model Code of Conduct (MCC), manifestos, and silence periods.
- **Polling Day:** Step-by-step walkthrough of the booth experience, EVM/VVPAT usage, and ID requirements.
- **Results:** Explanation of the counting process and government formation.

### 4. Interactive Tools
- **Voter Eligibility Quiz:** A quick tool to help users verify their voting rights.
- **AI Summary Cards:** Instant, digestible takeaways at the top of every phase page.
- **Quick Action Chips:** One-tap buttons for "Explain Simply" or "Give me steps" to reduce cognitive load.

---

## 🎨 Design Philosophy
The app utilizes a **Premium Tricolour Aesthetic**, blending modern glassmorphism with India's national colors (Saffron, White, Green) and a deep "Civic Blue" palette.
- **Modern Typography:** Uses clean, sans-serif fonts for maximum readability.
- **Micro-animations:** Powered by **Framer Motion** for smooth transitions and interactive feedback.
- **Responsive Layout:** Fully optimized for mobile, tablet, and desktop viewing.

---

## 🛠️ Tech Stack

- **Core:** [React 19](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Internationalization:** [react-i18next](https://react.i18next.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── chat/        # CivicGuide AI engine & components
│   ├── journey/     # Personalized Journey logic & UI
│   ├── phases/      # Educational content modules
│   └── layout/      # Sidebar & Navigation
├── hooks/           # Custom React hooks (i18n, triggers)
├── data/            # Static election data & language maps
└── App.jsx          # Root component & State providers
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Riya72-coder/Election-Process-Education-Assistant.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Election-Process-Education-Assistant
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🏆 Hackathon Vision
This project aims to bridge the digital divide in civic awareness. By replacing dense government PDF manuals with an **AI-guided companion**, we empower the next generation of voters (Gen-Z and Millennials) to participate confidently in the world's largest democracy.

---

## 📄 License
This project is open-source and available under the MIT License.
