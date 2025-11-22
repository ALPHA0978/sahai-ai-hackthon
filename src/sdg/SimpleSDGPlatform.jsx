import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SimpleSDGDashboard from './components/SimpleSDGDashboard';
import SimpleAISolutionsDashboard from './components/SimpleAISolutionsDashboard';
import SimplePersonalizedSuggestions from './pages/SimplePersonalizedSuggestions';
import SimpleAIAssistant from './components/SimpleAIAssistant';
import AIInclusiveEducationTool from './tools/AIInclusiveEducationTool';
import AIPovertyTool from './tools/AIPovertyTool';
import SustainableFarmingTool from './tools/SustainableFarmingTool';
import AIHealthcareTool from './tools/AIHealthcareTool';
import AIGenderEqualityTool from './tools/AIGenderEqualityTool';
import AIWaterManagementTool from './tools/AIWaterManagementTool';
import AIJobMatchingTool from './tools/AIJobMatchingTool';
import AIInfrastructureTool from './tools/AIInfrastructureTool';

const SimpleSDGPlatform = () => {
  const [currentTool, setCurrentTool] = useState('dashboard');
  const [toolHistory, setToolHistory] = useState(['dashboard']);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle hash-based navigation
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && hash !== currentTool) {
      console.log('SDG: Hash navigation detected:', hash);
      setCurrentTool(hash);
      setToolHistory(['dashboard', hash]);
    }
  }, [location.hash]);

  const handleNavigateToTool = (toolId) => {
    console.log(`SDG: Navigating to ${toolId}`);
    setToolHistory(prev => [...prev, toolId]);
    setCurrentTool(toolId);
    // Update URL hash
    window.location.hash = toolId;
  };

  const handleBackToDashboard = () => {
    console.log('SDG: Going back in tool history:', toolHistory);
    if (toolHistory.length > 1) {
      const newHistory = [...toolHistory];
      newHistory.pop();
      const previousTool = newHistory[newHistory.length - 1];
      setToolHistory(newHistory);
      setCurrentTool(previousTool);
    } else {
      setCurrentTool('dashboard');
      setToolHistory(['dashboard']);
    }
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
      case 'ai-education-tool':
        return <AIInclusiveEducationTool onBack={handleBackToDashboard} />;
      case 'ai-poverty-tool':
        return <AIPovertyTool onBack={handleBackToDashboard} />;
      case 'ai-farming-tool':
        return <SustainableFarmingTool onBack={handleBackToDashboard} />;
      case 'ai-healthcare-tool':
        return <AIHealthcareTool onBack={handleBackToDashboard} />;
      case 'ai-gender-tool':
        return <AIGenderEqualityTool onBack={handleBackToDashboard} />;
      case 'ai-water-tool':
        return <AIWaterManagementTool onBack={handleBackToDashboard} />;
      case 'ai-jobs-tool':
        return <AIJobMatchingTool onBack={handleBackToDashboard} />;
      case 'ai-infrastructure-tool':
        return <AIInfrastructureTool onBack={handleBackToDashboard} />;
      default:
        return <SimpleSDGDashboard onNavigateToTool={handleNavigateToTool} />;
    }
  };

  return (
    <div className="pt-20">
      {/* Navigation Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {currentTool === 'dashboard' ? (
          <button
            onClick={() => {
              console.log('SDG Platform: Back to Sahai.ai clicked');
              navigate(-1);
            }}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            ← Back
          </button>
        ) : (
          <button
            onClick={() => {
              console.log('SDG Platform: Back in tools clicked');
              handleBackToDashboard();
            }}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            ← Back
          </button>
        )}

      </div>

      <div>
        {renderCurrentTool()}
      </div>
    </div>
  );
};

export default SimpleSDGPlatform;