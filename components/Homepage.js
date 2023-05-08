import * as React from "react";
import Button from "@mui/joy/Button";
import { getAuth, signOut } from "firebase/auth";
import Map from "./Map";
import Link from "next/link";
import { useRouter } from "next/router";

const Homepage = () => {
  // console.log("USER:", user);
  const router = useRouter();
  const { userData } = router.query;
  const parsedUserData = userData ? JSON.parse(userData) : null;
  console.log("UID is:", parsedUserData?.uid)

  // Authentication
  const auth = getAuth();
  const handleSignOut = (event) => {
    console.log("Signed Out.");
    event.preventDefault();
    signOut(auth);
    router.push("/login");
  };

  const handleProfile = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/profile",
      query: { userData: JSON.stringify(userData) }
    });
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Button onClick={handleSignOut} sx={{ mt: 1 }}>
        Sign Out
      </Button>

      <Link href="/profile">
        <Button onClick={handleProfile} sx={{ mt: 1}}>
          Profile
        </Button>
      </Link>

      <Map />
    </div>
  );
};

export default Homepage;
