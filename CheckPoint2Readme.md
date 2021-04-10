Our Link: https://software-design-project-2021.herokuapp.com/

Instructions:
First navigate to the login page, and create an account. Login to the account.
- IMPORTANT: Our deployment relies on two separate Heroku dynos (one for front-end and one for back-end), so in the event that you can access the frontend but Hardware sets, user accounts, etc. aren't working, that just means that the back-end dyno is still starting up and it needs a few more seconds before it can start processing API requests. 
- Clicking on the "welcome" tab in the top right of the website will open a dropdown menu that will allow the user to log out. 
- The Hardware set tab displays all hardware sets' names, total capacity, and the amount per hardware set currently not in use (availability). You can also see this information on the landing page.
- The Datasets tab provides download links for 9 different datasets. Simply click on a link to start the download.
- The Projects tab contains all information about user projects, as well as the check in/check out functionality. Projects are specific to each user, so a user can only see projects that belong to them.
- Create project allows the user to make a project and allocate a certain amount from one hardware set during creation. The user can also add a description to the project.

Notably, hardware set resource allocation is tied to projects, i.e. checking in and checking out hardware resources happens within the context of a user's project.
After creating a project, there are 4 options:
1. Check out additional resources from any hardware set
2. Check in resources for any hardware set that the user currently has allocated to the project
3. View the details of the project, which displays to the user how much of each hardware set is currently allocated to the project
4. Delete the project, which removes it from the user's account and automatically returns any remaining checked out resources

Known Issues:
- In project creation & checkin/checkout, the "Hardware Sets" drop-down menu displays the name of the sets available for checkout, but does NOT actually select the hardware set to check out from. Instead, type the name of the hardware set in the text field to the right of the drop-down menu (i.e. hw_set1 or hw_set2).
- There is no polling/socket system in place, so if another user checks in/out resources or creates projects for the same user while you're looking at the hardware resoures/projects, the change will not be there until the user either re-mounts the component or refreshes the page.
- Different users can have projects with the same name, but there is no checking mechanism in place for duplicate project names for the same user - when creating user projects for the same user, make sure the project names are unique or the backend will pick one at random when making requests.
- Project ID's are deprecated, but we didn't get around to removing them. All Project ID's are hard-coded to be the same, but we don't use them for anything. Instead, we use a combination of the user's username and the project name to access records in the database.
