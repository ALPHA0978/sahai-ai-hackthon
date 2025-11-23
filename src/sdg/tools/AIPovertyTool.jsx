import { useState } from 'react';
import { 
  Brain, TrendingDown, Users, MapPin, AlertTriangle, 
  CheckCircle, BarChart3, Target, ArrowLeft, Send, 
  Loader, DollarSign, Home, Briefcase, GraduationCap
} from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const AIPovertyTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('assessment');
  const [povertyData, setPovertyData] = useState({
    location: '',
    population: '',
    avgIncome: '',
    unemploymentRate: '',
    literacyRate: '',
    healthcareAccess: '',
    housingConditions: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [interventions, setInterventions] = useState(null);

  const handleInputChange = (field, value) => {
    setPovertyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzePovertyWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are an AI expert in poverty analysis and SDG 1 (No Poverty). Analyze the provided data and return comprehensive poverty assessment as JSON:
      {
        "povertyLevel": "Extreme|High|Moderate|Low",
        "riskScore": number (0-100),
        "keyIndicators": {
          "income": "analysis",
          "employment": "analysis", 
          "education": "analysis",
          "healthcare": "analysis",
          "housing": "analysis"
        },
        "vulnerableGroups": ["group1", "group2"],
        "rootCauses": ["cause1", "cause2"],
        "immediateNeeds": ["need1", "need2"],
        "recommendations": ["rec1", "rec2"],
        "interventionPriority": ["high priority", "medium priority"],
        "expectedImpact": "description",
        "timeline": "timeframe",
        "successMetrics": ["metric1", "metric2"]
      }`;

      const prompt = `Analyze this poverty data:
      Location: ${povertyData.location}
      Population: ${povertyData.population}
      Average Income: ${povertyData.avgIncome}
      Unemployment Rate: ${povertyData.unemploymentRate}%
      Literacy Rate: ${povertyData.literacyRate}%
      Healthcare Access: ${povertyData.healthcareAccess}
      Housing Conditions: ${povertyData.housingConditions}
      
      Provide comprehensive AI-powered poverty analysis and actionable recommendations.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const analysis = OpenRouterService.parseJSON(response);
      
      setAiAnalysis(analysis);
      
      // Generate predictions
      await generatePredictions(analysis);
      
      // Generate interventions
      await generateInterventions(analysis);
      
    } catch (error) {
      console.error('AI Analysis error:', error);
      setAiAnalysis({
        error: 'AI analysis failed. Please check your data and try again.',
        povertyLevel: 'Unknown',
        riskScore: 0
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePredictions = async (analysis) => {
    try {
      const systemPrompt = `You are a predictive AI for poverty trends. Generate future predictions based on current poverty analysis. Return JSON:
      {
        "shortTerm": {
          "timeframe": "6 months",
          "predictions": ["prediction1", "prediction2"],
          "riskFactors": ["risk1", "risk2"]
        },
        "longTerm": {
          "timeframe": "2-5 years", 
          "predictions": ["prediction1", "prediction2"],
          "opportunities": ["opportunity1", "opportunity2"]
        },
        "scenarios": {
          "bestCase": "description",
          "worstCase": "description",
          "mostLikely": "description"
        }
      }`;

      const prompt = `Based on this poverty analysis, predict future trends:
      Current Poverty Level: ${analysis.povertyLevel}
      Risk Score: ${analysis.riskScore}
      Key Issues: ${analysis.rootCauses?.join(', ')}
      Location: ${povertyData.location}`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const predictionData = OpenRouterService.parseJSON(response);
      setPredictions(predictionData);
    } catch (error) {
      console.error('Predictions error:', error);
    }
  };

  const generateInterventions = async (analysis) => {
    try {
      const systemPrompt = `You are an AI intervention strategist for poverty reduction. Generate specific, actionable interventions. Return JSON:
      {
        "immediate": [
          {
            "title": "intervention name",
            "description": "detailed description",
            "cost": "estimated cost",
            "timeline": "implementation time",
            "impact": "expected impact",
            "feasibility": "High|Medium|Low"
          }
        ],
        "mediumTerm": [
          {
            "title": "intervention name", 
            "description": "detailed description",
            "cost": "estimated cost",
            "timeline": "implementation time",
            "impact": "expected impact",
            "feasibility": "High|Medium|Low"
          }
        ],
        "longTerm": [
          {
            "title": "intervention name",
            "description": "detailed description", 
            "cost": "estimated cost",
            "timeline": "implementation time",
            "impact": "expected impact",
            "feasibility": "High|Medium|Low"
          }
        ]
      }`;

      const prompt = `Generate specific poverty reduction interventions for:
      Poverty Level: ${analysis.povertyLevel}
      Key Issues: ${analysis.rootCauses?.join(', ')}
      Vulnerable Groups: ${analysis.vulnerableGroups?.join(', ')}
      Location: ${povertyData.location}
      Population: ${povertyData.population}`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const interventionData = OpenRouterService.parseJSON(response);
      setInterventions(interventionData);
    } catch (error) {
      console.error('Interventions error:', error);
    }
  };

  const isFormValid = () => {
    return povertyData.location && povertyData.population && povertyData.avgIncome;
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-100 text-red-700 mb-4">
            <Target size={16} />
            <span className="text-sm font-medium">SDG 1 - No Poverty</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI to End Poverty
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AI-driven platform to assess poverty levels and predict vulnerable areas using machine learning. 
            Get intelligent insights and actionable recommendations to combat poverty effectively.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'assessment', label: 'Poverty Assessment', icon: <BarChart3 size={16} /> },
            { id: 'predictions', label: 'AI Predictions', icon: <Brain size={16} /> },
            { id: 'interventions', label: 'Interventions', icon: <Target size={16} /> }
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

        {/* Assessment Tab */}
        {activeTab === 'assessment' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Poverty Data Input</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location (City/Region/Country)
                  </label>
                  <input
                    type="text"
                    value={povertyData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Mumbai, Maharashtra, India"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Population
                  </label>
                  <input
                    type="text"
                    value={povertyData.population}
                    onChange={(e) => handleInputChange('population', e.target.value)}
                    placeholder="e.g., 12.4 million"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Average Monthly Income (₹)
                  </label>
                  <input
                    type="text"
                    value={povertyData.avgIncome}
                    onChange={(e) => handleInputChange('avgIncome', e.target.value)}
                    placeholder="e.g., 15000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-1" />
                    Unemployment Rate (%)
                  </label>
                  <input
                    type="text"
                    value={povertyData.unemploymentRate}
                    onChange={(e) => handleInputChange('unemploymentRate', e.target.value)}
                    placeholder="e.g., 8.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <GraduationCap className="w-4 h-4 inline mr-1" />
                    Literacy Rate (%)
                  </label>
                  <input
                    type="text"
                    value={povertyData.literacyRate}
                    onChange={(e) => handleInputChange('literacyRate', e.target.value)}
                    placeholder="e.g., 74.2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare Access</label>
                  <select
                    value={povertyData.healthcareAccess}
                    onChange={(e) => handleInputChange('healthcareAccess', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select healthcare access level</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Very Poor">Very Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home className="w-4 h-4 inline mr-1" />
                    Housing Conditions
                  </label>
                  <select
                    value={povertyData.housingConditions}
                    onChange={(e) => handleInputChange('housingConditions', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select housing conditions</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Slums">Slums</option>
                  </select>
                </div>

                <button
                  onClick={analyzePovertyWithAI}
                  disabled={!isFormValid() || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      <span>Analyze with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Analysis Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Analysis Results</h3>
              
              {isAnalyzing && (
                <div className="text-center py-12">
                  <Brain className="w-12 h-12 text-red-600 animate-pulse mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing poverty data...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              )}

              {aiAnalysis && !isAnalyzing && (
                <div className="space-y-6">
                  {aiAnalysis.error ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{aiAnalysis.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Poverty Level & Risk Score */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className={`text-2xl font-bold mb-1 ${
                            aiAnalysis.povertyLevel === 'Extreme' ? 'text-red-700' :
                            aiAnalysis.povertyLevel === 'High' ? 'text-red-600' :
                            aiAnalysis.povertyLevel === 'Moderate' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {aiAnalysis.povertyLevel}
                          </div>
                          <div className="text-sm text-gray-600">Poverty Level</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600 mb-1">
                            {aiAnalysis.riskScore}%
                          </div>
                          <div className="text-sm text-gray-600">Risk Score</div>
                        </div>
                      </div>

                      {/* Key Indicators */}
                      {aiAnalysis.keyIndicators && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Indicators Analysis</h4>
                          <div className="space-y-2">
                            {Object.entries(aiAnalysis.keyIndicators).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span className="capitalize font-medium">{key}:</span>
                                <span className="text-sm text-gray-600">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Vulnerable Groups */}
                      {aiAnalysis.vulnerableGroups && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Vulnerable Groups</h4>
                          <div className="flex flex-wrap gap-2">
                            {aiAnalysis.vulnerableGroups.map((group, index) => (
                              <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                {group}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Root Causes */}
                      {aiAnalysis.rootCauses && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Root Causes</h4>
                          <ul className="space-y-1">
                            {aiAnalysis.rootCauses.map((cause, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                                <span className="text-sm text-gray-700">{cause}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Immediate Needs */}
                      {aiAnalysis.immediateNeeds && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Immediate Needs</h4>
                          <ul className="space-y-1">
                            {aiAnalysis.immediateNeeds.map((need, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span className="text-sm text-gray-700">{need}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {!aiAnalysis && !isAnalyzing && (
                <div className="text-center py-12 text-gray-500">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter poverty data and click "Analyze with AI" to get intelligent insights</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">AI-Powered Predictions</h3>
            
            {predictions ? (
              <div className="space-y-8">
                {/* Short Term Predictions */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    Short Term ({predictions.shortTerm?.timeframe})
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Predictions:</h5>
                      <ul className="space-y-1">
                        {predictions.shortTerm?.predictions?.map((pred, index) => (
                          <li key={index} className="text-sm text-gray-600">• {pred}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Risk Factors:</h5>
                      <ul className="space-y-1">
                        {predictions.shortTerm?.riskFactors?.map((risk, index) => (
                          <li key={index} className="text-sm text-red-600">⚠️ {risk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Long Term Predictions */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">
                    Long Term ({predictions.longTerm?.timeframe})
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Predictions:</h5>
                      <ul className="space-y-1">
                        {predictions.longTerm?.predictions?.map((pred, index) => (
                          <li key={index} className="text-sm text-gray-600">• {pred}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Opportunities:</h5>
                      <ul className="space-y-1">
                        {predictions.longTerm?.opportunities?.map((opp, index) => (
                          <li key={index} className="text-sm text-green-600">✅ {opp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Scenarios */}
                {predictions.scenarios && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-semibold text-green-700 mb-2">Best Case</h5>
                      <p className="text-sm text-gray-700">{predictions.scenarios.bestCase}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h5 className="font-semibold text-yellow-700 mb-2">Most Likely</h5>
                      <p className="text-sm text-gray-700">{predictions.scenarios.mostLikely}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h5 className="font-semibold text-red-700 mb-2">Worst Case</h5>
                      <p className="text-sm text-gray-700">{predictions.scenarios.worstCase}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <TrendingDown className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Run poverty assessment first to generate AI predictions</p>
              </div>
            )}
          </div>
        )}

        {/* Interventions Tab */}
        {activeTab === 'interventions' && (
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">AI-Recommended Interventions</h3>
            
            {interventions ? (
              <div className="space-y-8">
                {/* Immediate Interventions */}
                {interventions.immediate && (
                  <div>
                    <h4 className="font-semibold text-red-700 mb-4">🚨 Immediate Interventions</h4>
                    <div className="grid gap-4">
                      {interventions.immediate.map((intervention, index) => (
                        <div key={index} className="p-4 border border-red-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-900">{intervention.title}</h5>
                            <span className={`px-2 py-1 rounded text-xs ${
                              intervention.feasibility === 'High' ? 'bg-green-100 text-green-700' :
                              intervention.feasibility === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {intervention.feasibility} Feasibility
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{intervention.description}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Cost:</span> {intervention.cost}
                            </div>
                            <div>
                              <span className="font-medium">Timeline:</span> {intervention.timeline}
                            </div>
                            <div>
                              <span className="font-medium">Impact:</span> {intervention.impact}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medium Term Interventions */}
                {interventions.mediumTerm && (
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-4">⏳ Medium Term Interventions</h4>
                    <div className="grid gap-4">
                      {interventions.mediumTerm.map((intervention, index) => (
                        <div key={index} className="p-4 border border-yellow-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-900">{intervention.title}</h5>
                            <span className={`px-2 py-1 rounded text-xs ${
                              intervention.feasibility === 'High' ? 'bg-green-100 text-green-700' :
                              intervention.feasibility === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {intervention.feasibility} Feasibility
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{intervention.description}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Cost:</span> {intervention.cost}
                            </div>
                            <div>
                              <span className="font-medium">Timeline:</span> {intervention.timeline}
                            </div>
                            <div>
                              <span className="font-medium">Impact:</span> {intervention.impact}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Long Term Interventions */}
                {interventions.longTerm && (
                  <div>
                    <h4 className="font-semibold text-green-700 mb-4">🎯 Long Term Interventions</h4>
                    <div className="grid gap-4">
                      {interventions.longTerm.map((intervention, index) => (
                        <div key={index} className="p-4 border border-green-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-900">{intervention.title}</h5>
                            <span className={`px-2 py-1 rounded text-xs ${
                              intervention.feasibility === 'High' ? 'bg-green-100 text-green-700' :
                              intervention.feasibility === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {intervention.feasibility} Feasibility
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{intervention.description}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Cost:</span> {intervention.cost}
                            </div>
                            <div>
                              <span className="font-medium">Timeline:</span> {intervention.timeline}
                            </div>
                            <div>
                              <span className="font-medium">Impact:</span> {intervention.impact}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Run poverty assessment first to generate AI-powered intervention recommendations</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPovertyTool;