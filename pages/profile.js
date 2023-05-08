import Link from 'next/link';
import Button from "@mui/joy/Button";
import Avatar from '@mui/joy/Avatar';
import { useRouter } from "next/router";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export default function Profile() 
{

    const router = useRouter();
    const { userData } = router.query;
    const userDataString = userData ? JSON.parse(userData) : null;
    const parsedUserData = userDataString ? JSON.parse(userDataString) : null;

    const [retrievedData, setRetrievedData] = useState(null);

    if (parsedUserData != null){
        const usersRef = doc(db, "users", parsedUserData?.uid);
        getDoc(usersRef).then((docSnap) => {
            const data = docSnap.data();
            setRetrievedData(data);
          });
    };

    return (
        <div className="userProfile">
            {/* Home button */}
            <Link href = "/">
                <Button>Home</Button>
            </Link>

            {/* Edit button */}
            <Link href = "/edit-profile">
                <Button>Edit Profile</Button>
            </Link>

            <h1>User Profile</h1>
            {retrievedData && <h2>name: {retrievedData.name} </h2>}

            <Avatar />
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            
        </div>
    );
}
