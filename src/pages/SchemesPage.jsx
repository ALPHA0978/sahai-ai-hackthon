import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Search, Award, CheckCircle, IndianRupee, Building, Calendar, ExternalLink, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { OpenRouterServiceExtended } from '../services/mySchemeService';

const SchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    state: '',
    category: '',
    age: '',
    caste: '',
    benefitType: '',
    employmentStatus: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    loadSchemes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [schemes, filters, searchTerm]);

  const loadSchemes = async () => {
    try {
      setLoading(true);
      const data = await OpenRouterServiceExtended.getAllGovernmentSchemes();
      setSchemes(data || []);
    } catch (error) {
      console.error('Error loading schemes:', error);
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = schemes;

    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(scheme => 
          scheme[key]?.toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    });

    setFilteredSchemes(filtered);
  };

  const resetFilters = () => {
    setFilters({
      state: '',
      category: '',
      age: '',
      caste: '',
      benefitType: '',
      employmentStatus: ''
    });
    setSearchTerm('');
  };



  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4">
            <Award size={16} />
            <span className="text-sm font-medium">Government Schemes Portal</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Government Schemes
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find and apply for government schemes and benefits that you're eligible for. 
            Search through hundreds of schemes across different categories and states.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-blue-600" />
                  Filters
                </h3>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={filters.state}
                    onChange={(e) => setFilters({...filters, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All States</option>
                    <option value="uttar pradesh">Uttar Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="bihar">Bihar</option>
                    <option value="west bengal">West Bengal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
                  <select
                    value={filters.age}
                    onChange={(e) => setFilters({...filters, age: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Ages</option>
                    <option value="18-25">18-25</option>
                    <option value="21-30">21-30</option>
                    <option value="30-40">30-40</option>
                    <option value="40+">40+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment</label>
                  <select
                    value={filters.employmentStatus}
                    onChange={(e) => setFilters({...filters, employmentStatus: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="student">Student</option>
                    <option value="employed">Employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="farmer">Farmer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Benefit Type</label>
                  <select
                    value={filters.benefitType}
                    onChange={(e) => setFilters({...filters, benefitType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Benefits</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="loan">Loan</option>
                    <option value="subsidy">Subsidy</option>
                    <option value="pension">Pension</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search schemes by name, description, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-3 text-sm text-gray-500">
                <span className="font-medium text-blue-600">Tip:</span> Use quotes for exact matches or try keywords like "farmer", "education", "housing"
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredSchemes.length} schemes found
                </h2>
                <p className="text-sm text-gray-600">Showing results based on your filters</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Relevance</option>
                  <option>Name A-Z</option>
                  <option>Latest</option>
                </select>
              </div>
            </div>

            {/* Schemes List */}
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading schemes...</p>
                </div>
              ) : filteredSchemes.length === 0 ? (
                <div className="bg-white rounded-lg border p-8 text-center">
                  <p className="text-gray-600">No schemes found matching your criteria.</p>
                </div>
              ) : (
                filteredSchemes.map((scheme, index) => (
                  <div key={index} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {scheme.name || `Government Scheme ${index + 1}`}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Building className="w-4 h-4 mr-1" />
                                {scheme.ministry || 'Ministry of Government'}
                              </span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Updated: {scheme.lastUpdated || '2024'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {scheme.type || 'Central'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {scheme.description || 'Government scheme providing benefits to eligible citizens.'}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <IndianRupee className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Benefit Amount</p>
                          <p className="font-semibold text-blue-800">Variable</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <Award className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-xs text-green-600 font-medium">Category</p>
                          <p className="font-semibold text-green-800">{scheme.category || 'General'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Status</p>
                          <p className="font-semibold text-green-600">{scheme.status || 'Active'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {scheme.tags?.map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {tag}
                        </span>
                      )) || (
                        <>
                          <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Financial Assistance</span>
                          <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Government Scheme</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Status: <span className="font-medium text-green-600">
                          {scheme.status || 'Active'}
                        </span>
                      </div>
                      <div className="flex space-x-3">
                        {scheme.applicationLink && (
                          <a 
                            href={scheme.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Apply Now
                          </a>
                        )}
                        <a 
                          href={scheme.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {schemes.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <span className="text-sm text-blue-700">
                Found {schemes.length} scheme{schemes.length !== 1 ? 's' : ''} • 
                {schemes.filter(s => s.status === 'Active').length} active
              </span>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default SchemesPage;