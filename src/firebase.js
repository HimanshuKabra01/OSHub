import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXCCZ1bVCX6KQq-bOfFTT7o5c47dI9oIY",
  authDomain: "oshub-de760.firebaseapp.com",
  projectId: "oshub-de760",
  storageBucket: "oshub-de760.firebasestorage.app",
  messagingSenderId: "23604384593",
  appId: "1:23604384593:web:e0a5c0f8f246a25abbf970",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
