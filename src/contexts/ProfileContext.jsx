import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { DataService } from '../services/dataService';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load profile when user changes
  useEffect(() => {
    if (user?.uid) {
      loadProfile();
    } else {
      setProfile(null);
      setError(null);
    }
  }, [user?.uid]);

  const loadProfile = async () => {
    if (!user?.uid) return;
    
    setLoading(true);
    setError(null);
    try {
      const profileData = await DataService.getUserProfile(user.uid);
      setProfile(profileData);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    if (!user?.uid) return;
    
    setLoading(true);
    setError(null);
    try {
      await DataService.saveUserProfile(user.uid, updates);
      setProfile(prev => ({ ...prev, ...updates }));
      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfileField = async (field, value) => {
    if (!user?.uid) return;
    
    try {
      await DataService.updateProfileField(user.uid, field, value);
      setProfile(prev => ({ ...prev, [field]: value }));
      return true;
    } catch (err) {
      console.error('Error updating profile field:', err);
      setError(err.message);
      return false;
    }
  };

  const isProfileComplete = () => {
    if (!profile) return false;
    
    const requiredFields = [
      'fullName', 'dateOfBirth', 'gender', 'phoneNumber',
      'state', 'district', 'occupation', 'annualIncome',
      'category', 'maritalStatus', 'educationLevel', 'familySize'
    ];
    
    return requiredFields.every(field => profile[field]);
  };

  const getProfileCompletionPercentage = () => {
    if (!profile) return 0;
    
    const allFields = [
      'fullName', 'dateOfBirth', 'gender', 'phoneNumber',
      'state', 'district', 'city', 'pincode', 'address',
      'category', 'religion', 'maritalStatus', 'occupation',
      'annualIncome', 'employmentStatus', 'educationLevel',
      'familySize', 'dependents'
    ];
    
    const completedFields = allFields.filter(field => profile[field]);
    return Math.round((completedFields.length / allFields.length) * 100);
  };

  const value = {
    profile,
    loading,
    error,
    loadProfile,
    updateProfile,
    updateProfileField,
    isProfileComplete: isProfileComplete(),
    profileCompletionPercentage: getProfileCompletionPercentage()
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};