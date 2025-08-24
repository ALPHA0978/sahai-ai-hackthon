import { BaseAI } from './baseAI.js';

export class FarmerAI extends BaseAI {
  static async analyzeCrop(cropData) {
    const systemPrompt = `Analyze crop data and return JSON:
{
  "cropHealth": "Excellent|Good|Fair|Poor",
  "yieldPrediction": "estimated yield",
  "recommendations": ["rec1", "rec2"],
  "diseases": [{"name": "disease", "severity": "Low|Medium|High"}],
  "fertilizers": [{"name": "fertilizer", "quantity": "amount"}]
}`;

    const response = await this.callAPI(`Crop: ${JSON.stringify(cropData)}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultCropAnalysis();
  }

  static async getWeatherAdvice(location, cropType) {
    const systemPrompt = `Provide weather-based farming advice in JSON:
{
  "advice": "farming advice based on weather",
  "actions": ["action1", "action2"],
  "warnings": ["warning1", "warning2"]
}`;

    const response = await this.callAPI(`Location: ${location}, Crop: ${cropType}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultWeatherAdvice();
  }

  static async suggestCrops(soilData, location) {
    const systemPrompt = `Suggest suitable crops in JSON array:
[{
  "name": "crop name",
  "suitability": "High|Medium|Low",
  "season": "Kharif|Rabi|Zaid",
  "expectedYield": "yield estimate",
  "marketPrice": "price range"
}]`;

    const response = await this.callAPI(`Soil: ${JSON.stringify(soilData)}, Location: ${location}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultCrops();
  }

  static async getMarketPrices(crops, location) {
    const systemPrompt = `Get market prices in JSON array:
[{
  "crop": "crop name",
  "price": "current price",
  "trend": "Rising|Falling|Stable",
  "market": "market name"
}]`;

    const response = await this.callAPI(`Crops: ${crops.join(', ')}, Location: ${location}`, systemPrompt);
    return this.parseJSON(response) || this.getDefaultPrices();
  }

  static getDefaultCropAnalysis() {
    return {
      cropHealth: 'Good',
      yieldPrediction: '80% of expected yield',
      recommendations: ['Regular watering', 'Monitor for pests'],
      diseases: [{name: 'None detected', severity: 'Low'}],
      fertilizers: [{name: 'NPK', quantity: '50kg per acre'}]
    };
  }

  static getDefaultWeatherAdvice() {
    return {
      advice: 'Monitor weather conditions regularly',
      actions: ['Check soil moisture', 'Prepare for seasonal changes'],
      warnings: ['Watch for extreme weather']
    };
  }

  static getDefaultCrops() {
    return [{
      name: 'Rice',
      suitability: 'High',
      season: 'Kharif',
      expectedYield: '25-30 quintals per acre',
      marketPrice: '₹1800-2200 per quintal'
    }];
  }

  static getDefaultPrices() {
    return [{
      crop: 'Wheat',
      price: '₹2000 per quintal',
      trend: 'Stable',
      market: 'Local Mandi'
    }];
  }
}