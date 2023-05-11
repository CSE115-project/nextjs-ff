import Link from "next/link";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import { useRouter } from "next/router";
import { useState } from "react";

import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function Profile({ user }) {
  const router = useRouter();
  
  // initialize all fields and their according set methods
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [pictureLink, setPictureLink] = useState("");
  
  // function to retrieve the user's data from the database
  const fetchData = async () => {
    try {
      const response = await fetch("/api/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: user.uid }),
      });

      //   console.log("RESPONSE", response);

      const data = await response.json();

      //   console.log("DATA:", data);

      const useData = data.data;
      
      // do something with the data here
      setFirstName(useData.firstName);
      setLastName(useData.lastName);
      setBio(useData.bio);
      setPictureLink(useData.pictureLink);

    } catch (error) {
      console.error(error);
    }
  };
  fetchData();

  // console.log("name:", name);
  // console.log("bio:", bio);

  const handleHome = (event) => {
    event.preventDefault();
    router.push("/");
  };

  const handleEditProfile = (event) => {
    event.preventDefault();
    router.push("/edit-profile");
  };

  return (
    <div className="userProfile">
      <Sheet>
        <Stack direction="row" alignItems="center" spacing={0}>
          {/* Home Button */}
          <Button onClick={handleHome} sx={{ mt: 1 }}>
            Home
          </Button>

          <Typography level="h1" fontSize="xl2">
            My profile
          </Typography>

          {/* Edit Profile Button */}
          <Button onClick={handleEditProfile} sx={{ marginLeft: "auto" }}>
            Edit Profile
          </Button>
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
            {/* need to test with real avatar */}
            <Avatar sx={{ height: "128px", width: "128px", margin: "auto" }} src="${pictureLink}" />

            {/* Name of User */}
            <Typography
              component="h6"
              sx={{ mt: 1, color: "white" }}
              align="center"
            >
              { firstName.concat(" ").concat(lastName) }
            </Typography>

            {/* User's bio */}
            <Typography
              className="bio"
              sx={{ mt: 1, color: "white" }}
              align="center"
            >
              { bio }
            </Typography>
          </Box>

          <Box
            sx={{
              //bgcolor: "red",
              pt: 3,
              pb: 3,
              display: "flex",
            }}
          >
            <Typography component="h6" sx={{ color: "black" }}>
              My Folders
            </Typography>

            {/* Button to add new list */}
            <Button sx={{ marginLeft: "auto" }}>+</Button>
          </Box>

          {/* Liked Place (need to route to list of places) */}
          <Box>
            <Button
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                minWidth: "200px",
                minHeight: "200px",
              }}
              variant="outlined"
            >
              Liked Place
            </Button>
          </Box>
        </Sheet>
      </Sheet>
    </div>
  );
}
