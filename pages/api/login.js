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
    return res
      .status(200)
      .json({ user, message: "login success", ok: 200 });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error.message });
  }
}
