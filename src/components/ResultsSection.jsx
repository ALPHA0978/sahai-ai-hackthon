import { motion } from 'framer-motion';
import { ExternalLink, MapPin, IndianRupee, Award } from 'lucide-react';
import { fetchGovernmentSchemes } from '../services/api/openRouter';

const ResultsSection = ({ userProfile, schemes = [], isLoading }) => {
  if (!schemes.length && !isLoading) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
            {userProfile ? 'Your Eligible Schemes' : 'Popular Government Schemes'}
          </h2>
          <p className="text-lg text-text-secondary">
            {userProfile 
              ? 'Based on your profile, here are the schemes you can apply for'
              : 'Discover these government schemes available for Indian citizens'
            }
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
              ) : (
                schemes.map((scheme, index) => (
                <motion.div
                  key={scheme.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-custom transition-all duration-300 hover:border-primary/30"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-text-primary">{scheme.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          scheme.state === 'Central' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {scheme.state}
                        </span>
                      </div>
                      <p className="text-text-secondary mb-3">{scheme.description}</p>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1 text-primary font-semibold">
                          <IndianRupee size={16} />
                          <span>{scheme.amount}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-text-secondary">
                          <Award size={16} />
                          <span className="text-sm">{scheme.category}</span>
                        </div>
                      </div>
                      
                      {scheme.isEligible !== null && (
                        <div className={`p-3 rounded-lg mb-3 ${
                          scheme.isEligible 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-red-50 border border-red-200'
                        }`}>
                          <div className={`flex items-center space-x-2 mb-1 ${
                            scheme.isEligible ? 'text-green-700' : 'text-red-700'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              scheme.isEligible ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className="font-medium text-sm">
                              {scheme.isEligible ? 'Eligible' : 'Not Eligible'}
                            </span>
                          </div>
                          {scheme.eligibilityReason && (
                            <p className={`text-xs ${
                              scheme.isEligible ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {scheme.eligibilityReason}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <a 
                      href={scheme.applicationUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium text-center ${
                        scheme.isEligible === false 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-primary text-white hover:bg-primary-dark'
                      }`}
                      onClick={scheme.isEligible === false ? (e) => e.preventDefault() : undefined}
                    >
                      {scheme.isEligible === false ? 'Not Eligible' : 'Apply Now'}
                    </a>
                    <a 
                      href={scheme.eligibilityUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>Details</span>
                    </a>
                  </div>
                </motion.div>
                ))
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="text-primary" size={20} />
                <h3 className="text-lg font-semibold text-text-primary">Nearest Offices</h3>
              </div>
              
              <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center text-text-secondary">
                  <MapPin size={32} className="mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">Showing nearby government offices</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Block Office</p>
                    <p className="text-xs text-text-secondary">2.3 km away</p>
                  </div>
                  <button className="text-primary text-sm font-medium">Directions</button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-medium text-sm">District Collector</p>
                    <p className="text-xs text-text-secondary">8.7 km away</p>
                  </div>
                  <button className="text-primary text-sm font-medium">Directions</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;