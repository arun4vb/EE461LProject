from pymongo import MongoClient, ReturnDocument
from bson.json_util import loads, dumps
from bson import ObjectId
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
        return False
    
    #generate salt & encrypt user password before storing in db
    salt = uuid.uuid4().hex
    encrypted_password = encrypt_password(password, salt)

    #store user details in db
    user_accts.insert_one({
        'username': username,
        'email': email.lower(),
        'password': encrypted_password,
        'salt': salt,
        'project_ids': []
    })
    return True

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
def create_project(user, project_name, description):
    proj = user_projects.insert_one({
        'user': user,
        'project_name': project_name,
        'description': description,
        'resources': []
    })
    #store project id in respective user entry
    user_accts.find_one_and_update(
        { 'username': user }, 
        { '$push': { 'project_ids': proj.inserted_id } })

def delete_project(project_id):
    #delete reference to project in user account
    proj = user_projects.find_one({ '_id': ObjectId(project_id) })

    #return all checked out resources to HW sets
    for hw_set in proj['resources']:
        hw_sets.find_one_and_update(
            { 'name': hw_set['name'] },
            { '$inc': { 'availability': hw_set['qty'] } }
        )

    #remove project from all user accounts' project lists
    cursor = user_accts.find({ 'project_ids': ObjectId(project_id) })
    for user in cursor:
        user_accts.find_one_and_update(
            { '_id': user['_id'] },
            { '$pull': { 'project_ids': ObjectId(project_id) } }
        )

    #remove project from collection
    user_projects.find_one_and_delete({ '_id': ObjectId(project_id) })

#function to return all projects that belong to a user
#@return: list of all projects pertaining to user in JSON format
def get_user_projects(username):
    projects = []
    user = user_accts.find_one({ 'username': username })

    for proj_id in user['project_ids']:
        proj = user_projects.find_one({ '_id': proj_id })
        #convert project id to usable string
        o = proj['_id']
        proj['_id'] = str(o)
        projects.append(proj)
    
    return dumps({ 'projects': projects })

#function to add existing project to user account
def add_existing_project(username, project_id):
    #make sure project exists before adding to user account
    if user_projects.find_one({ '_id': ObjectId(project_id) }) is None:
        return None

    user_accts.find_one_and_update({ 'username': username },
        { '$push': { 'project_ids': ObjectId(project_id) } }
    )



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
def checkout_hw_set(project_id, hw_set_name, qty):
    #check if requested amount is available
    #if not, return None
    qty = int(qty)
    hw_set = hw_sets.find_one({ 'name': hw_set_name })

    if hw_set is None:
        return None
    elif hw_set['availability'] - qty < 0:
        return None
    else:
        #update project and HW set w/ requested amount
        hw_sets.find_one_and_update(
            { 'name': hw_set_name },
            { '$inc': { 'availability': -qty } })

        proj = user_projects.find_one({ '_id': ObjectId(project_id) })
        #insert new hw set into resources if it does not exist
        for hw_set in proj['resources']:
            if hw_set['name'] == hw_set_name:
                    return dumps(user_projects.find_one_and_update(
                        { '_id': ObjectId(project_id), 'resources.name': hw_set_name },
                        { '$inc': { 'resources.$.qty': qty } },
                        return_document=ReturnDocument.AFTER))

        return dumps(user_projects.find_one_and_update(
            { '_id': ObjectId(project_id) },
            { '$push': { 'resources': { 'name': hw_set_name, 'qty': qty } } },
            return_document=ReturnDocument.AFTER))


#function to allow user to check in a HW set
def checkin_hw_set(project_id, hw_set_name, qty):
    #update project and HW set w/ requested amount
    qty = int(qty)

    if hw_sets.find_one({ 'name': hw_set_name }) is None:
        return None

    #make sure user is returning resources that they have
    proj = user_projects.find_one({ '_id': ObjectId(project_id) })
    flag = False
    for hw_set in proj['resources']:
        if hw_set['name'] == hw_set_name: flag = True
    if flag is False:
        return None

    #remove hw set from resources if user checked in all resources
    for hw_set in proj['resources']:
        if hw_set['name'] == hw_set_name and hw_set['qty'] - qty <= 0:
            sub = hw_set['qty']
            hw_sets.find_one_and_update(
                    { 'name': hw_set_name },
                    { '$inc': { 'availability': sub } })
            return dumps(user_projects.find_one_and_update(
            { '_id': ObjectId(project_id) },
            { '$pull': { 'resources': { 'name': hw_set_name } } },
            return_document=ReturnDocument.AFTER))

    hw_sets.find_one_and_update(
        { 'name': hw_set_name },
        { '$inc': { 'availability': qty } })
    return dumps(user_projects.find_one_and_update(
        { '_id': ObjectId(project_id), 'resources.name': hw_set_name },
        { '$inc': { 'resources.$.qty': -qty } },
        return_document=ReturnDocument.AFTER))