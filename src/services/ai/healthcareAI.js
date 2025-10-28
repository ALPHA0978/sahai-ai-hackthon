import { BaseAI } from './baseAI.js';

export class HealthcareAI extends BaseAI {
  // Comprehensive symptom analysis
  static async analyzeSymptoms(symptoms, patientProfile = {}) {
    const systemPrompt = `You are a medical AI assistant. Analyze symptoms and provide preliminary assessment. IMPORTANT: This is for informational purposes only and not a substitute for professional medical advice. Return ONLY valid JSON:
{
  "assessment": {
    "primaryConcern": "main health concern identified",
    "severity": "Mild|Moderate|Severe",
    "confidence": "confidence level (0-100)",
    "description": "detailed assessment explanation"
  },
  "possibleConditions": [
    {
      "condition": "condition name",
      "probability": "likelihood percentage",
      "description": "brief explanation",
      "commonSymptoms": ["typical symptoms"]
    }
  ],
  "urgency": {
    "level": "Low|Medium|High|Emergency",
    "timeframe": "when to seek care",
    "reason": "why this urgency level"
  },
  "recommendations": {
    "immediate": ["immediate actions to take"],
    "lifestyle": ["lifestyle modifications"],
    "monitoring": ["symptoms to watch for"],
    "avoidance": ["things to avoid"]
  },
  "specialists": [
    {
      "type": "specialist type",
      "reason": "why this specialist",
      "priority": "High|Medium|Low"
    }
  ],
  "redFlags": ["warning signs requiring immediate attention"],
  "followUp": {
    "timeframe": "when to follow up",
    "conditions": ["conditions requiring follow-up"]
  },
  "disclaimer": "This is AI-generated information for educational purposes only. Always consult healthcare professionals for medical advice."
}`;

    const contextPrompt = `Patient Profile: Age: ${patientProfile.age || 'Not specified'}, Gender: ${patientProfile.gender || 'Not specified'}, Medical History: ${patientProfile.medicalHistory || 'None provided'}\n\nSymptoms: ${symptoms}\n\nProvide comprehensive analysis while emphasizing the need for professional medical consultation.`;

    const response = await this.callAPI(contextPrompt, systemPrompt);
    return this.parseJSON(response) || this.getDefaultAssessment();
  }

  // Treatment suggestions with safety focus
  static async suggestTreatment(condition, patientProfile = {}) {
    const systemPrompt = `You are a medical AI providing treatment information. Focus on evidence-based, safe recommendations. Return ONLY valid JSON:
[{
  "category": "Medical|Lifestyle|Home Remedy|Preventive",
  "treatment": "treatment name",
  "description": "detailed description",
  "effectiveness": "High|Medium|Low based on evidence",
  "safetyProfile": "Generally Safe|Caution Required|Professional Supervision Needed",
  "contraindications": ["when not to use this treatment"],
  "sideEffects": ["potential side effects"],
  "duration": "typical treatment duration",
  "cost": "approximate cost range",
  "availability": "how accessible this treatment is",
  "evidenceLevel": "Strong|Moderate|Limited|Anecdotal",
  "instructions": ["step-by-step instructions if applicable"],
  "monitoring": ["what to monitor during treatment"],
  "alternatives": ["alternative treatment options"]
}]`;

    const response = await this.callAPI(`Condition: ${condition}\nPatient Profile: ${JSON.stringify(patientProfile)}\n\nProvide safe, evidence-based treatment options with clear safety information.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultTreatments();
  }

  // Health risk assessment
  static async assessHealthRisk(healthData) {
    const systemPrompt = `Assess health risks based on provided data. Return ONLY valid JSON:
{
  "overallRisk": {
    "level": "Low|Moderate|High|Very High",
    "score": "risk score (0-100)",
    "summary": "overall risk assessment"
  },
  "riskFactors": [
    {
      "factor": "risk factor name",
      "impact": "High|Medium|Low",
      "modifiable": "true|false",
      "recommendations": ["specific recommendations"]
    }
  ],
  "preventiveActions": {
    "immediate": ["actions to take now"],
    "shortTerm": ["actions for next 3-6 months"],
    "longTerm": ["long-term health strategies"]
  },
  "screeningRecommendations": [
    {
      "test": "screening test name",
      "frequency": "how often",
      "reason": "why this test is recommended",
      "ageRange": "recommended age range"
    }
  ],
  "lifestyleModifications": {
    "diet": ["dietary recommendations"],
    "exercise": ["exercise recommendations"],
    "habits": ["habit changes to consider"]
  }
}`;

    const response = await this.callAPI(`Health Data: ${JSON.stringify(healthData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultRiskAssessment();
  }

  // Mental health support
  static async provideMentalHealthSupport(concerns, urgency = 'medium') {
    const systemPrompt = `Provide mental health support and resources. Be empathetic and supportive. Return ONLY valid JSON:
{
  "assessment": {
    "concernLevel": "Mild|Moderate|Severe|Crisis",
    "supportNeeded": "type of support recommended",
    "immediateRisk": "true|false"
  },
  "immediateSupport": {
    "copingStrategies": ["immediate coping techniques"],
    "breathingExercises": ["breathing techniques"],
    "groundingTechniques": ["grounding exercises"]
  },
  "resources": {
    "helplines": [
      {
        "name": "helpline name",
        "number": "phone number",
        "availability": "24/7 or specific hours",
        "specialization": "what they specialize in"
      }
    ],
    "onlineSupport": ["online resources and platforms"],
    "localServices": ["types of local services to look for"]
  },
  "professionalHelp": {
    "when": "when to seek professional help",
    "types": ["types of mental health professionals"],
    "preparation": ["how to prepare for first appointment"]
  },
  "selfCare": {
    "daily": ["daily self-care activities"],
    "weekly": ["weekly wellness activities"],
    "emergency": ["emergency self-care techniques"]
  },
  "warningSigns": ["signs that require immediate professional attention"],
  "encouragement": "supportive message"
}`;

    const response = await this.callAPI(`Mental Health Concerns: ${concerns}\nUrgency Level: ${urgency}\n\nProvide compassionate support and practical resources.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultMentalHealthSupport();
  }

  // Medication information
  static async getMedicationInfo(medicationName) {
    const systemPrompt = `Provide comprehensive medication information. Return ONLY valid JSON:
{
  "medication": {
    "name": "medication name",
    "genericName": "generic name if different",
    "class": "medication class",
    "mechanism": "how it works"
  },
  "uses": {
    "primary": ["primary uses"],
    "secondary": ["off-label or secondary uses"]
  },
  "dosage": {
    "typical": "typical dosage range",
    "factors": ["factors affecting dosage"],
    "administration": "how to take it"
  },
  "sideEffects": {
    "common": ["common side effects"],
    "serious": ["serious side effects"],
    "rare": ["rare but important side effects"]
  },
  "interactions": {
    "drugs": ["important drug interactions"],
    "food": ["food interactions"],
    "conditions": ["medical conditions that may be affected"]
  },
  "precautions": {
    "contraindications": ["when not to use"],
    "warnings": ["important warnings"],
    "monitoring": ["what to monitor while taking"]
  },
  "storage": "storage instructions",
  "cost": "approximate cost information",
  "alternatives": ["alternative medications"],
  "disclaimer": "Always consult healthcare provider before starting, stopping, or changing medications"
}`;

    const response = await this.callAPI(`Medication: ${medicationName}\n\nProvide comprehensive, accurate medication information with appropriate safety warnings.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultMedicationInfo();
  }

  // Emergency response guidance
  static async getEmergencyGuidance(emergency) {
    const systemPrompt = `Provide emergency medical guidance. Be clear and actionable. Return ONLY valid JSON:
{
  "emergency": "emergency type",
  "severity": "Life-threatening|Serious|Moderate",
  "immediateActions": {
    "step1": "first action to take",
    "step2": "second action",
    "step3": "third action",
    "continue": ["additional steps if needed"]
  },
  "whenToCall911": ["specific situations requiring emergency services"],
  "whatNotToDo": ["actions to avoid"],
  "supplies": ["supplies that might be helpful"],
  "positioning": "how to position the person if applicable",
  "monitoring": ["vital signs or symptoms to monitor"],
  "preparation": ["information to have ready for emergency responders"],
  "followUp": "what to do after immediate emergency is handled",
  "prevention": ["how to prevent this emergency in future"],
  "disclaimer": "This is emergency guidance only. Always call emergency services for serious medical emergencies."
}`;

    const response = await this.callAPI(`Emergency Situation: ${emergency}\n\nProvide clear, step-by-step emergency guidance prioritizing safety and professional medical care.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultEmergencyGuidance();
  }

  // Default fallback methods
  static getDefaultAssessment() {
    return {
      assessment: {
        primaryConcern: 'General health inquiry',
        severity: 'Mild',
        confidence: 50,
        description: 'Unable to provide detailed assessment. Please consult healthcare professional.'
      },
      urgency: {
        level: 'Medium',
        timeframe: 'Within a few days',
        reason: 'General health concern'
      },
      recommendations: {
        immediate: ['Consult healthcare professional'],
        lifestyle: ['Maintain healthy habits'],
        monitoring: ['Monitor symptoms'],
        avoidance: ['Avoid self-diagnosis']
      },
      specialists: [{
        type: 'General Physician',
        reason: 'Initial consultation',
        priority: 'High'
      }],
      disclaimer: 'This is AI-generated information for educational purposes only. Always consult healthcare professionals for medical advice.'
    };
  }

  static getDefaultTreatments() {
    return [{
      category: 'Medical',
      treatment: 'Professional Consultation',
      description: 'Consult with qualified healthcare provider for proper diagnosis and treatment',
      effectiveness: 'High',
      safetyProfile: 'Generally Safe',
      contraindications: ['None for consultation'],
      sideEffects: ['None for consultation'],
      duration: 'As recommended by healthcare provider',
      cost: 'Varies by location and provider',
      availability: 'Widely available',
      evidenceLevel: 'Strong',
      instructions: ['Schedule appointment', 'Prepare list of symptoms', 'Bring medical history'],
      monitoring: ['Follow healthcare provider guidance'],
      alternatives: ['Telemedicine consultation', 'Urgent care visit']
    }];
  }

  static getDefaultRiskAssessment() {
    return {
      overallRisk: {
        level: 'Moderate',
        score: 50,
        summary: 'General health assessment needed'
      },
      riskFactors: [{
        factor: 'Insufficient data',
        impact: 'Medium',
        modifiable: 'true',
        recommendations: ['Provide complete health information to healthcare provider']
      }],
      preventiveActions: {
        immediate: ['Schedule health checkup'],
        shortTerm: ['Maintain healthy lifestyle'],
        longTerm: ['Regular health monitoring']
      }
    };
  }

  static getDefaultMentalHealthSupport() {
    return {
      assessment: {
        concernLevel: 'Moderate',
        supportNeeded: 'Professional guidance recommended',
        immediateRisk: 'false'
      },
      immediateSupport: {
        copingStrategies: ['Deep breathing', 'Mindfulness', 'Reach out to trusted person'],
        breathingExercises: ['4-7-8 breathing technique'],
        groundingTechniques: ['5-4-3-2-1 sensory technique']
      },
      resources: {
        helplines: [{
          name: 'National Mental Health Helpline',
          number: '1800-599-0019',
          availability: '24/7',
          specialization: 'General mental health support'
        }]
      },
      encouragement: 'You are not alone. Help is available and things can get better.'
    };
  }

  static getDefaultMedicationInfo() {
    return {
      medication: {
        name: 'Information not available',
        genericName: 'Please consult healthcare provider',
        class: 'Unknown',
        mechanism: 'Consult healthcare provider for medication information'
      },
      disclaimer: 'Always consult healthcare provider before starting, stopping, or changing medications'
    };
  }

  static getDefaultEmergencyGuidance() {
    return {
      emergency: 'General Emergency',
      severity: 'Serious',
      immediateActions: {
        step1: 'Ensure scene safety',
        step2: 'Call emergency services if needed',
        step3: 'Provide basic first aid if trained'
      },
      whenToCall911: ['Life-threatening situations', 'Severe injuries', 'Unconsciousness'],
      disclaimer: 'This is emergency guidance only. Always call emergency services for serious medical emergencies.'
    };
  }
}