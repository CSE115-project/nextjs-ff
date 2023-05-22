import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firebase } from "../firebase";
import {
  getDoc,
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Image from "next/image";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

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
    if (event.cancelable) event.preventDefault();
    router.push("/");
  };

  const handleEditProfile = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push("/edit-profile");
  };

  // Adding search friends functionality ----------------------------------------------------------

  // Handle search query input and button click
  const [searchQuery, setSearchQuery] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);

  const searchFriends = async () => {
    const db = getFirestore();
    const usersCollectionRef = collection(db, "users");
    const searchQueryRef = query(
      usersCollectionRef,
      where("email", "==", searchQuery)
    );
    const snapshot = await getDocs(searchQueryRef);
    const matchingUsersData = snapshot.docs.map((doc) => doc.data());
    setMatchingUsers(matchingUsersData);

    // Process matchingUsers or update state with the search results
  };

  const handleAddFriend = async (event) => {
    if (event.cancelable) event.preventDefault();
    const db = getFirestore();
    const usersCollectionRef = collection(db, "users");
    const searchQueryRef = query(
      usersCollectionRef,
      where("email", "==", searchQuery)
    );
    const snapshot = await getDocs(searchQueryRef);
    const matchingUsersData = snapshot.docs.map((doc) => doc.data());
    setMatchingUsers(matchingUsersData);
    console.log("matching user", matchingUsers);

    if (matchingUsers.length >= 1) {
      const currentUserRef = doc(db, "users", user.uid);
      const friendUserRef = doc(db, "users", matchingUsers[0].uid);

      await updateDoc(currentUserRef, {
        friends: arrayUnion(matchingUsers[0].uid),
      });

      await updateDoc(friendUserRef, {
        friends: arrayUnion(user.uid),
      });
    }

    // Handle success or update state accordingly
  };

  const handleSearch = () => {
    searchFriends();
  };

  // Adding search friends functionality ----------------------------------------------------------

  const handleFriendProfile = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push("/friends-profile");
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
        {/* <meta name="viewport" content="initial-scale=1, width=device-width" /> */}

        <Sheet>
          <Stack direction="row" alignItems="center" spacing={0}>
            {/* Home Button */}
            <Button onClick={handleHome} sx={{ mt: 1 }}>
              Home
            </Button>

            <div style={{ display: "flex", marginLeft: "auto" }}>
              {/* Edit Profile Button */}
              <Button onClick={handleEditProfile} sx={{ mt: 1 }}>
                Edit Profile
              </Button>
            </div>
          </Stack>

          <Sheet
            sx={{
              maxWidth: 1200,
              width: "100%",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Typography level="h1" fontSize="xl2" sx={{ mx: "auto", mb: 1 }}>
              My profile
            </Typography>
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
                src={userData.image || ""}
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

            <Typography component="h4" sx={{ py: 1, margin: "auto" }}>
              Add Friend
            </Typography>

            {/* stack for formatting purposes */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ flexWrap: "wrap" }}
            >
              {/* Form for inputting friend's email */}
              <form
                onSubmit={handleAddFriend}
                sx={{ display: { xs: "contents", sm: "flex" } }}
              >
                <Input
                  type="email"
                  placeholder="email"
                  sx={{ width: 500 }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // Button to add a friend
                  endDecorator={
                    <Button type="submit">
                      Add
                    </Button>
                  }
                />
              </form>

              {/* Render the matching users */}
            </Stack>

            <Tabs aria-label="tabs" defaultValue={0}>
              <TabList
                variant="plain"
                sx={{
                  '--List-padding': '0px',
                  '--List-radius': '0px',
                  '--ListItem-minHeight': '48px',
                  [`& .${tabClasses.root}`]: {
                    boxShadow: 'none',
                    fontWeight: 'md',
                    [`&.${tabClasses.selected}::before`]: {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      left: 'var(--ListItem-paddingLeft)', // change to `0` to stretch to the edge.
                      right: 'var(--ListItem-paddingRight)', // change to `0` to stretch to the edge.
                      bottom: 0,
                      height: 3,
                      bgcolor: 'primary.400',
                    },
                  },
                }}
              >
                <Tab>Like Places</Tab>
                <Tab>Friends</Tab>
                <Tab>Review</Tab>
                <Tab>My Folders</Tab>
              </TabList>

              {/* TabPanel for User's like places */}
              <TabPanel value={0} sx={{ p: 2 }}>
                Like Places tab panel
              </TabPanel>

              {/* TabPanel for User's friends list */}
              <TabPanel value={1} sx={{ p: 2 }}>
                Friends tab panel
              </TabPanel>

              {/* TabPanel for User's past review */}
              <TabPanel value={2} sx={{ p: 2 }}>
                Review tab panel
              </TabPanel>


              {/* TabPanel for My Folders */}
              <TabPanel value={3} sx={{ p: 2 }}>
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
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={{ xs: 0, sm: "10%", md: "10%", lg: "10%" }}
                  sx={{ flexWrap: "wrap" }}
                >
                  {/* Stack to create the first column */}
                  <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    spacing={"10%"}
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
                        <Typography textColor="#5F7CEC" component="h1">
                          Restaurant
                        </Typography>
                      </CardCover>
                      <CardContent>
                        <Image
                          src="/images/blue_folder.png"
                          alt="Blue folder image"
                          width={100}
                          height={100}
                          style={{
                            position: "absolute",
                            top: 3,
                            left: 5,
                            // width: "100px", // Adjust the width as desired
                            // height: "auto", // Maintain the aspect ratio of the image
                          }}
                        />
                      </CardContent>

                      {/* Bottom Left Card */}
                    </Card>
                    <Card
                      sx={{
                        "--Card-radius": "20px",
                        width: 250,
                        height: 200,
                        bgcolor: "#FBEEEE",
                      }}
                    >
                      <CardCover>
                        <Typography component="h1" textColor="#E2615C">
                          Liked places
                        </Typography>
                      </CardCover>
                      <CardContent>
                        <Image
                          src="/images/red_folder.png"
                          alt="Red folder image"
                          width={100}
                          height={100}
                          style={{
                            position: "absolute",
                            top: 3,
                            left: 5,
                            // width: "100px", // Adjust the width as desired
                            // height: "auto", // Maintain the aspect ratio of the image
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
                        <Typography textColor="#F4BA4F" component="h1">
                          Fun
                        </Typography>
                      </CardCover>
                      <CardContent>
                        <Image
                          src="/images/yellow_folder.png"
                          alt="Yellow folder image"
                          width={100}
                          height={100}
                          style={{
                            position: "absolute",
                            top: 3,
                            left: 5,
                            // width: "100px", // Adjust the width as desired
                            // height: "auto", // Maintain the aspect ratio of the image
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
                        <Image
                          src="/images/green_folder.png"
                          alt="Green folder image"
                          width={100}
                          height={100}
                          style={{
                            position: "absolute",
                            top: 3,
                            left: 5,
                            // width: "100px", // Adjust the width as desired
                            // height: "auto", // Maintain the aspect ratio of the image
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Stack>
                </Stack>
              </TabPanel>
            </Tabs>
          </Sheet>
        </Sheet>
      </div>
    );
  }
}
