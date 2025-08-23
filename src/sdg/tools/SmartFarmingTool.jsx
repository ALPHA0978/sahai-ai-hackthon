import { useState } from 'react';
import { 
  Leaf, Camera, Droplets, Thermometer, AlertTriangle, 
  CheckCircle, BarChart3, Target, ArrowLeft, Send, 
  Loader, TrendingUp, DollarSign, Zap, Satellite
} from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const SmartFarmingTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('soil');
  const [farmData, setFarmData] = useState({
    farmSize: '',
    soilType: '',
    currentCrops: '',
    waterSource: '',
    equipment: '',
    challenges: ''
  });
  const [cropData, setCropData] = useState({
    cropType: '',
    plantingDate: '',
    fieldSize: '',
    symptoms: '',
    location: '',
    weatherConditions: ''
  });
  const [marketData, setMarketData] = useState({
    region: '',
    targetMarkets: '',
    currentPrices: '',
    seasonality: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [soilAnalysis, setSoilAnalysis] = useState(null);
  const [cropAnalysis, setCropAnalysis] = useState(null);
  const [marketInsights, setMarketInsights] = useState(null);

  const analyzeSoilWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI agricultural expert. Analyze farm data and provide soil optimization recommendations as JSON:
      {
        "soilHealth": "Excellent|Good|Fair|Poor",
        "healthScore": number (0-100),
        "cropRecommendations": [
          {
            "name": "crop name",
            "expectedYield": "yield per acre",
            "profitMargin": "profit percentage",
            "reason": "why recommended"
          }
        ],
        "resourceOptimization": {
          "water": "water management strategy",
          "fertilizer": "fertilizer recommendations",
          "pestControl": "pest management plan"
        },
        "technologyRecommendations": [
          {
            "technology": "tech name",
            "cost": "implementation cost",
            "roi": "return on investment",
            "benefits": "key benefits"
          }
        ],
        "sustainabilityScore": number,
        "sustainabilityTips": "sustainability recommendations"
      }`;

      const prompt = `Analyze this farm:
      Farm Size: ${farmData.farmSize} acres
      Soil Type: ${farmData.soilType}
      Current Crops: ${farmData.currentCrops}
      Water Source: ${farmData.waterSource}
      Equipment: ${farmData.equipment}
      Challenges: ${farmData.challenges}
      
      Provide comprehensive soil health analysis and farming optimization recommendations.`;

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
      const systemPrompt = `You are an AI crop health specialist. Analyze crop data and provide disease/pest management as JSON:
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
        "treatments": {
          "organic": ["organic treatment options"],
          "chemical": ["chemical treatment options"],
          "preventive": ["prevention strategies"]
        },
        "yieldImpact": "expected impact on yield"
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

  const analyzeMarketWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI market analyst for agriculture. Analyze market data and provide insights as JSON:
      {
        "pricePredictions": [
          {
            "crop": "crop name",
            "predictedPrice": "price forecast",
            "trend": "increasing/decreasing/stable",
            "reasoning": "market analysis"
          }
        ],
        "demandAnalysis": {
          "highDemand": ["crop1", "crop2"],
          "lowDemand": ["crop1", "crop2"],
          "emergingMarkets": ["opportunity1", "opportunity2"]
        },
        "supplyChainOptimization": {
          "recommendations": "supply chain improvements",
          "costSavings": "potential savings"
        },
        "exportOpportunities": [
          {
            "crop": "crop name",
            "country": "target country",
            "exportPrice": "price in target market",
            "requirements": "export requirements"
          }
        ]
      }`;

      const prompt = `Analyze agricultural market for:
      Region: ${marketData.region}
      Target Markets: ${marketData.targetMarkets}
      Current Prices: ${marketData.currentPrices}
      Seasonal Patterns: ${marketData.seasonality}
      
      Provide market insights, price predictions, demand analysis, and export opportunities.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      setMarketInsights(analysis);
      
    } catch (error) {
      console.error('Market analysis error:', error);
      setMarketInsights({
        error: 'AI market analysis failed. Please check your data and try again.'
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
            <span className="text-sm font-medium">SDG 1 & 2 - Smart Farming</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Smart Farming
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI platform for soil health monitoring, crop disease detection, 
            resource optimization, and market analysis to maximize farm productivity and profitability.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'soil', label: 'Soil & Farm Analysis', icon: <Leaf size={16} /> },
            { id: 'crop', label: 'Crop Health Monitoring', icon: <Camera size={16} /> },
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
            {/* Farm Data Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Farm Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (acres)</label>
                  <input
                    type="text"
                    value={farmData.farmSize}
                    onChange={(e) => setFarmData(prev => ({...prev, farmSize: e.target.value}))}
                    placeholder="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                  <select
                    value={farmData.soilType}
                    onChange={(e) => setFarmData(prev => ({...prev, soilType: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select soil type</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Loamy">Loamy</option>
                    <option value="Alluvial">Alluvial</option>
                    <option value="Black Cotton">Black Cotton</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Crops</label>
                  <input
                    type="text"
                    value={farmData.currentCrops}
                    onChange={(e) => setFarmData(prev => ({...prev, currentCrops: e.target.value}))}
                    placeholder="Rice, Wheat, Vegetables"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Water Source</label>
                  <select
                    value={farmData.waterSource}
                    onChange={(e) => setFarmData(prev => ({...prev, waterSource: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select water source</option>
                    <option value="Rainfall">Rainfall</option>
                    <option value="Borewell">Borewell</option>
                    <option value="Canal">Canal</option>
                    <option value="River">River</option>
                    <option value="Drip Irrigation">Drip Irrigation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Equipment</label>
                  <textarea
                    value={farmData.equipment}
                    onChange={(e) => setFarmData(prev => ({...prev, equipment: e.target.value}))}
                    placeholder="Tractor, plough, harvester, etc."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Challenges</label>
                  <textarea
                    value={farmData.challenges}
                    onChange={(e) => setFarmData(prev => ({...prev, challenges: e.target.value}))}
                    placeholder="Pest issues, low yield, water shortage, etc."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  onClick={analyzeSoilWithAI}
                  disabled={!farmData.farmSize || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Analyzing Farm...</span>
                    </>
                  ) : (
                    <>
                      <Leaf className="w-5 h-5" />
                      <span>Optimize Farm with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Soil Analysis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Farm Optimization</h3>
              
              {isAnalyzing && (
                <div className="text-center py-12">
                  <Leaf className="w-12 h-12 text-green-600 animate-pulse mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing your farm data...</p>
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

                      {/* Crop Recommendations */}
                      {soilAnalysis.cropRecommendations && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Leaf className="w-5 h-5 text-green-600 mr-2" />
                            Recommended Crops
                          </h4>
                          {soilAnalysis.cropRecommendations.map((crop, index) => (
                            <div key={index} className="p-3 bg-green-50 rounded-lg mb-2">
                              <h5 className="font-medium text-green-800">{crop.name}</h5>
                              <p className="text-sm text-green-700">Yield: {crop.expectedYield} | Profit: {crop.profitMargin}</p>
                              <p className="text-sm text-green-600">{crop.reason}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technology Recommendations */}
                      {soilAnalysis.technologyRecommendations && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">🤖 Technology Upgrades</h4>
                          <ul className="space-y-2">
                            {soilAnalysis.technologyRecommendations.map((tech, index) => (
                              <li key={index} className="p-3 bg-purple-50 rounded-lg">
                                <h5 className="font-medium text-purple-800">{tech.technology}</h5>
                                <p className="text-sm text-purple-700">Cost: {tech.cost} | ROI: {tech.roi}</p>
                                <p className="text-sm text-purple-600">{tech.benefits}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!soilAnalysis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Leaf className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter farm details to get AI-powered optimization recommendations</p>
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
              
              {cropAnalysis && (
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

                      {/* Diseases */}
                      {cropAnalysis.diseases && cropAnalysis.diseases.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">🦠 Detected Issues</h4>
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
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!cropAnalysis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter crop information to get AI-powered health diagnosis</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Market Analysis Tab */}
        {activeTab === 'market' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Market Data Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Market Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region/State</label>
                  <input
                    type="text"
                    value={marketData.region}
                    onChange={(e) => setMarketData(prev => ({...prev, region: e.target.value}))}
                    placeholder="Punjab, Maharashtra, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Markets</label>
                  <input
                    type="text"
                    value={marketData.targetMarkets}
                    onChange={(e) => setMarketData(prev => ({...prev, targetMarkets: e.target.value}))}
                    placeholder="Local, State, Export"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Crop Prices</label>
                  <textarea
                    value={marketData.currentPrices}
                    onChange={(e) => setMarketData(prev => ({...prev, currentPrices: e.target.value}))}
                    placeholder="Rice: ₹2000/quintal, Wheat: ₹2200/quintal"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={analyzeMarketWithAI}
                  disabled={!marketData.region || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Analyzing Market...</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5" />
                      <span>Analyze Market Trends</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Market Analysis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Market Insights</h3>
              
              {marketInsights && (
                <div className="space-y-6">
                  {marketInsights.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{marketInsights.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Price Predictions */}
                      {marketInsights.pricePredictions && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                            Price Predictions
                          </h4>
                          {marketInsights.pricePredictions.map((prediction, index) => (
                            <div key={index} className="p-3 bg-green-50 rounded-lg mb-2">
                              <div className="flex justify-between items-start">
                                <h5 className="font-medium text-green-800">{prediction.crop}</h5>
                                <span className="text-sm font-semibold text-green-700">{prediction.predictedPrice}</span>
                              </div>
                              <p className="text-sm text-green-700">Trend: {prediction.trend}</p>
                              <p className="text-sm text-green-600">{prediction.reasoning}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Export Opportunities */}
                      {marketInsights.exportOpportunities && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">🌍 Export Opportunities</h4>
                          {marketInsights.exportOpportunities.map((opportunity, index) => (
                            <div key={index} className="p-3 bg-purple-50 rounded-lg mb-2">
                              <h5 className="font-medium text-purple-800">{opportunity.crop} → {opportunity.country}</h5>
                              <p className="text-sm text-purple-700">Price: {opportunity.exportPrice}</p>
                              <p className="text-sm text-purple-600">{opportunity.requirements}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!marketInsights && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter market information to get AI-powered insights and predictions</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartFarmingTool;