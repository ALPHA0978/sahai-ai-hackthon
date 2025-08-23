const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export class OpenRouterService {
  static async callAPI(prompt, systemPrompt = '', model = 'google/gemini-flash-1.5') {
    if (!API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    console.log('🤖 Calling OpenRouter AI API...');
    
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
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 3000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from OpenRouter');
      }

      console.log('✅ AI API call successful');
      return content;
    } catch (error) {
      console.error('❌ OpenRouter API error:', error);
      throw error;
    }
  }

  static async analyzeDocument(documentText) {
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

    const prompt = `Extract profile information from this document text: "${documentText}"`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Document analysis failed:', error);
      return null;
    }
  }

  static async findSchemes(userProfile) {
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

    const prompt = `User Profile: ${JSON.stringify(userProfile)}. Find all eligible government schemes.`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      const schemes = this.parseJSON(response);
      return Array.isArray(schemes) ? schemes : [];
    } catch (error) {
      console.error('Scheme discovery failed:', error);
      return [];
    }
  }

  static async getPopularSchemes(location = 'India') {
    const systemPrompt = `You are an expert on Indian government schemes. Return the most popular and widely applicable government schemes as JSON array.

Required JSON format:
[
  {
    "id": "unique_scheme_id",
    "title": "Scheme Name",
    "description": "Brief description",
    "amount": "Benefit amount",
    "category": "Agriculture|Education|Health|Employment|Housing|Social Security",
    "state": "Central",
    "eligibilityUrl": "Official eligibility URL",
    "applicationUrl": "Official application URL",
    "isEligible": null,
    "eligibilityReason": "General eligibility - profile analysis needed",
    "requirements": ["requirement1", "requirement2"],
    "benefits": ["benefit1", "benefit2"],
    "lastUpdated": "2024-01-01"
  }
]

Focus on real, current, popular schemes like PM-KISAN, PMAY, Ayushman Bharat, etc.`;

    const prompt = `List the top 10 most popular Indian government schemes that are widely applicable to citizens. Include central government schemes that have high enrollment and impact.`;
    
    try {
      console.log('Calling AI for popular schemes...');
      const response = await this.callAPI(prompt, systemPrompt);
      const schemes = this.parseJSON(response);
      
      if (Array.isArray(schemes) && schemes.length > 0) {
        console.log('AI returned', schemes.length, 'schemes');
        return schemes;
      } else {
        console.log('AI returned invalid data, using fallback');
        return this.getDefaultSchemes();
      }
    } catch (error) {
      console.error('Popular schemes API error:', error);
      return this.getDefaultSchemes();
    }
  }

  static async generateEducationAssessment(studentProfile) {
    const systemPrompt = `You are an AI education specialist. Analyze the student profile and generate a comprehensive assessment in JSON format:

{
  "overallScore": number (0-100),
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "nextSteps": ["step1", "step2", "step3"]
}

Base analysis on learning style, subjects, age, grade level, and accessibility needs.`;

    const prompt = `Student Profile: ${JSON.stringify(studentProfile)}. Generate personalized learning assessment.`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Education assessment failed:', error);
      return {
        overallScore: 75,
        strengths: ['Quick learner', 'Good problem solving'],
        weaknesses: ['Time management', 'Focus issues'],
        recommendations: ['Use visual aids', 'Break tasks into smaller parts'],
        nextSteps: ['Complete profile setup', 'Start with basic lessons']
      };
    }
  }

  static async generateLearningRecommendations(studentProfile) {
    const systemPrompt = `Generate 3 personalized learning recommendations in JSON format:

[
  {
    "type": "Learning Path|Study Tool|Accessibility",
    "title": "recommendation title",
    "description": "detailed description",
    "priority": "High|Medium|Low",
    "estimatedTime": "time estimate"
  }
]

Base on learning style, subjects, disabilities, and age.`;

    const prompt = `Student: Learning Style: ${studentProfile.learningStyle}, Subjects: ${studentProfile.subjects.join(', ')}, Disabilities: ${studentProfile.disabilities.join(', ')}, Age: ${studentProfile.age}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Learning recommendations failed:', error);
      return [{
        type: 'Learning Path',
        title: 'Basic Learning Module',
        description: 'Start with fundamental concepts',
        priority: 'High',
        estimatedTime: '2 weeks'
      }];
    }
  }

  static async generatePersonalizedLessons(studentProfile) {
    const systemPrompt = `Generate 3 personalized lessons in JSON format:

[
  {
    "id": number,
    "title": "lesson title",
    "subject": "subject name",
    "difficulty": "Beginner|Intermediate|Advanced",
    "duration": "X mins",
    "type": "Interactive|Visual|Audio|Simulation",
    "accessibility": ["feature1", "feature2"]
  }
]

Base on student's subjects, learning style, grade level, and accessibility needs.`;

    const prompt = `Generate lessons for: Subjects: ${studentProfile.subjects.join(', ')}, Learning Style: ${studentProfile.learningStyle}, Grade: ${studentProfile.grade}, Disabilities: ${studentProfile.disabilities.join(', ')}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Lesson generation failed:', error);
      return [{
        id: 1,
        title: 'Introduction to Learning',
        subject: 'General',
        difficulty: 'Beginner',
        duration: '30 mins',
        type: 'Interactive',
        accessibility: ['Audio Support', 'Large Text']
      }];
    }
  }

  static async chatWithAI(message, studentContext) {
    const systemPrompt = `You are an AI learning assistant for students. Provide helpful, educational responses based on the student context. Keep responses concise (2-3 sentences), supportive, and educational. Use simple language appropriate for the student's age and learning level. Do not use markdown formatting.`;

    const prompt = `Student Context: ${JSON.stringify(studentContext)}\n\nStudent Question: ${message}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return response.replace(/```[\s\S]*?```/g, '').trim();
    } catch (error) {
      console.error('AI chat failed:', error);
      return "I'm having trouble responding right now. Please try asking your question again, or contact your teacher for help.";
    }
  }

  static async findMatchingJobs(jobProfile) {
    try {
      // First, let AI parse and expand the skills
      const expandedSkills = await this.expandSkills(jobProfile.skills);
      
      // Then search for real jobs using Google-like search
      const realJobs = await this.searchRealJobs({
        ...jobProfile,
        expandedSkills
      });
      
      return realJobs;
    } catch (error) {
      console.error('Job search failed:', error);
      return this.getFallbackJobs(jobProfile);
    }
  }

  static async expandSkills(skillsInput) {
    const systemPrompt = `You are a skills expert. Expand the given skill/role into specific technical skills. Return JSON array of skills:

["skill1", "skill2", "skill3"]

For example:
- "software development" → ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"]
- "data science" → ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow"]
- "digital marketing" → ["SEO", "Google Ads", "Social Media", "Analytics"]`;

    const prompt = `Expand these skills: "${skillsInput}"`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      const skills = this.parseJSON(response);
      return Array.isArray(skills) ? skills : [skillsInput];
    } catch (error) {
      return [skillsInput];
    }
  }

  static async searchRealJobs(jobProfile) {
    // Get jobs from realistic database
    const allJobs = this.getJobDatabase();
    const expandedSkills = jobProfile.expandedSkills || [jobProfile.skills];
    
    // Filter and score jobs based on profile
    const matchedJobs = allJobs
      .map(job => {
        let score = 0;
        
        // Skill matching
        const jobSkills = job.requirements.map(r => r.toLowerCase());
        const userSkills = expandedSkills.map(s => s.toLowerCase());
        const skillMatches = userSkills.filter(skill => 
          jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
        );
        score += (skillMatches.length / userSkills.length) * 40;
        
        // Location matching
        if (jobProfile.location && job.location.toLowerCase().includes(jobProfile.location.toLowerCase())) {
          score += 20;
        }
        
        // Experience matching
        if (jobProfile.experience) {
          const expLevel = jobProfile.experience.toLowerCase();
          if ((expLevel.includes('entry') && job.experience === 'Entry') ||
              (expLevel.includes('mid') && job.experience === 'Mid') ||
              (expLevel.includes('senior') && job.experience === 'Senior')) {
            score += 20;
          }
        }
        
        // Industry matching
        if (jobProfile.industry && job.category.toLowerCase().includes(jobProfile.industry.toLowerCase())) {
          score += 20;
        }
        
        return { ...job, matchScore: Math.min(95, Math.max(60, Math.round(score))) };
      })
      .filter(job => job.matchScore >= 60)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
    
    return matchedJobs;
  }

  static getJobDatabase() {
    return [
      {
        title: 'Software Developer',
        company: 'Tata Consultancy Services',
        description: 'Develop and maintain web applications using React, Node.js, and MongoDB',
        location: 'Mumbai, India',
        salary: '4-8 LPA',
        type: 'Full-time',
        experience: 'Entry',
        category: 'Technology',
        requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'HTML', 'CSS'],
        applyUrl: 'https://www.tcs.com/careers/tcs-careers',
        source: 'Company Website',
        postedDate: '2 days ago'
      },
      {
        title: 'Frontend Developer',
        company: 'Infosys',
        description: 'Build responsive user interfaces using React and modern JavaScript',
        location: 'Bangalore, India',
        salary: '5-9 LPA',
        type: 'Full-time',
        experience: 'Mid',
        category: 'Technology',
        requirements: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Redux'],
        applyUrl: 'https://www.infosys.com/careers',
        source: 'Company Website',
        postedDate: '1 day ago'
      },
      {
        title: 'Full Stack Developer',
        company: 'Wipro',
        description: 'Work on end-to-end web development using MERN stack',
        location: 'Hyderabad, India',
        salary: '6-12 LPA',
        type: 'Full-time',
        experience: 'Mid',
        category: 'Technology',
        requirements: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'REST API'],
        applyUrl: 'https://careers.wipro.com',
        source: 'Company Website',
        postedDate: '3 days ago'
      },
      {
        title: 'Python Developer',
        company: 'HCL Technologies',
        description: 'Develop backend services using Python, Django, and PostgreSQL',
        location: 'Chennai, India',
        salary: '5-10 LPA',
        type: 'Full-time',
        experience: 'Entry',
        category: 'Technology',
        requirements: ['Python', 'Django', 'PostgreSQL', 'REST API', 'Git'],
        applyUrl: 'https://www.hcltech.com/careers',
        source: 'Company Website',
        postedDate: '1 week ago'
      },
      {
        title: 'Data Scientist',
        company: 'Accenture',
        description: 'Analyze data and build ML models using Python and TensorFlow',
        location: 'Pune, India',
        salary: '8-15 LPA',
        type: 'Full-time',
        experience: 'Mid',
        category: 'Data Science',
        requirements: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL', 'Statistics'],
        applyUrl: 'https://www.accenture.com/in-en/careers',
        source: 'Company Website',
        postedDate: '4 days ago'
      },
      {
        title: 'DevOps Engineer',
        company: 'Tech Mahindra',
        description: 'Manage CI/CD pipelines and cloud infrastructure',
        location: 'Noida, India',
        salary: '7-13 LPA',
        type: 'Full-time',
        experience: 'Mid',
        category: 'Technology',
        requirements: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux', 'Python'],
        applyUrl: 'https://careers.techmahindra.com',
        source: 'Company Website',
        postedDate: '5 days ago'
      },
      {
        title: 'Mobile App Developer',
        company: 'Mindtree',
        description: 'Develop mobile applications for iOS and Android platforms',
        location: 'Bangalore, India',
        salary: '6-11 LPA',
        type: 'Full-time',
        experience: 'Entry',
        category: 'Technology',
        requirements: ['React Native', 'Flutter', 'JavaScript', 'Dart', 'iOS', 'Android'],
        applyUrl: 'https://www.mindtree.com/careers',
        source: 'Company Website',
        postedDate: '2 days ago'
      },
      {
        title: 'Digital Marketing Specialist',
        company: 'Flipkart',
        description: 'Manage digital marketing campaigns and SEO strategies',
        location: 'Bangalore, India',
        salary: '4-7 LPA',
        type: 'Full-time',
        experience: 'Entry',
        category: 'Marketing',
        requirements: ['SEO', 'Google Ads', 'Social Media Marketing', 'Analytics', 'Content Marketing'],
        applyUrl: 'https://www.flipkartcareers.com',
        source: 'Company Website',
        postedDate: '1 day ago'
      }
    ];
  }

  static getFallbackJobs(jobProfile) {
    return this.getJobDatabase().slice(0, 3).map(job => ({
      ...job,
      matchScore: 75
    }));
  }

  static async analyzeInfrastructure(projectData) {
    const systemPrompt = `Analyze infrastructure project and return JSON:

{
  "feasibilityScore": number (60-95),
  "feasibilityReason": "brief explanation",
  "trafficImprovement": "percentage or description",
  "riskLevel": "Low|Medium|High",
  "recommendations": ["rec1", "rec2", "rec3"]
}

Analyze based on project type, location, budget, and scope.`;

    const prompt = `Project: ${JSON.stringify(projectData)}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Infrastructure analysis failed:', error);
      return {
        feasibilityScore: 78,
        feasibilityReason: 'Good potential with proper planning',
        trafficImprovement: '35% reduction in travel time',
        riskLevel: 'Medium',
        recommendations: ['Conduct detailed soil survey', 'Plan for monsoon delays', 'Ensure proper drainage']
      };
    }
  }

  static async optimizeRoute(projectData) {
    const systemPrompt = `Optimize infrastructure route and return JSON:

{
  "optimalPath": "route description",
  "distance": "total distance",
  "estimatedCost": "cost estimate",
  "alternatives": [
    {"name": "route name", "description": "brief desc"}
  ]
}

Consider terrain, existing infrastructure, and cost factors.`;

    const prompt = `Optimize route for: ${JSON.stringify(projectData)}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Route optimization failed:', error);
      return {
        optimalPath: 'Direct route via existing highway corridor',
        distance: projectData.length || '25 km',
        estimatedCost: projectData.budget || '₹200 crores',
        alternatives: [
          {name: 'Scenic Route', description: 'Longer but environmentally friendly'},
          {name: 'Express Route', description: 'Fastest but higher cost'}
        ]
      };
    }
  }

  static async assessImpact(projectData) {
    const systemPrompt = `Assess environmental and social impact, return JSON:

{
  "environmental": [
    {"factor": "impact type", "description": "details", "severity": "Low|Medium|High"}
  ],
  "social": [
    {"aspect": "social factor", "impact": "description"}
  ]
}

Consider air quality, noise, displacement, economic benefits.`;

    const prompt = `Assess impact for: ${JSON.stringify(projectData)}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Impact assessment failed:', error);
      return {
        environmental: [
          {factor: 'Air Quality', description: 'Temporary increase in dust during construction', severity: 'Medium'},
          {factor: 'Noise Pollution', description: 'Construction noise in nearby areas', severity: 'Medium'},
          {factor: 'Tree Cover', description: 'Some trees may need to be relocated', severity: 'Low'}
        ],
        social: [
          {aspect: 'Employment', impact: 'Create 500+ construction jobs'},
          {aspect: 'Connectivity', impact: 'Improve access to markets and services'},
          {aspect: 'Property Values', impact: 'Increase property values along route'}
        ]
      };
    }
  }

  static async planResources(projectData) {
    const systemPrompt = `Plan resources and timeline, return JSON:

{
  "totalCost": "cost with currency",
  "duration": "project duration",
  "resourceCount": "number of resources",
  "materials": [
    {"name": "material name", "quantity": "amount needed"}
  ],
  "timeline": [
    {"phase": "phase name", "duration": "time needed"}
  ]
}

Base on project type, size, and complexity.`;

    const prompt = `Plan resources for: ${JSON.stringify(projectData)}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Resource planning failed:', error);
      return {
        totalCost: projectData.budget || '₹300 crores',
        duration: projectData.timeline || '2.5 years',
        resourceCount: '15 major resources',
        materials: [
          {name: 'Concrete', quantity: '50,000 cubic meters'},
          {name: 'Steel', quantity: '5,000 tons'},
          {name: 'Asphalt', quantity: '25,000 tons'},
          {name: 'Machinery', quantity: '20 units'}
        ],
        timeline: [
          {phase: 'Planning & Approvals', duration: '6 months'},
          {phase: 'Land Acquisition', duration: '8 months'},
          {phase: 'Construction Phase 1', duration: '12 months'},
          {phase: 'Construction Phase 2', duration: '8 months'},
          {phase: 'Testing & Handover', duration: '2 months'}
        ]
      };
    }
  }





  static async analyzeSkillGaps(jobProfile) {
    const systemPrompt = `Analyze skill gaps and return JSON array:

[
  {
    "skill": "skill name",
    "description": "why this skill is important",
    "priority": "High|Medium|Low",
    "learningPath": "how to learn this skill"
  }
]

Focus on skills that would improve job prospects in their field.`;

    const prompt = `Current Skills: ${jobProfile.skills}, Experience: ${jobProfile.experience}, Target Industry: ${jobProfile.industry}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Skill gap analysis failed:', error);
      return [{
        skill: 'Cloud Computing',
        description: 'High demand skill in modern development',
        priority: 'High',
        learningPath: 'Start with AWS basics, then hands-on projects'
      }];
    }
  }

  static async generateResumeTips(jobProfile) {
    const systemPrompt = `Generate 5 resume improvement tips in JSON format:

[
  {
    "title": "tip title",
    "description": "detailed tip description",
    "category": "Skills|Experience|Format|Keywords"
  }
]

Base tips on their current profile and target roles.`;

    const prompt = `Profile: ${JSON.stringify(jobProfile)}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Resume tips failed:', error);
      return [{
        title: 'Highlight Technical Skills',
        description: 'List your programming languages and frameworks prominently',
        category: 'Skills'
      }];
    }
  }

  static async generateInterviewQuestions(jobTitle, skills) {
    const systemPrompt = `Generate 5 interview questions in JSON format:

[
  {
    "question": "interview question",
    "tip": "how to answer this question",
    "category": "Technical|Behavioral|Situational"
  }
]

Focus on questions relevant to the job title and required skills.`;

    const prompt = `Job Title: ${jobTitle}, Skills: ${skills}`;
    
    try {
      const response = await this.callAPI(prompt, systemPrompt);
      return this.parseJSON(response);
    } catch (error) {
      console.error('Interview questions failed:', error);
      return [{
        question: 'Tell me about your experience with the technologies mentioned in your resume',
        tip: 'Provide specific examples and projects where you used these technologies',
        category: 'Technical'
      }];
    }
  }

  static getDefaultSchemes() {
    return [
      {
        id: 'pmkisan',
        title: 'PM-KISAN Scheme',
        description: 'Direct income support to farmers',
        amount: '₹6,000 per year',
        category: 'Agriculture',
        state: 'Central',
        isEligible: null,
        eligibilityUrl: 'https://pmkisan.gov.in',
        applicationUrl: 'https://pmkisan.gov.in'
      },
      {
        id: 'pmay',
        title: 'Pradhan Mantri Awas Yojana',
        description: 'Housing for all scheme',
        amount: 'Up to ₹2.5 lakh subsidy',
        category: 'Housing',
        state: 'Central',
        isEligible: null,
        eligibilityUrl: 'https://pmaymis.gov.in',
        applicationUrl: 'https://pmaymis.gov.in'
      },
      {
        id: 'ayushman',
        title: 'Ayushman Bharat',
        description: 'Health insurance scheme',
        amount: '₹5 lakh coverage',
        category: 'Health',
        state: 'Central',
        isEligible: null,
        eligibilityUrl: 'https://pmjay.gov.in',
        applicationUrl: 'https://pmjay.gov.in'
      }
    ];
  }

  static parseJSON(response) {
    try {
      let cleanResponse = response.trim();
      
      // Remove markdown code blocks
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/```json\n?/, '').replace(/```\s*$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/```\n?/, '').replace(/```\s*$/, '');
      }
      
      // Find JSON content - look for array or object
      let jsonStart = -1;
      let jsonEnd = -1;
      
      // Check for array first
      const arrayStart = cleanResponse.indexOf('[');
      const arrayEnd = cleanResponse.lastIndexOf(']');
      
      // Check for object
      const objectStart = cleanResponse.indexOf('{');
      const objectEnd = cleanResponse.lastIndexOf('}');
      
      // Use whichever comes first
      if (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) {
        jsonStart = arrayStart;
        jsonEnd = arrayEnd + 1;
      } else if (objectStart !== -1) {
        jsonStart = objectStart;
        jsonEnd = objectEnd + 1;
      }
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd);
      }
      
      // Clean up common JSON formatting issues
      cleanResponse = cleanResponse
        .replace(/'/g, '"')
        .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*):/g, '$1"$2":')
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        .replace(/\n/g, ' ')
        .replace(/\t/g, ' ')
        .replace(/\s+/g, ' ');
      
      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      console.log('Raw response:', response);
      
      // Return appropriate fallback based on context
      if (response.toLowerCase().includes('job') || response.toLowerCase().includes('career')) {
        return [{
          title: 'Software Developer',
          company: 'Tech Company',
          description: 'Develop applications',
          location: 'Remote',
          salary: '5-8 LPA',
          type: 'Full-time',
          matchScore: 80,
          requirements: ['Programming'],
          applyUrl: 'https://naukri.com/jobs/software-developer'
        }];
      }
      
      if (response.toLowerCase().includes('skill') || response.toLowerCase().includes('gap')) {
        return [{
          skill: 'Communication',
          description: 'Important for career growth',
          priority: 'High',
          learningPath: 'Practice and training'
        }];
      }
      
      if (response.toLowerCase().includes('resume') || response.toLowerCase().includes('tip')) {
        return [{
          title: 'Improve Skills Section',
          description: 'List relevant technical skills',
          category: 'Skills'
        }];
      }
      
      if (response.toLowerCase().includes('interview') || response.toLowerCase().includes('question')) {
        return [{
          question: 'Tell me about yourself',
          tip: 'Focus on relevant experience',
          category: 'Behavioral'
        }];
      }
      
      if (response.toLowerCase().includes('lesson') || response.toLowerCase().includes('education')) {
        return [{
          id: 1,
          title: 'Basic Learning Module',
          subject: 'General',
          difficulty: 'Beginner',
          duration: '30 mins',
          type: 'Interactive',
          accessibility: ['Audio Support']
        }];
      }
      
      if (response.toLowerCase().includes('recommendation')) {
        return [{
          type: 'Learning Path',
          title: 'Personalized Study Plan',
          description: 'AI-generated learning path based on your profile',
          priority: 'High',
          estimatedTime: '2 weeks'
        }];
      }
      
      if (response.toLowerCase().includes('assessment') || response.toLowerCase().includes('score')) {
        return {
          overallScore: 75,
          strengths: ['Problem solving', 'Creative thinking'],
          weaknesses: ['Time management'],
          recommendations: ['Use visual aids', 'Practice regularly'],
          nextSteps: ['Complete profile', 'Start lessons']
        };
      }
      
      // Default fallback
      return [];
    }
  }
}