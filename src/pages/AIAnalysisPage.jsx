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
      <main>


        {/* AI Scheme Research Section */}
        <div ref={uploadSectionRef}>
          <ModernUploadSection onSchemesFound={onSchemesFound} />
        </div>

        {/* Results Section - Only show if user has uploaded data */}
        {userProfile && (
          <SimpleResultsSection 
            userProfile={userProfile} 
            schemes={schemes} 
            isLoading={isLoadingSchemes}
          />
        )}
      </main>
    </div>
  );
};

export default AIAnalysisPage;