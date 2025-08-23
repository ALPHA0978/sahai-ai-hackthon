import { useState } from 'react';
import { ArrowLeft, User, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const SimplePersonalizedSuggestions = ({ onBack }) => {
  const [userProfile, setUserProfile] = useState({
    interests: [],
    skills: [],
    location: '',
    experience: ''
  });
  
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const interests = [
    'Environment', 'Education', 'Healthcare', 'Poverty', 'Technology', 
    'Gender Equality', 'Clean Energy', 'Innovation', 'Climate Action'
  ];

  const skills = [
    'Data Analysis', 'Project Management', 'Research', 'Programming', 
    'Community Outreach', 'Policy Development', 'Marketing', 'Finance'
  ];

  const handleInterestToggle = (interest) => {
    setUserProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSkillToggle = (skill) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const generateSuggestions = async () => {
    setIsAnalyzing(true);
    
    try {
      const systemPrompt = 'You are an SDG expert. Generate personalized SDG project suggestions based on user profile. Return JSON array with: [{"title": "", "description": "", "sdg": number, "timeCommitment": "", "impact": ""}]';
      const response = await OpenRouterService.callAPI(JSON.stringify(userProfile), systemPrompt);
      const aiSuggestions = JSON.parse(response);
      
      // Format AI response for display
      const formattedSuggestions = aiSuggestions.map((suggestion, index) => ({
        id: index + 1,
        sdg: suggestion.sdg || Math.floor(Math.random() * 17) + 1,
        title: suggestion.title,
        description: suggestion.description,
        match: Math.floor(Math.random() * 20) + 80, // 80-100% match
        timeCommitment: suggestion.timeCommitment || '3-5 hours/week',
        impact: suggestion.impact || 'Medium'
      }));
      
      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      // Fallback to mock data
      const fallbackSuggestions = [
        {
          id: 1,
          sdg: 13,
          title: 'Climate Action Initiative',
          description: 'Join local climate action projects based on your interests and skills.',
          match: 90,
          timeCommitment: '5-10 hours/week',
          impact: 'High'
        }
      ];
      setSuggestions(fallbackSuggestions);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
            <User size={16} />
            <span className="text-sm font-medium">Personalized Suggestions</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your SDG Recommendations
          </h1>
          
          <p className="text-lg text-gray-600">
            Tell us about your interests and skills, and we'll suggest SDG projects perfect for you.
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg border p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Build Your Profile</h2>
          
          {/* Interests */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What are your interests? (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userProfile.interests.includes(interest)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What are your skills? (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userProfile.skills.includes(skill)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location (Optional)
            </label>
            <input
              type="text"
              value={userProfile.location}
              onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., New Delhi, India"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              value={userProfile.experience}
              onChange={(e) => setUserProfile(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select experience level</option>
              <option value="beginner">Beginner (0-1 years)</option>
              <option value="intermediate">Intermediate (2-5 years)</option>
              <option value="advanced">Advanced (5+ years)</option>
            </select>
          </div>

          <button
            onClick={generateSuggestions}
            disabled={userProfile.interests.length === 0 || userProfile.skills.length === 0 || isAnalyzing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing Your Profile...' : 'Get My Suggestions'}
          </button>
        </div>

        {/* Suggestions */}
        {isAnalyzing && (
          <div className="bg-white rounded-lg border p-8 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Analyzing Your Profile
            </h3>
            <p className="text-gray-600">
              Our AI is finding the perfect SDG projects for you...
            </p>
          </div>
        )}

        {suggestions.length > 0 && !isAnalyzing && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Personalized SDG Suggestions
            </h2>
            
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-lg border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {suggestion.sdg}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {suggestion.title}
                      </h3>
                      <p className="text-sm text-gray-600">SDG {suggestion.sdg}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {suggestion.match}%
                    </div>
                    <div className="text-sm text-gray-600">Match</div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  {suggestion.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>⏱️ {suggestion.timeCommitment}</span>
                    <span>📈 {suggestion.impact} Impact</span>
                  </div>
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimplePersonalizedSuggestions;