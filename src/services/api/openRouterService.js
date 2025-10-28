import { EnhancedSchemeAI } from '../ai/enhancedSchemeAI.js';
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

  // Delegate to EnhancedSchemeAI
  static async analyzeDocument(documentText, language = 'en') {
    return EnhancedSchemeAI.analyzeDocument(documentText, language);
  }

  static async findSchemes(userProfile, language = 'en') {
    return EnhancedSchemeAI.findSchemes(userProfile, language);
  }

  static async getPopularSchemes(language = 'en') {
    return EnhancedSchemeAI.getPopularSchemes(language);
  }

  static async searchSchemes(query, filters = {}, language = 'en') {
    return EnhancedSchemeAI.searchSchemes(query, filters, language);
  }

  static async getSchemeDetails(schemeId, language = 'en') {
    return EnhancedSchemeAI.getSchemeDetails(schemeId, language);
  }

  static async checkSchemeStatus(schemeIds, language = 'en') {
    return EnhancedSchemeAI.checkSchemeStatus(schemeIds, language);
  }

  // Delegate to EducationAI - Enhanced methods
  static async generateEducationAssessment(studentProfile) {
    return EducationAI.generateAssessment(studentProfile);
  }

  static async generateLearningRecommendations(studentProfile) {
    return EducationAI.generateAssessment(studentProfile);
  }

  static async generatePersonalizedLessons(studentProfile, subject, count = 5) {
    return EducationAI.generateLessons(studentProfile, subject, count);
  }

  static async chatWithAI(message, studentContext) {
    return EducationAI.chatWithAI(message, studentContext);
  }

  static async analyzeStudentSkillGaps(studentProfile, targetLevel) {
    return EducationAI.analyzeSkillGaps(studentProfile, targetLevel);
  }

  static async provideStudentCareerGuidance(studentProfile, interests) {
    return EducationAI.provideCareerGuidance(studentProfile, interests);
  }

  static async trackStudentProgress(studentId, assessmentData) {
    return EducationAI.trackProgress(studentId, assessmentData);
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

  // Delegate to InfrastructureAI - Enhanced methods
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

  static async planSmartCity(cityData) {
    return InfrastructureAI.planSmartCity(cityData);
  }

  // Delegate to CareerAI - Enhanced methods
  static async analyzeSkillGaps(jobProfile) {
    return CareerAI.analyzeSkillGaps(jobProfile);
  }

  static async generateResumeTips(jobProfile, targetJob = null) {
    return CareerAI.generateResumeTips(jobProfile, targetJob);
  }

  static async generateInterviewQuestions(jobTitle, skills, companyInfo = null) {
    return CareerAI.generateInterviewQuestions(jobTitle, skills, companyInfo);
  }

  static async analyzeJobMarket(industry, location, role) {
    return CareerAI.analyzeJobMarket(industry, location, role);
  }

  static async planCareerTransition(currentProfile, targetCareer) {
    return CareerAI.planCareerTransition(currentProfile, targetCareer);
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

  static async analyzeSoil(soilSample) {
    return FarmerAI.analyzeSoil(soilSample);
  }

  static async planFarmBudget(farmData) {
    return FarmerAI.planFarmBudget(farmData);
  }

  static async detectPlantDisease(imageDescription) {
    return FarmerAI.detectPlantDisease(imageDescription);
  }

  static async optimizeIrrigation(farmData) {
    return FarmerAI.optimizeIrrigation(farmData);
  }

  // Delegate to HealthcareAI - Enhanced methods
  static async analyzeSymptoms(symptoms, patientProfile = {}) {
    return HealthcareAI.analyzeSymptoms(symptoms, patientProfile);
  }

  static async suggestTreatment(condition, patientProfile = {}) {
    return HealthcareAI.suggestTreatment(condition, patientProfile);
  }

  static async assessHealthRisk(healthData) {
    return HealthcareAI.assessHealthRisk(healthData);
  }

  static async provideMentalHealthSupport(concerns, urgency = 'medium') {
    return HealthcareAI.provideMentalHealthSupport(concerns, urgency);
  }

  static async getMedicationInfo(medicationName) {
    return HealthcareAI.getMedicationInfo(medicationName);
  }

  static async getEmergencyGuidance(emergency) {
    return HealthcareAI.getEmergencyGuidance(emergency);
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

  // Delegate to EmpowermentAI
  static async analyzeEmpowermentNeeds(userData) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.analyzeEmpowermentNeeds(userData);
  }

  static async suggestEmpowermentPrograms(userProfile) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.suggestEmpowermentPrograms(userProfile);
  }

  static async createEmpowermentActionPlan(empowermentData) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.createActionPlan(empowermentData);
  }

  static async analyzeEmpowermentSkillGaps(currentSkills, targetGoals) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.analyzeSkillGaps(currentSkills, targetGoals);
  }

  static async suggestEmpowermentMentorship(userProfile) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.suggestMentorship(userProfile);
  }

  static async trackEmpowermentProgress(initialAssessment, currentStatus) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.trackProgress(initialAssessment, currentStatus);
  }

  static async detectGenderBias(text, type) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.detectBias(text, type);
  }

  static async processAnonymousReport(reportData) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.processReport(reportData);
  }

  static async analyzePayEquity(salaryData) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.analyzePayEquity(salaryData);
  }

  static async assessPersonalSafety(locationData, userProfile) {
    const { EmpowermentAI } = await import('../ai/empowermentAI.js');
    return EmpowermentAI.assessSafety(locationData, userProfile);
  }

  // Additional FarmerAI methods for market intelligence
  static async analyzeMarketConditions(location, season, soilType) {
    return FarmerAI.analyzeMarketConditions(location, season, soilType);
  }

  static async suggestCropsBasedOnMarket(marketConditions, location, soilType, budget) {
    return FarmerAI.suggestCropsBasedOnMarket(marketConditions, location, soilType, budget);
  }

  static async analyzeGrowthTimeline(crops, season) {
    return FarmerAI.analyzeGrowthTimeline(crops, season);
  }

  static async getFutureValueProjections(crops, timelineData, location) {
    return FarmerAI.getFutureValueProjections(crops, timelineData, location);
  }

  static async analyzeCorporateProcurement(crops, location) {
    return FarmerAI.analyzeCorporateProcurement(crops, location);
  }

  static async analyzeRegionalGaps(crops, location) {
    return FarmerAI.analyzeRegionalGaps(crops, location);
  }

  // Legacy method support
  static parseJSON(response) {
    return BaseAI.parseJSON ? BaseAI.parseJSON(response) : EnhancedSchemeAI.parseJSON(response);
  }
}