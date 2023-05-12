import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firebase } from "../firebase";
import { getDoc, getFirestore, doc } from "firebase/firestore";

/*
const userObj = {
        uid: user.uid,
        email: user.email, // user's email
        displayName: user.displayName || "" ,
        image: user.photoURL || "", // user's picture link
        bio: `Hey, I'm new here!`, // user's bio
        favorites: [], // list of favorite places (places id)
        wantToGo: [], // list of want to go places (places id)
        friends: [], // list of friends (favorite places can be linked by friend id)
      };
*/

export default function Profile({ user }) {
  const router = useRouter();
  const db = getFirestore(firebase);
  const [userData, setUserData] = useState({});

  // initialize all fields and their according set methods
  const handleHome = (event) => {
    event.preventDefault();
    router.push("/");
  };

  const handleEditProfile = (event) => {
    event.preventDefault();
    router.push("/edit-profile");
  };

  // function to retrieve the user's data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docRes = await getDoc(docRef);

        if (docRes.exists()) {
          const data = docRes.data();
          setUserData(data);
        } else {
          console.error("User Not Found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("p/profile userData:", userData);
  if (!userData) {
    return <div>Loading...</div>;
  } else {
    console.log("Loading Profile...");
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
              <Avatar
                sx={{ height: "128px", width: "128px", margin: "auto" }}
                src=""
              />

              {/* Name of User */}
              <Typography
                component="h6"
                sx={{ mt: 1, color: "white" }}
                align="center"
              >
                {userData.displayName || "New User"}
              </Typography>

              {/* User's bio */}
              <Typography
                className="bio"
                sx={{ mt: 1, color: "white" }}
                align="center"
              >
                {userData.bio || "Bio.."}
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
}
