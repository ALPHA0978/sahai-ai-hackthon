const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export class EducationAI {
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

  static async generateAssessment(studentProfile) {
    const systemPrompt = `Generate education assessment JSON:
{
  "overallScore": number (0-100),
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "recommendations": ["rec1", "rec2"],
  "nextSteps": ["step1", "step2"]
}`;

    const response = await this.callAPI(`Student: ${JSON.stringify(studentProfile)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultAssessment();
  }

  static async generateLessons(studentProfile) {
    const systemPrompt = `Generate 3 lessons JSON array:
[{
  "id": number,
  "title": "lesson title",
  "subject": "subject name",
  "difficulty": "Beginner|Intermediate|Advanced",
  "duration": "X mins",
  "type": "Interactive|Visual|Audio",
  "accessibility": ["feature1", "feature2"]
}]`;

    const response = await this.callAPI(`Generate lessons for: ${JSON.stringify(studentProfile)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultLessons();
  }

  static async chatWithAI(message, studentContext) {
    const systemPrompt = `You are an AI learning assistant. Provide helpful, educational responses. Keep responses concise and supportive.`;

    const response = await this.callAPI(`Context: ${JSON.stringify(studentContext)}\nQuestion: ${message}`, systemPrompt);
    return response || "I'm having trouble responding. Please try again.";
  }

  static getDefaultAssessment() {
    return {
      overallScore: 75,
      strengths: ['Quick learner', 'Problem solving'],
      weaknesses: ['Time management'],
      recommendations: ['Use visual aids', 'Practice regularly'],
      nextSteps: ['Complete profile', 'Start lessons']
    };
  }

  static getDefaultLessons() {
    return [{
      id: 1,
      title: 'Introduction to Learning',
      subject: 'General',
      difficulty: 'Beginner',
      duration: '30 mins',
      type: 'Interactive',
      accessibility: ['Audio Support']
    }];
  }

  static parseJSON(response) {
    try {
      let clean = response.trim();
      if (clean.startsWith('```json')) clean = clean.replace(/```json\n?/, '').replace(/```\s*$/, '');
      
      const arrayStart = clean.indexOf('[');
      const objectStart = clean.indexOf('{');
      
      if (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) {
        clean = clean.substring(arrayStart, clean.lastIndexOf(']') + 1);
      } else if (objectStart !== -1) {
        clean = clean.substring(objectStart, clean.lastIndexOf('}') + 1);
      }
      
      return JSON.parse(clean);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      return null;
    }
  }
}