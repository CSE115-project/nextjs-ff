// import { db } from "../../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const {email, password} = req.body;

  console.log(req.body);

  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // console.log("UC:", userCredential);
    console.log("user:", user);

    // // Create a session cookie with the user's authentication information
    // const idToken = await user.getIdToken();
    // const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    // const sessionCookie = await createSessionCookie(idToken, { expiresIn });

    // // Set the session cookie in the user's browser
    // document.cookie = `session=${sessionCookie}; path=/; secure`;

    // const usersRef = doc(db, "users", userCredential.user.uid);
    // const docSnap = await getDoc(usersRef);
    // const userData = docSnap.data();


    // this is where we set our current user
    return res
      .status(200)
      .json({ user, message: "login success", ok: 200 });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error.message });
  }
}
