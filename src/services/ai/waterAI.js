import { BaseAI } from './baseAI.js';

export class WaterAI extends BaseAI {
  static async analyzeWaterQuality(waterData) {
    const systemPrompt = `Analyze water quality and return JSON:
{
  "quality": "Excellent|Good|Fair|Poor",
  "contaminants": ["contaminant1", "contaminant2"],
  "treatment": ["treatment1", "treatment2"],
  "safety": "Safe|Unsafe"
}`;

    const response = await this.callAPI(`Water data: ${JSON.stringify(waterData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultQuality();
  }

  static async optimizeUsage(usageData) {
    const systemPrompt = `Optimize water usage and return JSON:
{
  "currentUsage": "usage amount",
  "optimizedUsage": "optimized amount",
  "savings": "potential savings",
  "recommendations": ["rec1", "rec2"]
}`;

    const response = await this.callAPI(`Usage: ${JSON.stringify(usageData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultOptimization();
  }

  static getDefaultQuality() {
    return {
      quality: 'Good',
      contaminants: ['None detected'],
      treatment: ['Basic filtration'],
      safety: 'Safe'
    };
  }

  static getDefaultOptimization() {
    return {
      currentUsage: '200L per day',
      optimizedUsage: '150L per day',
      savings: '25% reduction',
      recommendations: ['Fix leaks', 'Use efficient fixtures']
    };
  }
}