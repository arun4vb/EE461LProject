import db

#db.create_acct("Joe","abc123")
print("acct created")

user = db.login("idk","111")
print(user," should be None")
user = db.login("Joe","abc123")
print(user["username"],  " Should be Joe")
print("testing already taken acct name")
print(db.create_acct("Joe", "1234567"))

print("testing hw sets")
print("insert new hwset")
#db.create_hw_set('hw_set1', 600)

print("check out some of hw set")
hw_set = db.checkout_hw_set('hw_set1', 200)
print(hw_set)
print("check in some of hw set")
hw_set = db.checkin_hw_set('hw_set1', 200)
print(hw_set)

print("create new project")
proj = db.create_project('Joe','coolproject','123','this is a project')
