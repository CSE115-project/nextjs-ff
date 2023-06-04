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
Able to toggle between light and dark mode (pass)

Login Test:
Able to succesfully login with email address (pass)

Signout Test:
Able to successfully sign out (pass)

Button Test:

- Buttons is able to direct to a new page
    - Home button (pass)
    - Account button (pass) 
    - Edit Profile button (pass)
    - Cancel button (pass)
    
Upload functionaliy test:
Able to upload new profile picture (pass) 

Profile test:
- Able to switch tabs between "liked places and friend list"

Friend Test:
- Able to add friend (pass)  
- Friend's email should display in the user friend's list (pass)  

Save functionality test:
- User name (pass)
- User Email (pass)
- User Biography (pass)
- Personal information in Firebase should be overwritten when user enter new information (pass)

Load functionality test:
- User name (pass)
- User Email (pass)
- User Biography (pass)

Mobile responsive test:
- Able to resize profile page to the necessary specifications (pass)

Map test:
- Able to load Google Maps API (pass)
- Able to go to full screen mode (pass)
- Able to see my current location (pass)
- Able to see heatmap under markers (pass)
- Able to display a pop up with location information - name (pass)
- Able to display a pop up with location information - address (pass)
- Able to display a pop up with location information - ratings (pass)

Browser Test:  
- App is able to run with Google Chrome (pass)  
- App is able to run with Safari (pass)  
