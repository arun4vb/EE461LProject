from pymongo import MongoClient
import datetime

client = MongoClient("mongodb+srv://PiercePhillips:Seth0085@ee461l-project.lloci.mongodb.net/test_db?retryWrites=true&w=majority")
db = client.test
people = db.people

personDocument = {
  "name": { "first": "Alan", "last": "Turing" },
  "birth": datetime.datetime(1912, 6, 23),
  "death": datetime.datetime(1954, 6, 7),
  "contribs": [ "Turing machine", "Turing test", "Turingery" ],
  "views": 1250000
}

#people.insert_one(personDocument)

print(people.find_one({ "name.last": "Turing" }))