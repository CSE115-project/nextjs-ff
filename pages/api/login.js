import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const auth = getAuth();
  const { email, password } = req.body;

  try {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({ email: user.email, uid: user.uid, message: "Successful Authentication", ok: 200});
  } catch (error) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
}
