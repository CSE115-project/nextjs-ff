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
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "next/link";

export default function MyProfile() {
  return (
    <Sheet>
      <Stack direction="row" alignItems="center" spacing={8}>
        <Link href="/Homepage">
          <Button sx={{ ml: 3 }}>Home</Button>
        </Link>

        <Typography level="h1" fontSize="xl2">
          My profile
        </Typography>
      </Stack>
      <Sheet
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
        }}
      >
        <Divider sx={{ paddingBottom: 0.5, bgcolor: "gray" }} />

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
              <FormLabel sx={{ display: { sm: "none" } }}>First name</FormLabel>
              <Input placeholder="First Name" />
            </FormControl>

            <FormControl sx={{ flex: 1 }}>
              <FormLabel sx={{ display: { sm: "none" } }}>Last name</FormLabel>
              <Input placeholder="Last Name" />
            </FormControl>
          </Box>

          <Divider role="presentation" />

          <FormControl sx={{ display: { sm: "contents" } }}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              startDecorator={<i data-feather="mail" />}
              placeholder="user@mail.com"
            />
          </FormControl>

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
              src="/images/default_image.png"
              sx={{ "--Avatar-size": "64px" }}
            />
            {/* TODO: Add upload functionality */}
            <Button sx={{ marginTop: 3 }}>Upload</Button>
          </Box>

          <Divider role="presentation" />

          <Box>
            <FormLabel>Bio</FormLabel>
            <FormHelperText>Write a short introduction.</FormHelperText>
          </Box>

          <Box>
            <Textarea minRows={4} sx={{ mt: 1.5 }} />
            {/* TODO: Add limit to Bio */}
            <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
              160 characters left
            </FormHelperText>
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
            {/* TODO: Add cancel functionality */}
            <Button variant="outlined" color="neutral" size="sm">
              Cancel
            </Button>

            {/* TODO: Add save functionality */}
            <Button size="sm">Save</Button>
          </Box>
        </Box>
      </Sheet>
    </Sheet>
  );
}
