import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

export class DataService {
  // User Profile Management
  static async saveUserProfile(userId, profile) {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        ...profile,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      }, { merge: true });
      
      return true;
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  }

  static async getUserProfile(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Scheme Management
  static async cacheSchemes(userId, schemes) {
    try {
      const cacheRef = doc(db, 'schemeCache', userId);
      await setDoc(cacheRef, {
        schemes,
        cachedAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      });
    } catch (error) {
      console.error('Error caching schemes:', error);
    }
  }

  static async getCachedSchemes(userId) {
    try {
      const cacheRef = doc(db, 'schemeCache', userId);
      const cacheSnap = await getDoc(cacheRef);
      
      if (cacheSnap.exists()) {
        const data = cacheSnap.data();
        const now = new Date();
        const expiresAt = data.expiresAt?.toDate();
        
        if (expiresAt && now < expiresAt) {
          return data.schemes;
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting cached schemes:', error);
      return null;
    }
  }

  // Document Upload
  static async uploadDocument(userId, file) {
    try {
      const timestamp = Date.now();
      const fileName = `${userId}/${timestamp}_${file.name}`;
      const storageRef = ref(storage, `documents/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Save document metadata
      const docRef = doc(db, 'documents', `${userId}_${timestamp}`);
      await setDoc(docRef, {
        userId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        downloadURL,
        uploadedAt: serverTimestamp()
      });
      
      return { downloadURL, docId: `${userId}_${timestamp}` };
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  // Analytics
  static async logUserAction(userId, action, metadata = {}) {
    try {
      const analyticsRef = collection(db, 'analytics');
      await setDoc(doc(analyticsRef), {
        userId,
        action,
        metadata,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error logging user action:', error);
    }
  }

  // Popular Schemes
  static async getPopularSchemes(limit = 10) {
    try {
      const schemesRef = collection(db, 'popularSchemes');
      const q = query(schemesRef, orderBy('popularity', 'desc'), limit(limit));
      const querySnapshot = await getDocs(q);
      
      const schemes = [];
      querySnapshot.forEach((doc) => {
        schemes.push({ id: doc.id, ...doc.data() });
      });
      
      return schemes;
    } catch (error) {
      console.error('Error getting popular schemes:', error);
      return [];
    }
  }

  // Offline Support
  static saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(`sahai_${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getFromLocalStorage(key, maxAge = 24 * 60 * 60 * 1000) {
    try {
      const stored = localStorage.getItem(`sahai_${key}`);
      if (!stored) return null;
      
      const { data, timestamp } = JSON.parse(stored);
      const now = Date.now();
      
      if (now - timestamp < maxAge) {
        return data;
      }
      
      // Remove expired data
      localStorage.removeItem(`sahai_${key}`);
      return null;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  }
}