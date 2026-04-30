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
export function getAIResponse(input, userProfile = {}, lang = 'en') {
  const { age, state, isFirstTime } = userProfile;
  const lc = input.toLowerCase();

  const responses = {
    en: {
      journey: {
        short: `Welcome${age ? `, ${age}-year-old` : ''}! 🇮🇳 ${isFirstTime ? "As a first-time voter, here's your complete guide:" : "Here's your personalised election roadmap:"}`,
        steps: [
          '📝 Step 1 — Register: visit voters.eci.gov.in and complete Form 6',
          '📢 Step 2 — Campaigning: read manifestos, know your candidate',
          '🗳️ Step 3 — Polling Day: carry ID, head to booth, cast your vote on EVM',
          '📊 Step 4 — Results: follow live counting on results.eci.gov.in',
        ]
      },
      eligibility: {
        short: (age && age < 18) 
          ? `Since you are ${age}, you must be at least 18 years old to vote in India.`
          : `You are eligible to vote in India if you are 18 or older! 🎉`,
        steps: [
          'Must be a citizen of India',
          'Must be at least 18 years old on the qualifying date',
          'Must be registered in your constituency'
        ]
      },
      fallback: {
        short: "I'm here to help you understand the Indian election process! You can ask about registration, campaigning rules, polling day procedures, or how results are declared.",
        tip: "Try asking: 'How do I register?' or 'What is an EVM?'"
      }
    },
    hi: {
      journey: {
        short: `स्वागत है${age ? `, ${age} वर्षीय` : ''}! 🇮🇳 ${isFirstTime ? "पहली बार मतदाता के रूप में, यहाँ आपकी पूरी मार्गदर्शिका है:" : "यहाँ आपका व्यक्तिगत चुनाव रोडमैप है:"}`,
        steps: [
          '📝 चरण 1 — पंजीकरण: voters.eci.gov.in पर जाएं और फॉर्म 6 भरें',
          '📢 चरण 2 — प्रचार: घोषणापत्र पढ़ें, अपने उम्मीदवार को जानें',
          '🗳️ चरण 3 — मतदान दिवस: पहचान पत्र ले जाएं, बूथ पर जाएं, EVM पर वोट डालें',
          '📊 चरण 4 — परिणाम: results.eci.gov.in पर लाइव गिनती देखें',
        ]
      },
      eligibility: {
        short: (age && age < 18)
          ? `चूंकि आपकी आयु ${age} है, इसलिए भारत में वोट देने के लिए आपकी आयु कम से कम 18 वर्ष होनी चाहिए।`
          : `यदि आप 18 वर्ष या उससे अधिक के हैं तो आप भारत में वोट देने के पात्र हैं! 🎉`,
        steps: [
          'भारत का नागरिक होना चाहिए',
          'अर्हता तिथि पर कम से कम 18 वर्ष की आयु होनी चाहिए',
          'अपने निर्वाचन क्षेत्र में पंजीकृत होना चाहिए'
        ]
      },
      fallback: {
        short: "मैं भारतीय चुनाव प्रक्रिया को समझने में आपकी मदद करने के लिए यहाँ हूँ! आप पंजीकरण, प्रचार नियमों, मतदान दिवस की प्रक्रियाओं या परिणामों की घोषणा के बारे में पूछ सकते हैं।",
        tip: "पूछने का प्रयास करें: 'मैं पंजीकरण कैसे करूँ?' या 'ईवीएम क्या है?'"
      }
    },
    mr: {
      journey: {
        short: `स्वागत आहे${age ? `, ${age} वर्षीय` : ''}! 🇮🇳 ${isFirstTime ? "प्रथमच मतदान करणाऱ्यांसाठी ही संपूर्ण मार्गदर्शिका आहे:" : "येथे तुमचा वैयक्तिक निवडणूक रोडमॅप आहे:"}`,
        steps: [
          '📝 टप्पा 1 — नोंदणी: voters.eci.gov.in ला भेट द्या आणि फॉर्म 6 भरा',
          '📢 टप्पा 2 — प्रचार: जाहीरनामे वाचा, तुमच्या उमेदवाराला ओळखा',
          '🗳️ टप्पा 3 — मतदानाचा दिवस: ओळखपत्र सोबत ठेवा, बूथवर जा, EVM वर मतदान करा',
          '📊 टप्पा 4 — निकाल: results.eci.gov.in वर लाइव्ह मोजणी पहा',
        ]
      },
      eligibility: {
        short: (age && age < 18)
          ? `तुमचे वय ${age} असल्यामुळे, भारतात मतदान करण्यासाठी तुमचे वय किमान 18 वर्षे असणे आवश्यक आहे.`
          : `तुमचे वय 18 किंवा त्यापेक्षा जास्त असल्यास तुम्ही भारतात मतदान करण्यास पात्र आहात! 🎉`,
        steps: [
          'भारतीय नागरिक असणे आवश्यक आहे',
          'पात्रता तारखेला किमान 18 वर्षे पूर्ण असावीत',
          'तुमच्या मतदारसंघात नोंदणी केलेली असावी'
        ]
      },
      fallback: {
        short: "भारतीय निवडणूक प्रक्रिया समजून घेण्यात मदत करण्यासाठी मी येथे आहे! तुम्ही नोंदणी, प्रचाराचे नियम, मतदानाच्या दिवसाची प्रक्रिया किंवा निकाल कसा जाहीर केला जातो याबद्दल विचारू शकता.",
        tip: "विचारून पहा: 'मी नोंदणी कशी करू?' किंवा 'EVM म्हणजे काय?'"
      }
    },
    bn: {
      journey: {
        short: `স্বাগতম${age ? `, ${age} বছর বয়সী` : ''}! 🇮🇳 ${isFirstTime ? "প্রথমবার ভোটার হিসেবে, এখানে আপনার সম্পূর্ণ গাইড রয়েছে:" : "এখানে আপনার ব্যক্তিগতকৃত নির্বাচনী রোডম্যাপ রয়েছে:"}`,
        steps: [
          '📝 ধাপ ১ — নিবন্ধন: voters.eci.gov.in দেখুন এবং ফর্ম ৬ পূরণ করুন',
          '📢 ধাপ ২ — প্রচার: ইশতেহার পড়ুন, আপনার প্রার্থীকে জানুন',
          '🗳️ ধাপ ৩ — ভোটের দিন: আইডি বহন করুন, বুথে যান, EVM-এ ভোট দিন',
          '📊 ধাপ ৪ — ফলাফল: results.eci.gov.in-এ লাইভ গণনা দেখুন',
        ]
      },
      eligibility: {
        short: (age && age < 18)
          ? `যেহেতু আপনার বয়স ${age}, তাই ভারতে ভোট দেওয়ার জন্য আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে।`
          : `আপনার বয়স ১৮ বা তার বেশি হলে আপনি ভারতে ভোট দেওয়ার যোগ্য! 🎉`,
        steps: [
          'অবশ্যই ভারতের নাগরিক হতে হবে',
          'যোগ্যতার তারিখে অন্তত ১৮ বছর বয়স হতে হবে',
          'আপনার নির্বাচনী এলাকায় নিবন্ধিত হতে হবে'
        ]
      },
      fallback: {
        short: "আমি আপনাকে ভারতীয় নির্বাচন প্রক্রিয়া বুঝতে সাহায্য করার জন্য এখানে আছি! আপনি নিবন্ধন, প্রচারের নিয়ম, ভোটের দিনের পদ্ধতি বা কীভাবে ফলাফল ঘোষণা করা হয় সে সম্পর্কে জিজ্ঞাসা করতে পারেন।",
        tip: "জিজ্ঞাসা করার চেষ্টা করুন: 'আমি কীভাবে নিবন্ধন করব?' বা 'EVM কী?'"
      }
    },
    ta: {
      journey: {
        short: `வரவேற்கிறோம்${age ? `, ${age} வயதுடையவரே` : ''}! 🇮🇳 ${isFirstTime ? "முதல்முறை வாக்காளராக, உங்களுக்கான முழுமையான வழிகாட்டி இதோ:" : "உங்களுக்கான தனிப்பயனாக்கப்பட்ட தேர்தல் சாலை வரைபடம் இதோ:"}`,
        steps: [
          '📝 நிலை 1 — பதிவு: voters.eci.gov.in ஐப் பார்வையிட்டு படிவம் 6 ஐ நிரப்பவும்',
          '📢 நிலை 2 — பிரச்சாரம்: தேர்தல் அறிக்கைகளைப் படிக்கவும், உங்கள் வேட்பாளரை அறியவும்',
          '🗳️ நிலை 3 — வாக்குப்பதிவு நாள்: அடையாள அட்டையை எடுத்துச் செல்லவும், பூத்திற்குச் செல்லவும், EVM இல் வாக்களிக்கவும்',
          '📊 நிலை 4 — முடிவுகள்: results.eci.gov.in இல் நேரலை எண்ணிக்கையைப் பார்க்கவும்',
        ]
      },
      eligibility: {
        short: (age && age < 18)
          ? `உங்கள் வயது ${age} என்பதால், இந்தியாவில் வாக்களிக்க உங்களுக்கு குறைந்தது 18 வயது இருக்க வேண்டும்.`
          : `உங்களுக்கு 18 அல்லது அதற்கு மேல் வயது இருந்தால் நீங்கள் இந்தியாவில் வாக்களிக்க தகுதியுடையவர்! 🎉`,
        steps: [
          'இந்தியக் குடிமகனாக இருக்க வேண்டும்',
          'தகுதித் தேதியில் குறைந்தபட்சம் 18 வயது இருக்க வேண்டும்',
          'உங்கள் தொகுதியில் பதிவு செய்திருக்க வேண்டும்'
        ]
      },
      fallback: {
        short: "இந்திய தேர்தல் செயல்முறையை நீங்கள் புரிந்து கொள்ள உதவ நான் இங்கே இருக்கிறேன்! பதிவு, பிரச்சார விதிகள், வாக்குப்பதிவு நாள் நடைமுறைகள் அல்லது முடிவுகள் எவ்வாறு அறிவிக்கப்படுகின்றன என்பதைப் பற்றி நீங்கள் கேட்கலாம்.",
        tip: "கேட்க முயற்சி செய்யுங்கள்: 'நான் எப்படி பதிவு செய்வது?' அல்லது 'EVM என்றால் என்ன?'"
      }
    },
    te: {
      journey: {
        short: `స్వాగతం${age ? `, ${age} ఏళ్ల వారు` : ''}! 🇮🇳 ${isFirstTime ? "తొలిసారి ఓటరుగా, మీ కోసం పూర్తి గైడ్ ఇక్కడ ఉంది:" : "మీ కోసం వ్యక్తిగతీకరించిన ఎన్నికల రోడ్ మ్యాప్ ఇక్కడ ఉంది:"}`,
        steps: [
          '📝 దశ 1 — నమోదు: voters.eci.gov.in ని సందర్శించి ఫారమ్ 6 పూర్తి చేయండి',
          '📢 దశ 2 — ప్రచారం: మేనిఫెస్టోలను చదవండి, మీ అభ్యర్థిని తెలుసుకోండి',
          '🗳️ దశ 3 — పోలింగ్ రోజు: ఐడీ తీసుకెళ్లండి, బూత్‌కు వెళ్లండి, EVMపై ఓటు వేయండి',
          '📊 దశ 4 — ఫలితాలు: results.eci.gov.inలో లైవ్ కౌంటింగ్ అనుసరించండి',
        ]
      },
      eligibility: {
        short: (age && age < 18)
          ? `మీ వయస్సు ${age} కాబట్టి, భారతదేశంలో ఓటు వేయడానికి మీకు కనీసం 18 ఏళ్లు ఉండాలి.`
          : `మీకు 18 లేదా అంతకంటే ఎక్కువ వయస్సు ఉంటే మీరు భారతదేశంలో ఓటు వేయడానికి అర్హులు! 🎉`,
        steps: [
          'భారత పౌరుడై ఉండాలి',
          'అర్హత తేదీ నాటికి కనీసం 18 ఏళ్లు నిండి ఉండాలి',
          'మీ నియోజకవర్గంలో నమోదై ఉండాలి'
        ]
      },
      fallback: {
        short: "భారత ఎన్నికల ప్రక్రియను అర్థం చేసుకోవడంలో మీకు సహాయపడటానికి నేను ఇక్కడ ఉన్నాను! మీరు నమోదు, ప్రచార నిబంధనలు, పోలింగ్ రోజు విధానాలు లేదా ఫలితాలు ఎలా ప్రకటించబడతాయో అడగవచ్చు.",
        tip: "ఇలా అడిగి చూడండి: 'నేను ఎలా నమోదు చేసుకోవాలి?' లేదా 'EVM అంటే ఏమిటి?'"
      }
    }
  };

  const t = responses[lang] || responses.en;

  // ── Detect topic ──────────────────────────────────────────────────────────
  const isJourney      = matches(lc, ['journey', 'guide me', 'step by step', 'i am', 'years old', 'walk me', 'roadmap', 'ప్రయాణం', 'पप्रवास', 'यात्रा', 'பயணம்']);
  const isEligibility  = matches(lc, ['eligible', 'qualify', 'can i vote', 'am i eligible', 'who can vote', 'age limit', 'అర్హత', 'पाత్రత', 'যোগ্যতা', 'தகுதி']);
  const isRegistration = matches(lc, ['register', 'registration', 'enroll', 'voter id', 'epic', 'form 6', 'नमोदणी', 'पंजीकरण', 'নিবন্ধন', 'பதிவு', 'నమోదు']);

  if (isJourney) return t.journey;
  if (isEligibility) return t.eligibility;
  if (isRegistration) {
    return {
      short: lang === 'en' ? "To register as a voter, you need to file Form 6 on the ECI Voter Portal." : t.journey.steps[0],
      steps: t.journey.steps.slice(0, 1)
    };
  }

  // Fallback to English-like behavior for other topics if needed, or just return fallback
  return t.fallback;
}



// ─── Page-level summaries ─────────────────────────────────────────────────────
/**
 * @param {'overview'|'registration'|'campaigning'|'polling'|'results'} pageType
 * @param {{ age?: number, state?: string, isFirstTime?: boolean }} [userProfile]
 * @param {string} [lang='en']
 */
export function getPageSummary(pageType, userProfile = {}, lang = 'en') {
  const { age, state, isFirstTime } = userProfile;

  const translations = {
    en: {
      stateStr: state ? ` in ${state}` : '',
      ageNote: age ? ` You are ${age}.` : '',
      firstNote: isFirstTime ? ' Welcome, first-time voter! 🎉' : '',
      overview: {
        summary: `India runs the world's largest democratic election.{ageNote}{stateStr} The Election Commission of India (ECI) oversees the entire process.{firstNote}`,
        highlights: ['🗳️ 97 Cr+ registered voters', '📍 10.5 Lakh polling stations', '🏛️ 543 Lok Sabha seats'],
        steps: ['Check your eligibility (18+ citizen)', 'Register on voters.eci.gov.in', 'Explore each phase in the sidebar', 'Take the eligibility quiz!'],
        checklist: ['Know your constituency', 'Verify your name on the voter list', 'Download the Voter Helpline App'],
      },
      registration: {
        summary: `Voter registration (EPIC) is the first step to participating in democracy.{ageNote}{firstNote} Register online via Form 6 at voters.eci.gov.in — takes under 10 minutes.`,
        highlights: [age && age >= 18 ? '✅ You are eligible to register' : '⚠️ Must be 18+ to register', '📄 Next step: Fill Form 6', '⏱️ Card delivered in 2–4 weeks'].filter(Boolean),
        steps: ['Visit voters.eci.gov.in', 'Click "Register as New Voter" → Form 6', 'Enter personal & address details', 'Upload Aadhaar + photo', 'Submit & track your application'],
        checklist: ['Aadhaar card (age + address proof)', 'Passport-size photograph', 'Mobile number for OTP'],
      },
      campaigning: {
        summary: `Campaigning is regulated by the Model Code of Conduct (MCC) enforced by ECI.{stateStr} Candidates have specific spending limits.`,
        highlights: ['📢 MCC enforced from announcement day', '💰 Spending cap: ₹40–95 lakh', '🔇 48-hr silence period before polling'],
        steps: ['Parties publish manifestos', 'Candidates file nominations', 'Rallies, ads & door-to-door campaigns run', 'Silence period begins 48 hrs before polling'],
        checklist: ['Check party manifestos at eci.gov.in', 'Report MCC violations to your CEO', "Know your candidate's track record"],
      },
      polling: {
        summary: `Polling Day is when your vote counts! Booths open 7 AM – 6 PM.{ageNote} Carry any of 12 approved photo IDs.{firstNote}`,
        highlights: ['⏰ Booths open 7 AM – 6 PM', '🖊️ Indelible ink marks your finger', '🖥️ EVM + VVPAT ensures security'],
        steps: ['Find your booth on voters.eci.gov.in', 'Carry Voter ID or approved alternate ID', 'Queue up, show ID to officer', 'Vote on EVM, verify VVPAT slip'],
        checklist: ['Voter ID / Aadhaar / Passport / Driving Licence', 'Know your booth number in advance', 'Arrive early to avoid queues'],
      },
      results: {
        summary: `After polling, votes are counted at secure centres. India uses First-Past-The-Post — most votes wins. Results published live on eci.gov.in.`,
        highlights: ['📊 First-Past-The-Post system', '🔒 EVMs counted under security', '🌐 Live results at results.eci.gov.in'],
        steps: ['ECI announces counting date', 'EVMs transported to counting centres', 'Votes tallied round by round', 'Returning Officer declares result'],
        checklist: ['Follow live results at results.eci.gov.in', 'Know: simple majority vs absolute majority', 'Government formation within 30 days'],
      }
    },
    hi: {
      stateStr: state ? ` ${state} में` : '',
      ageNote: age ? ` आप ${age} वर्ष के हैं।` : '',
      firstNote: isFirstTime ? ' पहली बार वोट देने वाले का स्वागत है! 🎉' : '',
      overview: {
        summary: `भारत दुनिया का सबसे बड़ा लोकतांत्रिक चुनाव आयोजित करता है।{ageNote}{stateStr} भारत निर्वाचन आयोग (ECI) पूरी प्रक्रिया की देखरेख करता है।{firstNote}`,
        highlights: ['🗳️ 97 करोड़+ पंजीकृत मतदाता', '📍 10.5 लाख मतदान केंद्र', '🏛️ 543 लोकसभा सीटें'],
        steps: ['अपनी पात्रता जांचें (18+ नागरिक)', 'voters.eci.gov.in पर पंजीकरण करें', 'साइडबार में प्रत्येक चरण का अन्वेषण करें', 'पात्रता प्रश्नोत्तरी लें!'],
        checklist: ['अपना निर्वाचन क्षेत्र जानें', 'मतदाता सूची में अपना नाम सत्यापित करें', 'वोटर हेल्पलाइन ऐप डाउनलोड करें'],
      },
      registration: {
        summary: `मतदाता पंजीकरण (EPIC) लोकतंत्र में भाग लेने की दिशा में पहला कदम है।{ageNote}{firstNote} voters.eci.gov.in पर फॉर्म 6 के माध्यम से ऑनलाइन पंजीकरण करें - इसमें 10 मिनट से भी कम समय लगता है।`,
        highlights: [age && age >= 18 ? '✅ आप पंजीकरण के लिए पात्र हैं' : '⚠️ पंजीकरण के लिए 18+ होना चाहिए', '📄 अगला कदम: फॉर्म 6 भरें', '⏱️ कार्ड 2-4 सप्ताह में वितरित'].filter(Boolean),
        steps: ['voters.eci.gov.in पर जाएं', '"नए मतदाता के रूप में पंजीकरण करें" पर क्लिक करें → फॉर्म 6', 'व्यक्तिगत और पते का विवरण दर्ज करें', 'आधार + फोटो अपलोड करें', 'जमा करें और अपने आवेदन को ट्रैक करें'],
        checklist: ['आधार कार्ड (आयु + पता प्रमाण)', 'पासपोर्ट के आकार की तस्वीर', 'ओटीपी के लिए मोबाइल नंबर'],
      },
      campaigning: {
        summary: `चुनाव प्रचार ईसीआई द्वारा लागू आदर्श चुनाव आचार संहिता (MCC) द्वारा विनियमित होता है।{stateStr} उम्मीदवारों की विशिष्ट खर्च सीमाएँ होती हैं।`,
        highlights: ['📢 घोषणा के दिन से MCC लागू', '💰 खर्च की सीमा: ₹40–95 लाख', '🔇 मतदान से 48 घंटे पहले मौन अवधि'],
        steps: ['पार्टियाँ घोषणापत्र प्रकाशित करती हैं', 'उम्मीदवार नामांकन दाखिल करते हैं', 'रैलियां, विज्ञापन और घर-घर जाकर प्रचार', 'मतदान से 48 घंटे पहले मौन अवधि शुरू'],
        checklist: ['eci.gov.in पर पार्टी घोषणापत्र देखें', 'अपने सीईओ को MCC उल्लंघन की रिपोर्ट करें', "अपने उम्मीदवार का ट्रैक रिकॉर्ड जानें"],
      },
      polling: {
        summary: `मतदान का दिन वह दिन है जब आपका वोट मायने रखता है! बूथ सुबह 7 बजे से शाम 6 बजे तक खुले रहते हैं।{ageNote} 12 अनुमोदित फोटो आईडी में से कोई भी ले जाएं।{firstNote}`,
        highlights: ['⏰ बूथ सुबह 7 बजे से शाम 6 बजे तक', '🖊️ अमिट स्याही आपकी उंगली पर निशान लगाती है', '🖥️ EVM + VVPAT सुरक्षा सुनिश्चित करता है'],
        steps: ['voters.eci.gov.in पर अपना बूथ खोजें', 'मतदाता पहचान पत्र या अनुमोदित वैकल्पिक आईडी ले जाएं', 'कतार में लगें, अधिकारी को आईडी दिखाएं', 'EVM पर वोट दें, VVPAT पर्ची सत्यापित करें'],
        checklist: ['मतदाता पहचान पत्र / आधार / पासपोर्ट / ड्राइविंग लाइसेंस', 'पहले से अपना बूथ नंबर जानें', 'कतार से बचने के लिए जल्दी पहुंचें'],
      },
      results: {
        summary: `मतदान के बाद, सुरक्षित केंद्रों पर वोटों की गिनती की जाती है। भारत "फर्स्ट-पास्ट-द-पोस्ट" प्रणाली का उपयोग करता है - सबसे अधिक वोट जीतने वाले की जीत होती है। परिणाम eci.gov.in पर लाइव प्रकाशित किए जाते हैं।`,
        highlights: ['📊 फर्स्ट-पास्ट-द-पोस्ट प्रणाली', '🔒 सुरक्षा के तहत EVM की गिनती', '🌐 live results @ results.eci.gov.in'],
        steps: ['ईसीआई गिनती की तारीख की घोषणा करता है', 'EVM को गिनती केंद्रों तक पहुँचाया गया', 'वोटों की गिनती राउंड दर राउंड', 'रिटर्निंग ऑफिसर परिणाम घोषित करता है'],
        checklist: ['results.eci.gov.in पर लाइव परिणामों का पालन करें', 'जानें: साधारण बहुमत बनाम पूर्ण बहुमत', '30 दिनों के भीतर सरकार का गठन'],
      }
    },
    mr: {
      stateStr: state ? ` ${state} मध्ये` : '',
      ageNote: age ? ` तुमचे वय ${age} वर्षे आहे.` : '',
      firstNote: isFirstTime ? ' पहिल्यांदा मतदान करणाऱ्याचे स्वागत आहे! 🎉' : '',
      overview: {
        summary: `भारत जगातील सर्वात मोठी लोकशाही निवडणूक आयोजित करतो.{ageNote}{stateStr} भारतीय निवडणूक आयोग (ECI) संपूर्ण प्रक्रियेवर देखरेख करतो.{firstNote}`,
        highlights: ['🗳️ 97 कोटी+ नोंदणीकृत मतदार', '📍 10.5 लाख मतदान केंद्रे', '🏛️ 543 लोकसभा जागा'],
        steps: ['तुमची पात्रता तपासा (18+ नागरिक)', 'voters.eci.gov.in वर नोंदणी करा', 'साइडबारमधील प्रत्येक टप्पा एक्सप्लोर करा', 'पात्रता प्रश्नमंजुषा घ्या!'],
        checklist: ['तुमचा मतदारसंघ जाणून घ्या', 'मतदार यादीत तुमचे नाव तपासा', 'वोटर हेल्पलाइन ॲप डाउनलोड करा'],
      },
      registration: {
        summary: `मतदार नोंदणी (EPIC) हा लोकशाहीत सहभागी होण्यासाठी पहिला टप्पा आहे.{ageNote}{firstNote} voters.eci.gov.in वर फॉर्म 6 द्वारे ऑनलाइन नोंदणी करा - यात 10 मिनिटांपेक्षा कमी वेळ लागतो.`,
        highlights: [age && age >= 18 ? '✅ तुम्ही नोंदणीसाठी पात्र आहात' : '⚠️ नोंदणीसाठी 18+ असणे आवश्यक', '📄 पुढचा टप्पा: फॉर्म 6 भरा', '⏱️ कार्ड 2-4 आठवड्यात मिळेल'].filter(Boolean),
        steps: ['voters.eci.gov.in ला भेट द्या', '"नवीन मतदार म्हणून नोंदणी करा" वर क्लिक करा → फॉर्म 6', 'वैयक्तिक आणि पत्त्याचा तपशील भरा', 'आधार + फोटो अपलोड करा', 'अर्ज सबमिट करा आणि ट्रॅक करा'],
        checklist: ['आधार कार्ड (वय + पत्ता पुरावा)', 'पासपोर्ट आकाराचा फोटो', 'OTP साठी मोबाईल नंबर'],
      },
      campaigning: {
        summary: `निवडणूक प्रचार ईसीआयद्वारे लागू केलेल्या आदर्श आचारसंहितेद्वारे (MCC) नियंत्रित केला जातो.{stateStr} उमेदवारांसाठी विशिष्ट खर्च मर्यादा आहेत.`,
        highlights: ['📢 घोषणेच्या दिवसापासून MCC लागू', '💰 खर्च मर्यादा: ₹40–95 लाख', '🔇 मतदानापूर्वी 48 तास शांतता काळ'],
        steps: ['पक्ष जाहीरनामे प्रसिद्ध करतात', 'उमेदवार अर्ज भरतात', 'रॅली, जाहिराती आणि घरोघरी प्रचार', 'मतदानापूर्वी 48 तास शांतता काळ सुरू'],
        checklist: ['eci.gov.in वर पक्षाचे जाहीरनामे पहा', 'तुमच्या CEO कडे MCC उल्लंघनाची तक्रार करा', "तुमच्या उमेदवाराचा ट्रॅक रेकॉर्ड जाणून घ्या"],
      },
      polling: {
        summary: `मतदानाचा दिवस हा तो दिवस आहे जेव्हा तुमचे मत महत्त्वाचे ठरते! बूथ सकाळी 7 ते संध्याकाळी 6 पर्यंत उघडे असतात.{ageNote} 12 मान्यताप्राप्त फोटो आयडीपैकी कोणताही एक सोबत ठेवा.{firstNote}`,
        highlights: ['⏰ बूथ सकाळी 7 ते संध्याकाळी 6', '🖊️ न पुसणारी शाई तुमच्या बोटावर खूण करते', '🖥️ EVM + VVPAT सुरक्षा सुनिश्चित करते'],
        steps: ['voters.eci.gov.in वर तुमचे बूथ शोधा', 'मतदार ओळखपत्र किंवा मान्यताप्राप्त पर्यायी आयडी सोबत ठेवा', 'रांगेत उभे राहा, अधिकाऱ्याला आयडी दाखवा', 'EVM वर मतदान करा, VVPAT पावती तपासा'],
        checklist: ['मतदार ओळखपत्र / आधार / पासपोर्ट / ड्रायव्हिंग लायसन्स', 'तुमचा बूथ नंबर आधीच जाणून घ्या', 'गर्दी टाळण्यासाठी लवकर पोहोचा'],
      },
      results: {
        summary: `मतदानानंतर, सुरक्षित केंद्रांवर मतांची मोजणी केली जाते. भारत "फर्स्ट-पास्ट-द-पोस्ट" प्रणाली वापरतो - सर्वाधिक मते मिळवणारा विजयी होतो. निकाल eci.gov.in वर थेट प्रसिद्ध केले जातात.`,
        highlights: ['📊 फर्स्ट-पास्ट-द-पोस्ट प्रणाली', '🔒 सुरक्षेखाली EVM मोजणी', '🌐 थेट निकाल results.eci.gov.in वर'],
        steps: ['ECI मतमोजणीची तारीख घोषित करते', 'EVM मतमोजणी केंद्रांवर नेले जातात', 'फेरीनुसार मतांची बेरीज', 'निवडणूक निर्णय अधिकारी निकाल घोषित करतात'],
        checklist: ['results.eci.gov.in वर थेट निकालांचे अनुसरण करा', 'साधा बहुमत विरुद्ध पूर्ण बहुमत जाणून घ्या', '30 दिवसांच्या आत सरकार स्थापन'],
      }
    },
    bn: {
      stateStr: state ? ` ${state}-এ` : '',
      ageNote: age ? ` আপনার বয়স ${age} বছর।` : '',
      firstNote: isFirstTime ? ' প্রথমবার ভোটার হিসেবে আপনাকে স্বাগত! 🎉' : '',
      overview: {
        summary: `ভারত বিশ্বের বৃহত্তম গণতান্ত্রিক নির্বাচন পরিচালনা করে।{ageNote}{stateStr} ভারতের নির্বাচন কমিশন (ECI) পুরো প্রক্রিয়াটি তদারকি করে।{firstNote}`,
        highlights: ['🗳️ 97 কোটি+ নিবন্ধিত ভোটার', '📍 10.5 লক্ষ ভোট কেন্দ্র', '🏛️ 543টি লোকসভা আসন'],
        steps: ['আপনার যোগ্যতা পরীক্ষা করুন (18+ নাগরিক)', 'voters.eci.gov.in-এ নিবন্ধন করুন', 'সাইডবারে প্রতিটি ধাপ দেখুন', 'যোগ্যতা কুইজ নিন!'],
        checklist: ['আপনার নির্বাচনী এলাকা জানুন', 'ভোটার তালিকায় আপনার নাম যাচাই করুন', 'ভোটার হেল্পলাইন অ্যাপ ডাউনলোড করুন'],
      },
      registration: {
        summary: `ভোটার নিবন্ধন (EPIC) হল গণতন্ত্রে অংশগ্রহণের প্রথম ধাপ।{ageNote}{firstNote} voters.eci.gov.in-এ ফর্ম 6-এর মাধ্যমে অনলাইনে নিবন্ধন করুন - 10 মিনিটের কম সময় লাগে।`,
        highlights: [age && age >= 18 ? '✅ আপনি নিবন্ধনের জন্য যোগ্য' : '⚠️ নিবন্ধনের জন্য 18+ হতে হবে', '📄 পরবর্তী ধাপ: ফর্ম 6 পূরণ করুন', '⏱️ 2-4 সপ্তাহের মধ্যে কার্ড ডেলিভারি'].filter(Boolean),
        steps: ['voters.eci.gov.in দেখুন', '"নতুন ভোটার হিসেবে নিবন্ধন করুন" ক্লিক করুন → ফর্ম 6', 'ব্যক্তিগত ও ঠিকানার বিবরণ দিন', 'আধার + ফটো আপলোড করুন', 'আবেদন জমা দিন এবং ট্র্যাক করুন'],
        checklist: ['আধার কার্ড (বয়স + ঠিকানার প্রমাণ)', 'পাসপোর্ট সাইজ ছবি', 'ওটিপি-র জন্য মোবাইল নম্বর'],
      },
      campaigning: {
        summary: `নির্বাচনী প্রচার ইসিআই দ্বারা প্রয়োগ করা আদর্শ আচরণবিধি (MCC) দ্বারা নিয়ন্ত্রিত হয়।{stateStr} প্রার্থীদের নির্দিষ্ট ব্যয়ের সীমা রয়েছে।`,
        highlights: ['📢 ঘোষণার দিন থেকে MCC কার্যকর', '💰 ব্যয়ের সীমা: ₹40–95 লক্ষ', '🔇 ভোটের 48 ঘণ্টা আগে নীরবতা পালন'],
        steps: ['দলগুলো ইশতেহার প্রকাশ করে', 'প্রার্থীরা মনোনয়ন জমা দেন', 'র‍্যালি, বিজ্ঞাপন ও বাড়ি বাড়ি প্রচার', 'ভোটের 48 ঘণ্টা আগে নীরবতা শুরু'],
        checklist: ['eci.gov.in-এ দলের ইশতেহার দেখুন', 'আপনার CEO-কে MCC লঙ্ঘনের রিপোর্ট করুন', "আপনার প্রার্থীর ট্র্যাক রেকর্ড জানুন"],
      },
      polling: {
        summary: `ভোটের দিনটি হল যখন আপনার ভোট গণনা করা হয়! বুথ সকাল 7টা থেকে সন্ধ্যা 6টা পর্যন্ত খোলা থাকে।{ageNote} 12টি অনুমোদিত ফটো আইডি-র যেকোনো একটি সঙ্গে রাখুন।{firstNote}`,
        highlights: ['⏰ বুথ সকাল 7টা থেকে সন্ধ্যা 6টা', '🖊️ আঙুলে অমোচনীয় কালি লাগানো হয়', '🖥️ EVM + VVPAT নিরাপত্তা নিশ্চিত করে'],
        steps: ['voters.eci.gov.in-এ আপনার বুথ খুঁজুন', 'ভোটার আইডি বা অনুমোদিত বিকল্প আইডি সাথে রাখুন', 'লাইনে দাঁড়ান, অফিসারকে আইডি দেখান', 'EVM-এ ভোট দিন, VVPAT স্লিপ যাচাই করুন'],
        checklist: ['ভোটার আইডি / আধার / পাসপোর্ট / ড্রাইভিং লাইসেন্স', 'আপনার বুথ নম্বর আগে থেকে জানুন', 'ভিড় এড়াতে তাড়াতাড়ি পৌঁছান'],
      },
      results: {
        summary: `ভোটের পর নিরাপদ কেন্দ্রে ভোট গণনা করা হয়। ভারত "ফার্স্ট-পাস্ট-দ্য-পোস্ট" পদ্ধতি ব্যবহার করে - সর্বাধিক ভোট জয়ী হয়। ফলাফল eci.gov.in-এ সরাসরি প্রকাশিত হয়।`,
        highlights: ['📊 ফার্স্ট-পাস্ট-দ্য-পোস্ট পদ্ধতি', '🔒 নিরাপত্তার অধীনে EVM গণনা', '🌐 সরাসরি ফলাফল results.eci.gov.in-এ'],
        steps: ['ECI গণনার তারিখ ঘোষণা করে', 'EVM গণনাকেন্দ্রে নিয়ে যাওয়া হয়', 'রাউন্ড অনুযায়ী ভোট গণনা', 'রিটার্নিং অফিসার ফলাফল ঘোষণা করেন'],
        checklist: ['results.eci.gov.in-এ সরাসরি ফলাফল দেখুন', 'সাধারণ সংখ্যাগরিষ্ঠতা বনাম নিরঙ্কুশ সংখ্যাগরিষ্ঠতা জানুন', '30 দিনের মধ্যে সরকার গঠন'],
      }
    },
    ta: {
      stateStr: state ? ` ${state}-ல்` : '',
      ageNote: age ? ` உங்களுக்கு ${age} வயது ஆகிறது.` : '',
      firstNote: isFirstTime ? ' முதல்முறை வாக்காளராக உங்களை வரவேற்கிறோம்! 🎉' : '',
      overview: {
        summary: `இந்தியா உலகின் மிகப்பெரிய ஜனநாயகத் தேர்தலை நடத்துகிறது.{ageNote}{stateStr} இந்திய தேர்தல் ஆணையம் (ECI) முழு செயல்முறையையும் கண்காணிக்கிறது.{firstNote}`,
        highlights: ['🗳️ 97 கோடி+ பதிவு செய்த வாக்காளர்கள்', '📍 10.5 லட்சம் வாக்குச்சாவடிகள்', '🏛️ 543 மக்களவை இடங்கள்'],
        steps: ['உங்கள் தகுதியைச் சரிபார்க்கவும் (18+ குடிமகன்)', 'voters.eci.gov.in-ல் பதிவு செய்யவும்', 'சைட்பாரில் ஒவ்வொரு கட்டத்தையும் பார்க்கவும்', 'தகுதி வினாடி வினாவில் பங்கேற்கவும்!'],
        checklist: ['உங்கள் தொகுதியைத் தெரிந்துகொள்ளுங்கள்', 'வாக்காளர் பட்டியலில் உங்கள் பெயரைச் சரிபார்க்கவும்', 'வாக்காளர் உதவி எண் செயலியைப் பதிவிறக்கவும்'],
      },
      registration: {
        summary: `வாக்காளர் பதிவு (EPIC) என்பது ஜனநாயகத்தில் பங்கேற்பதற்கான முதல் படியாகும்.{ageNote}{firstNote} voters.eci.gov.in-ல் படிவம் 6 மூலம் ஆன்லைனில் பதிவு செய்யவும் - இதற்கு 10 நிமிடங்களுக்கும் குறைவாகவே ஆகும்.`,
        highlights: [age && age >= 18 ? '✅ நீங்கள் பதிவு செய்யத் தகுதியுடையவர்' : '⚠️ பதிவு செய்ய 18+ வயது இருக்க வேண்டும்', '📄 அடுத்த படி: படிவம் 6-ஐ நிரப்பவும்', '⏱️ 2-4 வாரங்களில் கார்டு டெலிவரி'].filter(Boolean),
        steps: ['voters.eci.gov.in-ஐப் பார்க்கவும்', '"புதிய வாக்காளராகப் பதிவு செய்க" என்பதைக் கிளிக் செய்யவும் → படிவம் 6', 'தனிப்பட்ட மற்றும் முகவரி விவரங்களை உள்ளிடவும்', 'ஆதார் + புகைப்படத்தைப் பதிவேற்றவும்', 'விண்ணப்பத்தைச் சமர்ப்பித்து கண்காணிக்கவும்'],
        checklist: ['ஆதார் கார்டு (வயது + முகவரி சான்று)', 'பாஸ்போர்ட் அளவு புகைப்படம்', 'OTP-க்கான மொபைல் எண்'],
      },
      campaigning: {
        summary: `தேர்தல் பிரச்சாரம் இந்திய தேர்தல் ஆணையத்தால் அமல்படுத்தப்படும் மாதிரி நடத்தை விதிகளால் (MCC) ஒழுங்குபடுத்தப்படுகிறது.{stateStr} வேட்பாளர்களுக்குக் குறிப்பிட்ட செலவு வரம்புகள் உள்ளன.`,
        highlights: ['📢 அறிவிப்பு வெளியான நாள் முதல் MCC அமல்', '💰 செலவு வரம்பு: ₹40–95 லட்சம்', '🔇 வாக்குப்பதிவுக்கு 48 மணி நேரத்திற்கு முன் அமைதிக்காலம்'],
        steps: ['கட்சிகள் தேர்தல் அறிக்கைகளை வெளியிடுகின்றன', 'வேட்பாளர்கள் வேட்புமனு தாக்கல் செய்கிறார்கள்', 'பேரணிகள், விளம்பரங்கள் மற்றும் வீடு வீடாகப் பிரச்சாரம்', 'வாக்குப்பதிவுக்கு 48 மணி நேரத்திற்கு முன் அமைதிக்காலம் தொடக்கம்'],
        checklist: ['eci.gov.in-ல் கட்சி அறிக்கைகளைப் பார்க்கவும்', 'MCC மீறல்களை உங்கள் CEO-விடம் புகாரளிக்கவும்', "உங்கள் வேட்பாளரின் பின்னணியைத் தெரிந்துகொள்ளுங்கள்"],
      },
      polling: {
        summary: `வாக்குப்பதிவு நாள் உங்கள் வாக்கு எண்ணப்படும் நாள்! வாக்குச்சாவடிகள் காலை 7 மணி முதல் மாலை 6 மணி வரை திறந்திருக்கும்.{ageNote} அங்கீகரிக்கப்பட்ட 12 புகைப்பட அடையாள அட்டைகளில் ஏதேனும் ஒன்றை எடுத்துச் செல்லவும்.{firstNote}`,
        highlights: ['⏰ காலை 7 முதல் மாலை 6 மணி வரை', '🖊️ அழியாத மை உங்கள் விரலில் வைக்கப்படும்', '🖥️ EVM + VVPAT பாதுகாப்பை உறுதி செய்கிறது'],
        steps: ['voters.eci.gov.in-ல் உங்கள் வாக்குச்சாவடியைக் கண்டறியவும்', 'வாக்காளர் அடையாள அட்டை அல்லது அங்கீகரிக்கப்பட்ட மாற்று ஐடியை எடுத்துச் செல்லவும்', 'வரிசையில் நின்று, அதிகாரியிடம் ஐடியைக் காட்டவும்', 'EVM-ல் வாக்களித்து, VVPAT சீட்டைச் சரிபார்க்கவும்'],
        checklist: ['வாக்காளர் ஐடி / ஆதார் / பாஸ்போர்ட் / ஓட்டுநர் உரிமம்', 'உங்கள் வாக்குச்சாவடி எண்ணை முன்கூட்டியే தெரிந்துகொள்ளுங்கள்', 'நெரிசலைத் தவிர்க்க முன்னதாகவே செல்லுங்கள்'],
      },
      results: {
        summary: `வாக்குப்பதிவுக்குப் பிறகு, பாதுகாப்பான மையங்களில் வாக்குகள் எண்ணப்படும். இந்தியா "முதலில் வருபவருக்கே வெற்றி" முறையைப் பயன்படுத்துகிறது - அதிக வாக்குகள் பெறுபவரే வெற்றி பெறுவார். முடிவுகள் eci.gov.in-ல் நேரலையில் வெளியிடப்படும்.`,
        highlights: ['📊 முதலில் வருபவருக்கே வெற்றி முறை', '🔒 பாதுகாப்பின் கீழ் EVM எண்ணிக்கை', '🌐 நேரலை முடிவுகள் results.eci.gov.in-ல்'],
        steps: ['ECI வாக்கு எண்ணும் தேதியை அறிவிக்கிறது', 'EVM-கள் எண்ணும் மையங்களுக்குக் கொண்டு செல்லப்படுகின்றன', 'சுற்று வாரியாக வாக்குகள் எண்ணப்படுகின்றன', 'தேர்தல் நடத்தும் அலுவலர் முடிவை அறிவிக்கிறார்'],
        checklist: ['results.eci.gov.in-ல் நேரலை முடிவுகளைப் பின்தொடரவும்', 'சாதாரண பெரும்பான்மை மற்றும் அறுதிப் பெரும்பான்மையைத் தெரிந்துகொள்ளுங்கள்', '30 நாட்களுக்குள் அரசாங்கம் அமைத்தல்'],
      }
    },
    te: {
      stateStr: state ? ` ${state}లో` : '',
      ageNote: age ? ` మీ వయస్సు ${age} సంవత్సరాలు.` : '',
      firstNote: isFirstTime ? ' మొదటిసారి ఓటరుగా మీకు స్వాగతం! 🎉' : '',
      overview: {
        summary: `భారతదేశం ప్రపంచంలోనే అతిపెద్ద ప్రజాస్వామ్య ఎన్నికలను నిర్వహిస్తుంది.{ageNote}{stateStr} భారత ఎన్నికల సంఘం (ECI) మొత్తం ప్రక్రియను పర్యవేక్షిస్తుంది.{firstNote}`,
        highlights: ['🗳️ 97 కోట్లు+ నమోదిత ఓటర్లు', '📍 10.5 లక్షల పోలింగ్ కేంద్రాలు', '🏛️ 543 లోక్‌సభ స్థానాలు'],
        steps: ['మీ అర్హతను తనిఖీ చేయండి (18+ పౌరులు)', 'voters.eci.gov.inలో నమోదు చేసుకోండి', 'సైడ్‌బార్‌లోని ప్రతి దశను చూడండి', 'అర్హత క్విజ్ తీసుకోండి!'],
        checklist: ['మీ నియోజకవర్గాన్ని తెలుసుకోండి', 'ఓటరు జాబితాలో మీ పేరును సరిచూసుకోండి', 'ఓటరు హెల్ప్‌లైన్ యాప్‌ను డౌన్‌లోడ్ చేసుకోండి'],
      },
      registration: {
        summary: `ఓటరు నమోదు (EPIC) ప్రజాస్వామ్యంలో పాల్గొనడానికి మొదటి దశ.{ageNote}{firstNote} voters.eci.gov.inలో ఫారమ్ 6 ద్వారా ఆన్‌లైన్‌లో నమోదు చేసుకోండి - దీనికి 10 నిమిషాల కంటే తక్కువ సమయం పడుతుంది.`,
        highlights: [age && age >= 18 ? '✅ మీరు నమోదుకు అర్హులు' : '⚠️ నమోదుకు 18+ ఉండాలి', '📄 తదుపరి దశ: ఫారమ్ 6 నింపండి', '⏱️ 2-4 వారాల్లో కార్డ్ డెలివరీ'].filter(Boolean),
        steps: ['voters.eci.gov.inని సందర్శించండి', '"కొత్త ఓటరుగా నమోదు చేసుకోండి" పై క్లిక్ చేయండి → ఫారమ్ 6', 'వ్యక్తిగత & చిరునామా వివరాలను నమోదు చేయండి', 'ఆధార్ + ఫోటోను అప్‌లోడ్ చేయండి', 'దరఖాస్తును సమర్పించి ట్రాక్ చేయండి'],
        checklist: ['ఆధార్ కార్డ్ (వయస్సు + చిరునామా రుజువు)', 'పాస్‌పోర్ట్ సైజు ఫోటో', 'OTP కోసం మొబైల్ నంబర్'],
      },
      campaigning: {
        summary: `ఎన్నికల ప్రచారం ECI ద్వారా అమలు చేయబడే ఆదర్శ ఎన్నికల ప్రవర్తనా నియమావళి (MCC) ద్వారా నియంత్రించబడుతుంది.{stateStr} అభ్యర్థులకు నిర్దిష్ట ఖర్చు పరిమితులు ఉంటాయి.`,
        highlights: ['📢 ప్రకటన వచ్చిన రోజు నుండి MCC అమలు', '💰 ఖర్చు పరిమితి: ₹40–95 లక్షలు', '🔇 పోలింగ్‌కు 48 గంటల ముందు నిశ్శబ్ద కాలం'],
        steps: ['పార్టీలు మేనిఫెస్టోలను ప్రకటిస్తాయి', 'అభ్యర్థులు నామినేషన్లు వేస్తారు', 'ర్యాలీలు, ప్రకటనలు & ఇంటింటి ప్రచారం', 'పోలింగ్‌కు 48 గంటల ముందు నిశ్శబ్ద కాలం ప్రారంభం'],
        checklist: ['eci.gov.inలో పార్టీ మేనిఫెస్టోలను చూడండి', 'మీ CEOకి MCC ఉల్లంఘనలపై ఫిర్యాదు చేయండి', "మీ అభ్యర్థి నేపథ్యాన్ని తెలుసుకోండి"],
      },
      polling: {
        summary: `పోలింగ్ రోజు మీ ఓటు లెక్కించబడే రోజు! బూత్‌లు ఉదయం 7 గంటల నుండి సాయంత్రం 6 గంటల వరకు తెరిచి ఉంటాయి.{ageNote} ఆమోదించబడిన 12 ఫోటో ఐడీలలో ఏదైనా ఒకటి తీసుకెళ్లండి.{firstNote}`,
        highlights: ['⏰ ఉదయం 7 నుండి సాయంత్రం 6 వరకు', '🖊️ వేలిపై చెరగని సిరా గుర్తు పెడతారు', '🖥️ EVM + VVPAT భద్రతను నిర్ధారిస్తుంది'],
        steps: ['voters.eci.gov.inలో మీ బూత్‌ను కనుగొనండి', 'ఓటరు ఐడీ లేదా ఆమోదించబడిన ప్రత్యామ్నాయ ఐడీని తీసుకెళ్లండి', 'వరుసలో నిలబడి, అధికారికి ఐడీ చూపండి', 'EVMపై ఓటు వేసి, VVPAT స్లిప్‌ను సరిచూసుకోండి'],
        checklist: ['ఓటరు ఐడీ / ఆధార్ / పాస్‌పోర్ట్ / డ్రైవింగ్ లైసెన్స్', 'ముందుగానే మీ బూత్ నంబర్‌ను తెలుసుకోండి', 'రద్దీని నివారించడానికి త్వరగా వెళ్లండి'],
      },
      results: {
        summary: `పోలింగ్ తర్వాత, సురక్షిత కేంద్రాల్లో ఓట్ల లెక్కింపు జరుగుతుంది. భారతదేశం "ఫస్ట్-పాస్ట్-ద-పోస్ట్" విధానాన్ని ఉపయోగిస్తుంది - అత్యధిక ఓట్లు వచ్చిన వారే విజేత. ఫలితాలు eci.gov.inలో ప్రత్యక్షంగా ప్రసారం చేయబడతాయి.`,
        highlights: ['📊 ఫస్ట్-పాస్ట్-ద-పోస్ట్ విధానం', '🔒 భద్రత మధ్య EVM లెక్కింపు', '🌐 ప్రత్యక్ష ఫలితాలు results.eci.gov.inలో'],
        steps: ['ECI లెక్కింపు తేదీని ప్రకటిస్తుంది', 'EVMలను లెక్కింపు కేంద్రాలకు తరలిస్తారు', 'రౌండ్ల వారీగా ఓట్ల లెక్కింపు', 'రిటర్నింగ్ అధికారి ఫలితాన్ని ప్రకటిస్తారు'],
        checklist: ['results.eci.gov.inలో ప్రత్యక్ష ఫలితాలను చూడండి', 'సాధారణ మెజారిటీ మరియు సంపూర్ణ మెజారిటీ గురించి తెలుసుకోండి', '30 రోజుల్లోపు ప్రభుత్వ ఏర్పాటు'],
      }
    }
  };

  const tSet = translations[lang] || translations.en;
  const pageData = tSet[pageType] || translations.en[pageType];

  const summaryText = pageData.summary
    .replace('{ageNote}', tSet.ageNote)
    .replace('{stateStr}', tSet.stateStr)
    .replace('{firstNote}', tSet.firstNote);

  return {
    ...pageData,
    summary: summaryText
  };
}

/**
 * AI logic for Myth Buster + MCC Rule Checker
 * @param {string} input 
 * @param {string} [lang='en']
 * @returns {{status: "allowed" | "not_allowed" | "misleading", explanation: string, correctInfo: string, confidence: string}}
 */
export function checkElectionClaim(input, lang = 'en') {
  const lc = input.toLowerCase();
  
  const responses = {
    en: {
      bribery: {
        explanation: 'Offering any kind of incentive, including cash, gifts, or liquor, in exchange for votes is a severe violation of the Model Code of Conduct (MCC).',
        correctInfo: 'Voters should choose candidates based on their merit and manifestos, not for material gains. Bribery is a punishable offense under Indian law.'
      },
      hate: {
        explanation: 'Using religion, caste, or communal sentiments to solicit votes is strictly prohibited. Hate speech that creates tension between different communities is an MCC violation.',
        correctInfo: 'Political parties and candidates must refrain from making speeches that appeal to caste or communal feelings or use religious places for election propaganda.'
      },
      campaign: {
        explanation: 'Campaigning is allowed after the announcement of elections, but candidates must follow strict guidelines regarding timings (usually 6 AM to 10 PM for loudspeakers) and seek prior permission for rallies.',
        correctInfo: 'All campaigning must strictly adhere to the Model Code of Conduct and local police regulations regarding noise and public gatherings.'
      },
      silence: {
        explanation: 'Campaigning must stop 48 hours before the conclusion of polling. This is known as the "Silence Period" to allow voters to reflect peacefully.',
        correctInfo: 'No person shall convene, hold, or attend any public meeting or procession in connection with an election during the 48-hour period ending with the hour fixed for the conclusion of the poll.'
      },
      age: {
        explanation: 'The common belief that the voting age is 21 is outdated. It was changed several decades ago.',
        correctInfo: 'The minimum voting age in India is 18 years, as per the 61st Constitutional Amendment Act, 1988.'
      },
      double: {
        explanation: 'A citizen can only be registered as a voter in one place and is entitled to only one vote.',
        correctInfo: 'Possessing multiple voter IDs or attempting to vote more than once is an electoral offense. Ensure you are registered only at your current place of residence.'
      },
      fallback: {
        explanation: 'This claim needs careful verification. Rules can vary based on specific contexts or recent ECI updates.',
        correctInfo: 'Always refer to the official Election Commission of India (ECI) website or the Voter Helpline App for the most accurate and up-to-date information.'
      }
    },
    hi: {
      bribery: {
        explanation: 'वोटों के बदले नकद, उपहार या शराब सहित किसी भी प्रकार का प्रोत्साहन देना आदर्श आचार संहिता (MCC) का गंभीर उल्लंघन है।',
        correctInfo: 'मतदाताओं को उम्मीदवारों का चयन उनके गुणों और घोषणापत्रों के आधार पर करना चाहिए, न कि भौतिक लाभ के लिए। रिश्वतखोरी भारतीय कानून के तहत एक दंडनीय अपराध है।'
      },
      hate: {
        explanation: 'वोट मांगने के लिए धर्म, जाति या सांप्रदायिक भावनाओं का उपयोग करना सख्त वर्जित है। विभिन्न समुदायों के बीच तनाव पैदा करने वाला नफरत भरा भाषण MCC का उल्लंघन है।',
        correctInfo: 'राजनीतिक दलों और उम्मीदवारों को जाति या सांप्रदायिक भावनाओं की अपील करने वाले भाषण देने या चुनाव प्रचार के लिए धार्मिक स्थानों का उपयोग करने से बचना चाहिए।'
      },
      campaign: {
        explanation: 'चुनाव की घोषणा के बाद प्रचार की अनुमति है, लेकिन उम्मीदवारों को समय (आमतौर पर लाउडस्पीकरों के लिए सुबह 6 बजे से रात 10 बजे तक) के संबंध में सख्त दिशा-निर्देशों का पालन करना चाहिए और रैलियों के लिए पूर्व अनुमति लेनी चाहिए।',
        correctInfo: 'सभी प्रचारों को आदर्श आचार संहिता और शोर और सार्वजनिक सभाओं के संबंध में स्थानीय पुलिस नियमों का सख्ती से पालन करना चाहिए।'
      },
      silence: {
        explanation: 'मतदान समाप्त होने से 48 घंटे पहले प्रचार बंद होना चाहिए। इसे "मौन अवधि" के रूप में जाना जाता है ताकि मतदाता शांतिपूर्वक विचार कर सकें।',
        correctInfo: 'कोई भी व्यक्ति मतदान की समाप्ति के लिए नियत समय के साथ समाप्त होने वाले 48 घंटों की अवधि के दौरान चुनाव के संबंध में किसी भी सार्वजनिक बैठक या जुलूस को बुलाएगा, आयोजित करेगा या उसमें शामिल नहीं होगा।'
      },
      age: {
        explanation: 'यह आम धारणा कि मतदान की आयु 21 वर्ष है, पुरानी हो चुकी है। इसे कई दशक पहले बदल दिया गया था।',
        correctInfo: 'भारत में न्यूनतम मतदान आयु 18 वर्ष है, जैसा कि 61वें संवैधानिक संशोधन अधिनियम, 1988 के अनुसार है।'
      },
      double: {
        explanation: 'एक नागरिक केवल एक ही स्थान पर मतदाता के रूप में पंजीकृत हो सकता है और वह केवल एक वोट का हकदार है।',
        correctInfo: 'एक से अधिक वोटर आईडी रखना या एक से अधिक बार वोट देने का प्रयास करना एक चुनावी अपराध है। सुनिश्चित करें कि आप केवल अपने वर्तमान निवास स्थान पर पंजीकृत हैं।'
      },
      fallback: {
        explanation: 'इस दावे को सावधानीपूर्वक सत्यापन की आवश्यकता है। नियम विशिष्ट संदर्भों या हाल के ईसीआई अपडेट के आधार पर भिन्न हो सकते हैं।',
        correctInfo: 'सबसे सटीक और अद्यतित जानकारी के लिए हमेशा भारतीय चुनाव आयोग (ECI) की आधिकारिक वेबसाइट या वोटर हेल्पलाइन ऐप देखें।'
      }
    },
    mr: {
      bribery: {
        explanation: 'मतांच्या बदल्यात रोख रक्कम, भेटवस्तू किंवा दारू यासह कोणत्याही प्रकारचे प्रोत्साहन देणे हे आदर्श आचारसंहितेचे (MCC) गंभीर उल्लंघन आहे.',
        correctInfo: 'मतदारांनी उमेदवारांची निवड त्यांच्या गुणवत्तेवर आणि जाहीरनाम्यावर आधारित केली पाहिजे, भौतिक फायद्यासाठी नाही. लाचखोरी हा भारतीय कायद्यांतर्गत दंडनीय गुन्हा आहे.'
      },
      hate: {
        explanation: 'मते मागण्यासाठी धर्म, जात किंवा जातीय भावनांचा वापर करण्यास सक्त मनाई आहे. विविध समुदायांमध्ये तणाव निर्माण करणारे द्वेषयुक्त भाषण हे MCC चे उल्लंघन आहे.',
        correctInfo: 'राजकीय पक्ष आणि उमेदवारांनी जात किंवा जातीय भावनांना आवाहन करणारी भाषणे देणे किंवा निवडणूक प्रचारासाठी धार्मिक स्थळांचा वापर करणे टाळले पाहिजे.'
      },
      campaign: {
        explanation: 'निवडणुकीच्या घोषणेनंतर प्रचाराला परवानगी आहे, परंतु उमेदवारांनी वेळेच्या संदर्भात (सामान्यतः लाउडस्पीकरसाठी सकाळी 6 ते रात्री 10) कडक मार्गदर्शक तत्त्वांचे पालन केले पाहिजे आणि रॅलीसाठी पूर्व परवानगी घेतली पाहिजे.',
        correctInfo: 'सर्व प्रचारांनी आदर्श आचारसंहिता आणि आवाज आणि सार्वजनिक सभांच्या संदर्भात स्थानिक पोलीस नियमांचे काटेकोरपणे पालन केले पाहिजे.'
      },
      silence: {
        explanation: 'मतदान संपण्यापूर्वी 48 तास आधी प्रचार थांबला पाहिजे. मतदारांना शांतपणे विचार करता यावा यासाठी याला "शांतता काळ" म्हणून ओळखले जाते.',
        correctInfo: 'मतदानाच्या समाप्तीसाठी निश्चित केलेल्या वेळेसह संपणाऱ्या 48 तासांच्या कालावधीत कोणतीही व्यक्ती निवडणुकीच्या संदर्भात कोणतीही सार्वजनिक सभा किंवा मिरवणूक बोलावणार नाही, आयोजित करणार नाही किंवा उपस्थित राहणार नाही.'
      },
      age: {
        explanation: 'मतदानाचे वय 21 वर्षे आहे ही सर्वसामान्यांची धारणा जुनी झाली आहे. ती अनेक दशकांपूर्वी बदलली होती.',
        correctInfo: 'भारतात किमान मतदानाचे वय १८ वर्षे आहे, १९८८ च्या ६१ व्या घटनादुरुस्ती कायद्यानुसार.'
      },
      double: {
        explanation: 'एक नागरिक फक्त एकाच ठिकाणी मतदार म्हणून नोंदणी करू शकतो आणि तो फक्त एका मताचा हक्कदार आहे.',
        correctInfo: 'एकापेक्षा जास्त मतदार ओळखपत्रे बाळगणे किंवा एकापेक्षा जास्त वेळा मतदान करण्याचा प्रयत्न करणे हा निवडणूक गुन्हा आहे. तुम्ही तुमच्या सध्याच्या वास्तव्याच्या ठिकाणीच नोंदणीकृत आहात याची खात्री करा.'
      },
      fallback: {
        explanation: 'या दाव्याला काळजीपूर्वक पडताळणीची आवश्यकता आहे. विशिष्ट संदर्भ किंवा अलीकडील ECI अपडेट्सवर आधारित नियम बदलू शकतात.',
        correctInfo: 'सर्वात अचूक आणि अद्ययावत माहितीसाठी नेहमी भारतीय निवडणूक आयोग (ECI) अधिकृत वेबसाइट किंवा वोटर हेल्पलाइन ॲप पहा.'
      }
    },
    bn: {
      bribery: {
        explanation: 'ভোটের বিনিময়ে নগদ টাকা, উপহার বা মদ সহ যে কোনও ধরণের প্রলোভন দেওয়া আদর্শ আচরণবিধির (MCC) গুরুতর লঙ্ঘন।',
        correctInfo: 'ভোটারদের উচিত প্রার্থীদের তাদের যোগ্যতা এবং ইশতেহারের ভিত্তিতে বেছে নেওয়া, বৈষয়িক লাভের জন্য নয়। ঘুষ দেওয়া ভারতীয় আইনের অধীনে একটি দণ্ডনীয় অপরাধ।'
      },
      hate: {
        explanation: 'ভোট চাওয়ার জন্য ধর্ম, জাতি বা সাম্প্রদায়িক অনুভূতি ব্যবহার করা কঠোরভাবে নিষিদ্ধ। বিভিন্ন সম্প্রদায়ের মধ্যে উত্তেজনা সৃষ্টিকারী ঘৃণ্য ভাষণ MCC-র লঙ্ঘন।',
        correctInfo: 'রাজনৈতিক দল এবং প্রার্থীদের জাতি বা সাম্প্রদায়িক অনুভূতিতে আবেদন করে এমন বক্তৃতা দেওয়া বা নির্বাচনী প্রচারের জন্য ধর্মীয় স্থান ব্যবহার করা থেকে বিরত থাকতে হবে।'
      },
      campaign: {
        explanation: 'নির্বাচন ঘোষণার পর প্রচারের অনুমতি দেওয়া হয়, তবে প্রার্থীদের সময় সংক্রান্ত (সাধারণত লাউডস্পিকারের জন্য সকাল ৬টা থেকে রাত ১০টা) কঠোর নির্দেশিকা মেনে চলতে হবে এবং র‍্যালির জন্য পূর্ব অনুমতি নিতে হবে।',
        correctInfo: 'সমস্ত প্রচারকে অবশ্যই আদর্শ আচরণবিধি এবং শব্দ এবং জনসভার বিষয়ে স্থানীয় পুলিশ বিধি কঠোরভাবে মেনে চলতে হবে।'
      },
      silence: {
        explanation: 'ভোট শেষ হওয়ার ৪৮ ঘণ্টা আগে প্রচার বন্ধ করতে হবে। ভোটারদের শান্তভাবে চিন্তা করার সুযোগ দিতে এটি "নীরবতা কাল" হিসেবে পরিচিত।',
        correctInfo: 'ভোটের সমাপ্তির জন্য নির্ধারিত সময়ের সাথে শেষ হওয়া ৪৮ ঘণ্টার মধ্যে কোনো ব্যক্তি নির্বাচনের সাথে সম্পর্কিত কোনো জনসভা বা শোভাযাত্রা ডাকবেন না, করবেন না বা যোগ দেবেন না।'
      },
      age: {
        explanation: 'ভোটদানের বয়স ২১ বছর - এই সাধারণ বিশ্বাসটি সেকেলে। এটি কয়েক দশক আগে পরিবর্তন করা হয়েছিল।',
        correctInfo: 'ভারতে সর্বনিম্ন ভোটাধিকারের বয়স ১৮ বছর, ১৯৮৮ সালের ৬১তম সাংবিধানিক সংশোধনী আইন অনুযায়ী।'
      },
      double: {
        explanation: 'একজন নাগরিক কেবল এক জায়গায় ভোটার হিসেবে নিবন্ধিত হতে পারেন এবং তিনি কেবল একটি ভোটের অধিকারী।',
        correctInfo: 'একাধিক ভোটার আইডি রাখা বা একাধিকবার ভোট দেওয়ার চেষ্টা করা একটি নির্বাচনী অপরাধ। নিশ্চিত করুন যে আপনি কেবল আপনার বর্তমান বসবাসের স্থানে নিবন্ধিত আছেন।'
      },
      fallback: {
        explanation: 'এই দাবিটি সতর্কতার সাথে যাচাই করা প্রয়োজন। নির্দিষ্ট প্রেক্ষাপট বা সাম্প্রতিক ECI আপডেটের ভিত্তিতে নিয়ম পরিবর্তিত হতে পারে।',
        correctInfo: 'সবচেয়ে সঠিক এবং আপ-টু-ডেট তথ্যের জন্য সর্বদা ভারতের নির্বাচন কমিশন (ECI) অফিসিয়াল ওয়েবসাইট বা ভোটার হেল্পলাইন অ্যাপ দেখুন।'
      }
    },
    ta: {
      bribery: {
        explanation: 'வாக்குகளுக்கு ஈடாக ரொக்கம், பரிசுகள் அல்லது மது உள்ளிட்ட எந்தவொரு தூண்டுதலையும் வழங்குவது மாதிரி நடத்தை விதிகளின் (MCC) கடுமையான மீறலாகும்.',
        correctInfo: 'வாக்காளர்கள் வேட்பாளர்களை அவர்களின் தகுதி மற்றும் தேர்தல் அறிக்கைகளின் அடிப்படையில் தேர்ந்தெடுக்க வேண்டும், பொருள் ஆதாயங்களுக்காக அல்ல. லஞ்சம் வாங்குவது இந்திய சட்டத்தின்படி தண்டனைக்குரிய குற்றமாகும்.'
      },
      hate: {
        explanation: 'வாக்குகளைப் பெற மதம், சாதி அல்லது வகுப்புவாத உணர்வுகளைப் பயன்படுத்துவது கண்டிப்பாகத் தடைசெய்யப்பட்டுள்ளது. வெவ்வேறு சமூகங்களுக்கு இடையே பதற்றத்தை உருவாக்கும் வெறுப்புப் பேச்சு MCC மீறலாகும்.',
        correctInfo: 'அரசியல் கட்சிகள் மற்றும் வேட்பாளர்கள் சாதி அல்லது வகுப்புவாத உணர்வுகளைத் தூண்டும் வகையில் பேசுவதையோ அல்லது தேர்தல் பிரச்சாரத்திற்கு வழிபாட்டுத் தலங்களைப் பயன்படுத்துவதையோ தவிர்க்க வேண்டும்.'
      },
      campaign: {
        explanation: 'தேர்தல் அறிவிப்புக்கு பிறகு பிரச்சாரம் செய்ய அனுமதி உண்டு, ஆனால் வேட்பாளர்கள் நேரங்கள் (பொதுவாக ஒலிபெருக்கிகளுக்கு காலை 6 மணி முதல் இரவு 10 மணி வரை) குறித்த கடுமையான வழிகாட்டுதல்களைப் பின்பற்ற வேண்டும் மற்றும் பேரணிகளுக்கு முன்கூட்டியே அனுமதி பெற வேண்டும்.',
        correctInfo: 'அனைத்து பிரச்சாரங்களும் மாதிரி நடத்தை விதிகள் மற்றும் சத்தம் மற்றும் பொதுக் கூட்டங்கள் தொடர்பான உள்ளூர் காவல்துறை விதிமுறைகளை கண்டிப்பாக பின்பற்ற வேண்டும்.'
      },
      silence: {
        explanation: 'வாக்குப்பதிவு முடிவதற்கு 48 மணி நேரத்திற்கு முன்னதாக பிரச்சாரம் நிறுத்தப்பட வேண்டும். வாக்காளர்கள் நிதானமாகச் சிந்திப்பதற்காக இது "அமைதிக்காலம்" என்று அழைக்கப்படுகிறது.',
        correctInfo: 'வாக்குப்பதிவு முடிவடைவதற்கு நிர்ணயிக்கப்பட்ட நேரத்துடன் முடிவடையும் 48 மணி நேர காலப்பகுதியில் எந்தவொரு நபரும் தேர்தல் தொடர்பாக எந்தவொரு பொதுக் கூட்டத்தையோ அல்லது ஊர்வலத்தையோ கூட்டவோ, நடத்தவோ அல்லது அதில் கலந்து கொள்ளவோ ​​கூடாது.'
      },
      age: {
        explanation: 'வாக்களிக்கும் வயது 21 என்ற பொதுவான நம்பிக்கை பழமையானது. இது பல தசாப்தங்களுக்கு முன்பே மாற்றப்பட்டது.',
        correctInfo: 'இந்தியாவில் குறைந்தபட்ச வாக்களிக்கும் வயது 18 ஆகும், 1988-ம் ஆண்டின் 61-வது அரசியலமைப்பு திருத்தச் சட்டத்தின்படி.'
      },
      double: {
        explanation: 'ஒரு குடிமகன் ஒரு இடத்தில் மட்டுமே வாக்காளராகப் பதிவு செய்ய முடியும் மற்றும் ஒரு வாக்குக்கு மட்டுமே அவருக்கு உரிமை உண்டு.',
        correctInfo: 'ஒன்றுக்கும் மேற்பட்ட வாக்காளர் அடையாள அட்டைகளை வைத்திருப்பது அல்லது ஒன்றுக்கும் மேற்பட்ட முறை வாக்களிக்க முயற்சிப்பது தேர்தல் குற்றமாகும். உங்கள் தற்போதைய வசிப்பிடத்தில் மட்டுமே நீங்கள் பதிவு செய்துள்ளீர்கள் என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்.'
      },
      fallback: {
        explanation: 'இந்தக் கூற்றைச் கவனமாகச் சரிபார்க்க வேண்டும். குறிப்பிட்ட சூழல்கள் அல்லது சமீபத்திய ECI புதுப்பிப்புகளின் அடிப்படையில் விதிகள் மாறுபடலாம்.',
        correctInfo: 'மிகவும் துல்லியமான மற்றும் புதுப்பித்த தகவலுக்கு எப்போதும் இந்திய தேர்தல் ஆணையத்தின் (ECI) அதிகாரப்பூர்வ இணையதளம் அல்லது வாக்காளர் உதவி எண் செயலியைப் பார்க்கவும்.'
      }
    },
    te: {
      bribery: {
        explanation: 'ఓట్ల కోసం నగదు, బహుమతులు లేదా మద్యం వంటి ఎలాంటి ప్రలోభాలకు గురి చేయడం ఆదర్శ ఎన్నికల ప్రవర్తనా నియమావళి (MCC) యొక్క తీవ్రమైన ఉల్లంఘన.',
        correctInfo: 'ఓటర్లు అభ్యర్థులను వారి అర్హత మరియు మేనిఫెస్టోల ఆధారంగా ఎన్నుకోవాలి, భౌతిక లాభాల కోసం కాదు. లంచం ఇవ్వడం భారతీయ చట్టం ప్రకారం శిక్షార్హమైన నేరం.'
      },
      hate: {
        explanation: 'ఓట్లు అడగడానికి మతం, కులం లేదా మతపరమైన భావాలను ఉపయోగించడం ఖచ్చితంగా నిషేధించబడింది. వివిధ వర్గాల మధ్య ఉద్రిక్తతను సృష్టించే ద్వేషపూరిత ప్రసంగం MCC ఉల్లంఘన అవుతుంది.',
        correctInfo: 'రాజకీయ పార్టీలు మరియు అభ్యర్థులు కులం లేదా మతపరమైన భావాలను ప్రేరేపించే ప్రసంగాలు చేయడం లేదా ఎన్నికల ప్రచారం కోసం మతపరమైన స్థలాలను ఉపయోగించడం మానుకోవాలి.'
      },
      campaign: {
        explanation: 'ఎన్నికల ప్రకటన తర్వాత ప్రచారానికి అనుమతి ఉంటుంది, కానీ అభ్యర్థులు సమయపాలన (సాధారణంగా లాడ్ స్పీకర్లకు ఉదయం 6 నుండి రాత్రి 10 వరకు) మరియు ర్యాలీల కోసం ముందస్తు అనుమతి వంటి కఠినమైన మార్గదర్శకాలను పాటించాలి.',
        correctInfo: 'ప్రచారాలన్నీ ఆదర్శ ఎన్నికల ప్రవర్తనా నియమావళి మరియు శబ్దం మరియు బహిరంగ సభలకు సంబంధించిన స్థానిక పోలీసు నిబంధనలను ఖచ్చితంగా పాటించాలి.'
      },
      silence: {
        explanation: 'పోలింగ్ ముగియడానికి 48 గంటల ముందే ప్రచారం ఆగిపోవాలి. ఓటర్లు ప్రశాంతంగా ఆలోచించుకోవడానికి వీలుగా దీనిని "నిశ్శబ్ద కాలం" అని పిలుస్తారు.',
        correctInfo: 'పోలింగ్ ముగిసే సమయానికి ముగిసే 48 గంటల వ్యవధిలో ఎవరూ ఎన్నికలకు సంబంధించి ఎలాంటి బహిరంగ సభ లేదా ఊరేగింపును నిర్వహించకూడదు లేదా అందులో పాల్గొనకూడదు.'
      },
      age: {
        explanation: 'ఓటు వేయడానికి 21 ఏళ్లు నిండాలి అనే సాధారణ నమ్మకం పాతది. ఇది దశాబ్దాల క్రితమే మార్చబడింది.',
        correctInfo: 'భారతదేశంలో కనీస ఓటు హక్కు వయస్సు 18 ఏళ్లు, 1988 నాటి 61వ రాజ్యాంగ సవరణ చట్టం ప్రకారం.'
      },
      double: {
        explanation: 'ఒక పౌరుడు ఒకే చోట ఓటరుగా నమోదు చేసుకోవచ్చు మరియు అతనికి ఒకే ఓటు హక్కు ఉంటుంది.',
        correctInfo: 'ఒకటి కంటే ఎక్కువ ఓటరు ఐడీలను కలిగి ఉండటం లేదా ఒకటి కంటే ఎక్కువసార్లు ఓటు వేయడానికి ప్రయత్నించడం ఎన్నికల నేరం. మీరు మీ ప్రస్తుత నివాస స్థలంలో మాత్రమే నమోదయ్యారని నిర్ధారించుకోండి.'
      },
      fallback: {
        explanation: 'ఈ వాదనను జాగ్రత్తగా సరిచూసుకోవాలి. నిబంధనలు సందర్భాన్ని బట్టి లేదా ఇటీవల వెలువడిన ECI అప్‌డేట్‌ల ఆధారంగా మారవచ్చు.',
        correctInfo: 'అత్యంత ఖచ్చితమైన మరియు తాజా సమాచారం కోసం ఎల్లప్పుడూ భారత ఎన్నికల సంఘం (ECI) అధికారిక వెబ్‌సైట్ లేదా ఓటరు హెల్ప్‌лайн యాప్‌ను సంప్రదించండి.'
      }
    }
  };

  const t = responses[lang] || responses.en;

  // A. MCC Violations
  if (matches(lc, ['free gifts', 'cash for votes', 'liquor', 'bribe', 'money for vote', 'giving gifts', 'मुफ्त उपहार', 'नकद', 'रिश्वत', 'भेटवस्तू', 'लाच', 'ঘুষ', 'উপহার', 'லஞ்சம்', 'பரிசு', 'లంచం', 'బహుమతి'])) {
    return { status: 'not_allowed', ...t.bribery, confidence: 'High' };
  }
  
  if (matches(lc, ['hate speech', 'religion based appeal', 'caste appeal', 'communal', 'religious place', 'नफरत भरा भाषण', 'धर्म', 'जाति', 'द्वेषयुक्त भाषण', 'জাতীয়', 'மதம்', 'சாதி', 'ద్వేషపూరిత'])) {
    return { status: 'not_allowed', ...t.hate, confidence: 'High' };
  }

  // B. Rules
  if (matches(lc, ['campaigning before election', 'rally timing', 'loudspeaker', 'प्रचार', 'लाउडस्पीकर', 'प्रचार', 'প্রচারাভিযান', 'பிரச்சாரம்', 'ప్రచారం'])) {
    return { status: 'allowed', ...t.campaign, confidence: 'Medium' };
  }

  if (matches(lc, ['silence period', 'campaigning on polling day', 'voting day campaign', 'मौन अवधि', 'मतदान के दिन', 'शांतता काळ', 'নীরবতা'])) {
    return { status: 'not_allowed', ...t.silence, confidence: 'High' };
  }

  // C. Myths
  if (matches(lc, ['voting age is 21', 'age for voting is 21', '21 years old to vote', 'वोट देने की उम्र 21', '21 वर्षे'])) {
    return { status: 'misleading', ...t.age, confidence: 'High' };
  }

  if (matches(lc, ['can vote twice', 'two voter ids', 'multiple votes', 'दो बार वोट', 'दो वोटर आईडी', 'दोनदा मतदान'])) {
    return { status: 'not_allowed', ...t.double, confidence: 'High' };
  }

  // Default / Fallback
  return { status: 'misleading', ...t.fallback, confidence: 'Low' };
}
