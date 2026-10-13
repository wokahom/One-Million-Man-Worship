import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKgrFYnCPnYUeNuEV1Aj9IgMvVVaMWhzc",
  authDomain: "one-million-man-worship-avatar.firebaseapp.com",
  projectId: "one-million-man-worship-avatar",
  storageBucket: "one-million-man-worship-avatar.firebasestorage.app",
  messagingSenderId: "860229940198",
  appId: "1:860229940198:web:a7f628f4475f84e08cdc27"
};

let app: FirebaseApp;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  storage = getStorage(app);
  
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics not supported in this environment
  });
}

export { app, db, storage, analytics, firebaseConfig };
