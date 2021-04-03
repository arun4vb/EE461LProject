from flask import Flask, render_template, url_for, request, Response, jsonify
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

#---------- Response functions ----------#

def ok(body):
    return {'ok': True, 'text': body}

def unauthorised():
    return {'status': 401, 'text': {'message': 'Unauthorised'}}

def error(message):
    return {'status': 403, 'text': message}
#----------Project/HW Set Endpoints----------#


@app.route('/api/loadprojects', methods=['POST'])
#function to collect and return user projects
#@params: username with which to query database
#@return: JSON containing array of all projects in JSON form
def load_projects():
    request_data = request.json
    projects = db.get_user_projects(request_data['username'])
    return Response(projects, 200)


@app.route('/api/loadhwsets', methods=['GET'])
#function to return data on HW sets
#@return: JSON containing data of HW set names, availability, total capacity
def load_hw_sets():
    hw_sets = db.get_hw_sets()
    return Response(hw_sets, 200)


@app.route('/api/createproject', methods=['POST'])
#function to insert new project into database
#@params: JSON object containing username, project name, project ID, project description
#@return: Success message
def create_project():
    proj = request.json
    db.create_project(proj['user'], proj['project_name'], proj['project_id'], proj['description'])

    return Response("Project created", 201)


@app.route('/api/checkout', methods=['POST'])
#function to check out requested HW resources
#@params: JSON object containing unique project ID, HW set name and amount to be issued
#@return: JSON object contatining project data after checkout
def checkout_hw_set():
    request_data = request.json
    proj = db.checkout_hw_set(request_data['project_id'], request_data['name'], request_data['amount'])

    if proj is None:
        return Response({}, 412)
    else:
        return Response(proj, 201)


@app.route('/api/checkin', methods=['POST'])
#function to check in HW resources
#@params: JSON object containing unique project ID, HW set name and amount to be returned
#@return: JSON object containing project data after checkin
def checkin_hw_set():
    request_data = request.json
    proj = db.checkin_hw_set(request_data['project_id'], request_data['name'], request_data['amount'])

    return Response(proj, 201)


if __name__ == '__main__':
    app.run(debug=True)