import { ExternalLink, MapPin, IndianRupee, Award, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SimpleResultsSection = ({ userProfile, schemes = [], isLoading }) => {
  const { t } = useLanguage();
  console.log('SimpleResultsSection render:', { schemes: schemes?.length, isLoading });
  
  // Always show the section if we're loading or if we should have schemes
  if (!schemes.length && !isLoading) {
    console.log('No schemes to display, hiding section');
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4">
            <Award size={14} />
            <span className="text-sm font-medium">{t('eligibilityResults')}</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {userProfile ? t('foundSchemes') : t('schemes')}
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            {userProfile 
              ? 'Based on your profile, here are the schemes you may be eligible for'
              : 'Popular government schemes and benefits for Indian citizens'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Schemes List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white border rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
              ) : (
                schemes.map((scheme, index) => {
                  console.log('Scheme URLs:', { 
                    title: scheme.title, 
                    applicationUrl: scheme.applicationUrl, 
                    eligibilityUrl: scheme.eligibilityUrl 
                  });
                  return (
                  <div
                    key={scheme.id || index}
                    className={`bg-white border-2 rounded-lg p-6 ${
                      scheme.isEligible ? 'border-green-200 bg-green-50' : 
                      scheme.isEligible === false ? 'border-red-200 bg-red-50' : 
                      'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {scheme.title || scheme.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            scheme.state === 'Central' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {scheme.state === 'Central' ? 'Central' : scheme.state || 'State'}
                          </span>
                        </div>
                      </div>
                      
                      {scheme.isEligible !== null && (
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                          scheme.isEligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {scheme.isEligible ? (
                            <CheckCircle size={16} />
                          ) : (
                            <XCircle size={16} />
                          )}
                          <span>{scheme.isEligible ? t('eligible') : t('notEligible')}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {scheme.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <IndianRupee size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Benefit Amount</p>
                          <p className="font-semibold text-blue-600">
                            {scheme.amount || 'Variable'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <Award size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Category</p>
                          <p className="font-semibold text-green-600">
                            {scheme.category || 'General'}
                          </p>
                        </div>
                      </div>
                    </div>
                    

                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          scheme.isEligible === false 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        disabled={scheme.isEligible === false}
                        onClick={() => {
                          if (scheme.isEligible !== false && scheme.applicationUrl) {
                            window.open(scheme.applicationUrl, '_blank');
                          }
                        }}
                      >
                        {scheme.isEligible === false ? t('notEligible') : t('applyNow')}
                      </button>
                      
                      <button 
                        className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          if (scheme.eligibilityUrl || scheme.detailsUrl) {
                            window.open(scheme.eligibilityUrl || scheme.detailsUrl, '_blank');
                          }
                        }}
                      >
                        <ExternalLink size={16} />
                        <span>{t('viewDetails')}</span>
                      </button>
                    </div>
                  </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin size={20} className="text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Nearest Offices</h3>
              </div>
              
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">Find nearby offices</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-900">Block Office</p>
                    <p className="text-xs text-gray-500">2.3 km away</p>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Directions
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-900">District Collector</p>
                    <p className="text-xs text-gray-500">8.7 km away</p>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Directions
                  </button>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-center text-gray-500">
                  Visit offices during working hours (10 AM - 5 PM)
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {schemes.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-sm text-blue-700">
                Found {schemes.length} scheme{schemes.length !== 1 ? 's' : ''} • 
                {schemes.filter(s => s.isEligible).length} eligible
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SimpleResultsSection;