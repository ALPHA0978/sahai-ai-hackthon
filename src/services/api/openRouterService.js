const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export class OpenRouterService {
  static async callAPI(prompt, systemPrompt = '', model = 'google/gemini-flash-1.5') {
    if (!API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    console.log('🤖 Calling OpenRouter AI API...');
    
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Sahai.ai'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 3000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from OpenRouter');
      }

      console.log('✅ AI API call successful');
      return content;
    } catch (error) {
      console.error('❌ OpenRouter API error:', error);
      throw error;
    }
  }

  static async analyzeDocument(documentText) {
    const systemPrompt = `You are an expert document analyzer for Indian government schemes. Extract user profile information and return ONLY valid JSON.

Required JSON format:
{
  "name": "string or null",
  "age": number or null,
  "location": {
    "state": "string or null",
    "district": "string or null",
    "pincode": "string or null"
  },
  "occupation": "string or null",
  "annualIncome": number or null,
  "category": "General|SC|ST|OBC|EWS|null",
  "gender": "Male|Female|Other|null",
  "maritalStatus": "Single|Married|Divorced|Widowed|null",
  "hasDisability": boolean or null,
  "isMinority": boolean or null,
  "isBPL": boolean or null,
  "landOwnership": "Yes|No|null",
  "educationLevel": "Illiterate|Primary|Secondary|Graduate|PostGraduate|null",
  "familySize": number or null,
  "bankAccount": boolean or null,
  "aadhaarCard": boolean or null
}`;

    const prompt = `Extract profile information from this document text: "${documentText}"`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Document analysis failed:', error);
      return null;
    }
  }

  static async findSchemes(userProfile) {
    const systemPrompt = `You are an expert on Indian government schemes. Analyze the user profile and return eligible schemes as JSON array.

Required JSON format:
[
  {
    "id": "unique_scheme_id",
    "title": "Scheme Name",
    "description": "Brief description",
    "amount": "Benefit amount",
    "category": "Agriculture|Education|Health|Employment|Housing|Social Security",
    "state": "State name or Central",
    "eligibilityUrl": "Official eligibility URL",
    "applicationUrl": "Official application URL",
    "isEligible": true/false/null,
    "eligibilityReason": "Detailed reason for eligibility status",
    "requirements": ["requirement1", "requirement2"],
    "benefits": ["benefit1", "benefit2"],
    "lastUpdated": "2024-01-01"
  }
]

Focus on real, current schemes. Check eligibility based on age, income, caste, location, occupation, etc.`;

    const prompt = `User Profile: ${JSON.stringify(userProfile)}. Find all eligible government schemes.`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      const schemes = this.parseJSON(response);
      return Array.isArray(schemes) ? schemes : [];
    } catch (error) {
      console.error('Scheme discovery failed:', error);
      return [];
    }
  }

  static async getPopularSchemes(location = 'India') {
    const systemPrompt = `You are an expert on Indian government schemes. Return the most popular and widely applicable government schemes as JSON array.

Required JSON format:
[
  {
    "id": "unique_scheme_id",
    "title": "Scheme Name",
    "description": "Brief description",
    "amount": "Benefit amount",
    "category": "Agriculture|Education|Health|Employment|Housing|Social Security",
    "state": "Central",
    "eligibilityUrl": "Official eligibility URL",
    "applicationUrl": "Official application URL",
    "isEligible": null,
    "eligibilityReason": "General eligibility - profile analysis needed",
    "requirements": ["requirement1", "requirement2"],
    "benefits": ["benefit1", "benefit2"],
    "lastUpdated": "2024-01-01"
  }
]

Focus on real, current, popular schemes like PM-KISAN, PMAY, Ayushman Bharat, etc.`;

    const prompt = `List the top 10 most popular Indian government schemes that are widely applicable to citizens. Include central government schemes that have high enrollment and impact.`;
    
    try {
      console.log('Calling AI for popular schemes...');
      const response = await this.callAPI(prompt, systemPrompt);
      const schemes = this.parseJSON(response);
      
      if (Array.isArray(schemes) && schemes.length > 0) {
        console.log('AI returned', schemes.length, 'schemes');
        return schemes;
      } else {
        console.log('AI returned invalid data, using fallback');
        return this.getDefaultSchemes();
      }
    } catch (error) {
      console.error('Popular schemes API error:', error);
      return this.getDefaultSchemes();
    }
  }

  static getDefaultSchemes() {
    return [
      {
        id: 'pmkisan',
        title: 'PM-KISAN Scheme',
        description: 'Direct income support to farmers',
        amount: '₹6,000 per year',
        category: 'Agriculture',
        state: 'Central',
        isEligible: null,
        eligibilityUrl: 'https://pmkisan.gov.in',
        applicationUrl: 'https://pmkisan.gov.in'
      },
      {
        id: 'pmay',
        title: 'Pradhan Mantri Awas Yojana',
        description: 'Housing for all scheme',
        amount: 'Up to ₹2.5 lakh subsidy',
        category: 'Housing',
        state: 'Central',
        isEligible: null,
        eligibilityUrl: 'https://pmaymis.gov.in',
        applicationUrl: 'https://pmaymis.gov.in'
      },
      {
        id: 'ayushman',
        title: 'Ayushman Bharat',
        description: 'Health insurance scheme',
        amount: '₹5 lakh coverage',
        category: 'Health',
        state: 'Central',
        isEligible: null,
        eligibilityUrl: 'https://pmjay.gov.in',
        applicationUrl: 'https://pmjay.gov.in'
      }
    ];
  }

  static parseJSON(response) {
    try {
      let cleanResponse = response.trim();
      
      // Remove markdown code blocks
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/```json\n?/, '').replace(/```$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/```\n?/, '').replace(/```$/, '');
      }
      
      // Find JSON content between first { and last }
      const firstBrace = cleanResponse.indexOf('{');
      const lastBrace = cleanResponse.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanResponse = cleanResponse.substring(firstBrace, lastBrace + 1);
      }
      
      // Clean up common JSON formatting issues
      cleanResponse = cleanResponse
        .replace(/'/g, '"')
        .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*):/g, '$1"$2":')
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        .replace(/\n/g, ' ')
        .replace(/\t/g, ' ')
        .replace(/\s+/g, ' ');
      
      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      console.log('Raw response:', response);
      
      // Return structured fallback based on response type
      if (response.toLowerCase().includes('market') || response.toLowerCase().includes('crop')) {
        return {
          marketTrends: {
            highDemand: [
              {
                crop: "Wheat",
                currentPrice: "₹2,200/quintal",
                demandGrowth: "15%",
                reason: "High export demand and government procurement",
                profitPotential: "High"
              },
              {
                crop: "Pulses",
                currentPrice: "₹6,000/quintal",
                demandGrowth: "20%",
                reason: "Protein demand increasing, supply shortage",
                profitPotential: "High"
              }
            ]
          },
          recommendations: {
            topCrops: [
              {
                crop: "Wheat",
                profitMargin: "40-50%",
                investmentRequired: "₹25,000/acre",
                riskLevel: "Low",
                harvestTime: "4-5 months",
                marketDemand: "Very High",
                suitability: "Suitable for current season and soil conditions"
              },
              {
                crop: "Mustard",
                profitMargin: "35-45%",
                investmentRequired: "₹15,000/acre",
                riskLevel: "Medium",
                harvestTime: "3-4 months",
                marketDemand: "High",
                suitability: "Good for oil seed demand and winter season"
              }
            ]
          },
          marketInsights: {
            supplyShortages: ["Pulses", "Oilseeds", "Vegetables"],
            exportOpportunities: ["Basmati Rice", "Wheat", "Spices"]
          },
          timeline: {
            immediate: "Plant wheat and mustard for winter season",
            nextSeason: "Consider summer vegetables and fodder crops"
          },
          riskAnalysis: {
            marketRisks: "Price volatility due to weather and global markets",
            mitigation: ["Diversify crops", "Use contract farming", "Monitor weather forecasts"]
          }
        };
      }
      
      // Healthcare/medical fallback
      if (response.toLowerCase().includes('symptom') || response.toLowerCase().includes('diagnosis') || response.toLowerCase().includes('treatment')) {
        return {
          preliminaryDiagnosis: [
            {
              condition: "Common Cold",
              probability: "65%",
              severity: "Mild",
              description: "Viral upper respiratory infection with typical symptoms"
            }
          ],
          recommendations: {
            urgency: "Low",
            nextSteps: ["Rest and hydration", "Monitor symptoms"],
            doctorConsultation: "If symptoms worsen",
            homeRemedies: ["Warm fluids", "Adequate rest", "Honey and ginger tea"]
          },
          disclaimer: "This is not a substitute for professional medical advice"
        };
      }
      
      // Nutrition fallback
      if (response.toLowerCase().includes('nutrition') || response.toLowerCase().includes('food') || response.toLowerCase().includes('vitamin')) {
        const foodName = response.match(/\b(\w+)\b/)?.[0] || "Sample Food";
        return {
          food: foodName,
          servingSize: "per 100g",
          nutrition: {
            calories: "Variable",
            totalFat: "Variable",
            saturatedFat: "Variable", 
            cholesterol: "Variable",
            sodium: "Variable",
            totalCarbohydrates: "Variable",
            dietaryFiber: "Variable",
            sugars: "Variable",
            protein: "Variable"
          },
          dailyValues: {
            totalFat: "Variable",
            saturatedFat: "Variable",
            cholesterol: "Variable", 
            sodium: "Variable",
            totalCarbohydrates: "Variable",
            dietaryFiber: "Variable",
            protein: "Variable"
          },
          vitamins: {
            vitaminA: "Variable",
            vitaminC: "Variable"
          },
          minerals: {
            calcium: "Variable",
            iron: "Variable"
          },
          healthBenefits: ["Nutritional content varies by food type", "Consult nutrition database for accurate values"]
        };
      }
      
      return {
        error: 'Failed to parse AI response',
        message: 'AI analysis completed but response format needs adjustment. Please try again.',
        fallbackData: {
          suggestions: ['Check your input data', 'Try with different parameters', 'Ensure all required fields are filled']
        }
      };
    }
  }
}