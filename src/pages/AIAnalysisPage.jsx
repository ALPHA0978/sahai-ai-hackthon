import { useRef } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernUploadSection from '../components/ModernUploadSection';
import SimpleResultsSection from '../components/SimpleResultsSection';
import SimpleFooter from '../components/SimpleFooter';
import { ArrowLeft } from 'lucide-react';

const AIAnalysisPage = ({ onBack, userProfile, schemes, isLoadingSchemes, onSchemesFound }) => {
  const uploadSectionRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernHeader />
      <main className="pt-16">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* AI Scheme Research Section */}
        <div ref={uploadSectionRef}>
          <ModernUploadSection onSchemesFound={onSchemesFound} />
        </div>

        {/* Results Section */}
        <SimpleResultsSection 
          userProfile={userProfile} 
          schemes={schemes} 
          isLoading={isLoadingSchemes}
        />
      </main>
      <SimpleFooter />
    </div>
  );
};

export default AIAnalysisPage;