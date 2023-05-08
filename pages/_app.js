// import '@/styles/globals.css'
import firebase from "../firebase";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebase);

  console.log("AUTH:", auth);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  console.log("USER:", user);

  return <Component {...pageProps} />;
}
