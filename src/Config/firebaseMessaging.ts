// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getMessaging, isSupported, type Messaging } from "firebase/messaging";

// const FIREBASE_APP_NAME = "messaging-app";

// const firebaseConfig = {
//   apiKey: "AIzaSyA3n5v9QaIOPqyxGhM23y98yA3gIVP1vRA",
//   authDomain: "swastik-6a89d.firebaseapp.com",
//   projectId: "swastik-6a89d",
//   storageBucket: "swastik-6a89d.appspot.com",
//   messagingSenderId: "955629067009",
//   appId: "1:955629067009:web:2d540e6c33f3a427009900",
//   measurementId: "G-B2GQ003M4L"
// };

// // Use a named app to avoid picking up an incomplete default app
// const app = getApps().find(a => a.name === FIREBASE_APP_NAME)
//   ? getApp(FIREBASE_APP_NAME)
//   : initializeApp(firebaseConfig, FIREBASE_APP_NAME);

// export const getFirebaseMessaging = async (): Promise<Messaging | null> => {
//   try {
//     const supported = await isSupported();

//     if (!supported) {
//       console.warn("Firebase Messaging is not supported in this browser.");
//       return null;
//     }

//     return getMessaging(app);
//   } catch (error) {
//     console.error("Failed to initialize Firebase Messaging:", error);
//     return null;
//   }
// };




// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getMessaging, isSupported, type Messaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyA3n5v9QaIOPqyxGhM23y98yA3gIVP1vRA",
//   authDomain: "swastik-6a89d.firebaseapp.com",
//   projectId: "swastik-6a89d",
//   storageBucket: "swastik-6a89d.appspot.com",
//   messagingSenderId: "955629067009",   // ← yahi missing tha
//   appId: "1:955629067009:web:2d540e6c33f3a427009900",
//   measurementId: "G-B2GQ003M4L"
// };

// const MESSAGING_APP_NAME = "fcm-app";

// // ✅ Apni alag named app banao — doosri app se conflict nahi hoga
// const app =
//   getApps().find((a) => a.name === MESSAGING_APP_NAME)
//     ? getApp(MESSAGING_APP_NAME)
//     : initializeApp(firebaseConfig, MESSAGING_APP_NAME);

// export const getFirebaseMessaging = async (): Promise<Messaging | null> => {
//   try {
//     const supported = await isSupported();

//     if (!supported) {
//       console.warn("Firebase Messaging is not supported in this browser.");
//       return null;
//     }

//     return getMessaging(app);
//   } catch (error) {
//     console.error("Failed to initialize Firebase Messaging:", error);
//     return null;
//   }
// };



import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, isSupported, type Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA3n5v9QaIOPqyxGhM23y98yA3gIVP1vRA",
  authDomain: "swastik-6a89d.firebaseapp.com",
  projectId: "swastik-6a89d",
  storageBucket: "swastik-6a89d.appspot.com",
  messagingSenderId: "955629067009",
  appId: "1:955629067009:web:2d540e6c33f3a427009900",
  measurementId: "G-B2GQ003M4L"
};

// ✅ Default app use karo — SW ke saath match karega
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const getFirebaseMessaging = async (): Promise<Messaging | null> => {
  try {
    const supported = await isSupported();
    if (!supported) return null;
    return getMessaging(app);
  } catch (error) {
    console.error("Failed to initialize Firebase Messaging:", error);
    return null;
  }
};