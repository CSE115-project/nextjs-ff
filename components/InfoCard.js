import { Card, Button } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

export default function InfoCard({ user, place }) {
  const [liked, setLiked] = useState("");
  // const [favorites, setFavorites] = useState(null);

  // get info from db for favorites
  const getUserData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().favorites);
      const favorites = docSnap.data().favorites;
      // check if place is in favorites
      if (favorites.includes(place.place_id)) {
        setLiked(true);
        console.log("liked place");
      } else {
        setLiked(false);
        console.log("unliked place");
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handleLikeClick = async () => {
    const docRef = doc(db, "users", user.uid);
    if (liked) {
      // Atomically remove a region from the "regions" array field.
      await updateDoc(docRef, {
        favorites: arrayRemove(place.place_id),
      });
      console.log("place removed from favorites");
      setLiked(false);
    } else {
      // Atomically add a new favorite to the "favorites" array field.
      await updateDoc(docRef, {
        favorites: arrayUnion(place.place_id),
      });
      console.log("place added to favorites");
      setLiked(true);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked]);

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 240,
        gap: 2,
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      {/* <AspectRatio ratio="1" sx={{ width: 90 }}>
        <Image
          // src={place.icon}
          loading="lazy"
          alt=""
        />
      </AspectRatio> */}
      <div style={{ width: "100%" }}>
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          {place.name}
        </Typography>

        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: "text.tertiary" }}
          >
            {place.vicinity}
          </Link>
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
            <Link
              overlay
              underline="none"
              href="#interactive-card"
              sx={{ color: "text.tertiary", paddingTop: "10px" }}
            >
              {place.rating} / 5 &#9734;
            </Link>
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="sm"
            onClick={handleLikeClick}
          >
            {liked ? "\u2665" : "\u2661"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
