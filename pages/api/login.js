import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const auth = getAuth();
  const { email, password } = req.body;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    return res.status(200).json({ message: "Successful Authentication" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
}
