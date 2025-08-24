import { BaseAI } from './baseAI.js';

export class SustainableAI extends BaseAI {
  static async analyzeSustainability(farmData) {
    const systemPrompt = `Analyze farming sustainability and return JSON:
{
  "sustainabilityScore": number (0-100),
  "practices": ["practice1", "practice2"],
  "improvements": ["improvement1", "improvement2"],
  "carbonFootprint": "footprint estimate"
}`;

    const response = await this.callAPI(`Farm: ${JSON.stringify(farmData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultSustainability();
  }

  static async suggestPractices(currentPractices) {
    const systemPrompt = `Suggest sustainable practices in JSON array:
[{
  "practice": "practice name",
  "benefit": "environmental benefit",
  "implementation": "how to implement"
}]`;

    const response = await this.callAPI(`Current: ${currentPractices}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultPractices();
  }

  static getDefaultSustainability() {
    return {
      sustainabilityScore: 75,
      practices: ['Organic farming', 'Water conservation'],
      improvements: ['Reduce chemical use', 'Implement crop rotation'],
      carbonFootprint: 'Medium impact'
    };
  }

  static getDefaultPractices() {
    return [{
      practice: 'Crop Rotation',
      benefit: 'Soil health improvement',
      implementation: 'Rotate crops seasonally'
    }];
  }
}