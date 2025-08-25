import { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb, TrendingUp, Users, Target, X } from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';
import AIPovertyTool from '../tools/AIPovertyTool';
import SustainableFarmingTool from '../tools/SustainableFarmingTool';
import EmpowermentTool from '../tools/AIEmpowermentTool';
import AIHealthcareTool from '../tools/AIHealthcareTool';
import AIWaterManagementTool from '../tools/AIWaterManagementTool';
import AIInclusiveEducationTool from '../tools/AIInclusiveEducationTool';
import AIJobMatchingTool from '../tools/AIJobMatchingTool';
import AIInfrastructureTool from '../tools/AIInfrastructureTool';

const SimpleAISolutionsDashboard = ({ onBack }) => {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [solutionDetails, setSolutionDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [currentTool, setCurrentTool] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#healthcare-ai') {
        setCurrentTool('healthcare');
      } else if (hash === '#education-ai') {
        setCurrentTool('education');
      } else if (hash === '#water-management-ai') {
        setCurrentTool('water');
      } else {
        const match = hash.match(/#sdg-(\d+)-tool/);
        if (match) {
          setCurrentTool(`sdg-${match[1]}`);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const solutions = [
    {
      id: 1,
      sdg: 1,
      title: 'AI to End Poverty',
      description: 'AI-driven platform to assess poverty levels and predict vulnerable areas using machine learning',
      impact: 'High',
      difficulty: 'High',
      category: 'Predictive Analytics'
    },
    {
      id: 2,
      sdg: 2,
      title: 'AI-Powered Smart Farming',
      description: 'Comprehensive soil health monitoring, crop disease detection, resource optimization, and market analysis platform',
      impact: 'High',
      difficulty: 'Medium',
      category: 'Agriculture'
    },
    {
      id: 3,
      sdg: 3,
      title: 'AI for Healthcare',
      description: 'AI tool for early disease diagnosis, personalized treatment, and telemedicine support',
      impact: 'High',
      difficulty: 'High',
      category: 'Healthcare'
    },
    {
      id: 4,
      sdg: 4,
      title: 'AI for Inclusive Education',
      description: 'Adaptive tutoring system that personalizes learning for individual students worldwide',
      impact: 'High',
      difficulty: 'Medium',
      category: 'Education'
    },
    {
      id: 5,
      sdg: 5,
      title: 'AI for Empowerment',
      description: 'Platform to detect and report gender biases in hiring, salaries, and media content',
      impact: 'Medium',
      difficulty: 'Medium',
      category: 'Social Justice'
    },
    {
      id: 6,
      sdg: 6,
      title: 'AI for Water Management',
      description: 'Real-time water quality monitoring and distribution optimization using predictive models',
      impact: 'High',
      difficulty: 'Medium',
      category: 'Infrastructure'
    },
    {
      id: 7,
      sdg: 7,
      title: 'AI for Energy Optimization',
      description: 'Platform to optimize energy consumption and promote renewable energy sources',
      impact: 'High',
      difficulty: 'Medium',
      category: 'Energy'
    },
    {
      id: 8,
      sdg: 8,
      title: 'AI for Job Matching',
      description: 'Platform to match individuals with employment opportunities and offer upskilling recommendations',
      impact: 'Medium',
      difficulty: 'Low',
      category: 'Employment'
    },
    {
      id: 9,
      sdg: 9,
      title: 'AI for Infrastructure Planning',
      description: 'System to design and optimize infrastructure projects with traffic and environmental modeling',
      impact: 'High',
      difficulty: 'High',
      category: 'Infrastructure'
    },
    {
      id: 10,
      sdg: 10,
      title: 'AI for Equal Opportunity',
      description: 'Tool to detect and address systemic biases in hiring, education, and healthcare',
      impact: 'Medium',
      difficulty: 'Medium',
      category: 'Social Justice'
    },
    {
      id: 11,
      sdg: 11,
      title: 'AI for Smart Cities',
      description: 'Platform to monitor and manage urban environments, optimizing traffic and public services',
      impact: 'High',
      difficulty: 'High',
      category: 'Urban Planning'
    },
    {
      id: 12,
      sdg: 12,
      title: 'AI for Sustainable Supply Chains',
      description: 'Solution to track supply chain sustainability and optimize production to reduce waste',
      impact: 'Medium',
      difficulty: 'Medium',
      category: 'Supply Chain'
    },
    {
      id: 13,
      sdg: 13,
      title: 'AI for Climate Modeling',
      description: 'Tools using climate data to predict weather patterns and suggest mitigation strategies',
      impact: 'High',
      difficulty: 'High',
      category: 'Environment'
    },
    {
      id: 14,
      sdg: 14,
      title: 'AI for Marine Conservation',
      description: 'System to analyze oceanographic data, track marine life, and detect illegal fishing',
      impact: 'Medium',
      difficulty: 'Medium',
      category: 'Conservation'
    },
    {
      id: 15,
      sdg: 15,
      title: 'AI for Biodiversity Protection',
      description: 'Models analyzing satellite images to monitor ecosystems and track endangered species',
      impact: 'Medium',
      difficulty: 'Medium',
      category: 'Conservation'
    },
    {
      id: 16,
      sdg: 16,
      title: 'AI for Good Governance',
      description: 'Tools for detecting corruption, promoting transparency, and analyzing public sentiment',
      impact: 'Medium',
      difficulty: 'High',
      category: 'Governance'
    },
    {
      id: 17,
      sdg: 17,
      title: 'AI for Global Collaboration',
      description: 'Platform fostering collaboration between NGOs, governments, and businesses on SDGs',
      impact: 'High',
      difficulty: 'Medium',
      category: 'Partnership'
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-green-700 bg-green-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'Low': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'High': return 'text-red-700 bg-red-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'Low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const handleOpenTool = (solution) => {
    if (solution.sdg === 1) {
      setCurrentTool('ai-poverty');
      window.location.hash = '#ai-poverty-tool';
    } else if (solution.sdg === 2) {
      setCurrentTool('smart-farming');
      window.location.hash = '#smart-farming-tool';
    } else if (solution.sdg === 3) {
      setCurrentTool('ai-healthcare');
      window.location.hash = '#ai-healthcare-tool';
    } else if (solution.sdg === 4) {
      setCurrentTool('ai-education');
      window.location.hash = '#ai-education-tool';
    } else if (solution.sdg === 5) {
      setCurrentTool('empowerment');
      window.location.hash = '#empowerment-tool';
    } else if (solution.sdg === 6) {
      setCurrentTool('water-management');
      window.location.hash = '#water-management-tool';
    } else if (solution.sdg === 8) {
      setCurrentTool('ai-jobs');
      window.location.hash = '#ai-jobs-tool';
    } else if (solution.sdg === 9) {
      setCurrentTool('ai-infrastructure');
      window.location.hash = '#ai-infrastructure-tool';
    } else {
      alert('AI tools are currently under development. Coming soon!');
    }
  };

  const handleLearnMore = async (solution) => {
    setSelectedSolution(solution);
    setIsLoadingDetails(true);
    setSolutionDetails(null);
    
    try {
      const systemPrompt = 'You are an SDG expert. Generate detailed educational content about AI solutions for sustainable development. Provide overview, key points, examples, and action items in JSON format: {"overview": "", "keyPoints": [], "examples": [], "actionItems": []}';
      const response = await OpenRouterService.callAPI(`${solution.title}: ${solution.description}`, systemPrompt);
      const detailedInfo = JSON.parse(response);
      setSolutionDetails(detailedInfo);
    } catch (error) {
      console.error('Error getting solution details:', error);
      setSolutionDetails({
        overview: 'Unable to load AI-generated details at this time.',
        keyPoints: ['Please try again later'],
        examples: [],
        actionItems: ['Contact support if the issue persists']
      });
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setSelectedSolution(null);
    setSolutionDetails(null);
  };

  const closeTool = () => {
    setCurrentTool(null);
    window.location.hash = '';
  };

  if (currentTool === 'ai-poverty') {
    return <AIPovertyTool onBack={closeTool} />;
  }

  if (currentTool === 'sustainable-farming') {
    return <SustainableFarmingTool onBack={closeTool} />;
  }

  if (currentTool === 'smart-farming') {
    return <SustainableFarmingTool onBack={closeTool} />;
  }

  if (currentTool === 'ai-healthcare') {
    return <AIHealthcareTool onBack={closeTool} />;
  }

  if (currentTool === 'water-management') {
    return <AIWaterManagementTool onBack={closeTool} />;
  }

  if (currentTool === 'ai-education') {
    return <AIInclusiveEducationTool onBack={closeTool} />;
  }

  if (currentTool === 'ai-jobs') {
    return <AIJobMatchingTool onBack={closeTool} />;
  }

  if (currentTool === 'ai-infrastructure') {
    return <AIInfrastructureTool onBack={closeTool} />;
  }

  if (currentTool === 'empowerment') {
    return <EmpowermentTool onBack={closeTool} />;
  }

  // Other tools temporarily disabled

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
            <span>Back to Dashboard</span>
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4">
            <Lightbulb size={16} />
            <span className="text-sm font-medium">AI Solutions</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered SDG Solutions
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore innovative AI solutions designed to address specific Sustainable Development Goals. 
            Each solution is tailored to create measurable impact.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border rounded-lg p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">17</div>
            <div className="text-sm text-gray-600">SDGs Covered</div>
          </div>
          
          <div className="bg-white border rounded-lg p-6 text-center">
            <Lightbulb className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">{solutions.length}</div>
            <div className="text-sm text-gray-600">AI Solutions</div>
          </div>
          
          <div className="bg-white border rounded-lg p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">5K+</div>
            <div className="text-sm text-gray-600">Implementers</div>
          </div>
          
          <div className="bg-white border rounded-lg p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-orange-600" />
            <div className="text-2xl font-bold text-gray-900">85%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {solution.sdg}
                  </div>
                  <span className="text-sm text-gray-600">SDG {solution.sdg}</span>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(solution.impact)}`}>
                    {solution.impact} Impact
                  </span>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">
                {solution.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                {solution.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(solution.difficulty)}`}>
                    {solution.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {solution.category}
                  </span>
                </div>
                <button 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  onClick={() => handleOpenTool(solution)}
                >
                  Open Tool →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Filter by Category */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {[...new Set(solutions.map(s => s.category))].map(category => (
              <button
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-100 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Have an AI Solution Idea?
          </h3>
          <p className="text-gray-600 mb-6">
            Submit your AI solution proposal and help accelerate SDG progress worldwide.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Submit Solution
          </button>
        </div>
      </div>

      {/* Solution Details Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSolution.title}</h2>
                  <p className="text-gray-600">SDG {selectedSolution.sdg} Solution</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {isLoadingDetails ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <p className="text-gray-600">AI is generating detailed information...</p>
                </div>
              ) : solutionDetails ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
                    <p className="text-gray-700">{solutionDetails.overview}</p>
                  </div>

                  {solutionDetails.keyPoints && solutionDetails.keyPoints.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Key Points</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {solutionDetails.keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solutionDetails.examples && solutionDetails.examples.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {solutionDetails.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solutionDetails.actionItems && solutionDetails.actionItems.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Action Items</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {solutionDetails.actionItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <button
                      onClick={closeModal}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleAISolutionsDashboard;