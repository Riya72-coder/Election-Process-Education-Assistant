// ─── CivicGuide AI — Mock Response Engine ────────────────────────────────────
// No API keys, no backend.

/** @typedef {{ short: string, steps?: string[], checklist?: string[], tip?: string }} AIResponse */

const matches = (input, keywords) =>
  keywords.some((kw) => input.toLowerCase().includes(kw));

/**
 * Main response engine — topic + format aware.
 * @param {string} input
 * @param {{ age?: number, state?: string, isFirstTime?: boolean }} [userProfile]
 * @returns {AIResponse}
 */
export function getAIResponse(input, userProfile = {}) {
  const { age, state, isFirstTime } = userProfile;
  const stateStr  = state ? ` in ${state}` : '';
  const ageStr    = age   ? `Since you are ${age}, ` : '';
  const firstName = isFirstTime ? 'first-time voter' : 'voter';

  const lc = input.toLowerCase();

  // ── Detect topic ──────────────────────────────────────────────────────────
  const isOverview     = matches(lc, ['overview', 'election process', 'how does election', 'how election', 'indian election', 'election india', 'how does voting', 'about election', 'start to finish', 'from start', 'election work', 'eci', 'election commission', 'what is election', 'about voting', 'tell me about election', 'process work']);
  const isEligibility  = matches(lc, ['eligible', 'qualify', 'can i vote', 'am i eligible', 'who can vote', 'age limit', 'citizen', 'qualification']);
  const isRegistration = matches(lc, ['register', 'registration', 'enroll', 'sign up', 'voter id', 'voter card', 'epic', 'form 6', 'new voter', 'voter list']);
  const isDocuments    = matches(lc, ['document', 'proof', 'id proof', 'what do i need', 'papers required', 'aadhaar', 'what to bring', 'which id']);
  const isCampaigning  = matches(lc, ['campaign', 'campaigning', 'candidate', 'party', 'manifesto', 'rally', 'election code', 'mcc', 'model code', 'advertisement', 'spending', 'expense', 'nomination', 'silence period']);
  const isPolling      = matches(lc, ['polling', 'polling day', 'voting day', 'how to vote', 'booth', 'evm', 'ballot', 'ink', 'vvpat', 'vote on', 'polling booth', 'cast vote', 'voting booth']);
  const isResults      = matches(lc, ['result', 'results', 'counting', 'winner', 'elected', 'declared', 'government formation', 'first past', 'majority', 'returning officer', 'live count']);
  const isJourney      = matches(lc, ['guide me', 'step by step', 'i am', 'years old', 'journey', 'walk me', 'take me through', 'help me understand', 'getting started']);
  const isHelp         = matches(lc, ['hello', 'hi ', 'hey', 'what can you', 'help me', 'start', 'what do you do', 'how can you']);

  // ── Detect format modifier ────────────────────────────────────────────────
  const wantsSteps     = matches(lc, ['steps', 'quick steps', 'step by step', 'how to', 'procedure', 'process']);
  const wantsChecklist = matches(lc, ['checklist', 'list', 'what do i need', 'what to bring', 'what should i']);
  const wantsExplain   = matches(lc, ['explain', 'simply', 'plain language', 'easy', 'simple', 'layman', 'in short', 'briefly', 'what is', 'what are']);

  // ── Journey / personalised start ─────────────────────────────────────────
  if (isJourney && !isRegistration && !isPolling && !isResults && !isCampaigning) {
    return {
      short: `Welcome${age ? `, ${age}-year-old` : ''}${stateStr}! 🇮🇳 ${isFirstTime ? "As a first-time voter, here's your complete guide:" : "Here's your personalised election roadmap:"}`,
      steps: [
        '📝 Step 1 — Register: visit voters.eci.gov.in and complete Form 6',
        '📢 Step 2 — Campaigning: read manifestos, know your candidate',
        '🗳️ Step 3 — Polling Day: carry ID, head to booth, cast your vote on EVM',
        '📊 Step 4 — Results: follow live counting on results.eci.gov.in',
      ],
      checklist: [
        'Aadhaar card (for registration & voting)',
        'Know your polling booth number',
        'Voter ID / EPIC card received',
        isFirstTime ? 'Download Voter Helpline App (1950)' : 'Verify name on voter roll',
      ],
      tip: isFirstTime
        ? 'First-time voters can register at 17 — your name is added when you turn 18!'
        : `Check your name at voters.eci.gov.in${stateStr} before election day.`,
    };
  }

  // ── Overview / general election process ──────────────────────────────────
  if (isOverview) {
    return {
      short: `India's election process is the world's largest democratic exercise. Here's how it works:`,
      steps: [
        '📋 Election Commission of India (ECI) announces the schedule',
        '🗓️ Model Code of Conduct kicks in immediately',
        '📝 Candidates file nominations & campaign',
        '🗳️ Voters cast votes at booths using EVMs',
        '📊 Votes counted & winners declared constituency-wise',
        '🏛️ Government formed — PM/CM sworn in',
      ],
      checklist: [
        '97 crore+ registered voters across India',
        '10.5 lakh polling stations nationwide',
        '543 Lok Sabha seats contested',
        'Free & fair elections since 1951',
      ],
      tip: 'Use the sidebar to explore each phase — Registration, Campaigning, Polling, and Results — in detail!',
    };
  }

  // ── Eligibility ───────────────────────────────────────────────────────────
  if (isEligibility) {
    const eligible = !age || age >= 18;
    return {
      short: eligible
        ? `${ageStr}you are eligible to vote in India${stateStr}! 🎉`
        : `${ageStr}you must be at least 18 years old to vote in India.`,
      steps: [
        'Must be a citizen of India',
        'Must be at least 18 years old on the qualifying date (1 Jan of election year)',
        'Must be ordinarily resident of a constituency',
        'Must not be disqualified under the Representation of the People Act',
      ],
      checklist: [
        'Indian citizenship',
        '18+ years old',
        'Registered in your constituency',
        'Not serving a prison sentence of 2+ years',
      ],
      tip: eligible
        ? 'Check your name on the voter list at voters.eci.gov.in.'
        : 'You can pre-register at age 17 — your name will be added automatically when you turn 18.',
    };
  }

  // ── Registration ──────────────────────────────────────────────────────────
  if (isRegistration) {
    if (wantsChecklist) {
      return {
        short: `Documents checklist for voter registration as a ${firstName}${stateStr}:`,
        checklist: [
          '📄 Proof of Age — Aadhaar / Birth Certificate / Passport / PAN / School Certificate',
          '🏠 Proof of Address — Aadhaar / Utility Bill / Bank Passbook / Rent Agreement',
          '📸 Passport-size photograph (colour, white background)',
          '📱 Mobile number (for OTP on online portal)',
          '📋 Filled Form 6 (available on voters.eci.gov.in)',
        ],
        tip: 'Aadhaar serves as BOTH age and address proof — it alone is sufficient.',
      };
    }
    return {
      short: `How to register as a ${firstName}${stateStr}:`,
      steps: [
        'Visit voters.eci.gov.in or download the Voter Helpline App',
        'Click "Register as a New Voter" — select Form 6',
        'Fill in personal details, address & constituency',
        'Upload Aadhaar + recent photograph',
        'Submit — note your reference/application number',
        'Track status online — EPIC card delivered in 2–4 weeks',
      ],
      checklist: [
        'Aadhaar card (age + address proof)',
        'Passport-size photograph',
        'Mobile number for OTP verification',
      ],
      tip: 'You can also register offline at your nearest BLO (Booth Level Officer) office for free.',
    };
  }

  // ── Documents ─────────────────────────────────────────────────────────────
  if (isDocuments) {
    return {
      short: 'Documents needed for voter registration & voting:',
      checklist: [
        '📄 Age proof — Aadhaar, Birth Certificate, Passport, PAN, or School Certificate',
        '🏠 Address proof — Aadhaar, Utility Bill, Bank Passbook, or Rent Agreement',
        '📸 Recent passport-size photograph (colour)',
        '📱 Mobile number (for OTP on voters.eci.gov.in)',
        '🗳️ On polling day: Voter ID / Aadhaar / Passport / Driving Licence / PAN Card (any one of 12 approved IDs)',
      ],
      tip: 'Aadhaar card alone is accepted as both age and address proof for registration.',
    };
  }

  // ── Campaigning ───────────────────────────────────────────────────────────
  if (isCampaigning) {
    if (wantsChecklist) {
      return {
        short: 'Campaigning checklist for voters:',
        checklist: [
          'Read all party manifestos at eci.gov.in',
          "Check your candidate's criminal record on affidavit portal",
          'Report MCC violations to your State CEO',
          'Know the 48-hour silence period before polling',
          'Ignore paid news — verify facts independently',
        ],
        tip: 'Call 1950 (Voter Helpline) to report any election code violations.',
      };
    }
    return {
      short: 'About the Campaigning phase:',
      steps: [
        'Election Commission announces schedule — MCC activates immediately',
        'Political parties release their manifestos (promise documents)',
        'Candidates file nominations with the Returning Officer',
        'Campaigns run via rallies, ads, door-to-door & social media',
        'Spending limit: ₹40–95 lakh per candidate (varies by state)',
        'Campaigning stops 48 hours before polling (Silence Period)',
      ],
      checklist: [
        'MCC prohibits freebies, hate speech & booth capturing',
        'Poll surveys banned 48 hrs before election',
        'Expenses must be declared to the Election Commission',
      ],
      tip: 'Report MCC violations to your State Chief Electoral Officer (CEO).',
    };
  }

  // ── Polling Day ───────────────────────────────────────────────────────────
  if (isPolling) {
    if (wantsChecklist) {
      return {
        short: 'Polling day checklist:',
        checklist: [
          '🪪 Voter ID / Aadhaar / Passport / PAN / Driving Licence (any approved ID)',
          '📍 Know your booth — check on voters.eci.gov.in',
          '⏰ Polls open 7 AM – 6 PM (arrive early to avoid queues)',
          '🚫 No phones or campaign material inside booth',
          '🖊️ After voting: indelible ink on left index finger',
        ],
        tip: 'Even if your name is not on the list, you can file a complaint with the Presiding Officer.',
      };
    }
    return {
      short: "Here's what happens on Polling Day:",
      steps: [
        'Find your polling booth on voters.eci.gov.in (search by EPIC / Aadhaar)',
        'Carry Voter ID (EPIC) or any of the 12 approved photo IDs',
        'Join the queue — booths open 7 AM to 6 PM',
        'Show your ID to the polling officer; get name verified',
        'Receive ballot — press candidate button on EVM',
        'Verify your vote on the VVPAT slip (7-second display)',
        'Get your left index finger marked with indelible ink',
      ],
      checklist: [
        'Voter ID / Aadhaar / Passport / Driving Licence',
        'Know your booth number in advance',
        'Arrive early — rush is usually 9–11 AM',
      ],
      tip: 'Polls are open from 7 AM to 6 PM. If you are in queue before 6 PM, you WILL be allowed to vote.',
    };
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (isResults) {
    return {
      short: 'How election results work in India:',
      steps: [
        'ECI announces the counting date after polling ends',
        'EVMs transported under multi-layer security to counting centres',
        'Postal ballots counted first; EVM counting follows',
        'Votes tallied round-by-round, constituency-by-constituency',
        'Candidate with highest votes (First-Past-The-Post) wins',
        'Returning Officer declares result; published on results.eci.gov.in',
        'Government formation within 30 days of final results',
      ],
      checklist: [
        'Live counting at results.eci.gov.in',
        'Simple majority = 272+ Lok Sabha seats for government',
        'President invites largest party/coalition to form government',
        'PM swearing-in ceremony typically within 2–3 weeks',
      ],
      tip: 'Follow live counting on the ECI Results app or results.eci.gov.in.',
    };
  }

  // ── Help / Greeting ───────────────────────────────────────────────────────
  if (isHelp) {
    return {
      short: `Hi${age ? `, ${age}-year-old` : ''}! 👋 I'm CivicGuide — your AI assistant for Indian elections${stateStr}.`,
      steps: [
        '"How do I register to vote?"',
        '"Am I eligible to vote?"',
        '"What documents do I need?"',
        '"What happens on polling day?"',
        '"How are election results counted?"',
        '"Explain the election process simply"',
      ],
      tip: 'Type any election question and I\'ll give you a structured, helpful answer!',
    };
  }

  // ── Smart fallback — try to detect partial intent ────────────────────────
  if (wantsExplain) {
    return {
      short: 'The Indian Election Process — simplified:',
      steps: [
        '1️⃣ Register on voters.eci.gov.in using Aadhaar',
        '2️⃣ Learn about candidates during the Campaigning phase',
        '3️⃣ Vote at your booth on Polling Day using EVM',
        '4️⃣ Results declared — government formed',
      ],
      tip: 'Ask me about any specific phase for detailed information!',
    };
  }

  return {
    short: "I can help with any of these election topics:",
    steps: [
      '"How do I register to vote?"',
      '"What documents do I need?"',
      '"Am I eligible to vote?"',
      '"What happens on polling day?"',
      '"How are election results counted?"',
      '"Explain the campaigning rules"',
      '"Give me an overview of the election process"',
    ],
    tip: 'Try asking about a specific topic — I give structured answers with steps and checklists!',
  };
}

// ─── Page-level summaries ─────────────────────────────────────────────────────
/**
 * @param {'overview'|'registration'|'campaigning'|'polling'|'results'} pageType
 * @param {{ age?: number, state?: string, isFirstTime?: boolean }} [userProfile]
 */
export function getPageSummary(pageType, userProfile = {}) {
  const { age, state, isFirstTime } = userProfile;
  const stateStr  = state       ? ` in ${state}`     : '';
  const ageNote   = age         ? ` You are ${age}.` : '';
  const firstNote = isFirstTime ? ' Welcome, first-time voter! 🎉' : '';

  switch (pageType) {
    case 'overview':
      return {
        summary: `India runs the world's largest democratic election.${ageNote}${stateStr ? ` Voters${stateStr} play a crucial role.` : ''} The Election Commission of India (ECI) oversees the entire process.${firstNote}`,
        highlights: ['🗳️ 97 Cr+ registered voters', '📍 10.5 Lakh polling stations', '🏛️ 543 Lok Sabha seats'],
        steps: ['Check your eligibility (18+ citizen)', 'Register on voters.eci.gov.in', 'Explore each phase in the sidebar', 'Take the eligibility quiz!'],
        checklist: ['Know your constituency', 'Verify your name on the voter list', 'Download the Voter Helpline App'],
      };
    case 'registration':
      return {
        summary: `Voter registration (EPIC) is the first step to participating in democracy.${ageNote}${firstNote} Register online via Form 6 at voters.eci.gov.in — takes under 10 minutes.`,
        highlights: [age && age >= 18 ? '✅ You are eligible to register' : '⚠️ Must be 18+ to register', '📄 Next step: Fill Form 6', '⏱️ Card delivered in 2–4 weeks'].filter(Boolean),
        steps: ['Visit voters.eci.gov.in', 'Click "Register as New Voter" → Form 6', 'Enter personal & address details', 'Upload Aadhaar + photo', 'Submit & track your application'],
        checklist: ['Aadhaar card (age + address proof)', 'Passport-size photograph', 'Mobile number for OTP'],
      };
    case 'campaigning':
      return {
        summary: `Campaigning is regulated by the Model Code of Conduct (MCC) enforced by ECI.${stateStr ? ` Candidates${stateStr} have specific spending limits.` : ''}`,
        highlights: ['📢 MCC enforced from announcement day', '💰 Spending cap: ₹40–95 lakh', '🔇 48-hr silence period before polling'],
        steps: ['Parties publish manifestos', 'Candidates file nominations', 'Rallies, ads & door-to-door campaigns run', 'Silence period begins 48 hrs before polling'],
        checklist: ['Check party manifestos at eci.gov.in', 'Report MCC violations to your CEO', "Know your candidate's track record"],
      };
    case 'polling':
      return {
        summary: `Polling Day is when your vote counts! Booths open 7 AM – 6 PM.${ageNote} Carry any of 12 approved photo IDs.${firstNote}`,
        highlights: ['⏰ Booths open 7 AM – 6 PM', '🖊️ Indelible ink marks your finger', '🖥️ EVM + VVPAT ensures security'],
        steps: ['Find your booth on voters.eci.gov.in', 'Carry Voter ID or approved alternate ID', 'Queue up, show ID to officer', 'Vote on EVM, verify VVPAT slip'],
        checklist: ['Voter ID / Aadhaar / Passport / Driving Licence', 'Know your booth number in advance', 'Arrive early to avoid queues'],
      };
    case 'results':
      return {
        summary: `After polling, votes are counted at secure centres. India uses First-Past-The-Post — most votes wins. Results published live on eci.gov.in.`,
        highlights: ['📊 First-Past-The-Post system', '🔒 EVMs counted under security', '🌐 Live results at results.eci.gov.in'],
        steps: ['ECI announces counting date', 'EVMs transported to counting centres', 'Votes tallied round by round', 'Returning Officer declares result'],
        checklist: ['Follow live results at results.eci.gov.in', 'Know: simple majority vs absolute majority', 'Government formation within 30 days'],
      };
    default:
      return { summary: 'Navigate the sidebar phases to learn about each stage of the Indian election process.', highlights: [], steps: [], checklist: [] };
  }
}
