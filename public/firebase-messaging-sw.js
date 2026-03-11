// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyA3n5v9QaIOPqyxGhM23y98yA3gIVP1vRA",
//   authDomain: "swastik-6a89d.firebaseapp.com",
//   projectId: "swastik-6a89d",
//   storageBucket: "swastik-6a89d.appspot.com", // FIXED
//   messagingSenderId: "955629067009",
//   appId: "1:955629067009:web:2d540e6c33f3a427009900",
//   measurementId: "G-B2GQ003M4L"
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body
//   });
// });



importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA3n5v9QaIOPqyxGhM23y98yA3gIVP1vRA",
  authDomain: "swastik-6a89d.firebaseapp.com",
  projectId: "swastik-6a89d",
  storageBucket: "swastik-6a89d.appspot.com",
  messagingSenderId: "955629067009",
  appId: "1:955629067009:web:2d540e6c33f3a427009900",
  measurementId: "G-B2GQ003M4L"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  const { title = "New Notification", body = "" } = payload.notification ?? {};

  self.registration.showNotification(title, {
    body,
    icon: "/logo192.png" // optional: replace with your app icon path
  });
});