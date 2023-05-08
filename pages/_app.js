// import '@/styles/globals.css'
import firebase from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";


export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebase);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);
  console.log("user", user);

  return <Component {...pageProps} user={user} />;
}
