import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { db } from "../firebase";
import { Loader } from "@googlemaps/js-api-loader";
import {
  getDoc,
  getDocs,
  doc,
  query,
  collection,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  Tab,
  Tabs,
  TabList,
  tabClasses,
  TabPanel,
  Divider,
  Input,
  Alert,
  List,
  ListItem,
  ListItemDecorator,
  Button,
  Avatar,
  Box,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";

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
  const [userData, setUserData] = useState({});

  // Routes -------------------------------------------------
  // initialize all fields and their according set methods

  // set route to go back to home from profile page
  const handleHome = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push("/");
  };

  // set route to go to edit-profile from profile page
  const handleEditProfile = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push("/edit-profile");
  };

  // function to retrieve the UserData from the database
  const fetchData = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docRes = await getDoc(docRef);

      if (docRes.exists()) {
        const data = docRes.data();
        setUserData(data);
        // createFriendList(data.friends);
      } else {
        console.error("User Not Found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log("p/profile userData:", userData);

  // Adding search friends functionality ----------------------------------------------------------

  // Handle search query input and button click
  const [searchQuery, setSearchQuery] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");

  const handleAddFriend = async (event) => {
    // prevent reload on click
    if (event.cancelable) event.preventDefault();

    // Search and Get User with email matching the search.
    // Since only one email is associated with each user,
    // the return doc should only contain one entry
    const q = query(collection(db, "users"), where("email", "==", searchQuery));
    const qSnap = await getDocs(q);

    // If empty, there are no users with that email
    if (qSnap.size < 1) {
      console.error("No User email matches");
      // set the state to alert that add friend failed
      setAlertMessage("User does not exist.");
      setAlertStatus("danger");
      return;
    }

    // else set the state to alert that add friend passed

    // Get the new friend's ID
    const newFriendId = qSnap.docs[0].id;

    // Update Friends list of User by appending new_friend_id
    const docRef = doc(db, "users", user.uid);

    if (newFriendId) {
      await updateDoc(docRef, { friends: arrayUnion(newFriendId) });
      console.log("Friend added");
      await fetchData();
      await createFriendList();
      setAlertMessage("Successfully added friend.");
      setAlertStatus("success");
      return;
    }
  };

  // set route to go to friends-profile from profile page
  const handleFriendProfile = (friend) => async (event) => {
    if (event.cancelable) event.preventDefault();
    // Search and Get User with email matching the search.
    // Since only one email is associated with each user,
    // the return doc should only contain one entry
    const db = getFirestore();
    const q = query(collection(db, "users"), where("email", "==", friend));
    const qSnap = await getDocs(q);
    // Get the friend's UID
    const friendsUID = qSnap.docs[0].id;

    console.log("FRIENDS UID BEING PASSED IS:",friendsUID)
    
    router.push({
      pathname: "/friends-profile",
      query: { passedUID: friendsUID },
    });
  };

  // List friends ----------------------------------------------------------

  // loop through userdata.friends and getdoc for each friend
  // store each friend in friendsList

  // getFriend from friend list of logged in user
  const getFriend = async (db, friendId) => {
    const friendUserRef = doc(db, "users", friendId);
    const friendUserDoc = await getDoc(friendUserRef);
    return friendUserDoc.data().email;
  };

  const createFriendList = async () => {
    try {
      const promises = userData.friends
        ? userData.friends.map((friendId) => getFriend(db, friendId))
        : [];

      const friendData = await Promise.all(promises);
      setFriendsList(friendData);
      console.log("friend list:", friendData);
      // TODO: save list to global list, and map the results in the friends list tab
    } catch (error) {
      console.log("Error retrieving friend data:", error);
    }
  };

  // List liked places / Favorites
  const getPlaceInfo = (place_id) => {
    // // Create a new instance of the Loader
    // const loader = new Loader({
    //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    //   version: "weekly",
    //   libraries: ["places"],
    // });

    // // Load the Google Maps API and fetch place details
    // loader.load().then(() => {
    //   const { google } = window;
    //   const service = new google.maps.places.PlacesService(
    //     document.createElement("div")
    //   );

    //   // Fetch the place details using the place_id
    //   service.getDetails({ place_id }, (placeResult, status) => {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //       // Access the place details in placeResult
    //       console.log("Place Details:", placeResult);
    //     } else {
    //       console.error("Failed to fetch place details:", status);
    //     }
    //   });
    // });
  };

  const getLikedPlaces = () => {
    console.log("liked places userData:", userData.favorites);
    const promises = userData.favorites
      ? userData.favorites.map((placeId) => getPlaceInfo(placeId))
      : [];
  };

  useEffect(() => {
    if (userData && userData.friends) {
      createFriendList(userData.friends);
      getLikedPlaces();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    fetchData();
    createFriendList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userData) {
    return (
      <Button loading loadingPosition="start">
        Loading...
      </Button>
    );
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
              {/* User's Avatar */}
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
              <form onSubmit={handleAddFriend}>
                <Input
                  type="email"
                  placeholder="email"
                  sx={{
                    width: { xs: "100%", sm: 400 },
                    display: { xs: "block flex", sm: "flex" },
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // Button to add a friend
                  endDecorator={<Button type="submit">Add</Button>}
                />
              </form>

              {/* Render the matching users */}
            </Stack>
            {alertMessage && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <Alert variant="solid" size="md" color={alertStatus}>
                  {alertMessage}
                </Alert>
              </Box>
            )}

            <Tabs aria-label="tabs" defaultValue={0}>
              <TabList
                variant="plain"
                sx={{
                  "--List-padding": "0px",
                  "--List-radius": "0px",
                  "--ListItem-minHeight": "48px",
                  [`& .${tabClasses.root}`]: {
                    boxShadow: "none",
                    fontWeight: "md",
                    [`&.${tabClasses.selected}::before`]: {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      left: "var(--ListItem-paddingLeft)", // change to `0` to stretch to the edge.
                      right: "var(--ListItem-paddingRight)", // change to `0` to stretch to the edge.
                      bottom: 0,
                      height: 3,
                      bgcolor: "primary.400",
                    },
                  },
                }}
              >
                <Tab>Like Places</Tab>
                <Tab>Friends</Tab>
              </TabList>

              {/* TabPanel for User's like places */}
              <TabPanel value={0} sx={{ p: 2 }}>
                <div>
                  <List
                    variant="outlined"
                    sx={{
                      bgcolor: "background.body",
                      minWidth: 240,
                      borderRadius: "sm",
                      boxShadow: "sm",
                      "--ListItemDecorator-size": "48px",
                      "--ListItem-paddingLeft": "1.5rem",
                      "--ListItem-paddingRight": "1rem",
                    }}
                  >
                    {friendsList.map((friend, index) => (
                      <Fragment key={index}>
                        <Button
                          variant="plain"
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%",
                            padding: 0,
                          }}
                          component="li"
                          // route to friends-profile page
                          onClick={handleFriendProfile}
                        >
                          <ListItem key={index}>
                            <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                              <Avatar size="sm" src="" />
                            </ListItemDecorator>
                            <Typography
                              color="black"
                              sx={{
                                fontWeight: "normal",
                                marginLeft: "0.5rem",
                              }}
                            >
                              {friend}
                            </Typography>
                          </ListItem>
                        </Button>
                        {index !== friendsList.length - 1 && <Divider />}
                      </Fragment>
                    ))}
                  </List>
                </div>
              </TabPanel>

              {/* TabPanel for User's friends list */}
              <TabPanel value={1} sx={{ p: 2 }}>
                <div>
                  <List
                    variant="outlined"
                    sx={{
                      bgcolor: "background.body",
                      minWidth: 240,
                      borderRadius: "sm",
                      boxShadow: "sm",
                      "--ListItemDecorator-size": "48px",
                      "--ListItem-paddingLeft": "1.5rem",
                      "--ListItem-paddingRight": "1rem",
                    }}
                  >
                    {friendsList.map((friend, index) => (
                      <Fragment key={index}>
                        <ListItem key={index} onClick={handleFriendProfile}>
                          <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                            <Avatar size="sm" src="" />
                          </ListItemDecorator>
                          <Typography
                            color="black"
                            sx={{
                              fontWeight: "normal",
                              marginLeft: "0.5rem",
                            }}
                          >
                            {friend}
                          </Typography>
                        </ListItem>
                        {index !== friendsList.length - 1 && <Divider />}
                      </Fragment>
                    ))}
                  </List>
                </div>
              </TabPanel>
            </Tabs>
          </Sheet>
        </Sheet>
      </div>
    );
  }
}
