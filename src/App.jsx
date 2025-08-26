import { useState, useEffect, useRef } from 'react';
import ModernHeader from './components/ModernHeader';
import ModernHero from './components/ModernHero';
import ModernUploadSection from './components/ModernUploadSection';
import SimpleResultsSection from './components/SimpleResultsSection';
import SimpleCTASection from './components/SimpleCTASection';
import SimpleFooter from './components/SimpleFooter';
import SimpleSDGPlatform from './sdg/SimpleSDGPlatform';
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
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'sdg'
  const uploadSectionRef = useRef(null);
  const { user } = useAuth();
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadInitialData();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadInitialData = async () => {
    setIsLoadingSchemes(true);
    setError(null);
    
    try {
      // Always fetch fresh schemes from AI
      console.log('Fetching popular schemes from AI...');
      const popularSchemes = await OpenRouterService.getPopularSchemes(i18n.language);
      
      if (popularSchemes?.length > 0) {
        setSchemes(popularSchemes);
        DataService.saveToLocalStorage('popular_schemes', popularSchemes);
      } else {
        // Only use fallback if AI returns empty
        setSchemes(OpenRouterService.getDefaultSchemes());
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
      setError('Failed to load schemes from AI. Using fallback data.');
      // Use fallback schemes if API fails
      setSchemes(OpenRouterService.getDefaultSchemes());
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

  const handleSchemesFound = async (profile) => {
    setUserProfile(profile);
    setIsLoadingSchemes(true);
    setError(null);
    
    try {
      // Save user profile if logged in
      if (user) {
        await DataService.saveUserProfile(user.uid, profile);
        await DataService.logUserAction(user.uid, 'profile_analyzed', { profile });
      }
      
      console.log('🔍 Finding schemes for profile:', profile);
      const foundSchemes = await OpenRouterService.findSchemes(profile, i18n.language);
      console.log('✅ AI returned schemes:', foundSchemes?.length || 0, 'schemes');
      
      if (foundSchemes && foundSchemes.length > 0) {
        setSchemes(foundSchemes);
        console.log('📋 Schemes set in state:', foundSchemes);
      } else {
        console.log('⚠️ No schemes found, keeping existing schemes');
      }
      
      // Cache schemes if user is logged in
      if (user && foundSchemes?.length > 0) {
        await DataService.cacheSchemes(user.uid, foundSchemes);
      }
      
      // Save to localStorage for offline access
      if (foundSchemes?.length > 0) {
        DataService.saveToLocalStorage('last_schemes', foundSchemes);
      }
      
    } catch (error) {
      console.error('Error fetching schemes:', error);
      setError('Failed to analyze document. Please try again.');
      
      // Try to load from localStorage as fallback
      const fallbackSchemes = DataService.getFromLocalStorage('last_schemes');
      if (fallbackSchemes) {
        setSchemes(fallbackSchemes);
      }
    } finally {
      setIsLoadingSchemes(false);
    }
  };

  const handleStartScan = () => {
    uploadSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleNavigateToSDG = () => {
    setCurrentView('sdg');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'sdg') {
    return <SimpleSDGPlatform onBack={handleBackToMain} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernHeader />
      <main>
        <ModernHero onStartScan={handleStartScan} onNavigateToSDG={handleNavigateToSDG} />
        <div ref={uploadSectionRef}>
          <ModernUploadSection onSchemesFound={handleSchemesFound} />
        </div>
        <SimpleResultsSection 
          userProfile={userProfile} 
          schemes={schemes} 
          isLoading={isLoadingSchemes}
        />
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
