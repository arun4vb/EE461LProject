Setting up MongoDB

1. make an account on the MongoDB website
2. drop your email and your public-facing IP in the discord or group chat (or send it to me personally) and I'll add you to the project and whitelist your IP
4. You SHOULD be able to access the database using my User Name and password in the connection string on line 6 of db.py. If so, then you're good to run the server and make requests/changes to the DB
5. If you use VSCode, I recommend you install the MongoDB extension. It lets you work with the DB directly through the extention, e.g. view and edit documents. You can connect to the DB through the extension using the same connection string in line 6 of db.py. If not, you can view the DB data through the browser if you click on the project title and go to the "Collections" tab. You can modify/add/delete documents here as well.

Small sidenote: I've already put some docs in the DB to play around with while testing. Feel free to make new data if you want, or you could use the ones I made.
- username: joe, password: 123

There's no way to add projects in the web-app yet, so just add them with a python script if you need to.

DEPENDENCIES
- Frontend: axios
- Backend: Flask for Python, pymongo w/ dependencies
- run pip install pymongo[snappy,gssapi,srv,tls] to install pymongo and all of its dependencies
- you may also need dnspython if you don't already have it installed, but it was for me.
