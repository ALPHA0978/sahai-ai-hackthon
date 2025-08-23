import { useState } from 'react';
import { Briefcase, User, Target, FileText, MessageCircle, MapPin, DollarSign, Clock, Star, TrendingUp, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { OpenRouterService } from '../../services/api/openRouterService';

const AIJobMatchingTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [jobProfile, setJobProfile] = useState({
    name: '',
    skills: '',
    experience: '',
    location: '',
    salaryExpectation: '',
    jobType: 'Full-time',
    industry: ''
  });
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [skillGaps, setSkillGaps] = useState([]);
  const [resumeTips, setResumeTips] = useState([]);
  const [interviewQuestions, setInterviewQuestions] = useState([]);

  const handleProfileSubmit = async () => {
    setIsLoading(true);
    try {
      const jobs = await OpenRouterService.findMatchingJobs(jobProfile);
      const gaps = await OpenRouterService.analyzeSkillGaps(jobProfile);
      const tips = await OpenRouterService.generateResumeTips(jobProfile);
      
      setMatchedJobs(jobs || []);
      setSkillGaps(gaps || []);
      setResumeTips(tips || []);
      setActiveTab('jobs');
    } catch (error) {
      console.error('Job matching failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateInterviewQuestions = async (jobTitle) => {
    setIsLoading(true);
    try {
      const questions = await OpenRouterService.generateInterviewQuestions(jobTitle, jobProfile.skills);
      setInterviewQuestions(questions || []);
      setActiveTab('interview');
    } catch (error) {
      console.error('Interview questions failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Job Profile', icon: <User size={16} /> },
    { id: 'jobs', label: 'Matched Jobs', icon: <Briefcase size={16} /> },
    { id: 'skills', label: 'Skill Analysis', icon: <Target size={16} /> },
    { id: 'resume', label: 'Resume Tips', icon: <FileText size={16} /> },
    { id: 'interview', label: 'Interview Prep', icon: <MessageCircle size={16} /> }
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
            <Briefcase size={16} />
            <span className="font-medium">SDG 8: Decent Work</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Job Matching Platform</h1>
          <p className="text-gray-600">Find your perfect job match with AI-powered career guidance</p>
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

        {/* Job Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Your Job Profile</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={jobProfile.name}
                  onChange={(e) => setJobProfile({...jobProfile, name: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Skills</label>
                <input
                  type="text"
                  value={jobProfile.skills}
                  onChange={(e) => setJobProfile({...jobProfile, skills: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., JavaScript, React, Python, Marketing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Experience Level</label>
                <select
                  value={jobProfile.experience}
                  onChange={(e) => setJobProfile({...jobProfile, experience: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select experience</option>
                  <option value="Entry Level">Entry Level (0-2 years)</option>
                  <option value="Mid Level">Mid Level (3-5 years)</option>
                  <option value="Senior Level">Senior Level (6+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Preferred Location</label>
                <input
                  type="text"
                  value={jobProfile.location}
                  onChange={(e) => setJobProfile({...jobProfile, location: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mumbai, Remote, Bangalore"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Salary Expectation</label>
                <input
                  type="text"
                  value={jobProfile.salaryExpectation}
                  onChange={(e) => setJobProfile({...jobProfile, salaryExpectation: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 5-8 LPA, 50-80k per month"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Industry Preference</label>
                <input
                  type="text"
                  value={jobProfile.industry}
                  onChange={(e) => setJobProfile({...jobProfile, industry: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Technology, Healthcare, Finance"
                />
              </div>
            </div>
            <button
              onClick={handleProfileSubmit}
              disabled={isLoading || !jobProfile.skills}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {isLoading ? <Clock className="animate-spin" size={16} /> : <Target size={16} />}
              <span>{isLoading ? 'Finding Jobs...' : 'Find Matching Jobs'}</span>
            </button>
          </div>
        )}

        {/* Matched Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {matchedJobs.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Complete your profile to see matched jobs</p>
              </div>
            ) : (
              matchedJobs.map((job, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-blue-600 font-medium">{job.company}</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      <Star size={14} />
                      <span className="text-sm font-medium">{job.matchScore}% Match</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign size={16} />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock size={16} />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{job.source}</span>
                      <span className="text-xs text-gray-500">{job.postedDate}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => window.open(job.applyUrl, '_blank')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => generateInterviewQuestions(job.title)}
                      className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                    >
                      Interview Prep
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Skill Analysis Tab */}
        {activeTab === 'skills' && (
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Skill Gap Analysis</h2>
            {skillGaps.length === 0 ? (
              <div className="text-center py-8">
                <Target size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Complete your profile to see skill analysis</p>
              </div>
            ) : (
              <div className="space-y-4">
                {skillGaps.map((gap, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        gap.priority === 'High' ? 'bg-red-100' : gap.priority === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <TrendingUp size={14} className={
                          gap.priority === 'High' ? 'text-red-600' : gap.priority === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                        } />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{gap.skill}</h3>
                        <p className="text-gray-600 text-sm">{gap.description}</p>
                        <div className="mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            gap.priority === 'High' ? 'bg-red-100 text-red-700' : 
                            gap.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-green-100 text-green-700'
                          }`}>
                            {gap.priority} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resume Tips Tab */}
        {activeTab === 'resume' && (
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Resume Enhancement Tips</h2>
            {resumeTips.length === 0 ? (
              <div className="text-center py-8">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Complete your profile to get resume tips</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resumeTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Interview Prep Tab */}
        {activeTab === 'interview' && (
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Interview Preparation</h2>
            {interviewQuestions.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Click "Interview Prep" on a job to get questions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {interviewQuestions.map((question, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-medium">Q</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{question.question}</h3>
                        <p className="text-gray-600 text-sm">{question.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIJobMatchingTool;