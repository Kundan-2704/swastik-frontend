import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

/* 🔥 Firebase config from env */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/* 🔥 Init app */
const app = initializeApp(firebaseConfig);

/* 🔥 Auth + Google provider */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
