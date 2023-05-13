import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip, { chipClasses } from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import DropZone from '../components/DropZone';
import FileUpload from '../components/FileUpload';
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";

export default function EditProfile({ user }) {
  // get user id done
  // pull info from database done
  // set current user data to input fields done
  // cancel -> direct back to profile
  // save -> save to db, popup msg that it was successful
  
  // image upload next after
  
  const [userData, setUserData] = useState({});

   // function to retrieve the user's data from the database
   useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: user.uid }),
        });
  
        const data = await response.json();
  
        setUserData(data.data);
        // do something with the data here
        console.log("/EP USERDATA:", userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // need some sort of logic to determine what has been edited tbh...

  // const handleSave = async () => {
  //   try {

  //   }
  // }

  return (
    <Sheet
      sx={{
        bgcolor: 'background.body',
        flex: 1,
        maxWidth: 1200,
        width: '100%',
        mx: 'auto',
      }}
    >
      <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
        My profile
      </Typography>
      <Tabs
        defaultValue={0}
        sx={{
          bgcolor: 'background.body',
          '--Tab-height': '48px',
        }}
      >

        <Box
          sx={{
            pt: 3,
            pb: 10,
            display: 'grid',
            gridTemplateColumns: {
              xs: '100%',
              sm: 'minmax(120px, 30%) 1fr',
              lg: '280px 1fr minmax(120px, 208px)',
            },
            columnGap: { xs: 2, sm: 3, md: 4 },
            rowGap: { xs: 2, sm: 2.5 },
            '& > hr': {
              gridColumn: '1/-1',
            },
          }}
        >
          <FormLabel sx={{ display: { xs: 'none', sm: 'block' } }}>Display Name</FormLabel>
          <Box sx={{ display: { xs: 'contents', sm: 'flex' }, gap: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel sx={{ display: { sm: 'none' } }}>Display Name</FormLabel>
              <Input placeholder="display name" defaultValue={ userData.displayName } />
            </FormControl>
          </Box>

          <Divider role="presentation" />

          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              startDecorator={<i data-feather="mail" />}
              placeholder="email"
              defaultValue= { userData.email }
            />
          </FormControl>

          <Divider role="presentation" />

          <Box>
            <FormLabel>Your photo</FormLabel>
            <FormHelperText>This will be displayed on your profile.</FormHelperText>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 2.5,
            }}
          >
            <Avatar
              size="lg"
              src=""
              sx={{ '--Avatar-size': '64px' }}
            />
            <DropZone />
          </Box>

          <Divider role="presentation" />

          <Box>
            <FormLabel>Bio</FormLabel>
            <FormHelperText>Write a short introduction.</FormHelperText>
          </Box>
          <Box>
            <Textarea
              minRows={4}
              sx={{ mt: 1.5 }}
              defaultValue= { userData.bio }
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
              275 characters left
            </FormHelperText>
          </Box>

          <Divider role="presentation" />

          <Box>
            <FormLabel>Friends</FormLabel>
          </Box>
          <Box>
            <Textarea
              minRows={4}
              sx={{ mt: 1.5 }}
              defaultValue = "FRIENDS"
            />
          </Box>

          <Divider role="presentation" />

          <Box>
            <FormLabel>Favorites</FormLabel>
          </Box>

          <Divider role="presentation" />

          <Box>
            <FormLabel>Want to go</FormLabel>
          </Box>

          <Divider role="presentation" />

          <Box
            sx={{
              gridColumn: '1/-1',
              justifySelf: 'flex-end',
              display: 'flex',
              gap: 1,
            }}
          >
            <Button variant="outlined" color="neutral" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </Box>
        </Box>
      </Tabs>
    </Sheet>
  );
}
