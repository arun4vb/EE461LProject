from pymongo import MongoClient, ReturnDocument
from bson.json_util import loads, dumps
import hashlib, uuid

#DB Connection
client = MongoClient("mongodb+srv://PiercePhillips:Seth0085@ee461l-project.lloci.mongodb.net/test_db?retryWrites=true&w=majority")
db = client.EE461L_db

#DB Collections
user_accts = db.user_accts
user_projects = db.user_projects
hw_sets = db.hw_sets

#----------User Accounts DB Functionality----------#

#function to process user login attempt
#@params: user credentials to query and authenticate
#@return: None if user not found in db, else return user data
def login(username, password):
    user = user_accts.find_one({ "username": username })

    #user not found in db
    if user is None:
        return None
    #validate user credentials
    else:
        if validate_password(user, password) is True:
            return dumps(user)  #JSONify MongoDB BSON
        else:
            return None


#function to create db entry for new user
#@params: new user data to be stored
def create_acct(email, username, password):
    #make sure username is not already taken
    if user_accts.find_one({ 'username': username }) is not None or user_accts.find_one({ 'email': email.lower() }) is not None:
        return None
    
    #generate salt & encrypt user password before storing in db
    salt = uuid.uuid4().hex
    encrypted_password = encrypt_password(password, salt)

    #store user details in db
    return user_accts.insert_one({
        'username': username,
        'email': email.lower(),
        'password': encrypted_password,
        'salt': salt,
        'project_ids': []
    })

#function to hash salted user password
#@params: password and salt
#@return: encrypted password
def encrypt_password(password, salt):
    input = password.encode('utf-8') + salt.encode('utf-8')
    return hashlib.sha512(input).hexdigest()

#function to determine if user-entered password matches db entry
#@params: db-queried user data and user-entered password
#@return: boolean result of password validation
def validate_password(user, password):
    if encrypt_password(password, user['salt']) == user['password']:
        return True
    else:
        return False

#----------User Projects DB Functionality----------#

#function to create a new project and store reference in user doc
def create_project(user, project_name, project_id, description):
    proj = user_projects.insert_one({
        'user': user,
        'project_name': project_name,
        'project_id': project_id,
        'description': description
    })
    #store project id in respective user entry
    user_accts.find_one_and_update(
        { 'username': user }, 
        { '$push': { 'project_ids': proj.inserted_id } })

#function to return all projects that belong to a user
#@return: list of all projects pertaining to user in JSON format
def get_user_projects(username):
    projects = []
    user = user_accts.find_one({ 'username': username })

    for proj_id in user['project_ids']:
        proj = user_projects.find_one({ '_id': proj_id })
        del proj['_id']
        projects.append(proj)
    
    return dumps({ 'projects': projects })

#----------HW Set DB Functionality----------#

#function to create a new HW set with set capacity
def create_hw_set(name, capacity):
    hw_sets.insert_one({
        'name': name,
        'capacity': capacity,
        'availability': capacity
    })

#function to return data on all hw sets
def get_hw_sets():
    sets = [x for x in hw_sets.find({}, {'_id': 0 })]
    return dumps({ 'hw_sets': sets })

#function to allow user to check out a HW set
def checkout_hw_set(name, qty):
    return hw_sets.find_one_and_update(
        { 'name': name },
        { '$inc': { 'availability': -qty } },
        return_document=ReturnDocument.AFTER)

#function to allow user to check in a HW set
def checkin_hw_set(name, qty):
    return hw_sets.find_one_and_update(
        { 'name': name },
        { '$inc': { 'availability': qty } },
        return_document=ReturnDocument.AFTER)