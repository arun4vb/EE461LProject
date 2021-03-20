from flask import Flask, render_template, url_for, request, Response
import db as db
from json import loads, dumps

app = Flask(__name__)

#----------Register/Login Endpoints----------#

@app.route('/api/register', methods=['POST'])
def register():
    user = request.json
    user = db.create_acct(user['email'], user['username'], user['password'])

    if user is None:
        return Response({}, 422)
    else:
        return Response(user, 201)
        
@app.route('/api/login', methods=['POST'])
def login():
    login_data = request.json
    user = db.login(login_data['username'], login_data['password'])

    if user is None:
        return Response({}, 403)
    else:
        return Response(user, 200)

if __name__ == '__main__':
    app.run(debug=True)