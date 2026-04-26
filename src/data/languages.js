// All 22 Scheduled Languages of India + English
export const languages = [
  { code: 'en',  name: 'English',    nativeName: 'English',       script: 'latin',      rtl: false },
  { code: 'hi',  name: 'Hindi',      nativeName: 'हिन्दी',          script: 'devanagari', rtl: false },
  { code: 'mr',  name: 'Marathi',    nativeName: 'मराठी',           script: 'devanagari', rtl: false },
  { code: 'bn',  name: 'Bengali',    nativeName: 'বাংলা',           script: 'bengali',    rtl: false },
  { code: 'te',  name: 'Telugu',     nativeName: 'తెలుగు',          script: 'telugu',     rtl: false },
  { code: 'ta',  name: 'Tamil',      nativeName: 'தமிழ்',           script: 'tamil',      rtl: false },
  { code: 'gu',  name: 'Gujarati',   nativeName: 'ગુજરાતી',         script: 'gujarati',   rtl: false },
  { code: 'kn',  name: 'Kannada',    nativeName: 'ಕನ್ನಡ',           script: 'kannada',    rtl: false },
  { code: 'ml',  name: 'Malayalam',  nativeName: 'മലയാളം',          script: 'malayalam',  rtl: false },
  { code: 'pa',  name: 'Punjabi',    nativeName: 'ਪੰਜਾਬੀ',          script: 'gurmukhi',   rtl: false },
  { code: 'or',  name: 'Odia',       nativeName: 'ଓଡ଼ିଆ',            script: 'odia',       rtl: false },
  { code: 'as',  name: 'Assamese',   nativeName: 'অসমীয়া',         script: 'bengali',    rtl: false },
  { code: 'ur',  name: 'Urdu',       nativeName: 'اردو',            script: 'arabic',     rtl: true  },
  { code: 'ks',  name: 'Kashmiri',   nativeName: 'کٲشُر',           script: 'arabic',     rtl: true  },
  { code: 'sd',  name: 'Sindhi',     nativeName: 'سنڌي',            script: 'arabic',     rtl: true  },
  { code: 'sa',  name: 'Sanskrit',   nativeName: 'संस्कृतम्',       script: 'devanagari', rtl: false },
  { code: 'ne',  name: 'Nepali',     nativeName: 'नेपाली',           script: 'devanagari', rtl: false },
  { code: 'doi', name: 'Dogri',      nativeName: 'डोगरी',            script: 'devanagari', rtl: false },
  { code: 'kok', name: 'Konkani',    nativeName: 'कोंकणी',           script: 'devanagari', rtl: false },
  { code: 'mai', name: 'Maithili',   nativeName: 'मैथिली',           script: 'devanagari', rtl: false },
  { code: 'mni', name: 'Manipuri',   nativeName: 'মৈতৈলোন্',        script: 'bengali',    rtl: false },
  { code: 'sat', name: 'Santali',    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',       script: 'olchiki',    rtl: false },
  { code: 'brx', name: 'Bodo',       nativeName: 'बड़ो',              script: 'devanagari', rtl: false },
];

export const RTL_LANGUAGES = ['ur', 'ks', 'sd'];

// Maps script → Google Font family + line-height scale
export const scriptConfig = {
  latin:      { font: "'Inter', sans-serif",                   lineScale: 1.0,  sizeAdj: '1rem'    },
  devanagari: { font: "'Noto Sans Devanagari', sans-serif",    lineScale: 1.35, sizeAdj: '1.05rem' },
  bengali:    { font: "'Noto Sans Bengali', sans-serif",       lineScale: 1.35, sizeAdj: '1.05rem' },
  telugu:     { font: "'Noto Sans Telugu', sans-serif",        lineScale: 1.45, sizeAdj: '1.1rem'  },
  tamil:      { font: "'Noto Sans Tamil', sans-serif",         lineScale: 1.45, sizeAdj: '1.1rem'  },
  gujarati:   { font: "'Noto Sans Gujarati', sans-serif",      lineScale: 1.35, sizeAdj: '1.05rem' },
  kannada:    { font: "'Noto Sans Kannada', sans-serif",       lineScale: 1.45, sizeAdj: '1.1rem'  },
  malayalam:  { font: "'Noto Sans Malayalam', sans-serif",     lineScale: 1.45, sizeAdj: '1.1rem'  },
  gurmukhi:   { font: "'Noto Sans Gurmukhi', sans-serif",      lineScale: 1.35, sizeAdj: '1.05rem' },
  odia:       { font: "'Noto Sans Oriya', sans-serif",         lineScale: 1.4,  sizeAdj: '1.1rem'  },
  arabic:     { font: "'Noto Nastaliq Urdu', serif",           lineScale: 1.6,  sizeAdj: '1.15rem' },
  olchiki:    { font: "'Noto Sans Ol Chiki', sans-serif",      lineScale: 1.3,  sizeAdj: '1.05rem' },
};

export function getScriptConfig(langCode) {
  const lang = languages.find(l => l.code === langCode);
  return scriptConfig[lang?.script || 'latin'] || scriptConfig.latin;
}

export function isRTL(langCode) {
  return RTL_LANGUAGES.includes(langCode);
}
