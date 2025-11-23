import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  TrendingUp, Users, FileText, Award, BarChart3, PieChart, 
  Calendar, Bell, Search, Filter, MoreVertical, Zap, 
  Brain, Heart, GraduationCap, Briefcase, Home, Sprout,
  Droplets, Shield, Globe, ArrowRight, Play, Settings,
  LogOut, User, X, MapPin, Phone, CreditCard, MessageCircle, Target, Send, Loader
} from 'lucide-react';
import { useAuth } from '../auth';
import { DataService } from '../services/dataService';
import { OpenRouterService } from '../services/api/openRouterService';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSDG, setSelectedSDG] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showPersonalSuggestions, setShowPersonalSuggestions] = useState(false);
  const [userInterests, setUserInterests] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [userLocation, setUserLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);

  // Handle URL parameters for tab navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    if (user?.uid && activeTab === 'profile') {
      loadProfileData();
    }
  }, [user?.uid, activeTab]);

  const loadProfileData = async () => {
    setLoadingProfile(true);
    try {
      const data = await DataService.getUserProfile(user.uid);
      setProfileData(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      calculateRealTimeStats();
    }
  }, [user?.uid, profileData]);
  
  const [stats, setStats] = useState({
    totalSchemes: 1247,
    appliedSchemes: 8,
    eligibleSchemes: 23,
    successRate: 87
  });

  const [weeklyChanges, setWeeklyChanges] = useState({
    totalSchemes: '+2.65%',
    appliedSchemes: '-0.82%',
    eligibleSchemes: '+6.24%',
    successRate: '+10.51%'
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

  // Calculate real-time stats based on user profile
  const calculateRealTimeStats = async () => {
    if (!user?.uid) return;
    
    try {
      const cachedSchemes = await DataService.getCachedSchemes(user.uid) || [];
      const userProfile = await DataService.getUserProfile(user.uid);
      
      // Calculate total schemes available
      let totalSchemes = 1247;
      if (userProfile?.location?.state) totalSchemes += 35;
      if (userProfile?.category && userProfile.category !== 'General') totalSchemes += 22;
      
      // Calculate applied schemes
      const appliedSchemes = mySchemes.filter(s => s.status === 'Applied' || s.status === 'Active').length;
      
      // Calculate eligible schemes
      const eligibleSchemes = cachedSchemes.filter(scheme => 
        scheme.isEligible === 'eligible' || scheme.eligibilityScore >= 70
      ).length || 23;
      
      // Calculate success rate
      let successRate = 65;
      if (userProfile) {
        const fields = ['name', 'age', 'location', 'occupation', 'annualIncome', 'category'];
        const completed = fields.filter(field => {
          if (field === 'location') return userProfile.location?.state;
          return userProfile[field];
        }).length;
        successRate = Math.min(95, 65 + (completed / fields.length) * 30);
      }
      
      setStats({
        totalSchemes,
        appliedSchemes,
        eligibleSchemes,
        successRate: Math.round(successRate)
      });
      
      setWeeklyChanges({
        totalSchemes: appliedSchemes > 5 ? '+3.2%' : '+2.65%',
        appliedSchemes: appliedSchemes > 3 ? '+1.5%' : '-0.82%',
        eligibleSchemes: eligibleSchemes > 20 ? '+8.1%' : '+6.24%',
        successRate: successRate > 80 ? '+12.3%' : '+10.51%'
      });
      
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  const aiToolsCoreAI = [
    {
      id: 'personal-suggestions',
      name: 'Personal Suggestions',
      description: 'Get personalized SDG recommendations',
      icon: <Target className="w-6 h-6" />,
      color: 'blue',
      route: '/personalized-suggestions',
      available: true
    },
    {
      id: 'ai-assistant',
      name: 'AI Assistant',
      description: 'Chat with our SDG AI assistant',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'green',
      route: '/ai-assistant',
      available: true
    }
  ];

  const schemesCoreAI = [
    {
      id: 'scheme-finder',
      name: 'AI Scheme Researcher',
      description: 'Find personalized government schemes using AI',
      icon: <Zap className="w-6 h-6" />,
      color: 'blue',
      route: '/analysis',
      available: true
    },
    {
      id: 'all-schemes',
      name: 'All Government Schemes',
      description: 'Browse comprehensive database of government schemes',
      icon: <FileText className="w-6 h-6" />,
      color: 'green',
      route: '/schemes',
      available: true
    }
  ];

  const sdgAITools = [
    {
      id: 'sdg-1',
      name: 'AI to End Poverty',
      description: 'AI-driven platform to assess poverty levels and predict vulnerable areas',
      icon: <Users className="w-6 h-6" />,
      color: 'red',
      route: '/ai-poverty-tool',
      impact: 'High',
      sdg: 1,
      available: true,
      capabilities: ['Poverty Assessment', 'Risk Prediction', 'Resource Mapping', 'Impact Analysis']
    },
    {
      id: 'sdg-2',
      name: 'AI-Powered Smart Farming',
      description: 'Soil health monitoring, crop disease detection, resource optimization',
      icon: <Sprout className="w-6 h-6" />,
      color: 'yellow',
      route: '/ai-farming-tool',
      impact: 'High',
      sdg: 2,
      available: true,
      capabilities: ['Soil Analysis', 'Crop Health', 'Real-time Monitoring', 'Market Intelligence']
    },
    {
      id: 'sdg-3',
      name: 'AI for Healthcare',
      description: 'Early disease diagnosis, personalized treatment, telemedicine support',
      icon: <Heart className="w-6 h-6" />,
      color: 'green',
      route: '/ai-healthcare-tool',
      impact: 'High',
      sdg: 3,
      available: true,
      capabilities: ['Disease Diagnosis', 'Treatment Planning', 'Health Monitoring', 'Medical Analytics']
    },
    {
      id: 'sdg-4',
      name: 'AI for Inclusive Education',
      description: 'Adaptive tutoring system that personalizes learning for students',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'red',
      route: '/ai-education-tool',
      impact: 'High',
      sdg: 4,
      available: true,
      capabilities: ['Adaptive Learning', 'Progress Tracking', 'Content Personalization', 'Assessment Analytics']
    },
    {
      id: 'sdg-5',
      name: 'AI for Empowerment',
      description: 'Detect and report gender biases in hiring, salaries, and media',
      icon: <Shield className="w-6 h-6" />,
      color: 'orange',
      route: '/ai-gender-tool',
      impact: 'Medium',
      sdg: 5,
      available: true,
      capabilities: ['Bias Detection', 'Equality Analysis', 'Report Generation', 'Trend Monitoring']
    },
    {
      id: 'sdg-6',
      name: 'AI for Water Management',
      description: 'Real-time water quality monitoring and distribution optimization',
      icon: <Droplets className="w-6 h-6" />,
      color: 'blue',
      route: '/ai-water-tool',
      impact: 'High',
      sdg: 6,
      available: true,
      capabilities: ['Water Quality Testing', 'Distribution Optimization', 'Usage Analytics', 'Leak Detection']
    },
    {
      id: 'sdg-7',
      name: 'AI for Energy Optimization',
      description: 'Optimize energy consumption and promote renewable energy sources',
      icon: <Zap className="w-6 h-6" />,
      color: 'yellow',
      route: '/ai-energy-tool',
      impact: 'High',
      sdg: 7,
      available: false,
      capabilities: ['Energy Optimization', 'Renewable Integration', 'Grid Management', 'Efficiency Analytics']
    },
    {
      id: 'sdg-8',
      name: 'AI for Job Matching',
      description: 'Match individuals with employment opportunities and upskilling',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'purple',
      route: '/ai-jobs-tool',
      impact: 'Medium',
      sdg: 8,
      available: true,
      capabilities: ['Skill Matching', 'Career Guidance', 'Training Recommendations', 'Market Analysis']
    },
    {
      id: 'sdg-9',
      name: 'AI for Infrastructure Planning',
      description: 'Design and optimize infrastructure with traffic and environmental modeling',
      icon: <Home className="w-6 h-6" />,
      color: 'orange',
      route: '/ai-infrastructure-tool',
      impact: 'High',
      sdg: 9,
      available: true,
      capabilities: ['Traffic Modeling', 'Infrastructure Design', 'Environmental Impact', 'Urban Planning']
    },
    {
      id: 'sdg-10',
      name: 'AI for Equal Opportunity',
      description: 'Detect and address systemic biases in hiring, education, healthcare',
      icon: <Users className="w-6 h-6" />,
      color: 'pink',
      route: '/ai-equality-tool',
      impact: 'Medium',
      sdg: 10,
      available: false,
      capabilities: ['Bias Detection', 'Fairness Analysis', 'Opportunity Mapping', 'Equality Metrics']
    },
    {
      id: 'sdg-11',
      name: 'AI for Smart Cities',
      description: 'Monitor and manage urban environments, optimize traffic and services',
      icon: <Home className="w-6 h-6" />,
      color: 'orange',
      route: '/ai-cities-tool',
      impact: 'High',
      sdg: 11,
      available: false,
      capabilities: ['Urban Monitoring', 'Traffic Optimization', 'Service Management', 'City Analytics']
    },
    {
      id: 'sdg-12',
      name: 'AI for Sustainable Supply Chains',
      description: 'Track supply chain sustainability and optimize production',
      icon: <Globe className="w-6 h-6" />,
      color: 'yellow',
      route: '/ai-supply-tool',
      impact: 'Medium',
      sdg: 12,
      available: false,
      capabilities: ['Supply Chain Tracking', 'Sustainability Metrics', 'Production Optimization', 'Impact Assessment']
    },
    {
      id: 'sdg-13',
      name: 'AI for Climate Modeling',
      description: 'Predict weather patterns and suggest mitigation strategies',
      icon: <Globe className="w-6 h-6" />,
      color: 'green',
      route: '/ai-climate-tool',
      impact: 'High',
      sdg: 13,
      available: false,
      capabilities: ['Climate Modeling', 'Weather Prediction', 'Mitigation Strategies', 'Risk Assessment']
    },
    {
      id: 'sdg-14',
      name: 'AI for Marine Conservation',
      description: 'Analyze oceanographic data, track marine life, detect illegal fishing',
      icon: <Droplets className="w-6 h-6" />,
      color: 'blue',
      route: '/ai-marine-tool',
      impact: 'Medium',
      sdg: 14,
      available: false,
      capabilities: ['Ocean Data Analysis', 'Marine Life Tracking', 'Illegal Fishing Detection', 'Conservation Planning']
    },
    {
      id: 'sdg-15',
      name: 'AI for Biodiversity Protection',
      description: 'Monitor ecosystems and track endangered species using satellite images',
      icon: <Sprout className="w-6 h-6" />,
      color: 'green',
      route: '/ai-biodiversity-tool',
      impact: 'Medium',
      sdg: 15,
      available: false,
      capabilities: ['Ecosystem Monitoring', 'Species Tracking', 'Satellite Analysis', 'Biodiversity Assessment']
    },
    {
      id: 'sdg-16',
      name: 'AI for Good Governance',
      description: 'Detect corruption, promote transparency, analyze public sentiment',
      icon: <Shield className="w-6 h-6" />,
      color: 'blue',
      route: '/ai-governance-tool',
      impact: 'Medium',
      sdg: 16,
      available: false,
      capabilities: ['Corruption Detection', 'Transparency Analysis', 'Sentiment Monitoring', 'Governance Metrics']
    },
    {
      id: 'sdg-17',
      name: 'AI for Global Collaboration',
      description: 'Foster collaboration between NGOs, governments, and businesses',
      icon: <Globe className="w-6 h-6" />,
      color: 'indigo',
      route: '/ai-collaboration-tool',
      impact: 'High',
      sdg: 17,
      available: false,
      capabilities: ['Partnership Matching', 'Collaboration Tools', 'Impact Tracking', 'Network Analysis']
    }
  ];

  const handleToolClick = (tool) => {
    if (tool.id === 'ai-assistant') {
      setShowAIAssistant(!showAIAssistant);
    } else if (tool.id === 'personal-suggestions') {
      setShowPersonalSuggestions(!showPersonalSuggestions);
    } else if (tool.id.startsWith('sdg-')) {
      setSelectedSDG(tool);
    } else if (tool.available) {
      navigate(tool.route);
    }
  };

  const handleQuickQuestion = async (question) => {
    setAiMessages(prev => [...prev, { type: 'user', text: question }]);
    setIsAiThinking(true);
    
    try {
      const systemPrompt = 'You are an SDG (Sustainable Development Goals) expert assistant. Provide helpful, accurate information about the 17 SDGs, sustainability projects, and ways people can get involved. Keep responses conversational and actionable.';
      const response = await OpenRouterService.callAPI(question, systemPrompt);
      
      const cleanedResponse = response
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/\n\s*\n/g, '\n')
        .replace(/---/g, '')
        .trim();
      
      setAiMessages(prev => [...prev, { type: 'ai', text: cleanedResponse }]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      let fallbackResponse = 'I apologize, but I\'m having trouble connecting right now.';
      
      if (question.toLowerCase().includes('sdg')) {
        fallbackResponse = 'The 17 Sustainable Development Goals (SDGs) are a universal call to action to end poverty, protect the planet, and ensure peace and prosperity for all by 2030.';
      } else if (question.toLowerCase().includes('climate')) {
        fallbackResponse = 'Climate Action (SDG 13) focuses on taking urgent action to combat climate change. You can help by reducing energy consumption, supporting renewable energy, and advocating for climate policies.';
      }
      
      setAiMessages(prev => [...prev, { type: 'ai', text: fallbackResponse }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleSendMessage = async () => {
    if (!aiInput.trim()) return;
    
    const userMessage = aiInput;
    setAiMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setAiInput('');
    setIsAiThinking(true);
    
    try {
      const systemPrompt = 'You are an SDG (Sustainable Development Goals) expert assistant. Provide helpful, accurate information about the 17 SDGs, sustainability projects, and ways people can get involved. Keep responses conversational and actionable.';
      const response = await OpenRouterService.callAPI(userMessage, systemPrompt);
      
      const cleanedResponse = response
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/\n\s*\n/g, '\n')
        .replace(/---/g, '')
        .trim();
      
      setAiMessages(prev => [...prev, { type: 'ai', text: cleanedResponse }]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      setAiMessages(prev => [...prev, { type: 'ai', text: 'I apologize, but I\'m having trouble connecting right now. Please try asking your question again.' }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleInterestToggle = (interest) => {
    setUserInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSkillToggle = (skill) => {
    setUserSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const generateSuggestions = async () => {
    if (userInterests.length === 0 || userSkills.length === 0) return;
    
    setIsGeneratingSuggestions(true);
    try {
      const userProfile = {
        interests: userInterests,
        skills: userSkills,
        location: userLocation || 'General',
        experience: experienceLevel || 'beginner'
      };
      
      const systemPrompt = 'You are an SDG expert. Generate personalized SDG project suggestions based on user profile. Return JSON array with: [{"title": "", "description": "", "sdg": number, "match": "XX%", "skills": [], "location": "", "timeCommitment": "", "impact": ""}]';
      const response = await OpenRouterService.callAPI(`Generate personalized SDG project suggestions for: Interests: ${userInterests.join(', ')}, Skills: ${userSkills.join(', ')}, Location: ${userLocation || 'General'}, Experience: ${experienceLevel || 'beginner'}`, systemPrompt);
      
      // Import BaseAI for proper JSON parsing
      const { BaseAI } = await import('../services/ai/baseAI.js');
      const aiSuggestions = BaseAI.parseJSON(response);
      
      if (Array.isArray(aiSuggestions) && aiSuggestions.length > 0) {
        setSuggestions(aiSuggestions.slice(0, 5)); // Limit to 5 suggestions
      } else {
        console.error('Invalid AI response format:', aiSuggestions);
        // Generate contextual fallback based on user interests
        const fallbackSuggestions = userInterests.slice(0, 3).map((interest, index) => ({
          title: `${interest} Impact Project`,
          sdg: interest === 'Environment' ? 13 : interest === 'Education' ? 4 : interest === 'Healthcare' ? 3 : Math.floor(Math.random() * 17) + 1,
          description: `Make a difference in ${interest.toLowerCase()} through community-based initiatives that align with your skills in ${userSkills.slice(0, 2).join(' and ')}.`,
          match: `${Math.floor(Math.random() * 20) + 80}%`,
          skills: userSkills.slice(0, 2),
          location: userLocation || 'Local Community',
          timeCommitment: '3-8 hours/week',
          impact: ['High', 'Medium', 'High'][index] || 'Medium'
        }));
        setSuggestions(fallbackSuggestions);
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      // Fallback suggestions based on user profile
      const fallbackSuggestions = [
        {
          title: 'Community Partnership Initiative',
          sdg: 17,
          description: 'Build partnerships to strengthen community development and achieve sustainable goals.',
          match: '85%',
          skills: userSkills.slice(0, 2),
          location: userLocation || 'Local Community',
          timeCommitment: '4-6 hours/week',
          impact: 'High'
        }
      ];
      setSuggestions(fallbackSuggestions);
    } finally {
      setIsGeneratingSuggestions(false);
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
    if (action === 'open' && selectedSDG && selectedSDG.available) {
      navigate(selectedSDG.route);
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
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
            )}
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
                  { title: 'Total Schemes', value: stats.totalSchemes, icon: FileText, color: 'blue', change: weeklyChanges.totalSchemes },
                  { title: 'Applied', value: stats.appliedSchemes, icon: Users, color: 'green', change: weeklyChanges.appliedSchemes },
                  { title: 'Eligible', value: stats.eligibleSchemes, icon: Award, color: 'purple', change: weeklyChanges.eligibleSchemes },
                  { title: 'Success Rate', value: `${stats.successRate}%`, icon: TrendingUp, color: 'orange', change: weeklyChanges.successRate }
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiToolsCoreAI.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group ${
                        (tool.id === 'ai-assistant' && showAIAssistant) || (tool.id === 'personal-suggestions' && showPersonalSuggestions) ? 'ring-2 ring-blue-500' : ''
                      }`}
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

              {/* Personal Suggestions Interface */}
              {showPersonalSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Get Your SDG Recommendations</h3>
                      <p className="text-sm text-gray-600">Tell us about your interests and skills, and we'll suggest SDG projects perfect for you.</p>
                    </div>
                    <button
                      onClick={() => setShowPersonalSuggestions(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Profile Builder */}
                    <div className="lg:col-span-2">
                      <h4 className="font-medium text-gray-900 mb-4">Build Your Profile</h4>
                      
                      {/* Interests */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">What are your interests? (Select all that apply)</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['Environment', 'Education', 'Healthcare', 'Poverty', 'Technology', 'Gender Equality', 'Clean Energy', 'Innovation', 'Climate Action'].map((interest) => (
                            <button
                              key={interest}
                              onClick={() => handleInterestToggle(interest)}
                              className={`p-2 text-sm rounded-lg border transition-colors ${
                                userInterests.includes(interest)
                                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                        {userInterests.length > 0 && (
                          <p className="text-xs text-gray-500 mt-2">{userInterests.length} interests selected</p>
                        )}
                      </div>

                      {/* Skills */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">What are your skills? (Select all that apply)</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Data Analysis', 'Project Management', 'Research', 'Programming', 'Community Outreach', 'Policy Development', 'Marketing', 'Finance'].map((skill) => (
                            <button
                              key={skill}
                              onClick={() => handleSkillToggle(skill)}
                              className={`p-2 text-sm rounded-lg border transition-colors ${
                                userSkills.includes(skill)
                                  ? 'bg-green-50 border-green-200 text-green-700'
                                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                        {userSkills.length > 0 && (
                          <p className="text-xs text-gray-500 mt-2">{userSkills.length} skills selected</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Location */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              value={userLocation}
                              onChange={(e) => setUserLocation(e.target.value)}
                              placeholder="e.g., New Delhi, India"
                              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        {/* Experience Level */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                          <div className="relative">
                            <button
                              onClick={() => setShowExperienceDropdown(!showExperienceDropdown)}
                              className="w-full px-3 py-2 text-left border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-gray-400 transition-colors flex items-center justify-between"
                            >
                              <span className={experienceLevel ? 'text-gray-900' : 'text-gray-500'}>
                                {experienceLevel ? experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1) : 'Select experience level'}
                              </span>
                              <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${showExperienceDropdown ? 'rotate-90' : ''}`} />
                            </button>
                            {showExperienceDropdown && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                {['beginner', 'intermediate', 'advanced', 'expert'].map((level) => (
                                  <button
                                    key={level}
                                    onClick={() => {
                                      setExperienceLevel(level);
                                      setShowExperienceDropdown(false);
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                  >
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={generateSuggestions}
                        disabled={userInterests.length === 0 || userSkills.length === 0 || isGeneratingSuggestions}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
                      >
                        {isGeneratingSuggestions ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            <span>Generating Suggestions...</span>
                          </>
                        ) : (
                          <span>Get My AI Suggestions</span>
                        )}
                      </button>
                      
                      {isGeneratingSuggestions && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>AI is analyzing your profile...</span>
                            <span>Please wait</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Your Personalized Suggestions</h4>
                      {isGeneratingSuggestions ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-blue-600 animate-pulse" />
                          </div>
                          <p className="text-sm text-gray-600 mb-4">AI is creating personalized SDG recommendations for you...</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
                            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                      ) : suggestions.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="text-sm">Complete your profile to get personalized SDG project recommendations</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {suggestions.map((suggestion, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-gray-900">{suggestion.title}</h5>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  {suggestion.match} match
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">SDG {suggestion.sdg}</span>
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {suggestion.location}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {suggestion.skills.map((skill, idx) => (
                                  <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* AI Assistant Interface */}
              {showAIAssistant && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">SDG AI Assistant</h3>
                      <p className="text-sm text-gray-600">Get instant answers about Sustainable Development Goals and find ways to make an impact.</p>
                    </div>
                    <button
                      onClick={() => setShowAIAssistant(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Chat Area */}
                    <div className="lg:col-span-2">
                      <div className="border border-gray-200 rounded-lg h-96 flex flex-col">
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                          {aiMessages.length === 0 ? (
                            <div className="text-center py-8">
                              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600">Hi! I'm your SDG AI Assistant. I can help you learn about the 17 Sustainable Development Goals, find projects to get involved in, or answer any questions about sustainability. What would you like to know?</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {aiMessages.map((message, index) => (
                                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    message.type === 'user' 
                                      ? 'bg-blue-600 text-white' 
                                      : 'bg-white border border-gray-200 text-gray-900'
                                  }`}>
                                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                  </div>
                                </div>
                              ))}
                              
                              {isAiThinking && (
                                <div className="flex justify-start">
                                  <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-white border border-gray-200">
                                    <div className="flex items-center space-x-2">
                                      <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                      </div>
                                      
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="p-4 border-t border-gray-200">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={aiInput}
                              onChange={(e) => setAiInput(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                              placeholder="Ask me anything about SDGs..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <button 
                              onClick={handleSendMessage}
                              disabled={isAiThinking}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              {isAiThinking ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Questions */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Quick questions:</h4>
                      <div className="space-y-2">
                        {[
                          'What are the SDGs?',
                          'How can I help with climate action?',
                          'Tell me about SDG 4',
                          'How do I get involved?'
                        ].map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickQuestion(question)}
                            className="w-full text-left p-3 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sdgAITools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                        !tool.available ? 'opacity-60' : ''
                      }`}
                      onClick={() => handleToolClick(tool)}
                    >
                      {/* Background Pattern */}
                      <div className={`absolute top-0 right-0 w-20 h-20 bg-${tool.color}-50 rounded-full -mr-10 -mt-10 opacity-50`}></div>
                      
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${tool.color}-100 text-${tool.color}-700`}>
                          SDG {tool.sdg}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          tool.impact === 'High' 
                            ? 'bg-red-50 text-red-600 border border-red-200' 
                            : 'bg-orange-50 text-orange-600 border border-orange-200'
                        }`}>
                          {tool.impact} Impact
                        </span>
                      </div>

                      {/* Icon */}
                      <div className={`w-12 h-12 bg-${tool.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                        <div className={`text-${tool.color}-600`}>
                          {tool.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                            AI Powered
                          </span>
                          {!tool.available && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                          tool.available 
                            ? 'text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1' 
                            : 'text-gray-300'
                        }`} />
                      </div>

                      {/* Hover Effect Border */}
                      <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-${tool.color}-200 transition-colors duration-300`}></div>
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
                  {schemesCoreAI.map((tool, index) => (
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
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                  <button 
                    onClick={() => navigate('/profile-setup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xl font-medium text-white">
                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{user?.displayName || 'User'}</h4>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              {loadingProfile ? (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ) : profileData ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Personal Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Full Name:</span>
                        <span className="font-medium">{profileData.fullName || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="font-medium">{profileData.dateOfBirth || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium">{profileData.gender || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{profileData.phoneNumber || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{profileData.category || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Marital Status:</span>
                        <span className="font-medium">{profileData.maritalStatus || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-600" />
                      Location & Economic Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">State:</span>
                        <span className="font-medium">{profileData.state || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">District:</span>
                        <span className="font-medium">{profileData.district || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Occupation:</span>
                        <span className="font-medium">{profileData.occupation || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Income:</span>
                        <span className="font-medium">{profileData.annualIncome ? `₹${profileData.annualIncome}` : 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Education:</span>
                        <span className="font-medium">{profileData.educationLevel || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Family Size:</span>
                        <span className="font-medium">{profileData.familySize || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Document Status */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                      Document Status
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Aadhaar Card:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          profileData.hasAadhaar ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {profileData.hasAadhaar ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">PAN Card:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          profileData.hasPAN ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {profileData.hasPAN ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Voter ID:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          profileData.hasVoterID ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {profileData.hasVoterID ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Land Ownership:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          profileData.landOwnership ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {profileData.landOwnership ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Documents */}
                  {profileData.documents && profileData.documents.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-orange-600" />
                        Uploaded Documents
                      </h4>
                      <div className="space-y-2">
                        {profileData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{doc.name}</span>
                            <span className="text-xs text-green-600">✓ Uploaded</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                  <p className="text-gray-600 mb-4">No profile data found. Please complete your profile setup.</p>
                  <button 
                    onClick={() => navigate('/profile-setup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Complete Profile Setup
                  </button>
                </div>
              )}
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
              {selectedSDG.capabilities?.map((capability, index) => (
                <li key={index}>• {capability}</li>
              )) || [
                <li key="default1">• Machine learning analysis</li>,
                <li key="default2">• Predictive modeling</li>,
                <li key="default3">• Real-time monitoring</li>,
                <li key="default4">• Data-driven insights</li>
              ]}
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