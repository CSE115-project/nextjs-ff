import Link from "next/link";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import { useRouter } from "next/router";
import { useState } from "react";

import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function Profile({user}) {
  const router = useRouter();

  console.log("/profile user:", user);

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
          <Button onClick={handleHome} sx={{ mt: 1 }}>
            Home
          </Button>

          <Typography 
            level="h1" fontSize="xl2"
          >
            My profile
          </Typography>

          <Button 
            onClick={handleEditProfile} sx={{ marginLeft: "auto" }}
          >
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
            <Avatar sx={{ height: "128px", width: "128px", margin: "auto" }} />
            <Typography
              component="h6"
              sx={{ mt: 1, color: "white" }}
              align="center"
            >
              Test User
            </Typography>
            <Typography
              className="bio"
              sx={{ mt: 1, color: "white" }}
              align="center"
            >
              Bio: Describe yourself
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
            
            <Button
              sx={{ marginLeft: "auto" }}
            >
              +
            </Button>
          </Box>
          <Box>
          <Button 
            style={{maxWidth: '200px', maxHeight: '200px', minWidth: '200px', minHeight: '200px'}}
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

