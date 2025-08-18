const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = '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';

export const fetchGovernmentSchemes = async (userProfile) => {
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
        model: 'google/gemini-flash-1.5',
        messages: [
          {
            role: 'system',
            content: `You are a government scheme eligibility assistant for India. Analyze user profile against scheme criteria (age limits, income limits, caste category, gender, marital status, location, occupation, land ownership, education). Return ONLY schemes as JSON array with: title, amount, category, state, description, eligibilityUrl, applicationUrl, isEligible (true/false), eligibilityReason (specific criteria met/not met). Check age ranges, income thresholds, caste requirements, gender-specific schemes, state-specific schemes. If no profile, return popular schemes with isEligible: null.`
          },
          {
            role: 'user',
            content: userProfile ? `User Profile: ${JSON.stringify(userProfile)}. Check eligibility against specific criteria: Age limits (18-35 for youth schemes, 60+ for senior schemes), Income limits (BPL, EWS <8L, LIG <12L), Caste category requirements, Gender-specific schemes, State/district specific schemes, Occupation-based schemes, Land ownership requirements, Education level requirements. Explain exact criteria met or failed. Return JSON array.` : `Find 5 popular Indian government schemes for general citizens. Return JSON array with isEligible: null since no user profile provided.`
          }
        ],
        temperature: 0.1,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    console.log('API Response:', content);
    
    // Clean the response to extract JSON
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/, '').replace(/```$/, '');
    }
    if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/```\n?/, '').replace(/```$/, '');
    }
    
    const schemes = JSON.parse(cleanContent);
    return Array.isArray(schemes) ? schemes : [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
  
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
        model: 'google/gemini-flash-1.5',
        messages: [
          {
            role: 'system',
            content: `You are a government scheme eligibility assistant for India. Analyze user profiles and return ONLY a JSON array of eligible schemes. Each scheme must have: title, amount, category, state, description, eligibilityUrl, applicationUrl. Focus on real, current Indian government schemes.`
          },
          {
            role: 'user',
            content: `User Profile: ${JSON.stringify(userProfile)}. Find eligible government schemes and return as JSON array only.`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response:', response.status, errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    if (error.message.includes('429')) {
      console.warn('Rate limit hit - waiting 2 seconds before retry');
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Single retry attempt
      try {
        const retryResponse = await fetch(OPENROUTER_API_URL, {
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
              {
                role: 'system',
                content: `You are a government scheme eligibility assistant for India. Analyze user profiles and return ONLY a JSON array of eligible schemes. Each scheme must have: title, amount, category, state, description, eligibilityUrl, applicationUrl. Focus on real, current Indian government schemes.`
              },
              {
                role: 'user',
                content: `User Profile: ${JSON.stringify(userProfile)}. Find eligible government schemes and return as JSON array only.`
              }
            ],
            temperature: 0.3,
            max_tokens: 2000
          })
        });
        
        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          const retryContent = retryData.choices[0]?.message?.content;
          try {
            return JSON.parse(retryContent);
          } catch {
            return [];
          }
        }
      } catch (retryError) {
        console.error('Retry failed:', retryError);
      }
    }
    return [];
  }
};

export const analyzeDocument = async (documentText) => {
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
        model: 'google/gemini-flash-1.5',
        messages: [
          {
            role: 'system',
            content: 'Extract user profile information from Indian documents or text. Return JSON with: name, age, location (state/district), occupation, annualIncome (in numbers), category (SC/ST/OBC/General/EWS), gender, maritalStatus, hasDisability, isMinority, isBPL, landOwnership, educationLevel, familySize. Extract exact values, use null if not found.'
          },
          {
            role: 'user',
            content: `Document text: ${documentText}. Extract profile information as JSON.`
          }
        ],
        temperature: 0.1,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  } catch (error) {
    console.error('Document analysis error:', error);
    return null;
  }
};