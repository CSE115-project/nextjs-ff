import { Card, Button } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function InfoCard({ user, place }) {
  const [liked, setLiked] = useState("");
  
  const handleLikeClick = () => {
    console.log("infocard likedBtn user:", user.uid, "\nPlace:", place);
  };
  
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
      <div style={{width: '100%'}}>
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
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1} >
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
            {liked ? "\u2665" :  "\u2661"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
