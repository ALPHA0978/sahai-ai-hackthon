import { useState } from 'react';
import { 
  Heart, Stethoscope, Pill, Calendar, User, 
  AlertTriangle, CheckCircle, ArrowLeft, Send, 
  Loader, Activity, Apple, Dumbbell, Phone
} from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const AIHealthcareTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('diagnosis');
  const [symptoms, setSymptoms] = useState({
    description: '',
    pain: '',
    fever: false,
    fatigue: false,
    duration: '',
    severity: ''
  });
  const [medicalHistory, setMedicalHistory] = useState({
    pastDiseases: '',
    allergies: '',
    medications: '',
    familyHistory: '',
    lifestyle: ''
  });
  const [foodQuery, setFoodQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState(null);

  const analyzeSymptomsWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI medical assistant. Analyze symptoms and provide preliminary diagnosis as JSON:
      {
        "preliminaryDiagnosis": [
          {
            "condition": "condition name",
            "probability": "percentage",
            "severity": "Mild|Moderate|Severe",
            "description": "condition description"
          }
        ],
        "recommendations": {
          "urgency": "Low|Medium|High|Emergency",
          "nextSteps": ["step1", "step2"],
          "doctorConsultation": "Yes|No",
          "specialistType": "specialist type if needed",
          "homeRemedies": ["remedy1", "remedy2"],
          "warningSignsToWatch": ["sign1", "sign2"]
        },
        "additionalTests": ["test1", "test2"],
        "disclaimer": "This is not a substitute for professional medical advice"
      }`;

      const prompt = `Analyze these symptoms:
      Description: ${symptoms.description}
      Pain: ${symptoms.pain}
      Fever: ${symptoms.fever ? 'Yes' : 'No'}
      Fatigue: ${symptoms.fatigue ? 'Yes' : 'No'}
      Duration: ${symptoms.duration}
      Severity: ${symptoms.severity}
      
      Medical History:
      Past Diseases: ${medicalHistory.pastDiseases}
      Allergies: ${medicalHistory.allergies}
      Current Medications: ${medicalHistory.medications}
      Family History: ${medicalHistory.familyHistory}
      Lifestyle: ${medicalHistory.lifestyle}
      
      Provide preliminary diagnosis and recommendations.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      setDiagnosis(analysis);
      
    } catch (error) {
      console.error('Diagnosis error:', error);
      setDiagnosis({
        error: 'AI diagnosis failed. Please consult a healthcare professional.',
        preliminaryDiagnosis: []
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateTreatmentPlan = async () => {
    if (!diagnosis || diagnosis.error) return;
    
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI healthcare assistant. Create personalized treatment plan as JSON:
      {
        "treatmentPlan": {
          "medications": [
            {
              "name": "medication name",
              "dosage": "dosage info",
              "frequency": "frequency",
              "duration": "duration",
              "notes": "special instructions"
            }
          ],
          "homeRemedies": ["remedy1", "remedy2"],
          "lifestyle": ["change1", "change2"],
          "exercises": [
            {
              "type": "exercise type",
              "description": "exercise description",
              "duration": "duration",
              "frequency": "frequency"
            }
          ],
          "yoga": [
            {
              "pose": "yoga pose name",
              "benefits": "benefits",
              "instructions": "how to do it"
            }
          ],
          "diet": {
            "recommendations": ["food1", "food2"],
            "avoid": ["avoid1", "avoid2"],
            "mealPlan": "sample meal plan"
          }
        },
        "monitoring": {
          "trackSymptoms": ["symptom1", "symptom2"],
          "checkupSchedule": "follow-up timeline",
          "emergencySignals": ["signal1", "signal2"]
        }
      }`;

      const topCondition = diagnosis.preliminaryDiagnosis?.[0];
      const prompt = `Create treatment plan for: ${topCondition?.condition}
      Severity: ${topCondition?.severity}
      Patient symptoms: ${symptoms.description}
      Medical history: ${medicalHistory.pastDiseases}
      Allergies: ${medicalHistory.allergies}`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const plan = OpenRouterService.parseJSON(response);
      setTreatmentPlan(plan);
      
    } catch (error) {
      console.error('Treatment plan error:', error);
      setTreatmentPlan({
        error: 'Failed to generate treatment plan. Please consult a healthcare professional.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeNutrition = async () => {
    if (!foodQuery.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are a nutrition expert. Provide detailed food packet-style nutritional information as JSON:
      {
        "food": "food name",
        "brand": "brand name if applicable",
        "servingSize": "per 100g",
        "servingsPerContainer": "number of servings",
        "nutrition": {
          "calories": "kcal",
          "caloriesFromFat": "kcal from fat",
          "totalFat": "grams",
          "saturatedFat": "grams",
          "transFat": "grams",
          "cholesterol": "mg",
          "sodium": "mg",
          "totalCarbohydrates": "grams",
          "dietaryFiber": "grams",
          "sugars": "grams",
          "addedSugars": "grams",
          "protein": "grams"
        },
        "vitamins": {
          "vitaminA": "IU or mcg",
          "vitaminC": "mg",
          "vitaminD": "IU or mcg",
          "vitaminE": "mg",
          "vitaminK": "mcg",
          "thiamine": "mg",
          "riboflavin": "mg",
          "niacin": "mg",
          "vitaminB6": "mg",
          "folate": "mcg",
          "vitaminB12": "mcg"
        },
        "minerals": {
          "calcium": "mg",
          "iron": "mg",
          "magnesium": "mg",
          "phosphorus": "mg",
          "potassium": "mg",
          "zinc": "mg",
          "copper": "mg",
          "manganese": "mg",
          "selenium": "mcg"
        },
        "dailyValues": {
          "totalFat": "% DV",
          "saturatedFat": "% DV",
          "cholesterol": "% DV",
          "sodium": "% DV",
          "totalCarbohydrates": "% DV",
          "dietaryFiber": "% DV",
          "protein": "% DV",
          "vitaminA": "% DV",
          "vitaminC": "% DV",
          "calcium": "% DV",
          "iron": "% DV"
        },
        "ingredients": ["ingredient1", "ingredient2"],
        "allergens": ["allergen1", "allergen2"],
        "healthBenefits": ["benefit1", "benefit2"],
        "nutritionGrade": "A|B|C|D|F",
        "suitableFor": ["diet type1", "diet type2"],
        "avoidIf": ["condition1", "condition2"],
        "storageInstructions": "storage info",
        "shelfLife": "shelf life info"
      }`;

      const prompt = `Provide detailed nutritional analysis for: ${foodQuery}`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const nutrition = OpenRouterService.parseJSON(response);
      setNutritionInfo(nutrition);
      
    } catch (error) {
      console.error('Nutrition analysis error:', error);
      setNutritionInfo({
        error: 'Failed to analyze nutrition. Please try again.',
        food: foodQuery
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Solutions</span>
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-100 text-red-700 mb-4">
            <Heart size={16} />
            <span className="text-sm font-medium">SDG 3 - Good Health and Well-being</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI for Healthcare
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Early disease diagnosis, personalized treatment recommendations, telemedicine support, 
            and nutrition analysis powered by AI for better health outcomes.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'diagnosis', label: 'Symptom Analysis', icon: <Stethoscope size={16} /> },
            { id: 'treatment', label: 'Treatment Plan', icon: <Pill size={16} /> },
            { id: 'nutrition', label: 'Nutrition Analysis', icon: <Apple size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-red-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Symptom Analysis Tab */}
        {activeTab === 'diagnosis' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Symptom Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Symptom Check</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Describe how you feel</label>
                  <textarea
                    value={symptoms.description}
                    onChange={(e) => setSymptoms(prev => ({...prev, description: e.target.value}))}
                    placeholder="Describe your symptoms in detail..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pain description</label>
                  <input
                    type="text"
                    value={symptoms.pain}
                    onChange={(e) => setSymptoms(prev => ({...prev, pain: e.target.value}))}
                    placeholder="Location and type of pain"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={symptoms.fever}
                      onChange={(e) => setSymptoms(prev => ({...prev, fever: e.target.checked}))}
                      className="rounded"
                    />
                    <label className="text-sm text-gray-700">Fever/Chills</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={symptoms.fatigue}
                      onChange={(e) => setSymptoms(prev => ({...prev, fatigue: e.target.checked}))}
                      className="rounded"
                    />
                    <label className="text-sm text-gray-700">Fatigue</label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <select
                      value={symptoms.duration}
                      onChange={(e) => setSymptoms(prev => ({...prev, duration: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select duration</option>
                      <option value="1-2 days">1-2 days</option>
                      <option value="3-7 days">3-7 days</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="More than 2 weeks">More than 2 weeks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                    <select
                      value={symptoms.severity}
                      onChange={(e) => setSymptoms(prev => ({...prev, severity: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select severity</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                </div>

                <h4 className="font-medium text-gray-900 mt-6 mb-3">Medical History</h4>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    value={medicalHistory.pastDiseases}
                    onChange={(e) => setMedicalHistory(prev => ({...prev, pastDiseases: e.target.value}))}
                    placeholder="Past diseases/surgeries"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="text"
                    value={medicalHistory.allergies}
                    onChange={(e) => setMedicalHistory(prev => ({...prev, allergies: e.target.value}))}
                    placeholder="Allergies"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="text"
                    value={medicalHistory.familyHistory}
                    onChange={(e) => setMedicalHistory(prev => ({...prev, familyHistory: e.target.value}))}
                    placeholder="Family medical history"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <button
                  onClick={analyzeSymptomsWithAI}
                  disabled={!symptoms.description || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Stethoscope className="w-5 h-5" />
                      <span>Analyze Symptoms</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Diagnosis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Diagnosis</h3>
              
              {isAnalyzing && (
                <div className="text-center py-12">
                  <Stethoscope className="w-12 h-12 text-red-600 animate-pulse mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing your symptoms...</p>
                </div>
              )}

              {diagnosis && !isAnalyzing && (
                <div className="space-y-6">
                  {diagnosis.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{diagnosis.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Preliminary Diagnosis */}
                      {diagnosis.preliminaryDiagnosis && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Possible Conditions</h4>
                          {diagnosis.preliminaryDiagnosis.slice(0, 3).map((condition, index) => (
                            <div key={index} className="p-3 bg-blue-50 rounded-lg mb-2">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-blue-800">{condition.condition}</h5>
                                <span className="text-sm font-semibold text-blue-700">{condition.probability}</span>
                              </div>
                              <p className="text-sm text-blue-700 mb-1">{condition.description}</p>
                              <span className={`text-xs px-2 py-1 rounded ${
                                condition.severity === 'Mild' ? 'bg-green-200 text-green-700' :
                                condition.severity === 'Moderate' ? 'bg-yellow-200 text-yellow-700' : 'bg-red-200 text-red-700'
                              }`}>
                                {condition.severity}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Recommendations */}
                      {diagnosis.recommendations && (
                        <div className="space-y-4">
                          <div className={`p-4 rounded-lg ${
                            diagnosis.recommendations.urgency === 'Emergency' ? 'bg-red-50 border-l-4 border-red-500' :
                            diagnosis.recommendations.urgency === 'High' ? 'bg-orange-50 border-l-4 border-orange-500' :
                            diagnosis.recommendations.urgency === 'Medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-green-50 border-l-4 border-green-500'
                          }`}>
                            <h4 className="font-semibold mb-2">Urgency: {diagnosis.recommendations.urgency}</h4>
                            <p className="text-sm mb-2">Doctor Consultation: {diagnosis.recommendations.doctorConsultation}</p>
                            {diagnosis.recommendations.specialistType && (
                              <p className="text-sm">Specialist: {diagnosis.recommendations.specialistType}</p>
                            )}
                          </div>

                          {diagnosis.recommendations.homeRemedies && (
                            <div className="p-3 bg-green-50 rounded-lg">
                              <h5 className="font-medium text-green-800 mb-2">Home Remedies</h5>
                              <ul className="space-y-1">
                                {diagnosis.recommendations.homeRemedies.map((remedy, index) => (
                                  <li key={index} className="text-sm text-green-700">• {remedy}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <button
                            onClick={generateTreatmentPlan}
                            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Pill className="w-4 h-4" />
                            <span>Generate Treatment Plan</span>
                          </button>
                        </div>
                      )}

                      {diagnosis.disclaimer && (
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          <p className="text-xs text-gray-600">{diagnosis.disclaimer}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!diagnosis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your symptoms to get AI-powered preliminary diagnosis</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Treatment Plan Tab */}
        {activeTab === 'treatment' && (
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personalized Treatment Plan</h3>
            
            {treatmentPlan && !treatmentPlan.error ? (
              <div className="space-y-6">
                {/* Medications */}
                {treatmentPlan.treatmentPlan?.medications && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Pill className="w-5 h-5 text-blue-600 mr-2" />
                      Medications
                    </h4>
                    {treatmentPlan.treatmentPlan.medications.map((med, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg mb-2">
                        <h5 className="font-medium text-blue-800">{med.name}</h5>
                        <p className="text-sm text-blue-700">Dosage: {med.dosage} | Frequency: {med.frequency}</p>
                        <p className="text-sm text-blue-600">{med.notes}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Exercises & Yoga */}
                <div className="grid md:grid-cols-2 gap-6">
                  {treatmentPlan.treatmentPlan?.exercises && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Dumbbell className="w-5 h-5 text-green-600 mr-2" />
                        Exercises
                      </h4>
                      {treatmentPlan.treatmentPlan.exercises.map((exercise, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg mb-2">
                          <h5 className="font-medium text-green-800">{exercise.type}</h5>
                          <p className="text-sm text-green-700">{exercise.description}</p>
                          <p className="text-sm text-green-600">{exercise.duration} - {exercise.frequency}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {treatmentPlan.treatmentPlan?.yoga && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Activity className="w-5 h-5 text-purple-600 mr-2" />
                        Yoga
                      </h4>
                      {treatmentPlan.treatmentPlan.yoga.map((pose, index) => (
                        <div key={index} className="p-3 bg-purple-50 rounded-lg mb-2">
                          <h5 className="font-medium text-purple-800">{pose.pose}</h5>
                          <p className="text-sm text-purple-700">{pose.benefits}</p>
                          <p className="text-sm text-purple-600">{pose.instructions}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Diet Recommendations */}
                {treatmentPlan.treatmentPlan?.diet && (
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-3">Diet Recommendations</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-orange-700 mb-2">Recommended Foods</h5>
                        <ul className="space-y-1">
                          {treatmentPlan.treatmentPlan.diet.recommendations?.map((food, index) => (
                            <li key={index} className="text-sm text-orange-600">• {food}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-orange-700 mb-2">Foods to Avoid</h5>
                        <ul className="space-y-1">
                          {treatmentPlan.treatmentPlan.diet.avoid?.map((food, index) => (
                            <li key={index} className="text-sm text-red-600">• {food}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Pill className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Complete symptom analysis first to generate personalized treatment plan</p>
              </div>
            )}
          </div>
        )}

        {/* Nutrition Analysis Tab */}
        {activeTab === 'nutrition' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Food Query Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Food Nutrition Analysis</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter food item</label>
                  <input
                    type="text"
                    value={foodQuery}
                    onChange={(e) => setFoodQuery(e.target.value)}
                    placeholder="e.g., banana, chicken breast, spinach"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  onClick={analyzeNutrition}
                  disabled={!foodQuery.trim() || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Apple className="w-5 h-5" />
                      <span>Analyze Nutrition</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Nutrition Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Nutritional Information</h3>
              
              {nutritionInfo && !nutritionInfo.error ? (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <h4 className="text-xl font-bold text-orange-800">{nutritionInfo.food}</h4>
                    <p className="text-sm text-orange-600">{nutritionInfo.servingSize}</p>
                  </div>

                  {/* Nutrition Facts Label */}
                  <div className="border border-gray-300 p-4 bg-white rounded-lg">
                    <h4 className="text-xl font-bold text-gray-900 text-center border-b border-gray-300 pb-2 mb-3">Nutrition Facts</h4>
                    
                    <div className="space-y-2 text-sm text-gray-900">
                      <div className="flex justify-between pb-1">
                        <span className="font-medium text-gray-900">Serving Size</span>
                        <span className="text-gray-900">{nutritionInfo.servingSize}</span>
                      </div>
                      
                      {nutritionInfo.servingsPerContainer && (
                        <div className="flex justify-between pb-1">
                          <span className="font-medium text-gray-900">Servings Per Container</span>
                          <span className="text-gray-900">{nutritionInfo.servingsPerContainer}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-400 py-2">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">Calories</span>
                          <span className="text-lg font-bold text-gray-900">{nutritionInfo.nutrition?.calories}</span>
                        </div>
                        {nutritionInfo.nutrition?.caloriesFromFat && (
                          <div className="text-right text-sm text-gray-700">Calories from Fat {nutritionInfo.nutrition.caloriesFromFat}</div>
                        )}
                      </div>
                      
                      <div className="text-right text-xs font-bold text-gray-900 pb-1">% Daily Value*</div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-900"><strong>Total Fat</strong> {nutritionInfo.nutrition?.totalFat}</span>
                          <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.totalFat}</span>
                        </div>
                        
                        {nutritionInfo.nutrition?.saturatedFat && (
                          <div className="flex justify-between pl-4">
                            <span className="text-gray-900">Saturated Fat {nutritionInfo.nutrition.saturatedFat}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.saturatedFat}</span>
                          </div>
                        )}
                        
                        {nutritionInfo.nutrition?.cholesterol && (
                          <div className="flex justify-between">
                            <span className="text-gray-900"><strong>Cholesterol</strong> {nutritionInfo.nutrition.cholesterol}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.cholesterol}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-gray-900"><strong>Sodium</strong> {nutritionInfo.nutrition?.sodium}</span>
                          <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.sodium}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-900"><strong>Total Carbohydrates</strong> {nutritionInfo.nutrition?.totalCarbohydrates}</span>
                          <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.totalCarbohydrates}</span>
                        </div>
                        
                        {nutritionInfo.nutrition?.dietaryFiber && (
                          <div className="flex justify-between pl-4">
                            <span className="text-gray-900">Dietary Fiber {nutritionInfo.nutrition.dietaryFiber}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.dietaryFiber}</span>
                          </div>
                        )}
                        
                        {nutritionInfo.nutrition?.sugars && (
                          <div className="flex justify-between pl-4">
                            <span className="text-gray-900">Total Sugars {nutritionInfo.nutrition.sugars}</span>
                            <span className="text-gray-900">-</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between border-t border-gray-400 pt-2">
                          <span className="text-gray-900"><strong>Protein</strong> {nutritionInfo.nutrition?.protein}</span>
                          <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.protein}</span>
                        </div>
                      </div>
                      
                      {/* Vitamins and Minerals */}
                      <div className="space-y-1 pt-2 border-t border-gray-300">
                        {nutritionInfo.vitamins?.vitaminA && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Vitamin A {nutritionInfo.vitamins.vitaminA}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.vitaminA}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.vitaminC && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Vitamin C {nutritionInfo.vitamins.vitaminC}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.vitaminC}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.vitaminD && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Vitamin D {nutritionInfo.vitamins.vitaminD}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.vitaminD}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.vitaminE && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Vitamin E {nutritionInfo.vitamins.vitaminE}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.vitaminE}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.vitaminK && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Vitamin K {nutritionInfo.vitamins.vitaminK}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.vitaminK}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.thiamine && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Thiamine (B1) {nutritionInfo.vitamins.thiamine}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.thiamine}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.riboflavin && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Riboflavin (B2) {nutritionInfo.vitamins.riboflavin}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.riboflavin}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.niacin && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Niacin (B3) {nutritionInfo.vitamins.niacin}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.niacin}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.vitaminB6 && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Vitamin B6 {nutritionInfo.vitamins.vitaminB6}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.vitaminB6}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.folate && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Folate {nutritionInfo.vitamins.folate}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.folate}</span>
                          </div>
                        )}
                        {nutritionInfo.vitamins?.vitaminB12 && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Vitamin B12 {nutritionInfo.vitamins.vitaminB12}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.vitaminB12}</span>
                          </div>
                        )}
                        {nutritionInfo.minerals?.calcium && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Calcium {nutritionInfo.minerals.calcium}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.calcium}</span>
                          </div>
                        )}
                        {nutritionInfo.minerals?.iron && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Iron {nutritionInfo.minerals.iron}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.iron}</span>
                          </div>
                        )}
                        {nutritionInfo.minerals?.magnesium && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Magnesium {nutritionInfo.minerals.magnesium}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.magnesium}</span>
                          </div>
                        )}
                        {nutritionInfo.minerals?.phosphorus && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Phosphorus {nutritionInfo.minerals.phosphorus}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.phosphorus}</span>
                          </div>
                        )}
                        {nutritionInfo.minerals?.potassium && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Potassium {nutritionInfo.minerals.potassium}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.potassium}</span>
                          </div>
                        )}
                        {nutritionInfo.minerals?.zinc && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Zinc {nutritionInfo.minerals.zinc}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.zinc}</span>
                          </div>
                        )}
                        {nutritionInfo.minerals?.copper && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Copper {nutritionInfo.minerals.copper}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.copper}</span>
                          </div>
                        )}
                        {nutritionInfo.minerals?.manganese && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Manganese {nutritionInfo.minerals.manganese}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.manganese}</span>
                          </div>
                        )}
                        {nutritionInfo.minerals?.selenium && (
                          <div className="flex justify-between">
                            <span className="text-gray-900">Selenium {nutritionInfo.minerals.selenium}</span>
                            <span className="font-bold text-gray-900">{nutritionInfo.dailyValues?.selenium}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs pt-2 border-t border-gray-300 text-gray-700">
                        *The % Daily Value tells you how much a nutrient in a serving contributes to a daily diet.
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {nutritionInfo.ingredients && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-800 mb-2">Ingredients</h5>
                        <p className="text-sm text-gray-700">{nutritionInfo.ingredients.join(', ')}</p>
                      </div>
                    )}
                    
                    {nutritionInfo.allergens && (
                      <div className="p-3 bg-red-50 rounded-lg">
                        <h5 className="font-medium text-red-800 mb-2">⚠️ Allergens</h5>
                        <div className="flex flex-wrap gap-1">
                          {nutritionInfo.allergens.map((allergen, index) => (
                            <span key={index} className="px-2 py-1 bg-red-200 text-red-700 text-xs rounded">
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {nutritionInfo.nutritionGrade && (
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${
                        nutritionInfo.nutritionGrade === 'A' ? 'bg-green-500 text-white' :
                        nutritionInfo.nutritionGrade === 'B' ? 'bg-blue-500 text-white' :
                        nutritionInfo.nutritionGrade === 'C' ? 'bg-yellow-500 text-white' :
                        nutritionInfo.nutritionGrade === 'D' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {nutritionInfo.nutritionGrade}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Nutrition Grade</p>
                    </div>
                  )}

                  {/* Health Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {nutritionInfo.healthBenefits && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h5 className="font-medium text-green-800 mb-2">✅ Health Benefits</h5>
                        <ul className="space-y-1">
                          {nutritionInfo.healthBenefits.map((benefit, index) => (
                            <li key={index} className="text-sm text-green-700">• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {nutritionInfo.suitableFor && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-800 mb-2">🎯 Suitable For</h5>
                        <div className="flex flex-wrap gap-2">
                          {nutritionInfo.suitableFor.map((diet, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-200 text-blue-700 text-xs rounded">
                              {diet}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {nutritionInfo.storageInstructions && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h5 className="font-medium text-yellow-800 mb-2">📦 Storage Instructions</h5>
                      <p className="text-sm text-yellow-700">{nutritionInfo.storageInstructions}</p>
                      {nutritionInfo.shelfLife && (
                        <p className="text-sm text-yellow-600 mt-1">Shelf Life: {nutritionInfo.shelfLife}</p>
                      )}
                    </div>
                  )}
                </div>
              ) : nutritionInfo?.error ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600">{nutritionInfo.error}</p>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Apple className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a food item to get detailed nutritional analysis</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIHealthcareTool;