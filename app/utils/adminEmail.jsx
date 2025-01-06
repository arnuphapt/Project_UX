import { db } from '../Shared/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const getAdminEmails = async () => {
  try {
    const adminEmailsRef = collection(db, 'adminEmails');
    const snapshot = await getDocs(adminEmailsRef);
    return snapshot.docs.map(doc => doc.data().email);
  } catch (error) {
    console.error('Error fetching admin emails:', error);
    return [];
  }
};