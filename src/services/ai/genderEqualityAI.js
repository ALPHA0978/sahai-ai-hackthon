import { BaseAI } from './baseAI.js';

export class GenderEqualityAI extends BaseAI {
  // Bias Detection System
  static async detectBias(text, type = 'job_description') {
    const systemPrompt = `You are a gender bias detection expert. Analyze text for gender bias and return ONLY valid JSON:
{
  "biasScore": 85,
  "biasLevel": "high|medium|low|none",
  "biasedPhrases": [
    {
      "phrase": "biased text",
      "type": "gender_specific|exclusionary|stereotypical",
      "severity": "high|medium|low",
      "suggestion": "gender-neutral alternative"
    }
  ],
  "recommendations": ["specific improvements"],
  "genderNeutralVersion": "rewritten text",
  "inclusivityScore": 75,
  "analysis": {
    "languagePatterns": ["identified patterns"],
    "implicitBias": ["subtle biases found"],
    "accessibility": "accessibility assessment"
  }
}`;

    const response = await this.callAPI(`Analyze this ${type} for gender bias: "${text}"`, systemPrompt);
    return this.parseJSON(response);
  }

  // Anonymous Reporting System
  static async processReport(reportData) {
    const systemPrompt = `You are a harassment report analyzer. Process reports safely and return ONLY valid JSON:
{
  "reportId": "unique_id",
  "urgencyLevel": "critical|high|medium|low",
  "category": "harassment|discrimination|bias|safety|other",
  "sentimentScore": -0.8,
  "riskAssessment": {
    "immediateRisk": true,
    "escalationNeeded": true,
    "supportRequired": ["legal", "counseling", "medical"]
  },
  "recommendations": {
    "immediateActions": ["urgent steps"],
    "supportResources": ["available help"],
    "legalOptions": ["legal pathways"],
    "safetyMeasures": ["protection steps"]
  },
  "anonymityLevel": "full|partial|identified",
  "followUpNeeded": true,
  "resourcesProvided": ["helpline numbers", "NGO contacts"]
}`;

    const response = await this.callAPI(`Process anonymous report: Type: ${reportData.type}, Description: ${reportData.description}, Location: ${reportData.location}, Urgency: ${reportData.urgency}`, systemPrompt);
    return this.parseJSON(response);
  }

  // AI Mentor & Career Guidance
  static async generateCareerGuidance(userProfile) {
    const systemPrompt = `You are a career mentor for women. Provide personalized guidance and return ONLY valid JSON:
{
  "careerPath": {
    "currentLevel": "entry|mid|senior|executive",
    "recommendedRoles": ["specific job titles"],
    "industryOpportunities": ["growing sectors"],
    "skillGaps": ["skills to develop"],
    "timelineToGoals": "6-12 months"
  },
  "skillDevelopment": [
    {
      "skill": "skill name",
      "priority": "high|medium|low",
      "learningPath": ["step by step"],
      "resources": ["courses, certifications"],
      "timeEstimate": "duration"
    }
  ],
  "mentorshipNeeds": ["areas needing guidance"],
  "networkingOpportunities": ["events, communities"],
  "barrierAnalysis": {
    "identifiedBarriers": ["obstacles"],
    "solutions": ["ways to overcome"],
    "supportSystems": ["available help"]
  },
  "empowermentPlan": {
    "shortTerm": ["3-6 month goals"],
    "longTerm": ["1-2 year vision"],
    "milestones": ["progress markers"]
  }
}`;

    const response = await this.callAPI(`Career guidance for: Gender: ${userProfile.gender}, Age: ${userProfile.age}, Education: ${userProfile.education}, Experience: ${userProfile.experience}, Goals: ${userProfile.goals}, Challenges: ${userProfile.challenges}`, systemPrompt);
    return this.parseJSON(response);
  }

  // Equal Pay Analyzer
  static async analyzePayEquity(salaryData) {
    const systemPrompt = `You are a pay equity analyst. Analyze salary data and return ONLY valid JSON:
{
  "payGapAnalysis": {
    "overallGap": "15.2%",
    "genderPayGap": {
      "male": "₹75,000",
      "female": "₹63,600",
      "nonBinary": "₹68,000"
    },
    "departmentGaps": [
      {
        "department": "Engineering",
        "gap": "12%",
        "severity": "medium"
      }
    ]
  },
  "recommendations": {
    "immediate": ["urgent corrections needed"],
    "policy": ["policy changes required"],
    "transparency": ["disclosure improvements"],
    "monitoring": ["ongoing tracking needs"]
  },
  "complianceStatus": {
    "legalCompliance": "compliant|non_compliant|unclear",
    "industryBenchmark": "above|at|below average",
    "improvementAreas": ["specific areas"]
  },
  "actionPlan": {
    "phase1": ["immediate actions"],
    "phase2": ["medium-term changes"],
    "phase3": ["long-term improvements"]
  }
}`;

    const response = await this.callAPI(`Analyze pay equity: ${JSON.stringify(salaryData)}`, systemPrompt);
    return this.parseJSON(response);
  }

  // Awareness & Education Content
  static async generateEducationalContent(topic, audience, language = 'english') {
    const systemPrompt = `You are an education content creator for women's empowerment. Generate content and return ONLY valid JSON:
{
  "content": {
    "title": "engaging title",
    "summary": "brief overview",
    "keyPoints": ["main learning points"],
    "detailedContent": "comprehensive content",
    "actionItems": ["practical steps"]
  },
  "multimedia": {
    "videoScript": "script for video content",
    "infographicData": ["key statistics"],
    "interactiveElements": ["quizzes, polls"]
  },
  "accessibility": {
    "readingLevel": "grade level",
    "visualAids": ["image descriptions"],
    "audioDescription": "for visually impaired"
  },
  "culturalAdaptation": {
    "localContext": "cultural considerations",
    "examples": ["relevant local examples"],
    "sensitivities": ["cultural sensitivities"]
  },
  "engagement": {
    "discussionQuestions": ["conversation starters"],
    "communityActions": ["group activities"],
    "shareableContent": ["social media ready"]
  }
}`;

    const response = await this.callAPI(`Create educational content about ${topic} for ${audience} in ${language}. Focus on women's rights, empowerment, and practical guidance.`, systemPrompt);
    return this.parseJSON(response);
  }

  // Safety & Security Assessment
  static async assessSafety(locationData, userProfile) {
    const systemPrompt = `You are a safety assessment expert. Analyze safety conditions and return ONLY valid JSON:
{
  "safetyScore": 75,
  "riskLevel": "low|medium|high|critical",
  "safetyFactors": {
    "physical": "physical safety assessment",
    "digital": "online safety status",
    "workplace": "work environment safety",
    "community": "community safety level"
  },
  "recommendations": {
    "immediate": ["urgent safety measures"],
    "preventive": ["prevention strategies"],
    "emergency": ["emergency protocols"],
    "resources": ["safety resources available"]
  },
  "supportNetwork": {
    "localNGOs": ["nearby organizations"],
    "helplines": ["emergency numbers"],
    "legalAid": ["legal support options"],
    "medicalSupport": ["healthcare resources"]
  },
  "empowermentTools": {
    "selfDefense": ["training opportunities"],
    "legalRights": ["know your rights"],
    "digitalSafety": ["online protection"],
    "financialSecurity": ["economic empowerment"]
  }
}`;

    const response = await this.callAPI(`Assess safety for: Location: ${locationData.location}, Environment: ${locationData.environment}, User: ${JSON.stringify(userProfile)}`, systemPrompt);
    return this.parseJSON(response);
  }

  // Workplace Equality Audit
  static async auditWorkplaceEquality(organizationData) {
    const systemPrompt = `You are a workplace equality auditor. Analyze organization and return ONLY valid JSON:
{
  "equalityScore": 68,
  "auditResults": {
    "hiring": {
      "score": 75,
      "issues": ["identified problems"],
      "recommendations": ["improvements needed"]
    },
    "promotion": {
      "score": 60,
      "genderDistribution": "leadership gender breakdown",
      "barriers": ["promotion obstacles"]
    },
    "compensation": {
      "score": 55,
      "payGaps": ["salary disparities"],
      "benefits": ["benefit equality"]
    },
    "culture": {
      "score": 70,
      "inclusivity": "culture assessment",
      "policies": ["policy effectiveness"]
    }
  },
  "improvementPlan": {
    "priority1": ["critical changes"],
    "priority2": ["important improvements"],
    "priority3": ["nice-to-have enhancements"]
  },
  "benchmarking": {
    "industryComparison": "vs industry average",
    "bestPractices": ["leading practices to adopt"],
    "competitorAnalysis": "market position"
  },
  "compliance": {
    "legalRequirements": ["legal compliance status"],
    "certifications": ["available certifications"],
    "reporting": ["transparency requirements"]
  }
}`;

    const response = await this.callAPI(`Audit workplace equality: ${JSON.stringify(organizationData)}`, systemPrompt);
    return this.parseJSON(response);
  }
}