import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../auth';
import { useProfile } from '../contexts/ProfileContext';
import { DataService } from '../services/dataService';

const UserProfile = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { profile, updateProfile, loading } = useProfile();
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (profile) {
      setEditData(profile);
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      const success = await updateProfile(editData);
      if (success) {
        setEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
            </div>
            <div className="flex items-center space-x-2">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit size={20} />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="p-2 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setEditData(profile || {});
                    }}
                    className="p-2 text-gray-600 hover:text-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {editing ? (
                      <input
                        type="text"
                        value={editData.fullName || ''}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile?.fullName || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {editing ? (
                      <input
                        type="tel"
                        value={editData.phoneNumber || ''}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile?.phoneNumber || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    {editing ? (
                      <input
                        type="date"
                        value={editData.dateOfBirth || ''}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile?.dateOfBirth || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    {editing ? (
                      <input
                        type="text"
                        value={editData.state || ''}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile?.state || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    {editing ? (
                      <input
                        type="text"
                        value={editData.district || ''}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile?.district || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Economic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Economic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    {editing ? (
                      <input
                        type="text"
                        value={editData.occupation || ''}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profile?.occupation || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
                    {editing ? (
                      <input
                        type="number"
                        value={editData.annualIncome || ''}
                        onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {profile?.annualIncome ? `₹${profile.annualIncome}` : 'Not provided'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Completion Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    profile?.isComplete 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {profile?.isComplete ? 'Complete' : 'Incomplete'}
                  </span>
                </div>
                {!profile?.isComplete && (
                  <p className="text-sm text-gray-600 mt-2">
                    Complete your profile to get better scheme recommendations
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;