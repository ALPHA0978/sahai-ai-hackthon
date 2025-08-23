import { useState } from 'react';
import { 
  Leaf, Camera, Droplets, Thermometer, AlertTriangle, 
  CheckCircle, BarChart3, Target, ArrowLeft, Send, 
  Loader, Bug, Beaker, Satellite, Zap, TrendingUp, DollarSign
} from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const SustainableFarmingTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('soil');
  const [soilData, setSoilData] = useState({
    ph: '',
    moisture: '',
    organicMatter: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    salinity: '',
    temperature: ''
  });
  const [cropData, setCropData] = useState({
    cropType: '',
    plantingDate: '',
    fieldSize: '',
    symptoms: '',
    location: '',
    weatherConditions: ''
  });
  const [sensorData, setSensorData] = useState({
    soilMoisture: '',
    airTemperature: '',
    humidity: '',
    lightIntensity: '',
    rainfall: ''
  });
  const [marketData, setMarketData] = useState({
    location: '',
    farmSize: '',
    budget: '',
    season: '',
    soilType: '',
    waterAvailability: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [soilAnalysis, setSoilAnalysis] = useState(null);
  const [cropAnalysis, setCropAnalysis] = useState(null);
  const [monitoringResults, setMonitoringResults] = useState(null);
  const [marketAnalysis, setMarketAnalysis] = useState(null);

  const analyzeSoilWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI agricultural expert specializing in soil analysis. Analyze soil data and provide farming recommendations as JSON:
      {
        "soilHealth": "Excellent|Good|Fair|Poor|Critical",
        "healthScore": number (0-100),
        "analysis": {
          "ph": "analysis of pH levels",
          "nutrients": "nutrient analysis",
          "moisture": "moisture analysis",
          "organicMatter": "organic matter assessment"
        },
        "deficiencies": ["deficiency1", "deficiency2"],
        "recommendations": {
          "fertilizers": ["fertilizer recommendations"],
          "amendments": ["soil amendment suggestions"],
          "irrigation": "irrigation strategy",
          "cropRotation": ["rotation suggestions"]
        },
        "actionPlan": {
          "immediate": ["immediate actions"],
          "shortTerm": ["1-3 month actions"],
          "longTerm": ["seasonal actions"]
        },
        "expectedYield": "yield prediction",
        "costEstimate": "estimated cost for improvements"
      }`;

      const prompt = `Analyze this soil data:
      pH Level: ${soilData.ph}
      Moisture Content: ${soilData.moisture}%
      Organic Matter: ${soilData.organicMatter}%
      Nitrogen (N): ${soilData.nitrogen} ppm
      Phosphorus (P): ${soilData.phosphorus} ppm
      Potassium (K): ${soilData.potassium} ppm
      Salinity: ${soilData.salinity} dS/m
      Temperature: ${soilData.temperature}°C
      
      Provide comprehensive soil analysis and farming recommendations.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      setSoilAnalysis(analysis);
      
    } catch (error) {
      console.error('Soil analysis error:', error);
      setSoilAnalysis({
        error: 'AI soil analysis failed. Please check your data and try again.',
        soilHealth: 'Unknown'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeCropWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI crop health specialist. Analyze crop data and provide disease/pest management recommendations as JSON:
      {
        "cropHealth": "Healthy|At Risk|Diseased|Critical",
        "healthScore": number (0-100),
        "diagnosis": {
          "primaryIssue": "main problem identified",
          "severity": "Low|Medium|High|Critical",
          "confidence": "AI confidence level"
        },
        "diseases": [
          {
            "name": "disease name",
            "probability": "percentage",
            "symptoms": ["symptom1", "symptom2"],
            "treatment": "treatment recommendation"
          }
        ],
        "pests": [
          {
            "name": "pest name",
            "probability": "percentage",
            "damage": "damage description",
            "control": "control method"
          }
        ],
        "treatments": {
          "organic": ["organic treatment options"],
          "chemical": ["chemical treatment options"],
          "preventive": ["prevention strategies"]
        },
        "monitoring": {
          "frequency": "monitoring schedule",
          "indicators": ["what to watch for"],
          "alerts": ["warning signs"]
        },
        "yieldImpact": "expected impact on yield",
        "timeline": "treatment timeline"
      }`;

      const prompt = `Analyze this crop data:
      Crop Type: ${cropData.cropType}
      Planting Date: ${cropData.plantingDate}
      Field Size: ${cropData.fieldSize}
      Observed Symptoms: ${cropData.symptoms}
      Location: ${cropData.location}
      Weather Conditions: ${cropData.weatherConditions}
      
      Provide AI-powered crop health analysis and treatment recommendations.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      setCropAnalysis(analysis);
      
    } catch (error) {
      console.error('Crop analysis error:', error);
      setCropAnalysis({
        error: 'AI crop analysis failed. Please check your data and try again.',
        cropHealth: 'Unknown'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeMonitoringData = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI IoT farming specialist. Analyze real-time sensor data and provide monitoring insights as JSON:
      {
        "overallStatus": "Optimal|Good|Warning|Critical",
        "alerts": [
          {
            "type": "alert type",
            "severity": "Low|Medium|High|Critical",
            "message": "alert message",
            "action": "recommended action"
          }
        ],
        "recommendations": {
          "irrigation": "irrigation recommendations",
          "climate": "climate control suggestions",
          "timing": "optimal timing for activities"
        },
        "predictions": {
          "nextIrrigation": "when to irrigate next",
          "weatherImpact": "weather impact analysis",
          "growthStage": "current growth stage"
        },
        "optimization": {
          "waterUsage": "water optimization tips",
          "energyEfficiency": "energy saving suggestions",
          "costReduction": "cost reduction opportunities"
        },
        "trends": {
          "soilMoisture": "moisture trend analysis",
          "temperature": "temperature trend analysis",
          "growth": "growth trend prediction"
        }
      }`;

      const prompt = `Analyze this real-time sensor data:
      Soil Moisture: ${sensorData.soilMoisture}%
      Air Temperature: ${sensorData.airTemperature}°C
      Humidity: ${sensorData.humidity}%
      Light Intensity: ${sensorData.lightIntensity} lux
      Recent Rainfall: ${sensorData.rainfall}mm
      
      Provide AI-powered monitoring insights and optimization recommendations.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      setMonitoringResults(analysis);
      
    } catch (error) {
      console.error('Monitoring analysis error:', error);
      setMonitoringResults({
        error: 'AI monitoring analysis failed. Please check your data and try again.',
        overallStatus: 'Unknown'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeMarketWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI agricultural market analyst. Analyze market data and provide profitable crop recommendations as JSON:
      {
        "marketTrends": {
          "highDemand": [
            {
              "crop": "crop name",
              "currentPrice": "price per kg/quintal",
              "demandGrowth": "percentage growth",
              "reason": "why demand is high",
              "profitPotential": "High|Medium|Low"
            }
          ],
          "emergingOpportunities": [
            {
              "crop": "crop name",
              "marketGap": "supply shortage description",
              "priceProjection": "expected price trend",
              "timeframe": "when to plant/harvest"
            }
          ]
        },
        "recommendations": {
          "topCrops": [
            {
              "crop": "crop name",
              "profitMargin": "expected profit percentage",
              "investmentRequired": "initial investment needed",
              "riskLevel": "Low|Medium|High",
              "harvestTime": "months to harvest",
              "marketDemand": "current demand status",
              "suitability": "why suitable for farmer's conditions"
            }
          ],
          "seasonalStrategy": "seasonal planting strategy",
          "diversificationTips": ["diversification suggestions"]
        },
        "marketInsights": {
          "supplyShortages": ["crops with supply shortages"],
          "priceVolatility": ["crops with stable prices"],
          "exportOpportunities": ["crops with export potential"],
          "localDemand": ["crops in high local demand"]
        },
        "riskAnalysis": {
          "weatherRisks": "weather-related risks",
          "marketRisks": "market-related risks",
          "mitigation": ["risk mitigation strategies"]
        },
        "timeline": {
          "immediate": "what to plant now",
          "nextSeason": "next season recommendations",
          "longTerm": "long-term strategy"
        }
      }`;

      const prompt = `Analyze market conditions and provide profitable crop recommendations:
      Location: ${marketData.location}
      Farm Size: ${marketData.farmSize} acres
      Budget: ₹${marketData.budget}
      Season: ${marketData.season}
      Soil Type: ${marketData.soilType}
      Water Availability: ${marketData.waterAvailability}
      
      Based on current market trends, supply-demand analysis, recent food shortages, and companies increasing procurement, recommend the most profitable crops to grow. Consider local market conditions, export opportunities, and seasonal demand patterns.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      setMarketAnalysis(analysis);
      
    } catch (error) {
      console.error('Market analysis error:', error);
      setMarketAnalysis({
        error: 'AI market analysis failed. Please check your data and try again.',
        marketTrends: null
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
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4">
            <Leaf size={16} />
            <span className="text-sm font-medium">SDG 2 - Zero Hunger</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI for Sustainable Farming
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Computer vision and sensor data system to monitor crops, predict yields, and optimize resources. 
            AI-powered soil analysis, crop health monitoring, and real-time farming insights.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'soil', label: 'Soil Analysis', icon: <Beaker size={16} /> },
            { id: 'crop', label: 'Crop Health', icon: <Camera size={16} /> },
            { id: 'monitoring', label: 'Real-time Monitoring', icon: <Satellite size={16} /> },
            { id: 'market', label: 'Market Intelligence', icon: <TrendingUp size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-green-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Soil Analysis Tab */}
        {activeTab === 'soil' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Soil Data Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Soil Testing Data</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">pH Level</label>
                  <input
                    type="text"
                    value={soilData.ph}
                    onChange={(e) => setSoilData(prev => ({...prev, ph: e.target.value}))}
                    placeholder="6.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Moisture (%)</label>
                  <input
                    type="text"
                    value={soilData.moisture}
                    onChange={(e) => setSoilData(prev => ({...prev, moisture: e.target.value}))}
                    placeholder="25"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organic Matter (%)</label>
                  <input
                    type="text"
                    value={soilData.organicMatter}
                    onChange={(e) => setSoilData(prev => ({...prev, organicMatter: e.target.value}))}
                    placeholder="3.2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nitrogen (ppm)</label>
                  <input
                    type="text"
                    value={soilData.nitrogen}
                    onChange={(e) => setSoilData(prev => ({...prev, nitrogen: e.target.value}))}
                    placeholder="45"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phosphorus (ppm)</label>
                  <input
                    type="text"
                    value={soilData.phosphorus}
                    onChange={(e) => setSoilData(prev => ({...prev, phosphorus: e.target.value}))}
                    placeholder="12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Potassium (ppm)</label>
                  <input
                    type="text"
                    value={soilData.potassium}
                    onChange={(e) => setSoilData(prev => ({...prev, potassium: e.target.value}))}
                    placeholder="180"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salinity (dS/m)</label>
                  <input
                    type="text"
                    value={soilData.salinity}
                    onChange={(e) => setSoilData(prev => ({...prev, salinity: e.target.value}))}
                    placeholder="0.8"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
                  <input
                    type="text"
                    value={soilData.temperature}
                    onChange={(e) => setSoilData(prev => ({...prev, temperature: e.target.value}))}
                    placeholder="22"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <button
                onClick={analyzeSoilWithAI}
                disabled={!soilData.ph || isAnalyzing}
                className="w-full mt-6 flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>AI Analyzing Soil...</span>
                  </>
                ) : (
                  <>
                    <Beaker className="w-5 h-5" />
                    <span>Analyze Soil with AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Soil Analysis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Soil Analysis</h3>
              
              {isAnalyzing && (
                <div className="text-center py-12">
                  <Beaker className="w-12 h-12 text-green-600 animate-pulse mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing your soil data...</p>
                </div>
              )}

              {soilAnalysis && !isAnalyzing && (
                <div className="space-y-6">
                  {soilAnalysis.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{soilAnalysis.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Soil Health Score */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className={`text-2xl font-bold mb-1 ${
                            soilAnalysis.soilHealth === 'Excellent' ? 'text-green-700' :
                            soilAnalysis.soilHealth === 'Good' ? 'text-green-600' :
                            soilAnalysis.soilHealth === 'Fair' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {soilAnalysis.soilHealth}
                          </div>
                          <div className="text-sm text-gray-600">Soil Health</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {soilAnalysis.healthScore}%
                          </div>
                          <div className="text-sm text-gray-600">Health Score</div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      {soilAnalysis.recommendations && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">AI Recommendations</h4>
                          
                          {soilAnalysis.recommendations.fertilizers && (
                            <div className="p-3 bg-yellow-50 rounded-lg">
                              <h5 className="font-medium text-yellow-800 mb-2">Fertilizers</h5>
                              <ul className="space-y-1">
                                {soilAnalysis.recommendations.fertilizers.map((fert, index) => (
                                  <li key={index} className="text-sm text-yellow-700">• {fert}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {soilAnalysis.recommendations.irrigation && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h5 className="font-medium text-blue-800 mb-2">Irrigation Strategy</h5>
                              <p className="text-sm text-blue-700">{soilAnalysis.recommendations.irrigation}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Plan */}
                      {soilAnalysis.actionPlan && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Action Plan</h4>
                          
                          {soilAnalysis.actionPlan.immediate && (
                            <div className="p-3 bg-red-50 rounded-lg">
                              <h5 className="font-medium text-red-800 mb-2">🚨 Immediate Actions</h5>
                              <ul className="space-y-1">
                                {soilAnalysis.actionPlan.immediate.map((action, index) => (
                                  <li key={index} className="text-sm text-red-700">• {action}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {soilAnalysis.actionPlan.shortTerm && (
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <h5 className="font-medium text-orange-800 mb-2">⏳ Short Term (1-3 months)</h5>
                              <ul className="space-y-1">
                                {soilAnalysis.actionPlan.shortTerm.map((action, index) => (
                                  <li key={index} className="text-sm text-orange-700">• {action}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!soilAnalysis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Beaker className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter soil testing data and click "Analyze with AI" to get intelligent farming recommendations</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Crop Health Tab */}
        {activeTab === 'crop' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Crop Data Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Crop Health Assessment</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                  <input
                    type="text"
                    value={cropData.cropType}
                    onChange={(e) => setCropData(prev => ({...prev, cropType: e.target.value}))}
                    placeholder="e.g., Wheat, Rice, Tomato"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date</label>
                  <input
                    type="date"
                    value={cropData.plantingDate}
                    onChange={(e) => setCropData(prev => ({...prev, plantingDate: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field Size (acres)</label>
                  <input
                    type="text"
                    value={cropData.fieldSize}
                    onChange={(e) => setCropData(prev => ({...prev, fieldSize: e.target.value}))}
                    placeholder="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observed Symptoms</label>
                  <textarea
                    value={cropData.symptoms}
                    onChange={(e) => setCropData(prev => ({...prev, symptoms: e.target.value}))}
                    placeholder="Describe any discoloration, wilting, spots, or unusual growth patterns..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={cropData.location}
                    onChange={(e) => setCropData(prev => ({...prev, location: e.target.value}))}
                    placeholder="City, State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weather Conditions</label>
                  <input
                    type="text"
                    value={cropData.weatherConditions}
                    onChange={(e) => setCropData(prev => ({...prev, weatherConditions: e.target.value}))}
                    placeholder="Recent rainfall, temperature, humidity"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  onClick={analyzeCropWithAI}
                  disabled={!cropData.cropType || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Analyzing Crop...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      <span>Analyze Crop Health</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Crop Analysis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Crop Diagnosis</h3>
              
              {isAnalyzing && (
                <div className="text-center py-12">
                  <Camera className="w-12 h-12 text-green-600 animate-pulse mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing crop health...</p>
                </div>
              )}

              {cropAnalysis && !isAnalyzing && (
                <div className="space-y-6">
                  {cropAnalysis.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{cropAnalysis.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Crop Health Status */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className={`text-xl font-bold mb-1 ${
                            cropAnalysis.cropHealth === 'Healthy' ? 'text-green-700' :
                            cropAnalysis.cropHealth === 'At Risk' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {cropAnalysis.cropHealth}
                          </div>
                          <div className="text-sm text-gray-600">Crop Status</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600 mb-1">
                            {cropAnalysis.healthScore}%
                          </div>
                          <div className="text-sm text-gray-600">Health Score</div>
                        </div>
                      </div>

                      {/* Diagnosis */}
                      {cropAnalysis.diagnosis && (
                        <div className="p-4 bg-yellow-50 rounded-lg">
                          <h4 className="font-semibold text-yellow-800 mb-2">AI Diagnosis</h4>
                          <p className="text-sm text-yellow-700 mb-2">
                            <strong>Primary Issue:</strong> {cropAnalysis.diagnosis.primaryIssue}
                          </p>
                          <p className="text-sm text-yellow-700">
                            <strong>Severity:</strong> {cropAnalysis.diagnosis.severity} | 
                            <strong> Confidence:</strong> {cropAnalysis.diagnosis.confidence}
                          </p>
                        </div>
                      )}

                      {/* Diseases */}
                      {cropAnalysis.diseases && cropAnalysis.diseases.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">🦠 Detected Diseases</h4>
                          {cropAnalysis.diseases.map((disease, index) => (
                            <div key={index} className="p-3 bg-red-50 rounded-lg mb-2">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-red-800">{disease.name}</h5>
                                <span className="text-sm text-red-600">{disease.probability}</span>
                              </div>
                              <p className="text-sm text-red-700 mb-2">
                                <strong>Treatment:</strong> {disease.treatment}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Treatments */}
                      {cropAnalysis.treatments && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Treatment Options</h4>
                          
                          {cropAnalysis.treatments.organic && (
                            <div className="p-3 bg-green-50 rounded-lg">
                              <h5 className="font-medium text-green-800 mb-2">🌱 Organic Treatments</h5>
                              <ul className="space-y-1">
                                {cropAnalysis.treatments.organic.map((treatment, index) => (
                                  <li key={index} className="text-sm text-green-700">• {treatment}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {cropAnalysis.treatments.preventive && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h5 className="font-medium text-blue-800 mb-2">🛡️ Prevention Strategies</h5>
                              <ul className="space-y-1">
                                {cropAnalysis.treatments.preventive.map((prevention, index) => (
                                  <li key={index} className="text-sm text-blue-700">• {prevention}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!cropAnalysis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter crop information and symptoms to get AI-powered health diagnosis</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Real-time Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sensor Data Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">IoT Sensor Data</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Droplets className="w-4 h-4 inline mr-1" />
                    Soil Moisture (%)
                  </label>
                  <input
                    type="text"
                    value={sensorData.soilMoisture}
                    onChange={(e) => setSensorData(prev => ({...prev, soilMoisture: e.target.value}))}
                    placeholder="35"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Thermometer className="w-4 h-4 inline mr-1" />
                    Air Temperature (°C)
                  </label>
                  <input
                    type="text"
                    value={sensorData.airTemperature}
                    onChange={(e) => setSensorData(prev => ({...prev, airTemperature: e.target.value}))}
                    placeholder="28"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Humidity (%)</label>
                  <input
                    type="text"
                    value={sensorData.humidity}
                    onChange={(e) => setSensorData(prev => ({...prev, humidity: e.target.value}))}
                    placeholder="65"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Light Intensity (lux)</label>
                  <input
                    type="text"
                    value={sensorData.lightIntensity}
                    onChange={(e) => setSensorData(prev => ({...prev, lightIntensity: e.target.value}))}
                    placeholder="45000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recent Rainfall (mm)</label>
                  <input
                    type="text"
                    value={sensorData.rainfall}
                    onChange={(e) => setSensorData(prev => ({...prev, rainfall: e.target.value}))}
                    placeholder="12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  onClick={analyzeMonitoringData}
                  disabled={!sensorData.soilMoisture || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Analyzing Data...</span>
                    </>
                  ) : (
                    <>
                      <Satellite className="w-5 h-5" />
                      <span>Analyze Monitoring Data</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Monitoring Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Monitoring Insights</h3>
              
              {isAnalyzing && (
                <div className="text-center py-12">
                  <Satellite className="w-12 h-12 text-green-600 animate-pulse mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing sensor data...</p>
                </div>
              )}

              {monitoringResults && !isAnalyzing && (
                <div className="space-y-6">
                  {monitoringResults.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{monitoringResults.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Overall Status */}
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className={`text-2xl font-bold mb-1 ${
                          monitoringResults.overallStatus === 'Optimal' ? 'text-green-700' :
                          monitoringResults.overallStatus === 'Good' ? 'text-green-600' :
                          monitoringResults.overallStatus === 'Warning' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {monitoringResults.overallStatus}
                        </div>
                        <div className="text-sm text-gray-600">Overall Farm Status</div>
                      </div>

                      {/* Alerts */}
                      {monitoringResults.alerts && monitoringResults.alerts.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">🚨 Active Alerts</h4>
                          {monitoringResults.alerts.map((alert, index) => (
                            <div key={index} className={`p-3 rounded-lg mb-2 ${
                              alert.severity === 'Critical' ? 'bg-red-50' :
                              alert.severity === 'High' ? 'bg-orange-50' :
                              alert.severity === 'Medium' ? 'bg-yellow-50' : 'bg-blue-50'
                            }`}>
                              <div className="flex justify-between items-start mb-2">
                                <h5 className={`font-medium ${
                                  alert.severity === 'Critical' ? 'text-red-800' :
                                  alert.severity === 'High' ? 'text-orange-800' :
                                  alert.severity === 'Medium' ? 'text-yellow-800' : 'text-blue-800'
                                }`}>
                                  {alert.type}
                                </h5>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  alert.severity === 'Critical' ? 'bg-red-200 text-red-700' :
                                  alert.severity === 'High' ? 'bg-orange-200 text-orange-700' :
                                  alert.severity === 'Medium' ? 'bg-yellow-200 text-yellow-700' : 'bg-blue-200 text-blue-700'
                                }`}>
                                  {alert.severity}
                                </span>
                              </div>
                              <p className={`text-sm mb-2 ${
                                alert.severity === 'Critical' ? 'text-red-700' :
                                alert.severity === 'High' ? 'text-orange-700' :
                                alert.severity === 'Medium' ? 'text-yellow-700' : 'text-blue-700'
                              }`}>
                                {alert.message}
                              </p>
                              <p className={`text-sm font-medium ${
                                alert.severity === 'Critical' ? 'text-red-800' :
                                alert.severity === 'High' ? 'text-orange-800' :
                                alert.severity === 'Medium' ? 'text-yellow-800' : 'text-blue-800'
                              }`}>
                                Action: {alert.action}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Recommendations */}
                      {monitoringResults.recommendations && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">AI Recommendations</h4>
                          
                          {monitoringResults.recommendations.irrigation && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h5 className="font-medium text-blue-800 mb-2">💧 Irrigation</h5>
                              <p className="text-sm text-blue-700">{monitoringResults.recommendations.irrigation}</p>
                            </div>
                          )}

                          {monitoringResults.recommendations.timing && (
                            <div className="p-3 bg-green-50 rounded-lg">
                              <h5 className="font-medium text-green-800 mb-2">⏰ Optimal Timing</h5>
                              <p className="text-sm text-green-700">{monitoringResults.recommendations.timing}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Predictions */}
                      {monitoringResults.predictions && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">AI Predictions</h4>
                          
                          {monitoringResults.predictions.nextIrrigation && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <h5 className="font-medium text-purple-800 mb-2">🔮 Next Irrigation</h5>
                              <p className="text-sm text-purple-700">{monitoringResults.predictions.nextIrrigation}</p>
                            </div>
                          )}

                          {monitoringResults.predictions.growthStage && (
                            <div className="p-3 bg-indigo-50 rounded-lg">
                              <h5 className="font-medium text-indigo-800 mb-2">🌱 Growth Stage</h5>
                              <p className="text-sm text-indigo-700">{monitoringResults.predictions.growthStage}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!monitoringResults && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Satellite className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter IoT sensor data to get real-time AI monitoring insights</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Market Intelligence Tab */}
        {activeTab === 'market' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Market Data Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Market Analysis Input</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location (State/District)</label>
                  <input
                    type="text"
                    value={marketData.location}
                    onChange={(e) => setMarketData(prev => ({...prev, location: e.target.value}))}
                    placeholder="e.g., Punjab, Maharashtra, Karnataka"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (acres)</label>
                  <input
                    type="text"
                    value={marketData.farmSize}
                    onChange={(e) => setMarketData(prev => ({...prev, farmSize: e.target.value}))}
                    placeholder="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Budget (₹)</label>
                  <input
                    type="text"
                    value={marketData.budget}
                    onChange={(e) => setMarketData(prev => ({...prev, budget: e.target.value}))}
                    placeholder="50000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Season</label>
                  <select
                    value={marketData.season}
                    onChange={(e) => setMarketData(prev => ({...prev, season: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Season</option>
                    <option value="Kharif">Kharif (Monsoon)</option>
                    <option value="Rabi">Rabi (Winter)</option>
                    <option value="Zaid">Zaid (Summer)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                  <select
                    value={marketData.soilType}
                    onChange={(e) => setMarketData(prev => ({...prev, soilType: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Soil Type</option>
                    <option value="Alluvial">Alluvial</option>
                    <option value="Black Cotton">Black Cotton</option>
                    <option value="Red">Red Soil</option>
                    <option value="Laterite">Laterite</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Clay">Clay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Water Availability</label>
                  <select
                    value={marketData.waterAvailability}
                    onChange={(e) => setMarketData(prev => ({...prev, waterAvailability: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Water Source</option>
                    <option value="Irrigated">Well Irrigated</option>
                    <option value="Canal">Canal Irrigation</option>
                    <option value="Rainfed">Rainfed</option>
                    <option value="Drip">Drip Irrigation</option>
                    <option value="Limited">Limited Water</option>
                  </select>
                </div>

                <button
                  onClick={analyzeMarketWithAI}
                  disabled={!marketData.location || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Analyzing Market...</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5" />
                      <span>Get Profit Recommendations</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Market Analysis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Market Intelligence</h3>
              
              {isAnalyzing && (
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-green-600 animate-pulse mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing market trends and supply-demand...</p>
                </div>
              )}

              {marketAnalysis && !isAnalyzing && (
                <div className="space-y-6">
                  {marketAnalysis.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{marketAnalysis.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Top Profitable Crops */}
                      {marketAnalysis.recommendations?.topCrops && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                            Most Profitable Crops
                          </h4>
                          {marketAnalysis.recommendations.topCrops.slice(0, 3).map((crop, index) => (
                            <div key={index} className="p-4 bg-green-50 rounded-lg mb-3 border-l-4 border-green-500">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold text-green-800">{crop.crop}</h5>
                                <span className="text-lg font-bold text-green-700">{crop.profitMargin}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                                <div>
                                  <span className="text-gray-600">Investment: </span>
                                  <span className="font-medium">{crop.investmentRequired}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Risk: </span>
                                  <span className={`font-medium ${
                                    crop.riskLevel === 'Low' ? 'text-green-600' :
                                    crop.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                                  }`}>{crop.riskLevel}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Harvest: </span>
                                  <span className="font-medium">{crop.harvestTime}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Demand: </span>
                                  <span className="font-medium text-blue-600">{crop.marketDemand}</span>
                                </div>
                              </div>
                              <p className="text-sm text-green-700">
                                <strong>Why suitable:</strong> {crop.suitability}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* High Demand Crops */}
                      {marketAnalysis.marketTrends?.highDemand && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                            High Demand Crops
                          </h4>
                          {marketAnalysis.marketTrends.highDemand.slice(0, 3).map((crop, index) => (
                            <div key={index} className="p-3 bg-blue-50 rounded-lg mb-2">
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="font-medium text-blue-800">{crop.crop}</h5>
                                <span className="text-sm font-semibold text-blue-700">{crop.currentPrice}</span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-blue-600">Growth: {crop.demandGrowth}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  crop.profitPotential === 'High' ? 'bg-green-200 text-green-700' :
                                  crop.profitPotential === 'Medium' ? 'bg-yellow-200 text-yellow-700' : 'bg-gray-200 text-gray-700'
                                }`}>
                                  {crop.profitPotential} Profit
                                </span>
                              </div>
                              <p className="text-sm text-blue-700">{crop.reason}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Market Insights */}
                      {marketAnalysis.marketInsights && (
                        <div className="grid grid-cols-2 gap-4">
                          {marketAnalysis.marketInsights.supplyShortages && (
                            <div className="p-3 bg-red-50 rounded-lg">
                              <h5 className="font-medium text-red-800 mb-2">🚨 Supply Shortages</h5>
                              <ul className="space-y-1">
                                {marketAnalysis.marketInsights.supplyShortages.slice(0, 3).map((crop, index) => (
                                  <li key={index} className="text-sm text-red-700">• {crop}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {marketAnalysis.marketInsights.exportOpportunities && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <h5 className="font-medium text-purple-800 mb-2">🌍 Export Potential</h5>
                              <ul className="space-y-1">
                                {marketAnalysis.marketInsights.exportOpportunities.slice(0, 3).map((crop, index) => (
                                  <li key={index} className="text-sm text-purple-700">• {crop}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Timeline Strategy */}
                      {marketAnalysis.timeline && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">📅 Planting Timeline</h4>
                          
                          {marketAnalysis.timeline.immediate && (
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <h5 className="font-medium text-orange-800 mb-2">🚀 Plant Now</h5>
                              <p className="text-sm text-orange-700">{marketAnalysis.timeline.immediate}</p>
                            </div>
                          )}

                          {marketAnalysis.timeline.nextSeason && (
                            <div className="p-3 bg-indigo-50 rounded-lg">
                              <h5 className="font-medium text-indigo-800 mb-2">📈 Next Season</h5>
                              <p className="text-sm text-indigo-700">{marketAnalysis.timeline.nextSeason}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Risk Analysis */}
                      {marketAnalysis.riskAnalysis && (
                        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Risk Assessment</h4>
                          {marketAnalysis.riskAnalysis.marketRisks && (
                            <p className="text-sm text-yellow-700 mb-2">
                              <strong>Market Risks:</strong> {marketAnalysis.riskAnalysis.marketRisks}
                            </p>
                          )}
                          {marketAnalysis.riskAnalysis.mitigation && (
                            <div>
                              <strong className="text-yellow-800">Mitigation:</strong>
                              <ul className="mt-1 space-y-1">
                                {marketAnalysis.riskAnalysis.mitigation.slice(0, 3).map((strategy, index) => (
                                  <li key={index} className="text-sm text-yellow-700">• {strategy}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!marketAnalysis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your farm details to get AI-powered market intelligence and profit recommendations</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SustainableFarmingTool;