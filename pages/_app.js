// import '@/styles/globals.css'
import firebase from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebase);
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      if (!user) {
        router.push("/login"); // Redirect to login if user is not authenticated
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth, router]);

  return <Component {...pageProps} user={user} />;
}
