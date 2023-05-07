import * as React from "react";
import Button from "@mui/joy/Button";
import { getAuth, signOut } from "firebase/auth";
import Map from "./Map";
import Link from "next/link";
import {useRouter} from "next/router";

const Homepage = ({user}) => {
  console.log("USER:", user);

  // Authentication
  const auth = getAuth();
  const router = useRouter();
  const handleSignOut = (event) => {
    console.log("Signed Out.");
    event.preventDefault();
    signOut(auth);
    router.push("/login");
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Button onClick={handleSignOut} sx={{ mt: 1 }}>
        Sign Out
      </Button>

      <Link href="/profile">
        <Button>Profile</Button>
      </Link>

      <Map />
    </div>
  );
};

export default Homepage;
