import { BaseAI } from './baseAI.js';

export class HealthcareAI extends BaseAI {
  static async analyzeSymptoms(symptoms) {
    const systemPrompt = `Analyze symptoms and return JSON:
{
  "assessment": "preliminary assessment",
  "recommendations": ["rec1", "rec2"],
  "urgency": "Low|Medium|High",
  "specialists": ["specialist1", "specialist2"]
}`;

    const response = await this.callAPI(`Symptoms: ${symptoms}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultAssessment();
  }

  static async suggestTreatment(condition) {
    const systemPrompt = `Suggest treatment options in JSON array:
[{
  "treatment": "treatment name",
  "description": "treatment description",
  "effectiveness": "High|Medium|Low"
}]`;

    const response = await this.callAPI(`Condition: ${condition}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultTreatments();
  }

  static getDefaultAssessment() {
    return {
      assessment: 'Consult healthcare professional',
      recommendations: ['Rest', 'Stay hydrated'],
      urgency: 'Medium',
      specialists: ['General Physician']
    };
  }

  static getDefaultTreatments() {
    return [{
      treatment: 'General Care',
      description: 'Basic healthcare recommendations',
      effectiveness: 'Medium'
    }];
  }
}