import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, GraduationCap, Upload, Save } from 'lucide-react';
import { useAuth } from '../auth';
import { DataService } from '../services/dataService';
import { CloudinaryService } from '../services/cloudinaryService';

const ProfileSetupPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
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
    documents: []
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

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await DataService.saveUserProfile(user.uid, {
        ...profileData,
        completedAt: new Date().toISOString(),
        isComplete: true
      });
      
      await DataService.logUserAction(user.uid, 'profile_completed', { profileData });
      navigate('/');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600">Help us understand your profile better</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={profileData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={profileData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={profileData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={profileData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
            <option value="EWS">EWS</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
          <select
            value={profileData.maritalStatus}
            onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
        <div className="flex items-center space-x-4">
          {profileData.profilePhoto && (
            <img src={profileData.profilePhoto} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'profile')}
            className="hidden"
            id="profile-upload"
          />
          <label
            htmlFor="profile-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Location & Economic Details</h2>
        <p className="text-gray-600">This helps us find location-specific schemes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <input
            type="text"
            value={profileData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your state"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
          <input
            type="text"
            value={profileData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your district"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
          <input
            type="text"
            value={profileData.occupation}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your occupation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹)</label>
          <input
            type="number"
            value={profileData.annualIncome}
            onChange={(e) => handleInputChange('annualIncome', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter annual income"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
          <select
            value={profileData.educationLevel}
            onChange={(e) => handleInputChange('educationLevel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Education</option>
            <option value="Illiterate">Illiterate</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Higher Secondary">Higher Secondary</option>
            <option value="Graduate">Graduate</option>
            <option value="Post Graduate">Post Graduate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Family Size</label>
          <input
            type="number"
            value={profileData.familySize}
            onChange={(e) => handleInputChange('familySize', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Number of family members"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Document Availability</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: 'hasAadhaar', label: 'Aadhaar Card' },
            { key: 'hasPAN', label: 'PAN Card' },
            { key: 'hasVoterID', label: 'Voter ID' },
            { key: 'landOwnership', label: 'Land Ownership' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData[key]}
                onChange={(e) => handleInputChange(key, e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
        <input
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={(e) => Array.from(e.target.files).forEach(file => handleFileUpload(file))}
          className="hidden"
          id="document-upload"
        />
        <label
          htmlFor="document-upload"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer flex items-center space-x-2 w-fit"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Documents</span>
        </label>
        {profileData.documents.length > 0 && (
          <div className="mt-2 space-y-1">
            {profileData.documents.map((doc, index) => (
              <div key={index} className="text-sm text-gray-600">{doc.name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
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
              onClick={() => step === 1 ? setStep(2) : handleSaveProfile()}
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
  );
};

export default ProfileSetupPage;