import * as React from "react";
import Button from "@mui/joy/Button";
import GoogleMap from "./GoogleMap";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Stack from "@mui/joy/Stack";
import { useState } from "react";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Person from '@mui/icons-material/Person';

const Homepage = ({ user }) => {
  const router = useRouter();
  const auth = getAuth();
  const [search, setSearch] = useState("");

  // Authentication
  const handleSignOut = (event) => {
    if (event.cancelable) event.preventDefault();
    console.log("Signed Out.");
    signOut(auth);
    router.push("/login");
  };

  const handleProfile = (event) => {
    if (event.cancelable) event.preventDefault();
    router.push({
      pathname: "/profile",
      query: { user: JSON.stringify(user) },
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // TODO: handle the search
    console.log("search:", search);
  };

  const onChangeHandlerSearch = (e) => {
    setSearch(e.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (event.cancelable) event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("Homepage user:", user);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
        <Stack direction="row" alignItems="center" style={{display: "flex", justifyContent: "space-between"}}>
          <Button>List</Button>

          {/* Dropdown menu for account related options */}
          <div style={{ display: "flex", marginleft: "auto" }}>
            <Button
              id="account-button"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Person />
            </Button>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              aria-labelledby="account-button"
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Stack>

      <GoogleMap user={user} />
    </div>
  );
};

export default Homepage;
