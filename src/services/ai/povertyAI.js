import { BaseAI } from './baseAI.js';

export class PovertyAI extends BaseAI {
  static async assessPoverty(householdData) {
    const systemPrompt = `Assess poverty level and return JSON:
{
  "povertyLevel": "Below Poverty Line|Above Poverty Line",
  "score": number (0-100),
  "interventions": ["intervention1", "intervention2"],
  "resources": ["resource1", "resource2"]
}`;

    const response = await this.callAPI(`Household: ${JSON.stringify(householdData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultAssessment();
  }

  static async suggestInterventions(povertyData) {
    const systemPrompt = `Suggest poverty interventions in JSON array:
[{
  "intervention": "intervention name",
  "impact": "High|Medium|Low",
  "timeline": "timeline estimate"
}]`;

    const response = await this.callAPI(`Data: ${JSON.stringify(povertyData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultInterventions();
  }

  static getDefaultAssessment() {
    return {
      povertyLevel: 'Assessment needed',
      score: 50,
      interventions: ['Skill development', 'Financial assistance'],
      resources: ['Government schemes', 'NGO support']
    };
  }

  static getDefaultInterventions() {
    return [{
      intervention: 'Skill Training',
      impact: 'High',
      timeline: '6 months'
    }];
  }
}