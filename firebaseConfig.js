// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB08LPbv4zINtbJz51UGyMQFJ-aZv1bBM",
  authDomain: "transcript-ff300.firebaseapp.com",
  projectId: "transcript-ff300",
  storageBucket: "transcript-ff300.appspot.com",
  messagingSenderId: "746713952348",
  appId: "1:746713952348:web:d4d48ef45647e7dcfbf699",
  measurementId: "G-L77ZT3M4KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);