import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase.js"
import { setDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const auth = getAuth();
  const { email, password } = req.body;

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // Add the user's email and UID to a new document in the "users" collection
    const usersRef = doc(db, "users", user.uid);
    const userData = { 
      name: null, // user's name
      pictureLink: null, // user's picture link
      bio: null, // user's bio
      email: user.email, // user's email
      favoritePlaces : [] // list of favorite places (can be links to the place?)
    };
    await setDoc(usersRef, userData);

    return res.status(200).json({ message: "Successfully Created", ok: 200 });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
}