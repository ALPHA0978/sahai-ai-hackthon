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
      if (!response || typeof response !== 'string') return null;
      
      let clean = response.trim();
      
      // Remove markdown code blocks more aggressively
      clean = clean.replace(/```json\s*/g, '').replace(/```\s*/g, '').replace(/^```/g, '').replace(/```$/g, '');
      
      // Find JSON boundaries
      const arrayStart = clean.indexOf('[');
      const objectStart = clean.indexOf('{');
      
      if (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) {
        const arrayEnd = clean.lastIndexOf(']');
        if (arrayEnd > arrayStart) {
          clean = clean.substring(arrayStart, arrayEnd + 1);
        }
      } else if (objectStart !== -1) {
        const objectEnd = clean.lastIndexOf('}');
        if (objectEnd > objectStart) {
          clean = clean.substring(objectStart, objectEnd + 1);
        }
      }
      
      // Try direct parsing first
      try {
        return JSON.parse(clean);
      } catch (parseError) {
        // If direct parsing fails, try to fix common issues
        clean = clean.replace(/'/g, '"')
                    .replace(/,\s*([}\]])/g, '$1')
                    .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*):/g, '$1"$2":');
        return JSON.parse(clean);
      }
      
    } catch (error) {
      console.error('JSON Parse Error:', error);
      console.log('Problematic response:', response?.substring(0, 500));
      return null;
    }
  }

  static convertTextToJSON(text) {
    // Convert text response to appropriate JSON based on context
    if (text.toLowerCase().includes('soil')) {
      return {
        soilType: 'Analysis needed',
        pH: 'Test required',
        nutrients: {nitrogen: 'Medium', phosphorus: 'Medium', potassium: 'Medium'},
        organicMatter: 'Assessment needed',
        improvements: [text.substring(0, 100) + '...'],
        fertilizers: ['NPK recommended'],
        suitableCrops: ['Rice', 'Wheat']
      };
    }
    
    if (text.toLowerCase().includes('crop') || text.toLowerCase().includes('disease')) {
      return {
        cropHealth: 'Good',
        yieldPrediction: 'Assessment based on provided information',
        diseases: [{name: 'Analysis in progress', severity: 'Low', treatment: text.substring(0, 100), cost: '₹500'}],
        pests: [{name: 'Monitoring required', damage: 'Low', control: 'Preventive measures'}],
        fertilizers: [{name: 'NPK', quantity: '50kg', timing: 'As needed', cost: '₹1200'}],
        irrigation: {schedule: 'Regular', method: 'Drip', waterNeeded: '100L'},
        harvest: {optimalTime: 'Monitor closely', indicators: ['Color change', 'Firmness']}
      };
    }
    
    if (text.toLowerCase().includes('market') || text.toLowerCase().includes('price')) {
      return [{
        crop: 'General',
        currentPrice: 'Market rate',
        weeklyTrend: 'Stable',
        monthlyTrend: text.substring(0, 50),
        bestMarkets: ['Local Mandi'],
        demandForecast: 'Moderate',
        sellingAdvice: 'Monitor market conditions'
      }];
    }
    
    // Default fallback
    return {
      analysis: text.substring(0, 200),
      status: 'Text response converted',
      recommendations: ['Review AI response', 'Try again with more specific data']
    };
  }
}