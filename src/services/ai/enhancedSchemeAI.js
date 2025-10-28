import { BaseAI } from './baseAI.js';
import { SchemeTranslator } from '../schemeTranslator.js';

export class EnhancedSchemeAI extends BaseAI {
  static async callAPI(prompt, systemPrompt, language = 'en') {
    const languageMap = {
      en: { name: 'English', script: 'Latin' },
      hi: { name: 'Hindi', script: 'Devanagari' },
      bn: { name: 'Bengali', script: 'Bengali' },
      te: { name: 'Telugu', script: 'Telugu' },
      mr: { name: 'Marathi', script: 'Devanagari' },
      ta: { name: 'Tamil', script: 'Tamil' },
      gu: { name: 'Gujarati', script: 'Gujarati' },
      kn: { name: 'Kannada', script: 'Kannada' },
      ml: { name: 'Malayalam', script: 'Malayalam' },
      pa: { name: 'Punjabi', script: 'Gurmukhi' }
    };
    
    const langInfo = languageMap[language] || { name: 'English', script: 'Latin' };
    const langInstruction = `
🔴 ABSOLUTE LANGUAGE REQUIREMENT 🔴
OUTPUT LANGUAGE: ${langInfo.name} ONLY
SCRIPT: ${langInfo.script} ONLY

RULES:
1. Write EVERYTHING in ${langInfo.name} using ${langInfo.script} script
2. DO NOT mix languages (no English, Bengali, Korean, Vietnamese, etc.)
3. Translate ALL text: titles, descriptions, amounts, categories
4. Keep only URLs and numbers unchanged
5. Use ONLY ${langInfo.script} characters for text

If language is ${langInfo.name}, output must be 100% ${langInfo.name}.
`;
    
    const fullSystemPrompt = `${systemPrompt}\n\n${langInstruction}\n\nCurrent Date: ${new Date().toISOString().split('T')[0]}\nUse only ACTIVE government schemes from 2024.`;
    
    return super.callAPI(prompt, fullSystemPrompt);
  }

  static async analyzeDocument(documentText, language = 'en') {
    const systemPrompt = `You are an expert document analyzer for Indian government schemes. Extract comprehensive user profile from any document type (Aadhaar, PAN, Income Certificate, Ration Card, etc.). Return ONLY valid JSON:
{
  "name": "full name from document",
  "age": "calculated age or from DOB",
  "dateOfBirth": "YYYY-MM-DD format",
  "location": {
    "state": "full state name",
    "district": "district name", 
    "block": "block/tehsil name",
    "village": "village/city name",
    "pincode": "6-digit pincode"
  },
  "occupation": "primary occupation",
  "annualIncome": "income in rupees (number)",
  "monthlyIncome": "monthly income in rupees",
  "category": "General|SC|ST|OBC|EWS",
  "gender": "Male|Female|Transgender",
  "maritalStatus": "Single|Married|Divorced|Widowed",
  "hasDisability": "true/false based on disability certificate",
  "disabilityType": "type of disability if any",
  "isMinority": "true/false based on religion",
  "religion": "religion from document",
  "isBPL": "true/false based on income/BPL card",
  "landOwnership": "Yes|No based on land records",
  "landSize": "land size in acres/hectares",
  "educationLevel": "Illiterate|Primary|Secondary|Higher Secondary|Graduate|Post Graduate|Professional",
  "familySize": "total family members",
  "dependents": "number of dependents",
  "bankAccount": "true/false",
  "aadhaarCard": "true/false",
  "panCard": "true/false",
  "voterID": "true/false",
  "rationCard": "APL|BPL|AAY|null",
  "employmentStatus": "Employed|Unemployed|Self-employed|Student|Retired",
  "housingType": "Pucca|Semi-pucca|Kutcha|Homeless",
  "electricConnection": "true/false",
  "toiletFacility": "true/false",
  "cookingFuel": "LPG|Kerosene|Wood|Coal|Other",
  "vehicleOwnership": "Two-wheeler|Four-wheeler|None",
  "mobileNumber": "mobile number if available",
  "documentType": "type of document analyzed",
  "confidence": "extraction confidence (0-100)"
}`;

    const response = await this.callAPI(`Analyze this Indian document and extract complete profile for government scheme eligibility: "${documentText}"`, systemPrompt, language);
    return this.parseJSON(response);
  }

  static async findSchemes(userProfile, language = 'en') {
    const schemes = await this._findSchemesInternal(userProfile, language);
    return await SchemeTranslator.translateSchemes(schemes, language);
  }

  static async _findSchemesInternal(userProfile, language = 'en') {
    const systemPrompt = `You are a government scheme researcher. Your task:
1. Search https://www.myscheme.gov.in/search using filters for user profile
2. Apply filters: State=${userProfile.location?.state}, Category based on profile, Income range
3. For each matching scheme, verify on Google if it's active in 2024
4. Calculate eligibility based on user profile
5. Return only verified, relevant schemes

Return JSON array:
[{
  "id": "scheme_code",
  "title": "Official Scheme Name",
  "shortName": "Abbreviation",
  "description": "Detailed description",
  "amount": "Benefit amount",
  "category": "Agriculture|Education|Health|Employment|Housing|Social Security|Women|Disability|Senior Citizen",
  "level": "Central|State|District",
  "ministry": "Implementing ministry",
  "eligibilityUrl": "https://example.gov.in/eligibility (MUST be valid .gov.in URL)",
  "applicationUrl": "https://example.gov.in/apply (MUST be valid .gov.in URL)",
  "helplineNumber": "Contact number",
  "isEligible": "eligible|not_eligible|partially_eligible",
  "eligibilityScore": 0-100,
  "eligibilityReason": "Detailed explanation",
  "missingRequirements": ["what user needs"],
  "requirements": ["Required documents"],
  "benefits": ["List of benefits"],
  "applicationProcess": ["Steps to apply"],
  "timeline": "processing time",
  "renewalRequired": "true/false",
  "targetBeneficiaries": "target group",
  "budgetAllocation": "budget if available",
  "successStories": "impact story",
  "commonIssues": ["common problems"],
  "tips": ["helpful tips"],
  "relatedSchemes": ["related schemes"],
  "lastUpdated": "2024-MM-DD",
  "schemeStatus": "Active",
  "applicationDeadline": "deadline if any",
  "priority": "High|Medium|Low",
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

Use myscheme.gov.in filters, then verify each scheme on Google for 2024 status. Calculate eligibility scores.`;

    const response = await this.callAPI(contextPrompt, systemPrompt, language);
    const schemes = this.parseJSON(response);
    
    return Array.isArray(schemes) ? schemes : [];
  }

  static async getPopularSchemes(language = 'en') {
    try {
      const systemPrompt = `CRITICAL: Only return schemes with REAL working government URLs. Use these verified schemes:

1. PM-KISAN: https://pmkisan.gov.in/
2. Ayushman Bharat: https://pmjay.gov.in/
3. PMAY: https://pmaymis.gov.in/
4. MGNREGA: https://nrega.nic.in/
5. PM Vishwakarma: https://pmvishwakarma.gov.in/

Return JSON array with ONLY these verified URLs:
[{
  "id": "scheme_id",
  "title": "Official Scheme Name",
  "description": "Scheme description",
  "amount": "Benefit amount",
  "category": "Agriculture|Health|Employment|Housing",
  "level": "Central",
  "ministry": "Ministry name",
  "eligibilityUrl": "REAL .gov.in URL from above list",
  "applicationUrl": "REAL .gov.in URL from above list",
  "helplineNumber": "Real number",
  "requirements": ["Documents"],
  "benefits": ["Benefits"],
  "applicationProcess": ["Steps"],
  "lastUpdated": "2024-12-15",
  "schemeStatus": "Active"
}]`;
      
      const languageExamples = {
        hi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
        bn: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি যোজনা',
        te: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి యోజన',
        ta: 'பிரதம மந்திரி கிசான் சம்மான் நிதி யோஜனா',
        mr: 'प्रधानमंत्री किसान सन्मान निधी योजना',
        gu: 'પ્રધાનમંત્રી કિસાન સમ્માન નિધિ યોજના',
        kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ ಯೋಜನೆ',
        ml: 'പ്രധാനമന്ത്രി കിസാൻ സമ്മാൻ നിധി യോജന',
        pa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਮਾਨ ਨਿਧੀ ਯੋਜਨਾ'
      };
      
      const example = languageExamples[language] || 'PM-KISAN Samman Nidhi Yojana';
      
      const response = await this.callAPI(`List 5 major Indian government schemes with these URLs:
- PM-KISAN: https://pmkisan.gov.in/
- Ayushman Bharat: https://pmjay.gov.in/
- PMAY: https://pmaymis.gov.in/
- MGNREGA: https://nrega.nic.in/
- PM Vishwakarma: https://pmvishwakarma.gov.in/

Example translation: "PM-KISAN Samman Nidhi Yojana" = "${example}"

Translate EVERYTHING to match this example's language and script.
Keep URLs unchanged.`, systemPrompt, language);
      console.log('AI Response:', response);
      
      const schemes = this.parseJSON(response);
      console.log('Parsed schemes:', schemes);
      
      if (Array.isArray(schemes) && schemes.length > 0) {
        return await SchemeTranslator.translateSchemes(schemes, language);
      }
    } catch (error) {
      console.error('Error in getPopularSchemes:', error);
    }
    
    // Real schemes with working URLs
    const fallbackSchemes = [
      {
        id: 'pmkisan2024',
        title: 'PM-KISAN Samman Nidhi Yojana',
        description: 'Direct income support of ₹6,000 per year to farmers',
        amount: '₹6,000 per year',
        category: 'Agriculture',
        level: 'Central',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        eligibilityUrl: 'https://pmkisan.gov.in/',
        applicationUrl: 'https://pmkisan.gov.in/',
        helplineNumber: '155261',
        requirements: ['Aadhaar card', 'Bank account', 'Land documents'],
        benefits: ['Direct cash transfer', 'No intermediaries'],
        applicationProcess: ['Visit PM-KISAN portal', 'Enter Aadhaar', 'Submit application'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'ayushman2024',
        title: 'Ayushman Bharat PM-JAY',
        description: 'Health insurance coverage of ₹5 lakh per family per year',
        amount: '₹5 lakh per family per year',
        category: 'Health',
        level: 'Central',
        ministry: 'Ministry of Health & Family Welfare',
        eligibilityUrl: 'https://pmjay.gov.in/',
        applicationUrl: 'https://pmjay.gov.in/',
        helplineNumber: '14555',
        requirements: ['SECC-2011 inclusion', 'Aadhaar card'],
        benefits: ['Cashless treatment', '1,900+ medical packages'],
        applicationProcess: ['Check eligibility', 'Visit CSC', 'Generate e-card'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'pmay2024',
        title: 'Pradhan Mantri Awas Yojana',
        description: 'Housing subsidy for economically weaker sections',
        amount: 'Up to ₹2.67 lakh subsidy',
        category: 'Housing',
        level: 'Central',
        ministry: 'Ministry of Housing & Urban Affairs',
        eligibilityUrl: 'https://pmaymis.gov.in/',
        applicationUrl: 'https://pmaymis.gov.in/',
        helplineNumber: '1800-11-6446',
        requirements: ['Income certificate', 'Property documents', 'Aadhaar card'],
        benefits: ['Interest subsidy', 'Direct assistance'],
        applicationProcess: ['Online application', 'Document upload', 'Verification'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'mgnrega2024',
        title: 'Mahatma Gandhi NREGA',
        description: 'Guaranteed 100 days of wage employment per rural household',
        amount: '₹200-300 per day',
        category: 'Employment',
        level: 'Central',
        ministry: 'Ministry of Rural Development',
        eligibilityUrl: 'https://nrega.nic.in/',
        applicationUrl: 'https://nrega.nic.in/',
        helplineNumber: '1800-345-22-44',
        requirements: ['Job card', 'Bank account', 'Aadhaar card'],
        benefits: ['Guaranteed employment', 'Daily wages'],
        applicationProcess: ['Apply for job card', 'Request work', 'Complete work'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'pmvishwakarma2024',
        title: 'PM Vishwakarma Scheme',
        description: 'Support for traditional artisans and craftspeople',
        amount: '₹10,000-₹3 lakh',
        category: 'Employment',
        level: 'Central',
        ministry: 'Ministry of Micro, Small & Medium Enterprises',
        eligibilityUrl: 'https://pmvishwakarma.gov.in/',
        applicationUrl: 'https://pmvishwakarma.gov.in/',
        helplineNumber: '1800-267-4999',
        requirements: ['Aadhaar card', 'Skill certificate', 'Bank account'],
        benefits: ['Skill training', 'Financial support', 'Market linkage'],
        applicationProcess: ['Register online', 'Skill assessment', 'Training', 'Financial support'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      }
    ];
    
    return await SchemeTranslator.translateSchemes(fallbackSchemes, language);
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
  
  // Check scheme status and updates
  static async checkSchemeStatus(schemeIds, language = 'en') {
    const systemPrompt = `Check current status and recent updates for these government schemes. Return status information for each scheme.`;
    
    const response = await this.callAPI(`Check status for schemes: ${schemeIds.join(', ')}`, systemPrompt, language);
    return this.parseJSON(response) || [];
  }
}