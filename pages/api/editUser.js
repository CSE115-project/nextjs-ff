import { db } from "../../firebase.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default async function handler(req, res) {
    // uid is user's id, field is the field to update, content is the updated contents
    const { uid, field, content } = req.body
    const cleanedUID = uid.replace(/"/g, '');
    console.log("uid", cleanedUID)
    console.log("field", field)
    console.log("content", content)

    const usersRef = doc(db, "users", cleanedUID);

    try {
        
        if (field == "favoritePlaces") {
            await updateDoc(usersRef, {
                [field] : arrayUnion(content)
            })
        }
        else if (field == "wantToGo") {
            await updateDoc(usersRef, {
                [field] : arrayUnion(content)
            })
        }
        else if (field == "friendsRecc") {
            await updateDoc(usersRef, {
                [field] : arrayUnion(content)
            })
        }
        else {
            await updateDoc(usersRef, {
                [field] : content
            })
        }

      return res.status(200).json({message: "Data updated. SUCCEEDED", ok: 200});
    } catch(error) {
      return res.status(401).json({ message: "Data not updated. FAILED" });
    }
  }