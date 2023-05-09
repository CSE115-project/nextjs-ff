import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const auth = getAuth();

  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const usersRef = doc(db, "users", userCredential.user.uid);
    const docSnap = await getDoc(usersRef);
    const userData = docSnap.data();

    console.log("userData:", userData);

    // this is where we set our current user
    return res
      .status(200)
      .json({ user: userData, message: "login success", ok: 200 });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}
