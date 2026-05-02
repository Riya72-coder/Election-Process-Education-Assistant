/**
 * Gemini API integration - Stable React Structure
 */

export const streamGeminiResponse = async (userPrompt, language, onChunk, onDone, onError) => {
  // Using the key from your .env file
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_KEY; 
  const MODEL = "gemini-2.5-flash";
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    onError(new Error('NO_API_KEY'));
    return;
  }

  const payload = {
    contents: [{
      parts: [{
        text: `You are the CivicGuide AI. Answer in ${language}.
Formatting Rules:
1. Use clear headings (###) for different sections.
2. Use bullet points (-) for lists or steps.
3. Use bold text (**) for key dates, forms, or names.
4. Ensure there is a double line break between paragraphs.

Question: ${userPrompt}`
      }]
    }],
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
    }
  };

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const fullText = data.candidates[0].content.parts[0].text;

    // To keep the premium "streaming" feel in your UI, we deliver words one by one
    const words = fullText.split(' ');
    words.forEach((word, i) => {
      setTimeout(() => onChunk((i === 0 ? '' : ' ') + word), i * 25);
    });
    
    setTimeout(onDone, words.length * 25 + 100);

  } catch (err) {
    console.error("Gemini Error:", err.message);
    onError(err);
  }
};
