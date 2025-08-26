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
    voiceDocumentDesc: "Multi-modal AI processing",
    
    // Upload Section Extended
    uploading: "Uploading document...",
    extracting: "Extracting text...",
    analyzing: "Analyzing with AI...",
    profileExtracted: "Profile extracted successfully!",
    complete: "Complete!",
    processingFailed: "Processing Failed",
    tryAgain: "Try Again",
    enterDetails: "Enter Your Details",
    cancel: "Cancel",
    analyzeText: "Analyze Text",
    
    // Results Section
    eligibilityResults: "Eligibility Results",
    foundSchemes: "Found Schemes",
    eligible: "Eligible",
    notEligible: "Not Eligible",
    maybeEligible: "Maybe Eligible",
    viewDetails: "View Details",
    applyNow: "Apply Now",
    
    // Footer
    madeWithLove: "Made with dedication for India",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contactUs: "Contact Us"
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
    voiceDocumentDesc: "मल्टी-मोडल AI प्रसंस्करण",
    
    // Upload Section Extended
    uploading: "दस्तावेज़ अपलोड हो रहा है...",
    extracting: "टेक्स्ट निकाला जा रहा है...",
    analyzing: "AI के साथ विश्लेषण...",
    profileExtracted: "प्रोफ़ाइल सफलतापूर्वक निकाली गई!",
    complete: "पूर्ण!",
    processingFailed: "प्रसंस्करण असफल",
    tryAgain: "पुनः प्रयास करें",
    enterDetails: "अपने विवरण दर्ज करें",
    cancel: "रद्द करें",
    analyzeText: "टेक्स्ट का विश्लेषण करें",
    
    // Results Section
    eligibilityResults: "पात्रता परिणाम",
    foundSchemes: "मिली योजनाएं",
    eligible: "पात्र",
    notEligible: "अपात्र",
    maybeEligible: "संभावित पात्र",
    viewDetails: "विवरण देखें",
    applyNow: "अभी आवेदन करें",
    
    // Footer
    madeWithLove: "भारत के लिए समर्पण से बनाया गया",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    contactUs: "संपर्क करें"
  },
  
  BN: {
    searchPlaceholder: "স্কিম খুঁজুন...",
    login: "লগইন",
    logout: "লগআউট",
    settings: "সেটিংস",
    heroTitle: "আপনার AI-চালিত",
    heroSubtitle: "অধিকার সহায়ক",
    heroDescription: "উন্নত AI প্ল্যাটফর্ম যা আপনার নথি বিশ্লেষণ করে, আপনার প্রয়োজন বোঝে, লুকানো সুবিধা আবিষ্কার করে এবং ব্যক্তিগতকৃত সুপারিশ প্রদান করে।",
    startAnalysis: "AI বিশ্লেষণ শুরু করুন",
    exploreTools: "AI টুলস অন্বেষণ করুন",
    trustedUsers: "৫০,০০০+ ব্যবহারকারীর বিশ্বস্ত"
  },
  
  TE: {
    searchPlaceholder: "పథకాలను వెతకండి...",
    login: "లాగిన్",
    logout: "లాగౌట్",
    settings: "సెట్టింగ్స్",
    heroTitle: "మీ AI-శక్తితో",
    heroSubtitle: "హక్కుల సహాయకుడు",
    heroDescription: "మీ పత్రాలను విశ్లేషించి, మీ అవసరాలను అర్థం చేసుకుని, దాచిన ప్రయోజనాలను కనుగొని వ్యక్తిగత సిఫార్సులను అందించే అధునాతన AI ప్లాట్‌ఫారమ్.",
    startAnalysis: "AI విశ్లేషణ ప్రారంభించండి",
    exploreTools: "AI టూల్స్ అన్వేషించండి",
    trustedUsers: "50,000+ వినియోగదారుల నమ్మకం"
  },
  
  MR: {
    searchPlaceholder: "योजना शोधा...",
    login: "लॉगिन",
    logout: "लॉगआउट",
    settings: "सेटिंग्ज",
    heroTitle: "तुमचा AI-चालित",
    heroSubtitle: "हक्क सहाय्यक",
    heroDescription: "तुमच्या कागदपत्रांचे विश्लेषण करणारे, तुमच्या गरजा समजून घेणारे, लपलेले फायदे शोधणारे आणि वैयक्तिक शिफारसी देणारे प्रगत AI प्लॅटफॉर्म.",
    startAnalysis: "AI विश्लेषण सुरू करा",
    exploreTools: "AI टूल्स एक्सप्लोर करा",
    trustedUsers: "50,000+ वापरकर्त्यांचा विश्वास"
  },
  
  TA: {
    searchPlaceholder: "திட்டங்களைத் தேடுங்கள்...",
    login: "உள்நுழைவு",
    logout: "வெளியேறு",
    settings: "அமைப்புகள்",
    heroTitle: "உங்கள் AI-இயங்கும்",
    heroSubtitle: "உரிமைகள் உதவியாளர்",
    heroDescription: "உங்கள் ஆவணங்களை பகுப்பாய்வு செய்து, உங்கள் தேவைகளை புரிந்துகொண்டு, மறைக்கப்பட்ட நன்மைகளை கண்டறிந்து தனிப்பட்ட பரிந்துரைகளை வழங்கும் மேம்பட்ட AI தளம்.",
    startAnalysis: "AI பகுப்பாய்வு தொடங்கு",
    exploreTools: "AI கருவிகளை ஆராயுங்கள்",
    trustedUsers: "50,000+ பயனர்களின் நம்பிக்கை"
  },
  
  GU: {
    searchPlaceholder: "યોજનાઓ શોધો...",
    login: "લોગિન",
    logout: "લોગઆઉટ",
    settings: "સેટિંગ્સ",
    heroTitle: "તમારું AI-સંચાલિત",
    heroSubtitle: "અધિકાર સહાયક",
    heroDescription: "તમારા દસ્તાવેજોનું વિશ્લેષણ કરતું, તમારી જરૂરિયાતો સમજતું, છુપાયેલા ફાયદા શોધતું અને વ્યક્તિગત ભલામણો આપતું અદ્યતન AI પ્લેટફોર્મ.",
    startAnalysis: "AI વિશ્લેષણ શરૂ કરો",
    exploreTools: "AI ટૂલ્સ અન્વેષણ કરો",
    trustedUsers: "50,000+ વપરાશકર્તાઓનો વિશ્વાસ"
  },
  
  KN: {
    searchPlaceholder: "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...",
    login: "ಲಾಗಿನ್",
    logout: "ಲಾಗೌಟ್",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    heroTitle: "ನಿಮ್ಮ AI-ಚಾಲಿತ",
    heroSubtitle: "ಹಕ್ಕುಗಳ ಸಹಾಯಕ",
    heroDescription: "ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುವ, ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ, ಗುಪ್ತ ಪ್ರಯೋಜನಗಳನ್ನು ಕಂಡುಹಿಡಿಯುವ ಮತ್ತು ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳನ್ನು ನೀಡುವ ಸುಧಾರಿತ AI ವೇದಿಕೆ.",
    startAnalysis: "AI ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ",
    exploreTools: "AI ಉಪಕರಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    trustedUsers: "50,000+ ಬಳಕೆದಾರರ ನಂಬಿಕೆ"
  },
  
  ML: {
    searchPlaceholder: "പദ്ധതികൾ തിരയുക...",
    login: "ലോഗിൻ",
    logout: "ലോഗൗട്ട്",
    settings: "ക്രമീകരണങ്ങൾ",
    heroTitle: "നിങ്ങളുടെ AI-പവർഡ്",
    heroSubtitle: "അവകാശ സഹായി",
    heroDescription: "നിങ്ങളുടെ രേഖകൾ വിശകലനം ചെയ്യുന്ന, നിങ്ങളുടെ ആവശ്യങ്ങൾ മനസ്സിലാക്കുന്ന, മറഞ്ഞിരിക്കുന്ന ആനുകൂല്യങ്ങൾ കണ്ടെത്തുന്ന, വ്യക്തിഗത ശുപാർശകൾ നൽകുന്ന വിപുലമായ AI പ്ലാറ്റ്ഫോം.",
    startAnalysis: "AI വിശകലനം ആരംഭിക്കുക",
    exploreTools: "AI ടൂളുകൾ പര്യവേക്ഷണം ചെയ്യുക",
    trustedUsers: "50,000+ ഉപയോക്താക്കളുടെ വിശ്വാസം"
  },
  
  PA: {
    searchPlaceholder: "ਸਕੀਮਾਂ ਖੋਜੋ...",
    login: "ਲਾਗਇਨ",
    logout: "ਲਾਗਆਉਟ",
    settings: "ਸੈਟਿੰਗਾਂ",
    heroTitle: "ਤੁਹਾਡਾ AI-ਸੰਚਾਲਿਤ",
    heroSubtitle: "ਅਧਿਕਾਰ ਸਹਾਇਕ",
    heroDescription: "ਤੁਹਾਡੇ ਦਸਤਾਵੇਜ਼ਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨ ਵਾਲਾ, ਤੁਹਾਡੀਆਂ ਲੋੜਾਂ ਨੂੰ ਸਮਝਣ ਵਾਲਾ, ਛੁਪੇ ਹੋਏ ਫਾਇਦੇ ਲੱਭਣ ਵਾਲਾ ਅਤੇ ਨਿੱਜੀ ਸਿਫਾਰਸ਼ਾਂ ਦੇਣ ਵਾਲਾ ਉੱਨਤ AI ਪਲੇਟਫਾਰਮ।",
    startAnalysis: "AI ਵਿਸ਼ਲੇਸ਼ਣ ਸ਼ੁਰੂ ਕਰੋ",
    exploreTools: "AI ਟੂਲਸ ਦੀ ਖੋਜ ਕਰੋ",
    trustedUsers: "50,000+ ਉਪਭੋਗਤਾਵਾਂ ਦਾ ਭਰੋਸਾ"
  },
  
  OR: {
    searchPlaceholder: "ଯୋଜନା ଖୋଜନ୍ତୁ...",
    login: "ଲଗଇନ୍",
    logout: "ଲଗଆଉଟ୍",
    settings: "ସେଟିଂସ୍",
    heroTitle: "ଆପଣଙ୍କର AI-ଚାଳିତ",
    heroSubtitle: "ଅଧିକାର ସହାୟକ",
    heroDescription: "ଆପଣଙ୍କ ଦଲିଲଗୁଡ଼ିକର ବିଶ୍ଳେଷଣ କରୁଥିବା, ଆପଣଙ୍କ ଆବଶ୍ୟକତା ବୁଝୁଥିବା, ଲୁଚି ରହିଥିବା ସୁବିଧା ଖୋଜୁଥିବା ଏବଂ ବ୍ୟକ୍ତିଗତ ସୁପାରିଶ ପ୍ରଦାନ କରୁଥିବା ଉନ୍ନତ AI ପ୍ଲାଟଫର୍ମ।",
    startAnalysis: "AI ବିଶ୍ଳେଷଣ ଆରମ୍ଭ କରନ୍ତୁ",
    exploreTools: "AI ଉପକରଣଗୁଡ଼ିକ ଅନ୍ବେଷଣ କରନ୍ତୁ",
    trustedUsers: "50,000+ ଉପଭୋକ୍ତାଙ୍କ ବିଶ୍ୱାସ"
  },
  
  AS: {
    searchPlaceholder: "আঁচনি বিচাৰক...",
    login: "লগইন",
    logout: "লগআউট",
    settings: "ছেটিংছ",
    heroTitle: "আপোনাৰ AI-চালিত",
    heroSubtitle: "অধিকাৰ সহায়ক",
    heroDescription: "আপোনাৰ নথি-পত্ৰ বিশ্লেষণ কৰা, আপোনাৰ প্ৰয়োজনীয়তা বুজা, লুকাই থকা সুবিধা আৱিষ্কাৰ কৰা আৰু ব্যক্তিগত পৰামৰ্শ প্ৰদান কৰা উন্নত AI প্লেটফৰ্ম।",
    startAnalysis: "AI বিশ্লেষণ আৰম্ভ কৰক",
    exploreTools: "AI সঁজুলি অন্বেষণ কৰক",
    trustedUsers: "50,000+ ব্যৱহাৰকাৰীৰ বিশ্বাস"
  },
  
  UR: {
    searchPlaceholder: "اسکیمز تلاش کریں...",
    login: "لاگ ان",
    logout: "لاگ آؤٹ",
    settings: "سیٹنگز",
    heroTitle: "آپ کا AI-طاقتور",
    heroSubtitle: "حقوق کا معاون",
    heroDescription: "آپ کے دستاویزات کا تجزیہ کرنے والا، آپ کی ضروریات کو سمجھنے والا، چھپے ہوئے فوائد تلاش کرنے والا اور ذاتی تجاویز فراہم کرنے والا جدید AI پلیٹ فارم۔",
    startAnalysis: "AI تجزیہ شروع کریں",
    exploreTools: "AI ٹولز کی تلاش کریں",
    trustedUsers: "50,000+ صارفین کا اعتماد"
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