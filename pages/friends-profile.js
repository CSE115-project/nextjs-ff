import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { Tab, Tabs, TabList, tabClasses, TabPanel, Divider } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firebase } from "../firebase";
import {
  getDoc,
  getDocs,
  getFirestore,
  doc,
  query,
  collection,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import Input from "@mui/joy/Input";
import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';


export default function Profile({ user }) {
  const router = useRouter();
  const db = getFirestore(firebase);
  const { passedUID } = router.query;
  const [userData, setUserData] = useState({});
  console.log("PASSED UID IS:", passedUID);

  // Routes -------------------------------------------------
  // initialize all fields and their according set methods
  
  // set route to go back to home from profile page
  const handleHome = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push("/");
  };

    // set route to go to back to profile page from friend-profile
    const handleBack = (event) => {
      if (event.cancelable) event.preventDefault();
      router.push("/profile");
    };

  // function to retrieve the UserData from the database
  const fetchData = async () => {
    try {
      console.log("UID BEING PASSED IN FETCHDATA IS:", passedUID)
      const docRef = doc(db, "users", passedUID);
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


  // anytime the passed UID is changed, fetch the new user's data
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedUID]);

  console.log("p/profile userData:", userData);

  // Adding search friends functionality ----------------------------------------------------------

  // Handle search query input and button click
  const [searchQuery, setSearchQuery] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  const handleAddFriend = async (event) => {
    // prevent reload on click
    if (event.cancelable) event.preventDefault();

    // Search and Get User with email matching the search.
    // Since only one email is associated with each user,
    // the return doc should only contain one entry
    const db = getFirestore();
    const q = query(collection(db, "users"), where("email", "==", searchQuery));
    const qSnap = await getDocs(q);

    // If empty, there are no users with that email
    if (qSnap.size < 1) {
      console.error("No User email matches");
      return;
    }

    // Get the new friend's ID
    const newFriendId = qSnap.docs[0].id;

    // Update Friends list of User by appending new_friend_id
    const docRef = doc(db, "users", passedUID);


    if (newFriendId) {
      await updateDoc(docRef, { friends: arrayUnion(newFriendId) });
      console.log("Friend added");
      await fetchData();
      await createFriendList();
    }
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
    const db = getFirestore();
    // const { friends } = userData;

    try {
      const promises = userData.friends ? userData.friends.map((friendId) => getFriend(db, friendId)) : [];

      const friendData = await Promise.all(promises);
      // const list = [...friendData];
      // friendsList.push(...friendData);
      setFriendsList(friendData);
      console.log("friend list:", friendData);
      // TODO: save list to global list, and map the results in the friends list tab
    } catch (error) {
      console.log("Error retrieving friend data:", error);
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

    await fetchData();

    console.log("fetched data")

    router.push({
      pathname: "/friends-profile",
      query: { passedUID: friendsUID },
    });

  };

  useEffect(() => {
    if (userData && userData.friends) {
      createFriendList(userData.friends);
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
        {/* <meta name="viewport" content="initial-scale=1, width=device-width" /> */}

        <Sheet>
          <Stack direction="row" alignItems="center" spacing={0}>
            {/* Home Button */}
            <Button onClick={handleHome} sx={{ mt: 1 }}>
              Home
            </Button>

            <div style={{ display: "flex", marginLeft: "auto" }}>
              {/* Edit Profile Button */}
              <Button onClick={handleBack} sx={{ mt: 1 }}>
                Back
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
                Like Places tab panel
              </TabPanel>

              {/* TabPanel for User's friends list */}
              <TabPanel value={1} sx={{ p: 2 }}>
                <div>
                  <List
                    variant="outlined"
                    sx={{
                      bgcolor: 'background.body',
                      minWidth: 240,
                      borderRadius: 'sm',
                      boxShadow: 'sm',
                      '--ListItemDecorator-size': '48px',
                      '--ListItem-paddingLeft': '1.5rem',
                      '--ListItem-paddingRight': '1rem',
                    }}
                  >
                    {friendsList.map((friend, index) => (
                      <React.Fragment key={index}>
                        <Button variant="plain"
                          sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: 0 }}
                          component="li"
                          disableRipple
                          // route to friends-profile page
                          onClick={handleFriendProfile(friend)}
                          >
                          <ListItem key={index}>
                            <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                              <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                            </ListItemDecorator>
                            <Typography color="black" sx={{ fontWeight: 'normal', marginLeft: '0.5rem' }}>
                              {friend}
                            </Typography>
                          </ListItem>
                        </Button>
                        {index !== friendsList.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </div>
              </TabPanel>
            </Tabs>
          </Sheet>
        </Sheet>
      </div >
    );
  }
}
