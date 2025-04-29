// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU8bXFgLPjLVJ_okieNtlPqz25KQcfUDw",
  authDomain: "hydroponics-25f35.firebaseapp.com",
  projectId: "hydroponics-25f35",
  storageBucket: "hydroponics-25f35.firebasestorage.app",
  messagingSenderId: "978532061204",
  appId: "1:978532061204:web:d59cdfdf4867283792d701",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
