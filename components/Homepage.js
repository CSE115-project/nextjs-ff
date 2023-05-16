import * as React from "react";
import Button from "@mui/joy/Button";
import GoogleMap from "./GoogleMap";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Homepage = ({user}) => {
  const router = useRouter();
  const auth = getAuth();

  // Authentication
  const handleSignOut = (event) => {
    event.preventDefault();
    console.log("Signed Out.");
    signOut(auth);
    router.push("/login");
  };

  const handleProfile = (event) => {
    event.preventDefault();
    router.push({
      pathname: '/profile',
      query: { user: JSON.stringify(user) },
    });
  };

  const handleAddFriend = () => {
    // Logic for adding a friend here
    console.log("Friend added!");
  };


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Button onClick={handleSignOut} sx={{ mt: 1 }}>
        Sign Out
      </Button>

      <Button onClick={handleProfile} sx={{ mt: 1 }}>
        Profile
      </Button>

      <Button onClick={handleAddFriend} sx={{ mt: 1 }}>
        Add Friend
      </Button>

      {/* <Map /> */}
      <GoogleMap />
    </div>
  );
};

export default Homepage;
