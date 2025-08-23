import { useState } from 'react';
import SimpleSDGDashboard from './components/SimpleSDGDashboard';
import SimpleAISolutionsDashboard from './components/SimpleAISolutionsDashboard';
import SimplePersonalizedSuggestions from './pages/SimplePersonalizedSuggestions';
import SimpleAIAssistant from './components/SimpleAIAssistant';
import AIInclusiveEducationTool from './tools/AIInclusiveEducationTool';

const SimpleSDGPlatform = ({ onBack }) => {
  const [currentTool, setCurrentTool] = useState('dashboard');

  const handleNavigateToTool = (toolId) => {
    setCurrentTool(toolId);
  };

  const handleBackToDashboard = () => {
    setCurrentTool('dashboard');
  };

  const renderCurrentTool = () => {
    switch (currentTool) {
      case 'dashboard':
        return <SimpleSDGDashboard onNavigateToTool={handleNavigateToTool} />;
      case 'ai-solutions':
        return <SimpleAISolutionsDashboard onBack={handleBackToDashboard} />;
      case 'personalized-suggestions':
        return <SimplePersonalizedSuggestions onBack={handleBackToDashboard} />;
      case 'ai-assistant':
        return <SimpleAIAssistant onBack={handleBackToDashboard} />;
      case 'inclusive-education':
        return <AIInclusiveEducationTool onBack={handleBackToDashboard} />;
      default:
        return <SimpleSDGDashboard onNavigateToTool={handleNavigateToTool} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      {currentTool === 'dashboard' && (
        <div className="fixed top-20 left-4 z-40">
          <button
            onClick={onBack}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            ← Back to Sahai.ai
          </button>
        </div>
      )}

      {renderCurrentTool()}
    </div>
  );
};

export default SimpleSDGPlatform;