import { BaseAI } from './baseAI.js';

export class SchemeAI extends BaseAI {
  static async callAPI(prompt, systemPrompt, language = 'en') {
    const langInstruction = language === 'hi' 
      ? 'Respond in Hindi (Devanagari script). All text, descriptions, and explanations must be in Hindi.'
      : 'Respond in English.';
    
    const fullSystemPrompt = `${systemPrompt}\n\nIMPORTANT: ${langInstruction}\n\nCurrent Date: ${new Date().toISOString().split('T')[0]}\nUse only ACTIVE government schemes from 2024. Verify scheme status and provide accurate, up-to-date information.`;
    
    return super.callAPI(prompt, fullSystemPrompt);
  }

  static async analyzeDocument(documentText, language = 'en') {
    try {
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
      const profile = this.parseJSON(response);
      
      if (profile && typeof profile === 'object') {
        return profile;
      }
    } catch (error) {
      // API disabled - using fallback
    }
    
    // Fallback: basic text analysis
    return this.extractBasicProfile(documentText);
  }
  
  static extractBasicProfile(text) {
    const profile = {
      name: null,
      age: null,
      location: { state: null, district: null },
      occupation: null,
      annualIncome: null,
      category: 'General',
      gender: null,
      confidence: 50
    };
    
    // Basic pattern matching
    const nameMatch = text.match(/name[:\s]+([a-zA-Z\s]+)/i);
    if (nameMatch) profile.name = nameMatch[1].trim();
    
    const ageMatch = text.match(/age[:\s]+(\d+)/i);
    if (ageMatch) profile.age = parseInt(ageMatch[1]);
    
    const incomeMatch = text.match(/income[:\s]+[₹]?([\d,]+)/i);
    if (incomeMatch) profile.annualIncome = parseInt(incomeMatch[1].replace(/,/g, ''));
    
    return profile;
  }

  static async findSchemes(userProfile, language = 'en') {
    try {
      const systemPrompt = `You are a government scheme researcher. Your task:
1. Search https://www.myscheme.gov.in/search using filters for user profile
2. Apply filters: State=${userProfile.location?.state}, Category based on profile, Income range
3. For each matching scheme, verify on Google if it's active in 2024
4. Calculate eligibility based on user profile
5. Return only verified, relevant schemes

Return JSON array with eligibility analysis:
[{
  "id": "scheme_code",
  "title": "Official Scheme Name",
  "description": "Detailed description",
  "amount": "Benefit amount",
  "category": "Relevant category",
  "level": "Central|State",
  "ministry": "Implementing ministry",
  "eligibilityUrl": "Official URL",
  "applicationUrl": "Application URL",
  "helplineNumber": "Contact number",
  "isEligible": "eligible|not_eligible|partially_eligible",
  "eligibilityScore": 0-100,
  "eligibilityReason": "Detailed explanation",
  "requirements": ["Required documents"],
  "benefits": ["List of benefits"],
  "applicationProcess": ["Steps to apply"],
  "lastUpdated": "2024-MM-DD",
  "schemeStatus": "Active",
  "verificationSource": "myscheme.gov.in + Google verification"
}]`;

      const contextPrompt = `Search myscheme.gov.in for schemes matching:
- State: ${userProfile.location?.state}
- Age: ${userProfile.age}, Gender: ${userProfile.gender}
- Income: ₹${userProfile.annualIncome} annually
- Category: ${userProfile.category}
- Occupation: ${userProfile.occupation}
- Education: ${userProfile.educationLevel}
- Land ownership: ${userProfile.landOwnership}
- BPL Status: ${userProfile.isBPL}

Use myscheme.gov.in filters, then verify each scheme on Google for 2024 status. Calculate eligibility scores based on profile match.`;

      const response = await this.callAPI(contextPrompt, systemPrompt, language);
      const schemes = this.parseJSON(response);
      
      if (Array.isArray(schemes) && schemes.length > 0) {
        return schemes;
      }
    } catch (error) {
      console.error('AI API failed for scheme finding:', error);
    }
    
    return [];
  }

  static async getPopularSchemes(language = 'en') {
    try {
      const systemPrompt = `You are a government scheme researcher. Your task:
1. Search https://www.myscheme.gov.in/search for current active schemes
2. Verify each scheme on Google to confirm it's recent and active in 2024
3. Return only verified, current schemes

Return JSON array:
[{
  "id": "scheme_code",
  "title": "Official Scheme Name",
  "description": "Detailed description",
  "amount": "Benefit amount",
  "category": "Agriculture|Health|Education|Employment|Housing|Social Security",
  "level": "Central|State",
  "ministry": "Implementing ministry",
  "eligibilityUrl": "Official URL",
  "applicationUrl": "Application URL",
  "helplineNumber": "Contact number",
  "requirements": ["Required documents"],
  "benefits": ["List of benefits"],
  "applicationProcess": ["Steps to apply"],
  "lastUpdated": "2024-MM-DD",
  "schemeStatus": "Active",
  "verificationSource": "myscheme.gov.in + Google verification"
}]`;
      
      const response = await this.callAPI(`Search myscheme.gov.in for popular active schemes in 2024. Use filters for:
- Central Government schemes
- State schemes for major states (Maharashtra, UP, Karnataka, Tamil Nadu, Gujarat)
- Categories: Agriculture, Health, Education, Employment, Housing, Social Security

For each scheme found:
1. Extract details from myscheme.gov.in
2. Google search "[scheme name] 2024 active status" to verify
3. Only include if verified as active in 2024

Focus on high-impact schemes like PM-KISAN, Ayushman Bharat, PMAY, MGNREGA, etc.`, systemPrompt, language);
      const schemes = this.parseJSON(response);
      
      if (Array.isArray(schemes) && schemes.length > 0) {
        return schemes;
      }
    } catch (error) {
      console.error('AI API failed for popular schemes:', error);
    }
    
    return [];
  }


  
  static enhanceSchemeData(schemes, userProfile) {
    return schemes.map(scheme => {
      const enhanced = { ...scheme };
      
      let score = 0;
      let eligible = 'not_eligible';
      let reason = 'Profile analysis needed';
      
      if (userProfile) {
        // Agriculture schemes
        if (scheme.category === 'Agriculture' && userProfile.landOwnership === 'Yes') {
          score += 40;
          if (userProfile.occupation?.toLowerCase().includes('farm')) score += 30;
          if (userProfile.annualIncome < 200000) score += 20;
          if (userProfile.aadhaarCard) score += 10;
        }
        
        // Health schemes
        if (scheme.category === 'Health') {
          if (userProfile.isBPL || userProfile.annualIncome < 500000) score += 50;
          if (userProfile.category !== 'General') score += 20;
          if (userProfile.aadhaarCard) score += 20;
          if (userProfile.familySize > 4) score += 10;
        }
        
        // Housing schemes
        if (scheme.category === 'Housing') {
          if (userProfile.housingType === 'Kutcha' || userProfile.housingType === 'Homeless') score += 60;
          if (userProfile.annualIncome < 1800000) score += 30;
          if (userProfile.gender === 'Female') score += 10;
        }
        
        if (score >= 70) {
          eligible = 'eligible';
          reason = 'You meet most eligibility criteria for this scheme';
        } else if (score >= 40) {
          eligible = 'partially_eligible';
          reason = 'You meet some criteria. Additional documentation may be required';
        } else {
          eligible = 'not_eligible';
          reason = 'Current profile does not match scheme requirements';
        }
      }
      
      enhanced.eligibilityScore = Math.min(score, 100);
      enhanced.isEligible = eligible;
      enhanced.eligibilityReason = reason;
      
      return enhanced;
    });
  }

  // Real-time scheme search with filters
  static async searchSchemes(query, filters = {}, language = 'en') {
    const systemPrompt = `Search for Indian government schemes matching the query. Apply filters and return relevant schemes. Return JSON array with same structure as findSchemes method.`;
    
    const searchPrompt = `Search query: "${query}"\nFilters: ${JSON.stringify(filters)}\nFind matching active government schemes with high relevance.`;
    
    const response = await this.callAPI(searchPrompt, systemPrompt, language);
    const schemes = this.parseJSON(response);
    
    return Array.isArray(schemes) ? schemes : this.filterSchemes(query, filters);
  }
  
  static filterSchemes(query, filters) {
    return [];
  }
  
  // Get scheme details by ID
  static async getSchemeDetails(schemeId, language = 'en') {
    const systemPrompt = `Provide comprehensive details for the government scheme with ID: ${schemeId}. Include all available information, recent updates, and application guidance.`;
    
    const response = await this.callAPI(`Get detailed information for scheme ID: ${schemeId}`, systemPrompt, language);
    return this.parseJSON(response) || this.getSchemeById(schemeId);
  }
  
  static getSchemeById(schemeId) {
    return null;
  }
}