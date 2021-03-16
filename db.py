from pymongo import MongoClient, ReturnDocument
import hashlib, uuid

#DB Connection
client = MongoClient("mongodb+srv://PiercePhillips:Seth0085@ee461l-project.lloci.mongodb.net/test_db?retryWrites=true&w=majority")
db = client.EE461L_db

#DB Collections
users = db.users
hw_sets = db.hw_sets

#----------Users DB Functions----------#

#function to process user login attempt
#@params: user credentials to query and authenticate
#@return: None if user not found in db, else return user data
def login(username, password):
    user = users.find_one({ "username": username })

    #user not found in db
    if user is None:
        return None
    #validate user credentials
    else:
        if validate_password(user, password) is True:
            return user
        else:
            return None


#function to create db entry for new user
#@params: new user data to be stored
def create_acct(username, password):
    #make sure username is not already taken
    if users.find_one({ 'username': username }) is not None:
        return None
    
    #generate salt & encrypt user password before storing in db
    salt = uuid.uuid4().hex
    encrypted_password = encrypt_password(password, salt)

    #store user details in db
    return users.insert_one({
        "username": username,
        "password": encrypted_password,
        "salt": salt
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

#----------HW Set DB Functions----------#

#function to create a new HW set with set capacity
def create_hw_set(name, capacity):
    hw_sets.insert_one({
        'name': name,
        'capacity': capacity,
        'availability': capacity
    })

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