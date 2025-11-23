const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Validate API keys
console.log('API Keys Status:', {
  openRouter: OPENROUTER_API_KEY ? 'Available' : 'Missing',
  gemini: GEMINI_API_KEY ? 'Available' : 'Missing'
});

if (!OPENROUTER_API_KEY && !GEMINI_API_KEY) {
  console.warn('No AI API keys found. Using fallback responses.');
}

export class BaseAI {
  static async callAPI(prompt, systemPrompt) {
    console.log('BaseAI.callAPI called with:', { prompt: prompt.substring(0, 100), systemPrompt: systemPrompt.substring(0, 100) });
    
    if (!OPENROUTER_API_KEY && !GEMINI_API_KEY) {
      console.log('No API keys available, using fallback');
      return this.getFallbackResponse(prompt, systemPrompt);
    }
    
    try {
      console.log('Trying OpenRouter API...');
      const result = await this.callOpenRouter(prompt, systemPrompt);
      console.log('OpenRouter success:', result.substring(0, 100));
      return result;
    } catch (error) {
      console.error('OpenRouter failed, trying Gemini:', error);
      try {
        console.log('Trying Gemini API...');
        const result = await this.callGemini(prompt, systemPrompt);
        console.log('Gemini success:', result.substring(0, 100));
        return result;
      } catch (geminiError) {
        console.error('Both APIs failed:', { openRouter: error, gemini: geminiError });
        console.log('Using fallback response');
        return this.getFallbackResponse(prompt, systemPrompt);
      }
    }
  }
  
  static getFallbackResponse(prompt, systemPrompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    // SDG Assistant responses
    if (systemPrompt.includes('SDG') || systemPrompt.includes('Sustainable Development')) {
      if (lowerPrompt.includes('what are') && lowerPrompt.includes('sdg')) {
        return 'The 17 Sustainable Development Goals (SDGs) are a universal call to action adopted by the United Nations in 2015. They aim to end poverty, protect the planet, and ensure peace and prosperity for all by 2030. The goals include: No Poverty, Zero Hunger, Good Health, Quality Education, Gender Equality, Clean Water, Affordable Energy, Decent Work, Industry Innovation, Reduced Inequalities, Sustainable Cities, Responsible Consumption, Climate Action, Life Below Water, Life on Land, Peace and Justice, and Partnerships for the Goals.';
      }
      if (lowerPrompt.includes('climate')) {
        return 'Climate Action (SDG 13) focuses on taking urgent action to combat climate change and its impacts. You can help by: reducing energy consumption, using renewable energy, supporting sustainable transportation, advocating for climate policies, participating in tree planting, reducing waste, and supporting organizations working on climate solutions.';
      }
      if (lowerPrompt.includes('sdg 4') || lowerPrompt.includes('education')) {
        return 'SDG 4 - Quality Education aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. You can contribute by: volunteering as a tutor, supporting educational nonprofits, advocating for educational access, donating books or supplies, mentoring students, or supporting digital literacy programs.';
      }
      if (lowerPrompt.includes('get involved') || lowerPrompt.includes('how can i help')) {
        return 'There are many ways to get involved with the SDGs: 1) Volunteer with local NGOs working on SDG issues, 2) Support sustainable businesses, 3) Advocate for policy changes, 4) Educate others about the SDGs, 5) Make sustainable lifestyle choices, 6) Donate to organizations working on SDG goals, 7) Participate in community projects, 8) Use your professional skills to support SDG initiatives.';
      }
      return 'I\'m here to help you learn about the 17 Sustainable Development Goals and find ways to make a positive impact. You can ask me about specific SDGs, how to get involved, or ways to contribute to sustainable development in your community.';
    }
    
    // Market analyst responses
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
    
    return 'I apologize, but I\'m having trouble connecting to my AI services right now. Please try again in a moment, or feel free to ask a more specific question about the topic you\'re interested in.';
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
      // First, decode HTML entities
      let cleanResponse = response
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .trim();
      
      // Remove markdown code blocks
      const jsonMatch = cleanResponse.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[1].trim();
      }
      
      // Try parsing directly first
      try {
        return JSON.parse(cleanResponse);
      } catch (directError) {
        // If direct parsing fails, try to extract JSON
        const arrayMatch = cleanResponse.match(/\[[\s\S]*\]/);
        const objectMatch = cleanResponse.match(/\{[\s\S]*\}/);
        
        if (arrayMatch) {
          return JSON.parse(arrayMatch[0]);
        }
        if (objectMatch) {
          return JSON.parse(objectMatch[0]);
        }
        
        throw directError;
      }
    } catch (error) {
      console.error('JSON parsing failed:', error);
      console.error('Response was:', response.substring(0, 500));
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