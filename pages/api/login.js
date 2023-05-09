import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  // const auth = getAuth();

  try {
    const { email, password } = req.body;
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    
      const user = await firebase
      .firestore()
      .collection("users")
      .doc(userCredential.user.uid)
      .get();

    // this is where we set our current user
    return res
      .status(200)
      .json({ user: user.data(), message: "login success", ok: 200 });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
}
