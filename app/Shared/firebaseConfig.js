// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGBVaehBevYP6c7mDDg1VldVxJjcXa7HY",
  authDomain: "rmproj-90b7b.firebaseapp.com",
  projectId: "rmproj-90b7b",
  storageBucket: "rmproj-90b7b.appspot.com",
  messagingSenderId: "787807916344",
  appId: "1:787807916344:web:16d718dddb81208c8af1cd",
  measurementId: "G-YLZP2H3MLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;