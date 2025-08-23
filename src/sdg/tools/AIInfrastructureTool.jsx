import { useState } from 'react';
import { ArrowLeft, Building, MapPin, Calculator, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign, Truck, Users } from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const AIInfrastructureTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('planning');
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    name: '',
    type: 'Road',
    location: '',
    length: '',
    budget: '',
    timeline: '',
    population: '',
    description: ''
  });
  const [analysis, setAnalysis] = useState(null);
  const [routeOptimization, setRouteOptimization] = useState(null);
  const [impactAssessment, setImpactAssessment] = useState(null);
  const [resourcePlan, setResourcePlan] = useState(null);

  const handleAnalyzeProject = async () => {
    setIsLoading(true);
    try {
      const [analysisResult, routeResult, impactResult, resourceResult] = await Promise.all([
        OpenRouterService.analyzeInfrastructure(projectData),
        OpenRouterService.optimizeRoute(projectData),
        OpenRouterService.assessImpact(projectData),
        OpenRouterService.planResources(projectData)
      ]);
      
      setAnalysis(analysisResult);
      setRouteOptimization(routeResult);
      setImpactAssessment(impactResult);
      setResourcePlan(resourceResult);
      setActiveTab('analysis');
    } catch (error) {
      console.error('Infrastructure analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'planning', label: 'Project Planning', icon: <Building size={16} /> },
    { id: 'analysis', label: 'AI Analysis', icon: <TrendingUp size={16} /> },
    { id: 'routes', label: 'Route Optimization', icon: <MapPin size={16} /> },
    { id: 'impact', label: 'Impact Assessment', icon: <AlertTriangle size={16} /> },
    { id: 'resources', label: 'Resource Planning', icon: <Calculator size={16} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
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


        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
            <Building size={16} />
            <span className="font-medium">SDG 9: Infrastructure & Innovation</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Infrastructure Planning</h1>
          <p className="text-gray-600">Plan and optimize infrastructure projects with AI-powered analysis</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white p-1 rounded-lg border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Project Planning Tab */}
        {activeTab === 'planning' && (
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Infrastructure Project Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectData.name}
                  onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mumbai-Pune Highway Extension"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Project Type</label>
                <select
                  value={projectData.type}
                  onChange={(e) => setProjectData({...projectData, type: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Road">Road/Highway</option>
                  <option value="Bridge">Bridge</option>
                  <option value="Railway">Railway</option>
                  <option value="Airport">Airport</option>
                  <option value="Port">Port/Harbor</option>
                  <option value="Water">Water Supply</option>
                  <option value="Power">Power Grid</option>
                  <option value="Telecom">Telecom Network</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                <input
                  type="text"
                  value={projectData.location}
                  onChange={(e) => setProjectData({...projectData, location: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Maharashtra, India"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Length/Size</label>
                <input
                  type="text"
                  value={projectData.length}
                  onChange={(e) => setProjectData({...projectData, length: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 50 km, 2000 sq meters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Estimated Budget</label>
                <input
                  type="text"
                  value={projectData.budget}
                  onChange={(e) => setProjectData({...projectData, budget: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., ₹500 crores"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Timeline</label>
                <input
                  type="text"
                  value={projectData.timeline}
                  onChange={(e) => setProjectData({...projectData, timeline: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 3 years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Population Served</label>
                <input
                  type="text"
                  value={projectData.population}
                  onChange={(e) => setProjectData({...projectData, population: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2 million people"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">Project Description</label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                  placeholder="Describe the project objectives, key features, and expected outcomes..."
                />
              </div>
            </div>
            <button
              onClick={handleAnalyzeProject}
              disabled={isLoading || !projectData.name || !projectData.location}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {isLoading ? <Clock className="animate-spin" size={16} /> : <TrendingUp size={16} />}
              <span>{isLoading ? 'Analyzing Project...' : 'Analyze with AI'}</span>
            </button>
          </div>
        )}

        {/* AI Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Project Analysis</h2>
            {!analysis ? (
              <div className="text-center py-8">
                <Building size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Complete project planning to see AI analysis</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle size={20} className="text-green-600" />
                      <h3 className="font-semibold text-green-900">Feasibility Score</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{analysis.feasibilityScore}%</p>
                    <p className="text-sm text-green-700">{analysis.feasibilityReason}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp size={20} className="text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Traffic Impact</h3>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{analysis.trafficImprovement}</p>
                    <p className="text-sm text-blue-700">Expected improvement</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle size={20} className="text-yellow-600" />
                      <h3 className="font-semibold text-yellow-900">Risk Level</h3>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{analysis.riskLevel}</p>
                    <p className="text-sm text-yellow-700">Overall project risk</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Recommendations</h3>
                  <div className="space-y-2">
                    {analysis.recommendations?.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle size={16} className="text-blue-600 mt-0.5" />
                        <span className="text-gray-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Route Optimization Tab */}
        {activeTab === 'routes' && (
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Route Optimization</h2>
            {!routeOptimization ? (
              <div className="text-center py-8">
                <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Run AI analysis to see route optimization</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Optimal Route</h3>
                    <p className="text-gray-600 mb-3">{routeOptimization.optimalPath}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance:</span>
                        <span className="font-medium">{routeOptimization.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Est. Cost:</span>
                        <span className="font-medium">{routeOptimization.estimatedCost}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Alternative Routes</h3>
                    <div className="space-y-2">
                      {routeOptimization.alternatives?.map((alt, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded">
                          <p className="text-sm font-medium">{alt.name}</p>
                          <p className="text-xs text-gray-600">{alt.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Impact Assessment Tab */}
        {activeTab === 'impact' && (
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Environmental & Social Impact</h2>
            {!impactAssessment ? (
              <div className="text-center py-8">
                <AlertTriangle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Run AI analysis to see impact assessment</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Environmental Impact</h3>
                    <div className="space-y-3">
                      {impactAssessment.environmental?.map((impact, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <div className={`w-3 h-3 rounded-full mt-1 ${
                            impact.severity === 'High' ? 'bg-red-500' : 
                            impact.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{impact.factor}</p>
                            <p className="text-sm text-gray-600">{impact.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Social Impact</h3>
                    <div className="space-y-3">
                      {impactAssessment.social?.map((impact, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <Users size={16} className="text-blue-600 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900">{impact.aspect}</p>
                            <p className="text-sm text-gray-600">{impact.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resource Planning Tab */}
        {activeTab === 'resources' && (
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Resource Planning & Timeline</h2>
            {!resourcePlan ? (
              <div className="text-center py-8">
                <Calculator size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Run AI analysis to see resource planning</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign size={20} className="text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Total Cost</h3>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{resourcePlan.totalCost}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock size={20} className="text-green-600" />
                      <h3 className="font-semibold text-green-900">Duration</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{resourcePlan.duration}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck size={20} className="text-purple-600" />
                      <h3 className="font-semibold text-purple-900">Resources</h3>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{resourcePlan.resourceCount}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Material Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {resourcePlan.materials?.map((material, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">{material.name}</span>
                        <span className="text-gray-600">{material.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Project Timeline</h3>
                  <div className="space-y-2">
                    {resourcePlan.timeline?.map((phase, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{phase.phase}</p>
                          <p className="text-sm text-gray-600">{phase.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInfrastructureTool;