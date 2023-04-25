import * as React from "react";
import { useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

const containerStyle = {
  width: 300,
  mx: "auto", // margin left & right
  my: 4, // margin top & bottom
  py: 3, // padding top & bottom
  px: 2, // padding left & right
  display: "flex",
  flexDirection: "column",
  gap: 2,
  borderRadius: "sm",
  boxShadow: "md",
};

export default function Component({ user, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeHandlerPassword = (p) => {
    setPassword(p.target.value);
  };

  return (
    <CssVarsProvider>
      <Sheet sx={containerStyle} variant="outlined">
        <div style={{ textAlign: "center" }}>
          <Typography level="h4" component="h1">
            FridayFinder
          </Typography>
          <Typography level="body2">Sign In</Typography>
        </div>
        <ModeToggle />

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="jackmihoff@email.com"
            onChange={onChangeHandlerEmail}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="jackmihoff@email.com"
            onChange={onChangeHandlerPassword}
          />
        </FormControl>

        <Button
          onClick={() => {
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Logged in Successfully.");
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              });
          }}
          // onClick={() => {
          //   onAuthStateChanged }}
          sx={{ mt: 1 }}
        >
          Log In
        </Button>
        <Button sx={{ mt: 1 }}>Google</Button>

        {user ? (
          <Button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  console.log("Signed out.");
                  // Sign-out successful.
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
            sx={{ mt: 1 }}
          >
            Sign Out
          </Button>
        ) : (
          <></>
        )}

        <Typography
          fontSize="sm"
          sx={{ alignSelf: "center" }}
          endDecorator={<Link href="/signup">Sign Up</Link>}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}
