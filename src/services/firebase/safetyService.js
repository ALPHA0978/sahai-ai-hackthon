import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export class SafetyService {
  static async submitSafetyReport(safetyData, userProfile) {
    try {
      const report = {
        location: safetyData.location,
        environment: safetyData.environment,
        concerns: safetyData.concerns,
        userProfile: {
          gender: userProfile.gender,
          age: userProfile.age,
          occupation: userProfile.occupation
        },
        timestamp: serverTimestamp(),
        status: 'pending',
        reportId: `SAFETY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      const docRef = await addDoc(collection(db, 'safety_reports'), report);
      
      return {
        success: true,
        reportId: report.reportId,
        message: 'Safety report submitted successfully',
        firestoreId: docRef.id
      };
    } catch (error) {
      console.error('Error submitting safety report:', error);
      throw new Error('Failed to submit safety report. Please try again.');
    }
  }
}