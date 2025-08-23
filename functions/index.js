const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const admin = require('firebase-admin');

admin.initializeApp();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Document Analysis Function
exports.analyzeDocument = onCall(async (request) => {
  try {
    const { text, type } = request.data;
    
    if (!text) {
      throw new HttpsError('invalid-argument', 'Document text is required');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
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

    const prompt = `${systemPrompt}\n\nExtract profile information from this document: "${text}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    // Clean and parse JSON
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/, '').replace(/```$/, '');
    }
    
    const profile = JSON.parse(cleanContent);
    
    // Log analytics
    await admin.firestore().collection('analytics').add({
      action: 'document_analyzed',
      userId: request.auth?.uid || 'anonymous',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      success: true
    });
    
    return { profile, success: true };
    
  } catch (error) {
    console.error('Document analysis error:', error);
    
    // Log error
    await admin.firestore().collection('analytics').add({
      action: 'document_analysis_error',
      userId: request.auth?.uid || 'anonymous',
      error: error.message,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    throw new HttpsError('internal', 'Failed to analyze document');
  }
});

// Scheme Discovery Function
exports.findSchemes = onCall(async (request) => {
  try {
    const { profile, popular = false, maxResults = 20 } = request.data;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
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

    let prompt;
    if (popular) {
      prompt = `${systemPrompt}\n\nFind ${maxResults} most popular Indian government schemes for general citizens. Return JSON array.`;
    } else {
      prompt = `${systemPrompt}\n\nUser Profile: ${JSON.stringify(profile)}. Find all eligible government schemes (max ${maxResults}).`;
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    // Clean and parse JSON
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/, '').replace(/```$/, '');
    }
    
    const schemes = JSON.parse(cleanContent);
    
    // Log analytics
    await admin.firestore().collection('analytics').add({
      action: 'schemes_found',
      userId: request.auth?.uid || 'anonymous',
      schemesCount: schemes.length,
      popular,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return { schemes: Array.isArray(schemes) ? schemes : [], success: true };
    
  } catch (error) {
    console.error('Scheme discovery error:', error);
    
    // Log error
    await admin.firestore().collection('analytics').add({
      action: 'scheme_discovery_error',
      userId: request.auth?.uid || 'anonymous',
      error: error.message,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    throw new HttpsError('internal', 'Failed to find schemes');
  }
});

// Eligibility Check Function
exports.checkEligibility = onCall(async (request) => {
  try {
    const { profile, schemeId } = request.data;
    
    if (!profile || !schemeId) {
      throw new HttpsError('invalid-argument', 'Profile and scheme ID are required');
    }
    
    // Get scheme details from Firestore
    const schemeDoc = await admin.firestore().collection('schemes').doc(schemeId).get();
    
    if (!schemeDoc.exists) {
      throw new HttpsError('not-found', 'Scheme not found');
    }
    
    const scheme = schemeDoc.data();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Check eligibility for this government scheme:
    
Scheme: ${JSON.stringify(scheme)}
User Profile: ${JSON.stringify(profile)}

Return JSON with:
{
  "isEligible": true/false,
  "eligibilityReason": "Detailed explanation",
  "missingRequirements": ["requirement1", "requirement2"],
  "score": 0-100
}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/, '').replace /```$/, '');
    }
    
    const eligibility = JSON.parse(cleanContent);
    
    // Log analytics
    await admin.firestore().collection('analytics').add({
      action: 'eligibility_checked',
      userId: request.auth?.uid || 'anonymous',
      schemeId,
      isEligible: eligibility.isEligible,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return { ...eligibility, success: true };
    
  } catch (error) {
    console.error('Eligibility check error:', error);
    throw new HttpsError('internal', 'Failed to check eligibility');
  }
});

// Analytics Function
exports.logAnalytics = onCall(async (request) => {
  try {
    const { action, metadata = {} } = request.data;
    
    await admin.firestore().collection('analytics').add({
      action,
      userId: request.auth?.uid || 'anonymous',
      metadata,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      userAgent: request.rawRequest?.headers?.['user-agent'] || 'unknown'
    });
    
    return { success: true };
    
  } catch (error) {
    console.error('Analytics logging error:', error);
    throw new HttpsError('internal', 'Failed to log analytics');
  }
});