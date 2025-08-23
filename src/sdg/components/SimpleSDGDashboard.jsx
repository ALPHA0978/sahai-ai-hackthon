import { useState } from 'react';
import { Target, TrendingUp, Users, Award, ArrowRight, Globe } from 'lucide-react';

const SimpleSDGDashboard = ({ onNavigateToTool }) => {
  const [stats] = useState({
    totalProjects: 1250,
    activeUsers: 45000,
    impactScore: 87,
    partnershipsFormed: 320
  });

  const sdgGoals = [
    { id: 1, title: 'No Poverty', color: '#E5243B' },
    { id: 2, title: 'Zero Hunger', color: '#DDA63A' },
    { id: 3, title: 'Good Health', color: '#4C9F38' },
    { id: 4, title: 'Quality Education', color: '#C5192D' },
    { id: 5, title: 'Gender Equality', color: '#FF3A21' },
    { id: 6, title: 'Clean Water', color: '#26BDE2' },
    { id: 7, title: 'Clean Energy', color: '#FCC30B' },
    { id: 8, title: 'Decent Work', color: '#A21942' },
    { id: 9, title: 'Innovation', color: '#FD6925' },
    { id: 10, title: 'Reduced Inequalities', color: '#DD1367' },
    { id: 11, title: 'Sustainable Cities', color: '#FD9D24' },
    { id: 12, title: 'Responsible Consumption', color: '#BF8B2E' },
    { id: 13, title: 'Climate Action', color: '#3F7E44' },
    { id: 14, title: 'Life Below Water', color: '#0A97D9' },
    { id: 15, title: 'Life on Land', color: '#56C02B' },
    { id: 16, title: 'Peace & Justice', color: '#00689D' },
    { id: 17, title: 'Partnerships', color: '#19486A' }
  ];

  const aiTools = [
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      description: 'Discover AI-powered solutions for SDG challenges',
      category: 'Analysis'
    },
    {
      id: 'personalized-suggestions',
      title: 'Personal Suggestions',
      description: 'Get personalized SDG recommendations',
      category: 'Recommendations'
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      description: 'Chat with our SDG AI assistant',
      category: 'Support'
    },
    {
      id: 'impact-tracker',
      title: 'Impact Tracker',
      description: 'Track and measure your SDG impact',
      category: 'Analytics'
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4">
            <Globe size={16} />
            <span className="text-sm font-medium">AI-Powered SDG Platform</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sustainable Development Goals Dashboard
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Harness AI to accelerate progress towards the UN Sustainable Development Goals. 
            Get insights, connect with partners, and track your impact.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border rounded-lg p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalProjects.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">SDG Projects</div>
          </div>
          
          <div className="bg-white border rounded-lg p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">
              {(stats.activeUsers / 1000).toFixed(0)}K+
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          
          <div className="bg-white border rounded-lg p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">
              {stats.impactScore}%
            </div>
            <div className="text-sm text-gray-600">Impact Score</div>
          </div>
          
          <div className="bg-white border rounded-lg p-6 text-center">
            <Award className="w-8 h-8 mx-auto mb-3 text-orange-600" />
            <div className="text-2xl font-bold text-gray-900">
              {stats.partnershipsFormed}
            </div>
            <div className="text-sm text-gray-600">Partnerships</div>
          </div>
        </div>

        {/* SDG Goals Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sustainable Development Goals
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {sdgGoals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 text-white font-bold"
                  style={{ backgroundColor: goal.color }}
                >
                  {goal.id}
                </div>
                <div className="text-xs font-medium text-gray-900 mb-1">
                  SDG {goal.id}
                </div>
                <div className="text-xs text-gray-600">
                  {goal.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tools Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            AI-Powered Tools
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => onNavigateToTool(tool.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">
                  {tool.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4">
                  {tool.description}
                </p>
                
                <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {tool.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 rounded-lg p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of changemakers using AI to accelerate progress towards the SDGs. 
            Start your sustainability journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              onClick={() => onNavigateToTool('personalized-suggestions')}
            >
              Get Started
            </button>
            <button 
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              onClick={() => onNavigateToTool('ai-assistant')}
            >
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSDGDashboard;