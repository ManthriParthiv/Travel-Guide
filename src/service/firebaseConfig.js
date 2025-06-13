// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAe9e43FvJIJ_CoghgIE9u77IY5ro8TLk",
  authDomain: "travelplanner-f8643.firebaseapp.com",
  projectId: "travelplanner-f8643",
  storageBucket: "travelplanner-f8643.firebasestorage.app",
  messagingSenderId: "886853548217",
  appId: "1:886853548217:web:90cca4ee7765716c930368",
  measurementId: "G-P5S80M12Q9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)