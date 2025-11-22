import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernUploadSection from '../components/ModernUploadSection';
import SimpleResultsSection from '../components/SimpleResultsSection';
import { ArrowLeft } from 'lucide-react';

const AIAnalysisPage = ({ userProfile, schemes, isLoadingSchemes, onSchemesFound }) => {
  const uploadSectionRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => {
              console.log('AIAnalysisPage: Back button clicked');
              navigate(-1);
            }}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer bg-white px-4 py-2 rounded-lg shadow-sm border"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
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
    </div>
  );
};

export default AIAnalysisPage;