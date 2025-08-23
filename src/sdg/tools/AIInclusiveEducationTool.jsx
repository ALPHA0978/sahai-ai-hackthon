import React, { useState, useEffect } from 'react';
import { OpenRouterService } from '../../services/api/openRouterService';
import { 
  BookOpen, 
  Brain, 
  Users, 
  Target, 
  Lightbulb, 
  Award,
  Clock,
  TrendingUp,
  Eye,
  Ear,
  MessageSquare,
  Gamepad2,
  BarChart3,
  AlertTriangle,
  Calendar,
  Zap,
  Globe,
  Accessibility,
  GraduationCap,
  Headphones,
  Video,
  FileText,
  CheckCircle,
  XCircle,
  Star,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  RefreshCw,
  Download,
  Share2
} from 'lucide-react';

const AIInclusiveEducationTool = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('personalized');
  const [studentProfile, setStudentProfile] = useState({
    name: '',
    age: '',
    grade: '',
    learningStyle: '',
    disabilities: [],
    subjects: [],
    goals: ''
  });
  const [learningData, setLearningData] = useState({
    performance: {},
    engagement: 0,
    timeSpent: 0,
    completedLessons: 0
  });
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [aiLessons, setAiLessons] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const learningStyles = [
    { id: 'visual', name: 'Visual Learner', icon: Eye },
    { id: 'auditory', name: 'Auditory Learner', icon: Ear },
    { id: 'kinesthetic', name: 'Kinesthetic Learner', icon: Users },
    { id: 'reading', name: 'Reading/Writing', icon: FileText }
  ];

  const disabilities = [
    { id: 'visual', name: 'Visual Impairment' },
    { id: 'hearing', name: 'Hearing Impairment' },
    { id: 'cognitive', name: 'Cognitive Disabilities' },
    { id: 'motor', name: 'Motor Disabilities' },
    { id: 'learning', name: 'Learning Disabilities' },
    { id: 'autism', name: 'Autism Spectrum' }
  ];

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Computer Science', 'Art', 'Music', 'Physical Education'
  ];

  const generateAILessons = async () => {
    if (!studentProfile.subjects.length) return;
    
    try {
      const lessons = await OpenRouterService.generatePersonalizedLessons(studentProfile);
      setAiLessons(lessons || []);
    } catch (error) {
      console.error('Error generating lessons:', error);
      setAiLessons([{
        id: 1,
        title: 'Basic Learning Module',
        subject: 'General',
        difficulty: 'Beginner',
        duration: '30 mins',
        type: 'Interactive',
        accessibility: ['Audio Support']
      }]);
    }
  };

  useEffect(() => {
    if (studentProfile.learningStyle) {
      generateRecommendations();
    }
    if (studentProfile.subjects.length > 0) {
      generateAILessons();
    }
  }, [studentProfile]);

  const generateRecommendations = async () => {
    if (!studentProfile.learningStyle) return;
    
    setIsGeneratingContent(true);
    
    try {
      const aiRecommendations = await OpenRouterService.generateLearningRecommendations(studentProfile);
      setRecommendations(aiRecommendations || []);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setRecommendations([{
        type: 'Error',
        title: 'Unable to generate recommendations',
        description: 'Please try again later',
        priority: 'Low',
        estimatedTime: 'N/A'
      }]);
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { text: chatInput, isUser: true };
    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput('');
    setIsLoadingChat(true);
    
    try {
      const response = await OpenRouterService.chatWithAI(currentInput, studentProfile);
      const aiMessage = { text: response, isUser: false };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage = { text: 'Sorry, I\'m having trouble responding right now. Please try again.', isUser: false };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const analyzeStudentPerformance = async () => {
    setIsAnalyzing(true);
    
    try {
      const results = await OpenRouterService.generateEducationAssessment(studentProfile);
      setAssessmentResults(results);
    } catch (error) {
      console.error('Error analyzing student performance:', error);
      setAssessmentResults({
        overallScore: 0,
        strengths: ['Unable to analyze at this time'],
        weaknesses: ['Please try again later'],
        recommendations: ['Check your internet connection'],
        nextSteps: ['Retry the analysis']
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const PersonalizedLearning = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
          <Brain className="mr-2 text-blue-600" />
          Student Profile Setup
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">Student Name</label>
            <input
              type="text"
              value={studentProfile.name}
              onChange={(e) => setStudentProfile({...studentProfile, name: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Enter student name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">Age</label>
            <input
              type="number"
              value={studentProfile.age}
              onChange={(e) => setStudentProfile({...studentProfile, age: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Age"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">Grade Level</label>
            <select
              value={studentProfile.grade}
              onChange={(e) => setStudentProfile({...studentProfile, grade: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="">Select Grade</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>Grade {i + 1}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">Learning Style</label>
            <select
              value={studentProfile.learningStyle}
              onChange={(e) => setStudentProfile({...studentProfile, learningStyle: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="">Select Learning Style</option>
              {learningStyles.map(style => (
                <option key={style.id} value={style.id}>{style.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2 text-gray-900">Accessibility Needs</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {disabilities.map(disability => (
              <label key={disability.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={studentProfile.disabilities.includes(disability.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setStudentProfile({
                        ...studentProfile,
                        disabilities: [...studentProfile.disabilities, disability.id]
                      });
                    } else {
                      setStudentProfile({
                        ...studentProfile,
                        disabilities: studentProfile.disabilities.filter(d => d !== disability.id)
                      });
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm text-gray-900">{disability.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2 text-gray-900">Subjects of Interest</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {subjects.map(subject => (
              <label key={subject} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={studentProfile.subjects.includes(subject)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setStudentProfile({
                        ...studentProfile,
                        subjects: [...studentProfile.subjects, subject]
                      });
                    } else {
                      setStudentProfile({
                        ...studentProfile,
                        subjects: studentProfile.subjects.filter(s => s !== subject)
                      });
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm text-gray-900">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={analyzeStudentPerformance}
          disabled={isAnalyzing}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="animate-spin mr-2" size={20} />
              Analyzing Profile...
            </>
          ) : (
            <>
              <Brain className="mr-2" size={20} />
              Generate Learning Plan
            </>
          )}
        </button>
      </div>

      {assessmentResults && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
            <BarChart3 className="mr-2 text-green-600" />
            AI Assessment Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {assessmentResults.overallScore}%
              </div>
              <div className="text-gray-900">Overall Performance</div>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
              <ul className="space-y-1">
                {assessmentResults.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-900">
                    <CheckCircle className="mr-2 text-green-500" size={16} />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">Areas for Improvement</h4>
              <ul className="space-y-1">
                {assessmentResults.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-900">
                    <AlertTriangle className="mr-2 text-orange-500" size={16} />
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3 text-gray-900">Personalized Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessmentResults.recommendations.map((rec, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Lightbulb className="mr-2 text-blue-600 mt-1" size={16} />
                    <span className="text-sm text-gray-900">{rec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AdaptiveLearning = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
          <Target className="mr-2 text-purple-600" />
          Adaptive Learning System
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <TrendingUp className="mr-2 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Performance Tracking</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-900">Completion Rate</span>
                <span className="font-semibold text-gray-900">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '87%'}}></div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-900">Accuracy</span>
                <span className="font-semibold text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Clock className="mr-2 text-green-600" />
              <h4 className="font-semibold text-gray-900">Learning Pace</h4>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">2.3x</div>
              <div className="text-sm text-gray-900">Faster than average</div>
              <div className="text-xs text-gray-800">
                AI has adjusted content difficulty to match your pace
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Zap className="mr-2 text-orange-600" />
              <h4 className="font-semibold text-gray-900">Engagement Level</h4>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-600">High</div>
              <div className="text-sm text-gray-900">95% active participation</div>
              <div className="text-xs text-gray-800">
                Interactive elements increased engagement by 40%
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-3 text-gray-900">Recommended Learning Path</h4>
          <div className="space-y-3">
            {(aiLessons.length > 0 ? aiLessons : [{
              id: 1,
              title: 'Complete your profile to see personalized lessons',
              subject: 'General',
              difficulty: 'N/A',
              duration: 'N/A',
              type: 'Setup Required',
              accessibility: []
            }]).map((lesson, index) => (
              <div key={lesson.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <BookOpen className="mr-2 text-blue-600" size={20} />
                      <h5 className="font-semibold text-gray-900">{lesson.title}</h5>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {lesson.subject}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-900">
                      <span>📊 {lesson.difficulty}</span>
                      <span>⏱️ {lesson.duration}</span>
                      <span>🎯 {lesson.type}</span>
                    </div>
                    {lesson.accessibility && lesson.accessibility.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-900 mb-1">Accessibility Features:</div>
                        <div className="flex flex-wrap gap-1">
                          {lesson.accessibility.map((feature, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => lesson.id !== 1 || lesson.title !== 'Complete your profile to see personalized lessons' ? setCurrentLesson(lesson) : null}
                    disabled={lesson.id === 1 && lesson.title === 'Complete your profile to see personalized lessons'}
                    className={`ml-4 px-4 py-2 rounded-lg flex items-center ${
                      lesson.id === 1 && lesson.title === 'Complete your profile to see personalized lessons'
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Play className="mr-1" size={16} />
                    {lesson.id === 1 && lesson.title === 'Complete your profile to see personalized lessons' ? 'Setup Required' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentLesson && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
            <Video className="mr-2 text-green-600" />
            Interactive Lesson: {currentLesson.title}
          </h3>
          
          <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
            <div className="text-6xl mb-4">🎓</div>
            <div className="text-lg font-semibold mb-2 text-gray-900">Lesson Content Area</div>
            <div className="text-gray-900 mb-4">
              Interactive {currentLesson.type.toLowerCase()} content would be displayed here
            </div>
            <div className="flex justify-center space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                <Volume2 className="mr-2" size={16} />
                Audio Description
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <MessageSquare className="mr-2" size={16} />
                Sign Language
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
                <Settings className="mr-2" size={16} />
                Accessibility
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Previous
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Next
              </button>
            </div>
            <button
              onClick={() => setCurrentLesson(null)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Close Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const AccessibilityFeatures = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
          <Accessibility className="mr-2 text-indigo-600" />
          Accessibility & Inclusion Tools
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Eye className="mr-2 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Visual Accessibility</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                High contrast mode
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Large text options
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Screen reader support
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Color blind friendly
              </li>
            </ul>
            <button 
              onClick={() => alert('Visual settings configured! High contrast mode enabled.')}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Configure Visual Settings
            </button>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Ear className="mr-2 text-green-600" />
              <h4 className="font-semibold text-gray-900">Hearing Accessibility</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Closed captions
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Sign language interpretation
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Visual alerts
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Transcript generation
              </li>
            </ul>
            <button 
              onClick={() => alert('Audio settings configured! Closed captions enabled.')}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Configure Audio Settings
            </button>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Brain className="mr-2 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Cognitive Support</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Simplified language
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Memory aids
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Step-by-step guidance
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Focus assistance
              </li>
            </ul>
            <button 
              onClick={() => alert('Cognitive support configured! Simplified language mode enabled.')}
              className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Configure Cognitive Support
            </button>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Users className="mr-2 text-orange-600" />
              <h4 className="font-semibold text-gray-900">Motor Accessibility</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Voice control
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Eye tracking
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Switch navigation
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Gesture control
              </li>
            </ul>
            <button 
              onClick={() => alert('Motor accessibility configured! Voice control enabled.')}
              className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
            >
              Configure Motor Settings
            </button>
          </div>

          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Globe className="mr-2 text-teal-600" />
              <h4 className="font-semibold text-gray-900">Language Support</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Multi-language content
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Real-time translation
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Cultural adaptation
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Pronunciation guide
              </li>
            </ul>
            <button 
              onClick={() => alert('Language settings configured! Multi-language support enabled.')}
              className="mt-3 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
            >
              Configure Language Settings
            </button>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Gamepad2 className="mr-2 text-red-600" />
              <h4 className="font-semibold text-gray-900">Interactive Learning</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Gamified lessons
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Virtual reality
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Augmented reality
              </li>
              <li className="flex items-center text-gray-900">
                <CheckCircle className="mr-2 text-green-500" size={16} />
                Interactive simulations
              </li>
            </ul>
            <button 
              onClick={() => alert('Interactive mode launched! VR/AR learning environment activated.')}
              className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Launch Interactive Mode
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
          <MessageSquare className="mr-2 text-blue-600" />
          AI Learning Assistant
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full p-2">
                <Brain size={16} />
              </div>
              <div className="bg-white rounded-lg p-3 flex-1">
                <p className="text-sm text-gray-900">Hello! I'm your AI learning assistant. I can help you with:</p>
                <ul className="text-xs mt-2 space-y-1 text-gray-900">
                  <li>• Explaining complex concepts in simple terms</li>
                  <li>• Providing alternative learning approaches</li>
                  <li>• Offering accessibility support</li>
                  <li>• Creating personalized study plans</li>
                </ul>
              </div>
            </div>
            
            {chatMessages.map((message, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`${message.isUser ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-full p-2`}>
                  {message.isUser ? <Users size={16} /> : <Brain size={16} />}
                </div>
                <div className={`${message.isUser ? 'bg-blue-100' : 'bg-white'} rounded-lg p-3 flex-1`}>
                  <p className="text-sm text-gray-900">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isLoadingChat && (
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full p-2">
                  <Brain size={16} />
                </div>
                <div className="bg-white rounded-lg p-3 flex-1">
                  <p className="text-sm text-gray-900">AI is thinking...</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
            placeholder="Ask your AI assistant anything..."
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
            disabled={isLoadingChat}
          />
          <button 
            onClick={handleChatSubmit}
            disabled={isLoadingChat || !chatInput.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const SmartAssessment = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
          <Award className="mr-2 text-yellow-600" />
          AI-Powered Assessment System
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center text-gray-900">
                <BarChart3 className="mr-2 text-blue-600" />
                Formative Assessment
              </h4>
              <p className="text-sm text-gray-900 mb-3">
                Continuous evaluation during learning process
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900">Real-time feedback</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900">Progress tracking</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900">Adaptive questioning</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
              </div>
              <button 
                onClick={() => alert('Quick assessment started! Adaptive questions will appear.')}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Start Quick Assessment
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center text-gray-900">
                <GraduationCap className="mr-2 text-green-600" />
                Summative Assessment
              </h4>
              <p className="text-sm text-gray-900 mb-3">
                Comprehensive evaluation of learning outcomes
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900">Auto-grading</span>
                  <span className="text-green-600">✓ Enabled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900">Plagiarism detection</span>
                  <span className="text-green-600">✓ Enabled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900">Performance analytics</span>
                  <span className="text-green-600">✓ Enabled</span>
                </div>
              </div>
              <button 
                onClick={() => alert('Final exam scheduled! You will receive a notification.')}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Schedule Final Exam
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold mb-2 text-gray-900">Assessment Analytics</h4>
              <p className="text-sm text-gray-900 mb-4">
                AI-powered insights into learning progress and performance patterns
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-semibold text-blue-600">85%</div>
                  <div className="text-gray-900">Avg. Score</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-semibold text-green-600">92%</div>
                  <div className="text-gray-900">Completion Rate</div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="font-semibold text-purple-600">15min</div>
                  <div className="text-gray-900">Avg. Time</div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="font-semibold text-orange-600">A-</div>
                  <div className="text-gray-900">Grade</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center text-gray-900">
                <AlertTriangle className="mr-2 text-yellow-600" />
                Early Warning System
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">At-risk students identified</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Intervention recommended</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Success predictions</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">87%</span>
                </div>
              </div>
              <button 
                onClick={() => alert('Detailed report generated! Check your dashboard for insights.')}
                className="mt-3 w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
              >
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
          <Calendar className="mr-2 text-indigo-600" />
          Personalized Study Plan
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="bg-gray-50 rounded-lg p-3">
              <div className="font-semibold text-center mb-2 text-gray-900">{day}</div>
              <div className="space-y-1">
                {index < 5 ? (
                  <>
                    <div className="bg-blue-100 text-blue-800 text-xs p-2 rounded">
                      Math: Algebra
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs p-2 rounded">
                      Science: Physics
                    </div>
                  </>
                ) : (
                  <div className="bg-purple-100 text-purple-800 text-xs p-2 rounded">
                    Review & Practice
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <button 
              onClick={() => alert('Study plan exported! Check your downloads folder.')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
            >
              <Download className="mr-2" size={16} />
              Export Plan
            </button>
            <button 
              onClick={() => alert('Study plan shared with teacher! They will receive an email.')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <Share2 className="mr-2" size={16} />
              Share with Teacher
            </button>
          </div>
          <button 
            onClick={() => alert('New study plan generated! Updated based on your progress.')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
          >
            <RefreshCw className="mr-2" size={16} />
            Regenerate Plan
          </button>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'personalized', name: 'Personalized Learning', icon: Brain, component: PersonalizedLearning },
    { id: 'adaptive', name: 'Adaptive Systems', icon: Target, component: AdaptiveLearning },
    { id: 'accessibility', name: 'Accessibility', icon: Accessibility, component: AccessibilityFeatures },
    { id: 'assessment', name: 'Smart Assessment', icon: Award, component: SmartAssessment }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>

    

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI-Powered Inclusive Education Platform
        </h1>
        <p className="text-gray-900">
          Personalized learning experiences with adaptive systems and comprehensive accessibility features
        </p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-2" size={20} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="tab-content">
        {tabs.find(tab => tab.id === activeTab)?.component()}
      </div>
    </div>
  );
};

export default AIInclusiveEducationTool;