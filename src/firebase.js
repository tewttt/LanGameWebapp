// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB5jrLASKEY0LyQ1HyyHY6rxfwTm1wkqqs",
  authDomain: "race-d2c0d.firebaseapp.com",
  databaseURL: "https://race-d2c0d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "race-d2c0d",
  storageBucket: "race-d2c0d.appspot.com",
  messagingSenderId: "1037169996615",
  appId: "1:1037169996615:web:04cf924c4c85e0c6a21262",
  measurementId: "G-TZBKFBYBBF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app)