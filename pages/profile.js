import Link from "next/link";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import { useRouter } from "next/router";
import { useState } from "react";
import * as React from "react";

import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function Profile() {
  const router = useRouter();
  // userData is a string that contains the UID
  const { userData } = router.query;
  console.log("uid:", userData);

  const [bio, setBio] = useState("");

  // this function fetches the data from the database...
  // need to set variables according to what is needed to be displayed
  const fetchData = async () => {
    try {
      const response = await fetch("/api/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: userData }),
      });

      console.log("RESPONSE", response);

      const data = await response.json();

      console.log("DATA:", data);

      const useData = data.data;
      // do something with the data here
      setBio(useData.bio);
      // add additional variables being set here depending on what will be displayed
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();

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
      <Sheet>
        <Stack direction="row" alignItems="center" spacing={0}>
          <Button onClick={handleHome} sx={{ mt: 1 }}>
            Home
          </Button>

          <Button onClick={handleEditProfile} sx={{ mt: 1 }}>
            Edit Profile
          </Button>

          <Typography level="h1" fontSize="xl2">
            My profile
          </Typography>
        </Stack>

        <Sheet
          sx={{
            maxWidth: "75%",
            width: "100%",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              bgcolor: "navy",
              pt: 3,
              pb: 25,
              display: "block",
            }}
          >
            <Avatar sx={{ height: "64px", width: "64px", margin: "auto" }} />
            <Typography
              component="h6"
              sx={{ mt: 1, color: "white" }}
              align="center"
            >
              Test User
            </Typography>
            <Typography
              component="subtitle1"
              sx={{ mt: 1, color: "white" }}
              align="center"
            >
              {bio}
            </Typography>
          </Box>

          <Box
            sx={{
              // bgcolor: "black",
              pt: 3,
              pb: 25,
              display: "flex",
            }}
          >
            <Typography component="h6" sx={{ color: "black" }}>
              My Folders
            </Typography>
            <Typography align="right">
              <Button>+</Button>
            </Typography>
          </Box>
        </Sheet>
      </Sheet>
    </div>
  );
}
