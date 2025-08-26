import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  EN: {
    // Header
    searchPlaceholder: "Search schemes...",
    login: "Login",
    logout: "Logout",
    settings: "Settings",
    
    // Hero Section
    heroTitle: "Your AI-Powered",
    heroSubtitle: "Rights Assistant",
    heroDescription: "Advanced AI platform that analyzes your documents, understands your needs, discovers hidden benefits, provides personalized recommendations, and guides you through applications - all in your language.",
    startAnalysis: "Start AI Analysis",
    exploreTools: "Explore AI Tools",
    trustedUsers: "Trusted by 50,000+ users",
    
    // Features
    smartDocumentAI: "Smart Document AI",
    smartDocumentDesc: "Extracts & analyzes any document type with 99% accuracy",
    personalizedInsights: "Personalized Insights", 
    personalizedDesc: "AI recommendations tailored to your unique profile",
    voiceTextAI: "Voice & Text AI",
    voiceTextDesc: "Speak naturally in 12+ languages or type details",
    endToEndGuidance: "End-to-End Guidance",
    endToEndDesc: "From discovery to application completion",
    
    // Upload Section
    advancedAI: "Advanced AI Intelligence",
    intelligentAnalysis: "Intelligent Document Analysis",
    uploadDescription: "Our AI understands documents, extracts profiles, analyzes eligibility, discovers hidden benefits, and provides personalized recommendations - all through advanced machine learning.",
    dragDrop: "Drag & Drop Documents",
    clickBrowse: "or click to browse • Supports PDF, JPG, PNG • Max 10MB",
    takePhoto: "Take Photo",
    takePhotoDesc: "Capture documents with your camera",
    voiceInput: "Voice Input",
    voiceInputDesc: "Speak your details",
    typeDetails: "Type Details",
    typeDetailsDesc: "Manually enter your information",
    
    // Stats
    schemes: "Schemes",
    users: "Users", 
    languages: "Languages",
    successRate: "Success Rate",
    aiModels: "AI Models Used",
    aiAccuracy: "AI Accuracy",
    aiAssistant: "AI Assistant",
    
    // CTA Section
    readyToStart: "Ready to Get Started?",
    experienceAI: "Experience AI-Powered Governance",
    ctaDescription: "Advanced AI analyzes your profile in under 30 seconds, discovers hidden benefits, and provides personalized guidance. Join 50,000+ users leveraging AI for their rights!",
    learnMore: "Learn More",
    aiPoweredAnalysis: "AI-Powered Analysis",
    aiAnalysisDesc: "Advanced machine learning models",
    intelligentInsights: "Intelligent Insights",
    intelligentInsightsDesc: "Personalized recommendations",
    voiceDocumentAI: "Voice & Document AI",
    voiceDocumentDesc: "Multi-modal AI processing"
  },
  
  HI: {
    // Header
    searchPlaceholder: "योजनाएं खोजें...",
    login: "लॉगिन",
    logout: "लॉगआउट", 
    settings: "सेटिंग्स",
    
    // Hero Section
    heroTitle: "आपका AI-संचालित",
    heroSubtitle: "अधिकार सहायक",
    heroDescription: "उन्नत AI प्लेटफॉर्म जो आपके दस्तावेजों का विश्लेषण करता है, आपकी जरूरतों को समझता है, छुपे हुए लाभ खोजता है, व्यक्तिगत सिफारिशें प्रदान करता है, और आवेदनों के माध्यम से मार्गदर्शन करता है - सब आपकी भाषा में।",
    startAnalysis: "AI विश्लेषण शुरू करें",
    exploreTools: "AI टूल्स एक्सप्लोर करें",
    trustedUsers: "50,000+ उपयोगकर्ताओं द्वारा भरोसेमंद",
    
    // Features
    smartDocumentAI: "स्मार्ट दस्तावेज़ AI",
    smartDocumentDesc: "99% सटीकता के साथ किसी भी दस्तावेज़ प्रकार को निकालता और विश्लेषित करता है",
    personalizedInsights: "व्यक्तिगत अंतर्दृष्टि",
    personalizedDesc: "आपकी अनूठी प्रोफ़ाइल के अनुकूल AI सिफारिशें",
    voiceTextAI: "आवाज़ और टेक्स्ट AI",
    voiceTextDesc: "12+ भाषाओं में प्राकृतिक रूप से बोलें या विवरण टाइप करें",
    endToEndGuidance: "संपूर्ण मार्गदर्शन",
    endToEndDesc: "खोज से आवेदन पूर्णता तक",
    
    // Upload Section
    advancedAI: "उन्नत AI बुद्धिमत्ता",
    intelligentAnalysis: "बुद्धिमान दस्तावेज़ विश्लेषण",
    uploadDescription: "हमारा AI दस्तावेजों को समझता है, प्रोफाइल निकालता है, पात्रता का विश्लेषण करता है, छुपे हुए लाभ खोजता है, और व्यक्तिगत सिफारिशें प्रदान करता है - सब उन्नत मशीन लर्निंग के माध्यम से।",
    dragDrop: "दस्तावेज़ खींचें और छोड़ें",
    clickBrowse: "या ब्राउज़ करने के लिए क्लिक करें • PDF, JPG, PNG समर्थित • अधिकतम 10MB",
    takePhoto: "फोटो लें",
    takePhotoDesc: "अपने कैमरे से दस्तावेज़ कैप्चर करें",
    voiceInput: "आवाज़ इनपुट",
    voiceInputDesc: "अपने विवरण बोलें",
    typeDetails: "विवरण टाइप करें",
    typeDetailsDesc: "मैन्युअल रूप से अपनी जानकारी दर्ज करें",
    
    // Stats
    schemes: "योजनाएं",
    users: "उपयोगकर्ता",
    languages: "भाषाएं", 
    successRate: "सफलता दर",
    aiModels: "AI मॉडल उपयोग",
    aiAccuracy: "AI सटीकता",
    aiAssistant: "AI सहायक",
    
    // CTA Section
    readyToStart: "शुरू करने के लिए तैयार?",
    experienceAI: "AI-संचालित शासन का अनुभव करें",
    ctaDescription: "उन्नत AI 30 सेकंड से कम में आपकी प्रोफ़ाइल का विश्लेषण करता है, छुपे हुए लाभ खोजता है, और व्यक्तिगत मार्गदर्शन प्रदान करता है। अपने अधिकारों के लिए AI का लाभ उठाने वाले 50,000+ उपयोगकर्ताओं से जुड़ें!",
    learnMore: "और जानें",
    aiPoweredAnalysis: "AI-संचालित विश्लेषण",
    aiAnalysisDesc: "उन्नत मशीन लर्निंग मॉडल",
    intelligentInsights: "बुद्धिमान अंतर्दृष्टि",
    intelligentInsightsDesc: "व्यक्तिगत सिफारिशें",
    voiceDocumentAI: "आवाज़ और दस्तावेज़ AI",
    voiceDocumentDesc: "मल्टी-मोडल AI प्रसंस्करण"
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  
  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.EN[key] || key;
  };
  
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };
  
  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};