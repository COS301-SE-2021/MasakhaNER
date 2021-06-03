from datetime import datetime
from flask import Flask
from flask import request
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from database.database import User

app = Flask(__name__)

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

@app.route('/input', methods=["POST"])
def model_feedback():
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
        if user_code == db.get_code(user_email):
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
            return {'response':'logged-in'}
        else:
            return {'response':'invalid'}
    else:
        return {'response':'failed'}

if __name__ == "__main__":
    app.run(debug=True)