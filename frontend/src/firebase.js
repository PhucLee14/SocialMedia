import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBaIeCjc-lOPXd5JOT8dkMWVOYmPA_L7_g",
    authDomain: "social-media-ad298.firebaseapp.com",
    projectId: "social-media-ad298",
    storageBucket: "social-media-ad298.firebasestorage.app",
    messagingSenderId: "124360470887",
    appId: "1:124360470887:web:b57db48dd13c15ae58bfc2",
    measurementId: "G-Y2T25F4RH8",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default storage;
