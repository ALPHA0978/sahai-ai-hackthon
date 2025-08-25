import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export class ReportService {
  static async submitAnonymousReport(reportData) {
    try {
      const report = {
        type: reportData.type,
        urgency: reportData.urgency,
        description: reportData.description,
        location: reportData.location || 'Not specified',
        timestamp: serverTimestamp(),
        status: 'pending',
        reportId: `RPT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      const docRef = await addDoc(collection(db, 'anonymous_reports'), report);
      
      return {
        success: true,
        reportId: report.reportId,
        message: 'Report submitted successfully. Your report ID is: ' + report.reportId,
        firestoreId: docRef.id
      };
    } catch (error) {
      console.error('Error submitting report:', error);
      throw new Error('Failed to submit report. Please try again.');
    }
  }

  static async submitPayEquityReport(payData) {
    try {
      const report = {
        gender: payData.gender,
        salary: payData.salary,
        jobTitle: payData.jobTitle,
        experience: payData.experience,
        company: payData.company || 'Anonymous',
        timestamp: serverTimestamp(),
        type: 'pay_equity',
        reportId: `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      const docRef = await addDoc(collection(db, 'pay_equity_reports'), report);
      
      return {
        success: true,
        reportId: report.reportId,
        message: 'Pay equity data submitted for analysis',
        firestoreId: docRef.id
      };
    } catch (error) {
      console.error('Error submitting pay equity report:', error);
      throw new Error('Failed to submit pay equity data. Please try again.');
    }
  }
}