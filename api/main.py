import base64
from posixpath import dirname
from model import runModel
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
from faceAI import faces
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))


app = Flask(__name__)
app.config.from_object('config_default.Config')

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
        user = None
        token = None
        # print(request.headers)
        if 'x-access-token' in request.headers:
            # print('here')
            token = request.headers['x-access-token']
            # print(token)

        if not token:
            return jsonify({'response': 'Token is missing!'}), 401

        try:
            # print("here")
            db = app.config['DATABASE']
            # print("here2")
            data = jwt.decode(token, app.config['SECRET_KEY'], "HS256")
            #print("data is ",data)
            user = db.findUserByEmail(data['email'])
        except Exception as e:
            return jsonify({'response': str(e)}), 401

        return f(user, *args, **kwargs)

    return decorated


@app.route('/input', methods=["POST"])
@token_required
def model_feedback(user):

    if not user:
        return jsonify({'response': 'log in to use model'}), 401

    user_input = str(request.json["input"])

    model_feedback = str(runModel(user_input))
    model_feedback = eval(model_feedback)
    db = app.config['DATABASE']
    if(db != False):
        db.input(model_feedback)
        dude = {'output': model_feedback}
        return dude, 200
    else:
        return {'response': 'failed'}, 400


@app.route('/input', methods=["GET"])
@token_required
def get_inout(user):
    if not user:
        return jsonify({'response': 'user are not logged in'})
    db = app.config['DATABASE']
    if(db != None):
        input = db.get_all_input()
        reps = []
        for i in input:
            reps.append({'id': i[0], 'name': i[1],
                        'entity': i[2], 'count': i[3]})
        res = Response(response=json.dumps(reps))
        res.headers.add('Content-Type', 'application/json')
        return res, 200
    return {'response': 'failed'}, 400


"""
    register_user function:
        registers user to the system and adds them to
        the database
    Parameters:
        None
    Returns:
        JSON object with response
"""


@app.route('/details/changepassword', methods=["POST"])
def reset_password():
    db = app.config['DATABASE']
    if(db != None):
        user_email = str(request.json['email'])
        user_new_password = str(request.json['password'])
        if(db.resetPassword(user_email, user_new_password)):
            return {'response': 'password reset'}, 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


@app.route('/register', methods=["POST"])
def register_user():

    db = app.config['DATABASE']
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
    db = app.config['DATABASE']
    if(db != False):
        user_email = request.json["email"]
        user_code = int(request.json["code"])
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
    # print(app.config)
    # athing = app.config['DB_NAME']
    # print(type(athing))
    db = app.config['DATABASE']
    if(db != False):
        user_email = str(request.json["email"])
        user_password = str(request.json["password"])
        # print("hello")
        if db.login(user_email, user_password):
            token = jwt.encode({'email': user_email, 'exp': datetime.utcnow(
            ) + timedelta(hours=2)}, app.config['SECRET_KEY'], algorithm="HS256")

            return jsonify({'isadmin': db.isAdmin(user_email), 'token': token})
        else:
            return jsonify({'response': 'authetication failed!'}), 401
    else:
        return jsonify({'response': 'authetication failed!'}), 401

# Admin functions


@app.route('/update-details', methods=["POST"])
@token_required
def update_details(user):
    if not user:
        return jsonify({'response': 'log in to use model'}), 401

    # hello
    db = app.config['DATABASE']
    if(db != None):
        user_firstname = str(request.json["firstname"])
        user_lastname = str(request.json["lastname"])
        user_email = user[4]
        if(db.update_user_details(user_email, user_firstname, user_lastname)):
            return {'response': 'updated'}, 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


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

    # print(user)
    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        user_firstname = str(request.json["firstname"])
        user_lastname = str(request.json["lastname"])
        user_email = str(request.json["email"])
        user_password = str(request.json["password"])
        user_isadmin = request.json["isadmin"]
        id = db.adminAddUser(user_firstname, user_lastname, user_email, user_password, user_isadmin)
        if(id != None):
            return jsonify({'response': 'registered', 'id': id}), 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


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
    # print(id)
    id = int(id)

    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        # print("hello")
        user_firstname = str(request.json["firstname"])
        user_lastname = str(request.json["lastname"])
        user_email = str(request.json["email"])
        user_password = str(request.json["password"])
        user_isadmin = str(request.json["isadmin"])
        user_verified = str(request.json["verified"])
        if(db.adminUpdateUser(id, user_firstname, user_lastname, user_email, user_password, user_isadmin, user_verified)):
            return jsonify({'id': 0, 'response': 'updated'}), 200
        else:
            return jsonify({'response': 'failed'}), 400
    else:
        return jsonify({'response': 'failed'}), 400

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

    id = int(id)

    # print(user)
    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        if(db.adminDeleteUser(id)):
            return {'response': 'deleted'}, 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


"""
    admin_get_user function:
        allows admin to get one user
    Parameters:
        None
    Returns:
        JSON object with response
"""


@app.route('/users/<id>', methods=["GET"])
@token_required
def admin_get_user(user, id):
    if id is not None:
        if user is None:
            return jsonify({'response': 'user unauthirized'}), 401

        if user[5] == False:
            return jsonify({'response': 'user unauthirized'}), 401

        db = app.config['DATABASE']
        if(db != None):
            user = db.getUser(id)
            resp = {'id': user[0], 'firstname': user[1], 'lastname': user[2], 'password': user[3],
                    'email': user[4], 'isadmin': user[5], 'activationCode': user[6], 'verified': user[7]}
            res = Response(response=json.dumps(resp))
            res.headers.add('Content-Range', 'users 0-10/100')
            res.headers.add('Content-Type', 'application/json')
            return res, 200

    return {'response': 'failed'}, 400


"""
    admin_get_users function:
        allows admin to get all users
    Parameters:
        None
    Returns:
        JSON object with response
"""


@app.route('/users', methods=["GET"])
@token_required
def admin_get_users(user):
    # print(user[5])
    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
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

# admin model functionality


@app.route('/models', methods=["POST"])
@token_required
def admin_add_models(user):
    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        model_name = str(request.json["modelname"])
        model_model = str(request.json["model"])
        id = db.adminAddModel(model_name, model_model)
        if(id != None):
            return {'response': 'model added', 'id': id}, 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


@app.route('/models', methods=["GET"])
@token_required
def admin_get_models(user):
    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        models = db.getAllModels()
        resp = []
        for x in models:
            resp.append({'id': x[0], 'modelname': x[1], 'model': x[2]})
        res = Response(response=json.dumps(resp))
        res.headers.add('Content-Range', 'models 0-10/100')
        res.headers.add('Content-Type', 'application/json')
        return res, 200

    return {'response': 'failed'}, 400


@app.route('/models/<id>', methods=["DELETE"])
@token_required
def admin_delete_model(user, id):

    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = User()
    if(db != None):

        # user_id = str(request.json["id"])
        # if(db.adminDeleteUser(user_id)):
        if(db.adminDeleteModel(id)):
            return {'response': 'deleted'}, 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


@app.route('/models/<id>', methods=["GET"])
@token_required
def set_model(user, id):

    # print(user)
    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        model = db.setModels(id)
        # print(model)
        if(model != None):
            # with is like your try .. finally block in this case
            dirname = os.path.dirname(__file__)
            filename = os.path.join(dirname, 'model.py')
            # print(filename)
            data = ""
            with open(filename, 'r') as file:
                # read a list of lines into data
                data = file.readlines()
            # Davlan/distilbert-base-multilingual-cased-masakhaner
            # print(data)
            #print("Your name: " + data[4])

            # now change the 2nd line, note that you have to add a newline
            data[4] = f'    url = "{model[0]}"\n'
            # print(data[4])
            # and write everything back
            with open(filename, 'w') as file:
                file.writelines(data)
            modelres = db.getModel(id)
            resp = {'id': modelres[0],
                    'modelname': modelres[1], 'model': modelres[2]}
            res = Response(response=json.dumps(resp))
            res.headers.add('Content-Range', 'models 0-10/100')
            res.headers.add('Content-Type', 'application/json')
            return res, 200

        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


@app.route('/models/<id>', methods=["PUT"])
@token_required
def admin_update_model(user, id):
    print(id)
    id = int(id)

    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        print("hello")
        return jsonify({'id': 0, 'response': 'updated'}), 200
    else:
        return jsonify({'response': 'failed'}), 400

# feedback endpoint


@app.route('/feedback', methods=["POST"])
@token_required
def add_feedback(user):

    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        user_feedback = str(request.json["feedback"])
        # print(type(user_feedback))
        if(db.addFeedback(user_feedback)):
            return {'response': 'feedback saved'}, 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


@app.route('/feedback/<id>', methods=["DELETE"])
@token_required
def admin_delete_feedback(user, id):

    id = int(id)

    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        if(db.adminDeleteFeedback(id)):
            return {'response': 'deleted'}, 200
        else:
            return {'response': 'failed'}, 400
    else:
        return {'response': 'failed'}, 400


"""
    admin_get_user function:
        allows admin to get one user
    Parameters:
        None
    Returns:
        JSON object with response
"""


@app.route('/feedback/<id>', methods=["GET"])
@token_required
def admin_get_feedack(user, id):
    id = int(id)
    if id is not None:
        if user is None:
            return jsonify({'response': 'user unauthirized'}), 401

        if user[5] == False:
            return jsonify({'response': 'user unauthirized'}), 401

        db = app.config['DATABASE']
        if(db != None):
            feedback = db.adminGetFeedback(id)
            if(feedback != None):
                resp = {'id': feedback[0], 'feedback': feedback[1]}
                res = Response(response=json.dumps(resp))
                res.headers.add('Content-Range', 'feedback 0-10/100')
                res.headers.add('Content-Type', 'application/json')
                return res, 200
            return {'response': 'failed'}, 400
        return {'response': 'failed'}, 400

    return {'response': 'failed'}, 400


@app.route('/feedback', methods=["GET"])
@token_required
def admin_get_all_feedback(user):
    # print(user[5])
    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401

    if user[5] == False:
        return jsonify({'response': 'user unauthirized'}), 401

    db = app.config['DATABASE']
    if(db != None):
        feedback = db.adminGetAllFeedback()
        resp = []
        for x in feedback:
            resp.append({'id': x[0], 'feedback': x[1]})
        res = Response(response=json.dumps(resp))
        res.headers.add('Content-Range', 'feedback 0-10/100')
        res.headers.add('Content-Type', 'application/json')
        return res, 200

    return {'response': 'failed'}, 400

@app.route('/personinfo', methods=["GET"])
@token_required
def get_person_info(user,):
    names2=["Khotso Bore","Master Lee"]
    if user is None:
        return jsonify({'response': 'user unauthirized'}), 401
    
    db = app.config['DATABASE']
    if(db != None):
        person_info=[]
        for temp in names2:     
            person_name = temp.split()[0]
            person_surname = temp.split()[1]
            val=db.getPersonInfo(person_name,person_surname)
            if(val != None):
                person_info.append(val)
        resp = []
        print(person_info)
        for person in person_info: 
            resp.append( {'name': person[1], 'surname': person[2], 'dob':person[3],'nationality':person[4],'description':person[5]})
        # for x in person_info:
        #     resp.append({'name': x[0], 'surname': x[1], 'dob': x[2], 'nationality': x[3], 'role': x[4], 'description': x[5]})
        res = Response(response=json.dumps(resp))
        res.headers.add('Content-Range', 'person 0-10/100')
        res.headers.add('Content-Type', 'application/json')
        return res, 200
    else:
        return {'response': 'failed'}, 400
 




"""
    image upload function:
        
    Parameters:
        None
    Returns:
        JSON object with response
"""


@app.route('/upload-image', methods=["POST"])
# @token_required
def upload_image():
    # if user is None:
    #     return jsonify({'response': 'user unauthirized'}), 401

    # if user[5] == False:
    #     return jsonify({'response': 'user unauthirized'}), 401

    # parse = reqparse.RequestParser()

    # image = request.json["image"]
    # return {"response": image}, 200

    string = 'data to be encoded'

    file = request.json["image"]
    file = file.partition(",")[2]

    # /print(file)
    # new_file = base64.encode(file)
    with open("faceAI/imageToSave.jpg", "wb") as fh:
        fh.write(base64.b64decode(file))

    names = faces.recognize("imageToSave.jpg")


    # image = open("faceAI/pte.jpg")
    # print("here")
    # image_read = image.read()
    # print("here")
    # image_64_encode = base64.encodestring(image_read)
    # print("here")
    # final_image = image_64_encode .partition(",")[2]

    with open("faceAI/a.jpg", "rb") as img_file:
        my_string = base64.b64encode(img_file.read())
    print(my_string)

    return jsonify({'msg': str(my_string)})


"""
    main function:
        starts the Flask API
    Parameters:
        None
    Returns:
        JSON object with response
"""
if __name__ == "__main__":
    # print("RUNNING")
    app.run(debug=True)

# DB_HOST="ec2-34-232-191-133.compute-1.amazonaws.com"
# DB_NAME="d1mm3a0c29eepo"
# DB_PASS="904c29b5f6055f6de8c01b24e1ac3f29736c54ca010dd9b8cc022f1555fe3be7"
# DB_USER="orikanjrgszuig"
# feedback endpoint
