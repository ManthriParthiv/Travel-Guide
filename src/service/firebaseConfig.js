// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBAe9e43FvJIJ_CoghgIE9u77IY5ro8TLk",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "travelplanner-f8643.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "travelplanner-f8643",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "travelplanner-f8643.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "886853548217",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:886853548217:web:90cca4ee7765716c930368",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-P5S80M12Q9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);