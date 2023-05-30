import * as React from "react";
import Button from "@mui/joy/Button";
import GoogleMap from "./GoogleMap";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Stack from "@mui/joy/Stack";

const Homepage = ({user}) => {
  const router = useRouter();
  const auth = getAuth();

  // Authentication
  const handleSignOut = (event) => {
    if (event.cancelable) event.preventDefault();
    console.log("Signed Out.");
    signOut(auth);
    router.push("/login");
  };

  const handleProfile = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push({
      pathname: '/profile',
      query: { user: JSON.stringify(user) },
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Stack direction="row" alignItems="center" spacing={0}>

        <Button onClick={handleSignOut} sx={{ mt: 1 }}>
          Sign Out
        </Button>

        <Button onClick={handleProfile} sx={{ mt: 1 }}>
          Profile
        </Button>

        <Button sx={{ marginLeft: "auto" }}>
          List
        </Button>
      </Stack>

      <GoogleMap user={user}/>
    </div>
  );
};

export default Homepage;