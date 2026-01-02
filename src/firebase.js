// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCit3cDB__wJRQI00XRQjnT-F7JSMCGYNI",
  authDomain: "temu-app-875a3.firebaseapp.com",
  projectId: "temu-app-875a3",
  storageBucket: "temu-app-875a3.firebasestorage.app",
  messagingSenderId: "1005674795156",
  appId: "1:1005674795156:web:bce445b939a160cfa42481",
  measurementId: "G-1X97Y7V6K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)