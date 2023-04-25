import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDfJowBQSMx16JMwZWKgNBd5IgxFnkKcdM",
  authDomain: "nextjs-ff.firebaseapp.com",
  projectId: "nextjs-ff",
  storageBucket: "nextjs-ff.appspot.com",
  messagingSenderId: "239096580979",
  appId: "1:239096580979:web:ea4db5ea4c06e3f8635306",
};

// Initialize Firebase
export const App = initializeApp(firebaseConfig);
