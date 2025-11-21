import { useState, useEffect, useRef } from 'react';

import ModernHeader from './components/ModernHeader';
import ModernHero from './components/ModernHero';
import ModernUploadSection from './components/ModernUploadSection';
import SimpleResultsSection from './components/SimpleResultsSection';
import SimpleCTASection from './components/SimpleCTASection';
import SimpleFooter from './components/SimpleFooter';
import SimpleSDGPlatform from './sdg/SimpleSDGPlatform';
import AIAnalysisPage from './pages/AIAnalysisPage';
import SchemesPage from './pages/SchemesPage';
import { OpenRouterService } from './services/api/openRouterService';
import { DataService } from './services/dataService';
import { useAuth } from './auth';
import { AuthProvider } from './auth';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import './styles/simple-theme.css';
import './App.css';

function AppContent() {
  const [userProfile, setUserProfile] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [isLoadingSchemes, setIsLoadingSchemes] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'sdg', 'analysis', or 'schemes'
  const [showWelcome, setShowWelcome] = useState(false);
  const uploadSectionRef = useRef(null);
  const isInitialLoadRef = useRef(false);
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    if (!isInitialLoadRef.current && !showWelcome) {
      window.scrollTo(0, 0);
      loadInitialData();
      isInitialLoadRef.current = true;
    }
  }, [showWelcome]);

  useEffect(() => {
    if (i18n.language !== currentLanguage && isInitialLoadRef.current) {
      setCurrentLanguage(i18n.language);
      loadInitialData();
    }
  }, [i18n.language]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadInitialData = async () => {
    if (showWelcome) return; // Don't load until welcome screen is closed
    
    setIsLoadingSchemes(true);
    setError(null);
    
    try {
      // Fetch schemes from AI in selected language
      const langCode = i18n.language?.toLowerCase() || 'en';
      console.log('Loading schemes in language:', langCode);
      const popularSchemes = await OpenRouterService.getPopularSchemes(langCode);
      console.log('Popular schemes received:', popularSchemes?.length || 0, 'schemes');
      
      if (popularSchemes?.length > 0) {
        setSchemes(popularSchemes);
        DataService.saveToLocalStorage('popular_schemes', popularSchemes);
      } else {
        console.log('No schemes returned from AI');
        setSchemes([]);
      }
    } catch (error) {
      console.error('Error loading schemes:', error);
      setSchemes([]);
    } finally {
      setIsLoadingSchemes(false);
    }
  };

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      // Load user profile
      const savedProfile = await DataService.getUserProfile(user.uid);
      if (savedProfile) {
        setUserProfile(savedProfile);
      }
      
      // Load cached schemes
      const cachedSchemes = await DataService.getCachedSchemes(user.uid);
      if (cachedSchemes) {
        setSchemes(cachedSchemes);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSchemesFound = async (profile, foundSchemes = null) => {
    setUserProfile(profile);
    setIsLoadingSchemes(true);
    setError(null);
    
    try {
      // Save user profile if logged in
      if (user) {
        await DataService.saveUserProfile(user.uid, profile);
        await DataService.logUserAction(user.uid, 'profile_analyzed', { profile });
      }
      
      let schemesToUse = foundSchemes;
      
      // If schemes weren't provided, fetch them
      if (!schemesToUse) {
        console.log('🔍 Finding schemes for profile:', profile);
        const langCode = i18n.language?.toLowerCase() || 'en';
        schemesToUse = await OpenRouterService.findSchemes(profile, langCode);
        console.log('✅ AI returned schemes:', schemesToUse?.length || 0, 'schemes');
        
        // If still no schemes, set empty array
        if (!schemesToUse || schemesToUse.length === 0) {
          schemesToUse = [];
          console.log('🔄 No schemes found');
        }
      } else {
        console.log('📋 Using provided schemes:', schemesToUse?.length || 0, 'schemes');
      }
      
      if (schemesToUse && schemesToUse.length > 0) {
        setSchemes(schemesToUse);
        console.log('📋 Schemes set in state:', schemesToUse);
      } else {
        console.log('⚠️ No schemes found, keeping existing schemes');
      }
      
      // Cache schemes if user is logged in
      if (user && schemesToUse?.length > 0) {
        await DataService.cacheSchemes(user.uid, schemesToUse);
      }
      
      // Save to localStorage for offline access
      if (schemesToUse?.length > 0) {
        DataService.saveToLocalStorage('last_schemes', schemesToUse);
      }
      
    } catch (error) {
      console.error('Error processing schemes:', error);
      setError('Failed to process schemes. Please try again.');
      
      setSchemes([]);
    } finally {
      setIsLoadingSchemes(false);
    }
  };

  const handleStartScan = () => {
    setCurrentView('analysis');
  };

  const handleNavigateToSDG = () => {
    setCurrentView('sdg');
  };

  const handleNavigateToSchemes = () => {
    setCurrentView('schemes');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'sdg') {
    return <SimpleSDGPlatform onBack={handleBackToMain} />;
  }

  if (currentView === 'analysis') {
    return (
      <AIAnalysisPage 
        onBack={handleBackToMain}
        userProfile={userProfile}
        schemes={schemes}
        isLoadingSchemes={isLoadingSchemes}
        onSchemesFound={handleSchemesFound}
      />
    );
  }

  if (currentView === 'schemes') {
    return <SchemesPage onBack={handleBackToMain} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <ModernHeader />
      <main>
        <ModernHero onStartScan={handleStartScan} onNavigateToSDG={handleNavigateToSDG} onNavigateToSchemes={handleNavigateToSchemes} />

        <SimpleCTASection />
      </main>
      <SimpleFooter />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
