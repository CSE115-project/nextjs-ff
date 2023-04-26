import * as React from "react";
import Button from "@mui/joy/Button";
import { getAuth, signOut } from "firebase/auth";
import Map from "./Map";

export default function Homepage({ user }) {
  const auth = getAuth();

  const handleSignOut = (event) => {
    console.log("Signed Out.");
    event.preventDefault();
    signOut(auth);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>

    <Button onClick={handleSignOut} sx={{ mt: 1 }}>
      Sign Out
    </Button>
      <Map></Map>
    </div>
  );
}
