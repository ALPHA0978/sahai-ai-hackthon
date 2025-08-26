const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export class SchemeAI {
  static async callAPI(prompt, systemPrompt, language = 'en') {
    const langInstruction = language === 'hi' 
      ? 'Respond in Hindi (Devanagari script). All text, descriptions, and explanations must be in Hindi.'
      : 'Respond in English.';
    
    const fullSystemPrompt = `${systemPrompt}\n\nIMPORTANT: ${langInstruction}`;
    
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
          { role: 'system', content: fullSystemPrompt },
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

  static async analyzeDocument(documentText, language = 'en') {
    const systemPrompt = `Extract user profile from document. Return ONLY valid JSON:
{
  "name": "string or null",
  "age": number or null,
  "location": {"state": "string", "district": "string", "pincode": "string"},
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

    const response = await this.callAPI(`Extract profile: "${documentText}"`, systemPrompt, language);
    return this.parseJSON(response);
  }

  static async findSchemes(userProfile, language = 'en') {
    const systemPrompt = `Find eligible Indian government schemes. Return JSON array:
[{
  "id": "unique_id",
  "title": "Scheme Name",
  "description": "Brief description",
  "amount": "Benefit amount",
  "category": "Agriculture|Education|Health|Employment|Housing|Social Security",
  "state": "State or Central",
  "eligibilityUrl": "URL",
  "applicationUrl": "URL",
  "isEligible": true/false/null,
  "eligibilityReason": "Detailed reason",
  "requirements": ["req1", "req2"],
  "benefits": ["benefit1", "benefit2"],
  "lastUpdated": "2024-01-01"
}]`;

    const response = await this.callAPI(`Profile: ${JSON.stringify(userProfile)}`, systemPrompt, language);
    const schemes = this.parseJSON(response);
    return Array.isArray(schemes) ? schemes : [];
  }

  static async getPopularSchemes(language = 'en') {
    const systemPrompt = `Return new top 10 popular Indian government schemes which is not end as JSON array. Include detailed descriptions, proper government URLs, requirements, and benefits:
[{
  "id": "unique_id",
  "title": "Full Official Scheme Name",
  "description": "Detailed description with eligibility and benefits",
  "amount": "Specific benefit amount with details",
  "category": "Agriculture|Education|Health|Employment|Housing|Social Security",
  "state": "Central",
  "eligibilityUrl": "Official .gov.in eligibility check URL",
  "applicationUrl": "Official .gov.in application URL",
  "isEligible": null,
  "eligibilityReason": "Profile analysis needed for eligibility",
  "requirements": ["specific requirement 1", "specific requirement 2"],
  "benefits": ["specific benefit 1", "specific benefit 2"],
  "lastUpdated": "2024-01-01"
}]`;
    
    const response = await this.callAPI('List popular schemes: PM-KISAN, PMAY, Ayushman Bharat, MGNREGA, PM-SBY, Ujjwala, Mudra, Kisan Credit Card, Sukanya Samriddhi, APY', systemPrompt, language);
    const schemes = this.parseJSON(response);
    return Array.isArray(schemes) && schemes.length > 0 ? schemes : this.getDefaultSchemes();
  }

  static getDefaultSchemes() {
    return [
      {
        id: 'pmkisan',
        title: 'PM-KISAN Samman Nidhi Yojana',
        description: 'Direct income support of ₹6,000 per year to small and marginal farmers in three equal installments of ₹2,000 each. Covers all landholding farmers subject to certain exclusions.',
        amount: '₹6,000 per year (₹2,000 per installment)',
        category: 'Agriculture',
        state: 'Central',
        isEligible: null,
        eligibilityUrl: 'https://pmkisan.gov.in/StaticPages/Benificiaries.aspx',
        applicationUrl: 'https://pmkisan.gov.in/RegistrationForm.aspx',
        requirements: ['Land ownership documents', 'Aadhaar card', 'Bank account details'],
        benefits: ['Direct cash transfer', 'Financial security', 'Agricultural investment support'],
        lastUpdated: '2024-01-01'
      },
      {
        id: 'pmay',
        title: 'Pradhan Mantri Awas Yojana (Urban)',
        description: 'Housing for All mission providing affordable housing to urban poor. Offers credit-linked subsidy, affordable housing in partnership, and beneficiary-led individual house construction.',
        amount: 'Up to ₹2.67 lakh subsidy',
        category: 'Housing',
        state: 'Central',
        isEligible: null,
        eligibilityUrl: 'https://pmaymis.gov.in/Open/Find_Beneficiary_Details',
        applicationUrl: 'https://pmaymis.gov.in/',
        requirements: ['Income certificate', 'Property documents', 'Aadhaar card', 'Bank account'],
        benefits: ['Interest subsidy on home loans', 'Affordable housing', 'Infrastructure development'],
        lastUpdated: '2024-01-01'
      }
      
    ];
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
      return [];
    }
  }
}