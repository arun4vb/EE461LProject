import db
from bson.json_util import loads

db.create_project('joe', 'joe_project', 'idk')
projects = loads(db.get_user_projects('joe'))
project_id = projects['projects'][0]['_id']
db.add_existing_project('bob', project_id)
print(db.get_user_projects('joe'))
print(db.get_user_projects('bob'))

db.checkout_hw_set(project_id, 'hw_set1', 20)
print(db.get_user_projects('joe'))
print(db.get_user_projects('bob'))
db.checkin_hw_set(project_id, 'hw_set1', 20)
print(db.get_user_projects('joe'))
print(db.get_user_projects('bob'))

db.delete_project(projects['projects'][0]['_id'])
print(db.get_user_projects('joe'))
print(db.get_user_projects('bob'))
