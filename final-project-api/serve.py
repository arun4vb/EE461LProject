from flask import Flask, render_template, url_for, request
import db as db
from json import loads, dumps

app = Flask(__name__)

@app.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = request.json
        db.create_acct(user['email'], user['username'], user['password'])
        return "Successfully added acct"
    else:
        return "login"

if __name__ == '__main__':
    app.run(debug=True)