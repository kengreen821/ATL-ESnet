// firebase-config.js
// Firebase configuration and initialization

// ⚠️ REPLACE THIS WITH YOUR ACTUAL FIREBASE CONFIG
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlJnQfAMp7Wxp9Vg91lVx9HLO-AePLGZk",
  authDomain: "atl-esnet-auth.firebaseapp.com",
  projectId: "atl-esnet-auth",
  storageBucket: "atl-esnet-auth.firebasestorage.app",
  messagingSenderId: "362855474989",
  appId: "1:362855474989:web:c02c9400a02c935366d5a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);