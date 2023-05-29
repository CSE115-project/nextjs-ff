import Image from "next/image";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

export default function InfoWindow({ place }) {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {place.name}
      </Typography>
      <Typography level="body2">{place.vicinity}</Typography>
      <AspectRatio
        minHeight="120px"
        maxHeight="200px"
        sx={{ my: 2 }}
      ></AspectRatio>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography level="body3">Rating: {place.rating}</Typography>
        </div>
        <Button>
          Like
        </Button>
      </Box>
    </Card>
  );
}
