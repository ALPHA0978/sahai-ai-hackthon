import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { fetchGovernmentSchemes } from './services/api/openRouter';
import { getDefaultSchemes } from './services/api/defaultSchemes';
import { analytics } from './services/firebase';
import './App.css';

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [isLoadingSchemes, setIsLoadingSchemes] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    const loadDefaultSchemes = async () => {
      setIsLoadingSchemes(true);
      try {
        const defaultSchemes = await getDefaultSchemes();
        setSchemes(defaultSchemes);
      } catch (error) {
        console.error('Error loading default schemes:', error);
      } finally {
        setIsLoadingSchemes(false);
      }
    };
    
    loadDefaultSchemes();
  }, []);

  const handleSchemesFound = async (profile) => {
    setUserProfile(profile);
    setIsLoadingSchemes(true);
    
    try {
      const foundSchemes = await fetchGovernmentSchemes(profile);
      setSchemes(foundSchemes);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setIsLoadingSchemes(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <UploadSection onSchemesFound={handleSchemesFound} />
        <ResultsSection 
          userProfile={userProfile} 
          schemes={schemes} 
          isLoading={isLoadingSchemes} 
        />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
