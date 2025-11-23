import { useProfile } from '../contexts/ProfileContext';
import { useAuth } from '../auth';

/**
 * Custom hook that provides easy access to user profile data and utilities
 * @returns {Object} Profile data and utility functions
 */
export const useUserProfile = () => {
  const { user } = useAuth();
  const { 
    profile, 
    loading, 
    error, 
    updateProfile, 
    updateProfileField, 
    isProfileComplete, 
    profileCompletionPercentage 
  } = useProfile();

  // Helper function to get a specific profile field
  const getProfileField = (field, defaultValue = null) => {
    return profile?.[field] ?? defaultValue;
  };

  // Helper function to check if user has specific documents
  const hasDocument = (documentType) => {
    switch (documentType.toLowerCase()) {
      case 'aadhaar':
        return profile?.hasAadhaar || false;
      case 'pan':
        return profile?.hasPAN || false;
      case 'voter':
      case 'voterid':
        return profile?.hasVoterID || false;
      case 'land':
        return profile?.landOwnership || false;
      case 'bank':
        return profile?.bankAccount || false;
      default:
        return false;
    }
  };

  // Helper function to get user's location info
  const getLocationInfo = () => {
    return {
      state: profile?.state || null,
      district: profile?.district || null,
      city: profile?.city || null,
      pincode: profile?.pincode || null,
      address: profile?.address || null
    };
  };

  // Helper function to get user's economic info
  const getEconomicInfo = () => {
    return {
      occupation: profile?.occupation || null,
      annualIncome: profile?.annualIncome || null,
      employmentStatus: profile?.employmentStatus || null,
      category: profile?.category || null
    };
  };

  return {
    // Core profile data
    profile,
    loading,
    error,
    user,
    
    // Profile status
    isProfileComplete,
    profileCompletionPercentage,
    
    // Update functions
    updateProfile,
    updateProfileField,
    
    // Helper functions
    getProfileField,
    hasDocument,
    getLocationInfo,
    getEconomicInfo,
    
    // Computed properties
    isLoggedIn: !!user,
    hasProfile: !!profile,
    needsProfileSetup: !!user && !isProfileComplete
  };
};

export default useUserProfile;