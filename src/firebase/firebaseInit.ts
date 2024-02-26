// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz4OPmzlIjxk_SGPWJxyp7iIduuUVSUGQ",
  authDomain: "bookshelf-fb-de298.firebaseapp.com",
  projectId: "bookshelf-fb-de298",
  storageBucket: "bookshelf-fb-de298.appspot.com",
  messagingSenderId: "291872952229",
  appId: "1:291872952229:web:cb754781e1f9064272e24c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
