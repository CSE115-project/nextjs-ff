import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { Tab, Tabs, TabList, tabClasses, TabPanel } from "@mui/joy";
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
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Image from "next/image";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";

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

  // Routes -------------------------------------------------
  // initialize all fields and their according set methods
  const handleHome = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push("/");
  };

  const handleEditProfile = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push("/edit-profile");
  };

  // function to retrieve the UserData from the database
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  console.log("p/profile userData:", userData);

  // Adding search friends functionality ----------------------------------------------------------

  // Handle search query input and button click
  const [searchQuery, setSearchQuery] = useState("");
  const [friendId, setFriendId] = useState("");

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

    // Update Friends list of User by appending new_friend_id
    const docRef = doc(db, "users", user.uid);
    qSnap.forEach((doc) => {
      console.log("fr:", friendId, "doc:", doc.id);
      setFriendId(doc.id);
    });

    if (friendId) {
      await updateDoc(docRef, { friends: arrayUnion(friendId) });
      console.log("Friend added");
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
    const { friends } = userData;

    try {
      const promises = friends.map((friendId) => getFriend(db, friendId));
      const friendData = await Promise.all(promises);
      const list = [...friendData];
      // friendsList.push(...friendData);
      // setFriendsList(list);
      console.log("friend list:", list);
      // TODO: save list to global list, and map the results in the friends list tab
    } catch (error) {
      console.log("Error retrieving friend data:", error);
    }
  };

  createFriendList();

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
                  endDecorator={<Button type="submit">Add</Button>}
                />
              </form>

              {/* Render the matching users */}
            </Stack>

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
                  <h1>List of Friends</h1>
                  {/* TODO */}
                </div>
              </TabPanel>
            </Tabs>
          </Sheet>
        </Sheet>
      </div>
    );
  }
}
