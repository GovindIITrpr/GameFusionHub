// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYR5lkpHpmIALRIDI1XNUKF7y457Qi8HM",
  authDomain: "gamefusionhub.firebaseapp.com",
  projectId: "gamefusionhub",
  storageBucket: "gamefusionhub.appspot.com",
  messagingSenderId: "28184744376",
  appId: "1:28184744376:web:bef294d8297b4a8c3f3f4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app

export const database = getFirestore(app);