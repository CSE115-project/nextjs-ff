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
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";

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
                bgcolor: "#222158",
                pt: 3,
                pb: 12,
                display: "block",
                borderRadius: "20px",
              }}
            >
              {/* need to test with real avatar */}
              <Avatar
                sx={{ height: "128px", width: "128px", margin: "auto" }}
                src={""}
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
                pt: 3,
                pb: 3,
                display: "flex",
              }}
            >
              <Typography component="h6" sx={{ color: "black" }}>
                My Folders
              </Typography>

              {/* Button to add new list */}
              <Button variant="plain" sx={{ marginLeft: "auto" }}>
                +
              </Button>
            </Box>

            {/* Liked Place (need to route to list of places) */}

            {/* Stack to create rows */}
            <Stack direction="row" alignItems="flex-start" spacing={"10%"}>
              {/* Stack to create the first column */}
              <Stack
                direction="column"
                justifyContent="space-evenly"
                alignItems="flex-start"
                spacing={"10%"}
                sx={{ ml: "20%" }}
              >
                {/* Top Left Card */}
                <Card
                  sx={{
                    "--Card-radius": "20px",
                    mb: 3,
                    width: 250,
                    height: 200,
                    bgcolor: "#EFF7FD",
                  }}
                >
                  <CardCover>
                    {/* Add rest of Card */}
                    <Typography textColor="#5F7CEC" component="h1">
                      Restaurant
                    </Typography>
                  </CardCover>
                  <CardContent>
                    {/* Add rest of Card */}
                    <img
                      src="images/blue_folder.png"
                      alt="Blue folder image"
                      style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100px', // Adjust the width as desired
                      height: 'auto', // Maintain the aspect ratio of the image
                      }}
                    />
                    {/* <Typography textColor="#5F7CEC">Test2</Typography> */}
                  </CardContent>

                  {/* Bottom Left Card */}
                </Card>
                <Card sx={{ width: 250, height: 200, bgcolor: "#FBEEEE" }}>
                  <CardCover>
                    {/* Add rest of card */}
                    <Typography component="h1" textColor="#E2615C">
                      Liked places
                    </Typography>
                  </CardCover>
                  <CardContent>
                    {/* Add rest of Card */}
                    <img
                      src="images/red_folder.png"
                      alt="Red folder image"
                      style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100px', 
                      height: 'auto', 
                      }}
                    />
                  </CardContent>
                </Card>
              </Stack>

              {/* Stack for Second Column */}
              <Stack
                direction="column"
                justifyContent="space-evenly"
                alignItems="flex-start"
                spacing={"10%"}
              >
                {/* Top Right Card */}
                <Card
                  sx={{
                    "--Card-radius": "20px",
                    mb: 3,
                    width: 250,
                    height: 200,
                    bgcolor: "#FEFBED",
                  }}
                >
                  <CardCover>
                    <Typography textColor="#FADF7D" component="h1">
                      Fun
                    </Typography>
                  </CardCover>
                  <CardContent>
                    <img
                      src="images/yellow_folder.png"
                      alt="Yellow folder image"
                      style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100px', 
                      height: 'auto', 
                      }}
                    />
                  </CardContent>

                  {/* Bottom Right Card */}
                </Card>
                <Card
                  sx={{
                    "--Card-radius": "20px",
                    width: 250,
                    height: 200,
                    bgcolor: "#b7e8c2",
                  }}
                >
                  <CardCover>
                    <Typography textColor="#6b8771" component="h1">
                      Viewpoint
                    </Typography>
                  </CardCover>
                  <CardContent>
                  <img
                    src="images/green_folder.png"
                    alt="Green folder image"
                    style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100px', 
                    height: 'auto', 
                    }}
                  />
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Sheet>
        </Sheet>
      </div>
    );
  }
}
