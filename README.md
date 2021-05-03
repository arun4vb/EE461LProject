# EE461LProject - Snowflake
- **Our site link: https://software-design-project-2021.herokuapp.com/**
<br />

## Usage Guide

### Site Navigation
- First navigate to the login page, and create an account. Login to the account.
![snip2](https://user-images.githubusercontent.com/47447913/116938378-4fabd100-ac30-11eb-82c8-480f78b7c1ae.PNG)

- **IMPORTANT**: Our deployment relies on two separate Heroku dynos (one for front-end and one for back-end), so in the event that you can access the frontend but Hardware sets, user accounts, etc. aren't working, that just means that the back-end dyno is still starting up and it needs a few more seconds before it can start processing API requests.
- After logging in, clicking on the "Welcome" tab in the top right of the website will open a dropdown menu that will allow the user to log out.
- The "Hardware Sets" tab displays all hardware sets' names, total capacity, and the amount per hardware set currently not in use (availability). You can also see this information on the landing page, which may be accessed by clicking the snowflake icon in the top left corner of the site.
  ![snip3](https://user-images.githubusercontent.com/47447913/116938561-8f72b880-ac30-11eb-95cc-c34c4f147d79.PNG)
- The "Datasets" tab provides download links for 9 different datasets. Simply click on a link to start the download.
- The "Projects" tab contains all information about user projects, as well as the check in/check out functionality. Projects are specific to each user, so a user can only see projects that belong to them.

### Projects
![snip1](https://user-images.githubusercontent.com/47447913/116938293-24c17d00-ac30-11eb-82a7-22d0aabf09a1.PNG)
- "Create New Project" allows the user to make a project and (optionally) allocate a certain amount from one hardware set during creation. The user can also add a description to the project.
![snip6](https://user-images.githubusercontent.com/47447913/116939020-3ce5cc00-ac31-11eb-98b8-19c4f568001c.PNG)
- Notably, hardware set resource allocation is tied to projects, i.e. checking in and checking out hardware resources happens within the context of a user's project.
- After creating a project, there are 5 options:
  1. Check out additional resources from any available hardware set.
  2. Check in resources for any hardware set that the user currently has allocated to the project.
  3. View the details of the project, which displays to the user how much of each hardware set is currently allocated to the project.
![snip4](https://user-images.githubusercontent.com/47447913/116938654-bcbf6680-ac30-11eb-85e4-5233a6836cd2.PNG)
  4. Delete the project, which removes it from the user's account and automatically returns any remaining checked out resources.
  5. Pay the balance due for the project.

- Each project has an ID that is guaranteed to be unique, which may used for identification purposes - this also means that different projects may have the same name. For the user, sharing this ID with another user allows them access to the same project via the "Add Project" feature.
  - Adding the unique ID to the corresponding text field and clicking "Add Project" button will add the project to your dashboard, where you may then proceed to check in/out resources, pay the bill, or even delete the project.
  - Any changes made to a project, including deleting the project, will be visible to all users that have access to the project.
  ![snip5](https://user-images.githubusercontent.com/47447913/116938804-f09a8c00-ac30-11eb-836e-ce1701a2112b.PNG)

## Reliability and Maintenance
- Our site has been structured for ease of operation and has been stress-tested to handle all types of edge cases, regardless of user behavior. Here are some notable examples:
  - Regex ensures that users may only enter valid numerical data when it applies (e.g. checkin/out quantity).
  - Front-end form validation ensures that no invalid data may be sent to the back-end. However, the back-end is also structured to gracefully handle any erroneuos data that it may receive in extreneous circumstances.
  - Our RESTful API only passes on data to the database API if determined to be valid.
  - Our database API uses a robust querying structure that efficiently and gracefully handles all types of inputs, valid or otherwise.
  - The cloud-based MongoDB Atlas architecture allows for simple modifications to database documents should the need arise.
    - This is easily accomplished in the browser by engineers that are authorized to make such changes. 
  - Our design is open-ended and abstracted in order to suit a variety of HaaS applications. The client may easily change various aspects to tailor the design for their specific needs.
