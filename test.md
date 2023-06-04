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
Able to toggle between light and dark mode (pass/fail: pass)

Login Test:
Able to succesfully login with email address (pass/fail: pass)

Signout Test:
Able to successfully sign out (pass/fail: pass)

Button Test:

- Buttons is able to direct to a new page
    - Home button (pass/fail: pass)
    - Account button (pass/fail: pass) 
    - Edit Profile button (pass/fail: pass)
    - Cancel button (pass/fail: pass)
    
Upload functionaliy test:  
Able to upload new profile picture (pass/fail: pass) 

Profile test:  
Able to switch tabs between "liked places" and "friend list"

Friend Test:
- Able to add friend (pass/fail: pass)  
- Friend's email should display in the user friend's list (pass/fail: pass)  

Save functionality test:
- User name (pass/fail: pass)
- User Email (pass/fail: pass)
- User Biography (pass/fail: pass)
- Personal information in Firebase should be overwritten when user enter new information (pass/fail: pass)

Load functionality test:
- User name (pass/fail: pass)
- User Email (pass/fail: pass)
- User Biography (pass/fail: pass)

Mobile responsive test:  
Able to resize profile page to the necessary specifications (pass/fail: pass)

Map test:
- Able to load Google Maps API (pass/fail: pass)
- Able to go to full screen mode (pass/fail: pass)
- Able to see my current location (pass/fail: pass)
- Able to see heatmap under markers (pass/fail: pass)
- Able to display a pop up with location information - name (pass/fail: pass)
- Able to display a pop up with location information - address (pass/fail: pass)
- Able to display a pop up with location information - ratings (pass/fail: pass)

Browser Test:  
- App is able to run with Google Chrome (pass/fail: pass)  
- App is able to run with Safari (pass/fail: pass)  
