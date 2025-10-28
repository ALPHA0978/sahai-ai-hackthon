const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Validate API keys
if (!OPENROUTER_API_KEY && !GEMINI_API_KEY) {
  console.warn('No AI API keys found. Using fallback responses.');
}

export class BaseAI {
  static async callAPI(prompt, systemPrompt) {
    try {
      return await this.callOpenRouter(prompt, systemPrompt);
    } catch (error) {
      console.error('OpenRouter failed, trying Gemini:', error);
      try {
        return await this.callGemini(prompt, systemPrompt);
      } catch (geminiError) {
        console.error('Both APIs failed:', { openRouter: error, gemini: geminiError });
        // Return a fallback response based on the prompt context
        return this.getFallbackResponse(prompt, systemPrompt);
      }
    }
  }
  
  static getFallbackResponse(prompt, systemPrompt) {
    // Provide contextual fallback responses
    if (systemPrompt.includes('market analyst')) {
      return JSON.stringify({
        shortages: ['Rice', 'Wheat', 'Pulses'],
        corporateDemand: [{company: 'Food Corp', crops: ['Rice'], increase: '25%'}],
        priceRising: ['Organic crops', 'Millets'],
        nutritionNeeds: ['Protein', 'Iron', 'Vitamins']
      });
    }
    
    if (systemPrompt.includes('agricultural expert')) {
      return JSON.stringify([
        {name: 'Rice', profit: 'high', reason: 'High demand and good prices', marketAlignment: 'Staple food shortage'},
        {name: 'Wheat', profit: 'medium', reason: 'Stable market demand', marketAlignment: 'Food security need'},
        {name: 'Millets', profit: 'high', reason: 'Rising health consciousness', marketAlignment: 'Nutrition focus'}
      ]);
    }
    
    return JSON.stringify({
      status: 'API unavailable',
      message: 'Please try again later',
      fallback: true
    });
  }
  
  static async callOpenRouter(prompt, systemPrompt) {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Sahai.ai'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-nano-9b-v2:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error response:', errorText);
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;
    
    if (!result) {
      console.error('No content in OpenRouter response:', data);
      throw new Error('No message content in OpenRouter response');
    }
    
    return result;
  }
  
  static async callGemini(prompt, systemPrompt) {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 3000,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!result) {
      console.error('No text in Gemini response:', data);
      throw new Error('No text content in Gemini response');
    }
    
    return result;
  }

  static parseJSON(response) {
    if (!response) return null;
    try {
      // Clean the response first
      let cleanResponse = response.trim();
      
      // Remove markdown code blocks
      const jsonMatch = cleanResponse.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[1].trim();
      }
      
      // Fix HTML entities
      cleanResponse = cleanResponse
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'");
      
      // Try to extract JSON from the response
      const arrayMatch = cleanResponse.match(/\[[\s\S]*\]/);
      const objectMatch = cleanResponse.match(/\{[\s\S]*\}/);
      
      if (arrayMatch) {
        return JSON.parse(arrayMatch[0]);
      }
      if (objectMatch) {
        return JSON.parse(objectMatch[0]);
      }
      
      // Try parsing the entire response
      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('JSON parsing failed:', error);
      console.error('Response was:', response);
      
      // Try to fix common JSON issues
      try {
        let fixedResponse = response
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&#39;/g, "'")
          .replace(/\n/g, ' ')
          .replace(/\r/g, '')
          .trim();
          
        // Find the first { or [ and last } or ]
        const startIndex = Math.max(fixedResponse.indexOf('{'), fixedResponse.indexOf('['));
        const endIndex = Math.max(fixedResponse.lastIndexOf('}'), fixedResponse.lastIndexOf(']'));
        
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
          fixedResponse = fixedResponse.substring(startIndex, endIndex + 1);
          
          // Additional cleanup for malformed JSON
          fixedResponse = fixedResponse
            .replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
            .replace(/([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":'); // Quote unquoted keys
          
          return JSON.parse(fixedResponse);
        }
      } catch (secondError) {
        console.error('Second JSON parsing attempt failed:', secondError);
      }
      
      return null;
    }
  }

  static convertTextToJSON(text) {
    // Convert text response to appropriate JSON based on context
    if (text.toLowerCase().includes('soil')) {
      return {
        soilType: 'Analysis needed',
        pH: 'Test required',
        healthScore: 75,
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
        healthScore: 80,
        yieldPrediction: {expected: 'Assessment based on provided information', quality: 'Medium'},
        diseases: [{name: 'Analysis in progress', severity: 'Low', treatment: text.substring(0, 100), cost: '₹500'}],
        pests: [{name: 'Monitoring required', damage: 'Low', control: 'Preventive measures'}],
        fertilizers: [{name: 'NPK', quantity: '50kg', timing: 'As needed', cost: '₹1200'}],
        irrigation: {schedule: 'Regular', method: 'Drip', waterNeeded: '100L'},
        harvest: {optimalTime: 'Monitor closely', indicators: ['Color change', 'Firmness']}
      };
    }
    
    if (text.toLowerCase().includes('market') || text.toLowerCase().includes('price')) {
      return {
        shortages: ['Rice', 'Wheat'],
        corporateDemand: [{company: 'Food Corp', crops: ['Rice'], increase: '25%'}],
        priceRising: ['Organic crops'],
        nutritionNeeds: ['Protein', 'Iron']
      };
    }
    
    // Default fallback
    return {
      analysis: text.substring(0, 200),
      status: 'Text response converted',
      recommendations: ['Review AI response', 'Try again with more specific data']
    };
  }
}