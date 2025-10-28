import { BaseAI } from './baseAI.js';

export class EducationAI extends BaseAI {

  // Comprehensive learning assessment
  static async generateAssessment(studentProfile) {
    const systemPrompt = `You are an expert educational psychologist and learning specialist. Generate comprehensive learning assessment. Return ONLY valid JSON:
{
  "overallScore": "overall learning score (0-100)",
  "learningProfile": {
    "learningStyle": "Visual|Auditory|Kinesthetic|Reading/Writing|Multimodal",
    "preferredPace": "Fast|Moderate|Slow|Self-paced",
    "attentionSpan": "Short|Medium|Long",
    "motivationLevel": "High|Medium|Low",
    "confidence": "High|Medium|Low"
  },
  "cognitiveAbilities": {
    "analyticalThinking": "score (0-100)",
    "creativeThinking": "score (0-100)",
    "criticalThinking": "score (0-100)",
    "problemSolving": "score (0-100)",
    "memoryRetention": "score (0-100)"
  },
  "subjectStrengths": [
    {
      "subject": "subject name",
      "score": "proficiency score (0-100)",
      "skills": ["specific skills mastered"],
      "potential": "growth potential assessment"
    }
  ],
  "areasForImprovement": [
    {
      "area": "subject or skill area",
      "currentLevel": "current proficiency",
      "targetLevel": "recommended target",
      "strategies": ["specific improvement strategies"],
      "timeline": "expected improvement timeframe"
    }
  ],
  "learningChallenges": [
    {
      "challenge": "specific challenge",
      "impact": "High|Medium|Low",
      "solutions": ["recommended solutions"],
      "accommodations": ["learning accommodations needed"]
    }
  ],
  "recommendations": {
    "immediate": ["actions to take right now"],
    "shortTerm": ["goals for next 1-3 months"],
    "longTerm": ["goals for next 6-12 months"],
    "resources": ["recommended learning resources"]
  },
  "personalizedPlan": {
    "dailySchedule": "recommended daily learning schedule",
    "weeklyGoals": ["weekly learning objectives"],
    "assessmentFrequency": "how often to assess progress",
    "parentInvolvement": ["ways parents can support learning"]
  },
  "accessibility": {
    "needs": ["accessibility requirements"],
    "tools": ["assistive technologies recommended"],
    "modifications": ["curriculum modifications needed"]
  },
  "motivationStrategies": [
    {
      "strategy": "motivation technique",
      "description": "how to implement",
      "effectiveness": "expected effectiveness for this student"
    }
  ]
}`;

    const response = await this.callAPI(`Student Profile: ${JSON.stringify(studentProfile)}\n\nGenerate comprehensive learning assessment with personalized recommendations.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultAssessment();
  }

  // Personalized lesson generation
  static async generateLessons(studentProfile, subject, count = 5) {
    const systemPrompt = `You are an expert curriculum designer. Create personalized lessons based on student profile. Return ONLY valid JSON array:
[{
  "id": "unique lesson identifier",
  "title": "engaging lesson title",
  "subject": "subject area",
  "topic": "specific topic covered",
  "difficulty": "Beginner|Intermediate|Advanced",
  "duration": "estimated time in minutes",
  "type": "Interactive|Visual|Audio|Hands-on|Discussion|Project",
  "learningObjectives": ["what student will learn"],
  "prerequisites": ["required prior knowledge"],
  "materials": ["materials needed for lesson"],
  "activities": [
    {
      "activity": "activity name",
      "description": "activity description",
      "duration": "time needed",
      "interaction": "individual|group|teacher-led"
    }
  ],
  "assessment": {
    "type": "Quiz|Project|Discussion|Observation|Portfolio",
    "criteria": ["assessment criteria"],
    "rubric": "brief rubric description"
  },
  "differentiation": {
    "forStruggling": ["modifications for struggling learners"],
    "forAdvanced": ["extensions for advanced learners"],
    "forELL": ["support for English language learners"]
  },
  "technology": {
    "tools": ["digital tools used"],
    "platforms": ["online platforms if any"],
    "alternatives": ["non-tech alternatives"]
  },
  "accessibility": {
    "visualSupport": ["visual aids and supports"],
    "auditorySupport": ["audio supports"],
    "motorSupport": ["fine/gross motor accommodations"],
    "cognitiveSupport": ["cognitive supports"]
  },
  "homework": {
    "assignment": "homework description",
    "duration": "expected time",
    "parentSupport": ["how parents can help"]
  },
  "extensions": ["ways to extend learning beyond lesson"],
  "realWorldConnections": ["how lesson connects to real world"],
  "culturalRelevance": ["cultural connections and relevance"]
}]`;

    const response = await this.callAPI(`Student Profile: ${JSON.stringify(studentProfile)}\nSubject: ${subject}\nNumber of lessons: ${count}\n\nCreate engaging, personalized lessons that match the student's learning style and needs.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultLessons();
  }

  // AI tutoring and support
  static async chatWithAI(message, studentContext) {
    const systemPrompt = `You are an expert AI tutor and learning companion. You are patient, encouraging, and adapt your teaching style to each student. Your responses should:
- Be age-appropriate and match the student's level
- Use the Socratic method when appropriate (ask guiding questions)
- Provide clear explanations with examples
- Encourage critical thinking
- Be supportive and motivating
- Offer multiple ways to understand concepts
- Connect learning to real-world applications

Student Context: ${JSON.stringify(studentContext)}

Provide helpful, educational responses that promote learning and understanding.`;

    const response = await this.callAPI(`Student Question: ${message}`, systemPrompt);
    return response || "I'm here to help you learn! Could you rephrase your question or tell me more about what you're trying to understand?";
  }

  // Skill gap analysis
  static async analyzeSkillGaps(studentProfile, targetLevel) {
    const systemPrompt = `Analyze skill gaps and create learning pathway. Return ONLY valid JSON:
{
  "currentLevel": "student's current proficiency level",
  "targetLevel": "desired proficiency level",
  "overallGap": "percentage gap to close (0-100)",
  "skillGaps": [
    {
      "skill": "specific skill name",
      "currentProficiency": "current level (0-100)",
      "targetProficiency": "target level (0-100)",
      "priority": "High|Medium|Low",
      "difficulty": "Easy|Medium|Hard to acquire",
      "timeEstimate": "estimated time to master",
      "prerequisites": ["skills needed before this one"],
      "learningPath": ["step-by-step learning approach"],
      "resources": ["recommended learning resources"],
      "practiceActivities": ["activities to practice this skill"]
    }
  ],
  "learningSequence": ["optimal order to learn skills"],
  "milestones": [
    {
      "milestone": "achievement marker",
      "timeframe": "when to achieve this",
      "assessmentMethod": "how to measure achievement"
    }
  ],
  "supportNeeded": {
    "tutoring": "type of tutoring recommended",
    "resources": ["additional resources needed"],
    "technology": ["helpful technology tools"],
    "practice": "recommended practice schedule"
  }
}`;

    const response = await this.callAPI(`Student Profile: ${JSON.stringify(studentProfile)}\nTarget Level: ${targetLevel}\n\nAnalyze skill gaps and create detailed learning pathway.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultSkillGapAnalysis();
  }

  // Career guidance for students
  static async provideCareerGuidance(studentProfile, interests) {
    const systemPrompt = `Provide career guidance for student. Return ONLY valid JSON:
{
  "careerMatches": [
    {
      "career": "career title",
      "matchScore": "how well it matches student (0-100)",
      "description": "career description",
      "requiredEducation": "education requirements",
      "skillsNeeded": ["key skills required"],
      "salaryRange": "typical salary range",
      "jobOutlook": "employment prospects",
      "workEnvironment": "typical work setting",
      "pathways": ["different ways to enter this career"]
    }
  ],
  "educationRecommendations": {
    "subjects": ["subjects to focus on"],
    "extracurriculars": ["recommended activities"],
    "certifications": ["useful certifications"],
    "higherEducation": ["college/university recommendations"]
  },
  "skillDevelopment": [
    {
      "skill": "skill to develop",
      "importance": "why this skill matters",
      "howToDevelop": ["ways to build this skill"],
      "timeline": "when to focus on this skill"
    }
  ],
  "experienceOpportunities": [
    {
      "opportunity": "experience type",
      "description": "what it involves",
      "benefits": ["what student will gain"],
      "howToFind": ["where to look for these opportunities"]
    }
  ],
  "nextSteps": {
    "immediate": ["actions to take now"],
    "thisYear": ["goals for this academic year"],
    "longTerm": ["long-term planning steps"]
  }
}`;

    const response = await this.callAPI(`Student Profile: ${JSON.stringify(studentProfile)}\nInterests: ${interests}\n\nProvide comprehensive career guidance with actionable steps.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultCareerGuidance();
  }

  // Learning progress tracking
  static async trackProgress(studentId, assessmentData) {
    const systemPrompt = `Analyze learning progress and provide insights. Return ONLY valid JSON:
{
  "progressSummary": {
    "overallProgress": "percentage progress (0-100)",
    "trend": "Improving|Stable|Declining",
    "pace": "Ahead|On Track|Behind|Needs Support",
    "consistency": "Very Consistent|Consistent|Inconsistent"
  },
  "subjectProgress": [
    {
      "subject": "subject name",
      "currentScore": "current proficiency (0-100)",
      "previousScore": "previous assessment score",
      "improvement": "improvement amount",
      "strengths": ["areas of strength"],
      "challenges": ["areas needing work"]
    }
  ],
  "achievements": [
    {
      "achievement": "what was accomplished",
      "date": "when achieved",
      "significance": "why this matters"
    }
  ],
  "recommendations": {
    "continue": ["what's working well to continue"],
    "adjust": ["what needs adjustment"],
    "focus": ["areas to focus on next"],
    "support": ["additional support needed"]
  },
  "goals": {
    "shortTerm": ["goals for next 2-4 weeks"],
    "mediumTerm": ["goals for next 2-3 months"],
    "longTerm": ["goals for next 6-12 months"]
  },
  "motivationalMessage": "encouraging message based on progress"
}`;

    const response = await this.callAPI(`Student ID: ${studentId}\nAssessment Data: ${JSON.stringify(assessmentData)}\n\nAnalyze progress and provide actionable insights.`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultProgressTracking();
  }

  // Default fallback methods
  static getDefaultAssessment() {
    return {
      overallScore: 75,
      learningProfile: {
        learningStyle: 'Multimodal',
        preferredPace: 'Moderate',
        attentionSpan: 'Medium',
        motivationLevel: 'Medium',
        confidence: 'Medium'
      },
      cognitiveAbilities: {
        analyticalThinking: 70,
        creativeThinking: 75,
        criticalThinking: 70,
        problemSolving: 75,
        memoryRetention: 70
      },
      subjectStrengths: [{
        subject: 'General Learning',
        score: 75,
        skills: ['Basic comprehension', 'Following instructions'],
        potential: 'Good potential for growth with proper support'
      }],
      recommendations: {
        immediate: ['Complete detailed assessment', 'Identify learning preferences'],
        shortTerm: ['Establish learning routine', 'Set achievable goals'],
        longTerm: ['Develop independent learning skills', 'Explore areas of interest']
      }
    };
  }

  static getDefaultLessons() {
    return [{
      id: 'intro-001',
      title: 'Introduction to Effective Learning',
      subject: 'Study Skills',
      topic: 'Learning Strategies',
      difficulty: 'Beginner',
      duration: '30',
      type: 'Interactive',
      learningObjectives: ['Understand different learning styles', 'Identify personal learning preferences'],
      activities: [{
        activity: 'Learning Style Assessment',
        description: 'Interactive quiz to identify learning preferences',
        duration: '15',
        interaction: 'individual'
      }],
      accessibility: {
        visualSupport: ['Diagrams', 'Color coding'],
        auditorySupport: ['Audio instructions'],
        motorSupport: ['Interactive elements'],
        cognitiveSupport: ['Step-by-step guidance']
      }
    }];
  }

  static getDefaultSkillGapAnalysis() {
    return {
      currentLevel: 'Intermediate',
      targetLevel: 'Advanced',
      overallGap: 30,
      skillGaps: [{
        skill: 'Critical Thinking',
        currentProficiency: 60,
        targetProficiency: 85,
        priority: 'High',
        difficulty: 'Medium',
        timeEstimate: '3-6 months',
        learningPath: ['Practice analysis exercises', 'Study logical reasoning', 'Apply to real scenarios']
      }],
      supportNeeded: {
        tutoring: 'Periodic guidance recommended',
        resources: ['Online courses', 'Practice materials'],
        practice: 'Daily 30-minute sessions'
      }
    };
  }

  static getDefaultCareerGuidance() {
    return {
      careerMatches: [{
        career: 'Technology Professional',
        matchScore: 75,
        description: 'Various roles in technology sector',
        requiredEducation: 'Bachelor\'s degree or equivalent experience',
        skillsNeeded: ['Problem solving', 'Analytical thinking', 'Communication'],
        pathways: ['Traditional degree', 'Bootcamps', 'Self-learning + certifications']
      }],
      nextSteps: {
        immediate: ['Explore interests through online resources'],
        thisYear: ['Take relevant courses', 'Gain practical experience'],
        longTerm: ['Build portfolio', 'Network with professionals']
      }
    };
  }

  static getDefaultProgressTracking() {
    return {
      progressSummary: {
        overallProgress: 70,
        trend: 'Improving',
        pace: 'On Track',
        consistency: 'Consistent'
      },
      recommendations: {
        continue: ['Current study routine'],
        focus: ['Areas identified in assessment'],
        support: ['Regular check-ins with instructor']
      },
      motivationalMessage: 'You\'re making good progress! Keep up the consistent effort.'
    };
  }
}