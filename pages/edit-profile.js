import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

export default function Component({ user }) {
  // Image Uploading
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [userData, setUserData] = useState(null);

  // update name and bio
  const [updatedName, setUpdatedName] = React.useState("");
  const [updatedBio, setUpdatedBio] = React.useState("");

  // for route
  const router = useRouter();
  // max characters
  const maxBioChar = 200;
  // remaining characters
  const remainingChar = maxBioChar - updatedBio.length;

  // fetch user from firestore
  useEffect(() => {
    const fetchUserDataAsync = async () => {
      if (user) {
        const userDocData = await fetchUserData(user.uid);
        setUserData(userDocData);
      }
    };

    fetchUserDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userData) return <div>Loading...</div>;
  console.log("edPro user", userData.uid);

  const handleBioChange = (event) => {
    console.log(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storage = getStorage();
    if (file) {
      const storageRef = ref(storage, "uploads/" + file.name);
      try {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        });
        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL);
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    // Update the user document with the new image URL
    if (imageURL || updatedName || updatedBio) {
      const { uid, email, image, favorites, wantToGo, friends } = userData;
      const updateUser = {
        uid: uid,
        email: email,
        displayName: updatedName,
        image: imageURL || image,
        bio: updatedBio,
        favorites: favorites,
        wantToGo: wantToGo,
        friends: friends,
      };
      try {
        await setDoc(doc(db, "users", userData.uid), updateUser);
        console.log("Saved user details");
      } catch (error) {
        console.error("Error updating user document:", error);
      }
    }
    router.push("/profile");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    router.push("/profile");
  };

  console.log("EPro User:", userData);

  return (
    <Sheet
      sx={{
        bgcolor: "background.body",
        flex: 1,
        maxWidth: 1200,
        width: "100%",
        mx: "auto",
      }}
    >
      <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
        Edit Profile
      </Typography>

      <Divider sx={{ paddingBottom: 0.5 }} role="presentation" />

      <Box
        sx={{
          pt: 3,
          pb: 10,
          display: "grid",
          gridTemplateColumns: {
            xs: "100%",
            sm: "minmax(120px, 30%) 1fr",
            lg: "280px 1fr minmax(120px, 208px)",
          },
          columnGap: { xs: 2, sm: 3, md: 4 },
          rowGap: { xs: 2, sm: 2.5 },
          "& > hr": {
            gridColumn: "1/-1",
          },
        }}
      >
        <FormLabel sx={{ display: { xs: "none", sm: "block" } }}>
          Name
        </FormLabel>
        <Box sx={{ display: { xs: "contents", sm: "flex" }, gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel sx={{ display: { sm: "none" } }}>Display Name</FormLabel>
            <Input
              placeholder="Display Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </FormControl>
        </Box>

        <Divider role="presentation" />

        <Box>
          <FormLabel>Bio</FormLabel>
          <FormHelperText>Write a short introduction.</FormHelperText>
        </Box>
        <Box>
          {/* Bio */}
          <Textarea
            slotProps={{
              textarea: {
                maxLength: maxBioChar,
              },
            }}
            minRows={3}
            value={updatedBio}
            onChange={(e) => {
              e.preventDefault();
              setUpdatedBio(e.target.value);
            }}
          />
          <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
            {remainingChar} characters left
          </FormHelperText>
        </Box>

        <Divider role="presentation" />

        <Box>
          <FormLabel>Your photo</FormLabel>
          <FormHelperText>
            This will be displayed on your profile.
          </FormHelperText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 2.5,
          }}
        >
          <Avatar
            size="lg"
            src={imageURL || userData.image}
            sx={{ "--Avatar-size": "64px"}}
          />

          {/* Image Upload */}
          <Input
            style={{ border: "none", outline: "none", width: "100%" }}
            type="file"
            onChange={handleFileChange}
          />

          <Button onClick={handleSubmit}>Click to upload</Button>
          {uploadProgress > 0 && <p>Upload progress: {uploadProgress}%</p>}
        </Box>

        <Divider role="presentation" />
        <Box
          sx={{
            gridColumn: "1/-1",
            justifySelf: "flex-end",
            display: "flex",
            gap: 1,
          }}
        >
          {/* Cancel will route back to profile page */}
          <Button
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
      {/* </Tabs> */}
    </Sheet>
  );
}

const fetchUserData = async (userId) => {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("User not found");
    }

    return userDocSnap.data();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
