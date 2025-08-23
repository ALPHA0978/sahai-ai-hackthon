import { useState } from 'react';
import { 
  Database, Upload, Download, RefreshCw, CheckCircle, 
  AlertCircle, BarChart3, Map, Users, Heart, GraduationCap, 
  Leaf, ArrowLeft, Plus, X, Eye
} from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const DataCollectionTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [datasets, setDatasets] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const dataCategories = [
    {
      id: 'socioeconomic',
      name: 'Socio-Economic Data',
      icon: <Users className="w-5 h-5" />,
      description: 'Income levels, employment, education, family structure',
      color: 'bg-blue-100 text-blue-700',
      fields: ['Income Level', 'Employment Status', 'Education Level', 'Family Size', 'Access to Services']
    },
    {
      id: 'geographic',
      name: 'Geographic Data',
      icon: <Map className="w-5 h-5" />,
      description: 'Location, infrastructure, urban/rural classification',
      color: 'bg-green-100 text-green-700',
      fields: ['Location Type', 'Infrastructure Access', 'Transportation', 'Internet Connectivity']
    },
    {
      id: 'health',
      name: 'Health Data',
      icon: <Heart className="w-5 h-5" />,
      description: 'Healthcare access, disease prevalence, nutrition',
      color: 'bg-red-100 text-red-700',
      fields: ['Healthcare Access', 'Disease Prevalence', 'Nutrition Status', 'Maternal Health']
    },
    {
      id: 'education',
      name: 'Education Data',
      icon: <GraduationCap className="w-5 h-5" />,
      description: 'School enrollment, literacy rates, education access',
      color: 'bg-purple-100 text-purple-700',
      fields: ['Enrollment Rates', 'Literacy Levels', 'School Infrastructure', 'Teacher Availability']
    },
    {
      id: 'environmental',
      name: 'Environmental Data',
      icon: <Leaf className="w-5 h-5" />,
      description: 'Climate impact, agriculture, natural disasters',
      color: 'bg-yellow-100 text-yellow-700',
      fields: ['Climate Data', 'Agricultural Production', 'Disaster Risk', 'Environmental Quality']
    }
  ];

  const mockDatasets = [
    {
      id: 1,
      name: 'Census 2021 - Socio-Economic Survey',
      category: 'socioeconomic',
      source: 'Government of India',
      records: 125000,
      lastUpdated: '2024-01-15',
      status: 'active',
      quality: 95
    },
    {
      id: 2,
      name: 'Rural Infrastructure Mapping',
      category: 'geographic',
      source: 'Ministry of Rural Development',
      records: 85000,
      lastUpdated: '2024-01-10',
      status: 'active',
      quality: 88
    },
    {
      id: 3,
      name: 'Public Health Database',
      category: 'health',
      source: 'Ministry of Health',
      records: 200000,
      lastUpdated: '2024-01-12',
      status: 'processing',
      quality: 92
    }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploaded'
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const analyzeDataIntegration = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = `You are a data integration expert for poverty assessment. Analyze the provided datasets and return integration recommendations as JSON:
      {
        "integrationScore": number,
        "dataQuality": "High|Medium|Low",
        "recommendations": ["rec1", "rec2"],
        "missingData": ["missing1", "missing2"],
        "integrationPlan": {
          "steps": ["step1", "step2"],
          "timeline": "X weeks",
          "resources": ["resource1", "resource2"]
        },
        "povertyIndicators": ["indicator1", "indicator2"]
      }`;

      const prompt = `Analyze these datasets for poverty assessment integration:
      Categories: ${dataCategories.map(cat => cat.name).join(', ')}
      Sample datasets: ${mockDatasets.map(d => `${d.name} (${d.records} records)`).join(', ')}
      
      Provide integration analysis and recommendations.`;

      const response = await OpenRouterService.callAPI(prompt, systemPrompt);
      const results = OpenRouterService.parseJSON(response);
      
      setAnalysisResults(results);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResults({
        integrationScore: 75,
        dataQuality: 'Medium',
        recommendations: ['Standardize data formats', 'Fill geographic gaps'],
        missingData: ['Real-time income data', 'Detailed health records'],
        integrationPlan: {
          steps: ['Data cleaning', 'Schema mapping', 'Integration testing'],
          timeline: '4-6 weeks',
          resources: ['Data engineers', 'Domain experts']
        },
        povertyIndicators: ['Income inequality', 'Access to services', 'Education gaps']
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
            <Database size={16} />
            <span className="text-sm font-medium">SDG 1 - No Poverty</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Data Collection & Integration Tool
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Gather and integrate diverse datasets to build a comprehensive poverty assessment system. 
            Combine socio-economic, geographic, health, education, and environmental data for AI-powered analysis.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
            { id: 'categories', label: 'Data Categories', icon: <Database size={16} /> },
            { id: 'upload', label: 'Upload Data', icon: <Upload size={16} /> },
            { id: 'integration', label: 'Integration', icon: <RefreshCw size={16} /> }
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 border">
                <div className="flex items-center space-x-3 mb-2">
                  <Database className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">5</div>
                    <div className="text-sm text-gray-600">Data Categories</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">410K</div>
                    <div className="text-sm text-gray-600">Total Records</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">92%</div>
                    <div className="text-sm text-gray-600">Data Quality</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border">
                <div className="flex items-center space-x-3 mb-2">
                  <RefreshCw className="w-8 h-8 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Active Integrations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Datasets */}
            <div className="bg-white rounded-lg border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Current Datasets</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockDatasets.map(dataset => (
                    <div key={dataset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          dataCategories.find(cat => cat.id === dataset.category)?.color || 'bg-gray-100'
                        }`}>
                          {dataCategories.find(cat => cat.id === dataset.category)?.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{dataset.name}</h4>
                          <p className="text-sm text-gray-600">{dataset.source} • {dataset.records.toLocaleString()} records</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          dataset.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {dataset.status}
                        </div>
                        <div className="text-sm text-gray-600">{dataset.quality}% quality</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Categories Tab */}
        {activeTab === 'categories' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCategories.map(category => (
              <div key={category.id} className="bg-white rounded-lg border p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Key Fields:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.fields.map(field => (
                      <span key={field} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-8">
            {/* Upload Area */}
            <div className="bg-white rounded-lg border p-8">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Dataset</h3>
                <p className="text-gray-600 mb-6">
                  Upload CSV, Excel, or JSON files containing poverty-related data
                </p>
                
                <input
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Select Files</span>
                </label>
              </div>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-lg border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Integration Tab */}
        {activeTab === 'integration' && (
          <div className="space-y-8">
            {/* Integration Controls */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Data Integration Analysis</h3>
                <button
                  onClick={analyzeDataIntegration}
                  disabled={isAnalyzing}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Integration'}</span>
                </button>
              </div>

              {isAnalyzing && (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing data integration possibilities...</p>
                </div>
              )}

              {analysisResults && !isAnalyzing && (
                <div className="space-y-6">
                  {/* Integration Score */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {analysisResults.integrationScore}%
                      </div>
                      <div className="text-sm text-gray-600">Integration Score</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600 mb-1">
                        {analysisResults.dataQuality}
                      </div>
                      <div className="text-sm text-gray-600">Data Quality</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600 mb-1">
                        {analysisResults.integrationPlan?.timeline}
                      </div>
                      <div className="text-sm text-gray-600">Timeline</div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {analysisResults.recommendations?.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Missing Data</h4>
                      <ul className="space-y-2">
                        {analysisResults.missingData?.map((missing, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                            <span className="text-sm text-gray-700">{missing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Integration Plan */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Integration Plan</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Steps:</h5>
                        <ol className="list-decimal list-inside space-y-1">
                          {analysisResults.integrationPlan?.steps?.map((step, index) => (
                            <li key={index} className="text-sm text-gray-600">{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Required Resources:</h5>
                        <ul className="space-y-1">
                          {analysisResults.integrationPlan?.resources?.map((resource, index) => (
                            <li key={index} className="text-sm text-gray-600">• {resource}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCollectionTool;