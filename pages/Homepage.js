import * as React from "react";
import Button from "@mui/joy/Button";
import { getAuth, signOut } from "firebase/auth";
import Map from "./Map";
import { useState, useEffect } from "react";

export default function Homepage({ user }) {
  // Authentication
  const auth = getAuth();
  const handleSignOut = (event) => {
    console.log("Signed Out.");
    event.preventDefault();
    signOut(auth);
  };

  // Google Maps
  // default: San Francisco
  const defLocation = {
    lat: 37.7749,
    lng: -122.4194,
  };
  const [location, setLocation] = useState(defLocation);

  // Sets current location - chat.openai.com
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Button onClick={handleSignOut} sx={{ mt: 1 }}>
        Sign Out
      </Button>
      <Map location={location}></Map>
    </div>
  );
}
