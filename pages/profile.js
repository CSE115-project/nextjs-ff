import Link from "next/link";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();

  const handleHome = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/",
      query: { userData },
    });
  };

  const handleEditProfile = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/edit-profile",
      query: { userData },
    });
  };

  return (
    <div className="userProfile">
      <Button onClick={handleHome} sx={{ mt: 1 }}>
        Home
      </Button>

      <Button onClick={handleEditProfile} sx={{ mt: 1 }}>
        Edit Profile
      </Button>

      <h1>User Profile</h1>

      <Avatar />
      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
    </div>
  );
}
