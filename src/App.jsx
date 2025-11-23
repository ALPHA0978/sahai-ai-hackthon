import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

import ModernHeader from './components/ModernHeader';
import ModernHero from './components/ModernHero';
import SimpleCTASection from './components/SimpleCTASection';
import SimpleFooter from './components/SimpleFooter';
import AIInclusiveEducationTool from './sdg/tools/AIInclusiveEducationTool';
import AIPovertyTool from './sdg/tools/AIPovertyTool';
import SustainableFarmingTool from './sdg/tools/SustainableFarmingTool';
import AIHealthcareTool from './sdg/tools/AIHealthcareTool';
import AIGenderEqualityTool from './sdg/tools/AIGenderEqualityTool';
import AIWaterManagementTool from './sdg/tools/AIWaterManagementTool';
import AIJobMatchingTool from './sdg/tools/AIJobMatchingTool';
import AIInfrastructureTool from './sdg/tools/AIInfrastructureTool';
import SimplePersonalizedSuggestions from './sdg/pages/SimplePersonalizedSuggestions';
import SimpleAIAssistant from './sdg/components/SimpleAIAssistant';
import AIAnalysisPage from './pages/AIAnalysisPage';
import SchemesPage from './pages/SchemesPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './auth/components/LoginPage';
import { OpenRouterService } from './services/api/openRouterService';
import { DataService } from './services/dataService';
import { useAuth } from './auth';
import { AuthProvider } from './auth';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { useTranslation } from 'react-i18next';
import './styles/simple-theme.css';
import './App.css';

// Home Page Component
function HomePage({ userProfile, schemes, isLoadingSchemes, onStartScan, onNavigateToSDG, onNavigateToSchemes }) {
  return (
    <main>
      <ModernHero 
        userProfile={userProfile}
        onStartScan={onStartScan} 
        onNavigateToSDG={onNavigateToSDG} 
        onNavigateToSchemes={onNavigateToSchemes} 
      />
      <SimpleCTASection />
    </main>
  );
}

function AppContent() {
  const [userProfile, setUserProfile] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [isLoadingSchemes, setIsLoadingSchemes] = useState(false);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const isInitialLoadRef = useRef(false);
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const navigate = useNavigate();
  const location = useLocation();

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
    if (showWelcome) return; 
    
    setIsLoadingSchemes(true);
    setError(null);
    
    try {
      
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
     
      const savedProfile = await DataService.getUserProfile(user.uid);
      if (savedProfile) {
        setUserProfile(savedProfile);
      }
      
     
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
     
      if (user) {
        await DataService.saveUserProfile(user.uid, profile);
        await DataService.logUserAction(user.uid, 'profile_analyzed', { profile });
      }
      
      let schemesToUse = foundSchemes;
      
     
      if (!schemesToUse) {
        console.log('🔍 Finding schemes for profile:', profile);
        const langCode = i18n.language?.toLowerCase() || 'en';
        schemesToUse = await OpenRouterService.findSchemes(profile, langCode);
        console.log('✅ AI returned schemes:', schemesToUse?.length || 0, 'schemes');
       
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
      
    
      if (user && schemesToUse?.length > 0) {
        await DataService.cacheSchemes(user.uid, schemesToUse);
      }
      
      
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

  // Navigation functions using React Router
  const handleStartScan = () => {
    console.log('🔄 Navigating to analysis');
    navigate('/analysis');
  };
  
  const handleNavigateToSDG = () => {
    console.log('🔄 Navigating to SDG');
    navigate('/sdg');
  };
  
  const handleNavigateToSchemes = () => {
    console.log('🔄 Navigating to schemes');
    navigate('/schemes');
  };
  


  // Debug current route
  useEffect(() => {
    console.log('Current route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      
      {location.pathname === '/' && <ModernHeader />}
      
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              userProfile={userProfile}
              schemes={schemes}
              isLoadingSchemes={isLoadingSchemes}
              onStartScan={handleStartScan}
              onNavigateToSDG={handleNavigateToSDG}
              onNavigateToSchemes={handleNavigateToSchemes}
            />
          } 
        />
        <Route 
          path="/analysis" 
          element={
            <AIAnalysisPage 
              userProfile={userProfile}
              schemes={schemes}
              isLoadingSchemes={isLoadingSchemes}
              onSchemesFound={handleSchemesFound}
            />
          } 
        />
        <Route 
          path="/ai-education-tool" 
          element={<AIInclusiveEducationTool onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/ai-poverty-tool" 
          element={<AIPovertyTool onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/ai-farming-tool" 
          element={<SustainableFarmingTool onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/ai-healthcare-tool" 
          element={<AIHealthcareTool onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/ai-gender-tool" 
          element={<AIGenderEqualityTool onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/ai-water-tool" 
          element={<AIWaterManagementTool onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/ai-jobs-tool" 
          element={<AIJobMatchingTool onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/ai-infrastructure-tool" 
          element={<AIInfrastructureTool onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/personalized-suggestions" 
          element={<SimplePersonalizedSuggestions onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/ai-assistant" 
          element={<SimpleAIAssistant onBack={() => navigate('/dashboard?tab=ai-tools')} />} 
        />
        <Route 
          path="/schemes" 
          element={<SchemesPage />} 
        />
        <Route 
          path="/profile-setup" 
          element={<ProfileSetupPage />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <DashboardPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage isOpen={true} onClose={() => navigate('/')} />} 
        />
      </Routes>
      
      {location.pathname === '/' && <SimpleFooter />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <ProfileProvider>
              <AppContent />
            </ProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
