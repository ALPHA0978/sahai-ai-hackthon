import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { auth, googleProvider } from '../../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorTimeout, setErrorTimeout] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      setError('');
      if (errorTimeout) clearTimeout(errorTimeout);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      let errorMessage = 'Login failed';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Try again later';
      }
      setError(errorMessage);
      const timeout = setTimeout(() => setError(''), 3000);
      setErrorTimeout(timeout);
      throw new Error(errorMessage);
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      setError('');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      return result.user;
    } catch (error) {
      let errorMessage = 'Signup failed';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already registered. Please sign in instead';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      let errorMessage = 'Google login failed';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login cancelled';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked. Please allow popups and try again';
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      setError('');
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    login,
    signup,
    loginWithGoogle,
    logout,
    loading,
    error,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};