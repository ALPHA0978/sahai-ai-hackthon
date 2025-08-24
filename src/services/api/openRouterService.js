import { SchemeAI } from '../ai/schemeAI.js';
import { EducationAI } from '../ai/educationAI.js';
import { JobAI } from '../ai/jobAI.js';
import { InfrastructureAI } from '../ai/infrastructureAI.js';
import { CareerAI } from '../ai/careerAI.js';
import { FarmerAI } from '../ai/farmerAI.js';
import { HealthcareAI } from '../ai/healthcareAI.js';
import { PovertyAI } from '../ai/povertyAI.js';
import { WaterAI } from '../ai/waterAI.js';
import { SustainableAI } from '../ai/sustainableAI.js';
import { BaseAI } from '../ai/baseAI.js';

export class OpenRouterService {
  // Core API method
  static async callAPI(prompt, systemPrompt = '', model = 'google/gemini-flash-1.5') {
    return BaseAI.callAPI(prompt, systemPrompt);
  }

  // Delegate to SchemeAI
  static async analyzeDocument(documentText) {
    return SchemeAI.analyzeDocument(documentText);
  }

  static async findSchemes(userProfile) {
    return SchemeAI.findSchemes(userProfile);
  }

  static async getPopularSchemes() {
    return SchemeAI.getPopularSchemes();
  }

  static getDefaultSchemes() {
    return SchemeAI.getDefaultSchemes();
  }

  // Delegate to EducationAI
  static async generateEducationAssessment(studentProfile) {
    return EducationAI.generateAssessment(studentProfile);
  }

  static async generateLearningRecommendations(studentProfile) {
    return EducationAI.generateAssessment(studentProfile);
  }

  static async generatePersonalizedLessons(studentProfile) {
    return EducationAI.generateLessons(studentProfile);
  }

  static async chatWithAI(message, studentContext) {
    return EducationAI.chatWithAI(message, studentContext);
  }

  // Delegate to JobAI
  static async findMatchingJobs(jobProfile) {
    return JobAI.findJobs(jobProfile);
  }

  static async expandSkills(skillsInput) {
    return JobAI.expandSkills(skillsInput);
  }

  static async searchRealJobs(jobProfile) {
    return JobAI.searchJobs(jobProfile);
  }

  static getJobDatabase() {
    return JobAI.getJobDatabase();
  }

  static getFallbackJobs(jobProfile) {
    return JobAI.getFallbackJobs(jobProfile);
  }

  // Delegate to InfrastructureAI
  static async analyzeInfrastructure(projectData) {
    return InfrastructureAI.analyzeProject(projectData);
  }

  static async optimizeRoute(projectData) {
    return InfrastructureAI.optimizeRoute(projectData);
  }

  static async assessImpact(projectData) {
    return InfrastructureAI.assessImpact(projectData);
  }

  static async planResources(projectData) {
    return InfrastructureAI.planResources(projectData);
  }

  // Delegate to CareerAI
  static async analyzeSkillGaps(jobProfile) {
    return CareerAI.analyzeSkillGaps(jobProfile);
  }

  static async generateResumeTips(jobProfile) {
    return CareerAI.generateResumeTips(jobProfile);
  }

  static async generateInterviewQuestions(jobTitle, skills) {
    return CareerAI.generateInterviewQuestions(jobTitle, skills);
  }

  // Delegate to FarmerAI
  static async analyzeCrop(cropData) {
    return FarmerAI.analyzeCrop(cropData);
  }

  static async getWeatherAdvice(location, cropType) {
    return FarmerAI.getWeatherAdvice(location, cropType);
  }

  static async suggestCrops(soilData, location) {
    return FarmerAI.suggestCrops(soilData, location);
  }

  static async getMarketPrices(crops, location) {
    return FarmerAI.getMarketPrices(crops, location);
  }

  // Delegate to HealthcareAI
  static async analyzeSymptoms(symptoms) {
    return HealthcareAI.analyzeSymptoms(symptoms);
  }

  static async suggestTreatment(condition) {
    return HealthcareAI.suggestTreatment(condition);
  }

  // Delegate to PovertyAI
  static async assessPoverty(householdData) {
    return PovertyAI.assessPoverty(householdData);
  }

  static async suggestInterventions(povertyData) {
    return PovertyAI.suggestInterventions(povertyData);
  }

  // Delegate to WaterAI
  static async analyzeWaterQuality(waterData) {
    return WaterAI.analyzeWaterQuality(waterData);
  }

  static async optimizeWaterUsage(usageData) {
    return WaterAI.optimizeUsage(usageData);
  }

  // Delegate to SustainableAI
  static async analyzeSustainability(farmData) {
    return SustainableAI.analyzeSustainability(farmData);
  }

  static async suggestSustainablePractices(currentPractices) {
    return SustainableAI.suggestPractices(currentPractices);
  }

  // Legacy method support
  static parseJSON(response) {
    return BaseAI.parseJSON ? BaseAI.parseJSON(response) : SchemeAI.parseJSON(response);
  }
}