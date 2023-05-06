import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "nookies";

export default async function handler(req, res) {
  const auth = getAuth();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    const token = await userCred.user.getIdToken();

    setCookie({ res }, 'token', token, {
		httpOnly: true,
		path: '/',
		maxAge: 30 * 24 * 60 * 60,
	});

	return res.status(200).json({message: "Successful Authentication"});
} catch (error) {
	return res.status(401).json({message: "Invalid Email or Password"});
}
}
