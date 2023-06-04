import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chat-react-f5b0a.firebaseapp.com",
  projectId: "chat-react-f5b0a",
  storageBucket: "chat-react-f5b0a.appspot.com",
  messagingSenderId: "1084023346982",
  appId: "1:1084023346982:web:8c6799161e80759eb613e7",
  measurementId: "G-NVGGGL3B1S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
