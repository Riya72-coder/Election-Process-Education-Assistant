export const phases = [
  { id: 'overview',      label: 'Overview',      icon: 'Home',         color: 'civic' },
  { id: 'registration',  label: 'Registration',   icon: 'ClipboardList', color: 'teal' },
  { id: 'campaigning',   label: 'Campaigning',    icon: 'Megaphone',    color: 'saffron' },
  { id: 'polling',       label: 'Polling Day',    icon: 'Vote',         color: 'civic' },
  { id: 'results',       label: 'Results',        icon: 'BarChart3',    color: 'teal' },
  { id: 'quiz',          label: 'Eligibility Quiz', icon: 'HelpCircle', color: 'saffron' },
];

export const overviewData = {
  title: 'India\'s Democratic Journey',
  subtitle: 'The World\'s Largest Democracy',
  description:
    'India conducts the largest democratic elections on the planet. With over 97 crore registered voters and nearly 10 lakh polling stations, every election is a massive civic enterprise. The Election Commission of India (ECI) oversees free and fair elections for the Lok Sabha, State Assemblies, and local bodies.',
  stats: [
    { label: 'Registered Voters', value: '97 Crore+', icon: 'Users' },
    { label: 'Polling Stations', value: '10.5 Lakh+', icon: 'MapPin' },
    { label: 'Lok Sabha Seats', value: '543', icon: 'Building2' },
    { label: 'State Assemblies', value: '28 States', icon: 'Flag' },
  ],
  timeline: [
    { year: '1950', event: 'Constitution of India adopted; ECI established' },
    { year: '1951–52', event: 'First General Election — 17.3 crore voters participated' },
    { year: '1989', event: 'Voting age lowered from 21 to 18 years' },
    { year: '1994', event: 'Photo Electoral Rolls introduced' },
    { year: '2004', event: 'EVMs used nationwide for the first time' },
    { year: '2019', event: 'Largest election in history — 61.4 crore votes cast' },
    { year: '2024', event: '18th Lok Sabha election with record voter enrolment' },
  ],
  didYouKnow:
    'India\'s election commission is a constitutional body that operates independently of the government. No party in power can influence its decisions!',
};

export const registrationData = {
  title: 'Voter Registration',
  subtitle: 'Your First Step to Democracy',
  description:
    'Before you can cast your vote, you must be enrolled in the Electoral Roll. This is a list maintained by the Election Commission containing the names of all eligible voters in a constituency.',
  eligibility: [
    { label: 'Age', detail: 'Must be 18 years or older on the qualifying date (1st January of that year)' },
    { label: 'Citizenship', detail: 'Must be a citizen of India' },
    { label: 'Residence', detail: 'Must be ordinarily resident in the constituency where applying' },
    { label: 'Mental Capacity', detail: 'Must not be of unsound mind as declared by a competent court' },
    { label: 'Not Disqualified', detail: 'Must not be disqualified under any law relating to corrupt practices or election offences' },
  ],
  steps: [
    { step: 1, title: 'Fill Form 6', detail: 'Download Form 6 from voters.eci.gov.in or get it from your local BLO (Booth Level Officer)' },
    { step: 2, title: 'Submit Documents', detail: 'Attach proof of age (Aadhaar, birth certificate, school certificate) and address proof' },
    { step: 3, title: 'Verification', detail: 'A Booth Level Officer will visit to verify your details and residence' },
    { step: 4, title: 'Get EPIC', detail: 'Receive your Electors\' Photo Identity Card (Voter ID / EPIC) by post or collect it from the ERO office' },
    { step: 5, title: 'Check Roll', detail: 'Verify your name appears in the final Electoral Roll at voters.eci.gov.in' },
  ],
  forms: [
    { form: 'Form 6',  purpose: 'New voter registration' },
    { form: 'Form 6A', purpose: 'Registration for Indian citizens living abroad' },
    { form: 'Form 7',  purpose: 'Objection to inclusion / deletion' },
    { form: 'Form 8',  purpose: 'Correction of entries in Electoral Roll' },
    { form: 'Form 8A', purpose: 'Transposition to a different polling station' },
  ],
  didYouKnow:
    'You can register online at voters.eci.gov.in using your Aadhaar. The entire process can be completed without visiting any government office!',
};

export const campaigningData = {
  title: 'Campaigning & Model Code of Conduct',
  subtitle: 'Democracy in Action',
  description:
    'Campaigning is how candidates and political parties communicate their vision to voters. Once elections are announced, the Model Code of Conduct (MCC) kicks in to ensure a level playing field.',
  mccPoints: [
    { title: 'No Hate Speech', detail: 'Candidates cannot make appeals based on religion, caste, community, or language to gain votes' },
    { title: 'No Bribery', detail: 'Distributing cash, gifts, liquor, or any material inducement to voters is a criminal offence' },
    { title: 'Equal Use of Government Resources', detail: 'The ruling party cannot use government machinery or funds for campaign activities' },
    { title: 'Silence Period', detail: '48 hours before polling, all campaigning including print, electronic media, and outdoor activities must stop' },
    { title: 'Polling Day Rules', detail: 'No campaign materials within 200 metres of any polling station on polling day' },
  ],
  expenses: [
    { category: 'Lok Sabha Candidate', limit: '₹95 Lakh (General States) / ₹75 Lakh (Smaller States)' },
    { category: 'State Assembly Candidate', limit: '₹40 Lakh (General States) / ₹28 Lakh (Smaller States)' },
  ],
  timeline: [
    { phase: 'Announcement', detail: 'ECI releases election schedule; MCC comes into effect immediately' },
    { phase: 'Nomination', detail: 'Candidates file nomination papers with Returning Officer' },
    { phase: 'Scrutiny', detail: 'Returning Officer scrutinises all nominations' },
    { phase: 'Withdrawal', detail: 'Last date for candidates to withdraw their candidature' },
    { phase: 'Campaign Period', detail: 'Active campaigning through rallies, door-to-door, media, social media etc.' },
    { phase: 'Silence Period', detail: '48 hours before polling — all campaigning stops' },
  ],
  didYouKnow:
    'The Model Code of Conduct was not legislated — it is a voluntary code agreed upon by political parties. It has been followed in every election since 1971!',
};

export const pollingData = {
  title: 'Polling Day',
  subtitle: 'Exercise Your Democratic Right',
  description:
    'Polling Day is when India\'s democratic spirit truly shines. Millions of voters head to polling stations across the country to cast their votes using Electronic Voting Machines (EVMs).',
  whatToBring: [
    { item: 'Voter ID (EPIC)', desc: 'Primary accepted document' },
    { item: 'Aadhaar Card', desc: 'Alternative photo ID' },
    { item: 'Passport', desc: 'Alternative photo ID' },
    { item: 'Driving Licence', desc: 'Alternative photo ID' },
    { item: 'MNREGA Job Card', desc: 'Alternative photo ID with photo' },
    { item: 'Pension Document', desc: 'With photograph — alternative photo ID' },
  ],
  steps: [
    { step: 1, title: 'Find Your Polling Station', detail: 'Visit voters.eci.gov.in to find your assigned polling station. You can also check your Voter Slip received from the BLO.' },
    { step: 2, title: 'Join the Queue', detail: 'Arrive at the polling station. Separate queues are usually maintained for senior citizens, persons with disabilities, and women.' },
    { step: 3, title: 'Identity Verification', detail: 'Show your Voter ID or alternative ID to the Presiding Officer. Your name is marked in the Electoral Roll.' },
    { step: 4, title: 'Receive Ballot', detail: 'The Polling Officer issues voter slip and activates the ballot unit of the EVM.' },
    { step: 5, title: 'Enter Voting Compartment', detail: 'Proceed to the voting compartment ensuring secrecy of your vote.' },
    { step: 6, title: 'Cast Your Vote', detail: 'Press the blue button next to your chosen candidate on the EVM. A beep and green light confirm your vote.' },
    { step: 7, title: 'VVPAT Verification', detail: 'A paper slip (VVPAT) shows the symbol and name of the candidate you voted for. It drops into a sealed box after 7 seconds.' },
    { step: 8, title: 'Get Ink Mark', detail: 'Indelible ink is applied to your left index finger — your badge of democratic participation!' },
  ],
  rights: [
    'You have the right to a secret ballot. No one can know who you voted for.',
    'If you make a mistake before pressing the button, you can request for ballot cancellation.',
    'NOTA (None of the Above) is an option if you don\'t prefer any candidate.',
    'Persons with disabilities have the right to assistance in casting their vote.',
    'You can report any violation at the ECI toll-free number: 1950.',
  ],
  didYouKnow:
    'Indelible ink (used to mark voters\' fingers) was first used in Indian elections in 1962. It was developed by the National Physical Laboratory of India and cannot be washed off for 2–3 weeks!',
};

export const resultsData = {
  title: 'Results & Government Formation',
  subtitle: 'Democracy Delivers Its Verdict',
  description:
    'After polling ends, EVMs are sealed and stored in strong rooms with CCTV coverage and security forces guarding them 24/7. On the counting day, results are declared by Returning Officers.',
  countingSteps: [
    { step: 1, title: 'Counting Day', detail: 'EVMs are transported to counting centres under strict security. Counting agents of all candidates are present.' },
    { step: 2, title: 'Postal Ballot Count', detail: 'Postal ballots (from armed forces, NRIs, etc.) are counted first.' },
    { step: 3, title: 'EVM Round Counting', detail: 'EVMs are counted round by round. Each round covers votes from several polling stations.' },
    { step: 4, title: 'VVPAT Matching', detail: 'VVPAT slips are matched with EVM count for verification rounds as mandated by the Supreme Court.' },
    { step: 5, title: 'Winner Declared', detail: 'The candidate with the highest votes in First-Past-The-Post (FPTP) system wins the seat.' },
    { step: 6, title: 'Return of Election', detail: 'Returning Officer certifies and declares the result officially.' },
  ],
  governmentFormation: [
    { title: 'Simple Majority', detail: 'To form a government, the alliance/party must win 272+ seats (majority in 543-seat Lok Sabha)' },
    { title: 'President\'s Role', detail: 'The President invites the leader of the majority party/alliance to form the government' },
    { title: 'PM & Cabinet', detail: 'Prime Minister sworn in; Cabinet allocated portfolios; Council of Ministers takes charge' },
    { title: 'Opposition', detail: 'The second largest party (with 10% seats) becomes the Official Opposition with a Leader of Opposition' },
  ],
  keyConcepts: [
    { term: 'FPTP', meaning: 'First Past The Post — the candidate with most votes wins, even without a majority' },
    { term: 'Hung Parliament', meaning: 'When no single party wins a clear majority, requiring coalition building' },
    { term: 'By-election', meaning: 'Mid-term election held when a sitting MP/MLA seat becomes vacant' },
    { term: 'Re-polling', meaning: 'Fresh polling ordered by ECI in case of booth capturing, violence or technical failure' },
  ],
  didYouKnow:
    'India uses the fastest election result declaration system globally. Results for all 543 Lok Sabha seats are typically declared within 24 hours of counting beginning!',
};
