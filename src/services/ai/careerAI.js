import { BaseAI } from './baseAI.js';

export class CareerAI extends BaseAI {

  // Comprehensive skill gap analysis
  static async analyzeSkillGaps(jobProfile) {
    const systemPrompt = `You are an expert career counselor and industry analyst. Analyze skill gaps for career advancement. Return ONLY valid JSON:
{
  "analysis": {
    "currentLevel": "Junior|Mid-level|Senior|Executive",
    "targetLevel": "desired career level",
    "industryTrends": ["current industry trends affecting skills"],
    "marketDemand": "High|Medium|Low for target role",
    "competitiveAdvantage": "what makes candidate unique"
  },
  "skillGaps": [
    {
      "skill": "specific skill name",
      "category": "Technical|Soft|Leadership|Industry-specific",
      "currentLevel": "Beginner|Intermediate|Advanced|Expert",
      "requiredLevel": "level needed for target role",
      "priority": "Critical|High|Medium|Low",
      "marketValue": "how valuable this skill is in job market",
      "description": "detailed explanation of skill importance",
      "impact": "how this gap affects career prospects",
      "learningPath": {
        "timeframe": "estimated time to acquire",
        "difficulty": "Easy|Medium|Hard",
        "methods": ["online courses", "bootcamps", "certifications", "practice projects"],
        "resources": [
          {
            "type": "Course|Certification|Book|Platform",
            "name": "resource name",
            "provider": "provider name",
            "cost": "free|paid|cost range",
            "duration": "time commitment",
            "rating": "quality rating if known"
          }
        ],
        "practiceProjects": ["hands-on projects to build this skill"],
        "milestones": ["progress markers to track learning"]
      },
      "alternatives": ["alternative skills that could substitute"],
      "industryRelevance": "how relevant in target industry"
    }
  ],
  "strengthsToLeverage": [
    {
      "strength": "existing strength",
      "howToLeverage": "ways to use this strength",
      "marketValue": "value in job market",
      "developmentOpportunities": ["ways to further develop"]
    }
  ],
  "careerPathways": [
    {
      "pathway": "career progression route",
      "timeline": "expected timeframe",
      "keyMilestones": ["important career milestones"],
      "skillRequirements": ["skills needed for this path"],
      "challenges": ["potential obstacles"],
      "opportunities": ["growth opportunities"]
    }
  ],
  "actionPlan": {
    "immediate": ["actions to take in next 30 days"],
    "shortTerm": ["goals for next 3-6 months"],
    "mediumTerm": ["objectives for next 6-12 months"],
    "longTerm": ["vision for next 2-3 years"]
  },
  "budgetConsiderations": {
    "totalEstimatedCost": "estimated investment needed",
    "prioritizedSpending": ["where to invest first"],
    "freeResources": ["no-cost learning options"],
    "roiExpectation": "expected return on investment"
  }
}`;

    const prompt = `Career Profile Analysis:
- Current Skills: ${jobProfile.skills}
- Experience Level: ${jobProfile.experience}
- Target Industry: ${jobProfile.industry}
- Target Role: ${jobProfile.targetRole || 'Not specified'}
- Current Role: ${jobProfile.currentRole || 'Not specified'}
- Education: ${jobProfile.education || 'Not specified'}
- Career Goals: ${jobProfile.goals || 'Not specified'}

Provide comprehensive skill gap analysis with actionable development plan.`;
    
    const response = await this.callAPI(prompt, systemPrompt);
    return this.parseJSON(response) || this.getDefaultSkillGaps();
  }

  // Advanced resume optimization
  static async generateResumeTips(jobProfile, targetJob = null) {
    const systemPrompt = `You are an expert resume writer and ATS specialist. Generate comprehensive resume improvement recommendations. Return ONLY valid JSON:
{
  "overallAssessment": {
    "currentStrength": "Strong|Good|Needs Improvement",
    "atsCompatibility": "High|Medium|Low",
    "marketReadiness": "Ready|Needs Work|Major Revision Needed",
    "uniqueValueProposition": "what makes this candidate stand out"
  },
  "structureAndFormat": [
    {
      "section": "resume section name",
      "currentStatus": "assessment of current state",
      "recommendation": "specific improvement recommendation",
      "priority": "High|Medium|Low",
      "examples": ["specific examples or templates"]
    }
  ],
  "contentOptimization": [
    {
      "area": "content area",
      "issue": "identified problem",
      "solution": "recommended solution",
      "impact": "expected improvement",
      "examples": ["before/after examples"]
    }
  ],
  "keywordOptimization": {
    "missingKeywords": ["important keywords to add"],
    "industryTerms": ["industry-specific terminology"],
    "skillKeywords": ["skill-related keywords"],
    "actionVerbs": ["powerful action verbs to use"],
    "atsOptimization": ["ATS-friendly formatting tips"]
  },
  "quantificationOpportunities": [
    {
      "achievement": "achievement to quantify",
      "currentDescription": "how it's currently described",
      "improvedDescription": "quantified version",
      "impactMetrics": ["types of metrics to include"]
    }
  ],
  "industrySpecificTips": [
    {
      "tip": "industry-specific recommendation",
      "reasoning": "why this matters in the industry",
      "implementation": "how to implement this tip"
    }
  ],
  "commonMistakes": [
    {
      "mistake": "common error identified",
      "whyProblematic": "why this hurts the resume",
      "correction": "how to fix it"
    }
  ],
  "tailoringGuidance": {
    "jobDescriptionAnalysis": ["how to analyze job descriptions"],
    "customizationTips": ["ways to tailor for specific roles"],
    "coverLetterAlignment": ["how to align cover letter"]
  },
  "nextSteps": {
    "immediate": ["urgent changes to make"],
    "thisWeek": ["improvements to complete this week"],
    "ongoing": ["continuous improvement practices"]
  }
}`;

    const response = await this.callAPI(`Job Profile: ${JSON.stringify(jobProfile)}\nTarget Job: ${targetJob || 'General improvement'}\n\nProvide comprehensive resume optimization recommendations.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultResumeTips();
  }

  // Comprehensive interview preparation
  static async generateInterviewQuestions(jobTitle, skills, companyInfo = null) {
    const systemPrompt = `You are an expert interview coach and hiring manager. Generate comprehensive interview preparation guide. Return ONLY valid JSON:
{
  "interviewTypes": [
    {
      "type": "Phone|Video|In-person|Panel|Technical",
      "duration": "typical duration",
      "focus": "what this interview focuses on",
      "preparation": ["specific preparation tips"]
    }
  ],
  "questionCategories": {
    "behavioral": [
      {
        "question": "behavioral interview question",
        "intent": "what interviewer wants to learn",
        "starMethod": {
          "situation": "example situation to describe",
          "task": "task you were responsible for",
          "action": "actions you took",
          "result": "results you achieved"
        },
        "commonMistakes": ["mistakes to avoid"],
        "followUpQuestions": ["likely follow-up questions"]
      }
    ],
    "technical": [
      {
        "question": "technical question",
        "difficulty": "Easy|Medium|Hard",
        "concepts": ["key concepts being tested"],
        "approach": "recommended approach to answer",
        "codeExample": "code example if applicable",
        "explanation": "how to explain your thinking"
      }
    ],
    "situational": [
      {
        "question": "situational question",
        "scenario": "scenario being presented",
        "keyPoints": ["important points to address"],
        "framework": "framework for structuring answer",
        "redFlags": ["answers to avoid"]
      }
    ],
    "companySpecific": [
      {
        "question": "company-specific question",
        "researchNeeded": ["what to research beforehand"],
        "answerStrategy": "strategy for answering",
        "connectionPoints": ["how to connect to your experience"]
      }
    ]
  },
  "questionsToAsk": {
    "aboutRole": ["questions about the specific role"],
    "aboutTeam": ["questions about team and culture"],
    "aboutCompany": ["questions about company direction"],
    "aboutGrowth": ["questions about career development"]
  },
  "preparationChecklist": {
    "research": ["research tasks to complete"],
    "practice": ["practice activities"],
    "materials": ["materials to prepare"],
    "logistics": ["logistical preparations"]
  },
  "bodyLanguageAndPresence": {
    "virtualInterviews": ["tips for video interviews"],
    "inPersonInterviews": ["tips for in-person meetings"],
    "commonMistakes": ["body language mistakes to avoid"],
    "confidenceBuilders": ["ways to project confidence"]
  },
  "salaryNegotiation": {
    "researchTips": ["how to research salary ranges"],
    "negotiationStrategy": ["negotiation approaches"],
    "beyondSalary": ["other benefits to consider"],
    "timingAdvice": ["when and how to bring up compensation"]
  },
  "followUp": {
    "thankYouNotes": ["thank you note best practices"],
    "timeline": "typical follow-up timeline",
    "redFlags": ["signs the interview didn't go well"],
    "nextSteps": ["what to do while waiting for response"]
  }
}`;

    const response = await this.callAPI(`Job Title: ${jobTitle}\nRequired Skills: ${skills}\nCompany Info: ${companyInfo || 'General preparation'}\n\nGenerate comprehensive interview preparation guide.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultQuestions();
  }

  // Job market analysis
  static async analyzeJobMarket(industry, location, role) {
    const systemPrompt = `Analyze job market conditions and trends. Return ONLY valid JSON:
{
  "marketOverview": {
    "demandLevel": "High|Medium|Low",
    "competitionLevel": "High|Medium|Low",
    "growthTrend": "Growing|Stable|Declining",
    "marketMaturity": "Emerging|Growing|Mature|Declining"
  },
  "salaryInsights": {
    "averageSalary": "typical salary range",
    "entryLevel": "entry-level salary range",
    "experienced": "experienced professional range",
    "topPercentile": "top 10% salary range",
    "factors": ["factors affecting salary"]
  },
  "skillDemand": [
    {
      "skill": "in-demand skill",
      "demandLevel": "Very High|High|Medium|Low",
      "salaryImpact": "how much this skill affects salary",
      "futureOutlook": "expected future demand"
    }
  ],
  "industryTrends": [
    {
      "trend": "industry trend",
      "impact": "impact on job market",
      "timeline": "when this trend is expected",
      "preparation": ["how to prepare for this trend"]
    }
  ],
  "opportunities": {
    "emergingRoles": ["new roles being created"],
    "growthAreas": ["areas with high growth potential"],
    "nichesOpportunities": ["specialized opportunities"],
    "remoteOpportunities": "availability of remote work"
  },
  "challenges": {
    "commonBarriers": ["typical barriers to entry"],
    "competitionFactors": ["what makes competition tough"],
    "skillShortages": ["skills in short supply"],
    "marketSaturation": ["oversaturated areas"]
  },
  "recommendations": {
    "positioning": ["how to position yourself"],
    "differentiation": ["ways to stand out"],
    "networking": ["networking strategies"],
    "timing": ["best times to job search"]
  }
}`;

    const response = await this.callAPI(`Industry: ${industry}\nLocation: ${location}\nRole: ${role}\n\nAnalyze current job market conditions and provide strategic insights.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultMarketAnalysis();
  }

  // Career transition guidance
  static async planCareerTransition(currentProfile, targetCareer) {
    const systemPrompt = `Provide comprehensive career transition planning. Return ONLY valid JSON:
{
  "transitionAssessment": {
    "feasibility": "High|Medium|Low",
    "timeframe": "estimated transition time",
    "difficulty": "Easy|Moderate|Challenging|Very Difficult",
    "investmentRequired": "financial investment needed",
    "riskLevel": "Low|Medium|High"
  },
  "transferableSkills": [
    {
      "skill": "skill from current career",
      "relevance": "how relevant to target career",
      "positioning": "how to position this skill",
      "examples": ["examples of application"]
    }
  ],
  "skillGapsToAddress": [
    {
      "skill": "skill needed for target career",
      "priority": "Critical|High|Medium|Low",
      "acquisitionMethod": ["ways to acquire this skill"],
      "timeframe": "time needed to develop",
      "cost": "estimated cost to acquire"
    }
  ],
  "transitionStrategy": {
    "approach": "Direct|Gradual|Lateral|Bridge Role",
    "phases": [
      {
        "phase": "transition phase name",
        "duration": "phase duration",
        "objectives": ["phase objectives"],
        "activities": ["key activities"],
        "milestones": ["success markers"]
      }
    ]
  },
  "bridgeOpportunities": [
    {
      "opportunity": "bridge role or project",
      "description": "what this involves",
      "benefits": ["how this helps transition"],
      "howToFind": ["where to find these opportunities"]
    }
  ],
  "networkingStrategy": {
    "targetContacts": ["types of people to connect with"],
    "platforms": ["networking platforms to use"],
    "events": ["events to attend"],
    "approach": ["networking approaches"]
  },
  "financialPlanning": {
    "incomeConsiderations": ["income changes to expect"],
    "budgetingTips": ["financial planning advice"],
    "fundingSources": ["ways to fund the transition"],
    "timeline": "financial timeline considerations"
  },
  "riskMitigation": [
    {
      "risk": "potential risk",
      "likelihood": "High|Medium|Low",
      "impact": "High|Medium|Low",
      "mitigation": ["ways to reduce this risk"]
    }
  ]
}`;

    const response = await this.callAPI(`Current Profile: ${JSON.stringify(currentProfile)}\nTarget Career: ${targetCareer}\n\nCreate comprehensive career transition plan.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultTransitionPlan();
  }

  // Default fallback methods
  static getDefaultSkillGaps() {
    return {
      analysis: {
        currentLevel: 'Mid-level',
        targetLevel: 'Senior',
        marketDemand: 'High',
        competitiveAdvantage: 'Strong foundation with growth potential'
      },
      skillGaps: [{
        skill: 'Cloud Computing',
        category: 'Technical',
        currentLevel: 'Beginner',
        requiredLevel: 'Intermediate',
        priority: 'High',
        description: 'Essential skill for modern development and deployment',
        learningPath: {
          timeframe: '3-6 months',
          difficulty: 'Medium',
          methods: ['Online courses', 'Hands-on projects', 'Certifications'],
          resources: [{
            type: 'Course',
            name: 'AWS Cloud Practitioner',
            provider: 'AWS',
            cost: 'Free',
            duration: '10-15 hours'
          }]
        }
      }],
      actionPlan: {
        immediate: ['Research cloud platforms', 'Start free tier account'],
        shortTerm: ['Complete foundational course', 'Build sample project'],
        longTerm: ['Pursue certification', 'Apply skills in work projects']
      }
    };
  }

  static getDefaultResumeTips() {
    return {
      overallAssessment: {
        currentStrength: 'Good',
        atsCompatibility: 'Medium',
        marketReadiness: 'Needs Work'
      },
      contentOptimization: [{
        area: 'Technical Skills',
        issue: 'Skills may not be prominently displayed',
        solution: 'Create dedicated technical skills section',
        impact: 'Improved ATS scanning and recruiter visibility',
        examples: ['Group by category', 'Include proficiency levels']
      }],
      keywordOptimization: {
        missingKeywords: ['Industry-specific terms', 'Technical skills', 'Soft skills'],
        actionVerbs: ['Developed', 'Implemented', 'Optimized', 'Led', 'Achieved']
      },
      nextSteps: {
        immediate: ['Update contact information', 'Add missing keywords'],
        thisWeek: ['Quantify achievements', 'Improve formatting'],
        ongoing: ['Tailor for each application', 'Keep updated with new skills']
      }
    };
  }

  static getDefaultQuestions() {
    return {
      questionCategories: {
        behavioral: [{
          question: 'Tell me about a time you overcame a significant challenge',
          intent: 'Assess problem-solving and resilience',
          starMethod: {
            situation: 'Describe the challenging situation',
            task: 'Explain your responsibility',
            action: 'Detail the actions you took',
            result: 'Share the positive outcome'
          },
          commonMistakes: ['Being too vague', 'Not showing personal contribution']
        }],
        technical: [{
          question: 'Explain your experience with [relevant technology]',
          difficulty: 'Medium',
          approach: 'Provide specific examples and demonstrate depth of knowledge',
          explanation: 'Walk through your thought process clearly'
        }]
      },
      questionsToAsk: {
        aboutRole: ['What does success look like in this role?'],
        aboutTeam: ['How does the team collaborate?'],
        aboutCompany: ['What are the company\'s main priorities this year?']
      },
      preparationChecklist: {
        research: ['Company background', 'Recent news', 'Team structure'],
        practice: ['Mock interviews', 'Technical questions', 'STAR method examples']
      }
    };
  }

  static getDefaultMarketAnalysis() {
    return {
      marketOverview: {
        demandLevel: 'Medium',
        competitionLevel: 'Medium',
        growthTrend: 'Stable'
      },
      salaryInsights: {
        averageSalary: 'Varies by location and experience',
        factors: ['Experience level', 'Location', 'Company size', 'Industry']
      },
      recommendations: {
        positioning: ['Highlight unique skills', 'Build strong portfolio'],
        networking: ['Join professional associations', 'Attend industry events']
      }
    };
  }

  static getDefaultTransitionPlan() {
    return {
      transitionAssessment: {
        feasibility: 'Medium',
        timeframe: '6-12 months',
        difficulty: 'Moderate',
        riskLevel: 'Medium'
      },
      transitionStrategy: {
        approach: 'Gradual',
        phases: [{
          phase: 'Preparation',
          duration: '2-3 months',
          objectives: ['Skill development', 'Network building'],
          activities: ['Take courses', 'Attend events', 'Update resume']
        }]
      },
      networkingStrategy: {
        targetContacts: ['Industry professionals', 'Recruiters', 'Mentors'],
        platforms: ['LinkedIn', 'Industry forums', 'Professional associations']
      }
    };
  }
}