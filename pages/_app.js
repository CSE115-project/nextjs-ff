// import '@/styles/globals.css'
import firebase from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebase);
  let center = {lat: 37.7749, lng: -122.4194};
  let zoom = 11;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  return <Component {...pageProps} user={user} center={center} zoom={zoom} />;

}
