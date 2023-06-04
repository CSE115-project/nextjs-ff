# Testing approaches:

Used console logs: 

For errors:

Edit profile
- unable to upload file 
- unable to update user document
- unable to fetch user data

Profile 
- User not found
- Error retrieving friend's data

Friend's profile
- User not found
- Error fetching user data
- Error retrieving friend's data
- No matching email address 

# Manual testing (results):

Login page:
Able to toggle between light and dark mode (Pass/Fail: Pass)

Login Test:
- Able to succesfully login with email address (Pass/Fail: Pass)
- Unable to login with incorrect email address (Pass/Fail: Pass)
- Unable to login with incorrect password (Pass/Fail: Pass)

Signout Test:
Able to successfully sign out (Pass/Fail: Pass)

Button Test:

- Buttons is able to direct to a new page
    - Home button (Pass/Fail: Pass)
    - Account button (Pass/Fail: Pass)
    - Edit Profile button (Pass/Fail: Pass)
    - Cancel button (Pass/Fail: Pass)
    
Upload functionaliy test:  
Able to upload new profile picture (Pass/Fail: Pass)

Profile test:  
Able to switch tabs between "liked places" and "friend list" (Pass/Fail: Pass)

Friend Test:
- Able to add friend (Pass/Fail: Pass)
- Friend's email should display in the user friend's list (Pass/Fail: Pass)

Save functionality test:
- User name (Pass/Fail: Pass)
- User Email (Pass/Fail: Pass)
- User Biography (Pass/Fail: Pass)
- Personal information in Firebase should be overwritten when user enter new information (Pass/Fail: Pass)

Load functionality test:
- User name (Pass/Fail: Pass)
- User Email (Pass/Fail: Pass)
- User Biography (Pass/Fail: Pass)

Mobile responsive test:  
Able to resize profile page to the necessary specifications (Pass/Fail: Pass)

Map test:
- Able to load Google Maps API (Pass/Fail: Pass)
- Able to go to full screen mode (Pass/Fail: Pass)
- Able to see my current location (Pass/Fail: Pass)
- Able to see heatmap under markers (Pass/Fail: Pass)
- Able to display a pop up with location information - name (Pass/Fail: Pass)
- Able to display a pop up with location information - address (Pass/Fail: Pass)
- Able to display a pop up with location information - ratings (Pass/Fail: Pass)

Browser Test:  
- App is able to run with Google Chrome (Pass/Fail: Pass)
- App is able to run with Firefox (Pass/Fail: Pass)
- App is able to run with Safari (Pass/Fail: Pass)