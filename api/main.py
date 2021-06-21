from datetime import datetime, timedelta
from flask import Flask,jsonify
from flask import request
from functools import wraps
import jwt
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from database.database import User

app = Flask(__name__)

app.config['SECRET_KEY']='secret'


"""
    Serves as mock trained data
    that the NER model has already
    process and identified as
    entities
"""
pretrained_data = [
    ['michael','PERSON'],
    ['johnny','PERSON'],
    ['eric','PERSON'],
    ['kanye','PERSON'],
    ['stacey','PERSON'],
    ['andrew','PERSON'],
    ['avinash','PERSON'],
    ['david','PERSON'],
    ['abiodun','PERSON'],
    ['vukosi','PERSON'],
    ['london','LOCATION'],
    ['johannesburg','LOCATION'],
    ['pretoria','LOCATION'],
    ['tokyo','LOCATION'],
    ['paris','LOCATION'],
    ['may','DATE'],
    ['june','DATE'],
    ['today','DATE'],
    ['monday','DATE'],
    ['tuesday','DATE'],
    ['wednesday','DATE'],
    ['thursday','DATE'],
    ['friday','DATE'],
    ['saturday','DATE'],
    ['sunday','DATE'],
    ['jumatatu','DATE'],
    ['tuks','ORGANISATION'],
    ['wits','ORGANISATION'],
    ['apple','ORGANISATION'],
    ['samsung','ORGANISATION'],
    ['hauwei','ORGANISATION'],
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
                newlist.append({"name":x, "entity": y[1]})
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
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
            print(token)

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            print("here")
            db=User()
            print("here2")
            data = jwt.decode(token,app.config['SECRET_KEY'],"HS256")
            print("data is ",data)
            user = db.findUserByEmail(data['email'])
        except Exception as e:
            return jsonify({'message' : str(e)}),401

        return f(user,*args,**kwargs)

    return decorated


@app.route('/input', methods=["POST"])
@token_required
def model_feedback(user):

    if not user:
        return jsonify({'message' : 'log in to use model'}),401

    user_input = str(request.json["input"]).split()
    model_feedback = train_model(user_input)
    return {'output': model_feedback}

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
            return {'response':'registered'}
        else:
            return {'response':'failed'}
    else:
        return {'response':'failed'}

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
        user_code  = request.json["code"]
        if user_code!=None and user_code == db.get_code(user_email):
            db.verify_user(user_email)
            return {'response':'verified'}
        else:
            return {'response':'failed'}
    else:
        return {{'response':'failed'}}

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
            token = jwt.encode({'email' : user_email, 'exp' : datetime.utcnow() + timedelta(minutes=60)}, app.config['SECRET_KEY'],algorithm="HS256")
            return jsonify({'token': token})
        else:
            return jsonify({'message': 'authetication failed!'}), 401
    else:
        return jsonify({'message': 'authetication failed!'}), 401

#Admin functions
@app.route('/adminadduser', methods=["POST"])
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
            return {'response':'registered'}
        else:
            return {'response':'failed'}
    else:
        return {'response':'failed'}

@app.route('/admindeleteuser', methods=["POST"])
@token_required
def admin_delete_user(user):
    
    print(user)
    if user[5]=='False':
        return jsonify({'message': 'user unauthirized'}), 401
    
    db = User()
    if(db != None):
        
        user_email = str(request.json["email"])
        if(db.adminDeleteUser(user_email)):
            return {'response':'deleted'}
        else:
            return {'response':'failed'}
    else:
        return {'response':'failed'}

@app.route('/admingetusers', methods=["POST"])
@token_required
def admin_get_users(user):

    
    print(user[5])
    if user[5]!=False:
        return jsonify({'message': 'user unauthirized'}), 401
    
    db = User()
    if(db != None):
        users = db.getAllUsers()
        response = []
        for x in users:
            response.append({'id':x[0],'firstname':x[1],'lastname':x[2],'password':x[3],'email':x[4],'isadmin':x[5],'activationCode':x[6],'verified':x[7]})
        return {'response':response}

    return {'response':'failed'}
    

#Update password
@app.route('/updatepassword', methods=["POST"])
@token_required
def update_password(user):
    db = User()
    if(db != None):
        user_email = str(request.json["email"])
        user_password = str(request.json["password"])
        if(db.update( user_email, user_password)):
            return {'response':'updated'}
        else:
            return {'response':'failed'}
    else:
        return {'response':'failed'}

@app.route('/updateemail', methods=["POST"])
@token_required
def update_password(user):
    db = User()
    if(db != None):
        user_email = str(request.json["email"])
        user_password = str(request.json["password"])
        if(db.update_password( user_email, user_password)):
            return {'response':'updated'}
        else:
            return {'response':'failed'}
    else:
        return {'response':'failed'}

if __name__ == "__main__":
    app.run(debug=True)

