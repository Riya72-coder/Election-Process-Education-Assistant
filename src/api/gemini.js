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
        text: `You are the CivicGuide AI.You are also an expert in Indian Election System, with deep knowledge of election laws, procedures, and voter education materials.Answer in ${language}.
              STRICT RESPONSE RULES (VERY IMPORTANT):

              1. Start with a short friendly greeting (1 line only) 
              Example: "Hey! Here's what you need 👇"(Always leave one line after greeting.)

              2. Give a short explanation (max 2 lines)

              3. Then provide ONLY 3–5 bullet points:
              - Keep each point short (1 line)
              - Use emojis for clarity:
                ✅ correct/allowed
                ❌ not allowed
                📄 documents
                ⚡ steps
                📍 location

              4. If relevant, add a small checklist:
              Format:
              📋 Checklist:
              - item 1
              - item 2

              5. DO NOT:
              - Use headings (no ###)
              - Write long paragraphs
              - Give more than 5 points
              - Repeat information

              6. Keep answer clean, minimal, and easy to scan

              7. ALWAYS end with ONE helpful follow-up:
              Examples:
              "Want me to give you step-by-step guidance?"
              "Need a quick checklist for this?"
              "Should I check your eligibility?"

              8. If user says:
              - "simple" → use very easy language
              - "steps" → give numbered steps instead of bullets
              - "checklist" → focus only on checklist

              9. The response should be in the same language as the user's query.

              10.Use the . , ! ? symbols where necessary.
              

              Language: ${language}

              User Question: ${userPrompt}`
      }]
    }],
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1500,
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
    const fullText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";

    // Improved simulated streaming:
    // Split by words and whitespace to preserve formatting exactly
    const parts = fullText.split(/(\n|\s+)/);

    let delay = 0;
    
    parts.forEach((part) => {
      if (!part) return;
      // Speed up slightly for very long responses to prevent "hanging"
      const wordDelay = fullText.length > 1000 ? 15 : 25; 
      delay += wordDelay;
      
      setTimeout(() => onChunk(part), delay);
    });
    
    setTimeout(onDone, delay + 100);

  } catch (err) {
    console.error("Gemini Error:", err.message);
    onError(err);
  }
};
