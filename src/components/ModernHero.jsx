import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Zap, Shield, Users, Award, 
  TrendingUp, MapPin, CheckCircle, Globe 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../auth';

const ModernHero = ({ onStartScan, onNavigateToSDG, onNavigateToSchemes, userProfile }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    schemes: 'AI',
    users: 51,
    languages: 8,
    success: 92
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const testimonials = [
    {
      text: "Found ₹2 lakh scholarship in minutes!",
      author: "Priya Sharma",
      location: "Delhi",
      scheme: "PM Scholarship"
    },
    {
      text: "Got housing loan subsidy worth ₹5 lakhs",
      author: "Rajesh Kumar", 
      location: "Mumbai",
      scheme: "PMAY Scheme"
    },
    {
      text: "Discovered 3 agriculture schemes for my farm",
      author: "Suresh Patel",
      location: "Gujarat", 
      scheme: "PM-KISAN"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('smartDocumentAI'),
      description: t('smartDocumentDesc')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('personalizedInsights'),
      description: t('personalizedDesc')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('voiceTextAI'),
      description: t('voiceTextDesc')
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('endToEndGuidance'),
      description: t('endToEndDesc')
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gray-50 pt-20 md:pt-16">


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Simple Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200"
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-700">
                {t('trustedUsers')}
              </span>
            </motion.div>

            {/* Clean Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {t('heroTitle')}
                <br />
                <span className="text-blue-600">{t('heroSubtitle')}</span>
              </motion.h1>
              
              <motion.p
                className="text-lg text-gray-600 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {t('heroDescription')}
              </motion.p>
            </div>

            {/* Dashboard Button */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button 
                onClick={() => {
                  // Check if user is logged in using auth context
                  if (user) {
                    navigate('/dashboard');
                  } else {
                    navigate('/login');
                  }
                }}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 w-full sm:w-auto"
              >
                <TrendingUp size={20} />
                <span>View Dashboard</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>

            {/* Simple Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {[
                { value: `${stats.schemes}+`, label: t('schemes') },
                { value: `${stats.users}+`, label: t('users') },
                { value: stats.languages, label: t('languages') },
                { value: `${stats.success}%`, label: t('successRate') }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Simple Right Content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 border">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Zap size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">AI Analysis</div>
                    <div className="text-sm text-gray-600">Document Processing</div>
                  </div>
                </div>

                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Zap size={24} className="text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">Ready to analyze</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    'Extract profile information',
                    'Find eligible schemes',
                    'Verify eligibility criteria'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simple Testimonial */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-700 mb-2">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {testimonials[currentTestimonial].author.charAt(0)}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  {testimonials[currentTestimonial].author}, {testimonials[currentTestimonial].location}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Simple Features Grid */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
      

    </section>
  );
};

export default ModernHero;