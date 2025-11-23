import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, GraduationCap, Upload, Save, ChevronDown, FileText, CreditCard, Vote, Home as HomeIcon, Check, X } from 'lucide-react';
import { useAuth } from '../auth';
import { useProfile } from '../contexts/ProfileContext';
import { DataService } from '../services/dataService';
import { CloudinaryService } from '../services/cloudinaryService';

const ProfileSetupPage = () => {
  const { user } = useAuth();
  const { profile, updateProfile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [dropdowns, setDropdowns] = useState({});
  const [errors, setErrors] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (profile) {
      console.log('Loading existing profile from context:', profile);
      setProfileData(prev => ({ ...prev, ...profile }));
    }
    setLoadingProfile(false);
  }, [profile]);

  const CustomDropdown = ({ label, value, onChange, options, placeholder, required, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-left flex items-center justify-between ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-900"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };
  const [profileData, setProfileData] = useState({
    // Personal Info
    fullName: user?.displayName || '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    
    // Location
    state: '',
    district: '',
    city: '',
    pincode: '',
    address: '',
    
    // Demographics
    category: '',
    religion: '',
    maritalStatus: '',
    
    // Economic Info
    occupation: '',
    annualIncome: '',
    employmentStatus: '',
    
    // Education & Family
    educationLevel: '',
    familySize: '',
    dependents: '',
    
    // Assets & Documents
    landOwnership: false,
    landSize: '',
    bankAccount: true,
    hasAadhaar: true,
    hasPAN: false,
    hasVoterID: false,
    rationCardType: '',
    
    // Additional Info
    hasDisability: false,
    disabilityType: '',
    housingType: '',
    cookingFuel: '',
    vehicleOwnership: '',
    
    // Documents
    profilePhoto: '',
    documents: [],
    aadhaarDocument: null,
    panDocument: null,
    voterIdDocument: null,
    landDocument: null
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (file, type = 'document') => {
    setLoading(true);
    try {
      const result = await CloudinaryService.uploadImage(file);
      if (type === 'profile') {
        handleInputChange('profilePhoto', result.secure_url);
      } else {
        setProfileData(prev => ({
          ...prev,
          documents: [...prev.documents, { url: result.secure_url, name: file.name }]
        }));
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (file, documentType) => {
    setLoading(true);
    try {
      const result = await CloudinaryService.uploadImage(file);
      const documentData = {
        url: result.secure_url,
        name: file.name,
        uploadedAt: new Date().toISOString()
      };
      
      // Save document and automatically check the checkbox
      handleInputChange(`${documentType}Document`, documentData);
      
      // Auto-check the corresponding checkbox based on document type
      const checkboxMap = {
        'aadhaar': 'hasAadhaar',
        'pan': 'hasPAN', 
        'voterId': 'hasVoterID',
        'land': 'landOwnership'
      };
      
      if (checkboxMap[documentType]) {
        handleInputChange(checkboxMap[documentType], true);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    const requiredFields = {
      fullName: 'Full Name is required',
      dateOfBirth: 'Date of Birth is required',
      gender: 'Gender is required',
      phoneNumber: 'Phone Number is required',
      category: 'Category is required',
      maritalStatus: 'Marital Status is required'
    };

    Object.keys(requiredFields).forEach(field => {
      if (!profileData[field]) {
        newErrors[field] = requiredFields[field];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const requiredFields = {
      state: 'State is required',
      district: 'District is required',
      occupation: 'Occupation is required',
      annualIncome: 'Annual Income is required',
      educationLevel: 'Education Level is required',
      familySize: 'Family Size is required'
    };

    Object.keys(requiredFields).forEach(field => {
      if (!profileData[field]) {
        newErrors[field] = requiredFields[field];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      console.log('Saving profile data:', profileData);
      
      const profileToSave = {
        ...profileData,
        completedAt: new Date().toISOString(),
        isComplete: true
      };
      
      console.log('Profile to save:', profileToSave);
      
      const success = await updateProfile(profileToSave);
      
      if (success) {
        await DataService.logUserAction(user.uid, 'profile_completed', { profileData });
        console.log('Profile saved successfully, navigating to dashboard');
        navigate('/dashboard');
      } else {
        alert('Error saving profile. Please try again.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-4">
          <User size={14} />
          <span className="text-sm font-medium">Step 1</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Help us understand your profile better</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={profileData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.fullName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
        </div>

        <CustomDropdown
          label="Gender"
          value={profileData.gender}
          onChange={(value) => handleInputChange('gender', value)}
          placeholder="Select Gender"
          required
          error={errors.gender}
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Transgender', label: 'Transgender' }
          ]}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="tel"
            value={profileData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
        </div>

        <CustomDropdown
          label="Category"
          value={profileData.category}
          onChange={(value) => handleInputChange('category', value)}
          placeholder="Select Category"
          required
          error={errors.category}
          options={[
            { value: 'General', label: 'General' },
            { value: 'SC', label: 'SC' },
            { value: 'ST', label: 'ST' },
            { value: 'OBC', label: 'OBC' },
            { value: 'EWS', label: 'EWS' }
          ]}
        />

        <CustomDropdown
          label="Marital Status"
          value={profileData.maritalStatus}
          onChange={(value) => handleInputChange('maritalStatus', value)}
          placeholder="Select Status"
          required
          error={errors.maritalStatus}
          options={[
            { value: 'Single', label: 'Single' },
            { value: 'Married', label: 'Married' },
            { value: 'Divorced', label: 'Divorced' },
            { value: 'Widowed', label: 'Widowed' }
          ]}
        />
      </div>


    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4">
          <MapPin size={14} />
          <span className="text-sm font-medium">Step 2</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Location & Economic Details</h2>
        <p className="text-gray-600">This helps us find location-specific schemes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={profileData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.state ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your state"
          />
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={profileData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.district ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your district"
          />
          {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={profileData.occupation}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.occupation ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your occupation"
          />
          {errors.occupation && <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Income (₹)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            value={profileData.annualIncome}
            onChange={(e) => handleInputChange('annualIncome', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.annualIncome ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter annual income"
          />
          {errors.annualIncome && <p className="mt-1 text-sm text-red-600">{errors.annualIncome}</p>}
        </div>

        <CustomDropdown
          label="Education Level"
          value={profileData.educationLevel}
          onChange={(value) => handleInputChange('educationLevel', value)}
          placeholder="Select Education"
          required
          error={errors.educationLevel}
          options={[
            { value: 'Illiterate', label: 'Illiterate' },
            { value: 'Primary', label: 'Primary' },
            { value: 'Secondary', label: 'Secondary' },
            { value: 'Higher Secondary', label: 'Higher Secondary' },
            { value: 'Graduate', label: 'Graduate' },
            { value: 'Post Graduate', label: 'Post Graduate' }
          ]}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Family Size
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            value={profileData.familySize}
            onChange={(e) => handleInputChange('familySize', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.familySize ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Number of family members"
          />
          {errors.familySize && <p className="mt-1 text-sm text-red-600">{errors.familySize}</p>}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Document Availability</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'hasAadhaar', label: 'Aadhaar Card', icon: CreditCard, description: 'Government ID proof', docType: 'aadhaar' },
            { key: 'hasPAN', label: 'PAN Card', icon: CreditCard, description: 'Tax identification', docType: 'pan' },
            { key: 'hasVoterID', label: 'Voter ID', icon: Vote, description: 'Election identity card', docType: 'voterId' },
            { key: 'landOwnership', label: 'Land Ownership', icon: HomeIcon, description: 'Property documents', docType: 'land' }
          ].map(({ key, label, icon: Icon, description, docType }) => (
            <div key={key}>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => e.target.files[0] && handleDocumentUpload(e.target.files[0], docType)}
                className="hidden"
                id={`${docType}-upload`}
              />
              <label
                htmlFor={`${docType}-upload`}
                className="block bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={profileData[key]}
                      onChange={(e) => handleInputChange(key, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 pointer-events-none"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">{label}</span>
                      {profileData[`${docType}Document`] ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Upload className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{description}</p>
                    
                    {profileData[`${docType}Document`] ? (
                      <div className="flex items-center space-x-1 text-xs text-green-600">
                        <Check className="w-3 h-3" />
                        <span>Uploaded: {profileData[`${docType}Document`].name}</span>
                      </div>
                    ) : (
                      <div className="text-xs text-blue-600">
                        Click to upload document
                      </div>
                    )}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>


      </div>
    </div>
  );

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-xl">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">


      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-8 border border-gray-200"
          >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Step {step} of 2</span>
              <span className="text-sm font-medium text-gray-600">{step === 1 ? '50%' : '100%'} Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${step * 50}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          {step === 1 ? renderStep1() : renderStep2()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {step === 1 ? 'Skip for Now' : 'Previous'}
            </button>

            <button
              onClick={() => {
                if (step === 1) {
                  if (validateStep1()) {
                    setStep(2);
                  }
                } else {
                  if (validateStep2()) {
                    handleSaveProfile();
                  }
                }
              }}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {step === 1 ? 'Next' : 'Complete Profile'}
                  {step === 2 && <Save size={16} />}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default ProfileSetupPage;