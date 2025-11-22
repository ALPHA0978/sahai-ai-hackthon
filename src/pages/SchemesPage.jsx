import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Search, ChevronDown } from 'lucide-react';
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
    <div className="pt-20">
      {/* Government Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  console.log('SchemesPage: Back button clicked');
                  navigate(-1);
                }}
                className="flex items-center space-x-2 text-blue-600 cursor-pointer bg-white px-4 py-2 rounded-lg shadow-sm border"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <div className="text-sm text-gray-600">
                Ministry of Electronics and Information Technology | myScheme
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Digital India Corporation
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 text-lg flex items-center">
                  <Filter size={20} className="mr-2 text-blue-600" />
                  Filter By
                </h3>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset Filters
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">State</label>
                  <select 
                    value={filters.state}
                    onChange={(e) => setFilters({...filters, state: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  >
                    <option value="">All States</option>
                    <option value="uttar pradesh">Uttar Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="bihar">Bihar</option>
                    <option value="west bengal">West Bengal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Age</label>
                  <select 
                    value={filters.age}
                    onChange={(e) => setFilters({...filters, age: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  >
                    <option value="">All Ages</option>
                    <option value="18-25">18 - 25</option>
                    <option value="21-30">21 - 30</option>
                    <option value="30-40">30 - 40</option>
                    <option value="40+">40+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                  <select 
                    value={filters.employmentStatus}
                    onChange={(e) => setFilters({...filters, employmentStatus: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
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
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder='For an exact match, put the words in quotes. For example: "Scheme Name"'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Search
                </button>
              </div>
            </div>

            {/* Results Header */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    We found {filteredSchemes.length} schemes based on your preferences
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort:</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1">
                    <option>Relevance</option>
                    <option>Name A-Z</option>
                    <option>Latest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Schemes List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading schemes...</p>
                </div>
              ) : filteredSchemes.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-gray-600">No schemes found matching your criteria.</p>
                </div>
              ) : (
                filteredSchemes.map((scheme, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
                        {scheme.name || `Government Scheme ${index + 1}`}
                      </h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {scheme.type || 'Central'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">
                        {scheme.ministry || 'Ministry of Government'}
                      </p>
                      <span className="text-xs text-gray-500">
                        Updated: {scheme.lastUpdated || '2024'}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {scheme.description || 'Government scheme providing benefits to eligible citizens.'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {scheme.tags?.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      )) || (
                        <>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Financial Assistance</span>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Government Scheme</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Status: <span className={`font-medium ${scheme.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                          {scheme.status || 'Active'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {scheme.applicationLink && (
                          <a 
                            href={scheme.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
                          >
                            Apply Now
                          </a>
                        )}
                        <a 
                          href={scheme.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm font-medium"
                        >
                          View Details →
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">myScheme</h4>
              <p className="text-sm text-gray-300">
                Powered by Digital India Corporation (DIC)<br/>
                Ministry of Electronics & IT (MeitY)<br/>
                Government of India®
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Accessibility Statement</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get in touch</h4>
              <p className="text-sm text-gray-300">
                4th Floor, NeGD, Electronics Niketan<br/>
                6 CGO Complex, Lodhi Road<br/>
                New Delhi - 110003, India
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SchemesPage;