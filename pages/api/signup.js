import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const auth = getAuth();
  const { email, password } = req.body;

  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    res.status(201).json({ user: userCredential.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
