import { BaseAI } from './baseAI.js';

export class EmpowermentAI extends BaseAI {
  static async analyzeEmpowermentNeeds(userData) {
    const systemPrompt = `You are an expert empowerment specialist with deep knowledge of gender equality, career development, and personal growth. Provide a comprehensive, personalized empowerment assessment. Return ONLY valid JSON:
{
  "empowermentScore": 75,
  "keyAreas": ["economic", "social", "digital", "legal", "professional", "personal"],
  "strengths": ["5-7 specific existing capabilities and advantages based on their profile"],
  "gaps": ["4-6 specific areas needing improvement with detailed explanations"],
  "opportunities": ["6-8 specific opportunities available in their location/field with actionable details"],
  "barriers": ["4-5 specific obstacles they face with solutions"],
  "recommendations": {
    "immediate": ["3-4 urgent, specific actions they can take this week"],
    "shortTerm": ["4-5 detailed 3-6 month goals with clear steps"],
    "longTerm": ["3-4 comprehensive 1-2 year vision points with milestones"]
  },
  "resources": ["6-8 specific support systems, organizations, websites available in their area"],
  "skillDevelopment": ["5-7 specific skills they need with learning paths"],
  "networkingOpportunities": ["4-6 specific networking events, groups, platforms for their field/location"],
  "mentorshipAreas": ["3-4 areas where they need mentorship"],
  "financialEmpowerment": ["3-4 financial strategies based on their income level"],
  "personalGrowth": ["4-5 personal development areas with specific actions"]
}`;

    const response = await this.callAPI(`Provide comprehensive empowerment analysis for: Gender: ${userData.gender}, Age: ${userData.age}, Location: ${userData.location}, Education: ${userData.education}, Occupation: ${userData.occupation}, Income: ₹${userData.income}, Challenges: "${userData.challenges}". Analyze gender-specific barriers, local opportunities in ${userData.location}, career development for ${userData.occupation}, financial empowerment strategies, networking opportunities, skill gaps, and personal growth areas. Provide detailed, actionable recommendations.`, systemPrompt);
    return this.parseJSON(response);
  }

  static async suggestEmpowermentPrograms(userProfile) {
    const systemPrompt = `You are an expert program specialist with extensive knowledge of empowerment programs, gender equality initiatives, and career development opportunities. Suggest 6-8 highly relevant, specific programs. Return ONLY valid JSON:
[{
  "programName": "specific, real program title highly relevant to their profile",
  "type": "skill|financial|legal|digital|entrepreneurship|leadership|mentorship|networking|certification",
  "description": "comprehensive program description with specific modules and outcomes",
  "eligibility": ["specific requirements and how they qualify"],
  "benefits": ["detailed, tangible benefits for their specific situation"],
  "duration": "realistic program length with schedule details",
  "cost": "free|₹amount with payment options",
  "provider": "credible organization or institution name",
  "applicationProcess": "step-by-step application guide",
  "successRate": "realistic percentage with context",
  "testimonials": "relevant success story or feedback",
  "relevanceScore": "high|medium|low with explanation",
  "locationAvailable": "specific availability details",
  "outcomes": ["specific career/personal outcomes"],
  "networking": "networking opportunities within program",
  "certification": "certifications or credentials earned",
  "followUp": "post-program support available"
}]`;

    const response = await this.callAPI(`Suggest 6-8 comprehensive empowerment programs for: Gender: ${userProfile.gender}, Age: ${userProfile.age}, Location: ${userProfile.location}, Education: ${userProfile.education}, Occupation: ${userProfile.occupation}, Income: ₹${userProfile.income}, Challenges: ${userProfile.challenges}. Include programs for: career advancement, skill development, leadership training, financial literacy, networking, mentorship, digital skills, entrepreneurship, and gender equality advocacy. Focus on programs available in ${userProfile.location} or online, suitable for their education level and income bracket.`, systemPrompt);
    return this.parseJSON(response);
  }

  static async createActionPlan(empowermentData) {
    const systemPrompt = `You are an action plan specialist. Return ONLY valid JSON:
{
  "goals": {
    "primary": "main empowerment goal",
    "secondary": ["supporting goals"]
  },
  "timeline": {
    "month1": ["specific actions"],
    "month3": ["milestone targets"],
    "month6": ["progress checkpoints"],
    "year1": ["long-term achievements"]
  },
  "resources": {
    "financial": ["funding sources"],
    "educational": ["learning resources"],
    "networking": ["community support"],
    "mentorship": ["guidance opportunities"]
  },
  "milestones": ["measurable progress indicators"],
  "riskMitigation": ["potential challenges and solutions"],
  "successMetrics": ["how to measure progress"]
}`;

    const response = await this.callAPI(`Create action plan for: ${JSON.stringify(empowermentData)}`, systemPrompt);
    return this.parseJSON(response);
  }

  static async analyzeSkillGaps(currentSkills, targetGoals) {
    const systemPrompt = `You are a comprehensive skill development expert with deep industry knowledge. Provide detailed skill gap analysis. Return ONLY valid JSON:
{
  "currentLevel": "beginner|intermediate|advanced with detailed assessment",
  "targetLevel": "required skill level with industry context",
  "overallGapScore": "percentage gap with explanation",
  "skillGaps": [
    {
      "skill": "specific skill name",
      "currentProficiency": "1-10 scale with description",
      "requiredProficiency": "1-10 scale with industry standard",
      "priority": "high|medium|low with justification",
      "learningPath": ["detailed step-by-step approach with milestones"],
      "resources": ["specific courses, books, platforms, mentors"],
      "timeEstimate": "realistic learning duration with practice time",
      "practiceProjects": ["hands-on projects to build this skill"],
      "industryDemand": "market demand and salary impact",
      "prerequisites": ["skills needed before learning this"]
    }
  ],
  "developmentPlan": {
    "phase1": ["foundational skills with specific actions"],
    "phase2": ["intermediate skills with real projects"],
    "phase3": ["advanced skills with specialization options"]
  },
  "certifications": ["industry-recognized certifications with providers and costs"],
  "practicalExperience": ["internships, projects, volunteer opportunities"],
  "networkingSkills": ["professional networking and communication skills needed"],
  "softSkills": ["leadership, communication, teamwork skills required"],
  "technicalSkills": ["specific technical competencies needed"],
  "careerProgression": ["how these skills advance career goals"]
}`;

    const response = await this.callAPI(`Provide comprehensive skill gap analysis between current skills: [${currentSkills}] and target goals: "${targetGoals}". Include technical skills, soft skills, industry-specific competencies, certifications needed, learning resources, practice projects, networking skills, and career progression pathways. Consider current market demands and future trends.`, systemPrompt);
    return this.parseJSON(response);
  }

  static async suggestMentorship(userProfile) {
    const systemPrompt = `You are an expert mentorship coordinator with extensive network knowledge. Provide comprehensive mentorship recommendations. Return ONLY valid JSON:
{
  "mentorshipNeeds": ["specific areas needing guidance with detailed explanations"],
  "mentorProfiles": [
    {
      "expertise": "specific mentor specialization area",
      "experience": "years and type of experience",
      "background": "detailed professional background and achievements",
      "mentorshipStyle": "specific guidance approach and methodology",
      "availability": "realistic time commitment and meeting frequency",
      "matchScore": "compatibility percentage with detailed reasoning",
      "industryFocus": "specific industry or field expertise",
      "communicationStyle": "preferred communication methods",
      "successStories": "examples of mentees they've helped",
      "specializations": ["specific areas of deep expertise"],
      "networkConnections": "industry connections they can provide access to"
    }
  ],
  "mentorshipPrograms": ["specific programs with application details and benefits"],
  "peerNetworks": ["peer support groups with meeting details and focus areas"],
  "communitySupport": ["local organizations and support systems with contact info"],
  "onlineResources": ["digital mentorship platforms with features and costs"],
  "professionalAssociations": ["industry associations offering mentorship"],
  "alumniNetworks": ["educational institution alumni networks"],
  "womenEmpowermentGroups": ["gender-specific support and mentorship groups"],
  "industrySpecificMentorship": ["field-specific mentorship opportunities"],
  "reverseMentorship": ["opportunities to mentor others and build leadership"]
}`;

    const response = await this.callAPI(`Provide comprehensive mentorship recommendations for: Gender: ${userProfile.gender}, Age: ${userProfile.age}, Location: ${userProfile.location}, Education: ${userProfile.education}, Occupation: ${userProfile.occupation}, Income: ₹${userProfile.income}, Challenges: "${userProfile.challenges}". Include career mentorship, industry-specific guidance, leadership development, networking mentorship, financial planning mentorship, and personal growth coaching. Consider their location for local opportunities and suggest online alternatives.`, systemPrompt);
    return this.parseJSON(response);
  }

  static async trackProgress(initialAssessment, currentStatus) {
    const systemPrompt = `You are a progress tracking specialist. Return ONLY valid JSON:
{
  "progressScore": 85,
  "improvementAreas": [
    {
      "area": "empowerment area",
      "initialScore": "starting point",
      "currentScore": "current level",
      "improvement": "percentage change",
      "trend": "improving|stable|declining"
    }
  ],
  "achievements": ["milestones reached"],
  "challenges": ["obstacles encountered"],
  "nextSteps": ["recommended actions"],
  "adjustments": ["plan modifications needed"],
  "motivation": "encouraging message",
  "celebration": ["successes to acknowledge"]
}`;

    const response = await this.callAPI(`Track progress from initial: ${JSON.stringify(initialAssessment)} to current: ${JSON.stringify(currentStatus)}`, systemPrompt);
    return this.parseJSON(response);
  }

  // Bias Detection System
  static async detectBias(text, type = 'job_description') {
    const systemPrompt = `You are a gender bias detection expert. Return ONLY valid JSON:
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
  "inclusivityScore": 75
}`;

    const response = await this.callAPI(`Analyze this ${type} for gender bias: "${text}"`, systemPrompt);
    return this.parseJSON(response);
  }

  // Anonymous Reporting System
  static async processReport(reportData) {
    const systemPrompt = `You are a harassment report analyzer. Return ONLY valid JSON:
{
  "reportId": "unique_id",
  "urgencyLevel": "critical|high|medium|low",
  "category": "harassment|discrimination|bias|safety|other",
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
  "resourcesProvided": ["helpline numbers", "NGO contacts"]
}`;

    const response = await this.callAPI(`Process report: Type: ${reportData.type}, Description: ${reportData.description}, Urgency: ${reportData.urgency}`, systemPrompt);
    return this.parseJSON(response);
  }

  // Equal Pay Analyzer
  static async analyzePayEquity(salaryData) {
    const systemPrompt = `You are a pay equity analyst. Return ONLY valid JSON:
{
  "payGapAnalysis": {
    "overallGap": "15.2%",
    "genderPayGap": {
      "male": "₹75,000",
      "female": "₹63,600"
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
    "transparency": ["disclosure improvements"]
  },
  "actionPlan": {
    "phase1": ["immediate actions"],
    "phase2": ["medium-term changes"],
    "phase3": ["long-term improvements"]
  }
}`;

    const response = await this.callAPI(`Analyze pay equity: ${JSON.stringify(salaryData)}`, systemPrompt);
    const result = this.parseJSON(response);
    
    if (!result) {
      return {
        payGapAnalysis: {
          overallGap: "Analysis in progress",
          genderPayGap: { male: "₹" + salaryData.salary, female: "Market analysis needed" }
        },
        recommendations: {
          immediate: ["Review salary benchmarks", "Compare with industry standards", "Document compensation structure"]
        }
      };
    }
    
    return result;
  }

  // Safety Assessment
  static async getLocationResources(location, issueType) {
    const systemPrompt = `You are an expert at finding current Indian government helpline numbers. Focus on finding the most recent and accurate contact information. Return ONLY valid JSON:
{
  "phoneNumbers": ["current helpline numbers as found on official websites"],
  "tollFreeNumbers": ["1800 numbers for citizen services"],
  "officialPortals": ["direct URLs to complaint portals"],
  "departments": ["relevant government departments"]
}`;

    const response = await this.callAPI(`Find the current official helpline numbers for ${location}. Look specifically for:
- ${location} Municipal Corporation toll-free helpline (1800 numbers)
- ${location} Nagar Nigam citizen helpline
- ${location} civic complaint numbers
- UP 311 services for ${location}
- Current contact numbers from official government websites

For Agra specifically, the toll-free number is 1800 180 3015. Find similar current numbers for other cities. Issue: ${issueType}`, systemPrompt);
    
    const result = this.parseJSON(response);
    
    // Add known accurate numbers for specific cities
    if (location.toLowerCase().includes('agra')) {
      return {
        phoneNumbers: ["1800 180 3015 (Agra Municipal Toll-Free)"],
        tollFreeNumbers: ["1800 180 3015"],
        officialPortals: ["https://agranagarnigam.up.gov.in/"],
        departments: ["Agra Nagar Nigam", "Urban Development"]
      };
    }
    
    return result;
  }

  static async assessSafety(locationData, userProfile) {
    const systemPrompt = `You are a safety assessment expert with knowledge of Indian cities and complaint systems. Return ONLY valid JSON:
{
  "safetyScore": 75,
  "riskLevel": "low|medium|high|critical",
  "safetyFactors": {
    "physical": "physical safety assessment",
    "infrastructure": "road and public infrastructure safety",
    "environmental": "area-specific safety factors"
  },
  "recommendations": {
    "immediate": ["urgent safety measures with specific actions"],
    "reporting": ["how to report the issue with specific steps"],
    "preventive": ["prevention strategies"]
  },
  "localResources": {
    "complaintPortals": ["specific online portals for the city"],
    "phoneNumbers": ["local authority contact numbers"],
    "procedures": ["step-by-step complaint filing process"]
  },
  "supportNetwork": {
    "localAuthorities": ["relevant local government offices"],
    "helplines": ["emergency and non-emergency numbers"],
    "onlinePortals": ["digital complaint platforms"]
  }
}`;

    // Get location-specific resources
    const locationResources = await this.getLocationResources(locationData.location, locationData.concerns);
    
    const response = await this.callAPI(`Assess safety for: Location: ${locationData.location}, Environment: ${locationData.environment}, Concerns: ${locationData.concerns}. User profile: ${JSON.stringify(userProfile)}. Use these location resources: ${JSON.stringify(locationResources)}`, systemPrompt);
    let result = this.parseJSON(response);
    
    // Merge location resources with safety assessment
    if (result && locationResources) {
      result.localResources = {
        ...result.localResources,
        ...locationResources
      };
    }
    
    if (!result) {
      const cityName = locationData.location.toLowerCase();
      return {
        safetyScore: 70,
        riskLevel: "medium",
        recommendations: {
          immediate: ["Avoid the hazardous area until fixed", "Use alternate routes", "Report to authorities immediately"],
          reporting: [
            "File complaint online at your city's municipal website",
            "Call local municipal helpline",
            "Use mobile apps like 'Fix My Street' or city-specific apps",
            "Visit nearest municipal office with photos of the issue"
          ],
          preventive: ["Share location with family", "Keep emergency contacts ready", "Use well-lit paths"]
        },
        localResources: await this.getLocationResources(locationData.location, locationData.concerns) || {
          complaintPortals: ["Search online for " + cityName + " municipal website"],
          phoneNumbers: ["Emergency: 100", "Emergency Services: 112"],
          procedures: [
            "Take photos of the issue",
            "Note exact location",
            "Search online for local municipal helpline",
            "File complaint with photos and location details"
          ]
        },
        supportNetwork: {
          helplines: ["Police: 100", "Emergency: 112", "Women Helpline: 1091"]
        }
      };
    }
    
    return result;
  }
}