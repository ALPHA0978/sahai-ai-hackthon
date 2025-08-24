const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export class CareerAI {
  static async callAPI(prompt, systemPrompt) {
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
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 3000
      })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content;
  }

  static async analyzeSkillGaps(jobProfile) {
    const systemPrompt = `Analyze skill gaps and return JSON array:
[{
  "skill": "skill name",
  "description": "why this skill is important",
  "priority": "High|Medium|Low",
  "learningPath": "how to learn this skill"
}]`;

    const prompt = `Current Skills: ${jobProfile.skills}, Experience: ${jobProfile.experience}, Target Industry: ${jobProfile.industry}`;
    
    const response = await this.callAPI(prompt, systemPrompt);
    return this.parseJSON(response) || this.getDefaultSkillGaps();
  }

  static async generateResumeTips(jobProfile) {
    const systemPrompt = `Generate 5 resume improvement tips in JSON format:
[{
  "title": "tip title",
  "description": "detailed tip description",
  "category": "Skills|Experience|Format|Keywords"
}]`;

    const response = await this.callAPI(`Profile: ${JSON.stringify(jobProfile)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultResumeTips();
  }

  static async generateInterviewQuestions(jobTitle, skills) {
    const systemPrompt = `Generate 5 interview questions in JSON format:
[{
  "question": "interview question",
  "tip": "how to answer this question",
  "category": "Technical|Behavioral|Situational"
}]`;

    const response = await this.callAPI(`Job Title: ${jobTitle}, Skills: ${skills}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultQuestions();
  }

  static getDefaultSkillGaps() {
    return [{
      skill: 'Cloud Computing',
      description: 'High demand skill in modern development',
      priority: 'High',
      learningPath: 'Start with AWS basics, then hands-on projects'
    }];
  }

  static getDefaultResumeTips() {
    return [{
      title: 'Highlight Technical Skills',
      description: 'List your programming languages and frameworks prominently',
      category: 'Skills'
    }];
  }

  static getDefaultQuestions() {
    return [{
      question: 'Tell me about your experience with the technologies mentioned in your resume',
      tip: 'Provide specific examples and projects where you used these technologies',
      category: 'Technical'
    }];
  }

  static parseJSON(response) {
    try {
      let clean = response.trim();
      if (clean.startsWith('```json')) clean = clean.replace(/```json\n?/, '').replace(/```\s*$/, '');
      
      const arrayStart = clean.indexOf('[');
      if (arrayStart !== -1) {
        clean = clean.substring(arrayStart, clean.lastIndexOf(']') + 1);
      }
      
      return JSON.parse(clean);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      return null;
    }
  }
}