// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCnuDPQpn0qrBaPJTE05co633S2SVB8jCA",
  authDomain: "funfun-43ac6.firebaseapp.com",
  projectId: "funfun-43ac6",
  storageBucket: "funfun-43ac6.appspot.com",
  messagingSenderId: "643672554761",
  appId: "1:643672554761:web:43755fc92692f4e74927d8",
  measurementId: "G-RRW2Y9VG2Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app)