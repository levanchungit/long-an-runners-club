import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Thay thế các giá trị này bằng thông tin lấy từ bảng điều khiển Firebase của bạn
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const hasFirebaseConfig = !!firebaseConfig.apiKey;

let app = null;
let firestoreDb = null;

if (hasFirebaseConfig) {
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);
  } catch (error) {
    console.warn("Failed to initialize Firebase:", error);
  }
} else {
  console.warn("Firebase config is missing. App is running in Mock Mode.");
}

export const db = firestoreDb;
