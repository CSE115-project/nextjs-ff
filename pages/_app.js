import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const auth = getAuth(firebase);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        router.push("/");
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    console.log("AuthStateChanged");

    return unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return <Component {...pageProps} router={router} user={user}/>;
}
