import { ExternalLink, MapPin, IndianRupee, Award, CheckCircle, XCircle, X, FileText, User, Calendar, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SimpleResultsSection = ({ userProfile, schemes = [], isLoading }) => {
  const { t } = useLanguage();
  const [selectedScheme, setSelectedScheme] = useState(null);
  console.log('SimpleResultsSection render:', { schemes: schemes?.length, isLoading });
  
  // Only show the section if we have user profile data and schemes, or if we're loading
  if (!userProfile && !isLoading) {
    console.log('No user profile data, hiding section');
    return null;
  }
  
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
                        onClick={() => setSelectedScheme(scheme)}
                      >
                        <FileText size={16} />
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

        {/* Scheme Details Modal */}
        <AnimatePresence>
          {selectedScheme && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
              >
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-sm font-bold text-gray-500">{selectedScheme.category}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedScheme.isEligible === 'eligible' ? 'bg-green-100 text-green-700' : 
                      selectedScheme.isEligible === 'partially_eligible' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedScheme.isEligible === 'eligible' ? 'Eligible' :
                       selectedScheme.isEligible === 'partially_eligible' ? 'Partially Eligible' : 'Not Eligible'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedScheme.title}</h3>
                  <p className="text-gray-600 mb-6">{selectedScheme.description}</p>
                </div>

                {/* Eligibility Analysis */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Eligibility Analysis</h4>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{selectedScheme.eligibilityScore || 0}%</div>
                      <div className="text-xs text-gray-600">Match Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{selectedScheme.amount}</div>
                      <div className="text-xs text-gray-600">Benefit Amount</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{selectedScheme.timeline || '30-60 days'}</div>
                      <div className="text-xs text-gray-600">Processing Time</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{selectedScheme.eligibilityReason}</p>
                </div>

                {/* Required Documents */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Required Documents
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {(selectedScheme.requirements || [
                      'Aadhaar Card',
                      'Income Certificate', 
                      'Bank Account Details',
                      'Residence Proof'
                    ]).map((req, index) => {
                      const hasDocument = userProfile && (
                        (req.toLowerCase().includes('aadhaar') && userProfile.aadhaarCard) ||
                        (req.toLowerCase().includes('pan') && userProfile.panCard) ||
                        (req.toLowerCase().includes('bank') && userProfile.bankAccount) ||
                        (req.toLowerCase().includes('voter') && userProfile.voterID)
                      );
                      
                      return (
                        <div key={index} className={`flex items-center justify-between p-2 rounded border ${
                          hasDocument ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}>
                          <span className="text-sm">{req}</span>
                          {hasDocument ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Profile Match Analysis */}
                {userProfile && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Your Profile Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">{userProfile.age || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Income:</span>
                        <span className="font-medium">₹{userProfile.annualIncome || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{userProfile.category || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">State:</span>
                        <span className="font-medium">{userProfile.location?.state || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Application Process */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Application Process</h4>
                  <div className="space-y-2">
                    {(selectedScheme.applicationProcess || [
                      'Visit official website',
                      'Fill application form',
                      'Upload required documents',
                      'Submit application',
                      'Track application status'
                    ]).map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Need Help?
                  </h4>
                  <div className="text-sm text-blue-700">
                    <p>Helpline: {selectedScheme.helplineNumber || '1800-XXX-XXXX'}</p>
                    <p>Ministry: {selectedScheme.ministry || 'Government of India'}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      if (selectedScheme.applicationUrl) {
                        window.open(selectedScheme.applicationUrl, '_blank');
                      }
                    }}
                    disabled={selectedScheme.isEligible === 'not_eligible'}
                    className={`flex-1 py-3 px-4 rounded-lg transition-colors font-medium ${
                      selectedScheme.isEligible === 'not_eligible'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {selectedScheme.isEligible === 'not_eligible' ? 'Not Eligible' : 'Apply Now →'}
                  </button>
                  <button
                    onClick={() => setSelectedScheme(null)}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SimpleResultsSection;