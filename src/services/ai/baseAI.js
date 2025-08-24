const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export class BaseAI {
  static async callAPI(prompt, systemPrompt) {
    if (!API_KEY) throw new Error('OpenRouter API key not configured');

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Sahai.ai'
      },
      body: JSON.stringify({
        model: 'google/gemini-flash-1.5',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 3000
      })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content;
  }

  static parseJSON(response) {
    try {
      let clean = response.trim();
      if (clean.startsWith('```json')) clean = clean.replace(/```json\n?/, '').replace(/```\s*$/, '');
      
      const arrayStart = clean.indexOf('[');
      const objectStart = clean.indexOf('{');
      
      if (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) {
        clean = clean.substring(arrayStart, clean.lastIndexOf(']') + 1);
      } else if (objectStart !== -1) {
        clean = clean.substring(objectStart, clean.lastIndexOf('}') + 1);
      }
      
      return JSON.parse(clean);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      return null;
    }
  }
}