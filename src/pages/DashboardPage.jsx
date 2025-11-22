import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, FileText, Award, BarChart3, PieChart, 
  Calendar, Bell, Search, Filter, MoreVertical, Zap, 
  Brain, Heart, GraduationCap, Briefcase, Home, Sprout,
  Droplets, Shield, Globe, ArrowRight, Play, Settings,
  LogOut, User, X
} from 'lucide-react';
import { useAuth } from '../auth';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSDG, setSelectedSDG] = useState(null);
  
  const [stats] = useState({
    totalSchemes: 1247,
    appliedSchemes: 8,
    eligibleSchemes: 23,
    successRate: 87
  });

  const [recentActivity] = useState([
    { id: 1, action: 'Applied for PM-KISAN scheme', time: '2 hours ago', status: 'pending' },
    { id: 2, action: 'Eligibility verified for Scholarship', time: '1 day ago', status: 'approved' },
    { id: 3, action: 'Document uploaded for Housing scheme', time: '3 days ago', status: 'processing' }
  ]);

  const [mySchemes] = useState([
    { id: 1, name: 'PM-KISAN Samman Nidhi', status: 'Active', amount: '₹6,000', nextPayment: '15 Dec 2024' },
    { id: 2, name: 'Pradhan Mantri Awas Yojana', status: 'Applied', amount: '₹2.5 Lakh', applicationDate: '10 Nov 2024' },
    { id: 3, name: 'National Scholarship Portal', status: 'Approved', amount: '₹50,000', disbursementDate: '20 Dec 2024' }
  ]);

  const coreAITools = [
    {
      id: 'scheme-finder',
      name: 'AI Scheme Researcher',
      description: 'Find personalized government schemes using AI',
      icon: <Zap className="w-6 h-6" />,
      color: 'blue',
      route: '/analysis'
    },
    {
      id: 'all-schemes',
      name: 'All Government Schemes',
      description: 'Browse comprehensive database of government schemes',
      icon: <FileText className="w-6 h-6" />,
      color: 'green',
      route: '/schemes'
    }
  ];

  const sdgAITools = [
    {
      id: 'sdg-1',
      name: 'AI to End Poverty',
      description: 'AI-driven platform to assess poverty levels and predict vulnerable areas',
      icon: <Users className="w-6 h-6" />,
      color: 'red',
      route: '/sdg',
      impact: 'High',
      sdg: 1,
      available: true
    },
    {
      id: 'sdg-2',
      name: 'AI-Powered Smart Farming',
      description: 'Soil health monitoring, crop disease detection, resource optimization',
      icon: <Sprout className="w-6 h-6" />,
      color: 'yellow',
      route: '/sdg',
      impact: 'High',
      sdg: 2,
      available: true
    },
    {
      id: 'sdg-3',
      name: 'AI for Healthcare',
      description: 'Early disease diagnosis, personalized treatment, telemedicine support',
      icon: <Heart className="w-6 h-6" />,
      color: 'green',
      route: '/sdg',
      impact: 'High',
      sdg: 3,
      available: true
    },
    {
      id: 'sdg-4',
      name: 'AI for Inclusive Education',
      description: 'Adaptive tutoring system that personalizes learning for students',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'red',
      route: '/sdg',
      impact: 'High',
      sdg: 4,
      available: true
    },
    {
      id: 'sdg-5',
      name: 'AI for Empowerment',
      description: 'Detect and report gender biases in hiring, salaries, and media',
      icon: <Shield className="w-6 h-6" />,
      color: 'orange',
      route: '/sdg',
      impact: 'Medium',
      sdg: 5,
      available: true
    },
    {
      id: 'sdg-6',
      name: 'AI for Water Management',
      description: 'Real-time water quality monitoring and distribution optimization',
      icon: <Droplets className="w-6 h-6" />,
      color: 'blue',
      route: '/sdg',
      impact: 'High',
      sdg: 6,
      available: true
    },
    {
      id: 'sdg-7',
      name: 'AI for Energy Optimization',
      description: 'Optimize energy consumption and promote renewable energy sources',
      icon: <Zap className="w-6 h-6" />,
      color: 'yellow',
      route: '/sdg',
      impact: 'High',
      sdg: 7,
      available: false
    },
    {
      id: 'sdg-8',
      name: 'AI for Job Matching',
      description: 'Match individuals with employment opportunities and upskilling',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'purple',
      route: '/sdg',
      impact: 'Medium',
      sdg: 8,
      available: true
    },
    {
      id: 'sdg-9',
      name: 'AI for Infrastructure Planning',
      description: 'Design and optimize infrastructure with traffic and environmental modeling',
      icon: <Home className="w-6 h-6" />,
      color: 'orange',
      route: '/sdg',
      impact: 'High',
      sdg: 9,
      available: true
    },
    {
      id: 'sdg-10',
      name: 'AI for Equal Opportunity',
      description: 'Detect and address systemic biases in hiring, education, healthcare',
      icon: <Users className="w-6 h-6" />,
      color: 'pink',
      route: '/sdg',
      impact: 'Medium',
      sdg: 10,
      available: false
    },
    {
      id: 'sdg-11',
      name: 'AI for Smart Cities',
      description: 'Monitor and manage urban environments, optimize traffic and services',
      icon: <Home className="w-6 h-6" />,
      color: 'orange',
      route: '/sdg',
      impact: 'High',
      sdg: 11,
      available: false
    },
    {
      id: 'sdg-12',
      name: 'AI for Sustainable Supply Chains',
      description: 'Track supply chain sustainability and optimize production',
      icon: <Globe className="w-6 h-6" />,
      color: 'yellow',
      route: '/sdg',
      impact: 'Medium',
      sdg: 12,
      available: false
    },
    {
      id: 'sdg-13',
      name: 'AI for Climate Modeling',
      description: 'Predict weather patterns and suggest mitigation strategies',
      icon: <Globe className="w-6 h-6" />,
      color: 'green',
      route: '/sdg',
      impact: 'High',
      sdg: 13,
      available: false
    },
    {
      id: 'sdg-14',
      name: 'AI for Marine Conservation',
      description: 'Analyze oceanographic data, track marine life, detect illegal fishing',
      icon: <Droplets className="w-6 h-6" />,
      color: 'blue',
      route: '/sdg',
      impact: 'Medium',
      sdg: 14,
      available: false
    },
    {
      id: 'sdg-15',
      name: 'AI for Biodiversity Protection',
      description: 'Monitor ecosystems and track endangered species using satellite images',
      icon: <Sprout className="w-6 h-6" />,
      color: 'green',
      route: '/sdg',
      impact: 'Medium',
      sdg: 15,
      available: false
    },
    {
      id: 'sdg-16',
      name: 'AI for Good Governance',
      description: 'Detect corruption, promote transparency, analyze public sentiment',
      icon: <Shield className="w-6 h-6" />,
      color: 'blue',
      route: '/sdg',
      impact: 'Medium',
      sdg: 16,
      available: false
    },
    {
      id: 'sdg-17',
      name: 'AI for Global Collaboration',
      description: 'Foster collaboration between NGOs, governments, and businesses',
      icon: <Globe className="w-6 h-6" />,
      color: 'indigo',
      route: '/sdg',
      impact: 'High',
      sdg: 17,
      available: false
    }
  ];

  const handleToolClick = (tool) => {
    if (tool.id.startsWith('sdg-')) {
      setSelectedSDG(tool);
    } else {
      navigate(tool.route);
    }
  };

  const getSDGToolHash = (sdgId) => {
    const toolMap = {
      'sdg-1': 'ai-poverty-tool',
      'sdg-2': 'ai-farming-tool', 
      'sdg-3': 'ai-healthcare-tool',
      'sdg-4': 'ai-education-tool',
      'sdg-5': 'ai-gender-tool',
      'sdg-6': 'ai-water-tool',
      'sdg-7': 'ai-energy-tool',
      'sdg-8': 'ai-jobs-tool',
      'sdg-9': 'ai-infrastructure-tool',
      'sdg-10': 'ai-equality-tool',
      'sdg-11': 'ai-cities-tool',
      'sdg-12': 'ai-supply-tool',
      'sdg-13': 'ai-climate-tool',
      'sdg-14': 'ai-marine-tool',
      'sdg-15': 'ai-biodiversity-tool',
      'sdg-16': 'ai-governance-tool',
      'sdg-17': 'ai-collaboration-tool'
    };
    return toolMap[sdgId] || 'dashboard';
  };

  const handleSDGAction = (action) => {
    if (action === 'open' && selectedSDG) {
      const toolHash = getSDGToolHash(selectedSDG.id);
      navigate(`/sdg#${toolHash}`);
    }
    setSelectedSDG(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6 z-40">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Sahai.ai</span>
        </div>

        <nav className="space-y-2 mb-8">
          {[
            { id: 'overview', label: 'Dashboard', icon: BarChart3 },
            { id: 'ai-tools', label: 'AI Tools', icon: Brain },
            { id: 'schemes', label: 'My Schemes', icon: FileText },
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.displayName || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'ai-tools' && 'AI Tools'}
                {activeTab === 'schemes' && 'My Schemes'}
                {activeTab === 'profile' && 'Profile Settings'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-600">Welcome back, {user?.displayName || 'User'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { title: 'Total Schemes', value: stats.totalSchemes, icon: FileText, color: 'blue', change: '+2.65%' },
                  { title: 'Applied', value: stats.appliedSchemes, icon: Users, color: 'green', change: '-0.82%' },
                  { title: 'Eligible', value: stats.eligibleSchemes, icon: Award, color: 'purple', change: '+6.24%' },
                  { title: 'Success Rate', value: `${stats.successRate}%`, icon: TrendingUp, color: 'orange', change: '+10.51%' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} since last week
                        </p>
                      </div>
                      <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => navigate('/analysis')}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <Zap className="w-8 h-8 text-blue-600 mb-2" />
                      <h4 className="font-medium text-gray-900">AI Scheme Researcher</h4>
                      <p className="text-sm text-gray-600">Find personalized schemes with AI</p>
                    </button>
                    <button 
                      onClick={() => navigate('/profile-setup')}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <Users className="w-8 h-8 text-green-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Update Profile</h4>
                      <p className="text-sm text-gray-600">Keep your information current</p>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* AI Tools Tab */}
          {activeTab === 'ai-tools' && (
            <div className="space-y-8">
              {/* Core AI Tools */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Core AI Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coreAITools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => handleToolClick(tool)}
                    >
                      <div className={`w-12 h-12 bg-${tool.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <div className={`text-${tool.color}-600`}>
                          {tool.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-600 font-medium">Core AI</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SDG AI Tools */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">SDG AI Tools</h3>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">17</span> SDGs Covered • 
                    <span className="font-medium">17</span> AI Solutions • 
                    <span className="font-medium">85%</span> Success Rate
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sdgAITools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => handleToolClick(tool)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-gray-500">SDG {tool.sdg}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            tool.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {tool.impact} Impact
                          </span>
                        </div>
                      </div>
                      <div className={`w-10 h-10 bg-${tool.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                        <div className={`text-${tool.color}-600`}>
                          {tool.icon}
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">{tool.name}</h4>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 font-medium">SDG AI</span>
                        <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* My Schemes Tab */}
          {activeTab === 'schemes' && (
            <div className="space-y-8">
              {/* Core AI Tools */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Core AI Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coreAITools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => handleToolClick(tool)}
                    >
                      <div className={`w-12 h-12 bg-${tool.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <div className={`text-${tool.color}-600`}>
                          {tool.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-600 font-medium">Core AI</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* My Applied Schemes */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Applied Schemes</h3>
                  <button 
                    onClick={() => navigate('/analysis')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Find New Schemes</span>
                  </button>
                </div>
                
                <div className="grid gap-6">
                  {mySchemes.map((scheme) => (
                    <div key={scheme.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{scheme.name}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Status:</span>
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                scheme.status === 'Active' ? 'bg-green-100 text-green-800' :
                                scheme.status === 'Applied' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {scheme.status}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Amount:</span>
                              <span className="ml-2 font-medium text-gray-900">{scheme.amount}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {scheme.nextPayment ? 'Next Payment:' : scheme.disbursementDate ? 'Disbursement:' : 'Applied:'}
                              </span>
                              <span className="ml-2 text-gray-900">
                                {scheme.nextPayment || scheme.disbursementDate || scheme.applicationDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-xl font-medium text-white">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{user?.displayName || 'User'}</h4>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/profile-setup')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              <p className="text-gray-600">Application settings and preferences will be available here.</p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* SDG Tool Dialog */}
    {selectedSDG && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl max-w-md w-full p-6 relative"
        >
          <button
            onClick={() => setSelectedSDG(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className={`w-16 h-16 bg-${selectedSDG.color}-100 rounded-xl flex items-center justify-center mx-auto mb-4`}>
              <div className={`text-${selectedSDG.color}-600`}>
                {selectedSDG.icon}
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-sm font-bold text-gray-500">SDG {selectedSDG.sdg}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                selectedSDG.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {selectedSDG.impact} Impact
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedSDG.name}</h3>
            <p className="text-gray-600 mb-6">{selectedSDG.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">AI Capabilities</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Machine learning analysis</li>
              <li>• Predictive modeling</li>
              <li>• Real-time monitoring</li>
              <li>• Data-driven insights</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Success Rate:</span>
              <span className="font-semibold text-blue-600">85%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Active Users:</span>
              <span className="font-semibold text-blue-600">5K+</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className={`font-semibold ${
                selectedSDG.available ? 'text-green-600' : 'text-orange-600'
              }`}>
                {selectedSDG.available ? 'Available' : 'Coming Soon'}
              </span>
            </div>
          </div>  

          <div className="flex space-x-3">
            <button
              onClick={() => handleSDGAction('open')}
              disabled={!selectedSDG.available}
              className={`flex-1 py-3 px-4 rounded-lg transition-colors font-medium ${
                selectedSDG.available 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedSDG.available ? 'Open Tool →' : 'Coming Soon'}
            </button>
            <button
              onClick={() => setSelectedSDG(null)}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    )}
    </>
  );
};

export default DashboardPage;