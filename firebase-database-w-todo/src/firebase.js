// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6_7jQbcFmkJLF9CP9FP8IH4Gs60ZmiK0",
  authDomain: "fir-w-auth.firebaseapp.com",
  projectId: "fir-w-auth",
  storageBucket: "fir-w-auth.firebasestorage.app",
  messagingSenderId: "1017998294933",
  appId: "1:1017998294933:web:efa71311c41e3c0a2f409c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export { db };
