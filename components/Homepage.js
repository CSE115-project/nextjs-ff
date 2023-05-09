import * as React from "react";
import Button from "@mui/joy/Button";
import { getAuth, signOut } from "firebase/auth";
import Map from "./Map";
import Link from "next/link";
import { useRouter } from "next/router";

const Homepage = () => {
  // console.log("USER:", user);
  const router = useRouter();
  // userData is a string that contains the UID
  const { userData } = router.query;
  console.log("uid:", userData);

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
      query: { userData },
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Button onClick={handleSignOut} sx={{ mt: 1 }}>
        Sign Out
      </Button>

      <Button onClick={handleProfile} sx={{ mt: 1 }}>
        Profile
      </Button>

      <Map />
    </div>
  );
};

export default Homepage;
