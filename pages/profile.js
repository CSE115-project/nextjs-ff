import Link from "next/link";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  // userData is a string that contains the UID
  const { userData } = router.query;
  console.log("uid:", userData);

  const [userName, setUserName] = useState("");

  // this function fetches the data from the database...
  // need to set variables according to what is needed to be displayed
  const fetchData = async () => {
    try {
      // const response = await fetch("/api/getUser", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ uid: userData }),
      // });

      // console.log("RESPONSE", response);

      // const data = await response.json();

      // console.log("DATA:", data);

      // const useData = data.data;
      // // do something with the data here
      // setUserName(useData.name);
      // // add additional variables being set here depending on what will be displayed
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();

  const handleHome = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/",
      query: { userData },
    });
  };

  const handleEditProfile = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/edit-profile",
      query: { userData },
    });
  };

  return (
    <div className="userProfile">
      <Button onClick={handleHome} sx={{ mt: 1 }}>
        Home
      </Button>

      <Button onClick={handleEditProfile} sx={{ mt: 1 }}>
        Edit Profile
      </Button>

      <h1>User Profile</h1>
      <h2> {userName} </h2>

      <Avatar />
      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
    </div>
  );
}
