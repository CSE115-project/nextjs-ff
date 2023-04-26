import * as React from "react";
import Button from "@mui/joy/Button";
import { getAuth, signOut } from "firebase/auth";

export default function Home({ user }) {
  const auth = getAuth();

  const handleSignOut = (event) => {
    console.log("Signed Out.");
    event.preventDefault();
    signOut(auth);
  };

  return (
    <Button onClick={handleSignOut} sx={{ mt: 1 }}>
      Sign Out
    </Button>
  );
}
