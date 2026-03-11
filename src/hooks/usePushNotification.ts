// import { getToken } from "firebase/messaging";
// import { getFirebaseMessaging } from "../Config/firebaseMessaging";

// const VAPID_KEY = "BOSgWnCirgzIQztv-zgP3mz-sQJcIQeY5yZmHfhC41t8Ufkdik3fIHcAXFj3jxQyu-x9jd7VApyS8fn-I3BjXTA";

// export const requestNotificationPermission = async (): Promise<string | null> => {
//   try {
//     const permission = await Notification.requestPermission();

//     if (permission !== "granted") {
//       console.warn("Notification permission denied.");
//       return null;
//     }

//     const messaging = await getFirebaseMessaging();

//     if (!messaging) {
//       console.warn("Firebase Messaging not supported in this browser.");
//       return null;
//     }

//     const token = await getToken(messaging, { vapidKey: VAPID_KEY });

//     if (!token) {
//       console.warn("No FCM token received. Check VAPID key or service worker.");
//       return null;
//     }

//     console.log("FCM TOKEN:", token);
//     return token;

//   } catch (error) {
//     console.error("Error requesting notification permission:", error);
//     return null;
//   }
// };


import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "../Config/firebaseMessaging";
import axios from "axios";

const VAPID_KEY = "BOSgWnCirgzIQztv-zgP3mz-sQJcIQeY5yZmHfhC41t8Ufkdik3fIHcAXFj3jxQyu-x9jd7VApyS8fn-I3BjXTA";

export const requestNotificationPermission = async (
  role: "user" | "seller" = "user"  // ✅ role pass karo
): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied.");
      return null;
    }

    const messaging = await getFirebaseMessaging();
    if (!messaging) return null;

    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (!token) return null;

    console.log("FCM TOKEN:", token);

    // ✅ Role ke hisaab se sahi key aur URL use karo
    const authToken = role === "seller"
      ? localStorage.getItem("seller_jwt")
      : localStorage.getItem("jwt");

    const url = role === "seller"
      ? `${import.meta.env.VITE_API_BASE_URL}/sellers/fcm-token`
      : `${import.meta.env.VITE_API_BASE_URL}/api/users/fcm-token`;

    if (authToken) {
      await axios.post(
        url,
        { fcmToken: token },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log(`FCM Token saved for ${role} ✅`);
    } else {
      console.warn("Auth token nahi mila");
    }

    return token;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};