import { useState } from 'react';
import { 
  Droplets, Thermometer, AlertTriangle, CheckCircle, 
  BarChart3, Target, ArrowLeft, Send, Loader, 
  Activity, Zap, TrendingUp, Settings, Bell
} from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const AIWaterManagementTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [waterData, setWaterData] = useState({
    location: '',
    population: '',
    dailyConsumption: '',
    waterSources: '',
    qualityIssues: '',
    infrastructure: ''
  });
  const [sensorData, setSensorData] = useState({
    flowRate: '',
    pressure: '',
    ph: '',
    turbidity: '',
    temperature: '',
    contaminants: ''
  });
  const [distributionData, setDistributionData] = useState({
    networkSize: '',
    pipeAge: '',
    leakageRate: '',
    maintenanceFreq: '',
    demandPattern: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [waterAnalysis, setWaterAnalysis] = useState(null);
  const [qualityAnalysis, setQualityAnalysis] = useState(null);
  const [distributionAnalysis, setDistributionAnalysis] = useState(null);

  const analyzeWaterSystemWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI water management expert. Analyze water system data and provide comprehensive recommendations as JSON:
      {
        "systemHealth": "Excellent|Good|Fair|Poor|Critical",
        "efficiencyScore": number (0-100),
        "usageAnalysis": {
          "currentConsumption": "analysis of current usage",
          "demandPrediction": "future demand forecast",
          "conservationPotential": "water saving opportunities"
        },
        "recommendations": {
          "immediate": ["action1", "action2"],
          "shortTerm": ["improvement1", "improvement2"],
          "longTerm": ["strategy1", "strategy2"]
        },
        "iotRecommendations": [
          {
            "sensor": "sensor type",
            "location": "installation location",
            "benefit": "expected benefit",
            "cost": "estimated cost"
          }
        ],
        "alerts": [
          {
            "type": "alert type",
            "severity": "Low|Medium|High|Critical",
            "message": "alert description",
            "action": "recommended action"
          }
        ],
        "conservationTips": ["tip1", "tip2"],
        "costSavings": "estimated annual savings"
      }`;

      const prompt = `Analyze this water system:
      Location: ${waterData.location}
      Population: ${waterData.population}
      Daily Consumption: ${waterData.dailyConsumption} liters
      Water Sources: ${waterData.waterSources}
      Quality Issues: ${waterData.qualityIssues}
      Infrastructure: ${waterData.infrastructure}
      
      Provide comprehensive water management analysis and IoT sensor recommendations.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      setWaterAnalysis(analysis);
      
    } catch (error) {
      console.error('Water analysis error:', error);
      setWaterAnalysis({
        error: 'AI water analysis failed. Please check your data and try again.',
        systemHealth: 'Unknown'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeWaterQualityWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI water quality specialist. Analyze sensor data and provide quality assessment as JSON:
      {
        "waterQuality": "Excellent|Good|Fair|Poor|Unsafe",
        "qualityScore": number (0-100),
        "contaminantAnalysis": {
          "detected": ["contaminant1", "contaminant2"],
          "levels": "contamination levels",
          "riskAssessment": "health risk evaluation"
        },
        "treatmentRecommendations": [
          {
            "method": "treatment method",
            "effectiveness": "effectiveness percentage",
            "cost": "treatment cost",
            "timeline": "implementation time"
          }
        ],
        "monitoringPlan": {
          "frequency": "monitoring schedule",
          "parameters": ["parameter1", "parameter2"],
          "alertThresholds": "threshold values"
        },
        "complianceStatus": "regulatory compliance status",
        "publicHealthRisk": "Low|Medium|High|Critical"
      }`;

      const prompt = `Analyze water quality data:
      Flow Rate: ${sensorData.flowRate} L/min
      Pressure: ${sensorData.pressure} PSI
      pH Level: ${sensorData.ph}
      Turbidity: ${sensorData.turbidity} NTU
      Temperature: ${sensorData.temperature}°C
      Contaminants: ${sensorData.contaminants}
      
      Provide water quality assessment and treatment recommendations.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      setQualityAnalysis(analysis);
      
    } catch (error) {
      console.error('Quality analysis error:', error);
      setQualityAnalysis({
        error: 'AI quality analysis failed. Please check your data and try again.',
        waterQuality: 'Unknown'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeDistributionWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI water distribution expert. Analyze distribution system and provide optimization recommendations as JSON:
      {
        "distributionEfficiency": "Excellent|Good|Fair|Poor",
        "efficiencyScore": number (0-100),
        "leakageAnalysis": {
          "estimatedLosses": "water loss percentage",
          "leakLocations": ["location1", "location2"],
          "repairPriority": "priority ranking"
        },
        "optimizationStrategies": [
          {
            "strategy": "optimization method",
            "impact": "expected improvement",
            "investment": "required investment",
            "roi": "return on investment"
          }
        ],
        "predictiveMaintenance": {
          "riskAreas": ["area1", "area2"],
          "maintenanceSchedule": "recommended schedule",
          "costReduction": "maintenance cost savings"
        },
        "smartSystemRecommendations": [
          {
            "technology": "smart technology",
            "benefits": "key benefits",
            "implementation": "implementation plan"
          }
        ],
        "demandManagement": {
          "peakHours": "peak demand times",
          "loadBalancing": "load balancing strategy",
          "dynamicPricing": "pricing recommendations"
        }
      }`;

      const prompt = `Analyze water distribution system:
      Network Size: ${distributionData.networkSize} km
      Average Pipe Age: ${distributionData.pipeAge} years
      Current Leakage Rate: ${distributionData.leakageRate}%
      Maintenance Frequency: ${distributionData.maintenanceFreq}
      Demand Pattern: ${distributionData.demandPattern}
      
      Provide distribution optimization and smart system recommendations.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      setDistributionAnalysis(analysis);
      
    } catch (error) {
      console.error('Distribution analysis error:', error);
      setDistributionAnalysis({
        error: 'AI distribution analysis failed. Please check your data and try again.',
        distributionEfficiency: 'Unknown'
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
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4">
            <Droplets size={16} />
            <span className="text-sm font-medium">SDG 6 - Clean Water and Sanitation</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI for Water Management
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time water quality monitoring, predictive analytics for demand & supply, 
            optimized distribution systems, and IoT-enabled smart water management solutions.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'monitoring', label: 'Water System Monitoring', icon: <Activity size={16} /> },
            { id: 'quality', label: 'Quality Analysis', icon: <Thermometer size={16} /> },
            { id: 'distribution', label: 'Distribution Optimization', icon: <Settings size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Water System Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Water System Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Water System Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={waterData.location}
                    onChange={(e) => setWaterData(prev => ({...prev, location: e.target.value}))}
                    placeholder="City, State, Country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Population Served</label>
                  <input
                    type="text"
                    value={waterData.population}
                    onChange={(e) => setWaterData(prev => ({...prev, population: e.target.value}))}
                    placeholder="e.g., 500,000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daily Water Consumption (Liters)</label>
                  <input
                    type="text"
                    value={waterData.dailyConsumption}
                    onChange={(e) => setWaterData(prev => ({...prev, dailyConsumption: e.target.value}))}
                    placeholder="e.g., 50,000,000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Water Sources</label>
                  <textarea
                    value={waterData.waterSources}
                    onChange={(e) => setWaterData(prev => ({...prev, waterSources: e.target.value}))}
                    placeholder="Rivers, groundwater, reservoirs, etc."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Quality Issues</label>
                  <textarea
                    value={waterData.qualityIssues}
                    onChange={(e) => setWaterData(prev => ({...prev, qualityIssues: e.target.value}))}
                    placeholder="Contamination, pH issues, turbidity, etc."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Infrastructure Status</label>
                  <textarea
                    value={waterData.infrastructure}
                    onChange={(e) => setWaterData(prev => ({...prev, infrastructure: e.target.value}))}
                    placeholder="Pipe conditions, treatment plants, storage capacity"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={analyzeWaterSystemWithAI}
                  disabled={!waterData.location || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Analyzing System...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      <span>Analyze Water System</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Water Analysis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Water System Analysis</h3>
              
              {isAnalyzing && (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing water system data...</p>
                </div>
              )}

              {waterAnalysis && !isAnalyzing && (
                <div className="space-y-6">
                  {waterAnalysis.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{waterAnalysis.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* System Health Score */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className={`text-2xl font-bold mb-1 ${
                            waterAnalysis.systemHealth === 'Excellent' ? 'text-green-700' :
                            waterAnalysis.systemHealth === 'Good' ? 'text-green-600' :
                            waterAnalysis.systemHealth === 'Fair' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {waterAnalysis.systemHealth}
                          </div>
                          <div className="text-sm text-gray-600">System Health</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {waterAnalysis.efficiencyScore}%
                          </div>
                          <div className="text-sm text-gray-600">Efficiency Score</div>
                        </div>
                      </div>

                      {/* IoT Sensor Recommendations */}
                      {waterAnalysis.iotRecommendations && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Zap className="w-5 h-5 text-purple-600 mr-2" />
                            IoT Sensor Recommendations
                          </h4>
                          {waterAnalysis.iotRecommendations.map((sensor, index) => (
                            <div key={index} className="p-3 bg-purple-50 rounded-lg mb-2">
                              <h5 className="font-medium text-purple-800">{sensor.sensor}</h5>
                              <p className="text-sm text-purple-700">Location: {sensor.location}</p>
                              <p className="text-sm text-purple-600">Benefit: {sensor.benefit}</p>
                              <p className="text-sm text-purple-500">Cost: {sensor.cost}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Active Alerts */}
                      {waterAnalysis.alerts && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Bell className="w-5 h-5 text-red-600 mr-2" />
                            System Alerts
                          </h4>
                          {waterAnalysis.alerts.map((alert, index) => (
                            <div key={index} className={`p-3 rounded-lg mb-2 ${
                              alert.severity === 'Critical' ? 'bg-red-50 border-l-4 border-red-500' :
                              alert.severity === 'High' ? 'bg-orange-50 border-l-4 border-orange-500' :
                              alert.severity === 'Medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-blue-50 border-l-4 border-blue-500'
                            }`}>
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="font-medium">{alert.type}</h5>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  alert.severity === 'Critical' ? 'bg-red-200 text-red-700' :
                                  alert.severity === 'High' ? 'bg-orange-200 text-orange-700' :
                                  alert.severity === 'Medium' ? 'bg-yellow-200 text-yellow-700' : 'bg-blue-200 text-blue-700'
                                }`}>
                                  {alert.severity}
                                </span>
                              </div>
                              <p className="text-sm mb-1">{alert.message}</p>
                              <p className="text-sm font-medium">Action: {alert.action}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Conservation Tips */}
                      {waterAnalysis.conservationTips && (
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">💧 Water Conservation Tips</h4>
                          <ul className="space-y-1">
                            {waterAnalysis.conservationTips.map((tip, index) => (
                              <li key={index} className="text-sm text-green-700">• {tip}</li>
                            ))}
                          </ul>
                          {waterAnalysis.costSavings && (
                            <p className="text-sm text-green-600 mt-2 font-medium">
                              Potential Annual Savings: {waterAnalysis.costSavings}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!waterAnalysis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter water system information to get AI-powered analysis and IoT recommendations</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Water Quality Tab */}
        {activeTab === 'quality' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sensor Data Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Water Quality Sensor Data</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Flow Rate (L/min)</label>
                    <input
                      type="text"
                      value={sensorData.flowRate}
                      onChange={(e) => setSensorData(prev => ({...prev, flowRate: e.target.value}))}
                      placeholder="150"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pressure (PSI)</label>
                    <input
                      type="text"
                      value={sensorData.pressure}
                      onChange={(e) => setSensorData(prev => ({...prev, pressure: e.target.value}))}
                      placeholder="45"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">pH Level</label>
                    <input
                      type="text"
                      value={sensorData.ph}
                      onChange={(e) => setSensorData(prev => ({...prev, ph: e.target.value}))}
                      placeholder="7.2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Turbidity (NTU)</label>
                    <input
                      type="text"
                      value={sensorData.turbidity}
                      onChange={(e) => setSensorData(prev => ({...prev, turbidity: e.target.value}))}
                      placeholder="0.5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
                  <input
                    type="text"
                    value={sensorData.temperature}
                    onChange={(e) => setSensorData(prev => ({...prev, temperature: e.target.value}))}
                    placeholder="22"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detected Contaminants</label>
                  <textarea
                    value={sensorData.contaminants}
                    onChange={(e) => setSensorData(prev => ({...prev, contaminants: e.target.value}))}
                    placeholder="Chlorine, bacteria, heavy metals, etc."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={analyzeWaterQualityWithAI}
                  disabled={!sensorData.ph || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Analyzing Quality...</span>
                    </>
                  ) : (
                    <>
                      <Thermometer className="w-5 h-5" />
                      <span>Analyze Water Quality</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quality Analysis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Quality Assessment</h3>
              
              {qualityAnalysis && (
                <div className="space-y-6">
                  {qualityAnalysis.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{qualityAnalysis.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Quality Score */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className={`text-2xl font-bold mb-1 ${
                            qualityAnalysis.waterQuality === 'Excellent' ? 'text-green-700' :
                            qualityAnalysis.waterQuality === 'Good' ? 'text-green-600' :
                            qualityAnalysis.waterQuality === 'Fair' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {qualityAnalysis.waterQuality}
                          </div>
                          <div className="text-sm text-gray-600">Water Quality</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {qualityAnalysis.qualityScore}%
                          </div>
                          <div className="text-sm text-gray-600">Quality Score</div>
                        </div>
                      </div>

                      {/* Treatment Recommendations */}
                      {qualityAnalysis.treatmentRecommendations && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">🔬 Treatment Recommendations</h4>
                          {qualityAnalysis.treatmentRecommendations.map((treatment, index) => (
                            <div key={index} className="p-3 bg-blue-50 rounded-lg mb-2">
                              <h5 className="font-medium text-blue-800">{treatment.method}</h5>
                              <p className="text-sm text-blue-700">Effectiveness: {treatment.effectiveness}</p>
                              <p className="text-sm text-blue-600">Cost: {treatment.cost} | Timeline: {treatment.timeline}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Public Health Risk */}
                      {qualityAnalysis.publicHealthRisk && (
                        <div className={`p-4 rounded-lg ${
                          qualityAnalysis.publicHealthRisk === 'Critical' ? 'bg-red-50 border-l-4 border-red-500' :
                          qualityAnalysis.publicHealthRisk === 'High' ? 'bg-orange-50 border-l-4 border-orange-500' :
                          qualityAnalysis.publicHealthRisk === 'Medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-green-50 border-l-4 border-green-500'
                        }`}>
                          <h4 className="font-semibold mb-2">⚕️ Public Health Risk: {qualityAnalysis.publicHealthRisk}</h4>
                          <p className="text-sm">Compliance Status: {qualityAnalysis.complianceStatus}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!qualityAnalysis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Thermometer className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter sensor data to get AI-powered water quality assessment</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Distribution Optimization Tab */}
        {activeTab === 'distribution' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Distribution Data Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribution System Data</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Network Size (km)</label>
                  <input
                    type="text"
                    value={distributionData.networkSize}
                    onChange={(e) => setDistributionData(prev => ({...prev, networkSize: e.target.value}))}
                    placeholder="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Average Pipe Age (years)</label>
                  <input
                    type="text"
                    value={distributionData.pipeAge}
                    onChange={(e) => setDistributionData(prev => ({...prev, pipeAge: e.target.value}))}
                    placeholder="25"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Leakage Rate (%)</label>
                  <input
                    type="text"
                    value={distributionData.leakageRate}
                    onChange={(e) => setDistributionData(prev => ({...prev, leakageRate: e.target.value}))}
                    placeholder="15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Frequency</label>
                  <select
                    value={distributionData.maintenanceFreq}
                    onChange={(e) => setDistributionData(prev => ({...prev, maintenanceFreq: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Demand Pattern</label>
                  <textarea
                    value={distributionData.demandPattern}
                    onChange={(e) => setDistributionData(prev => ({...prev, demandPattern: e.target.value}))}
                    placeholder="Peak hours, seasonal variations, etc."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={analyzeDistributionWithAI}
                  disabled={!distributionData.networkSize || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Optimizing...</span>
                    </>
                  ) : (
                    <>
                      <Settings className="w-5 h-5" />
                      <span>Optimize Distribution</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Distribution Analysis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Distribution Optimization</h3>
              
              {distributionAnalysis && (
                <div className="space-y-6">
                  {distributionAnalysis.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{distributionAnalysis.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Efficiency Score */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className={`text-2xl font-bold mb-1 ${
                            distributionAnalysis.distributionEfficiency === 'Excellent' ? 'text-green-700' :
                            distributionAnalysis.distributionEfficiency === 'Good' ? 'text-green-600' :
                            distributionAnalysis.distributionEfficiency === 'Fair' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {distributionAnalysis.distributionEfficiency}
                          </div>
                          <div className="text-sm text-gray-600">Distribution Efficiency</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {distributionAnalysis.efficiencyScore}%
                          </div>
                          <div className="text-sm text-gray-600">Efficiency Score</div>
                        </div>
                      </div>

                      {/* Smart System Recommendations */}
                      {distributionAnalysis.smartSystemRecommendations && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">🤖 Smart System Upgrades</h4>
                          {distributionAnalysis.smartSystemRecommendations.map((system, index) => (
                            <div key={index} className="p-3 bg-purple-50 rounded-lg mb-2">
                              <h5 className="font-medium text-purple-800">{system.technology}</h5>
                              <p className="text-sm text-purple-700">{system.benefits}</p>
                              <p className="text-sm text-purple-600">{system.implementation}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Demand Management */}
                      {distributionAnalysis.demandManagement && (
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-2">📊 Demand Management</h4>
                          <p className="text-sm text-orange-700 mb-1">
                            <strong>Peak Hours:</strong> {distributionAnalysis.demandManagement.peakHours}
                          </p>
                          <p className="text-sm text-orange-700 mb-1">
                            <strong>Load Balancing:</strong> {distributionAnalysis.demandManagement.loadBalancing}
                          </p>
                          <p className="text-sm text-orange-600">
                            <strong>Dynamic Pricing:</strong> {distributionAnalysis.demandManagement.dynamicPricing}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!distributionAnalysis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter distribution system data to get AI-powered optimization recommendations</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIWaterManagementTool;