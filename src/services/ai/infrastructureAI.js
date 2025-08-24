const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export class InfrastructureAI {
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

  static async analyzeProject(projectData) {
    const systemPrompt = `Analyze infrastructure project and return JSON:
{
  "feasibilityScore": number (60-95),
  "feasibilityReason": "brief explanation",
  "trafficImprovement": "percentage or description",
  "riskLevel": "Low|Medium|High",
  "recommendations": ["rec1", "rec2", "rec3"]
}`;

    const response = await this.callAPI(`Project: ${JSON.stringify(projectData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultAnalysis(projectData);
  }

  static async optimizeRoute(projectData) {
    const systemPrompt = `Optimize infrastructure route and return JSON:
{
  "optimalPath": "route description",
  "distance": "total distance",
  "estimatedCost": "cost estimate",
  "alternatives": [{"name": "route name", "description": "brief desc"}]
}`;

    const response = await this.callAPI(`Optimize route for: ${JSON.stringify(projectData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultRoute(projectData);
  }

  static async assessImpact(projectData) {
    const systemPrompt = `Assess environmental and social impact, return JSON:
{
  "environmental": [{"factor": "impact type", "description": "details", "severity": "Low|Medium|High"}],
  "social": [{"aspect": "social factor", "impact": "description"}]
}`;

    const response = await this.callAPI(`Assess impact for: ${JSON.stringify(projectData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultImpact();
  }

  static async planResources(projectData) {
    const systemPrompt = `Plan resources and timeline, return JSON:
{
  "totalCost": "cost with currency",
  "duration": "project duration",
  "resourceCount": "number of resources",
  "materials": [{"name": "material name", "quantity": "amount needed"}],
  "timeline": [{"phase": "phase name", "duration": "time needed"}]
}`;

    const response = await this.callAPI(`Plan resources for: ${JSON.stringify(projectData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultResources(projectData);
  }

  static getDefaultAnalysis(projectData) {
    return {
      feasibilityScore: 78,
      feasibilityReason: 'Good potential with proper planning',
      trafficImprovement: '35% reduction in travel time',
      riskLevel: 'Medium',
      recommendations: ['Conduct detailed soil survey', 'Plan for monsoon delays', 'Ensure proper drainage']
    };
  }

  static getDefaultRoute(projectData) {
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

  static getDefaultImpact() {
    return {
      environmental: [
        {factor: 'Air Quality', description: 'Temporary increase in dust during construction', severity: 'Medium'},
        {factor: 'Noise Pollution', description: 'Construction noise in nearby areas', severity: 'Medium'}
      ],
      social: [
        {aspect: 'Employment', impact: 'Create 500+ construction jobs'},
        {aspect: 'Connectivity', impact: 'Improve access to markets and services'}
      ]
    };
  }

  static getDefaultResources(projectData) {
    return {
      totalCost: projectData.budget || '₹300 crores',
      duration: projectData.timeline || '2.5 years',
      resourceCount: '15 major resources',
      materials: [
        {name: 'Concrete', quantity: '50,000 cubic meters'},
        {name: 'Steel', quantity: '5,000 tons'}
      ],
      timeline: [
        {phase: 'Planning & Approvals', duration: '6 months'},
        {phase: 'Construction Phase 1', duration: '12 months'}
      ]
    };
  }

  static parseJSON(response) {
    try {
      let clean = response.trim();
      if (clean.startsWith('```json')) clean = clean.replace(/```json\n?/, '').replace(/```\s*$/, '');
      
      const objectStart = clean.indexOf('{');
      if (objectStart !== -1) {
        clean = clean.substring(objectStart, clean.lastIndexOf('}') + 1);
      }
      
      return JSON.parse(clean);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      return null;
    }
  }
}