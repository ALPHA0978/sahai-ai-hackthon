import { useState } from 'react';
import { Heart, QrCode, AlertTriangle, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WelcomeScreen = ({ onContinue }) => {
  const [showQR, setShowQR] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिंदी' },
    { code: 'BN', name: 'বাংলা' },
    { code: 'TE', name: 'తెలుగు' },
    { code: 'MR', name: 'मराठी' },
    { code: 'TA', name: 'தமிழ்' },
    { code: 'GU', name: 'ગુજરાતી' },
    { code: 'KN', name: 'ಕನ್ನಡ' },
    { code: 'ML', name: 'മലയാളം' },
    { code: 'PA', name: 'ਪੰਜਾਬੀ' }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-4 text-white text-center">
        
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Sahai.ai</h1>
          <p className="text-xl opacity-90">Your Rights, In Your Language, In Seconds</p>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe size={20} />
            <span className="text-lg font-medium">Choose Your Language</span>
          </div>
          <select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white text-lg min-w-48"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="text-black">
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Donation Info */}
        <div className="mb-8 p-6 bg-white/10 rounded-xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart size={20} className="text-red-300" />
            <span className="text-lg font-medium">This website works on donations</span>
          </div>
          <button
            onClick={() => setShowQR(true)}
            className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full transition-colors flex items-center gap-2 mx-auto"
          >
            <QrCode size={16} />
            Support Us
          </button>
        </div>

        {/* Prototype Notice */}
        <div className="mb-8 p-4 bg-yellow-500/20 rounded-xl border border-yellow-400/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle size={20} className="text-yellow-300" />
            <span className="font-medium">Prototype Phase</span>
          </div>
          <p className="text-sm opacity-90">
            If you find any problems, please send a report in the Report section
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transition-colors flex items-center gap-2 mx-auto"
        >
          Continue to Website
          <ArrowRight size={20} />
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60" onClick={() => setShowQR(false)}>
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Sahai.ai</h3>
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-center text-gray-600">
                  <QrCode size={48} className="mx-auto mb-2" />
                  <p className="text-sm">QR Code for Donations</p>
                  <p className="text-xs mt-2">UPI: sahai@upi</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Your donations help us maintain and improve this free service for everyone.
              </p>
              <button
                onClick={() => setShowQR(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;