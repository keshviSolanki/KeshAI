// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "keshai-1dd3f.firebaseapp.com",
  projectId: "keshai-1dd3f",
  storageBucket: "keshai-1dd3f.firebasestorage.app",
  messagingSenderId: "557843692178",
  appId: "1:557843692178:web:a3b439a1fbe5366c57c44b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const githubProvider = new GithubAuthProvider();
