import Head from "next/head";
import { Roboto } from "next/font/google";

import "@fontsource/public-sans";
import Login from "./Login";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDfJowBQSMx16JMwZWKgNBd5IgxFnkKcdM",
  authDomain: "nextjs-ff.firebaseapp.com",
  projectId: "nextjs-ff",
  storageBucket: "nextjs-ff.appspot.com",
  messagingSenderId: "239096580979",
  appId: "1:239096580979:web:ea4db5ea4c06e3f8635306",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// detect auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in");
  } else {
    console.log("No User");
  }
});

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>FridayFinder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Login></Login>
      </main>
    </>
  );
}
