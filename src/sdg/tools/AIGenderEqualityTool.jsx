import { useState } from 'react';
import { 
  Users, Shield, AlertTriangle, CheckCircle, ArrowLeft, 
  Send, Loader, Heart, Scale, Briefcase, BookOpen,
  Phone, MessageCircle, Eye, EyeOff
} from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const AIGenderEqualityTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('bias-detection');
  const [biasText, setBiasText] = useState('');
  const [biasType, setBiasType] = useState('job_description');
  const [reportData, setReportData] = useState({
    type: '',
    description: '',
    location: '',
    urgency: 'medium',
    anonymous: true
  });
  const [userProfile, setUserProfile] = useState({
    gender: '',
    age: '',
    education: '',
    experience: '',
    goals: '',
    challenges: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [biasResults, setBiasResults] = useState(null);
  const [reportResults, setReportResults] = useState(null);
  const [careerGuidance, setCareerGuidance] = useState(null);

  const detectBias = async () => {
    if (!biasText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const { GenderEqualityAI } = await import('../../services/ai/genderEqualityAI');
      const results = await GenderEqualityAI.detectBias(biasText, biasType);
      setBiasResults(results);
    } catch (error) {
      console.error('Bias detection error:', error);
      setBiasResults({ error: 'Failed to analyze bias. Please try again.' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const submitReport = async () => {
    if (!reportData.description.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const { GenderEqualityAI } = await import('../../services/ai/genderEqualityAI');
      const results = await GenderEqualityAI.processReport(reportData);
      setReportResults(results);
    } catch (error) {
      console.error('Report processing error:', error);
      setReportResults({ error: 'Failed to process report. Please try again.' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateCareerGuidance = async () => {
    if (!userProfile.gender || !userProfile.goals) return;
    
    setIsAnalyzing(true);
    try {
      const { GenderEqualityAI } = await import('../../services/ai/genderEqualityAI');
      const results = await GenderEqualityAI.generateCareerGuidance(userProfile);
      setCareerGuidance(results);
    } catch (error) {
      console.error('Career guidance error:', error);
      setCareerGuidance({ error: 'Failed to generate career guidance. Please try again.' });
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
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 mb-4">
            <Users size={16} />
            <span className="text-sm font-medium">SDG 5 - Gender Equality</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI for Gender Equality
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bias detection, anonymous reporting, career mentorship, and empowerment tools 
            powered by AI to promote gender equality and women's empowerment.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'bias-detection', label: 'Bias Detection', icon: <Eye size={16} /> },
            { id: 'reporting', label: 'Safe Reporting', icon: <Shield size={16} /> },
            { id: 'career-guidance', label: 'Career Mentorship', icon: <Briefcase size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Bias Detection Tab */}
        {activeTab === 'bias-detection' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Gender Bias Detection</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                  <select
                    value={biasType}
                    onChange={(e) => setBiasType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="job_description">Job Description</option>
                    <option value="policy_document">Policy Document</option>
                    <option value="marketing_content">Marketing Content</option>
                    <option value="educational_material">Educational Material</option>
                    <option value="general_text">General Text</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text to Analyze</label>
                  <textarea
                    value={biasText}
                    onChange={(e) => setBiasText(e.target.value)}
                    placeholder="Paste the text you want to analyze for gender bias..."
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  onClick={detectBias}
                  disabled={!biasText.trim() || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5" />
                      <span>Detect Bias</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Analysis Results</h3>
              
              {biasResults && !biasResults.error ? (
                <div className="space-y-6">
                  {/* Bias Score */}
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className={`text-3xl font-bold mb-2 ${
                      biasResults.biasScore > 70 ? 'text-red-600' :
                      biasResults.biasScore > 40 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {biasResults.biasScore}%
                    </div>
                    <p className="text-sm text-gray-600">Bias Score</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                      biasResults.biasLevel === 'high' ? 'bg-red-100 text-red-700' :
                      biasResults.biasLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      biasResults.biasLevel === 'low' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {biasResults.biasLevel} bias
                    </span>
                  </div>

                  {/* Biased Phrases */}
                  {biasResults.biasedPhrases && biasResults.biasedPhrases.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Biased Language Detected</h4>
                      {biasResults.biasedPhrases.map((phrase, index) => (
                        <div key={index} className="p-3 bg-red-50 rounded-lg mb-2">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-red-800">"{phrase.phrase}"</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              phrase.severity === 'high' ? 'bg-red-200 text-red-700' :
                              phrase.severity === 'medium' ? 'bg-yellow-200 text-yellow-700' : 'bg-orange-200 text-orange-700'
                            }`}>
                              {phrase.severity}
                            </span>
                          </div>
                          <p className="text-sm text-red-700 mb-1">Type: {phrase.type}</p>
                          <p className="text-sm text-green-700">Suggestion: "{phrase.suggestion}"</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Gender Neutral Version */}
                  {biasResults.genderNeutralVersion && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Gender-Neutral Version</h4>
                      <p className="text-sm text-green-700">{biasResults.genderNeutralVersion}</p>
                    </div>
                  )}

                  {/* Recommendations */}
                  {biasResults.recommendations && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Recommendations</h4>
                      <ul className="space-y-1">
                        {biasResults.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-blue-700">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : biasResults?.error ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600">{biasResults.error}</p>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter text to analyze for gender bias</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Safe Reporting Tab */}
        {activeTab === 'reporting' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Report Form */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Anonymous Reporting</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select
                    value={reportData.type}
                    onChange={(e) => setReportData(prev => ({...prev, type: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select type</option>
                    <option value="harassment">Harassment</option>
                    <option value="discrimination">Discrimination</option>
                    <option value="bias">Bias</option>
                    <option value="safety">Safety Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={reportData.description}
                    onChange={(e) => setReportData(prev => ({...prev, description: e.target.value}))}
                    placeholder="Describe the incident or concern..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                  <input
                    type="text"
                    value={reportData.location}
                    onChange={(e) => setReportData(prev => ({...prev, location: e.target.value}))}
                    placeholder="Workplace, school, public place, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                  <select
                    value={reportData.urgency}
                    onChange={(e) => setReportData(prev => ({...prev, urgency: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="low">Low - General concern</option>
                    <option value="medium">Medium - Needs attention</option>
                    <option value="high">High - Urgent matter</option>
                    <option value="critical">Critical - Immediate danger</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reportData.anonymous}
                    onChange={(e) => setReportData(prev => ({...prev, anonymous: e.target.checked}))}
                    className="rounded"
                  />
                  <label className="text-sm text-gray-700">Keep this report anonymous</label>
                </div>

                <button
                  onClick={submitReport}
                  disabled={!reportData.description.trim() || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Submit Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Report Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Support & Resources</h3>
              
              {reportResults && !reportResults.error ? (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Report Submitted</span>
                    </div>
                    <p className="text-sm text-green-700">Report ID: {reportResults.reportId}</p>
                    <p className="text-sm text-green-700">Urgency: {reportResults.urgencyLevel}</p>
                  </div>

                  {reportResults.recommendations && (
                    <div className="space-y-4">
                      {reportResults.recommendations.immediateActions && (
                        <div className="p-3 bg-red-50 rounded-lg">
                          <h4 className="font-semibold text-red-800 mb-2">Immediate Actions</h4>
                          <ul className="space-y-1">
                            {reportResults.recommendations.immediateActions.map((action, index) => (
                              <li key={index} className="text-sm text-red-700">• {action}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {reportResults.recommendations.supportResources && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Support Resources</h4>
                          <ul className="space-y-1">
                            {reportResults.recommendations.supportResources.map((resource, index) => (
                              <li key={index} className="text-sm text-blue-700">• {resource}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {reportResults.resourcesProvided && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Emergency Contacts</h4>
                      <ul className="space-y-1">
                        {reportResults.resourcesProvided.map((contact, index) => (
                          <li key={index} className="text-sm text-purple-700">• {contact}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : reportResults?.error ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600">{reportResults.error}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🔒 Your Safety Matters</h4>
                    <p className="text-sm text-blue-700">
                      This is a safe space to report incidents. All reports are handled confidentially 
                      and you will receive appropriate support and resources.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">National Women Helpline</p>
                        <p className="text-sm text-gray-600">181 (24/7 Free)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">One Stop Centre</p>
                        <p className="text-sm text-gray-600">Support for women in distress</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Career Guidance Tab */}
        {activeTab === 'career-guidance' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Profile Input */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Career Profile</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={userProfile.gender}
                      onChange={(e) => setUserProfile(prev => ({...prev, gender: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={userProfile.age}
                      onChange={(e) => setUserProfile(prev => ({...prev, age: e.target.value}))}
                      placeholder="Age"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                  <select
                    value={userProfile.education}
                    onChange={(e) => setUserProfile(prev => ({...prev, education: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select education</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Professional Certification">Professional Certification</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience</label>
                  <input
                    type="text"
                    value={userProfile.experience}
                    onChange={(e) => setUserProfile(prev => ({...prev, experience: e.target.value}))}
                    placeholder="e.g., 5 years in marketing, 2 years in tech"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Career Goals</label>
                  <textarea
                    value={userProfile.goals}
                    onChange={(e) => setUserProfile(prev => ({...prev, goals: e.target.value}))}
                    placeholder="What are your career aspirations?"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Challenges</label>
                  <textarea
                    value={userProfile.challenges}
                    onChange={(e) => setUserProfile(prev => ({...prev, challenges: e.target.value}))}
                    placeholder="What obstacles are you facing in your career?"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={generateCareerGuidance}
                  disabled={!userProfile.gender || !userProfile.goals || isAnalyzing}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-5 h-5" />
                      <span>Get Career Guidance</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Career Guidance Results */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Personalized Guidance</h3>
              
              {careerGuidance && !careerGuidance.error ? (
                <div className="space-y-6">
                  {/* Career Path */}
                  {careerGuidance.careerPath && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-3">Career Path Analysis</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Current Level:</span> {careerGuidance.careerPath.currentLevel}</p>
                        <p><span className="font-medium">Timeline to Goals:</span> {careerGuidance.careerPath.timelineToGoals}</p>
                        {careerGuidance.careerPath.recommendedRoles && (
                          <div>
                            <span className="font-medium">Recommended Roles:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {careerGuidance.careerPath.recommendedRoles.map((role, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-200 text-blue-700 text-xs rounded">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Skill Development */}
                  {careerGuidance.skillDevelopment && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">Skill Development Plan</h4>
                      {careerGuidance.skillDevelopment.slice(0, 3).map((skill, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-green-700">{skill.skill}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              skill.priority === 'high' ? 'bg-red-200 text-red-700' :
                              skill.priority === 'medium' ? 'bg-yellow-200 text-yellow-700' : 'bg-green-200 text-green-700'
                            }`}>
                              {skill.priority}
                            </span>
                          </div>
                          <p className="text-sm text-green-600">{skill.timeEstimate}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Empowerment Plan */}
                  {careerGuidance.empowermentPlan && (
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-3">Empowerment Action Plan</h4>
                      <div className="space-y-3">
                        {careerGuidance.empowermentPlan.shortTerm && (
                          <div>
                            <h5 className="font-medium text-purple-700 mb-1">Short-term Goals (3-6 months)</h5>
                            <ul className="space-y-1">
                              {careerGuidance.empowermentPlan.shortTerm.map((goal, index) => (
                                <li key={index} className="text-sm text-purple-600">• {goal}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {careerGuidance.empowermentPlan.longTerm && (
                          <div>
                            <h5 className="font-medium text-purple-700 mb-1">Long-term Vision (1-2 years)</h5>
                            <ul className="space-y-1">
                              {careerGuidance.empowermentPlan.longTerm.map((goal, index) => (
                                <li key={index} className="text-sm text-purple-600">• {goal}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Barrier Analysis */}
                  {careerGuidance.barrierAnalysis && (
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-3">Overcoming Barriers</h4>
                      <div className="space-y-2">
                        {careerGuidance.barrierAnalysis.solutions && (
                          <div>
                            <h5 className="font-medium text-orange-700 mb-1">Solutions</h5>
                            <ul className="space-y-1">
                              {careerGuidance.barrierAnalysis.solutions.map((solution, index) => (
                                <li key={index} className="text-sm text-orange-600">• {solution}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : careerGuidance?.error ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600">{careerGuidance.error}</p>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fill out your profile to get personalized career guidance</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGenderEqualityTool;