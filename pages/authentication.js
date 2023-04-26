import * as React from "react";
import { useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { getAuth, signOut } from "firebase/auth";

export default function Component({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleSignOut = (event) => {
    console.log("Signed Out.");
    event.preventDefault();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Button onClick={handleSignOut} sx={{ mt: 1 }}>
      Sign Out
    </Button>
  );
}
