import * as React from "react";
import Button from "@mui/joy/Button";
import { getAuth, signOut } from "firebase/auth";
import Map from "./Map";
import Link from "next/link";
import { useRouter } from "next/router";

const Homepage = () => {
  const router = useRouter();

  // Authentication
  // const auth = getAuth();
  const handleSignOut = (event) => {
    event.preventDefault();
    console.log("Signed Out.");
  //   signOut(auth);
  //   router.push("/login");
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
