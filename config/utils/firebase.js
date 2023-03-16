import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
    apiKey: "AIzaSyAw5FnKeRghx_EMK9pAwULN8rXkMIITM6U",
    authDomain: "finanzas-8fc31.firebaseapp.com",
    projectId: "finanzas-8fc31",
    storageBucket: "finanzas-8fc31.appspot.com",
    messagingSenderId: "844955091602",
    appId: "1:844955091602:web:ab82dffe77737073fb5c4b"
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})