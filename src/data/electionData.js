export const phases = [
  { id: 'overview',      label: 'Overview',        icon: 'Home',          color: 'civic' },
  { id: 'registration',  label: 'Registration',     icon: 'ClipboardList', color: 'teal' },
  { id: 'campaigning',   label: 'Campaigning',      icon: 'Megaphone',     color: 'saffron' },
  { id: 'polling',       label: 'Polling Day',      icon: 'Vote',          color: 'civic' },
  { id: 'results',       label: 'Results',          icon: 'BarChart3',     color: 'teal' },
  { id: 'quiz',          label: 'Eligibility Quiz', icon: 'HelpCircle',    color: 'saffron' },
];

// ──────────────────────────────────────────────
// OVERVIEW
// ──────────────────────────────────────────────
export const overviewData = {
  title: "India's Democratic Journey",
  subtitle: "The World's Largest Democracy",
  description:
    'India conducts the largest democratic elections on the planet. With over 97 crore registered voters and nearly 10 lakh polling stations, every election is a massive civic enterprise. The Election Commission of India (ECI) oversees free and fair elections for the Lok Sabha, State Assemblies, and local bodies.',

  stats: [
    { label: 'Registered Voters', value: '97 Crore+', icon: 'Users' },
    { label: 'Polling Stations',  value: '10.5 Lakh+', icon: 'MapPin' },
    { label: 'Lok Sabha Seats',   value: '543',         icon: 'Building2' },
    { label: 'State Assemblies',  value: '28 States',   icon: 'Flag' },
  ],

  // Journey cards on the Overview page — each one navigates to a phase
  journeyCards: [
    {
      phase: 'Voter Registration',
      phaseId: 'registration',
      summary: 'Get your EPIC (Voter ID) card and enrol in the Electoral Roll. Takes just 5 minutes online!',
      color: 'bg-teal-600',
    },
    {
      phase: 'Campaigning & MCC',
      phaseId: 'campaigning',
      summary: 'How parties campaign, what candidates can and cannot do, and expense limits.',
      color: 'bg-orange-500',
    },
    {
      phase: 'Polling Day',
      phaseId: 'polling',
      summary: 'The EVM and VVPAT process, indelible ink, and your rights inside the booth.',
      color: 'bg-civic-600',
    },
    {
      phase: 'Results & Government',
      phaseId: 'results',
      summary: 'How votes are counted, FPTP system, and how the new government is formed.',
      color: 'bg-teal-700',
    },
  ],

  timeline: [
    { year: '1950',    event: 'Constitution of India adopted; Election Commission of India (ECI) established' },
    { year: '1951–52', event: 'First General Election — 17.3 crore voters participated across 489 constituencies' },
    { year: '1989',    event: 'Voting age lowered from 21 to 18 years — crores of young Indians gained the right to vote' },
    { year: '1994',    event: 'Photo Electoral Rolls introduced; EPIC (Voter ID) cards issued for the first time' },
    { year: '2004',    event: 'EVMs used nationwide for the first time in a General Election' },
    { year: '2013',    event: 'NOTA (None of the Above) option introduced by Supreme Court directive' },
    { year: '2019',    event: 'Largest election in human history — 61.4 crore votes cast; VVPAT deployed nationwide' },
    { year: '2024',    event: '18th Lok Sabha election with record voter enrolment; Pune district records 58.2% turnout' },
  ],

  // Pune-specific fact
  didYouKnow:
    '🏙️ Pune has over 82 lakh registered voters across its Lok Sabha constituencies (Pune & Baramati). ' +
    'The Pune district Collectorate serves as the nodal Zonal Office and coordinates all election logistics — ' +
    'from EVM allocation to Booth Level Officer (BLO) assignments — across 21 Vidhan Sabha segments. ' +
    'In the 2024 General Election, Pune city\'s voter turnout was approximately 58%, with first-time voters ' +
    'aged 18–19 making up the fastest-growing enrolment segment. 🗳️',
};

// ──────────────────────────────────────────────
// REGISTRATION
// ──────────────────────────────────────────────
export const registrationData = {
  title: 'Voter Registration',
  subtitle: 'Your First Step to Democracy',
  description:
    'Before you can cast your vote, you must be enrolled in the Electoral Roll — the official list of eligible voters in your constituency. Once enrolled, you receive your EPIC (Electors\' Photo Identity Card), commonly known as the Voter ID card.',

  epicHighlight: {
    title: 'EPIC — Electors\' Photo Identity Card',
    points: [
      'Introduced in 1993 by the ECI to reduce impersonation at polling booths',
      'Contains your name, serial number, constituency, photo, and a unique EPIC number',
      'Now available as a digital e-EPIC (PDF) downloadable from voters.eci.gov.in',
      'Accepted as a valid ID for banking, SIM registration, and other KYC purposes',
      'Lost your EPIC? Apply for a duplicate online using Form 002 on the Voter Helpline App',
    ],
  },

  eligibility: [
    { label: 'Age',              detail: 'Must be 18 years or older on the qualifying date (1st January of that year)' },
    { label: 'Citizenship',      detail: 'Must be a citizen of India' },
    { label: 'Residence',        detail: 'Must be ordinarily resident in the constituency where applying' },
    { label: 'Mental Capacity',  detail: 'Must not be of unsound mind as declared by a competent court' },
    { label: 'Not Disqualified', detail: 'Must not be disqualified under any law relating to corrupt practices or election offences' },
  ],

  steps: [
    { step: 1, title: 'Fill Form 6', detail: 'Apply online at voters.eci.gov.in or via the Voter Helpline App. Offline: collect Form 6 from your local BLO (Booth Level Officer) or ERO office.' },
    { step: 2, title: 'Submit Documents', detail: 'Attach proof of age (Aadhaar, birth certificate, school leaving certificate) and address proof (utility bill, rent agreement).' },
    { step: 3, title: 'BLO Verification', detail: 'A Booth Level Officer will visit your residence to physically verify your details. Keep your documents handy.' },
    { step: 4, title: 'Receive EPIC', detail: 'Your EPIC (Voter ID) is dispatched by post. You can also download the e-EPIC (digital Voter ID) on the Voter Helpline App immediately after approval.' },
    { step: 5, title: 'Verify in Roll', detail: 'Always confirm your name appears in the final Electoral Roll at voters.eci.gov.in before election day.' },
  ],

  forms: [
    { form: 'Form 6',  purpose: 'New voter registration (Indian citizens)' },
    { form: 'Form 6A', purpose: 'Registration for Indian citizens living abroad (NRIs)' },
    { form: 'Form 7',  purpose: 'Objection to inclusion or request for deletion' },
    { form: 'Form 8',  purpose: 'Correction/update of existing entries in Electoral Roll' },
    { form: 'Form 8A', purpose: 'Transposition to a different polling station within same constituency' },
  ],

  // Pune-specific
  didYouKnow:
    '📱 You can register as a voter entirely online — no office visit needed! ' +
    'In Pune, you can also walk into the District Election Office at Collector\'s Office, Shivajinagar, ' +
    'for in-person assistance. e-EPIC download is instant once your application is approved — ' +
    'save it to your phone and use it at the polling booth. No need to carry the physical plastic card!',
};

// ──────────────────────────────────────────────
// CAMPAIGNING
// ──────────────────────────────────────────────
export const campaigningData = {
  title: 'Campaigning & Model Code of Conduct',
  subtitle: 'Democracy in Action',
  description:
    'Campaigning is how candidates and political parties communicate their vision to voters. Once elections are announced, the Model Code of Conduct (MCC) kicks in immediately to ensure a level playing field.',

  mccPoints: [
    { title: 'No Hate Speech',                   detail: 'Candidates cannot make appeals based on religion, caste, community, or language to gain votes' },
    { title: 'No Bribery',                        detail: 'Distributing cash, gifts, liquor, or any material inducement to voters is a criminal offence' },
    { title: 'Equal Use of Government Resources', detail: 'The ruling party cannot use government machinery, vehicles, or funds for campaign activities' },
    { title: 'Silence Period',                    detail: '48 hours before polling, all campaigning — print, electronic, outdoor — must completely stop' },
    { title: 'Polling Day Rules',                 detail: 'No campaign materials within 200 metres of any polling station on polling day' },
  ],

  expenses: [
    { category: 'Lok Sabha Candidate',        limit: '₹95 Lakh (General States) / ₹75 Lakh (Smaller States)' },
    { category: 'State Assembly Candidate',   limit: '₹40 Lakh (General States) / ₹28 Lakh (Smaller States)' },
  ],

  timeline: [
    { phase: 'Announcement',    detail: 'ECI releases election schedule; MCC comes into effect immediately' },
    { phase: 'Nomination',      detail: 'Candidates file nomination papers with the Returning Officer within the specified window' },
    { phase: 'Scrutiny',        detail: 'Returning Officer scrutinises all nominations for eligibility and document completeness' },
    { phase: 'Withdrawal',      detail: 'Last date for candidates to withdraw their candidature' },
    { phase: 'Campaign Period', detail: 'Active campaigning through rallies, door-to-door visits, media, and social media' },
    { phase: 'Silence Period',  detail: '48 hours before polling day — all campaigning activities stop' },
  ],

  didYouKnow:
    'The Model Code of Conduct is not a law — it is a voluntary code of ethics agreed upon by political parties. ' +
    'The ECI has zero tolerance for violations and has ordered re-polling in the past based solely on MCC breaches!',
};

// ──────────────────────────────────────────────
// POLLING
// ──────────────────────────────────────────────
export const pollingData = {
  title: 'Polling Day',
  subtitle: 'Exercise Your Democratic Right',
  description:
    'Polling Day is when India\'s democratic spirit truly shines. Millions of voters head to their polling stations to cast votes using Electronic Voting Machines (EVMs) — verified by a paper trail through the VVPAT system.',

  evmVvpat: {
    title: 'EVM + VVPAT — How They Work Together',
    evm: [
      'EVM stands for Electronic Voting Machine. It has two units: a Control Unit (with the Presiding Officer) and a Ballot Unit (inside your voting compartment).',
      'When you press the button next to your chosen candidate\'s name and symbol, the EVM records your vote electronically.',
      'A green LED lights up and you hear a beep — confirmation that your vote has been registered.',
      'EVMs store votes without any network connection, making hacking impossible.',
    ],
    vvpat: [
      'VVPAT stands for Voter Verifiable Paper Audit Trail — your paper receipt of democracy.',
      'After you press the EVM button, the VVPAT unit prints a slip showing the candidate\'s symbol, name, and serial number.',
      'The slip is visible through a glass window for exactly 7 seconds, then drops into a sealed box automatically.',
      'This paper trail allows independent verification of EVM count during disputes, as mandated by the Supreme Court of India.',
    ],
  },

  indelibleInk: {
    title: 'The Indelible Ink — Your Badge of Democracy',
    facts: [
      'Applied to the left index finger after voting to prevent double voting',
      'Developed by the National Physical Laboratory of India (NPLI) in Pune\'s own scientific ecosystem',
      'Supplied exclusively by Mysuru Paints & Varnish Ltd. (a Government of Karnataka enterprise)',
      'Cannot be washed off — stays visible for 2 to 3 weeks',
      'First used in Indian elections in 1962; now exported to over 25 countries for their elections',
    ],
  },

  whatToBring: [
    { item: 'Voter ID (EPIC)',     desc: 'Primary document — physical card or e-EPIC on your phone' },
    { item: 'Aadhaar Card',        desc: 'Accepted as alternative photo ID' },
    { item: 'Passport',            desc: 'Accepted as alternative photo ID' },
    { item: 'Driving Licence',     desc: 'Accepted as alternative photo ID' },
    { item: 'MNREGA Job Card',     desc: 'Accepted with photograph' },
    { item: 'Pension Document',    desc: 'With photograph — alternative photo ID' },
  ],

  steps: [
    { step: 1, title: 'Find Your Polling Station', detail: 'Check voters.eci.gov.in or your Voter Slip from the BLO. In Pune, stations are typically schools and community halls in your ward.' },
    { step: 2, title: 'Arrive & Join the Queue',   detail: 'Separate queues for senior citizens, persons with disabilities, and women. PwD voters get priority access.' },
    { step: 3, title: 'Identity Verification',     detail: 'Show your EPIC or alternative ID. The Polling Officer marks your name in the Electoral Roll register.' },
    { step: 4, title: 'Receive Voter Slip',         detail: 'A Polling Officer activates the Ballot Unit of the EVM specifically for you.' },
    { step: 5, title: 'Enter Voting Compartment',  detail: 'Step into the screened compartment. No mobile phones allowed. Your ballot is completely secret.' },
    { step: 6, title: 'Cast Your Vote on EVM',     detail: 'Press the blue button next to your chosen candidate. A beep + green LED confirms your vote is registered.' },
    { step: 7, title: 'Check the VVPAT Slip',      detail: 'View the VVPAT paper slip through the window (7 seconds). It shows your candidate\'s name and symbol — your verifiable proof.' },
    { step: 8, title: 'Collect Indelible Ink Mark', detail: 'Indelible ink is applied to your left index finger. Wear it proudly — it\'s your badge of civic participation!' },
  ],

  rights: [
    'You have the right to a completely secret ballot — no one can know who you voted for.',
    'If you accidentally press the wrong button before it registers, inform the Presiding Officer immediately.',
    'NOTA (None of the Above) is available on every EVM if you prefer not to vote for any candidate.',
    'Persons with Disabilities (PwD) have the right to a companion of their choice for assistance.',
    'Report any violations, booth capturing, or inducement: ECI Toll-Free Helpline 1950.',
  ],

  // Pune-specific
  didYouKnow:
    '🖊️ The indelible ink used in Indian elections is manufactured at Mysuru Paints & Varnish Ltd., ' +
    'but the original research was done at India\'s National Physical Laboratory. ' +
    'Pune\'s own NPLI connection: the formula was validated by NPL researchers in collaboration with scientists ' +
    'from Pune University\'s Chemistry Department. The ink has been exported to over 25 countries, ' +
    'including South Africa, Malaysia, and Ghana, for use in their national elections! ' +
    'In Pune\'s 2024 Lok Sabha election, over 4,800 polling stations used EVMs across the city and its outskirts.',
};

// ──────────────────────────────────────────────
// RESULTS
// ──────────────────────────────────────────────
export const resultsData = {
  title: 'Results & Government Formation',
  subtitle: 'Democracy Delivers Its Verdict',
  description:
    'After polling ends, EVMs are sealed and stored in strong rooms under 24/7 CCTV surveillance and armed security. On counting day, every vote is meticulously tallied and results are declared by Returning Officers.',

  countingSteps: [
    { step: 1, title: 'Counting Day',        detail: 'EVMs are transported from strong rooms to counting centres under strict security. Counting agents of all candidates are present.' },
    { step: 2, title: 'Postal Ballot Count', detail: 'Postal ballots (armed forces, essential services, NRIs, PWDs) are counted first before EVM counting begins.' },
    { step: 3, title: 'EVM Round Counting',  detail: 'EVMs from each polling station are counted one at a time. Results are displayed on a large screen after each round.' },
    { step: 4, title: 'VVPAT Matching',      detail: 'As per Supreme Court directive, VVPAT slips are matched with EVM count for mandatory verification rounds.' },
    { step: 5, title: 'Winner Declared',     detail: 'The candidate with the highest votes under the First-Past-The-Post (FPTP) system wins — no majority needed.' },
    { step: 6, title: 'Return of Election',  detail: 'Returning Officer officially certifies and publicly declares the winner. Results are uploaded to ECI\'s website in real-time.' },
  ],

  governmentFormation: [
    { title: 'Simple Majority',      detail: 'To form a government, the alliance/party must win 272+ seats (majority in the 543-seat Lok Sabha)' },
    { title: "President's Role",     detail: "The President invites the leader of the majority party/alliance to form the government and be sworn in as Prime Minister" },
    { title: 'PM & Cabinet',         detail: "Prime Minister sworn in; Cabinet ministers allocated portfolios; Council of Ministers takes charge of governance" },
    { title: 'Official Opposition',  detail: 'The second largest party (with at least 10% of seats) becomes the Official Opposition with a Leader of Opposition' },
  ],

  keyConcepts: [
    { term: 'FPTP',           meaning: 'First Past The Post — the candidate with the most votes wins, even without an absolute majority' },
    { term: 'Hung Parliament', meaning: 'When no single party wins a clear majority, requiring coalition-building to form a government' },
    { term: 'By-election',    meaning: 'Mid-term election held when a sitting MP/MLA seat becomes vacant due to death, disqualification, or resignation' },
    { term: 'Re-polling',     meaning: 'Fresh polling ordered by ECI in specific booths due to booth capturing, violence, or EVM technical failure' },
    { term: 'NOTA',           meaning: 'None of the Above — option on EVM allowing voters to formally reject all candidates' },
  ],

  didYouKnow:
    'India uses one of the fastest election result declaration systems in the world. ' +
    'Results for all 543 Lok Sabha seats are typically declared within 24 hours of counting starting! ' +
    'In the 2024 general election, the ECI\'s Results Monitoring System updated seat tallies every 30 minutes, ' +
    'with millions of citizens tracking progress live on the ECI website and the Voter Helpline App.',
};
