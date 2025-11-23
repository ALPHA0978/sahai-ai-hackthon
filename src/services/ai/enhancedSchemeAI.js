import { BaseAI } from './baseAI.js';
import { SchemeTranslator } from '../schemeTranslator.js';

class SchemeAI extends BaseAI {
  static async findSchemes(language = 'en') {
    try {
      const systemPrompt = `You are a government scheme researcher with access to myscheme.gov.in and official government websites. Search for REAL active Indian government schemes and find their ACTUAL official URLs.

IMPORTANT: 
1. Search myscheme.gov.in for scheme details
2. Find the REAL official government website for each scheme
3. Use ONLY actual .gov.in or official government URLs
4. Verify each URL exists and is active

Return ONLY valid JSON array with REAL URLs:
[{
  "id": "scheme_code_2024",
  "title": "Official Scheme Name",
  "description": "Detailed scheme description",
  "amount": "Benefit amount with currency",
  "category": "Agriculture|Health|Education|Employment|Housing|Women|Financial|Energy|Water|Sanitation",
  "level": "Central",
  "ministry": "Implementing ministry name",
  "eligibilityUrl": "REAL official government URL for eligibility check",
  "applicationUrl": "REAL official government URL for application",
  "helplineNumber": "Official helpline number",
  "requirements": ["Required documents list"],
  "benefits": ["List of benefits provided"],
  "applicationProcess": ["Step by step application process"],
  "lastUpdated": "2024-12-15",
  "schemeStatus": "Active"
}]`;

      const prompt = `Find 10 major active Indian government schemes for 2024. Include schemes from different categories: Agriculture (PM-KISAN), Health (Ayushman Bharat), Housing (PM Awas), Employment (MGNREGA), Education (NSP), Women (PM Matru Vandana), Financial (PM Jan Dhan), Energy (PM Ujjwala). Use only official .gov.in URLs.`;
      
      const response = await this.callAPI(prompt, systemPrompt, language);
      const schemes = this.parseJSON(response);
      
      return Array.isArray(schemes) ? schemes : null;
    } catch (error) {
      console.error('SchemeAI findSchemes error:', error);
      return null;
    }
  }

  static async searchSchemesByProfile(userProfile, language = 'en') {
    try {
      const systemPrompt = `You are an expert in Indian government schemes with access to myscheme.gov.in and official government websites. Find REAL schemes with their ACTUAL official URLs.

IMPORTANT:
1. Search myscheme.gov.in for active schemes
2. Find the REAL official government website for each scheme
3. Use ONLY actual .gov.in or official ministry URLs
4. Verify each URL exists and is currently active

Return ONLY valid JSON with REAL URLs:
[{
  "id": "scheme_id",
  "title": "Scheme Name",
  "description": "Description",
  "amount": "Benefit amount",
  "category": "Category",
  "level": "Central",
  "ministry": "Ministry",
  "eligibilityUrl": "REAL official government URL for eligibility",
  "applicationUrl": "REAL official government URL for application",
  "helplineNumber": "Number",
  "isEligible": "eligible|partially_eligible|not_eligible",
  "eligibilityScore": 85,
  "eligibilityReason": "Detailed eligibility explanation",
  "requirements": ["Documents needed"],
  "benefits": ["Benefits list"],
  "applicationProcess": ["Steps to apply"],
  "lastUpdated": "2024-12-15",
  "schemeStatus": "Active"
}]`;

      const profileSummary = `User Profile: Age: ${userProfile.age || 'Not provided'}, Gender: ${userProfile.gender || 'Not provided'}, State: ${userProfile.state || 'Not provided'}, Occupation: ${userProfile.occupation || 'Not provided'}, Income: ₹${userProfile.annualIncome || 'Not provided'}, Category: ${userProfile.category || 'Not provided'}, Land: ${userProfile.landOwnership || 'Not provided'}, Education: ${userProfile.educationLevel || 'Not provided'}`;
      
      const response = await this.callAPI(`Find government schemes matching this profile: ${profileSummary}. Calculate eligibility and provide detailed reasoning.`, systemPrompt, language);
      const schemes = this.parseJSON(response);
      
      return Array.isArray(schemes) ? schemes : null;
    } catch (error) {
      console.error('SchemeAI searchSchemesByProfile error:', error);
      return null;
    }
  }
}

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
    const systemPrompt = `You are an expert document analyzer for Indian government schemes. Extract comprehensive user profile from any document type (Aadhaar, PAN, Income Certificate, Ration Card, etc.). 

IMPORTANT: Always extract STATE information - it's CRITICAL for scheme eligibility. Look for state names, state codes, or infer from district/pincode.

Return ONLY valid JSON:
{
  "name": "full name from document",
  "age": "calculated age or from DOB",
  "dateOfBirth": "YYYY-MM-DD format",
  "location": {
    "state": "MUST extract full state name (e.g., Maharashtra, Uttar Pradesh, Karnataka)",
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
    // Use AI to dynamically find schemes based on user profile
    try {
      const aiSchemes = await SchemeAI.searchSchemesByProfile(userProfile, language);
      if (aiSchemes && aiSchemes.length > 0) {
        return aiSchemes;
      }
    } catch (error) {
      console.error('Dynamic scheme search failed:', error);
    }

    // Fallback to enhanced eligibility analysis
    const systemPrompt = `You are a government scheme expert with access to myscheme.gov.in and official government websites. Search for REAL active schemes with their ACTUAL official URLs.

IMPORTANT:
1. Search myscheme.gov.in for schemes matching user profile
2. Find the REAL official government website for each scheme
3. Use ONLY actual .gov.in or official ministry URLs
4. Verify each URL exists and is currently active

Return ONLY valid JSON with REAL URLs:
[{
  "id": "scheme_code_2024",
  "title": "Official Scheme Name",
  "description": "Detailed description",
  "amount": "Benefit amount",
  "category": "Agriculture|Health|Education|Employment|Housing|Women|Financial|Energy|Water",
  "level": "Central",
  "ministry": "Ministry name",
  "eligibilityUrl": "REAL official government URL for eligibility",
  "applicationUrl": "REAL official government URL for application",
  "helplineNumber": "Official number",
  "isEligible": "eligible|partially_eligible|not_eligible",
  "eligibilityScore": 85,
  "eligibilityReason": "Detailed eligibility explanation",
  "requirements": ["Required documents"],
  "benefits": ["Benefits list"],
  "applicationProcess": ["Application steps"],
  "lastUpdated": "2024-12-15",
  "schemeStatus": "Active"
}]`;

    const profileSummary = `Find schemes for: Age: ${userProfile.age || 'Not provided'}, Gender: ${userProfile.gender || 'Not provided'}, State: ${userProfile.state || userProfile.location?.state || 'Not provided'}, Occupation: ${userProfile.occupation || 'Not provided'}, Income: ₹${userProfile.annualIncome || 'Not provided'}, Category: ${userProfile.category || 'Not provided'}, Land: ${userProfile.landOwnership || 'Not provided'}, Education: ${userProfile.educationLevel || 'Not provided'}`;

    const response = await this.callAPI(profileSummary, systemPrompt, language);
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
    
    // Use AI to find schemes dynamically
    try {
      const aiSchemes = await SchemeAI.findSchemes(language);
      if (aiSchemes && aiSchemes.length > 0) {
        return await SchemeTranslator.translateSchemes(aiSchemes, language);
      }
    } catch (error) {
      console.error('SchemeAI failed, using fallback:', error);
    }
    
    // Fallback schemes if AI fails
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
      },
      {
        id: 'nsp2024',
        title: 'National Scholarship Portal',
        description: 'Scholarships for students from various categories',
        amount: '₹10,000-₹2 lakh per year',
        category: 'Education',
        level: 'Central',
        ministry: 'Ministry of Education',
        eligibilityUrl: 'https://scholarships.gov.in/',
        applicationUrl: 'https://scholarships.gov.in/',
        helplineNumber: '0120-6619540',
        requirements: ['Academic certificates', 'Income certificate', 'Caste certificate'],
        benefits: ['Financial assistance', 'Educational support'],
        applicationProcess: ['Register on NSP', 'Fill application', 'Upload documents', 'Submit'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'pmmatru2024',
        title: 'Pradhan Mantri Matru Vandana Yojana',
        description: 'Maternity benefit for pregnant and lactating mothers',
        amount: '₹5,000 in three installments',
        category: 'Women',
        level: 'Central',
        ministry: 'Ministry of Women & Child Development',
        eligibilityUrl: 'https://wcd.nic.in/',
        applicationUrl: 'https://wcd.nic.in/',
        helplineNumber: '104',
        requirements: ['Pregnancy certificate', 'Aadhaar card', 'Bank account'],
        benefits: ['Cash assistance', 'Nutritional support'],
        applicationProcess: ['Register at AWC', 'Medical checkup', 'Documentation', 'Payment'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'sukanya2024',
        title: 'Sukanya Samriddhi Yojana',
        description: 'Savings scheme for girl child education and marriage',
        amount: 'Up to ₹1.5 lakh per year',
        category: 'Women',
        level: 'Central',
        ministry: 'Ministry of Finance',
        eligibilityUrl: 'https://www.nsiindia.gov.in/',
        applicationUrl: 'https://www.nsiindia.gov.in/',
        helplineNumber: '1800-266-6868',
        requirements: ['Girl child birth certificate', 'Parent ID', 'Address proof'],
        benefits: ['Tax benefits', 'High interest rate', 'Compounding'],
        applicationProcess: ['Open account', 'Deposit annually', 'Maturity at 21'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'pmjdy2024',
        title: 'Pradhan Mantri Jan Dhan Yojana',
        description: 'Financial inclusion through bank accounts',
        amount: '₹2 lakh accident insurance',
        category: 'Financial',
        level: 'Central',
        ministry: 'Ministry of Finance',
        eligibilityUrl: 'https://www.pmjdy.gov.in/',
        applicationUrl: 'https://www.pmjdy.gov.in/',
        helplineNumber: '1800-11-0001',
        requirements: ['Identity proof', 'Address proof'],
        benefits: ['Zero balance account', 'RuPay debit card', 'Insurance'],
        applicationProcess: ['Visit bank', 'Fill form', 'Submit documents', 'Account opening'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'ujjwala2024',
        title: 'Pradhan Mantri Ujjwala Yojana',
        description: 'Free LPG connections to BPL families',
        amount: '₹1,600 per connection',
        category: 'Energy',
        level: 'Central',
        ministry: 'Ministry of Petroleum & Natural Gas',
        eligibilityUrl: 'https://www.pmujjwalayojana.com/',
        applicationUrl: 'https://www.pmujjwalayojana.com/',
        helplineNumber: '1906',
        requirements: ['BPL status', 'Adult woman member', 'No existing LPG connection'],
        benefits: ['Free LPG connection', 'Deposit-free cylinder', 'EMI facility'],
        applicationProcess: ['Apply at distributor', 'Document verification', 'Connection installation'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'jaljeevan2024',
        title: 'Jal Jeevan Mission',
        description: 'Piped water supply to every rural household',
        amount: 'Infrastructure development',
        category: 'Water',
        level: 'Central',
        ministry: 'Ministry of Jal Shakti',
        eligibilityUrl: 'https://jaljeevanmission.gov.in/',
        applicationUrl: 'https://jaljeevanmission.gov.in/',
        helplineNumber: '1800-11-0016',
        requirements: ['Rural household', 'Village water committee'],
        benefits: ['Tap water connection', 'Quality water supply'],
        applicationProcess: ['Village planning', 'Infrastructure development', 'Connection provision'],
        lastUpdated: '2024-12-15',
        schemeStatus: 'Active'
      },
      {
        id: 'swachh2024',
        title: 'Swachh Bharat Mission',
        description: 'Sanitation and cleanliness program',
        amount: '₹12,000 toilet construction',
        category: 'Sanitation',
        level: 'Central',
        ministry: 'Ministry of Jal Shakti',
        eligibilityUrl: 'https://swachhbharatmission.gov.in/',
        applicationUrl: 'https://swachhbharatmission.gov.in/',
        helplineNumber: '1800-11-0001',
        requirements: ['No existing toilet', 'Rural/urban household'],
        benefits: ['Toilet construction', 'Sanitation facilities'],
        applicationProcess: ['Apply online/offline', 'Verification', 'Construction', 'Completion certificate'],
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
      let missingRequirements = [];
      
      if (userProfile) {
        // Base eligibility checks
        if (userProfile.aadhaarCard) score += 10;
        if (userProfile.bankAccount) score += 10;
        if (userProfile.location?.state) score += 15; // State is important for eligibility
        
        // Age-based eligibility
        if (userProfile.age) {
          if (userProfile.age >= 18 && userProfile.age <= 60) score += 10;
        } else {
          missingRequirements.push('Age verification');
        }
        
        // State-specific schemes
        if (!userProfile.location?.state) {
          missingRequirements.push('State information');
          score -= 20; // Penalize missing state info
        }
        
        // Agriculture schemes
        if (scheme.category === 'Agriculture') {
          if (userProfile.landOwnership === 'Yes') score += 40;
          if (userProfile.occupation?.toLowerCase().includes('farm')) score += 30;
          if (userProfile.annualIncome && userProfile.annualIncome < 200000) score += 20;
        }
        
        // Health schemes (like Ayushman Bharat)
        if (scheme.category === 'Health') {
          if (userProfile.isBPL || (userProfile.annualIncome && userProfile.annualIncome < 500000)) {
            score += 50;
          } else if (!userProfile.annualIncome) {
            missingRequirements.push('Income certificate');
          }
          if (userProfile.category && userProfile.category !== 'General') score += 20;
          if (userProfile.familySize && userProfile.familySize > 4) score += 10;
        }
        
        // Housing schemes
        if (scheme.category === 'Housing') {
          if (userProfile.housingType === 'Kutcha' || userProfile.housingType === 'Homeless') score += 60;
          if (userProfile.annualIncome && userProfile.annualIncome < 1800000) score += 30;
          if (userProfile.gender === 'Female') score += 10;
        }
        
        // Employment schemes
        if (scheme.category === 'Employment') {
          if (userProfile.employmentStatus === 'Unemployed') score += 40;
          if (userProfile.educationLevel) score += 15;
          if (userProfile.age && userProfile.age >= 18 && userProfile.age <= 35) score += 20;
        }
        
        // Determine eligibility based on score
        if (score >= 70) {
          eligible = 'eligible';
          reason = `You meet most eligibility criteria for this scheme. ${userProfile.location?.state ? `Available in ${userProfile.location.state}.` : 'State verification needed.'}`;
        } else if (score >= 40) {
          eligible = 'partially_eligible';
          reason = `You meet some criteria. ${missingRequirements.length > 0 ? `Missing: ${missingRequirements.join(', ')}.` : 'Additional documentation may be required.'}`;
        } else {
          eligible = 'not_eligible';
          reason = `Current profile does not match scheme requirements. ${missingRequirements.length > 0 ? `Missing: ${missingRequirements.join(', ')}.` : ''}`;
        }
      }
      
      enhanced.eligibilityScore = Math.max(0, Math.min(score, 100));
      enhanced.isEligible = eligible;
      enhanced.eligibilityReason = reason;
      enhanced.missingRequirements = missingRequirements;
      
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