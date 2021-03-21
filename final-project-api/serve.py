from flask import Flask, render_template, url_for, request, Response
import db as db
from json import loads, dumps

app = Flask(__name__)

#----------Register/Login Endpoints----------#

@app.route('/api/register', methods=['POST'])
#function to handle user registration
#@params: JSON object containing user credentials
#@return: HTTP status of attempted account creation, maybe user object? (probably not)
def register():
    user = request.json
    user = db.create_acct(user['email'], user['username'], user['password'])

    if user is None:
        return Response({}, 422)
    else:
        return Response(user, 201)

@app.route('/api/login', methods=['POST'])
#function to handle user login
#@params: JSON object containing login credentials
#@return: HTTP status of login, user JSON object if successful
def login():
    login_data = request.json
    user = db.login(login_data['username'], login_data['password'])

    if user is None:
        return Response({}, 403)
    else:
        return Response(user, 200)

#----------Project/HW Set Endpoints----------#

@app.route('/api/loadprojects', methods=['POST'])
#function to collect and return user projects
#@params: username with which to query database
#@return: JSON containing array of all projects in JSON form
def loadprojects():
    request_data = request.json
    projects = db.get_user_projects(request_data['username'])
    return Response(projects, 200)

if __name__ == '__main__':
    app.run(debug=True)