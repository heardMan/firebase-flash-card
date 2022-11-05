// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEehWvcYN4et2zyth7hSQQDopsJjHJQbg",
  authDomain: "flashcard-app-dc7a3.firebaseapp.com",
  databaseURL: "https://flashcard-app-dc7a3-default-rtdb.firebaseio.com",
  projectId: "flashcard-app-dc7a3",
  storageBucket: "flashcard-app-dc7a3.appspot.com",
  messagingSenderId: "201209242073",
  appId: "1:201209242073:web:0ea023374c8d63ac9939c8",
  measurementId: "G-YQQLJP2VM3"
};

// Initialize Firebase
const APP = initializeApp(firebaseConfig);
//const analytics = getAnalytics(APP);
export const AUTH = getAuth(APP);
export const DB = getDatabase(APP);
export default APP;