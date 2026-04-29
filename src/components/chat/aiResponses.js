// ─── CivicGuide AI — Mock Response Engine ───────────────────────────────────
// No API keys, no backend. All responses are hand-crafted structured objects.

/**
 * @typedef {{ short: string, steps?: string[], checklist?: string[], tip?: string }} AIResponse
 */

/** Simple keyword matcher */
const matches = (input, keywords) =>
  keywords.some((kw) => input.toLowerCase().includes(kw));

/**
 * Returns a structured AI response based on the user's input and optional profile.
 * @param {string} input
 * @param {{ age?: number, state?: string, isFirstTime?: boolean }} [userProfile]
 * @returns {AIResponse}
 */
export function getAIResponse(input, userProfile = {}) {
  const { age, state, isFirstTime } = userProfile;
  const firstName = isFirstTime ? 'first-time voter' : 'voter';
  const stateStr = state ? ` in ${state}` : '';
  const ageStr = age ? `Since you are ${age}, ` : '';

  // ── Eligibility ──────────────────────────────────────────────────────────
  if (matches(input, ['eligible', 'qualify', 'can i vote', 'am i', 'age', 'citizen'])) {
    const eligible = !age || age >= 18;
    return {
      short: eligible
        ? `${ageStr}you are eligible to vote in India${stateStr}! 🎉`
        : `${ageStr}you must be at least 18 years old to vote in India.`,
      steps: [
        'Be a citizen of India',
        'Be at least 18 years old on the qualifying date (1 Jan of the election year)',
        'Be ordinarily resident of a constituency',
        'Not be disqualified under any law',
      ],
      tip: eligible
        ? 'Great news! Check your name on the voter list at voters.eci.gov.in.'
        : 'You can pre-register at 17 and your name will be added when you turn 18.',
    };
  }

  // ── Registration ─────────────────────────────────────────────────────────
  if (matches(input, ['register', 'enroll', 'sign up', 'voter id', 'voter card', 'epic'])) {
    return {
      short: `Here's how to register as a ${firstName}${stateStr}:`,
      steps: [
        'Visit voters.eci.gov.in or the Voter Helpline App',
        'Click "Register as a New Voter" (Form 6)',
        'Fill in personal details, address & constituency',
        'Upload required documents',
        'Submit and note your reference number',
        'Track status online — card delivered in 2–4 weeks',
      ],
      checklist: [
        'Proof of Age (Aadhaar / Birth Certificate / Passport)',
        'Proof of Address (Aadhaar / Utility Bill / Rent Agreement)',
        'Recent passport-size photograph',
        'Mobile number linked to Aadhaar (optional but recommended)',
      ],
      tip: 'You can also register offline at your nearest BLO (Booth Level Officer) office.',
    };
  }

  // ── Documents ────────────────────────────────────────────────────────────
  if (matches(input, ['document', 'proof', 'id proof', 'what do i need', 'papers', 'required'])) {
    return {
      short: 'Documents needed for voter registration:',
      checklist: [
        '📄 Proof of Age — Aadhaar, Birth Certificate, Passport, PAN Card, or School Certificate',
        '🏠 Proof of Address — Aadhaar, Utility Bill, Bank Passbook, or Rent Agreement',
        '📸 Recent passport-size photograph (colour, white background)',
        '📱 Mobile number (for OTP verification on online portal)',
      ],
      tip: 'Aadhaar card alone can serve as both age and address proof.',
    };
  }

  // ── Polling Day ──────────────────────────────────────────────────────────
  if (matches(input, ['polling', 'voting day', 'how to vote', 'booth', 'evm', 'ballot'])) {
    return {
      short: 'Here\'s what happens on Polling Day:',
      steps: [
        'Find your polling booth using voters.eci.gov.in (search by EPIC number)',
        'Carry your Voter ID (EPIC) or any of 12 approved photo IDs',
        'Join the queue and wait for your turn',
        'Show your ID to the polling officer',
        'Get your finger marked with indelible ink',
        'Press the candidate button on the EVM (Electronic Voting Machine)',
        'Verify your vote on the VVPAT slip',
      ],
      tip: 'Polls are usually open from 7 AM to 6 PM. Arrive early to avoid queues!',
    };
  }

  // ── Results ──────────────────────────────────────────────────────────────
  if (matches(input, ['result', 'counting', 'winner', 'elected', 'declared'])) {
    return {
      short: 'How election results work in India:',
      steps: [
        'Counting begins on a date announced by the Election Commission',
        'EVM machines are transported under security to counting centres',
        'Votes are counted round by round, constituency by constituency',
        'The candidate with the highest votes (First-Past-The-Post) wins',
        'Results are declared by the Returning Officer',
        'Final results published on eci.gov.in',
      ],
      tip: 'You can follow live counting on eci.gov.in or Results.eci.gov.in.',
    };
  }

  // ── Campaigning ──────────────────────────────────────────────────────────
  if (matches(input, ['campaign', 'candidate', 'party', 'manifesto', 'rally', 'election code'])) {
    return {
      short: 'About the Campaigning phase:',
      steps: [
        'Political parties release their manifestos (promise documents)',
        'Candidates campaign via rallies, door-to-door visits, ads & social media',
        'Model Code of Conduct (MCC) is enforced from announcement to results',
        'Election Commission monitors spending limits (~₹40–95 lakh per candidate)',
        'Campaigning stops 48 hours before polling (Silence Period)',
      ],
      tip: 'You can report MCC violations to your State Chief Electoral Officer.',
    };
  }

  // ── Help / Greeting ──────────────────────────────────────────────────────
  if (matches(input, ['hello', 'hi', 'hey', 'help', 'what can you', 'start', 'guide'])) {
    return {
      short: `Hi there${age ? `, ${age}-year-old` : ''}! 👋 I'm CivicGuide, your election education assistant${stateStr}.`,
      steps: [
        'Ask me "How do I register to vote?"',
        'Ask me "What documents do I need?"',
        'Ask me "Am I eligible to vote?"',
        'Ask me "What happens on polling day?"',
        'Ask me "How are results counted?"',
      ],
      tip: 'Type anything about Indian elections and I\'ll do my best to help!',
    };
  }

  // ── Fallback ─────────────────────────────────────────────────────────────
  return {
    short: `I'm not sure I understood that. Here are some things I can help with:`,
    steps: [
      '"How do I register to vote?"',
      '"What documents do I need?"',
      '"Am I eligible to vote?"',
      '"What happens on polling day?"',
      '"How are election results counted?"',
    ],
    tip: 'Try rephrasing or pick a topic from the sidebar to learn more!',
  };
}

// ─── Page-level summaries ─────────────────────────────────────────────────────
/**
 * Returns a structured summary for a given page, optionally personalised.
 * @param {'overview'|'registration'|'campaigning'|'polling'|'results'} pageType
 * @param {{ age?: number, state?: string, isFirstTime?: boolean }} [userProfile]
 * @returns {{ summary: string, highlights: string[], steps: string[], checklist: string[] }}
 */
export function getPageSummary(pageType, userProfile = {}) {
  const { age, state, isFirstTime } = userProfile;
  const stateStr  = state       ? ` in ${state}`         : '';
  const ageNote   = age         ? ` You are ${age}.`     : '';
  const firstNote = isFirstTime ? ' Welcome, first-time voter! 🎉' : '';

  switch (pageType) {

    case 'overview':
      return {
        summary: `India runs the world's largest democratic election.${ageNote}${stateStr ? ` Voters${stateStr} play a crucial role.` : ''} The Election Commission of India (ECI) oversees the entire process.${firstNote}`,
        highlights: ['🗳️ 97 Cr+ registered voters', '📍 10.5 Lakh polling stations', '🏛️ 543 Lok Sabha seats'],
        steps: [
          'Check your eligibility (18+ citizen)',
          'Register on voters.eci.gov.in',
          'Explore each phase in the sidebar',
          'Take the eligibility quiz!',
        ],
        checklist: [
          'Know your constituency',
          'Verify your name on the voter list',
          'Download the Voter Helpline App',
        ],
      };

    case 'registration':
      return {
        summary: `Voter registration (EPIC) is the first step to participating in democracy.${ageNote}${firstNote} You can register online via Form 6 at voters.eci.gov.in — it takes less than 10 minutes.`,
        highlights: [
          age && age >= 18 ? '✅ You are eligible to register' : '⚠️ Must be 18+ to register',
          '📄 Next step: Fill Form 6',
          '⏱️ Card delivered in 2–4 weeks',
        ].filter(Boolean),
        steps: [
          'Visit voters.eci.gov.in',
          'Click "Register as New Voter" → Form 6',
          'Enter personal & address details',
          'Upload Aadhaar + photo',
          'Submit & track your application',
        ],
        checklist: [
          'Aadhaar card (age + address proof)',
          'Passport-size photograph',
          'Mobile number for OTP',
        ],
      };

    case 'campaigning':
      return {
        summary: `Campaigning is the phase where parties and candidates present their vision to voters. It is regulated by the Model Code of Conduct (MCC) enforced by ECI to ensure a level playing field.${stateStr ? ` Candidates${stateStr} have specific spending limits.` : ''}`,
        highlights: ['📢 MCC enforced from announcement day', '💰 Spending cap: ₹40–95 lakh', '🔇 48-hr silence period before polling'],
        steps: [
          'Parties publish manifestos',
          'Candidates file nominations',
          'Rallies, ads & door-to-door campaigns run',
          'Silence period begins 48 hrs before polling',
        ],
        checklist: [
          'Check party manifestos at eci.gov.in',
          'Report MCC violations to your CEO',
          "Know your candidate's credentials"
        ],
      };

    case 'polling':
      return {
        summary: `Polling Day is when your vote counts! Booths open from 7 AM to 6 PM.${ageNote} Carry any of 12 approved photo IDs. After voting, your finger is marked with indelible blue ink.${firstNote}`,
        highlights: ['⏰ Booths open 7 AM – 6 PM', '🖊️ Indelible ink marks your finger', '🖥️ EVM + VVPAT ensures security'],
        steps: [
          'Find your booth on voters.eci.gov.in',
          'Carry Voter ID or approved alternate ID',
          'Queue up, show ID to officer',
          'Vote on EVM, verify VVPAT slip',
        ],
        checklist: [
          'Voter ID / Aadhaar / Passport / Driving Licence',
          'Know your booth number in advance',
          'Arrive early to avoid queues',
        ],
      };

    case 'results':
      return {
        summary: `After polling, votes are counted at secure counting centres. India uses the First-Past-The-Post system — the candidate with the most votes in a constituency wins. Results are published live on eci.gov.in.`,
        highlights: ['📊 First-Past-The-Post system', '🔒 EVMs counted under security', '🌐 Live results at results.eci.gov.in'],
        steps: [
          'ECI announces counting date',
          'EVMs transported to counting centres',
          'Votes tallied round by round',
          'Returning Officer declares result',
        ],
        checklist: [
          'Follow live results at results.eci.gov.in',
          'Know the difference: simple majority vs absolute majority',
          'Government formation within 30 days',
        ],
      };

    default:
      return {
        summary: 'Navigate the phases in the sidebar to learn about each stage of the Indian election process.',
        highlights: [],
        steps: [],
        checklist: [],
      };
  }
}
