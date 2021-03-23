Setting up MongoDB

1. make an account on the MongoDB website
2. drop your email in the discord or group chat and I'll add you to the project
3. Once I've added you to the project, navigate to it and click "CONNECT" under the project title.
4. Click "Connect your application"
5. It should ask you to create a User name and password. There is a chance I might have to do this for you as an admin - if it blocks you at any step of the way just let me know.
6. Replace the credentials in line 6 of db.py with your credentials - i.e. client = MongoClient("mongodb+srv://<username>:<password>@ee461l-project.lloci.mongodb.net/test_db?retryWrites=true&w=majority")
7. If you use VSCode, I recommend you install the MongoDB extension. It lets you work with the DB directly through the extention, e.g. view and edit documents. You can connect to the DB through the extension using the same connection string you used in step 6. If not, you can view the DB data through the browser if you click on the project title and go to the "Collections" tab. You can modify/add/delete documents here as well.

Small sidenote: I've already put some docs in the DB to play around with while testing. Feel free to make new data if you want, or you could use the ones I made.
- username: joe, password: 123
There's no way to add projects in the web-app yet, so just add them with a python script if you need to.