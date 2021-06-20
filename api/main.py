from flask import Response
from database.database import User
from datetime import datetime, timedelta
from flask import Flask, json, jsonify
from flask import request
from functools import wraps
import jwt
import os
import sys
from flask_cors import CORS
from werkzeug.datastructures import Headers
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret'
# app.config['Database'] = User()
# app.config['Database'] = User()


"""
    Serves as mock trained data
    that the NER model has already
    process and identified as
    entities
"""
pretrained_data = [
    ['michael', 'PERSON'],
    ['johnny', 'PERSON'],
    ['eric', 'PERSON'],
    ['kanye', 'PERSON'],
    ['stacey', 'PERSON'],
    ['andrew', 'PERSON'],
    ['avinash', 'PERSON'],
    ['david', 'PERSON'],
    ['abiodun', 'PERSON'],
    ['vukosi', 'PERSON'],
    ['london', 'LOCATION'],
    ['johannesburg', 'LOCATION'],
    ['pretoria', 'LOCATION'],
    ['tokyo', 'LOCATION'],
    ['paris', 'LOCATION'],
    ['may', 'DATE'],
    ['june', 'DATE'],
    ['today', 'DATE'],
    ['monday', 'DATE'],
    ['tuesday', 'DATE'],
    ['wednesday', 'DATE'],
    ['thursday', 'DATE'],
    ['friday', 'DATE'],
    ['saturday', 'DATE'],
    ['sunday', 'DATE'],
    ['jumatatu', 'DATE'],
    ['tuks', 'ORGANISATION'],
    ['wits', 'ORGANISATION'],
    ['apple', 'ORGANISATION'],
    ['samsung', 'ORGANISATION'],
    ['hauwei', 'ORGANISATION'],
]


"""
    train_model function:
        sends user input to the
        NER model to train it
        and returns feedback
    Parameters:
        None
    Returns:
        Boolean:Returns false if database connection fails
"""


def train_model(user_input):
    newlist = []
    for x in user_input:
        for y in pretrained_data:
            if x.lower() == y[0]:
                newlist.append({"name": x, "entity": y[1]})
                break
    return newlist


"""
    model_feedback function:
        receiveves user input so the
        NER model can train it
        and returns feedback
    Parameters:
        None
    Returns:
        JSON object with model feedback
"""


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        print(request.headers)
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
            print(token)

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            print("here")
            db = User()
            print("here2")
            data = jwt.decode(token, app.config['SECRET_KEY'], "HS256")
            print("data is ", data)
            user = db.findUserByEmail(data['email'])
        except Exception as e:
            return jsonify({'message': str(e)}), 401

        return f(user, *args, **kwargs)

    return decorated


@app.route('/input', methods=["POST"])
@token_required
def model_feedback(user):

    if not user:
        return jsonify({'message': 'log in to use model'}), 401

    user_input = str(request.json["input"]).split()
    model_feedback = train_model(user_input)
    return {'output': model_feedback}, 200


"""
    register_user function:
        registers user to the system and adds them to
        the database
    Parameters:
        None
    Returns:
        JSON object with response
"""


@app.route('/register', methods=["POST"])
def register_user():

    # "firstname":"kanye",
    # "lastname":"west",
    # "email":"kw@gmail.com",
    # "password":"12345"

    db = User()
    if(db != None):
        user_firstname = str(request.json["firstname"])
        user_lastname = str(request.json["lastname"])
        user_email = str(request.json["email"])
        user_password = str(request.json["password"])
        if(db.register(user_firstname, user_lastname, user_email, user_password)):
            return {'response': 'registered'}, 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


"""
    verify_user function:
        verifies user based on passed in code
    Parameters:
        None
    Returns:
        JSON object with response
"""


@app.route('/verify', methods=["POST"])
def verify_user():
    db = User()
    if(db != False):
        user_email = request.json["email"]
        user_code = request.json["code"]
        if user_code != None and user_code == db.get_code(user_email):
            db.verify_user(user_email)
            return {'response': 'verified'}, 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {{'response': 'failed'}}, 400


"""
    login_user function:
        logs user into the system
    Parameters:
        None
    Returns:
        JSON object with response
"""


@app.route('/login', methods=["POST"])
def login_user():
    db = User()
    if(db != False):
        user_email = str(request.json["email"])
        user_password = str(request.json["password"])

        if db.login(user_email, user_password):
            token = jwt.encode({'email': user_email, 'exp': datetime.utcnow(
            ) + timedelta(minutes=60)}, app.config['SECRET_KEY'], algorithm="HS256")
            return jsonify({'token': token})
        else:
            return jsonify({'message': 'authetication failed!'}), 401
    else:
        return jsonify({'message': 'authetication failed!'}), 401

# Admin functions


"""
    admin_add_user function:
        allows admin to add new user
    Parameters:
        None
    Returns:
        JSON object with response
"""

@app.route('/users', methods=["POST"])
@token_required
def admin_add_user(user):

    print(user)
    if user[5]=='False':
        return jsonify({'message': 'user unauthirized'}), 401

    db = User()
    if(db != None):
        user_firstname = str(request.json["firstname"])
        user_lastname = str(request.json["lastname"])
        user_email = str(request.json["email"])
        user_password = str(request.json["password"])
        user_isadmin = str(request.json["isadmin"])
        if(db.adminAddUser(user_firstname, user_lastname, user_email, user_password, user_isadmin)):
            return {'response':'registered'},200
        else:
            return {'response':'failed'},400
    else:
        return {'response':'failed'},400


# """
#     admin_update_user function:
#         allows admin to update a user
#     Parameters:
#         None
#     Returns:
#         JSON object with response
# """

@app.route('/users/<id>', methods=["PUT"])
@token_required
def admin_update_user(user, id):

    print(user)
    if user[5]=='False':
        return jsonify({'message': 'user unauthirized'}), 401

    db = User()
    if(db != None):
        # user_id = str(request.json["id"])
        user_firstname = str(request.json["firstname"])
        user_lastname = str(request.json["lastname"])
        user_email = str(request.json["email"])
        user_password = str(request.json["password"])
        user_isadmin = str(request.json["isadmin"])
        user_verified = str(request.json["verified"])
        if(db.adminUpdateUser(id,user_firstname, user_lastname, user_email, user_password, user_isadmin,user_verified)):
            return {'response':'registered'},200
        else:
            return {'response':'failed'},400
    else:
        return {'response':'failed'},400

# """
#     admin_delete_user function:
#         allows admin to delete a user
#     Parameters:
#         None
#     Returns:
#         JSON object with response
# """
@app.route('/users/<id>', methods=["DELETE"])
@token_required
def admin_delete_user(user, id):

    print(user)
    if user[5]=='False':
        return jsonify({'message': 'user unauthirized'}), 401

    db = User()
    if(db != None):

        # user_id = str(request.json["id"])
        # if(db.adminDeleteUser(user_id)):
        if(db.adminDeleteUser(id)):
            return {'response':'deleted'},200
        else:
            return {'response':'failed'},400
    else:
        return {'response':'failed'},400


"""
    admin_get_users function:
        allows admin to get all users
    Parameters:
        None
    Returns:
        JSON object with response
"""


@app.route('/users', methods=["POST", "GET"])
@token_required
def admin_get_users(user):
    # print(user[5])
    if user[5] != False:
        return jsonify({'message': 'user unauthirized'}), 401

    db = User()
    if(db != None):
        users = db.getAllUsers()
        resp = []
        for x in users:
            resp.append({'id': x[0], 'firstname': x[1], 'lastname': x[2], 'password': x[3],
                        'email': x[4], 'isadmin': x[5], 'activationCode': x[6], 'verified': x[7]})
        res = Response(response=json.dumps(resp))
        res.headers.add('Content-Range', 'users 0-10/100')
        res.headers.add('Content-Type', 'application/json')
        return res, 200

    return {'response': 'failed'}, 400


"""
    main function:
        starts the Flask API
    Parameters:
        None
    Returns:
        JSON object with response
"""
if __name__ == "__main__":
    app.run(debug=True)

# DB_HOST="ec2-34-232-191-133.compute-1.amazonaws.com"
# DB_NAME="d1mm3a0c29eepo"
# DB_PASS="904c29b5f6055f6de8c01b24e1ac3f29736c54ca010dd9b8cc022f1555fe3be7"
# DB_USER="orikanjrgszuig"
